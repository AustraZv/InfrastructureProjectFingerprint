// background.js

var tabCache = {};
var dirtyTabs = new Set();



// BLOCKING

browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    var tabId = details.tabId;
    if (tabId < 0) return {};

    var url = new URL(details.url);
    var domain = url.hostname;

    var tracker = matchTracker(domain);

    if (tracker && tracker.category === "ads") {
      markBlocked(tabId, domain);
      return { cancel: true };
    }

    return {};
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);


// LOGGING

browser.webRequest.onCompleted.addListener(


  function(details) {
    var tabId = details.tabId;
    if (tabId < 0) return;

    if (!tabCache[tabId]) initTab(tabId);

    var tab = tabCache[tabId];
    var url = new URL(details.url);
    var domain = url.hostname;

    var tracker = matchTracker(domain);
  
   var tracker = matchTracker(domain);
console.log("REQ:", domain, "3rd:", isThirdParty(domain, tabDomain));

var tabDomain = tab.mainDomain || domain;

var entry = {
  url: details.url,
  type: details.type,

  _domain: domain,
  _baseDomain: getBaseDomain(domain),

  _thirdParty: isThirdParty(domain, tabDomain),

  _tracker: !!tracker,
  _category: tracker ? tracker.category : "unknown",
  _owner: tracker ? tracker.owner : "Unknown",

  _blocked: false
};

    tab.entries.push(entry);
    dirtyTabs.add(tabId);
  },
  { urls: ["<all_urls>"] }
);


// INIT TAB

function initTab(tabId) {
  tabCache[tabId] = {
    entries: [],
    mainDomain: "",
    fingerprintingDomains: [],
    analysis: {},
    risk: 0
  };
}

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === "loading" && tab.url) {
    var url = new URL(tab.url);

    initTab(tabId);
    tabCache[tabId].mainDomain = url.hostname;
  }
});


// BLOCK MARK

function markBlocked(tabId, domain) {
  if (!tabCache[tabId]) return;

  var tracker = matchTracker(domain);

  tabCache[tabId].entries.push({
    url: "",
    type: "blocked",

    _domain: domain,
    _baseDomain: getBaseDomain(domain),
    _thirdParty: true,

    _tracker: !!tracker,
    _category: tracker ? tracker.category : "unknown",
    _owner: tracker ? tracker.owner : "Unknown",

    _blocked: true
  });
}

// FINGERPRINTING

function detectFingerprinting(tab) {
  var stats = {};

  tab.entries.forEach(function(e) {
    if (!e._thirdParty) return;

    var d = e._domain;

    if (!stats[d]) {
      stats[d] = { count: 0, scriptCount: 0 };
    }

    stats[d].count++;
    if (e.type === "script") stats[d].scriptCount++;
  });

  var suspicious = [];

  for (var domain in stats) {
    var s = stats[domain];
    var score = 0;

    if (s.count > 10) score += 2;
    if (s.scriptCount > 5) score += 2;
    if (/track|fingerprint|collect/i.test(domain)) score += 2;

    if (score >= 4) suspicious.push(domain);
  }

  return suspicious;
}


// ANALYSIS

function analyzeTrackers(tab) {
  var domains = new Set();
  var trackers = {};

  tab.entries.forEach(function(e) {
    if (!e._domain) return;

    domains.add(e._domain);

    if (e._tracker) {
      var key = e._baseDomain || e._domain;

      if (!trackers[key]) {
        trackers[key] = {
          count: 0,
          owner: e._owner || "Unknown",
          category: e._category || "unknown"
        };
      }

      trackers[key].count++;
    }
  });

  return {
    totalDomains: domains.size,
    trackerCount: Object.keys(trackers).length,
    topTrackers: Object.entries(trackers)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
  };
}

// RISK

function calculateRisk(tab) {
  var score = 0;

  tab.entries.forEach(function(e) {
    if (e._tracker) {
      score += CATEGORY_WEIGHTS[e._category] || 1;
    }
  });

  score += tab.fingerprintingDomains.length * 3;

  return score;
}


// LOOP

setInterval(function() {
  dirtyTabs.forEach(function(tabId) {
    var tab = tabCache[tabId];
    if (!tab) return;

    tab.fingerprintingDomains = detectFingerprinting(tab);
    tab.analysis = analyzeTrackers(tab);
    tab.risk = calculateRisk(tab);

    browser.storage.local.set({
      ["tab_" + tabId]: tab
    });
  });

  dirtyTabs.clear();
}, 2000);

