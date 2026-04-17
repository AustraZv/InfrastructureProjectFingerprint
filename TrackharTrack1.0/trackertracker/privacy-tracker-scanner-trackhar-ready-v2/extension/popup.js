document.addEventListener("DOMContentLoaded", function () {
  loadData();
});

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
  setText("domains", tab.analysis && tab.analysis.totalDomains || 0);
  setText("trackers", tab.analysis && tab.analysis.trackerCount || 0);
  setText("trackerRequests", tab.analysis && tab.analysis.trackerRequests || 0);

  renderList("topTrackers", (tab.analysis && tab.analysis.topTrackers) || [], function (item) {
    return item.name + " (" + item.count + ")";
  }, "No trackers detected");

  var available = !!(tab.analysis && tab.analysis.trackharAvailable);
  setText("trackharStatus", available ? "Loaded" : "Not available");
  setText("trackharRequests", tab.analysis && tab.analysis.trackharRequestMatches || 0);
  setText("trackharTransmissions", tab.analysis && tab.analysis.trackharTransmissionCount || 0);
  setText("trackharError", tab.analysis && tab.analysis.trackharError || "");

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
