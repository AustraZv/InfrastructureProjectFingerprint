(function () {
  function normalizeTrackHARItem(item) {
    if (!item) return [];
    if (Array.isArray(item)) return item.filter(Boolean);
    if (typeof item === "object") return [item];
    return [];
  }

  function groupTrackHARResults(results) {
    const adapterCounts = {};
    const propertyCounts = {};
    let requestMatches = 0;
    let transmissionCount = 0;

    (results || []).forEach((item) => {
      const normalized = normalizeTrackHARItem(item);
      if (!normalized.length) return;

      requestMatches += 1;

      normalized.forEach((match) => {
        transmissionCount += 1;

        const adapter = match.adapter || "unknown-adapter";
        const property = match.property || "unknown-property";

        adapterCounts[adapter] = (adapterCounts[adapter] || 0) + 1;
        propertyCounts[property] = (propertyCounts[property] || 0) + 1;
      });
    });

    return {
      available: true,
      requestMatches,
      transmissionCount,
      topAdapters: Object.entries(adapterCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, count]) => ({ name, count })),
      topProperties: Object.entries(propertyCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, count]) => ({ name, count })),
      rawResults: results || []
    };
  }

  async function getTrackHARProcessor() {
    if (typeof self !== "undefined" && self.TrackHAR && typeof self.TrackHAR.process === "function") {
      return self.TrackHAR.process.bind(self.TrackHAR);
    }

    if (typeof self !== "undefined" && typeof self.processHar === "function") {
      return self.processHar;
    }

    return null;
  }

  async function runTrackHARAnalysis(tab, options) {
    if (typeof buildHarFromTab !== "function") {
      return {
        available: false,
        requestMatches: 0,
        transmissionCount: 0,
        topAdapters: [],
        topProperties: [],
        rawResults: [],
        error: "HAR builder not loaded. buildHarFromTab is unavailable."
      };
    }

    const har = buildHarFromTab(tab, options || {});
    const processHar = await getTrackHARProcessor();

    if (!processHar) {
      return {
        available: false,
        requestMatches: 0,
        transmissionCount: 0,
        topAdapters: [],
        topProperties: [],
        rawResults: [],
        error: "TrackHAR bundle not present. Add a browser-compatible TrackHAR bundle that exposes TrackHAR.process() or processHar()."
      };
    }

    try {
      const results = await processHar(har);
      return groupTrackHARResults(results);
    } catch (error) {
      return {
        available: false,
        requestMatches: 0,
        transmissionCount: 0,
        topAdapters: [],
        topProperties: [],
        rawResults: [],
        error: error && error.message ? error.message : String(error)
      };
    }
  }

  self.runTrackHARAnalysis = runTrackHARAnalysis;
})();
