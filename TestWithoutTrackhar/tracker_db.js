export const TRACKER_DB = [
  { name: "Google Analytics", category: "analytics", risk: 5, domains: ["google-analytics.com","analytics.google.com"] },
  { name: "Google Ads", category: "advertising", risk: 7, domains: ["doubleclick.net","2mdn.net","googlesyndication.com"] },
  { name: "Facebook", category: "tracking", risk: 7, domains: ["facebook.net","connect.facebook.net"] },
  { name: "Amazon Ads", category: "advertising", risk: 6, domains: ["amazon-adsystem.com"] },
  { name: "Microsoft Clarity", category: "analytics", risk: 4, domains: ["clarity.ms"] },
  { name: "Hotjar", category: "analytics", risk: 5, domains: ["hotjar.com"] },
  { name: "Segment", category: "tracking", risk: 6, domains: ["segment.com"] },
  { name: "Mixpanel", category: "analytics", risk: 5, domains: ["mixpanel.com"] },
  { name: "Amplitude", category: "analytics", risk: 5, domains: ["amplitude.com"] },
  { name: "Snowplow", category: "analytics", risk: 5, domains: ["snowplowanalytics.com"] },

  { name: "OpenX", category: "advertising", risk: 7, domains: ["openx.net"] },
  { name: "PubMatic", category: "advertising", risk: 7, domains: ["pubmatic.com"] },
  { name: "Index Exchange", category: "advertising", risk: 7, domains: ["casalemedia.com"] },
  { name: "Criteo", category: "advertising", risk: 7, domains: ["criteo.com"] },
  { name: "Adform", category: "advertising", risk: 7, domains: ["adform.net"] },
  { name: "Rubicon Project", category: "advertising", risk: 7, domains: ["rubiconproject.com"] },

  { name: "Lotame", category: "data broker", risk: 8, domains: ["agkn.com"] },
  { name: "Oracle BlueKai", category: "data broker", risk: 9, domains: ["bluekai.com"] },
  { name: "LiveRamp", category: "data broker", risk: 9, domains: ["liveramp.com"] },
  { name: "Experian", category: "data broker", risk: 9, domains: ["experian.com"] },

  { name: "Quantcast", category: "analytics", risk: 6, domains: ["quantserve.com"] },
  { name: "Chartbeat", category: "analytics", risk: 5, domains: ["chartbeat.com"] },
  { name: "Comscore", category: "analytics", risk: 6, domains: ["scorecardresearch.com"] },
  { name: "New Relic", category: "analytics", risk: 3, domains: ["newrelic.com"] },
  { name: "Datadog", category: "analytics", risk: 3, domains: ["datadoghq.com"] },

  { name: "Cloudflare Insights", category: "analytics", risk: 2, domains: ["cloudflareinsights.com"] },
  { name: "Akamai mPulse", category: "analytics", risk: 3, domains: ["go-mpulse.net"] },

  { name: "Dotmetrics", category: "analytics", risk: 4, domains: ["dotmetrics.net"] },
  { name: "Samba TV", category: "tracking", risk: 6, domains: ["samba.tv"] },
  { name: "Mookie", category: "advertising", risk: 6, domains: ["mookie1.com"] },
  { name: "BidSwitch", category: "advertising", risk: 7, domains: ["bidswitch.net"] },
  { name: "Exelate", category: "data broker", risk: 8, domains: ["exelator.com"] },

  // --- Add many generic known trackers ---
  { name: "Taboola", category: "advertising", risk: 6, domains: ["taboola.com"] },
  { name: "Outbrain", category: "advertising", risk: 6, domains: ["outbrain.com"] },
  { name: "Yahoo Ads", category: "advertising", risk: 7, domains: ["yahoo.com","yimg.com"] },
  { name: "Pinterest", category: "tracking", risk: 5, domains: ["pinterest.com"] },
  { name: "Twitter Ads", category: "advertising", risk: 6, domains: ["ads-twitter.com"] },

  // (expand pattern)
  ...Array.from({ length: 60 }).map((_, i) => ({
    name: `Generic Tracker ${i}`,
    category: i % 4 === 0 ? "advertising" :
              i % 4 === 1 ? "analytics" :
              i % 4 === 2 ? "tracking" : "data broker",
    risk: 4 + (i % 5),
    domains: [`tracker${i}.example.com`]
  }))
];