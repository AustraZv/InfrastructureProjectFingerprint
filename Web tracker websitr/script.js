function goToDashboard() {
  window.location.href = "dashboard.html";
}

function generateTrackerData() {
  let analytics = Math.floor(Math.random() * 5) + 1;
  let ads = Math.floor(Math.random() * 7) + 1;
  let fingerprint = Math.floor(Math.random() * 3);

  document.getElementById("analyticsCount").innerText = analytics;
  document.getElementById("adsCount").innerText = ads;
  document.getElementById("fingerCount").innerText = fingerprint;

  calculateRisk(analytics, ads, fingerprint);
}

function calculateRisk(a, b, c) {
  let score = a * 2 + b * 3 + c * 5;
  let level = "";

  if (score < 15) {
    level = "Low Privacy Risk";
  } else if (score < 30) {
    level = "Medium Privacy Risk";
  } else {
    level = "High Privacy Risk";
  }

  document.getElementById("riskScore").innerText =
    "Score: " + score + " | " + level;
}

window.onload = generateTrackerData;
function goToHowTo() {
  window.location.href = "how-to-use.html";
}
function toggleTheme() {
  document.body.classList.toggle("light-mode");

  let button = document.querySelector(".theme-toggle");

  if (document.body.classList.contains("light-mode")) {
    button.innerHTML = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    button.innerHTML = "🌙";
    localStorage.setItem("theme", "dark");
  }
}

// Save theme preference
window.addEventListener("DOMContentLoaded", function () {
  generateTrackerData();

  let savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    document.querySelector(".theme-toggle").innerHTML = "☀️";
  }
});
