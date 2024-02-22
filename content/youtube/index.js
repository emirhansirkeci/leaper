chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "supported-site-detected") {
    main();
  }
});

function main() {
  console.log({
    status: "Working well",
    site: "YouTube",
  });

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
  });

  const config = { childList: true, subtree: true };
  observer.observe(document, config);
}
