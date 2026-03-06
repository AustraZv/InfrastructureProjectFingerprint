import { parse } from "tldts";
import { TRACKER_DB } from "./trackerDB.js";

function isKnownTracker(domain) {
  return TRACKER_DB.some(tracker =>
    tracker.domains.some(d =>
      domain === d || domain.endsWith("." + d)
    )
  );
}

export function analyzeThirdParties(harData, siteUrl) {
  if (!harData?.log?.entries) return [];

  const siteDomain = parse(siteUrl).domain;
  const domainMap = new Map();

  for (const entry of harData.log.entries) {
    const request = entry.request;
    if (!request?.url) continue;

    const parsed = parse(request.url);
    const baseDomain = parsed.domain;

    if (!baseDomain || baseDomain === siteDomain) continue;

    if (!domainMap.has(baseDomain)) {
      domainMap.set(baseDomain, {
        domain: baseDomain,
        requestCount: 0,
        knownTracker: isKnownTracker(baseDomain),
        flagged: false
      });
    }

    domainMap.get(baseDomain).requestCount += 1;
  }

  // Flag high-frequency unknown domains
  const HIGH_FREQUENCY_THRESHOLD = 10;

  for (const domainObj of domainMap.values()) {
    if (
      !domainObj.knownTracker &&
      domainObj.requestCount >= HIGH_FREQUENCY_THRESHOLD
    ) {
      domainObj.flagged = true;
    }
  }

  // Sort by frequency descending
  return Array.from(domainMap.values())
    .sort((a, b) => b.requestCount - a.requestCount);
}