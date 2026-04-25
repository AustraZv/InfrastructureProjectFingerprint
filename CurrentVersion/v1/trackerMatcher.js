
console.log("trackerMatcher loaded");

let TRACKER_RULES = {
  domains: {},
  patterns: [],
  exceptions: []
};

// Cache only domain-based decisions.
// Do NOT cache URL-pattern results by domain.
const domainRuleCache = new Map();
const exceptionCache = new Map();


// INIT


function initTrackerRules(rules) {
  TRACKER_RULES = {
    domains: rules?.domains || {},
    patterns: Array.isArray(rules?.patterns) ? rules.patterns : [],
    exceptions: Array.isArray(rules?.exceptions) ? rules.exceptions : []
  };

  domainRuleCache.clear();
  exceptionCache.clear();

  TRACKER_RULES.patterns.forEach(function (p) {
    try {
      if (typeof p.regex === "string") {
        const m = p.regex.match(/^\/(.*)\/([a-z]*)$/);
        if (m) {
          p.regex = new RegExp(m[1], m[2]);
        } else {
          p.regex = new RegExp(p.regex);
        }
      }
    } catch (e) {
      p.regex = null;
    }
  });

  console.log(
    "Tracker rules loaded:",
    Object.keys(TRACKER_RULES.domains).length,
    "domains,",
    TRACKER_RULES.patterns.length,
    "patterns"
  );
}


// HELPERS


function hasException(domain) {
  if (!domain) return false;

  if (exceptionCache.has(domain)) {
    return exceptionCache.get(domain);
  }

  const parts = domain.toLowerCase().split(".");

  for (let i = 0; i < parts.length - 1; i++) {
    const sub = parts.slice(i).join(".");
    if (TRACKER_RULES.exceptions.includes(sub)) {
      exceptionCache.set(domain, true);
      return true;
    }
  }

  exceptionCache.set(domain, false);
  return false;
}

function matchDomainRule(domain) {
  if (!domain) return null;

  domain = domain.toLowerCase();

  if (domainRuleCache.has(domain)) {
    return domainRuleCache.get(domain);
  }

  const parts = domain.split(".");

  for (let i = 0; i < parts.length - 1; i++) {
    const sub = parts.slice(i).join(".");
    if (TRACKER_RULES.domains[sub]) {
      const result = TRACKER_RULES.domains[sub];
      domainRuleCache.set(domain, result);
      return result;
    }
  }

  domainRuleCache.set(domain, null);
  return null;
}

function matchPatternRule(url) {
  if (!url) return null;

  for (let i = 0; i < TRACKER_RULES.patterns.length; i++) {
    const rule = TRACKER_RULES.patterns[i];
    if (!rule || !rule.regex) continue;

    try {
      if (rule.regex.test(url)) {
        return rule;
      }
    } catch (e) {
      // ignore broken regex
    }
  }

  return null;
}


// PUBLIC MATCH FUNCTION


function matchTracker(url, domain) {
  domain = (domain || "").toLowerCase();

  if (!domain) return null;
  if (hasException(domain)) return null;

  // Fast path: domain-based rule
  const domainMatch = matchDomainRule(domain);
  if (domainMatch) {
    return domainMatch;
  }

  // Slow path: URL pattern rule
  // IMPORTANT: do not cache by domain, because different URLs
  // on the same host may or may not match.
  return matchPatternRule(url);
}

window.matchTracker = matchTracker;
window.initTrackerRules = initTrackerRules;