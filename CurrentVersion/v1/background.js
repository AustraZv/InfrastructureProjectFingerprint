console.log("BACKGROUND VERSION: trackhar-clean-v2");
var requestMeta = {};
var tabCache = {};
var dirtyTabs = new Set();
var trackerRulesReady = false;

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

fetch(browser.runtime.getURL("tracker_rules.json"))
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    initTrackerRules(data);
    trackerRulesReady = true;
    console.log("Tracker rules initialized");
  })
  .catch(function (err) {
    console.error("Failed to load tracker rules:", err);
  });


// TAB LIFECYCLE CLEANUP

function cleanupTab(tabId) {
  if (tabId === undefined || tabId === null) return;

  delete tabCache[tabId];
  dirtyTabs.delete(tabId);

  Object.keys(requestMeta).forEach(function (requestId) {
    if (requestMeta[requestId] && requestMeta[requestId].tabId === tabId) {
      delete requestMeta[requestId];
    }
  });

  browser.storage.local.remove(["tabData_" + tabId, "tab_" + tabId]).catch(function (err) {
    console.warn("Failed to remove closed-tab analysis data:", tabId, err);
  });
}

if (browser.tabs && browser.tabs.onRemoved) {
  browser.tabs.onRemoved.addListener(function (tabId) {
    cleanupTab(tabId);
  });
}

function ensureTab(tabId) {
  if (!tabCache[tabId]) {
    tabCache[tabId] = {
      tabId: tabId,
      url: "",
      entries: [],
      mainDomain: "",
      mainBaseDomain: "",
      fingerprintingDomains: [],
      trackhar: {
        transmissions: [],
        available: false,
        error: null,
        requestMatches: 0,
        transmissionCount: 0,
        topAdapters: [],
        topProperties: []
      },
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

function getDomain(url) {
  try {
    return new URL(url).hostname.toLowerCase();
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
browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (!details.requestId) return;

    if (!requestMeta[details.requestId]) {
      requestMeta[details.requestId] = {};
    }

    requestMeta[details.requestId].tabId = details.tabId;
    requestMeta[details.requestId].requestBody = details.requestBody || null;
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

browser.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    if (!details.requestId) return;

    if (!requestMeta[details.requestId]) {
      requestMeta[details.requestId] = {};
    }

    requestMeta[details.requestId].tabId = details.tabId;
    requestMeta[details.requestId].requestHeaders = details.requestHeaders || [];
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders"]
);
function getBaseDomain(hostname) {
  if (!hostname) return "";

  var parts = hostname.toLowerCase().split(".").filter(Boolean);
  if (parts.length <= 2) return hostname.toLowerCase();

  var twoPartSuffixes = {
    "co.uk": true,
    "org.uk": true,
    "gov.uk": true,
    "ac.uk": true,
    "com.au": true,
    "net.au": true,
    "org.au": true,
    "co.nz": true,
    "com.br": true,
    "com.mx": true,
    "co.jp": true,
    "com.sg": true
  };

  var lastTwo = parts.slice(-2).join(".");
  var lastThree = parts.slice(-3).join(".");

  if (twoPartSuffixes[lastTwo] && parts.length >= 3) {
    return lastThree;
  }

  return lastTwo;
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
      if (domainMatchesPattern(domain, patterns[i]) || domainMatchesPattern(base, patterns[i])) {
        return entity;
      }
    }
  }

  return base;
}

function isSameEntity(domainA, domainB) {
  var entityA = getSiteEntity(domainA);
  var entityB = getSiteEntity(domainB);
  if (!entityA || !entityB) return false;
  return entityA === entityB;
}

function isThirdParty(requestDomain, pageDomain) {
  if (!requestDomain || !pageDomain) return false;
  return !isSameEntity(requestDomain, pageDomain);
}

function isKnownFirstPartyAssetDomain(domain, pageDomain) {
  var entity = getSiteEntity(pageDomain || "");
  var d = (domain || "").toLowerCase();

  if (entity === "amazon.com") {
    return (
      domainMatchesPattern(d, "media-amazon.com") ||
      domainMatchesPattern(d, "ssl-images-amazon.com") ||
      domainMatchesPattern(d, "images-na.ssl-images-amazon.com") ||
      domainMatchesPattern(d, "m.media-amazon.com")
    );
  }

  return false;
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
    s.indexOf(".webp") >= 0
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
  if (
    s.indexOf("sync") >= 0 ||
    s.indexOf("usersync") >= 0 ||
    s.indexOf("pixel") >= 0 ||
    s.indexOf("beacon") >= 0 ||
    s.indexOf("track") >= 0
  ) {
    return "tracking";
  }
  if (
    s.indexOf("analytics") >= 0 ||
    s.indexOf("telemetry") >= 0 ||
    s.indexOf("measure") >= 0 ||
    s.indexOf("metric") >= 0
  ) {
    return "analytics";
  }
  if (
    s.indexOf("ad") >= 0 ||
    s.indexOf("ads") >= 0 ||
    s.indexOf("bid") >= 0 ||
    s.indexOf("rtb") >= 0
  ) {
    return "ads";
  }

  return "tracking";
}

function applyTrackerPolicy(rawTracker, thirdParty) {
  if (!rawTracker) return null;
  if (rawTracker.firstPartyOnly && thirdParty) return null;
  if (rawTracker.thirdPartyOnly && !thirdParty) return null;
  if (!thirdParty && rawTracker.category !== "fingerprinting") return null;
  return rawTracker;
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

  if (
    type === "image" &&
    (path.indexOf("pixel") >= 0 || path.indexOf("beacon") >= 0 || path.indexOf("collect") >= 0)
  ) {
    score += 2;
    reasons.push("possible tracking pixel");
  }

  if (
    path.indexOf("sync") >= 0 ||
    path.indexOf("usersync") >= 0 ||
    path.indexOf("cookie") >= 0 ||
    path.indexOf("match") >= 0
  ) {
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
  var owner = (entry._owner || "").toLowerCase();
  var domain = (entry.domain || "").toLowerCase();

  if (owner === "google") {
    if (
      domain.indexOf("googlesyndication.com") >= 0 ||
      domain.indexOf("2mdn.net") >= 0 ||
      domain.indexOf("doubleclick.net") >= 0 ||
      domain.indexOf("googleadservices.com") >= 0 ||
      domain.indexOf("imasdk.googleapis.com") >= 0
    ) {
      return "Google Ads";
    }
    if (
      domain.indexOf("google-analytics.com") >= 0 ||
      domain.indexOf("googletagmanager.com") >= 0
    ) {
      return "Google Analytics";
    }
    return "Google";
  }

  if (domain.indexOf("dotmetrics.net") >= 0) return "Dotmetrics";
  if (domain.indexOf("go-mpulse.net") >= 0) return "Akamai mPulse";
  if (domain.indexOf("akstat.io") >= 0) return "akstat.io";
  if (domain.indexOf("sophi.io") >= 0) return "Sophi";
  if (domain.indexOf("webcontentassessor.com") >= 0) return "Web Content Assessor";

  return entry._owner || getBaseDomain(entry.domain || "") || entry.domain || "Unknown";
}

function normalizeTrackerVendor(entry) {
  var owner = (entry._owner || "").toLowerCase();
  var domain = (entry.domain || "").toLowerCase();

  if (
    owner === "google" ||
    domain.indexOf("google.com") >= 0 ||
    domain.indexOf("googleapis.com") >= 0 ||
    domain.indexOf("gstatic.com") >= 0 ||
    domain.indexOf("googlesyndication.com") >= 0 ||
    domain.indexOf("doubleclick.net") >= 0 ||
    domain.indexOf("2mdn.net") >= 0 ||
    domain.indexOf("googletagmanager.com") >= 0 ||
    domain.indexOf("google-analytics.com") >= 0
  ) return "Google";

  if (
    owner === "amazon" ||
    domain.indexOf("amazon-adsystem.com") >= 0 ||
    domain.indexOf("fls-na.amazon.com") >= 0
  ) return "Amazon";

  if (
    owner === "meta" ||
    domain.indexOf("facebook.com") >= 0 ||
    domain.indexOf("fbcdn.net") >= 0 ||
    domain.indexOf("instagram.com") >= 0
  ) return "Meta";

  if (
    owner === "microsoft" ||
    domain.indexOf("bing.com") >= 0 ||
    domain.indexOf("bat.bing.com") >= 0 ||
    domain.indexOf("clarity.ms") >= 0
  ) return "Microsoft";

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

  var text = ((entry.url || "") + " " + (entry.domain || "")).toLowerCase();
  var indicators = [
    "sync", "usersync", "match", "partnerid", "buyeruid", "uid", "uuid",
    "google_nid", "redir", "redirect", "callback", "pbsync", "setuid"
  ];
  var reasons = [];

  for (var i = 0; i < indicators.length; i++) {
    if (text.indexOf(indicators[i]) >= 0) {
      reasons.push(indicators[i]);
    }
  }

  if (!reasons.length) return null;

  return {
    suspected: true,
    reasons: reasons
  };
}

function analyzeTrackers(tab) {
  var uniqueDomains = {};
  var uniqueTrackerKeys = {};
  var trackerCounts = {};
  var trackerRequests = 0;

  for (var i = 0; i < tab.entries.length; i++) {
    var entry = tab.entries[i];

    if (entry.domain) uniqueDomains[entry.domain] = true;
    if (!entry._tracker && !entry._heuristicTracker) continue;

    var key = entry._service || entry._owner || entry.domain || "Unknown";
    uniqueTrackerKeys[key] = true;
    trackerCounts[key] = (trackerCounts[key] || 0) + 1;
    trackerRequests += 1;
  }

  var topTrackers = Object.keys(trackerCounts)
    .map(function (name) {
      return { name: name, count: trackerCounts[name] };
    })
    .sort(function (a, b) {
      return b.count - a.count;
    })
    .slice(0, 10);

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
    .map(function (name) {
      return { name: name, count: vendorCounts[name] };
    })
    .sort(function (a, b) {
      return b.count - a.count;
    })
    .slice(0, 10);

  var trackedBy = Object.keys(uniqueVendors)
    .filter(function (name) {
      return name && name !== "Unknown";
    })
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
  var grouped = {};
  var total = 0;

  for (var i = 0; i < tab.entries.length; i++) {
    var entry = tab.entries[i];
    if (!entry._cookieSync || !entry._cookieSync.suspected) continue;

    total += 1;
    syncDomains[entry.domain] = true;
    if (entry._vendor) syncVendors[entry._vendor] = true;

    var key = (entry._vendor || "Unknown") + "::" + (entry.domain || "Unknown");
    if (!grouped[key]) {
      grouped[key] = {
        vendor: entry._vendor || "Unknown",
        domain: entry.domain || "Unknown",
        count: 0,
        reasons: {}
      };
    }

    grouped[key].count += 1;
    for (var r = 0; r < entry._cookieSync.reasons.length; r++) {
      grouped[key].reasons[entry._cookieSync.reasons[r]] = true;
    }
  }

  var topCookieSync = Object.keys(grouped)
    .map(function (key) {
      return {
        vendor: grouped[key].vendor,
        domain: grouped[key].domain,
        count: grouped[key].count,
        reasons: Object.keys(grouped[key].reasons)
      };
    })
    .sort(function (a, b) {
      return b.count - a.count;
    })
    .slice(0, 10);

  return {
    cookieSyncCount: total,
    cookieSyncDomains: Object.keys(syncDomains).length,
    cookieSyncVendors: Object.keys(syncVendors).length,
    topCookieSync: topCookieSync
  };
}

function calculateRisk(tab, trackharResult) {
  var grouped = {};
  var score = 0;

  for (var i = 0; i < tab.entries.length; i++) {
    var entry = tab.entries[i];
    if (!entry._tracker && !entry._heuristicTracker) continue;

    var key = entry._service || entry._owner || entry.domain || "Unknown";
    if (!grouped[key]) {
      grouped[key] = {
        category: entry._category || "unknown",
        thirdParty: !!entry._thirdParty,
        confidence: entry._confidence || "unknown",
        count: 0
      };
    }

    grouped[key].count += 1;
  }

  Object.keys(grouped).forEach(function (key) {
    var item = grouped[key];

    switch (item.category) {
      case "fingerprinting":
        score += 8;
        break;
      case "tracking":
        score += 6;
        break;
      case "ads":
        score += 4;
        break;
      case "analytics":
        score += 2;
        break;
      default:
        score += 2;
        break;
    }

    if (item.thirdParty) score += 2;
    if (item.confidence === "heuristic") score += 1;
    score += Math.min(item.count, 5);
  });

  if (trackharResult && trackharResult.available) {
    score += Math.min(trackharResult.requestMatches * 2, 10);
    score += Math.min(trackharResult.transmissionCount, 10);
  }

  return score;
}

function addEntry(tabId, details, isError) {
  var tab = ensureTab(tabId);
  var url = details.url || "";
  var domain = getDomain(url);
  var meta = requestMeta[details.requestId] || {};

  if (!domain) return;

  if (details.type === "main_frame" && url) {
    tab.pageUrl = url;
  }

  if (!tab.mainDomain) {
    tab.mainDomain = domain;
    tab.mainBaseDomain = getBaseDomain(domain);
  }

  var thirdParty = false;
  if (!isKnownFirstPartyAssetDomain(domain, tab.mainDomain || domain)) {
    thirdParty = isThirdParty(domain, tab.mainDomain || domain);
  }

  var matchedTracker = null;
  if (trackerRulesReady) {
    matchedTracker = applyTrackerPolicy(matchTracker(url, domain), thirdParty);
  }

  var heuristicTracker = null;
  if (!matchedTracker) {
    heuristicTracker = classifyUnknownTracker(tab, {
      url: url,
      domain: domain,
      type: details.type || "other",
      thirdParty: thirdParty
    });
  }

  var entry = {
    url: url,
    domain: domain,
    method: details.method || "GET",
    type: details.type || "other",
    status: typeof details.statusCode === "number" ? details.statusCode : 0,
    error: isError ? (details.error || "request failed") : null,
    timestamp: Date.now(),

    requestHeaders: meta.requestHeaders || [],
    requestBody: meta.requestBody || null,

    _thirdParty: thirdParty,
    _tracker: !!matchedTracker,
    _heuristicTracker: !!heuristicTracker,
    _category: matchedTracker ? matchedTracker.category : (heuristicTracker ? heuristicTracker.category : null),
    _owner: matchedTracker ? matchedTracker.owner : null,
    _confidence: matchedTracker ? "known" : (heuristicTracker ? "heuristic" : "unknown"),
    _heuristicReasons: heuristicTracker ? heuristicTracker.reasons : []
  };

  if (entry._tracker || entry._heuristicTracker) {
    entry._service = normalizeTrackerService(entry);
    entry._vendor = normalizeTrackerVendor(entry);
  } else {
    entry._service = null;
    entry._vendor = null;
  }

  entry._cookieSync = detectCookieSync(entry);
console.log("Merged request meta:", details.requestId, {
  headers: entry.requestHeaders.length,
  hasBody: !!entry.requestBody
}),
  tab.entries.push(entry);
  

  if (tab.entries.length > 2000) {
    tab.entries.shift();
  }

  if (details.requestId && requestMeta[details.requestId]) {
    delete requestMeta[details.requestId];
  }

  dirtyTabs.add(tabId);
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
      risk: tab.risk,
      trackhar: tab.trackhar
    }
  });
}

function saveTabReport(tabId) {
  var tab = tabCache[tabId];
  if (!tab) return Promise.resolve();

  return browser.storage.local.set({
    ["tab_" + tabId]: {
      page: {
  url: tab.pageUrl || tab.url || "",
  domain: tab.mainDomain || "",
  scannedAt: new Date().toISOString()
      },
      summary: {
        riskScore: tab.risk || 0,
        totalRequests: tab.entries.length,
        thirdPartyDomains: tab.analysis.totalDomains || 0,
        trackerCount: tab.analysis.trackerCount || 0
      },
      topTrackers: tab.analysis.topTrackers || [],
      trackhar: {
      transmissions: tab.trackhar.transmissions || [],
      trackerGroups: tab.trackhar.trackerGroups || [],
      available: !!tab.trackhar.available,
      error: tab.trackhar.error || null,
      requestMatches: tab.trackhar.requestMatches || 0,
      transmissionCount: tab.trackhar.transmissionCount || 0,
      topAdapters: tab.trackhar.topAdapters || [],
      topProperties: tab.trackhar.topProperties || []
},
      analysis: tab.analysis || {}
    }
  });
}

async function runAnalysisForTab(tabId) {
  var tab = tabCache[tabId];
  if (!tab) return;

  try {
    var browserTab = await browser.tabs.get(tabId);
    if (browserTab && browserTab.url) {
      tab.pageUrl = browserTab.url;
    }
  } catch (e) {}

  var trackerAnalysis = analyzeTrackers(tab);
  var vendorAnalysis = analyzeVendors(tab);
  var cookieSyncAnalysis = analyzeCookieSync(tab);

  var trackharResult = await runTrackHARAnalysis(tab, {
    creatorVersion: browser.runtime.getManifest().version
  });

   tab.trackhar = {
  transmissions: trackharResult.transmissions || [],
  trackerGroups: trackharResult.trackerGroups || [],
  available: !!trackharResult.available,
  error: trackharResult.error || null,
  requestMatches: trackharResult.requestMatches || 0,
  transmissionCount: trackharResult.transmissionCount || 0,
  topAdapters: trackharResult.topAdapters || [],
  topProperties: trackharResult.topProperties || []
};

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

    trackharAvailable: !!trackharResult.available,
    trackharRequestMatches: trackharResult.requestMatches || 0,
    trackharTransmissionCount: trackharResult.transmissionCount || 0,
    topTrackHARGroups: trackharResult.trackerGroups || [],
    topTrackHARAdapters: trackharResult.topAdapters || [],
    topTrackHARProperties: trackharResult.topProperties || [],
    trackharError: trackharResult.error || null
  };

  tab.risk = calculateRisk(tab, trackharResult);

  await saveTabReport(tabId);
  await saveTabData(tabId);
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


function sanitizeFilename(name) {
  return String(name || "site").replace(/[\\/:*?"<>|]+/g, "_");
}

function generateStandaloneReport(reportData) {
  var json = JSON.stringify(reportData);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Privacy Report</title>
  <style>
    body { font-family: system-ui; margin: 20px; background: #f5f7fa; }
    h1 { margin-bottom: 0; }
    .section { margin-top: 20px; padding: 15px; background: white; border-radius: 10px; }
    .finding { margin-bottom: 10px; padding: 10px; border-left: 4px solid #ccc; }
    .low { border-color: #4caf50; }
    .medium { border-color: #ff9800; }
    .high { border-color: #f44336; }
  </style>
</head>
<body>
<h1>Privacy Report</h1>
<div id="app"></div>
<script>
const report = ${json};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function render() {
  const el = document.getElementById("app");
  const findings = report.findings || [];

  el.innerHTML = \`
    <div class="section">
      <h2>Summary</h2>
      <p><strong>Site:</strong> \${escapeHtml(report.page && report.page.domain)}</p>
      <p><strong>Risk Score:</strong> \${escapeHtml(report.summary && report.summary.riskScore)}</p>
      <p><strong>Requests:</strong> \${escapeHtml(report.summary && report.summary.totalRequests)}</p>
      <p><strong>Trackers:</strong> \${escapeHtml(report.summary && report.summary.trackerCount)}</p>
    </div>

    <div class="section">
      <h2>Findings</h2>
      \${findings.map(function (f) {
        return \`
          <div class="finding \${escapeHtml(f.severity)}">
            <strong>\${escapeHtml(f.tracker)} → \${escapeHtml(f.property)}</strong><br>
            \${escapeHtml(f.longText)}<br>
            <em>Value:</em> \${escapeHtml(f.value)}
          </div>
        \`;
      }).join("")}
    </div>
  \`;
}

render();
</script>
</body>
</html>
`;
}

async function downloadHtmlReport(report) {
  var html = generateStandaloneReport(report);
  var blob = new Blob([html], { type: "text/html" });
  var objectUrl = URL.createObjectURL(blob);

  var filename =
    "privacy-report-" +
    sanitizeFilename(report && report.page && report.page.domain ? report.page.domain : "site") +
    ".html";

  var downloadId;

  try {
    downloadId = await browser.downloads.download({
      url: objectUrl,
      filename: filename,
      saveAs: true,
      conflictAction: "uniquify"
    });
  } catch (err) {
    try {
      URL.revokeObjectURL(objectUrl);
    } catch (e) {}
    throw err;
  }

  function onChanged(delta) {
    if (delta.id !== downloadId) return;

    if (
      (delta.state && (delta.state.current === "complete" || delta.state.current === "interrupted")) ||
      delta.error
    ) {
      try {
        URL.revokeObjectURL(objectUrl);
      } catch (e) {}
      browser.downloads.onChanged.removeListener(onChanged);
    }
  }

  browser.downloads.onChanged.addListener(onChanged);
  return downloadId;
}

browser.runtime.onMessage.addListener(function (message) {
  if (!message || message.type !== "export-html-report") {
    return;
  }

  return downloadHtmlReport(message.report);
});
setInterval(function () {
  var ids = Array.from(dirtyTabs);
  if (!ids.length) return;

  dirtyTabs.clear();

  Promise.all(
    ids.map(function (tabId) {
      return runAnalysisForTab(tabId);
    })
  ).catch(function (err) {
    console.error("Analysis pipeline failed:", err);
  });
}, 2000);
