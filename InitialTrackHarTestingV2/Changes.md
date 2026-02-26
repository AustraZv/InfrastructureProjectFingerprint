# Added KNOWN_TRACKERS database: 
- Each tracker now includes name, category and risk

#Added analyzeThirdParties(): 
-Base domain extraction (via tldts)
-First-party filtering
- Request frequency counting

# Added High Frequency Heuristic Flagging

- const HIGH_FREQUENCY_THRESHOLD = 10; 

- As a resultHigh-frequency unknown third parties get flagged

# Infrastructure Filtering Layer

    const INFRASTRUCTURE_PATTERNS = [
      "cloudfront.net",
      "akamai.net",
      "fastly.net",
      "cdn",
      "static",
      "images"
    ];

- Avoids flagging non-trackers( CDNs and static asset hosts.)


# Added Heuristic Classification Layer

if (domainObj.knownTracker) {
  inferredCategory = "known_tracker";
}
else if (isLikelyInfrastructure(domain)) {
  inferredCategory = "infrastructure";
}
else if (requestCount >= HIGH_FREQUENCY_THRESHOLD) {
  inferredCategory = "high_frequency_unknown";
}
else {
  inferredCategory = "low_frequency_unknown";
}


# Added Log-Weighted Risk Scoring

After:

score += tracker.risk * Math.log2(count + 1);

Plus:

if (domain.flagged) score += 5;

And capped:

Math.min(Math.round(score), 100);


- Risk now scales with tracker intensity rather than raw count.

# Added improved Debug Visibility


console.log("Infra test:", domainObj.domain, isLikelyInfrastructure(domainObj.domain));

Added HAR entry count logging:

console.log("HAR entries:", harData.log.entries.length);


Better visualisation and error catching (infra test seems to be working properly)


