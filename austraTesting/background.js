import { crawlWebsite } from "./crawler.js";
import { runInternalDetection } from "./detector.js";
import { runTrackHAR } from "./trackhar.js";
import { analyzeThirdParties } from "./thirdPartyAnalyzer.js";
import fs from "fs";



// Store per-tab scan data
const tabScans = {};
// Infra detect
function isLikelyInfrastructure(domain) {
  return INFRASTRUCTURE_PATTERNS.some(pattern =>
    domain.includes(pattern)
  );
}



// Utility: extract hostname
function getHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}


// Utility: get base domain (simple version)
function getBaseDomain(hostname) {
  const parts = hostname.split(".");
  if (parts.length <= 2) return hostname;
  return parts.slice(-2).join(".");
}


// Initialize tab state
function initTab(tabId, mainUrl) {
  const hostname = getHostname(mainUrl);
  if (!hostname) return;

  tabScans[tabId] = {
    mainDomain: getBaseDomain(hostname),
    thirdParties: {},
    score: 0
  };
  runMain(details.documentUrl);

}
// Handle completed requests
browser.webRequest.onCompleted.addListener(
  (details) => {
    const tabId = details.tabId;
    if (tabId < 0) return;

    if (!tabScans[tabId]) {
      initTab(tabId, details.documentUrl || details.url);
    }

    const scan = tabScans[tabId];
    if (!scan) return;

    const hostname = getHostname(details.url);
    if (!hostname) return;

    const domain = getBaseDomain(hostname);

    if (domain !== scan.mainDomain) {
      scan.thirdParties[domain] =
        (scan.thirdParties[domain] || 0) + 1;
      updateScore(tabId);
    }
  },
  { urls: ["<all_urls>"] }

);

// Simple scoring

function updateScore(tabId) {
  const scan = tabScans[tabId];
  const thirdPartyCount = Object.keys(scan.thirdParties).length;

  scan.score = Math.min(thirdPartyCount * 5, 100);

  browser.browserAction.setBadgeText({
    text: thirdPartyCount.toString(),
    tabId
  });

  browser.browserAction.setBadgeBackgroundColor({
    color: thirdPartyCount > 5 ? "red" : "green",
    tabId
  });
}

// Reset tab on reload
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading") {
    initTab(tabId, tab.url);
    browser.browserAction.setBadgeText({ text: "", tabId });
  }

});

// Handle popup request
browser.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "GET_REPORT") {
    return browser.tabs.query({ active: true, currentWindow: true })
      .then(tabs => {
        const tabId = tabs[0].id;
        return tabScans[tabId] || {
          mainDomain: null,
          thirdParties: {},
          score: 0
        };
      });
  }
});

function calculateRisk(trackers = [], thirdParties = []) {
  let score = 0;

  //  Known tracker weighted risk
  for (const tracker of trackers) {
    const count = tracker.requestCount || 1;
    score += tracker.risk * Math.log2(count + 1);
  }

  //  Flagged unknown third parties
  for (const domain of thirdParties) {
    if (domain.flagged) {
      score += 5;
    }
  }

  //  Large third-party surface area penalty
  if (thirdParties.length > 30) score += 10;
  if (thirdParties.length > 50) score += 15;

  //  Cap score safely
  if (!Number.isFinite(score)) return 0;

  return Math.min(Math.round(score), 100);
}


// MAIN

 async function runMain(url) {
 

  console.log("Starting crawl...");
  const harData = await crawlWebsite(url);

  console.log("Running internal detection...");
  const internal = runInternalDetection(harData, url);

  console.log("Running TrackHAR...");
  const trackharResults = runTrackHAR(harData);

  console.log("Analyzing third parties...");
  const thirdPartyDomains = analyzeThirdParties(harData, url);

  
// Heuristic categorization of third-party domains based on known trackers, frequency, and infrastructure patterns


  for (const domainObj of thirdPartyDomains) {

    if (domainObj.knownTracker) {
      domainObj.inferredCategory = "known_tracker";
    }
    else if (isLikelyInfrastructure(domainObj.domain)) {
      domainObj.inferredCategory = "infrastructure";
    }
    else if (domainObj.requestCount >= HIGH_FREQUENCY_THRESHOLD) {
      domainObj.inferredCategory = "high_frequency_unknown";
    }
    else {
      domainObj.inferredCategory = "low_frequency_unknown";
    }

    console.log(
      "Infra test:",
      domainObj.domain,
      isLikelyInfrastructure(domainObj.domain)
    );
  } 


  
// Final report generation combining all analyses and calculating a risk score


  const finalReport = {
    yourDetection: internal,
    trackharAnalysis: trackharResults,
    thirdPartyDomains,
    riskScore: calculateRisk(internal, thirdPartyDomains)
  };

  fs.writeFileSync(
    "output/final_report.json",
    JSON.stringify(finalReport, null, 2)
  );

  console.log("Scan complete.");
  console.log("HAR entries:", harData.log.entries.length);
  console.log("Final Risk Score:", finalReport.riskScore);
}