#!/usr/bin/env node

/**
 * Privacy Tracker Scanner
 * EasyList / EasyPrivacy compiler
 *
 * Safer compiler for Firefox runtime matching:
 * - prioritizes domain rules
 * - keeps only selective URL patterns
 * - drops broad / noisy rules
 */

const fs = require("fs");
const path = require("path");

// ----------------------
// CONFIG
// ----------------------

const INPUT_FILES = [
  "./lists/easylist.txt",
  "./lists/easyprivacy.txt"
];

const OUTPUT_FILE = "../extension/tracker_rules.json";

// Only keep resource types useful for network tracking analysis
const ALLOWED_RESOURCE_TYPES = new Set([
  "script",
  "image",
  "xmlhttprequest",
  "xhr",
  "subdocument",
  "document",
  "font",
  "media",
  "ping",
  "beacon",
  "other"
]);

const COMMON_TWO_PART_SUFFIXES = new Set([
  "co.uk", "org.uk", "gov.uk", "ac.uk",
  "com.au", "net.au", "org.au",
  "co.nz", "com.br", "com.mx",
  "co.jp", "com.sg"
]);

// ----------------------
// HELPERS
// ----------------------

function isComment(line) {
  return (
    !line ||
    line.startsWith("!") ||
    line.startsWith("[") ||
    line.startsWith("#")
  );
}

function normalizeLine(line) {
  return (line || "").trim();
}

function splitRuleAndOptions(line) {
  const idx = line.indexOf("$");
  if (idx === -1) {
    return {
      ruleText: line,
      optionsText: ""
    };
  }

  return {
    ruleText: line.slice(0, idx),
    optionsText: line.slice(idx + 1)
  };
}

function parseOptions(optionsText) {
  if (!optionsText) {
    return {
      raw: [],
      types: [],
      thirdPartyOnly: false,
      firstPartyOnly: false,
      excluded: false
    };
  }

  const raw = optionsText
    .split(",")
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);

  const types = [];
  let thirdPartyOnly = false;
  let firstPartyOnly = false;
  let excluded = false;

  for (const opt of raw) {
    if (opt === "third-party") {
      thirdPartyOnly = true;
      continue;
    }

    if (opt === "~third-party" || opt === "first-party") {
      firstPartyOnly = true;
      continue;
    }

    if (opt.startsWith("domain=")) {
      // domain scoping adds complexity/noise for this runtime
      excluded = true;
      continue;
    }

    if (
      opt === "elemhide" ||
      opt === "generichide" ||
      opt === "genericblock" ||
      opt === "csp" ||
      opt === "removeparam" ||
      opt === "redirect" ||
      opt === "rewrite" ||
      opt === "header" ||
      opt === "permissions" ||
      opt === "match-case" ||
      opt === "popup" ||
      opt === "webrtc" ||
      opt === "websocket"
    ) {
      excluded = true;
      continue;
    }

    const clean = opt.replace(/^~/, "");
    if (ALLOWED_RESOURCE_TYPES.has(clean)) {
      types.push(clean);
    }
  }

  return {
    raw,
    types: Array.from(new Set(types)),
    thirdPartyOnly,
    firstPartyOnly,
    excluded
  };
}

function getBaseDomain(hostname) {
  if (!hostname) return "";
  const parts = hostname.toLowerCase().split(".").filter(Boolean);

  if (parts.length <= 2) {
    return parts.join(".");
  }

  const lastTwo = parts.slice(-2).join(".");
  const lastThree = parts.slice(-3).join(".");

  if (COMMON_TWO_PART_SUFFIXES.has(lastTwo) && parts.length >= 3) {
    return lastThree;
  }

  return lastTwo;
}

function looksLikeDomain(text) {
  return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(text);
}

function extractDomainRule(ruleText) {
  // ||example.com^
  const m = ruleText.match(/^@@?\|\|([a-z0-9.-]+\.[a-z]{2,})\^?$/i);
  if (m) return m[1].toLowerCase();

  const m2 = ruleText.match(/^\|\|([a-z0-9.-]+\.[a-z]{2,})\^?$/i);
  if (m2) return m2[1].toLowerCase();

  return null;
}

function inferCategory(text) {
  const s = (text || "").toLowerCase();

  if (
    s.includes("fingerprint") ||
    s.includes("canvas") ||
    s.includes("deviceid")
  ) {
    return "fingerprinting";
  }

  if (
    s.includes("beacon") ||
    s.includes("pixel") ||
    s.includes("tag") ||
    s.includes("sync") ||
    s.includes("track")
  ) {
    return "tracking";
  }

  if (
    s.includes("analytics") ||
    s.includes("metric") ||
    s.includes("telemetry") ||
    s.includes("measure")
  ) {
    return "analytics";
  }

  if (
    s.includes("ad") ||
    s.includes("ads") ||
    s.includes("advert") ||
    s.includes("doubleclick") ||
    s.includes("banner") ||
    s.includes("prebid")
  ) {
    return "ads";
  }

  return "unknown";
}

function inferOwner(domainOrRule) {
  const s = (domainOrRule || "").toLowerCase();

  const owners = [
    { match: /doubleclick|google-analytics|googletagmanager|gstatic|googleadservices|adservice\.google/, owner: "Google" },
    { match: /facebook|fbcdn|connect\.facebook|meta/, owner: "Meta" },
    { match: /amazon-adsystem/, owner: "Amazon" },
    { match: /mookie1/, owner: "Oracle BlueKai" },
    { match: /openx/, owner: "OpenX" },
    { match: /exelator/, owner: "Nielsen" },
    { match: /agkn/, owner: "Neustar" },
    { match: /samba\.tv/, owner: "Samba TV" },
    { match: /criteo/, owner: "Criteo" },
    { match: /scorecardresearch/, owner: "Comscore" },
    { match: /go-mpulse/, owner: "Akamai mPulse" },
    { match: /taboola/, owner: "Taboola" },
    { match: /outbrain/, owner: "Outbrain" }
  ];

  for (const item of owners) {
    if (item.match.test(s)) return item.owner;
  }

  return null;
}

function shouldKeepPattern(ruleText, options) {
  // Drop cosmetic rules
  if (
    ruleText.includes("##") ||
    ruleText.includes("#@#") ||
    ruleText.includes("#?#") ||
    ruleText.includes("#$#")
  ) {
    return false;
  }

  // Drop regex-style EasyList lines /.../
  if (ruleText.startsWith("/") && ruleText.endsWith("/") && ruleText.length > 2) {
    return false;
  }

  // Drop very short patterns
  if (ruleText.length < 12) {
    return false;
  }

  // Drop very generic patterns
  const genericFragments = [
    "/ad.",
    "/ads.",
    "/ad/",
    "/ads/",
    "advert",
    "banner",
    "promo",
    "widget",
    "static",
    "assets",
    "image",
    "images",
    "js/",
    ".js"
  ];

  const lower = ruleText.toLowerCase();
  if (genericFragments.some(f => lower === f || lower.endsWith(f) || lower.startsWith(f))) {
    return false;
  }

  if (options.excluded) {
    return false;
  }

  return true;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildSafeRegexFromRule(ruleText) {
  let s = ruleText;

  s = s.replace(/^@@/, "");

  // Only compile a narrow subset of path/URL patterns.
  // If the rule is domain-anchored, prefer domain handling elsewhere.
  if (s.startsWith("||")) {
    return null;
  }

  // Start/end anchors
  let anchoredStart = false;
  let anchoredEnd = false;

  if (s.startsWith("|")) {
    anchoredStart = true;
    s = s.slice(1);
  }

  if (s.endsWith("|")) {
    anchoredEnd = true;
    s = s.slice(0, -1);
  }

  // Convert EasyList separators conservatively
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (ch === "*") {
      out += ".*";
    } else if (ch === "^") {
      out += "(?:[^a-zA-Z0-9_.%-]|$)";
    } else {
      out += escapeRegex(ch);
    }
  }

  if (!out) return null;

  let final = out;

  // Require URL-ish context for non-anchored patterns
  if (!anchoredStart) {
    final = "https?:\\/\\/[^\\s]*" + final;
  } else {
    final = "^" + final;
  }

  if (anchoredEnd) {
    final += "$";
  }

  try {
    return new RegExp(final, "i");
  } catch (e) {
    return null;
  }
}

function isLikelyUsefulDomain(domain, options) {
  if (!domain || !looksLikeDomain(domain)) return false;

  // Drop obviously first-party / generic site domains if category is too weak
  const base = getBaseDomain(domain);

  const weakBases = new Set([
    "dailymail.co.uk",
    "dailymail.com"
  ]);

  if (weakBases.has(base) && !options.thirdPartyOnly) {
    return false;
  }

  return true;
}

// ----------------------
// MAIN PARSER
// ----------------------

function parseLists() {
  const domains = {};
  const patterns = [];
  const exceptions = new Set();

  for (const file of INPUT_FILES) {
    console.log("Parsing:", file);

    const content = fs.readFileSync(file, "utf-8");
    const lines = content.split(/\r?\n/);

    for (const rawLine of lines) {
      const line = normalizeLine(rawLine);
      if (isComment(line)) continue;

      const isException = line.startsWith("@@");
      const { ruleText, optionsText } = splitRuleAndOptions(line);
      const options = parseOptions(optionsText);

      // skip unsupported / noisy rule classes
      if (options.excluded) continue;

      const domain = extractDomainRule(ruleText);
      const category = inferCategory(line);

      if (isException && domain) {
        exceptions.add(domain);
        continue;
      }

      if (domain) {
        if (!isLikelyUsefulDomain(domain, options)) {
          continue;
        }

        const existing = domains[domain];
        const candidate = {
          category,
          owner: inferOwner(domain),
          types: options.types,
          thirdPartyOnly: options.thirdPartyOnly,
          firstPartyOnly: options.firstPartyOnly,
          source: line
        };

        // Prefer non-unknown categories over unknown
        if (!existing || (existing.category === "unknown" && category !== "unknown")) {
          domains[domain] = candidate;
        }

        continue;
      }

      if (!shouldKeepPattern(ruleText, options)) {
        continue;
      }

      const regex = buildSafeRegexFromRule(ruleText);
      if (!regex) continue;

      patterns.push({
        source: line,
        regex: regex.toString(),
        category,
        owner: inferOwner(line),
        types: options.types,
        thirdPartyOnly: options.thirdPartyOnly,
        firstPartyOnly: options.firstPartyOnly
      });
    }
  }

  return {
    domains,
    patterns,
    exceptions: Array.from(exceptions)
  };
}

// ----------------------
// OPTIMIZATION
// ----------------------

function optimize(data) {
  console.log("Optimizing rules...");

  const seenPatternRegex = new Set();
  data.patterns = data.patterns.filter(p => {
    if (!p.regex || seenPatternRegex.has(p.regex)) {
      return false;
    }
    seenPatternRegex.add(p.regex);
    return true;
  });

  // Remove exception domains that are not valid-looking
  data.exceptions = data.exceptions
    .filter(d => looksLikeDomain(d))
    .filter((d, i, arr) => arr.indexOf(d) === i);

  return data;
}

// ----------------------
// SAVE
// ----------------------

function save(data) {
  const outputPath = path.resolve(__dirname, OUTPUT_FILE);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  fs.writeFileSync(
    outputPath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  console.log("Saved:", outputPath);
}

// ----------------------
// RUN
// ----------------------

function main() {
  console.log("Compiling tracker lists...\n");

  const parsed = parseLists();
  const optimized = optimize(parsed);

  console.log("\nStats:");
  console.log("Domains:", Object.keys(optimized.domains).length);
  console.log("Patterns:", optimized.patterns.length);
  console.log("Exceptions:", optimized.exceptions.length);

  save(optimized);
  console.log("\nDone ✅");
}

main();