"use strict";

const startButton = document.querySelector("#start-button");
const statusText = document.querySelector("#system-status");

if (startButton && statusText) {
  startButton.addEventListener("click", () => {
    statusText.textContent =
      "System foundation is working. The full UI will be added next.";

    startButton.textContent = "System Ready";
    startButton.disabled = true;
  });
}
