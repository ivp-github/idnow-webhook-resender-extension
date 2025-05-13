document.addEventListener("DOMContentLoaded", () => {
  const runButton = document.getElementById("run");
  const csvInput = document.getElementById("csv");

  runButton.addEventListener("click", async () => {
    const raw = document.getElementById("idents").value;
    const identIDs = raw.split("\n").map(x => x.trim()).filter(Boolean);

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: runAutomation,
      args: [identIDs]
    });
  });

  csvInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const lines = e.target.result.split(/\r?\n/);
      document.getElementById("idents").value = lines.join("\n");
    };
    reader.readAsText(file);
  });

  function runAutomation(identIDs) {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const waitForElement = async (selector, timeout = 5000, context = document) => {
      const pollInterval = 150;
      const maxAttempts = timeout / pollInterval;
      let attempts = 0;
      while (attempts++ < maxAttempts) {
        const el = context.querySelector(selector);
        if (el) return el;
        await delay(pollInterval);
      }
      return null;
    };

    const setInputValue = (element, value) => {
      element.focus();
      element.value = value;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      element.blur();
    };

    (async () => {
      const report = [];

      for (const ident of identIDs) {
        console.log(`🔍 Processing: ${ident}`);

        const input = document.querySelectorAll("input.ember-text-field")[2];
        if (!input) {
          report.push({ ident, status: "input not found" });
          continue;
        }

        setInputValue(input, ident);
        await delay(200);

        const searchButton = document.querySelectorAll("button.btn.btn-default.btn-lg")[1];
        if (!searchButton) {
          report.push({ ident, status: "search button not found" });
          continue;
        }

        searchButton.click();
        await delay(1200);

        let viewLink;
        for (let i = 0; i < 12; i++) {
          viewLink = Array.from(document.querySelectorAll("a.btn.btn-default.btn-xs[target='_blank']"))
            .find(el => el.textContent.trim().toLowerCase() === 'view');
          if (viewLink) break;
          await delay(250);
        }

        if (!viewLink) {
          report.push({ ident, status: "view not found" });
          continue;
        }

        const newTab = window.open(viewLink.href, '_blank');
        if (!newTab) {
          report.push({ ident, status: "popup blocked" });
          continue;
        }

        await new Promise(resolve => {
          const interval = setInterval(async () => {
            try {
              const resend = [...newTab.document.querySelectorAll("button.btn-warning")]
                .find(btn => btn.innerText.toLowerCase().includes("resend"));
              if (resend) {
                resend.click();
                report.push({ ident, status: "webhook resent" });
                clearInterval(interval);
                await delay(500);
                newTab.close();
                resolve();
              }
            } catch {}
          }, 300);
        });

        await delay(500);
      }

      console.table(report);
      alert("✅ Done! Check console for report.");
    })();
  }
});