import { TRACKER_DB } from "./tracker_db.js";

const HIGH_FREQUENCY_THRESHOLD = 5;
const LEARNED_KEY = "learned_trackers";

//  eTLD+1 
const COMMON_SECOND_LEVEL_TLDS = [
  "co.uk","org.uk","gov.uk","co.jp","com.au","com.br","co.in","com.mx"
];

function normalizeDomain(domain) {
  return domain.replace(/^www\./, "");
}

function getBaseDomain(hostname) {
  const parts = hostname.split(".");
  if (parts.length <= 2) return hostname;

  const lastTwo = parts.slice(-2).join(".");
  const lastThree = parts.slice(-3).join(".");

  if (COMMON_SECOND_LEVEL_TLDS.includes(lastTwo)) return lastThree;
  return lastTwo;
}

function isThirdParty(requestDomain, firstPartyDomain) {
  return (
    getBaseDomain(normalizeDomain(requestDomain)) !==
    getBaseDomain(normalizeDomain(firstPartyDomain))
  );
}

// ---------- Learned DB ----------
async function getLearnedDB() {
  const data = await browser.storage.local.get(LEARNED_KEY);
  return data[LEARNED_KEY] || {};
}

async function saveLearnedDomain(domain, category) {
  const db = await getLearnedDB();

  if (!db[domain]) {
    db[domain] = {
      category,
      confidence: 1,
      lastSeen: Date.now()
    };
  } else {
    db[domain].confidence++;
    db[domain].lastSeen = Date.now();
  }

  await browser.storage.local.set({ [LEARNED_KEY]: db });
}

// ---------- Tracker Matching ----------
async function matchTracker(domain) {
  const base = getBaseDomain(domain);

  for (const tracker of TRACKER_DB) {
    for (const d of tracker.domains) {
      if (base === d || domain.endsWith("." + d)) {
        return tracker;
      }
    }
  }

  // Learned fallback
  const learned = await getLearnedDB();
  if (learned[domain]) {
    return {
      name: "Learned Tracker",
      category: learned[domain].category,
      risk: 4
    };
  }

  return null;
}

//  Infrastructure DETECTION
const INFRASTRUCTURE_PATTERNS = [
  "cloudfront.net","akamai.net","fastly.net",
  "cdn","static","images"
];

function isLikelyInfrastructure(domain) {
  return INFRASTRUCTURE_PATTERNS.some(
    p => domain === p || domain.endsWith("." + p)
  );
}

//  Request Weights
const TYPE_WEIGHTS = {
  script: 3,
  xmlhttprequest: 3,
  fetch: 3,
  websocket: 3,
  sub_frame: 2,
  image: 0.5,
  media: 0.5,
  font: 0.2,
  stylesheet: 0.2,
  other: 1
};

function getTypeWeight(type) {
  return TYPE_WEIGHTS[type] || 1;
}

//Auto-learning heuristic 
function inferCategory(entry) {
  let script = 0, xhr = 0, image = 0;

  for (const ev of entry.timeline) {
    if (ev.type === "script") script++;
    if (ev.type === "xmlhttprequest") xhr++;
    if (ev.type === "image") image++;
  }

  const total = entry.timeline.length || 1;

  if (xhr / total > 0.5 && entry.count > 5) return "analytics";
  if (image / total > 0.6 && entry.requests <= 3) return "advertising";
  if (script / total > 0.5 && entry.count > 3) return "tracking";

  return "unknown";
}

// Tab Init 
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && tab.url) {
    try {
      const url = new URL(tab.url);
      await browser.storage.local.set({
        ["tab_" + tabId]: {
          firstParty: url.hostname,
          domains: {},
          timeline: []
        }
      });
    } catch (e) {}
  }
});

browser.tabs.onRemoved.addListener(tabId => {
  browser.storage.local.remove("tab_" + tabId);
});

//  Request Tracking 
browser.webRequest.onCompleted.addListener(
  async details => {
    const tabId = details.tabId;
    if (tabId < 0) return;

    const key = "tab_" + tabId;
    const stored = await browser.storage.local.get(key);
    const tabInfo = stored[key];
    if (!tabInfo) return;

    const url = new URL(details.url);
    const domain = url.hostname;

    if (!isThirdParty(domain, tabInfo.firstParty)) return;

    const isInfra = isLikelyInfrastructure(domain);
    const trackerMatch = await matchTracker(domain);

    if (!tabInfo.domains[domain]) {
      tabInfo.domains[domain] = {
        count: 0,
        requests: 0,
        known: !!trackerMatch,
        info: trackerMatch || null,
        category: trackerMatch ? trackerMatch.category : "unknown",
        inferredCategory: null,
        infrastructure: isInfra,
        flagged: false,
        timeline: []
      };
    }

    const entry = tabInfo.domains[domain];
    const weight = getTypeWeight(details.type);
    const now = Date.now();

    entry.count += weight;
    entry.requests++;

    entry.timeline.push({ time: now, type: details.type, weight });
    if (entry.timeline.length > 50) entry.timeline.shift();

    // Global timeline (filtered)
    if (!isInfra) {
      tabInfo.timeline.push({ time: now, domain, type: details.type });
      if (tabInfo.timeline.length > 200) tabInfo.timeline.shift();
    }

    // Auto-learn
    if (!entry.known) {
      const inferred = inferCategory(entry);
      entry.inferredCategory = inferred;

      if (inferred !== "unknown") {
        await saveLearnedDomain(domain, inferred);
      }
    }

    // Flagging
    if (!entry.known && !entry.infrastructure && entry.count >= HIGH_FREQUENCY_THRESHOLD) {
      entry.flagged = true;
    }

    if (entry.known) entry.flagged = false;

    await browser.storage.local.set({ [key]: tabInfo });

    browser.action.setBadgeText({
      text: String(Object.keys(tabInfo.domains).length),
      tabId
    });
  },
  { urls: ["<all_urls>"] }
);

// Risk 
function calculateRisk(domains) {
  let score = 0;

  const multipliers = {
    advertising: 1.2,
    analytics: 1,
    tracking: 1.3,
    "data broker": 1.5
  };

  for (const d of Object.values(domains)) {
    if (d.infrastructure) continue;

    const count = d.count || 1;

    if (d.known) {
      const mult = multipliers[d.category] || 1;
      score += d.info.risk * mult * Math.log2(count + 1);
    } else {
      if (d.flagged) score += 5;
      else score += 1;
    }
  }

  return Math.round(score);
}


//  Messaging 
browser.runtime.onMessage.addListener(msg => {
  if (msg.type === "GET_REPORT") {
    return (async () => {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      const tabId = tabs[0]?.id;
      if (msg.type === "EXPORT_REPORT") {
  return (async () => {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const tabId = tabs[0]?.id;

    const data = (await browser.storage.local.get("tab_" + tabId))["tab_" + tabId];

    return {
      ...data,
      riskScore: calculateRisk(data.domains),
      exportedAt: new Date().toISOString()
    };
  })();
}

      const data = (await browser.storage.local.get("tab_" + tabId))["tab_" + tabId] || {
        domains: {},
        timeline: []
      };

      return {
        ...data,
        riskScore: calculateRisk(data.domains)
      };
    
    })();
  }
});