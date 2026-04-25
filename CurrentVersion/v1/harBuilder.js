

// HAR builder adapted to the current Privacy Tracker Scanner entry format.
// Input entries are flat objects from browser.webRequest listeners.

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function safeString(value, fallback) {
  return typeof value === "string" ? value : (fallback || "");
}

function safeNumber(value, fallback) {
  return Number.isFinite(value) ? value : (fallback || 0);
}

function toISODateFromTimestamp(timestamp) {
  if (!Number.isFinite(timestamp)) {
    return new Date().toISOString();
  }

  var date = new Date(timestamp);
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
    case "beacon":
      return "text/plain";
    case "websocket":
      return "application/octet-stream";
    default:
      return "application/octet-stream";
  }
}

function buildQueryString(url) {
  try {
    var parsed = new URL(url);
    var out = [];

    parsed.searchParams.forEach(function (value, name) {
      out.push({ name: name, value: value });
    });

    return out;
  } catch (e) {
    return [];
  }
}

function normalizeHeaders(headers) {
  return safeArray(headers)
    .filter(function (header) {
      return header && typeof header === "object";
    })
    .map(function (header) {
      return {
        name: safeString(header.name),
        value: safeString(header.value)
      };
    })
    .filter(function (header) {
      return header.name.length > 0;
    });
}

function findHeader(headers, headerName) {
  var normalized = String(headerName || "").toLowerCase();
  for (var i = 0; i < headers.length; i++) {
    if ((headers[i].name || "").toLowerCase() === normalized) {
      return headers[i].value || "";
    }
  }
  return "";
}

function buildPostData(entry, requestHeaders) {
  var requestBody = entry && entry.requestBody;
  if (!requestBody || typeof requestBody !== "object") {
    return undefined;
  }

  var mimeType = findHeader(requestHeaders, "content-type") || inferMimeTypeFromType(entry.type);

  if (requestBody.formData && typeof requestBody.formData === "object") {
    var params = [];

    Object.keys(requestBody.formData).forEach(function (key) {
      var values = Array.isArray(requestBody.formData[key])
        ? requestBody.formData[key]
        : [requestBody.formData[key]];

      values.forEach(function (value) {
        params.push({
          name: key,
          value: String(value)
        });
      });
    });

    return {
      mimeType: mimeType,
      params: params
    };
  }

  if (Array.isArray(requestBody.raw) && requestBody.raw.length) {
    var first = requestBody.raw[0];

    if (first && first.bytes) {
      try {
        var decoder = new TextDecoder("utf-8");
        var text = decoder.decode(first.bytes);

        return {
          mimeType: mimeType,
          text: text
        };
      } catch (e) {
        return {
          mimeType: mimeType
        };
      }
    }
  }

  return {
    mimeType: mimeType
  };
}

function buildHarEntry(entry, pageId) {
  var url = safeString(entry.url);
  var method = safeString(entry.method, "GET");
  var type = safeString(entry.type);
  var status = safeNumber(entry.status, 0);
  var startedDateTime = toISODateFromTimestamp(entry.timestamp);
  var requestHeaders = normalizeHeaders(entry.requestHeaders);
  var postData = buildPostData(entry, requestHeaders);

  var request = {
    method: method,
    url: url,
    httpVersion: "HTTP/1.1",
    cookies: [],
    headers: requestHeaders,
    queryString: buildQueryString(url),
    headersSize: -1,
    bodySize: -1
  };

  if (postData) {
    request.postData = postData;
  }

  return {
    pageref: pageId,
    startedDateTime: startedDateTime,
    time: 0,

    request: request,

    response: {
      status: status,
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

    _domain: safeString(entry.domain),
    _type: type,
    _thirdParty: Boolean(entry._thirdParty),
    _tracker: Boolean(entry._tracker),
    _heuristicTracker: Boolean(entry._heuristicTracker),
    _category: entry._category != null ? entry._category : null,
    _owner: entry._owner != null ? entry._owner : null,
    _confidence: entry._confidence != null ? entry._confidence : "unknown",
    _heuristicReasons: safeArray(entry._heuristicReasons),
    _service: entry._service != null ? entry._service : null,
    _vendor: entry._vendor != null ? entry._vendor : null,
    _cookieSync: entry._cookieSync != null ? entry._cookieSync : null
  };
}

function normalizeEntries(entries) {
  return safeArray(entries)
    .filter(function (entry) {
      return entry && typeof entry === "object";
    })
    .filter(function (entry) {
      return typeof entry.url === "string" && entry.url.length > 0;
    })
    .slice()
    .sort(function (a, b) {
      return safeNumber(a.timestamp) - safeNumber(b.timestamp);
    });
}

function computeStartedDateTime(entries) {
  if (!entries.length) {
    return new Date().toISOString();
  }

  var timestamps = entries
    .map(function (entry) {
      return safeNumber(entry.timestamp, NaN);
    })
    .filter(Number.isFinite);

  if (!timestamps.length) {
    return new Date().toISOString();
  }

  return new Date(Math.min.apply(null, timestamps)).toISOString();
}

function computeOnLoad(entries) {
  if (!entries.length) return -1;

  var timestamps = entries
    .map(function (entry) {
      return safeNumber(entry.timestamp, NaN);
    })
    .filter(Number.isFinite);

  if (!timestamps.length) return -1;

  var minTs = Math.min.apply(null, timestamps);
  var maxTs = Math.max.apply(null, timestamps);

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
  if (typeof tab.pageUrl === "string" && tab.pageUrl) {
    return tab.pageUrl;
  }

  if (typeof tab.url === "string" && tab.url) {
    return tab.url;
  }

  if (typeof tab.mainDomain === "string" && tab.mainDomain) {
    return "https://" + tab.mainDomain + "/";
  }

  return "about:blank";
}

function buildHarFromTab(tab, options) {
  options = options || {};

  if (!tab || typeof tab !== "object") {
    throw new Error("buildHarFromTab: tab must be an object");
  }

  var entries = normalizeEntries(tab.entries);
  var pageId = safeString(options.pageId, "page_1");

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

      entries: entries.map(function (entry) {
        return buildHarEntry(entry, pageId);
      }),

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

function stringifyHarFromTab(tab, options) {
  return JSON.stringify(buildHarFromTab(tab, options || {}), null, 2);
}

if (typeof self !== "undefined") {
  self.buildHarFromTab = buildHarFromTab;
  self.stringifyHarFromTab = stringifyHarFromTab;
}