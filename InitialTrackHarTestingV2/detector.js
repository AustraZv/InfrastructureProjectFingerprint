import { parse } from "tldts";
import { TRACKER_DB } from "./trackerDB.js";

function matchesDomain(baseDomain, trackerDomains) {
  return trackerDomains.some(d =>
    baseDomain === d || baseDomain.endsWith("." + d)
  );
}

export function runInternalDetection(harData, siteUrl) {
  if (!harData?.log?.entries) return [];

  const detections = [];
  const seen = new Set();

  const siteDomain = parse(siteUrl).domain;

  for (const entry of harData.log.entries) {
    const request = entry.request;
    if (!request?.url) continue;

    const parsed = parse(request.url);
    const baseDomain = parsed.domain;

    if (!baseDomain || baseDomain === siteDomain) continue;

    for (const tracker of TRACKER_DB) {
      if (matchesDomain(baseDomain, tracker.domains)) {
        const key = tracker.name + baseDomain;

        if (!seen.has(key)) {
          detections.push({
            name: tracker.name,
            category: tracker.category,
            risk: tracker.risk,
            domain: baseDomain,
            source: "internal",
            url: request.url
          });

          seen.add(key);
        }
      }
    }
  }

  return detections;
}