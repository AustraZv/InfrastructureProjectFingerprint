function renderTrackers(data) {
  const container = document.getElementById("trackerList");
  const riskEl = document.getElementById("riskScore");
  const timelineEl = document.getElementById("timeline");

  container.innerHTML = "";
  riskEl.textContent = `Risk Score: ${data.riskScore}`;

  const entries = Object.entries(data.domains);
  if (!entries.length) {
    container.textContent = "No trackers detected.";
    return;
  }

  // Group by category
  const grouped = {};

  for (const [domain, info] of entries) {
    if (info.infrastructure) continue;

    const cat = info.category || "unknown";
    if (!grouped[cat]) grouped[cat] = [];

    grouped[cat].push({ domain, info });
  }

  for (const category in grouped) {
    const header = document.createElement("h3");
    header.textContent = category.toUpperCase();
    container.appendChild(header);

    for (const { domain, info } of grouped[category]) {
      const div = document.createElement("div");
      div.classList.add("tracker");

      if (info.known) div.classList.add("known");
      else div.classList.add("unknown");
      if (info.flagged) div.classList.add("high");

      const weighted = info.count.toFixed(1);
      const raw = info.requests || 0;

      let label = domain;

      if (info.known) {
        label += ` (${info.info.name})`;
      } else if (info.flagged) {
        label += " (flagged)";
      }

      label += ` [${raw} | w:${weighted}]`;

      div.textContent = label;
      container.appendChild(div);
    }
  }

  // Timeline (last 10 events)
  if (timelineEl && data.timeline) {
    timelineEl.innerHTML = "";

    const recent = data.timeline.slice(-10).reverse();

    for (const event of recent) {
      const div = document.createElement("div");
      const time = new Date(event.time).toLocaleTimeString();

      div.textContent = `[${time}] ${event.domain} (${event.type})`;
      timelineEl.appendChild(div);
    }
  }
}

// Request data
browser.runtime.sendMessage({ type: "GET_REPORT" })
  .then(renderTrackers)
  .catch(err => {
    console.error(err);
    document.getElementById("trackerList").textContent = "Error loading report.";
  });