function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function formatDate(value) {
  if (!value) return "Unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
}

function severityFromProperty(property) {
  const high = ["email", "phone", "deviceId", "userId", "advertisingId", "browserId"];
  const medium = ["gcs", "gcd", "consentState", "sessionId", "clientId", "viewedPage"];
  if (high.includes(property)) return "high";
  if (medium.includes(property)) return "medium";
  return "low";
}

function renderSummary(report) {
  const el = document.getElementById("summaryGrid");
  const items = [
    ["Site", report.page?.domain || "Unknown"],
    ["Scanned At", formatDate(report.page?.scannedAt)],
    ["Risk Score", report.summary?.riskScore ?? 0],
    ["Requests", report.summary?.totalRequests ?? 0],
    ["Third-Party Domains", report.summary?.thirdPartyDomains ?? 0],
    ["Trackers", report.summary?.trackerCount ?? 0]
  ];

  el.innerHTML = items.map(([label, value]) => `
    <div class="summary-item">
      <div class="label">${escapeHtml(label)}</div>
      <div class="value">${escapeHtml(value)}</div>
    </div>
  `).join("");
}

function renderTopTrackers(trackers) {
  const el = document.getElementById("topTrackers");

  if (!trackers || !trackers.length) {
    el.innerHTML = `<p class="empty">No trackers listed.</p>`;
    return;
  }

  el.innerHTML = trackers.map((tracker) => `
    <div class="tracker-row">
      <div><strong>${escapeHtml(tracker.name || "Unknown tracker")}</strong></div>
      <div class="meta">Requests: ${escapeHtml(tracker.requests ?? tracker.count ?? 0)}</div>
    </div>
  `).join("");
}

function dedupeFindings(findings) {
  const seen = new Set();

  return (findings || []).filter((finding) => {
    const key = [
      finding.tracker || "",
      finding.property || "",
      String(finding.value ?? ""),
      finding.context || "",
      finding.path || ""
    ].join("||");

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function groupFindings(findings) {
  const grouped = new Map();

  for (const finding of findings || []) {
    const key = [
      finding.tracker || "",
      finding.property || "",
      String(finding.value ?? ""),
      finding.context || "",
      finding.path || ""
    ].join("||");

    if (!grouped.has(key)) {
      grouped.set(key, { ...finding, occurrences: 1 });
    } else {
      grouped.get(key).occurrences += 1;
    }
  }

  return Array.from(grouped.values()).sort((a, b) => {
    if ((b.occurrences || 0) !== (a.occurrences || 0)) {
      return (b.occurrences || 0) - (a.occurrences || 0);
    }

    return String(a.tracker).localeCompare(String(b.tracker));
  });
}

function renderKeyFindings(findings) {
  const el = document.getElementById("keyFindings");

  if (!findings || !findings.length) {
    el.innerHTML = `<p class="empty">No TrackHAR-recognized data transmissions were detected for this page.</p>`;
    return;
  }

  const top = findings.slice(0, 6);

  el.innerHTML = top.map((finding) => `
    <div class="finding">
      <div class="finding-header">
        <div class="finding-title">${escapeHtml(finding.shortText || finding.property || "Finding")}</div>
        <span class="badge ${escapeHtml(finding.severity || "low")}">${escapeHtml(finding.severity || "low")}</span>
      </div>
      <div class="meta">Tracker: ${escapeHtml(finding.tracker || "Unknown")}</div>
      <div class="meta">Seen in ${escapeHtml(finding.occurrences || 1)} request(s)</div>
      <p>${escapeHtml(finding.longText || "No explanation available.")}</p>
    </div>
  `).join("");
}

function interpretGcs(value) {
  const raw = String(value || "").trim().toUpperCase();

  const meanings = {
    G100: "INSERT AUSTRAS TEXT HERE.",
    G110: "INSERT AUSTRAS TEXT HERE.",
    G101: "INSERT AUSTRAS TEXT HERE.",
    G111: "INSERT AUSTRAS TEXT HERE."
  };

  if (!meanings[raw]) return null;

  return {
    type: "GCS",
    raw,
    summary: meanings[raw],
    details: [
      //Also maybe here, is this explanation fine?
      raw[2] === "1" ? "ad_storage: granted" : "ad_storage: denied",
      raw[3] === "1" ? "analytics_storage: granted" : "analytics_storage: denied"
    ]
  };
}

function interpretGcd(value) {
  const raw = String(value || "").trim().toLowerCase();

  if (!raw || !/[a-z]/.test(raw)) return null;

  const signalNames = [
    "ad_storage",
    "analytics_storage",
    "ad_user_data",
    "ad_personalization"
  ];

  const letterMeanings = {
    l: "INSERT AUSTRAS TEXT HERE",
    p: "INSERT AUSTRAS TEXT HERE",
    q: "INSERT AUSTRAS TEXT HERE",
    t: "INSERT AUSTRAS TEXT HERE",
    r: "INSERT AUSTRAS TEXT HERE",
    m: "INSERT AUSTRAS TEXT HERE",
    n: "INSERT AUSTRAS TEXT HERE",
    u: "INSERT AUSTRAS TEXT HERE",
    v: "INSERT AUSTRAS TEXT HERE"
  };

  const letters = raw.match(/[a-z]/g) || [];

  // If there are fewer letters than expected signals, we can't fully decode it, but we can still recognize it as a GCD signal
  if (letters.length < 4) {
    return {
      type: "GCD",
      raw,
      summary: "Google Consent Mode v2 signal detected, but it could not be fully decoded.",
      details: [`Raw GCD value: ${raw}`]
    };
  }

  return {
    type: "GCD",
    raw,
    summary: "Google Consent Mode v2 consent state detected.",
    details: signalNames.map((signal, index) => {
      const code = letters[index];
      return `${signal}: ${letterMeanings[code] || `Unknown code "${code}"`}`;
    })
  };
}

function interpretConsentValue(property, value) {
  const prop = String(property || "").toLowerCase();
  const raw = String(value || "").trim();

  if (!raw) return null;

  if (prop === "gcs" || /^G1[01][01]$/i.test(raw)) {
    return interpretGcs(raw);
  }

  if (prop === "gcd" || prop === "consentstate") {
    return interpretGcd(raw);
  }

  return null;
}

function renderConsentInterpretation(property, value) {
  const interpreted = interpretConsentValue(property, value);
  if (!interpreted) return "";

  return `
    <div class="consent-explanation">
      <strong>${escapeHtml(interpreted.type)} interpretation:</strong>
      <p>${escapeHtml(interpreted.summary)}</p>
      <ul>
        ${interpreted.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderConsentSignals(findings) {
  const el = document.getElementById("consentSignals");

  const consentFindings = (findings || []).filter((finding) =>
    finding.property === "gcs" ||
    finding.property === "gcd" ||
    finding.property === "consentState"
  );

  if (!consentFindings.length) {
    el.innerHTML = `<p class="empty">No consent-related signals detected.</p>`;
    return;
  }

  el.innerHTML = consentFindings.map((finding) => `
    <div class="finding">
      <div class="finding-header">
        <div class="finding-title">${escapeHtml(finding.property || "consent")}</div>
        <span class="badge ${escapeHtml(finding.severity || "medium")}">${escapeHtml(finding.severity || "medium")}</span>
      </div>
      <div class="meta">Tracker: ${escapeHtml(finding.tracker || "Unknown")}</div>
      <div class="meta">Seen in ${escapeHtml(finding.occurrences || 1)} request(s)</div>
      <p>${escapeHtml(finding.longText || "")}</p>
      <div class="value-box">
        <strong>Value:</strong> ${escapeHtml(finding.value ?? "")}
        ${renderConsentInterpretation(finding.property, finding.value)}
      </div>
    </div>
  `).join("");
}

function renderTrackerGroups(groups) {
  const el = document.getElementById("trackerGroups");
  if (!el) return;

  if (!groups || !groups.length) {
    el.innerHTML = `<p class="empty">No TrackHAR tracker groups detected.</p>`;
    return;
  }

  el.innerHTML = groups.map((group) => {
    const tracker = group.tracker || {};

    const adapters = Object.entries(group.adapters || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => `${escapeHtml(name)} (${escapeHtml(count)})`)
      .join(", ");

    const properties = Object.entries(group.properties || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => `${escapeHtml(name)} (${escapeHtml(count)})`)
      .join(", ");

    return `
      <div class="finding">
        <div class="finding-header">
          <div class="finding-title">${escapeHtml(tracker.name || tracker.slug || "Unknown tracker")}</div>
          <span class="badge medium">${escapeHtml(group.count || 0)} transmission(s)</span>
        </div>

        <p>${escapeHtml(
          tracker.description ||
          "TrackHAR detected data transmissions associated with this tracker."
        )}</p>

        <div class="meta">Slug: ${escapeHtml(tracker.slug || "unknown")}</div>
        <div class="meta">Datarequests.org slug: ${escapeHtml(tracker.datenanfragenSlug || "not mapped")}</div>
        <div class="meta">Exodus ID: ${escapeHtml(tracker.exodusId || 0)}</div>
        <div class="meta">Adapters: ${adapters || "unknown"}</div>
        <div class="meta">Properties: ${properties || "unknown"}</div>
      </div>
    `;
  }).join("");
}

function renderAllFindings(findings) {
  const el = document.getElementById("allFindings");

  if (!findings || !findings.length) {
    el.innerHTML = `<p class="empty">No TrackHAR-recognized data transmissions were detected for this page.</p>`;
    return;
  }

  el.innerHTML = findings.map((finding) => `
    <div class="finding">
      <div class="finding-header">
        <div class="finding-title">
          ${escapeHtml(finding.tracker || "Unknown tracker")} → ${escapeHtml(finding.property || "Unknown property")}
        </div>
        <span class="badge ${escapeHtml(finding.severity || "low")}">${escapeHtml(finding.severity || "low")}</span>
      </div>

      <div class="meta">Context: ${escapeHtml(finding.context || "unknown")}</div>
      <div class="meta">Path: ${escapeHtml(finding.path || "unknown")}</div>
      <div class="meta">Seen in ${escapeHtml(finding.occurrences || 1)} request(s)</div>

      <p>${escapeHtml(finding.longText || "No explanation available.")}</p>

      <div class="value-box">
        <strong>Value:</strong><br />
        ${escapeHtml(finding.value)}
        ${renderConsentInterpretation(finding.property, finding.value)}
      </div>
    </div>
  `).join("");
}

function renderRawAnalysis(report) {
  const el = document.getElementById("rawAnalysis");
  el.textContent = JSON.stringify(report, null, 2);
}

function buildHumanReadableFinding(hit, propertyDocs, valueDocs) {
  const tracker = hit.adapter || hit.tracker || "unknown tracker";
  const property = hit.property || "unknownProperty";
  const value = hit.value;
  const keySpecific = `${tracker}:${property}`;
  const doc = propertyDocs[keySpecific] || propertyDocs[property];
  const valueInfo = valueDocs[property];

  let shortText = property === "unknownProperty"
    ? "A tracking-related value was detected."
    : `${tracker} sent ${property}.`;

  let longText = property === "unknownProperty"
    ? "TrackHAR detected a transmitted value, but the current field mapping did not resolve its property name yet."
    : `The tracker ${tracker} transmitted the property "${property}".`;

  let severity = severityFromProperty(property);

  if (doc) {
    shortText = doc.shortText || shortText;
    longText = doc.longText || longText;
    severity = doc.severity || severity;
  }

  if (property === "gcs") {
    shortText = "Google consent-state data was sent.";
    longText =
      "This request contains a Google consent-state parameter. It is used to communicate a user's consent choices to Google's systems so they can determine how analytics or advertising-related processing should behave for that request.";

    if (valueInfo && valueInfo[String(value)]) {
      longText += ` This specific value means: ${valueInfo[String(value)]}.`;
    } else if (valueInfo && valueInfo.default) {
      longText += ` ${valueInfo.default}.`;
    }

    severity = "medium";
  }

  if (property === "gcd") {
    shortText = "Google consent detail data was sent.";
    longText =
      "This request contains a Google consent detail parameter. It is a compact encoded value related to consent handling. Unlike a simple yes-or-no consent signal, this value can reveal more detail about when and how consent was granted, denied, or updated.";

    if (valueInfo && valueInfo.default) {
      longText += ` ${valueInfo.default}`;
    }

    severity = "medium";
  }

  if (property === "consentState") {
    shortText = "Consent-state information was sent.";
    longText =
      "This property communicates consent-related state to the analytics platform. It reflects how consent choices were represented for the request and can affect how measurement or advertising-related behavior is handled.";
    severity = "medium";
  }

  if (property !== "gcs" && property !== "gcd") {
    if (valueInfo && valueInfo[String(value)]) {
      longText += ` This specific value means: ${valueInfo[String(value)]}`;
    } else if (valueInfo && valueInfo.default) {
      longText += ` ${valueInfo.default}`;
    }
  }

  return {
    tracker,
    property,
    value,
    context: hit.context || "",
    path: hit.path || "",
    shortText,
    longText,
    severity
  };
}

async function loadDocs() {
  const [propertyRes, valueRes] = await Promise.all([
    fetch(browser.runtime.getURL("trackhar_property_docs.json")),
    fetch(browser.runtime.getURL("trackhar_value_docs.json"))
  ]);

  return {
    propertyDocs: propertyRes.ok ? await propertyRes.json() : {},
    valueDocs: valueRes.ok ? await valueRes.json() : {}
  };
}

async function loadReportData(tabId) {
  const key = `tab_${tabId}`;
  const stored = await browser.storage.local.get(key);
  return stored[key] || null;
}

function normalizeTrackers(report) {
  return report.topTrackers || report.analysis?.topTrackers || [];
}

function normalizeTrackharHits(report) {
  return report.trackhar?.transmissions
    || report.analysis?.trackhar?.transmissions
    || report.analysis?.trackharFindings
    || [];
}

function normalizeTrackerGroups(report) {
  return report.trackhar?.trackerGroups
    || report.analysis?.trackhar?.trackerGroups
    || report.analysis?.topTrackHARGroups
    || [];
}


function scoreForSeverity(severity) {
  if (severity === "high") return 10;
  if (severity === "medium") return 5;
  return 1;
}

function renderRiskBreakdown(findings) {
  const el = document.getElementById("riskBreakdown");
  const btn = document.getElementById("toggleRiskBreakdown");

  if (!el || !btn) return; 

  el.style.display = "none";

  el.innerHTML = (findings || []).map((finding) => {
    const severity = finding.severity || "low";
    const points = severity === "high" ? 10 : severity === "medium" ? 5 : 1;

    return `
      <div class="breakdown-row">
        <strong>${escapeHtml(finding.tracker)} → ${escapeHtml(finding.property)}</strong>
        <div class="meta">Severity: ${severity}</div>
        <div class="meta">Score: +${points}</div>
      </div>
    `;
  }).join("");

  btn.addEventListener("click", () => {
    const hidden = el.style.display === "none";
    el.style.display = hidden ? "block" : "none";
  });
}

function renderRequestList(report) {
  const el = document.getElementById("requestList");
  const btn = document.getElementById("toggleRequests");

  if (!el || !btn) return; 

  el.style.display = "none";

  const requests = report.entries || [];

  el.innerHTML = requests.map((req) => `
    <div class="request-row">
      <div><strong>${req.method || "GET"}</strong> ${req.status || ""}</div>
      <div class="request-url">${escapeHtml(req.url || "")}</div>
    </div>
  `).join("");

  btn.addEventListener("click", () => {
    const hidden = el.style.display === "none";
    el.style.display = hidden ? "block" : "none";
  });
}


function renderTrackharPropertyList(report) {
  const el = document.getElementById("trackharPropertyList");
  const btn = document.getElementById("toggleTrackharProperties");

  if (!el || !btn) return;

  el.style.display = "none";

  const hits = normalizeTrackharHits(report);
  const grouped = {};

  for (const hit of hits || []) {
    const property = hit.property || "unknownProperty";

    if (!grouped[property]) {
      grouped[property] = {
        property,
        count: 0,
        trackers: {},
        contexts: {},
        paths: {},
        values: {}
      };
    }

    grouped[property].count += 1;

    grouped[property].trackers[hit.tracker || hit.adapter || "Unknown tracker"] =
      (grouped[property].trackers[hit.tracker || hit.adapter || "Unknown tracker"] || 0) + 1;

    grouped[property].contexts[hit.context || "unknown"] =
      (grouped[property].contexts[hit.context || "unknown"] || 0) + 1;

    grouped[property].paths[hit.path || "unknown"] =
      (grouped[property].paths[hit.path || "unknown"] || 0) + 1;

    const value = String(hit.value ?? "");
    if (value) {
      grouped[property].values[value] = (grouped[property].values[value] || 0) + 1;
    }
  }

  const rows = Object.values(grouped).sort((a, b) => b.count - a.count);

  if (!rows.length) {
    el.innerHTML = `<p class="empty">No TrackHAR properties detected.</p>`;
  } else {
    el.innerHTML = rows.map((item) => {
      const trackers = Object.entries(item.trackers)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, count]) => `${escapeHtml(name)} (${escapeHtml(count)})`)
        .join(", ");

      const contexts = Object.entries(item.contexts)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => `${escapeHtml(name)} (${escapeHtml(count)})`)
        .join(", ");

      const paths = Object.entries(item.paths)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([name, count]) => `${escapeHtml(name)} (${escapeHtml(count)})`)
        .join(", ");

      const values = Object.entries(item.values)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([value, count]) => `${escapeHtml(value)} (${escapeHtml(count)})`)
        .join(", ");

      return `
        <div class="breakdown-row">
          <strong>${escapeHtml(item.property)}</strong>
          <div class="meta">Detected: ${escapeHtml(item.count)} time(s)</div>
          <div class="meta">Trackers: ${trackers || "unknown"}</div>
          <div class="meta">Contexts: ${contexts || "unknown"}</div>
          <div class="meta">Paths: ${paths || "unknown"}</div>
          <div class="meta">Example values: ${values || "none stored"}</div>
        </div>
      `;
    }).join("");
  }

  btn.addEventListener("click", () => {
    const hidden = el.style.display === "none";
    el.style.display = hidden ? "block" : "none";
    btn.textContent = hidden
      ? "Hide TrackHAR properties"
      : "Show TrackHAR properties";
  });
}
async function init() {
  const tabId = getQueryParam("tabId");
  const subtitle = document.getElementById("reportSubtitle");

  if (!tabId) {
    subtitle.textContent = "No tabId provided.";
    return;
  }

  const report = await loadReportData(tabId);

  if (!report) {
    subtitle.textContent = "No stored report found for this tab.";
    return;
  }

  subtitle.textContent = `Report for ${report.page?.domain || "unknown site"}`;

  const { propertyDocs, valueDocs } = await loadDocs();
  const rawHits = normalizeTrackharHits(report);

  const findings = rawHits.map((hit) => buildHumanReadableFinding(hit, propertyDocs, valueDocs));
  const groupedFindings = groupFindings(dedupeFindings(findings));

  const enrichedReport = {
    ...report,
    findings: groupedFindings
  };

  renderSummary(enrichedReport);
  renderTopTrackers(normalizeTrackers(enrichedReport));
  renderKeyFindings(groupedFindings);
  renderConsentSignals(groupedFindings);
  renderTrackerGroups(normalizeTrackerGroups(report));
  renderAllFindings(groupedFindings);
  renderRawAnalysis(enrichedReport);
  renderRiskBreakdown(groupedFindings);
  renderRequestList(report);
  
}

init().catch((err) => {
  console.error("Failed to load full report:", err);
  document.getElementById("reportSubtitle").textContent = "Failed to load report.";
});

