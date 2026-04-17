browser.webRequest.onErrorOccurred.addListener(
  function(details) {
    const tabId = details.tabId;
    if (tabId < 0) return;

    if (!tabCache[tabId]) return;

    const url = details.url;
    const domain = getDomain(url);

    const tab = tabCache[tabId];
    const tracker = matchTracker(url, domain);

    tab.entries.push({
      url,
      domain,
      error: details.error,

      _tracker: !!tracker,
      _category: tracker?.category || null
    });

    dirtyTabs.add(tabId);
  },
  { urls: ["<all_urls>"] }
);