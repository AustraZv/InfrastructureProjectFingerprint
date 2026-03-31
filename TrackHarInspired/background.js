
// IN-MEMORY REQUEST TRACKER


var REQUESTS = {};



// UTIL: DOMAIN


function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return "";
  }
}

function getBaseDomain(hostname) {
  var parts = hostname.split(".");
  if (parts.length <= 2) return hostname;
  return parts.slice(-2).join(".");
}

function isThirdParty(requestDomain, firstParty) {
  if (!requestDomain || !firstParty) return false;
  return getBaseDomain(requestDomain) !== getBaseDomain(firstParty);
}



// UTIL: TYPE MAPPING


function mapType(type) {
  if (type === "script") return "script";
  if (type === "xmlhttprequest") return "xhr";
  if (type === "stylesheet") return "stylesheet";
  if (type === "image") return "image";
  if (type === "font") return "font";
  return "other";
}



// 1. CAPTURE REQUEST START


browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.tabId < 0) return;

    REQUESTS[details.requestId] = {
      startTime: details.timeStamp,
      url: details.url,
      method: details.method,
      tabId: details.tabId,
      type: details.type
    };
  },
  { urls: ["<all_urls>"] }
);



// 2. CAPTURE REQUEST END + HAR


browser.webRequest.onCompleted.addListener(
  function(details) {
    if (details.tabId < 0) return;

    var req = REQUESTS[details.requestId];
    if (!req) return;

    var duration = details.timeStamp - req.startTime;
    var domain = getDomain(req.url);

    var entry = {
      startedDateTime: new Date(req.startTime).toISOString(),
      time: duration,

      request: {
        method: req.method,
        url: req.url
      },

      response: {
        status: details.statusCode
      },

      _domain: domain,
      _type: mapType(req.type),
      _tracker: null,
      _flagged: false
    };

    processEntry(req.tabId, entry);

    delete REQUESTS[details.requestId];
  },
  { urls: ["<all_urls>"] }
);



// 3. CLEANUP FAILED REQUESTS


browser.webRequest.onErrorOccurred.addListener(
  function(details) {
    delete REQUESTS[details.requestId];
  },
  { urls: ["<all_urls>"] }
);



// CORE PROCESSING LOGIC


function processEntry(tabId, entry) {
  var key = "tab_" + tabId;

  browser.storage.local.get(key).then(function(result) {
    var data = result[key];

    
    // INIT HAR
    
    if (!data) {
      data = {
        log: {
          version: "1.2",
          creator: { name: "Tracker Extension" },
          entries: []
        },
        risk: 0,
        firstParty: entry._domain
      };
    }

    var firstParty = data.firstParty;

    
    // TRACKER DETECTION
    
    var tracker = matchTracker(entry._domain);

    var thirdParty = isThirdParty(entry._domain, firstParty);

    if (tracker && thirdParty) {
      entry._tracker = tracker.name;
      entry._flagged = true;

      // Add risk score
      data.risk += tracker.risk;
    } else {
      entry._tracker = null;
      entry._flagged = false;
    }

    
    // STORE ENTRY
    
    data.log.entries.push(entry);

    
    // SAVE BACK
    
    var obj = {};
    obj[key] = data;

    browser.storage.local.set(obj);
  });
}