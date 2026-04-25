function getTrackHARProcessor() {
  if (typeof TrackHAR !== "undefined" && TrackHAR && typeof TrackHAR.process === "function") {
    return TrackHAR.process;
  }

  if (typeof processHar === "function") {
    return processHar;
  }

  return null;
}

function countBy(items, keyGetter) {
  var counts = {};

  for (var i = 0; i < items.length; i++) {
    var key = keyGetter(items[i]);
    if (!key) continue;
    counts[key] = (counts[key] || 0) + 1;
  }

  return Object.keys(counts)
    .map(function (name) {
      return { name: name, count: counts[name] };
    })
    .sort(function (a, b) {
      return b.count - a.count;
    })
    .slice(0, 10);
}

function readFirstString() {
  for (var i = 0; i < arguments.length; i++) {
    var value = arguments[i];

    if (typeof value === "string" && value.trim()) {
      return value;
    }

    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }
  }

  return "";
}

function readNestedString(obj, paths) {
  if (!obj || !paths || !paths.length) return "";

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i].split(".");
    var current = obj;
    var ok = true;

    for (var j = 0; j < path.length; j++) {
      if (current && typeof current === "object" && path[j] in current) {
        current = current[path[j]];
      } else {
        ok = false;
        break;
      }
    }

    if (!ok) continue;

    if (typeof current === "string" && current.trim()) {
      return current;
    }

    if (typeof current === "number" || typeof current === "boolean") {
      return String(current);
    }
  }

  return "";
}

function prettifyTrackerName(slug) {
  var names = {
    google: "Google LLC",
    facebook: "Meta Platforms, Inc.",
    meta: "Meta Platforms, Inc.",
    amazon: "Amazon",
    microsoft: "Microsoft",
    tiktok: "TikTok",
    adobe: "Adobe"
  };

  return names[slug] || slug;
}

function inferTrackerFromAdapterName(adapterName) {
  var name = String(adapterName || "");

  if (name.indexOf("/") !== -1) {
    var slug = name.split("/")[0];

    return {
      slug: slug,
      name: prettifyTrackerName(slug),
      description: "TrackHAR detected data transmissions associated with this tracker.",
      datenanfragenSlug: null,
      exodusId: 0
    };
  }

  return {
    slug: "unknown",
    name: adapterName || "Unknown tracker",
    description: "TrackHAR detected data transmissions associated with this tracker.",
    datenanfragenSlug: null,
    exodusId: 0
  };
}

function normalizeTrackerMetadata(rawTracker, fallbackName) {
  if (!rawTracker || typeof rawTracker !== "object") {
    return inferTrackerFromAdapterName(fallbackName);
  }

  return {
    slug: rawTracker.slug || inferTrackerFromAdapterName(fallbackName).slug,
    name: rawTracker.name || prettifyTrackerName(rawTracker.slug) || fallbackName || "Unknown tracker",
    description:
      rawTracker.description ||
      "TrackHAR detected data transmissions associated with this tracker.",
    datenanfragenSlug: rawTracker.datenanfragenSlug || null,
    exodusId: rawTracker.exodusId || 0
  };
}

function normalizeTransmission(item) {
  if (!item || typeof item !== "object") return null;

  var rawAdapter =
    item.adapter && typeof item.adapter === "object"
      ? item.adapter
      : null;

  var rawTracker =
    item.tracker && typeof item.tracker === "object"
      ? item.tracker
      : rawAdapter && rawAdapter.tracker
        ? rawAdapter.tracker
        : null;

  var adapterName = readFirstString(
    item.adapterName,
    rawAdapter && rawAdapter.name,
    rawAdapter && rawAdapter.slug,
    typeof item.adapter === "string" ? item.adapter : "",
    typeof item.tracker === "string" ? item.tracker : "",
    item.vendor,
    item.source,
    readNestedString(item, [
      "adapter.name",
      "adapter.slug",
      "adapter.key",
      "adapter.id",
      "tracker.name",
      "tracker.slug",
      "tracker.key",
      "vendor.name"
    ])
  );

  var trackerMeta = rawTracker
    ? normalizeTrackerMetadata(rawTracker, adapterName)
    : inferTrackerFromAdapterName(adapterName);

  var property = readFirstString(
    item.property,
    item.propertyName,
    item.key,
    item.name,
    item.parameter,
    readNestedString(item, [
      "property.name",
      "property.key",
      "property.id",
      "field.name",
      "field.key"
    ])
  );

  var value = item.value;
  if (value === undefined || value === null) {
    value = readNestedString(item, [
      "property.value",
      "match.value",
      "data.value",
      "parameterValue"
    ]);
  }

  var context = readFirstString(
    item.context,
    item.location,
    item.source,
    readNestedString(item, [
      "match.context",
      "match.location",
      "property.context"
    ])
  );

  var path = readFirstString(
    item.path,
    item.field,
    item.parameter,
    readNestedString(item, [
      "match.path",
      "property.path",
      "location.path"
    ])
  );

  var reasoning = readFirstString(
    item.reasoning,
    item.reason,
    readNestedString(item, [
      "match.reason",
      "property.reasoning"
    ])
  );

  return {
    adapter: adapterName || "unknown",
    adapterName: adapterName || "unknown",
    adapterSlug: rawAdapter && rawAdapter.slug ? rawAdapter.slug : null,

    tracker: trackerMeta.name || adapterName || "Unknown tracker",
    trackerSlug: trackerMeta.slug || "unknown",
    trackerMetadata: trackerMeta,

    property: property || "unknownProperty",
    value: value,
    context: context || "",
    path: path || "",
    reasoning: reasoning || ""
  };
}

function extractTransmissions(trackharResult) {
  if (!trackharResult) return [];

  var transmissions = [];

  function pushNormalized(item) {
    var normalized = normalizeTransmission(item);
    if (normalized) {
      transmissions.push(normalized);
    }
  }

  function processItem(item) {
    if (!item) return;

    if (Array.isArray(item)) {
      for (var i = 0; i < item.length; i++) {
        processItem(item[i]);
      }
      return;
    }

    if (typeof item === "object") {
      if (
        item.adapter ||
        item.property ||
        item.value !== undefined ||
        item.context ||
        item.path ||
        item.reasoning
      ) {
        pushNormalized(item);
        return;
      }

      if (Array.isArray(item.transmissions)) {
        processItem(item.transmissions);
        return;
      }

      if (Array.isArray(item.results)) {
        processItem(item.results);
        return;
      }

      if (Array.isArray(item.matches)) {
        processItem(item.matches);
        return;
      }
    }
  }

  processItem(trackharResult);
  return transmissions;
}

function extractRequestMatches(trackharResult, transmissions) {
  if (!trackharResult) return 0;

  if (typeof trackharResult.requestMatches === "number") {
    return trackharResult.requestMatches;
  }

  if (Array.isArray(trackharResult)) {
    return trackharResult.filter(function (item) {
      return item !== undefined && item !== null;
    }).length;
  }

  if (Array.isArray(trackharResult.results)) {
    return trackharResult.results.filter(function (item) {
      return item !== undefined && item !== null;
    }).length;
  }

  if (Array.isArray(trackharResult.matches)) {
    return trackharResult.matches.filter(function (item) {
      return item !== undefined && item !== null;
    }).length;
  }

  return transmissions.length;
}

function groupTransmissionsByTracker(transmissions) {
  var grouped = {};

  for (var i = 0; i < (transmissions || []).length; i++) {
    var transmission = transmissions[i];

    var tracker = transmission.trackerMetadata || {
      slug: transmission.trackerSlug || "unknown",
      name: transmission.tracker || "Unknown tracker",
      description: "TrackHAR detected data transmissions associated with this tracker.",
      datenanfragenSlug: null,
      exodusId: 0
    };

    var slug = tracker.slug || "unknown";

    if (!grouped[slug]) {
      grouped[slug] = {
        tracker: tracker,
        count: 0,
        adapters: {},
        properties: {},
        transmissions: []
      };
    }

    grouped[slug].count += 1;

    var adapterName = transmission.adapterName || transmission.adapter || "unknown";
    var propertyName = transmission.property || "unknownProperty";

    grouped[slug].adapters[adapterName] =
      (grouped[slug].adapters[adapterName] || 0) + 1;

    grouped[slug].properties[propertyName] =
      (grouped[slug].properties[propertyName] || 0) + 1;

    grouped[slug].transmissions.push(transmission);
  }

  return Object.keys(grouped)
    .map(function (slug) {
      return grouped[slug];
    })
    .sort(function (a, b) {
      return b.count - a.count;
    });
}

async function runTrackHARAnalysis(tab, options) {
  try {
    var processor = getTrackHARProcessor();

    if (!processor) {
      return {
        available: false,
        requestMatches: 0,
        transmissionCount: 0,
        transmissions: [],
        trackerGroups: [],
        topAdapters: [],
        topProperties: [],
        error: "TrackHAR bundle not present"
      };
    }

    if (typeof buildHarFromTab !== "function") {
      return {
        available: false,
        requestMatches: 0,
        transmissionCount: 0,
        transmissions: [],
        trackerGroups: [],
        topAdapters: [],
        topProperties: [],
        error: "HAR builder not present"
      };
    }

    if (!tab || !Array.isArray(tab.entries) || !tab.entries.length) {
      return {
        available: true,
        requestMatches: 0,
        transmissionCount: 0,
        transmissions: [],
        trackerGroups: [],
        topAdapters: [],
        topProperties: [],
        error: null
      };
    }

    var har = buildHarFromTab(tab, options || {});
    var rawResult = await processor(har);

    console.log("TrackHAR raw result:", rawResult);

    if (Array.isArray(rawResult)) {
      var firstHandled = rawResult.find(function (item) {
        return item != null;
      });

      console.log("First handled TrackHAR item:", firstHandled);

      if (Array.isArray(firstHandled) && firstHandled.length) {
        console.log("First handled TrackHAR transmission:", firstHandled[0]);
      }
    }

    var transmissions = extractTransmissions(rawResult);
    var requestMatches = extractRequestMatches(rawResult, transmissions);

    var topAdapters = countBy(transmissions, function (item) {
      return item.adapter;
    });

    var topProperties = countBy(transmissions, function (item) {
      return item.property;
    });

    var trackerGroups = groupTransmissionsByTracker(transmissions);

    return {
      available: true,
      requestMatches: requestMatches,
      transmissionCount: transmissions.length,
      transmissions: transmissions,
      trackerGroups: trackerGroups,
      topAdapters: topAdapters,
      topProperties: topProperties,
      error: null
    };
  } catch (err) {
    return {
      available: true,
      requestMatches: 0,
      transmissionCount: 0,
      transmissions: [],
      trackerGroups: [],
      topAdapters: [],
      topProperties: [],
      error: err && err.message ? err.message : String(err)
    };
  }
}