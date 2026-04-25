document.addEventListener("DOMContentLoaded", function () {
  initPopup();
});

async function initPopup() {
  try {
    await loadData();

    var openBtn = document.getElementById("openFullReport");
    if (openBtn) {
      openBtn.addEventListener("click", async function () {
        var tabs = await browser.tabs.query({ active: true, currentWindow: true });
        var activeTab = tabs[0];
        if (!activeTab) return;

        browser.tabs.create({
          url: browser.runtime.getURL("report.html?tabId=" + activeTab.id)
        });
      });
    }

    var exportBtn = document.getElementById("exportBtn");
    if (exportBtn) {
      exportBtn.addEventListener("click", async function () {
        try {
          console.log("Export button clicked");

          var tabs = await browser.tabs.query({ active: true, currentWindow: true });
          var activeTab = tabs[0];
          if (!activeTab) {
            throw new Error("No active tab found");
          }

          await exportReport(activeTab.id);
          console.log("Export request sent");
        } catch (err) {
          console.error("Export failed:", err);
        }
      });
    }
  } catch (e) {
    console.error("Popup init error:", e);
  }
}

async function loadData() {
  try {
    var tabs = await browser.tabs.query({ active: true, currentWindow: true });
    var tab = tabs[0];

    if (!tab) {
      renderError("No active tab");
      return;
    }

    var key = "tabData_" + tab.id;
    var data = await browser.storage.local.get(key);
    var tabData = data[key];

    if (!tabData) {
      renderEmpty();
      return;
    }

    render(tabData);
  } catch (e) {
    console.error("Popup error:", e);
    renderError(e.message || "Unknown error");
  }
}

function render(tab) {
  setText("risk", tab.risk || 0);
  setText("domains", (tab.analysis && tab.analysis.totalDomains) || 0);
  setText("trackers", (tab.analysis && tab.analysis.trackerCount) || 0);
  setText("trackerRequests", (tab.analysis && tab.analysis.trackerRequests) || 0);

  var groups =
  (tab.trackhar && tab.trackhar.trackerGroups) ||
  (tab.analysis && tab.analysis.topTrackHARGroups) ||
  [];

renderList("trackharGroups", groups, function (item) {
  var tracker = item.tracker || {};
  return (tracker.name || tracker.slug || "Unknown tracker") + " (" + item.count + ")";
}, "No TrackHAR tracker groups yet");

  var available = !!(tab.analysis && tab.analysis.trackharAvailable);
  setText("trackharStatus", available ? "Loaded" : "Not available");
  setText("trackharRequests", (tab.analysis && tab.analysis.trackharRequestMatches) || 0);
  setText("trackharTransmissions", (tab.analysis && tab.analysis.trackharTransmissionCount) || 0);
  setText("trackharError", (tab.analysis && tab.analysis.trackharError) || "");

  renderList("trackharAdapters", (tab.analysis && tab.analysis.topTrackHARAdapters) || [], function (item) {
    return item.name + " (" + item.count + ")";
  }, "No TrackHAR matches yet");
}

function renderList(id, items, formatter, emptyText) {
  var list = document.getElementById(id);
  if (!list) return;

  list.innerHTML = "";

  if (!items.length) {
    var li = document.createElement("li");
    li.textContent = emptyText;
    list.appendChild(li);
    return;
  }

  items.forEach(function (item) {
    var li = document.createElement("li");
    li.textContent = formatter(item);
    list.appendChild(li);
  });
}

function setText(id, value) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = value;
}

function renderEmpty() {
  document.body.innerHTML = "<p>No data yet</p>";
}

function renderError(msg) {
  document.body.innerHTML = "<p>Error: " + msg + "</p>";
}

async function exportReport(tabId) {
  var key = "tab_" + tabId;
  var stored = await browser.storage.local.get(key);
  var report = stored[key];

  if (!report) {
    throw new Error("No stored report found for tab " + tabId);
  }

  await browser.runtime.sendMessage({
    type: "export-html-report",
    report: report
  });
}