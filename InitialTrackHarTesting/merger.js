export function mergeResults(yourResults, trackharResults) {
  const riskScore =
    yourResults.length * 2 +
    (trackharResults.trackers?.length || 0) * 3;

  return {
    yourDetection: yourResults,
    trackharAnalysis: trackharResults,
    riskScore: riskScore
  };
}
