document.addEventListener("DOMContentLoaded", function () {
  loadData();
});

async function loadData() {
  try {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true
    });

    const tab = tabs[0];
    if (!tab) return renderError("No active tab");

    const data = await browser.storage.local.get("tab_" + tab.id);
    const tabData = data["tab_" + tab.id];

    if (!tabData) {
      return renderEmpty();
    }

    render(tabData);

  } catch (e) {
    console.error("Popup error:", e);
    renderError(e.message);
  }
}


// SAFE RENDER

function render(tab) {
  setText("risk", tab.risk);
  setText("domains", tab.analysis?.totalDomains || 0);
  setText("trackers", tab.analysis?.trackerCount || 0);

  const list = document.getElementById("topTrackers");
  if (!list) return;

  list.innerHTML = "";

  (tab.analysis?.topTrackers || []).forEach(function ([domain, info]) {
    const li = document.createElement("li");
    li.textContent = domain + " (" + info.count + ")";
    list.appendChild(li);
  });
}


// HELPERS 

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn("Missing element:", id);
    return;
  }
  el.textContent = value;
}


function renderEmpty() {
  document.body.innerHTML = "<p>No data yet</p>";
}

function renderError(msg) {
  document.body.innerHTML = "<p>Error: " + msg + "</p>";
}