chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "tab-updated") {
    main();
  }
});

// document.querySelector(".ytp-ad-player-overlay-layout__skip-or-preview-container")

function main() {
  const targetElement = document.querySelector("#player");

  console.log({
    status: "Working well",
    site: "YouTube",
    targetElement,
  });

  const observer = new MutationObserver((mutations) => {
    const skipButtonContainer = targetElement.querySelector(
      "span.ytp-ad-skip-button-container"
    );

    const skipButton = targetElement.querySelector(
      "button.ytp-ad-skip-button-modern"
    );

    if (
      skipButtonContainer?.style.display == "none" ||
      skipButtonContainer === null
    ) {
      return;
    }

    skipButton.click();
  });

  const config = { childList: true, subtree: true };
  observer.observe(targetElement, config);
}
