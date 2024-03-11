chrome.runtime.onMessage.addListener(async function (request) {
  if (request.activeSite === "youtube") {
    main();
  }
});

async function main() {
  const observer = new MutationObserver((mutations) => {
    const skipButtonContainer = document.querySelector(
      "span.ytp-ad-skip-button-container"
    );

    const skipButton = document.querySelector(
      "button.ytp-ad-skip-button-modern"
    );

    if (
      skipButtonContainer?.style.display == "none" ||
      skipButtonContainer === null
    ) {
      return;
    }

    skipButton.click();
    notify();
  });

  const config = { childList: true, subtree: true };
  observer.observe(document, config);
}
