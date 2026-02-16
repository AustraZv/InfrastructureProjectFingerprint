import { parse } from "tldts";
const KNOWN_TRACKERS = {
  // Google Ecosystem
  "googletagmanager.com": {
    name: "Google Tag Manager",
    category: "tag_manager",
    risk: 3
  },
  "google-analytics.com": {
    name: "Google Analytics",
    category: "analytics",
    risk: 5
  },
  "analytics.google.com": {
    name: "Google Analytics",
    category: "analytics",
    risk: 5
  },
  "doubleclick.net": {
    name: "Google Ads / DoubleClick",
    category: "advertising",
    risk: 7
  },
  "googlesyndication.com": {
    name: "Google AdSense",
    category: "advertising",
    risk: 7
  },
  "googleadservices.com": {
    name: "Google Ad Services",
    category: "advertising",
    risk: 7
  },
  "gstatic.com": {
    name: "Google Static / Possible Tracking",
    category: "infrastructure",
    risk: 2
  },

  // Meta / Facebook
  "facebook.net": {
    name: "Meta Pixel",
    category: "social_tracker",
    risk: 6
  },
  "connect.facebook.net": {
    name: "Meta Pixel",
    category: "social_tracker",
    risk: 6
  },
  "facebook.com": {
    name: "Meta Tracking",
    category: "social_tracker",
    risk: 6
  },

  // TikTok
  "tiktok.com": {
    name: "TikTok Pixel",
    category: "social_tracker",
    risk: 6
  },
  "analytics.tiktok.com": {
    name: "TikTok Analytics",
    category: "analytics",
    risk: 6
  },

  // Twitter / X
  "twitter.com": {
    name: "Twitter Pixel",
    category: "social_tracker",
    risk: 5
  },
  "analytics.twitter.com": {
    name: "Twitter Analytics",
    category: "analytics",
    risk: 5
  },

  // Microsoft
  "bing.com": {
    name: "Microsoft Advertising",
    category: "advertising",
    risk: 6
  },
  "clarity.ms": {
    name: "Microsoft Clarity",
    category: "session_recording",
    risk: 6
  },

  // Amazon
  "amazon-adsystem.com": {
    name: "Amazon Ads",
    category: "advertising",
    risk: 7
  },

  // LinkedIn
  "linkedin.com": {
    name: "LinkedIn Insight Tag",
    category: "social_tracker",
    risk: 5
  },
  "licdn.com": {
    name: "LinkedIn Tracking",
    category: "social_tracker",
    risk: 5
  },

  // Hotjar
  "hotjar.com": {
    name: "Hotjar",
    category: "session_recording",
    risk: 6
  },
  "hjapi.com": {
    name: "Hotjar API",
    category: "session_recording",
    risk: 6
  },

  // Adobe
  "omtrdc.net": {
    name: "Adobe Analytics",
    category: "analytics",
    risk: 6
  },
  "adobedtm.com": {
    name: "Adobe Dynamic Tag Manager",
    category: "tag_manager",
    risk: 5
  },

  // HubSpot
  "hs-scripts.com": {
    name: "HubSpot Tracking",
    category: "marketing_automation",
    risk: 5
  },
  "hubspot.com": {
    name: "HubSpot Analytics",
    category: "marketing_automation",
    risk: 5
  },

  // Cloudflare tracking
  "cloudflareinsights.com": {
    name: "Cloudflare Web Analytics",
    category: "analytics",
    risk: 3
  },

  // Quantcast
  "quantserve.com": {
    name: "Quantcast",
    category: "advertising",
    risk: 6
  },

  // Criteo
  "criteo.com": {
    name: "Criteo",
    category: "advertising",
    risk: 7
  },

  // Taboola
  "taboola.com": {
    name: "Taboola",
    category: "advertising",
    risk: 7
  },

  // Outbrain
  "outbrain.com": {
    name: "Outbrain",
    category: "advertising",
    risk: 7
  },

  // Pinterest
  "pinterest.com": {
    name: "Pinterest Tag",
    category: "social_tracker",
    risk: 5
  },

  // Snap
  "snapchat.com": {
    name: "Snap Pixel",
    category: "social_tracker",
    risk: 6
  }
};


export function runInternalDetection(harData, siteUrl) {
  const detections = [];
  const seen = new Set();

  if (!harData?.log?.entries) return [];

  const siteDomain = parse(siteUrl).domain;

  for (const entry of harData.log.entries) {
    const request = entry.request;
    if (!request?.url) continue;

    const parsed = parse(request.url);
    const baseDomain = parsed.domain;

    if (!baseDomain || baseDomain === siteDomain) continue;

    if (KNOWN_TRACKERS[baseDomain] && !seen.has(baseDomain)) {
      detections.push({
        ...KNOWN_TRACKERS[baseDomain],
        domain: baseDomain,
        source: "internal",
        url: request.url
      });

      seen.add(baseDomain);
    }
  }

  return detections;
}
