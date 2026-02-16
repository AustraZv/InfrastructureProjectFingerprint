import { chromium } from "playwright";
import fs from "fs";

export async function crawlWebsite(url, harPath = "output/session.har") {
  const browser = await chromium.launch();

  const context = await browser.newContext({
    recordHar: {
      path: harPath,
      content: "attach"
    },
    ignoreHTTPSErrors: true
  });

  const page = await context.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  // Allow trackers to execute
  await page.waitForTimeout(10000);

  await context.close();
  await browser.close();

  console.log("HAR saved to:", harPath);

  const harData = JSON.parse(fs.readFileSync(harPath, "utf8"));
  return harData;
}
