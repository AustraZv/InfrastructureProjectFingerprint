import * as trackhar from "trackhar";

export function runTrackHAR(harData) {
  const trackerMap = new Map();

  if (!harData?.log?.entries) return [];

  for (const entry of harData.log.entries) {
    const request = entry?.request;

    if (
      !request ||
      typeof request.url !== "string" ||
      !Array.isArray(request.headers)
    ) {
      continue;
    }

    try {
      const adapter = trackhar.adapterForRequest(request);

      if (!adapter) continue;

      if (!trackerMap.has(adapter.slug)) {
        trackerMap.set(adapter.slug, {
          trackerName: adapter.name,
          trackerSlug: adapter.slug,
          urls: []
        });
      }

      trackerMap.get(adapter.slug).urls.push(request.url);
      console.log(
  harData.log.entries.slice(0, 5).map(e => e.request.url)
);
    } catch {
      continue;
    }
  }

  return Array.from(trackerMap.values());
}

