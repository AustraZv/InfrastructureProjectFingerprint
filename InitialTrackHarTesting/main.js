import { crawlWebsite } from "./crawler.js";
import { runInternalDetection } from "./detector.js";
import { runTrackHAR } from "./trackhar.js";
import fs from "fs";

async function run() {
  const url = "https://www.amazon.com/Rebel-EF18-55mm-75-300mm-Double-Zoom/dp/B0101RW3QK?dib=eyJ2IjoiMSJ9.S8CEDsbqJRJAM2uWkjwXC1JF4yevEXZ51-wAvtbAOg3Bb71OHeULktiIjAEnwNLZT-AG5iF1q3SgRCV2xahZlyWtcOyUp9FkKFfJ2r9IFQ-tScHvTE-01LYMT0IJIJulV8hTAeeZMsdBKGn1E8BdpQVqlRD2syhHrwNDnPgJpRyVA8Em-B_fLYVZicrLdkjrBc7tBQ-4AY6iNJeDWtD2hmTl_1PXKy63w1g6fZ5ZHJ3QmwnmEGaPHHOIlO4m6OU6wtp2yjBhq2vqxBDDKIRn07BZuhpKC0bMduzGzIFp3co.5OlKszIsK75D-SrixOjAVoIwyEPkLDFqGilGAuy4yiQ&dib_tag=se&qid=1771249417&refinements=p_89%3ACanon&s=photo&sr=1-4&th=1";

  console.log("Starting crawl...");
  const harData = await crawlWebsite(url);

  console.log("Running internal detection...");
  const internal = runInternalDetection(harData, url);

  console.log("Running TrackHAR...");
  const trackharResults = runTrackHAR(harData);

  const finalReport = {
    yourDetection: internal,
    trackharAnalysis: trackharResults,
    riskScore: internal.reduce((sum, t) => sum + (t.risk || 0), 0)
  };

  fs.writeFileSync(
    "output/final_report.json",
    JSON.stringify(finalReport, null, 2)
  );

  console.log("Scan complete.");
  console.log("HAR entries:", harData.log.entries.length);
}

run().catch(console.error);
