chrome.runtime.onMessage.addListener(async function (request) {
  if (request.message === "youtube") {
    const { switchStates } = await chrome.storage.local.get(["switchStates"]);

    if (switchStates?.youtube === false) return;

    console.log({
      status: "Working well",
      site: "Youtube",
      switchStates,
    });

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
