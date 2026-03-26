import { TRACKER_DB } from "./tracker_db.js";

const HIGH_FREQUENCY_THRESHOLD = 5;

//  eTLD+1 
const COMMON_SECOND_LEVEL_TLDS = [
  "co.uk","org.uk","gov.uk","co.jp","com.au","com.br","co.in","com.mx"
];

function normalizeDomain(domain) {
  return domain.replace(/^www\./, "");
}

function getBaseDomain(hostname) {
  const parts = hostname.split(".");
  if (parts.length <= 2) return hostname;

  const lastTwo = parts.slice(-2).join(".");
  const lastThree = parts.slice(-3).join(".");

  if (COMMON_SECOND_LEVEL_TLDS.includes(lastTwo)) {
    return lastThree;
  }

  return lastTwo;
}

function isThirdParty(requestDomain, firstPartyDomain) {
  const reqBase = getBaseDomain(normalizeDomain(requestDomain));
  const firstBase = getBaseDomain(normalizeDomain(firstPartyDomain));
  return reqBase !== firstBase;
}

// Tracker Matching
function matchTracker(domain) {
  const base = getBaseDomain(domain);

  for (const tracker of TRACKER_DB) {
    for (const d of tracker.domains) {
      if (base === d || domain.endsWith("." + d)) {
        return tracker;
      }
    }
  }
  return null;
}

// Infrastructure 
const INFRASTRUCTURE_PATTERNS = [
  "media-amazon.com","ssl-images-amazon.com","cloudfront.net",
  "akamai.net","fastly.net","cdn","static","images"
];

function isLikelyInfrastructure(domain) {
  return INFRASTRUCTURE_PATTERNS.some(
    p => domain === p || domain.endsWith("." + p)
  );
}

//  Request Weights 
const TYPE_WEIGHTS = {
  script: 3,
  xmlhttprequest: 3,
  fetch: 3,
  websocket: 3,
  sub_frame: 2,
  main_frame: 1,
  image: 0.5,
  media: 0.5,
  font: 0.2,
  stylesheet: 0.2,
  other: 1
};

function getTypeWeight(type) {
  return TYPE_WEIGHTS[type] || 1;
}

//  Tab Init 
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && tab.url) {
    try {
      const url = new URL(tab.url);
      const data = {
        firstParty: url.hostname,
        domains: {},
        timeline: []
      };
      await browser.storage.local.set({ ["tab_" + tabId]: data });
    } catch (e) {
      console.error(e);
    }
  }
});

browser.tabs.onRemoved.addListener(tabId => {
  browser.storage.local.remove("tab_" + tabId);
});

// Request Tracking 
browser.webRequest.onCompleted.addListener(
  async details => {
    const tabId = details.tabId;
    if (tabId < 0) return;

    const key = "tab_" + tabId;
    const stored = await browser.storage.local.get(key);
    const tabInfo = stored[key];
    if (!tabInfo) return;

    try {
      const url = new URL(details.url);
      const domain = url.hostname;

      if (!isThirdParty(domain, tabInfo.firstParty)) return;

      const isInfra = isLikelyInfrastructure(domain);
      const trackerMatch = matchTracker(domain);

      if (!tabInfo.domains[domain]) {
        tabInfo.domains[domain] = {
          count: 0,
          requests: 0,
          known: !!trackerMatch,
          info: trackerMatch || null,
          category: trackerMatch ? trackerMatch.category : "unknown",
          infrastructure: isInfra,
          flagged: false,
          timeline: []
        };
      }

      const entry = tabInfo.domains[domain];
      const weight = getTypeWeight(details.type);
      const now = Date.now();

      entry.count += weight;
      entry.requests++;

      entry.timeline.push({
        time: now,
        type: details.type,
        weight
      });

      if (entry.timeline.length > 50) entry.timeline.shift();

      // Global timeline
      
     if (!isInfra && isThirdParty(domain, tabInfo.firstParty)) {
  tabInfo.timeline.push({
    time: now,
    domain,
    type: details.type,
    weight
  });

  if (tabInfo.timeline.length > 200) {
    tabInfo.timeline.shift();
  }
}

      // Flag unknown high-frequency domains
      if (
        !entry.known &&
        !entry.infrastructure &&
        entry.count >= HIGH_FREQUENCY_THRESHOLD
      ) {
        entry.flagged = true;
      }

      await browser.storage.local.set({ [key]: tabInfo });

      const total = Object.keys(tabInfo.domains).length;
      browser.action.setBadgeText({
        text: total ? String(total) : "",
        tabId
      });

    } catch (e) {
      console.error(e);
    }
  },
  { urls: ["<all_urls>"] }
);

//  Risk Calculation 
function calculateRisk(domainsObj) {
  let score = 0;

  const categoryMultiplier = {
    advertising: 1.2,
    analytics: 1.0,
    tracking: 1.3,
    "data broker": 1.5
  };

  const entries = Object.values(domainsObj);

  for (const info of entries) {
    if (info.infrastructure) continue;

    const count = info.count || 1;

    if (info.known) {
      const baseRisk = info.info.risk;
      const mult = categoryMultiplier[info.category] || 1;
      score += baseRisk * mult * Math.log2(count + 1);
    } else {
      if (info.flagged) score += 5;
      else score += 1;
    }
  }

  const total = entries.length;
  if (total > 30) score += 10;
  if (total > 50) score += 15;

  return Math.round(score);
}

//  Messaging 
browser.runtime.onMessage.addListener(message => {
  if (message.type === "GET_REPORT") {
    return (async () => {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      if (!tabs.length) return { domains: {}, riskScore: 0 };

      const tabId = tabs[0].id;
      const key = "tab_" + tabId;

      const stored = await browser.storage.local.get(key);
      const data = stored[key] || { domains: {}, timeline: [] };

      return {
        ...data,
        riskScore: calculateRisk(data.domains)
      };
    })();
  }
});