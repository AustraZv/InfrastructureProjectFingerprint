import { crawlWebsite } from "./crawler.js";
import { runInternalDetection } from "./detector.js";
import { runTrackHAR } from "./trackhar.js";
import { analyzeThirdParties } from "./thirdPartyAnalyzer.js";
import fs from "fs";


// Whitelist of domains that are likely infrastructure providers (CDNs, image hosts, etc.)


const HIGH_FREQUENCY_THRESHOLD = 10;

const INFRASTRUCTURE_PATTERNS = [
  "media-amazon.com",
  "ssl-images-amazon.com",
  "cloudfront.net",
  "akamai.net",
  "fastly.net",
  "cdn",
  "static",
  "images"
];


   // Helper function to identify likely infrastructure domains based on patterns


function isLikelyInfrastructure(domain) {
  return INFRASTRUCTURE_PATTERNS.some(pattern =>
    domain.includes(pattern)
  );
}


   // Heuristic risk scoring function that combines known tracker risks, frequency, and flags


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

async function run() {
  const url = "https://www.amazon.com/Rebel-EF18-55mm-75-300mm-Double-Zoom/dp/B0101RW3QK?dib=eyJ2IjoiMSJ9.S8CEDsbqJRJAM2uWkjwXC1JF4yevEXZ51-wAvtbAOg3Bb71OHeULktiIjAEnwNLZT-AG5iF1q3SgRCV2xahZlyWtcOyUp9FkKFfJ2r9IFQ-tScHvTE-01LYMT0IJIJulV8hTAeeZMsdBKGn1E8BdpQVqlRD2syhHrwNDnPgJpRyVA8Em-B_fLYVZicrLdkjrBc7tBQ-4AY6iNJeDWtD2hmTl_1PXKy63w1g6fZ5ZHJ3QmwnmEGaPHHOIlO4m6OU6wtp2yjBhq2vqxBDDKIRn07BZuhpKC0bMduzGzIFp3co.5OlKszIsK75D-SrixOjAVoIwyEPkLDFqGilGAuy4yiQ&dib_tag=se&qid=1771249417&refinements=p_89%3ACanon&s=photo&sr=1-4&th=1";

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

run().catch(console.error);
