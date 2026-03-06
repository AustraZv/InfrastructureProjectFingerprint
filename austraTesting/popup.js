browser.runtime.sendMessage({ type: "GET_REPORT" })
  .then(report => {
    document.getElementById("mainDomain").textContent =
      "Site: " + (report.mainDomain || "N/A");

    document.getElementById("score").textContent =
      "Risk Score: " + report.score;

    const container = document.getElementById("domains");
    container.innerHTML = "";

    Object.entries(report.thirdParties).forEach(([domain, count]) => {
      const div = document.createElement("div");
      div.className = "domain";
      div.textContent = `${domain} (${count} requests)`;
      container.appendChild(div);
    });
  });