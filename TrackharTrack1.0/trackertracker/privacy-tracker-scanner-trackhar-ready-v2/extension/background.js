console.log("BACKGROUND VERSION: analysis-only-trackhar-ready-v2");

var tabCache = {};
var dirtyTabs = new Set();
var trackerRulesReady = false;

fetch(browser.runtime.getURL("tracker_rules.json"))
  .then(function (res) { return res.json(); })
  .then(function (data) {
    initTrackerRules(data);
    trackerRulesReady = true;
    console.log("Tracker rules initialized");
  })
  .catch(function (err) {
    console.error("Failed to load tracker rules:", err);
  });

var HEURISTIC_CONFIG = {
  minRequestsPerDomain: 3,
  scoreThreshold: 4,
  suspiciousKeywords: [
    "collect", "track", "tracking", "tracker", "pixel", "beacon", "sync", "cookie",
    "match", "id", "uid", "uuid", "telemetry", "analytics", "measure", "metric",
    "ads", "adserver", "bid", "rtb"
  ],
  suspiciousTypes: {
    script: true,
    xmlhttprequest: true,
    xhr: true,
    beacon: true,
    ping: true,
    image: true,
    fetch: true
  }
};

var FIRST_PARTY_ENTITY_PATTERNS = {
  "amazon.com": [
    "amazon.com",
    "media-amazon.com",
    "ssl-images-amazon.com",
    "images-amazon.com",
    "images-na.ssl-images-amazon.com",
    "m.media-amazon.com"
  ],
  "dailymail.co.uk": [
    "dailymail.co.uk",
    "dailymail.com",
    "dmgmediaprivacy.co.uk",
    "i.dailymail.co.uk",
    "scripts.dailymail.co.uk",
    "t.dailymail.co.uk",
    "ted.dailymail.co.uk"
  ]
};

function ensureTab(tabId) {
  if (!tabCache[tabId]) {
    tabCache[tabId] = {
      entries: [],
      mainDomain: "",
      mainBaseDomain: "",
      fingerprintingDomains: [],
      analysis: {
        totalDomains: 0,
        trackerCount: 0,
        trackerRequests: 0,
        topTrackers: [],
        vendorCount: 0,
        topVendors: [],
        trackedBy: [],
        cookieSyncCount: 0,
        cookieSyncDomains: 0,
        cookieSyncVendors: 0,
        topCookieSync: [],
        trackharAvailable: false,
        trackharRequestMatches: 0,
        trackharTransmissionCount: 0,
        topTrackHARAdapters: [],
        topTrackHARProperties: [],
        trackharError: null
      },
      risk: 0
    };
  }
  return tabCache[tabId];
}

function getBaseDomain(hostname) {
  if (!hostname) return "";

  var parts = hostname.toLowerCase().split(".").filter(Boolean);
  if (parts.length <= 2) return hostname.toLowerCase();

  var twoPartSuffixes = {
    "co.uk": true, "org.uk": true, "gov.uk": true, "ac.uk": true,
    "com.au": true, "net.au": true, "org.au": true,
    "co.nz": true, "com.br": true, "com.mx": true,
    "co.jp": true, "com.sg": true
  };

  var lastTwo = parts.slice(-2).join(".");
  var lastThree = parts.slice(-3).join(".");

  if (twoPartSuffixes[lastTwo] && parts.length >= 3) {
    return lastThree;
  }

  return lastTwo;
}

function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return "";
  }
}

function getPathAndQuery(url) {
  try {
    var parsed = new URL(url);
    return (parsed.pathname + parsed.search).toLowerCase();
  } catch (e) {
    return "";
  }
}

function domainMatchesPattern(domain, pattern) {
  domain = (domain || "").toLowerCase();
  pattern = (pattern || "").toLowerCase();
  return domain === pattern || domain.endsWith("." + pattern);
}

function getSiteEntity(domain) {
  var base = getBaseDomain(domain);

  for (var entity in FIRST_PARTY_ENTITY_PATTERNS) {
    var patterns = FIRST_PARTY_ENTITY_PATTERNS[entity];
    for (var i = 0; i < patterns.length; i++) {
      var pattern = patterns[i];
      if (domainMatchesPattern(domain, pattern) || domainMatchesPattern(base, pattern)) {
        return entity;
      }
    }
  }

  return base;
}

function isSameEntity(requestDomain, tabDomain) {
  return getSiteEntity(requestDomain) === getSiteEntity(tabDomain);
}

function isThirdParty(requestDomain, tabDomain) {
  var requestEntity = getSiteEntity(requestDomain);
  var tabEntity = getSiteEntity(tabDomain);
  if (!requestEntity || !tabEntity) return false;
  return requestEntity !== tabEntity;
}

function isKnownFirstPartyAssetDomain(domain, tabDomain) {
  var d = (domain || "").toLowerCase();
  var entity = getSiteEntity(tabDomain || "");

  return entity === "amazon.com" && (
    domainMatchesPattern(d, "media-amazon.com") ||
    domainMatchesPattern(d, "ssl-images-amazon.com") ||
    domainMatchesPattern(d, "images-na.ssl-images-amazon.com") ||
    domainMatchesPattern(d, "m.media-amazon.com")
  );
}

function isLikelyStaticAsset(domain, url) {
  var s = ((domain || "") + " " + (url || "")).toLowerCase();
  return (
    s.indexOf("fonts.gstatic.com") >= 0 ||
    s.indexOf(".woff") >= 0 ||
    s.indexOf(".woff2") >= 0 ||
    s.indexOf(".ttf") >= 0 ||
    s.indexOf(".css") >= 0 ||
    s.indexOf(".svg") >= 0 ||
    s.indexOf(".ico") >= 0 ||
    s.indexOf(".jpg") >= 0 ||
    s.indexOf(".jpeg") >= 0 ||
    s.indexOf(".png") >= 0 ||
    s.indexOf(".gif") >= 0 ||
    s.indexOf(".webp") >= 0 ||
    s.indexOf("image") >= 0 ||
    s.indexOf("images-amazon") >= 0 ||
    s.indexOf("ssl-images-amazon") >= 0
  );
}

function countDomainRequests(entries, domain) {
  var count = 0;
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].domain === domain) count++;
  }
  return count;
}

function inferHeuristicCategory(domain, path, type) {
  var s = (domain + " " + path + " " + type).toLowerCase();

  if (s.indexOf("fingerprint") >= 0 || s.indexOf("canvas") >= 0 || s.indexOf("device") >= 0) {
    return "fingerprinting";
  }
  if (s.indexOf("sync") >= 0 || s.indexOf("usersync") >= 0 || s.indexOf("pixel") >= 0 || s.indexOf("beacon") >= 0 || s.indexOf("track") >= 0) {
    return "tracking";
  }
  if (s.indexOf("analytics") >= 0 || s.indexOf("telemetry") >= 0 || s.indexOf("measure") >= 0 || s.indexOf("metric") >= 0) {
    return "analytics";
  }
  if (s.indexOf("ad") >= 0 || s.indexOf("ads") >= 0 || s.indexOf("bid") >= 0 || s.indexOf("rtb") >= 0) {
    return "ads";
  }

  return "tracking";
}

function applyTrackerPolicy(rawTracker, thirdParty) {
  var tracker = rawTracker;
  if (!tracker) return null;
  if (tracker.firstPartyOnly && thirdParty) return null;
  if (tracker.thirdPartyOnly && !thirdParty) return null;
  if (!thirdParty && tracker.category !== "fingerprinting") return null;
  return tracker;
}

function classifyUnknownTracker(tab, details) {
  var domain = details.domain || "";
  var url = details.url || "";
  var type = (details.type || "").toLowerCase();
  var thirdParty = !!details.thirdParty;

  if (!thirdParty || !domain) return null;
  if (isSameEntity(domain, tab.mainDomain || "")) return null;
  if (isKnownFirstPartyAssetDomain(domain, tab.mainDomain || "")) return null;
  if (isLikelyStaticAsset(domain, url)) return null;

  var path = getPathAndQuery(url);
  var domainCount = countDomainRequests(tab.entries, domain);
  var score = 0;
  var reasons = [];

  if (domainCount >= HEURISTIC_CONFIG.minRequestsPerDomain) {
    score += 2;
    reasons.push("repeated third-party requests");
  }

  if (HEURISTIC_CONFIG.suspiciousTypes[type]) {
    score += 1;
    reasons.push("suspicious resource type: " + type);
  }

  for (var i = 0; i < HEURISTIC_CONFIG.suspiciousKeywords.length; i++) {
    var keyword = HEURISTIC_CONFIG.suspiciousKeywords[i];
    if (path.indexOf(keyword) >= 0 || domain.indexOf(keyword) >= 0) {
      score += 2;
      reasons.push("suspicious keyword: " + keyword);
      break;
    }
  }

  if (type === "image" && (path.indexOf("pixel") >= 0 || path.indexOf("beacon") >= 0 || path.indexOf("collect") >= 0)) {
    score += 2;
    reasons.push("possible tracking pixel");
  }

  if (path.indexOf("sync") >= 0 || path.indexOf("usersync") >= 0 || path.indexOf("cookie") >= 0 || path.indexOf("match") >= 0) {
    score += 2;
    reasons.push("possible cookie syncing");
  }

  if (score < HEURISTIC_CONFIG.scoreThreshold) return null;

  return {
    category: inferHeuristicCategory(domain, path, type),
    owner: null,
    heuristic: true,
    score: score,
    reasons: reasons
  };
}

function normalizeTrackerService(entry) {
  var owner = (entry && entry._owner || "").toLowerCase();
  var domain = (entry && entry.domain || "").toLowerCase();

  if (owner === "google") {
    if (domain.indexOf("googlesyndication.com") >= 0 || domain.indexOf("2mdn.net") >= 0 || domain.indexOf("doubleclick.net") >= 0 || domain.indexOf("googleadservices.com") >= 0 || domain.indexOf("imasdk.googleapis.com") >= 0) {
      return "Google Ads";
    }
    if (domain.indexOf("google-analytics.com") >= 0 || domain.indexOf("googletagmanager.com") >= 0) {
      return "Google Analytics";
    }
    return "Google";
  }

  if (domain.indexOf("dotmetrics.net") >= 0) return "Dotmetrics";
  if (domain.indexOf("go-mpulse.net") >= 0) return "Akamai mPulse";
  if (domain.indexOf("akstat.io") >= 0) return "akstat.io";
  if (domain.indexOf("sophi.io") >= 0) return "Sophi";
  if (domain.indexOf("webcontentassessor.com") >= 0) return "Web Content Assessor";

  return entry._owner || getBaseDomain(entry.domain || "") || entry.domain || "unknown";
}

function normalizeTrackerVendor(entry) {
  var owner = (entry && entry._owner || "").toLowerCase();
  var domain = (entry && entry.domain || "").toLowerCase();

  if (
    owner === "google" || domain.indexOf("google.com") >= 0 || domain.indexOf("googleapis.com") >= 0 || domain.indexOf("gstatic.com") >= 0 ||
    domain.indexOf("googlesyndication.com") >= 0 || domain.indexOf("doubleclick.net") >= 0 || domain.indexOf("2mdn.net") >= 0 ||
    domain.indexOf("googletagmanager.com") >= 0 || domain.indexOf("google-analytics.com") >= 0
  ) return "Google";

  if (owner === "amazon" || domain.indexOf("amazon-adsystem.com") >= 0 || domain.indexOf("fls-na.amazon.com") >= 0) return "Amazon";
  if (owner === "meta" || domain.indexOf("facebook.com") >= 0 || domain.indexOf("fbcdn.net") >= 0 || domain.indexOf("instagram.com") >= 0) return "Meta";
  if (owner === "microsoft" || domain.indexOf("bing.com") >= 0 || domain.indexOf("bat.bing.com") >= 0 || domain.indexOf("clarity.ms") >= 0) return "Microsoft";
  if (domain.indexOf("dotmetrics.net") >= 0) return "Dotmetrics";
  if (domain.indexOf("go-mpulse.net") >= 0 || domain.indexOf("akstat.io") >= 0) return "Akamai";
  if (domain.indexOf("openx.net") >= 0) return "OpenX";
  if (domain.indexOf("mookie1.com") >= 0) return "Oracle BlueKai";
  if (domain.indexOf("exelator.com") >= 0) return "Nielsen";
  if (domain.indexOf("agkn.com") >= 0) return "Neustar";
  if (domain.indexOf("criteo.com") >= 0) return "Criteo";
  if (domain.indexOf("taboola.com") >= 0) return "Taboola";
  if (domain.indexOf("outbrain.com") >= 0) return "Outbrain";
  if (domain.indexOf("samba.tv") >= 0) return "Samba TV";

  return entry._owner || getBaseDomain(entry.domain || "") || "Unknown";
}

function detectCookieSync(entry) {
  if (!entry || !entry._thirdParty) return null;

  var url = (entry.url || "").toLowerCase();
  var domain = (entry.domain || "").toLowerCase();
  var indicators = ["sync", "usersync", "match", "partnerid", "buyeruid", "uid", "uuid", "google_nid", "redir", "redirect", "callback", "pbsync", "setuid"];
  var reasons = [];

  for (var i = 0; i < indicators.length; i++) {
    var indicator = indicators[i];
    if (url.indexOf(indicator) >= 0 || domain.indexOf(indicator) >= 0) reasons.push(indicator);
  }

  if (!reasons.length) return null;
  return { suspected: true, reasons: reasons };
}

function analyzeTrackers(tab) {
  var uniqueDomains = {};
  var uniqueTrackerKeys = {};
  var trackerRequestCounts = {};

  for (var i = 0; i < tab.entries.length; i++) {
    var entry = tab.entries[i];
    if (entry.domain) uniqueDomains[entry.domain] = true;
    if (!entry._tracker && !entry._heuristicTracker) continue;

    var key = entry._service || entry._owner || entry.domain || "unknown";
    uniqueTrackerKeys[key] = true;
    trackerRequestCounts[key] = (trackerRequestCounts[key] || 0) + 1;
  }

  var topTrackers = Object.keys(trackerRequestCounts)
    .map(function (name) { return { name: name, count: trackerRequestCounts[name] }; })
    .sort(function (a, b) { return b.count - a.count; })
    .slice(0, 10);

  var trackerRequests = 0;
  Object.keys(trackerRequestCounts).forEach(function (key) { trackerRequests += trackerRequestCounts[key]; });

  return {
    totalDomains: Object.keys(uniqueDomains).length,
    trackerCount: Object.keys(uniqueTrackerKeys).length,
    trackerRequests: trackerRequests,
    topTrackers: topTrackers
  };
}

function analyzeVendors(tab) {
  var vendorCounts = {};
  var uniqueVendors = {};

  for (var i = 0; i < tab.entries.length; i++) {
    var entry = tab.entries[i];
    if (!entry._tracker && !entry._heuristicTracker) continue;

    var vendor = entry._vendor || "Unknown";
    uniqueVendors[vendor] = true;
    vendorCounts[vendor] = (vendorCounts[vendor] || 0) + 1;
  }

  var topVendors = Object.keys(vendorCounts)
    .map(function (name) { return { name: name, count: vendorCounts[name] }; })
    .sort(function (a, b) { return b.count - a.count; })
    .slice(0, 10);

  var trackedBy = Object.keys(uniqueVendors)
    .filter(function (name) { return name && name !== "Unknown"; })
    .sort();

  return {
    vendorCount: Object.keys(uniqueVendors).length,
    topVendors: topVendors,
    trackedBy: trackedBy
  };
}

function analyzeCookieSync(tab) {
  var syncDomains = {};
  var syncVendors = {};
  var syncEvents = [];
  var grouped = {};

  for (var i = 0; i < tab.entries.length; i++) {
    var entry = tab.entries[i];
    if (!entry._cookieSync || !entry._cookieSync.suspected) continue;

    syncDomains[entry.domain] = true;
    if (entry._vendor) syncVendors[entry._vendor] = true;

    var event = {
      domain: entry.domain,
      vendor: entry._vendor || "Unknown",
      reasons: entry._cookieSync.reasons
    };
    syncEvents.push(event);

    var key = event.vendor + "::" + event.domain;
    if (!grouped[key]) {
      grouped[key] = {
        vendor: event.vendor,
        domain: event.domain,
        count: 0,
        reasons: {}
      };
    }

    grouped[key].count += 1;
    for (var r = 0; r < event.reasons.length; r++) grouped[key].reasons[event.reasons[r]] = true;
  }

  var topCookieSync = Object.keys(grouped)
    .map(function (key) {
      var item = grouped[key];
      return {
        vendor: item.vendor,
        domain: item.domain,
        count: item.count,
        reasons: Object.keys(item.reasons)
      };
    })
    .sort(function (a, b) { return b.count - a.count; })
    .slice(0, 10);

  return {
    cookieSyncCount: syncEvents.length,
    cookieSyncDomains: Object.keys(syncDomains).length,
    cookieSyncVendors: Object.keys(syncVendors).length,
    topCookieSync: topCookieSync
  };
}

function calculateRisk(tab, trackharAnalysis) {
  var seen = {};
  var score = 0;

  for (var i = 0; i < tab.entries.length; i++) {
    var entry = tab.entries[i];
    if (!entry._tracker && !entry._heuristicTracker) continue;

    var key = entry._service || entry._owner || entry.domain || "unknown";
    if (!seen[key]) {
      seen[key] = {
        category: entry._category || "unknown",
        thirdParty: !!entry._thirdParty,
        count: 0,
        confidence: entry._confidence || "unknown"
      };
    }

    seen[key].count += 1;
  }

  Object.keys(seen).forEach(function (key) {
    var item = seen[key];
    switch (item.category) {
      case "fingerprinting": score += 8; break;
      case "tracking": score += 6; break;
      case "ads": score += 4; break;
      case "analytics": score += 2; break;
      default: score += 2; break;
    }
    if (item.thirdParty) score += 2;
    if (item.confidence === "heuristic") score += 1;
    score += Math.min(item.count, 5);
  });

  if (trackharAnalysis && trackharAnalysis.available) {
    score += Math.min(trackharAnalysis.requestMatches * 2, 10);
    score += Math.min(trackharAnalysis.transmissionCount, 10);
  }

  return score;
}

function saveTabData(tabId) {
  var tab = tabCache[tabId];
  if (!tab) return Promise.resolve();

  return browser.storage.local.set({
    ["tabData_" + tabId]: {
      entries: tab.entries,
      mainDomain: tab.mainDomain,
      mainBaseDomain: tab.mainBaseDomain,
      fingerprintingDomains: tab.fingerprintingDomains,
      analysis: tab.analysis,
      risk: tab.risk
    }
  });
}

function addEntry(tabId, details, isError) {
  var url = details.url;
  var domain = getDomain(url);
  var tab = ensureTab(tabId);

  if (!tab.mainDomain) {
    tab.mainDomain = domain;
    tab.mainBaseDomain = getBaseDomain(domain);
  }

  var thirdParty = false;
  if (!isKnownFirstPartyAssetDomain(domain, tab.mainDomain || domain)) {
    thirdParty = isThirdParty(domain, tab.mainDomain || domain);
  }

  var rawTracker = trackerRulesReady ? matchTracker(url, domain) : null;
  var tracker = applyTrackerPolicy(rawTracker, thirdParty);
  var heuristicTracker = !tracker ? classifyUnknownTracker(tab, {
    url: url,
    domain: domain,
    type: details.type,
    thirdParty: thirdParty
  }) : null;

  var entry = {
    url: url,
    domain: domain,
    method: details.method || "GET",
    type: details.type || "other",
    status: typeof details.statusCode === "number" ? details.statusCode : 0,
    error: isError ? details.error : null,
    timestamp: Date.now(),

    _thirdParty: thirdParty,
    _tracker: !!tracker,
    _heuristicTracker: !!heuristicTracker,
    _category: tracker && tracker.category || heuristicTracker && heuristicTracker.category || null,
    _owner: tracker && tracker.owner || null,
    _confidence: tracker ? "known" : (heuristicTracker ? "heuristic" : "unknown"),
    _heuristicReasons: heuristicTracker && heuristicTracker.reasons || []
  };

  entry._service = (entry._tracker || entry._heuristicTracker) ? normalizeTrackerService(entry) : null;
  entry._vendor = (entry._tracker || entry._heuristicTracker) ? normalizeTrackerVendor(entry) : null;
  entry._cookieSync = detectCookieSync(entry);

  tab.entries.push(entry);
  if (tab.entries.length > 2000) tab.entries.shift();
  dirtyTabs.add(tabId);
}

browser.webRequest.onCompleted.addListener(
  function (details) {
    if (details.tabId < 0) return;
    addEntry(details.tabId, details, false);
  },
  { urls: ["<all_urls>"] }
);

browser.webRequest.onErrorOccurred.addListener(
  function (details) {
    if (details.tabId < 0) return;
    addEntry(details.tabId, details, true);
  },
  { urls: ["<all_urls>"] }
);

setInterval(function () {
  var ids = Array.from(dirtyTabs);

  Promise.all(ids.map(async function (tabId) {
    var tab = tabCache[tabId];
    if (!tab) return;

    var trackerAnalysis = analyzeTrackers(tab);
    var vendorAnalysis = analyzeVendors(tab);
    var cookieSyncAnalysis = analyzeCookieSync(tab);
    var trackharAnalysis = await runTrackHARAnalysis(tab, {
      creatorVersion: browser.runtime.getManifest().version
    });

    tab.analysis = {
      totalDomains: trackerAnalysis.totalDomains,
      trackerCount: trackerAnalysis.trackerCount,
      trackerRequests: trackerAnalysis.trackerRequests,
      topTrackers: trackerAnalysis.topTrackers,
      vendorCount: vendorAnalysis.vendorCount,
      topVendors: vendorAnalysis.topVendors,
      trackedBy: vendorAnalysis.trackedBy,
      cookieSyncCount: cookieSyncAnalysis.cookieSyncCount,
      cookieSyncDomains: cookieSyncAnalysis.cookieSyncDomains,
      cookieSyncVendors: cookieSyncAnalysis.cookieSyncVendors,
      topCookieSync: cookieSyncAnalysis.topCookieSync,
      trackharAvailable: trackharAnalysis.available,
      trackharRequestMatches: trackharAnalysis.requestMatches,
      trackharTransmissionCount: trackharAnalysis.transmissionCount,
      topTrackHARAdapters: trackharAnalysis.topAdapters,
      topTrackHARProperties: trackharAnalysis.topProperties,
      trackharError: trackharAnalysis.error || null
    };
    console.log(trackharAnalysis);

    tab.risk = calculateRisk(tab, trackharAnalysis);
    return saveTabData(tabId);
  })).catch(function (err) {
    console.error("Analysis pipeline failed:", err);
  }).finally(function () {
    dirtyTabs.clear();
  });
}, 2000);
