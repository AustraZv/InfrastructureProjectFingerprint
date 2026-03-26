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
document.getElementById("exportBtn").addEventListener("click", async () => {
  const report = await browser.runtime.sendMessage({ type: "EXPORT_REPORT" });

  const html = generateReportHTML(report);

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "privacy-report.html";
  a.click();

  URL.revokeObjectURL(url);
function generateReportHTML(data) {
  const domains = Object.entries(data.domains);

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Privacy Report</title>
<style>
body {
  font-family: Arial;
  background: #0f172a;
  color: #e2e8f0;
  padding: 20px;
}
h1 { color: #38bdf8; }
.card {
  background: #1e293b;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
}
.high { color: #ef4444; }
.medium { color: #f59e0b; }
.low { color: #22c55e; }
canvas {
  background: #020617;
  border-radius: 10px;
}
</style>
</head>

<body>

<h1>Privacy Report</h1>

<div class="card">
  <strong>Risk Score:</strong> ${data.riskScore}
  <br>
  <strong>Exported:</strong> ${data.exportedAt}
</div>

<div class="card">
<h2>Trackers</h2>
<ul>
${domains.map(([d, info]) => `
<li>
  ${d}
  — ${info.category || info.inferredCategory || "unknown"}
  — requests: ${info.requests}
  — weight: ${info.count.toFixed(1)}
</li>
`).join("")}
</ul>
</div>

<div class="card">
<h2>Timeline</h2>
<ul>
${data.timeline.map(e => `
<li>${new Date(e.time).toLocaleTimeString()} - ${e.domain} (${e.type})</li>
`).join("")}
</ul>
</div>

<div class="card">
<h2>Tracker Map</h2>
<canvas id="map" width="800" height="500"></canvas>
</div>

<script>
const domains = ${JSON.stringify(domains)};

const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");

const centerX = 400;
const centerY = 250;

// draw center (site)
ctx.fillStyle = "#38bdf8";
ctx.beginPath();
ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
ctx.fill();
ctx.fillText("Site", centerX + 12, centerY);

// layout trackers in circle
const radius = 180;

domains.forEach(([domain, info], i) => {
  const angle = (i / domains.length) * Math.PI * 2;

  const x = centerX + Math.cos(angle) * radius;
  const y = centerY + Math.sin(angle) * radius;

  // color by category
  let color = "#94a3b8";
  if (info.category === "advertising") color = "#f59e0b";
  if (info.category === "analytics") color = "#22c55e";
  if (info.category === "tracking") color = "#ef4444";
  if (info.category === "data broker") color = "#a855f7";

  ctx.strokeStyle = color;

  // line to center
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(x, y);
  ctx.stroke();

  // node
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillText(domain.slice(0, 20), x + 8, y);
});
</script>

</body>
</html>
`;
}
});
// Request data
browser.runtime.sendMessage({ type: "GET_REPORT" })
  .then(renderTrackers)
  .catch(err => {
    console.error(err);
    document.getElementById("trackerList").textContent = "Error loading report.";
  });

