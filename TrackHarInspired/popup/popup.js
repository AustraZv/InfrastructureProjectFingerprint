async function load() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const id = tabs[0].id;

  const data = await browser.storage.local.get("tab_" + id);
  return data["tab_" + id];
}

function label(d) {
  if (d.flagged) return " Suspicious";
  if (d.known) return " Tracker";
  return "Unknown";
}

(async () => {
  const data = await load();
  if (!data) return;

  document.getElementById("risk").textContent =
    "Risk Score: " + data.risk;

  const list = document.getElementById("list");

  for (const [domain, d] of Object.entries(data.domains)) {
    const li = document.createElement("li");
    li.textContent = `${domain} (${label(d)}) [${d.count}]`;
    list.appendChild(li);
  }
})();

document.getElementById("openViewer").onclick = async () => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const tabId = tabs[0].id;

  browser.tabs.create({
    url: browser.runtime.getURL("viewer/viewer.html?tabId=" + tabId)
  });
};
