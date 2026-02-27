// Store per-tab scan data
const tabScans = {};

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
