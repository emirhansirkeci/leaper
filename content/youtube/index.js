chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "tab-updated") {
    const url = document.location.href;

    if (url.includes("/watch")) {
      main();
    }
  }
});

function main() {
  const targetElement = document.querySelector("#player");

  console.log({
    status: "Working well",
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
