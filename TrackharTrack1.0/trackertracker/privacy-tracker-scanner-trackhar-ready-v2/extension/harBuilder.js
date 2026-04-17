// extension/harBuilder.js
//
// HAR builder adapted to the current Privacy Tracker Scanner entry format.
// Input entries are flat objects from browser.webRequest listeners.

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function safeString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function safeNumber(value, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

function toISODateFromTimestamp(timestamp) {
  if (!Number.isFinite(timestamp)) {
    return new Date().toISOString();
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }

  return date.toISOString();
}

function inferMimeTypeFromType(type) {
  switch (type) {
    case "script":
      return "application/javascript";
    case "stylesheet":
      return "text/css";
    case "image":
      return "image/*";
    case "xmlhttprequest":
      return "application/json";
    case "fetch":
      return "application/json";
    case "document":
      return "text/html";
    case "sub_frame":
      return "text/html";
    case "font":
      return "font/*";
    case "media":
      return "media/*";
    case "ping":
      return "text/plain";
    case "websocket":
      return "application/octet-stream";
    default:
      return "application/octet-stream";
  }
}

function buildQueryString(url) {
  try {
    const parsed = new URL(url);
    const out = [];

    for (const [name, value] of parsed.searchParams.entries()) {
      out.push({ name, value });
    }

    return out;
  } catch {
    return [];
  }
}

function buildHarEntry(entry, pageId) {
  const url = safeString(entry.url);
  const method = safeString(entry.method, "GET");
  const type = safeString(entry.type);
  const status = safeNumber(entry.status, 0);
  const startedDateTime = toISODateFromTimestamp(entry.timestamp);

  return {
    pageref: pageId,
    startedDateTime,
    time: 0,

    request: {
      method,
      url,
      httpVersion: "HTTP/1.1",
      cookies: [],
      headers: [],
      queryString: buildQueryString(url),
      headersSize: -1,
      bodySize: -1
    },

    response: {
      status,
      statusText: "",
      httpVersion: "HTTP/1.1",
      cookies: [],
      headers: [],
      content: {
        size: 0,
        mimeType: inferMimeTypeFromType(type),
        compression: 0
      },
      redirectURL: "",
      headersSize: -1,
      bodySize: -1
    },

    cache: {},

    timings: {
      blocked: 0,
      dns: -1,
      connect: -1,
      ssl: -1,
      send: 0,
      wait: 0,
      receive: 0
    },

    // Custom fields preserved for your extension analysis / later merging
    _domain: safeString(entry.domain),
    _type: type,
    _thirdParty: Boolean(entry._thirdParty),
    _tracker: Boolean(entry._tracker),
    _heuristicTracker: Boolean(entry._heuristicTracker),
    _category: entry._category ?? null,
    _owner: entry._owner ?? null,
    _confidence: entry._confidence ?? "unknown",
    _heuristicReasons: safeArray(entry._heuristicReasons),
    _service: entry._service ?? null,
    _vendor: entry._vendor ?? null,
    _cookieSync: entry._cookieSync ?? null
  };
}

function normalizeEntries(entries) {
  return safeArray(entries)
    .filter(entry => entry && typeof entry === "object")
    .filter(entry => typeof entry.url === "string" && entry.url.length > 0)
    .slice()
    .sort((a, b) => safeNumber(a.timestamp) - safeNumber(b.timestamp));
}

function computeStartedDateTime(entries) {
  if (!entries.length) {
    return new Date().toISOString();
  }

  const timestamps = entries
    .map(entry => safeNumber(entry.timestamp, NaN))
    .filter(Number.isFinite);

  if (!timestamps.length) {
    return new Date().toISOString();
  }

  return new Date(Math.min(...timestamps)).toISOString();
}

function computeOnLoad(entries) {
  if (!entries.length) return -1;

  const timestamps = entries
    .map(entry => safeNumber(entry.timestamp, NaN))
    .filter(Number.isFinite);

  if (!timestamps.length) return -1;

  const minTs = Math.min(...timestamps);
  const maxTs = Math.max(...timestamps);

  return Math.max(0, maxTs - minTs);
}

function inferPageTitle(tab) {
  if (typeof tab.title === "string" && tab.title.trim()) {
    return tab.title.trim();
  }

  if (typeof tab.mainDomain === "string" && tab.mainDomain) {
    return tab.mainDomain;
  }

  return "Tracked Page";
}

function inferPageURL(tab) {
  if (typeof tab.url === "string" && tab.url) {
    return tab.url;
  }

  if (typeof tab.mainDomain === "string" && tab.mainDomain) {
    return `https://${tab.mainDomain}/`;
  }

  return "about:blank";
}

function buildHarFromTab(tab, options = {}) {
  if (!tab || typeof tab !== "object") {
    throw new Error("buildHarFromTab: tab must be an object");
  }

  const entries = normalizeEntries(tab.entries);
  const pageId = safeString(options.pageId, "page_1");

  return {
    log: {
      version: "1.2",

      creator: {
        name: safeString(options.creatorName, "Privacy Tracker Scanner"),
        version: safeString(options.creatorVersion, "1.0.0")
      },

      browser: {
        name: safeString(options.browserName, "Firefox"),
        version: safeString(options.browserVersion, "")
      },

      pages: [
        {
          startedDateTime: computeStartedDateTime(entries),
          id: pageId,
          title: inferPageTitle(tab),
          pageTimings: {
            onContentLoad: -1,
            onLoad: computeOnLoad(entries)
          }
        }
      ],

      entries: entries.map(entry => buildHarEntry(entry, pageId)),

      _privacyTrackerScanner: {
        pageURL: inferPageURL(tab),
        mainDomain: safeString(tab.mainDomain),
        mainBaseDomain: safeString(tab.mainBaseDomain),
        risk: safeNumber(tab.risk, 0),
        generatedAt: new Date().toISOString()
      }
    }
  };
}

function stringifyHarFromTab(tab, options = {}) {
  return JSON.stringify(buildHarFromTab(tab, options), null, 2);
}

if (typeof self !== "undefined") {
  self.buildHarFromTab = buildHarFromTab;
  self.stringifyHarFromTab = stringifyHarFromTab;
}
