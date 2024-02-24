chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "supported-site-detected") {
    main();
  }
});

async function main() {
  const { switchStates } = await chrome.storage.local.get(["switchStates"]);

  if (!switchStates.netflix) return;

  const targetElement = document.querySelector(
    "#appMountPoint > div > div > div.watch-video"
  );

  console.log({
    status: "Working well",
    site: "Netflix",
    targetElement,
  });

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const node = mutation.addedNodes[0];
      if (!node) return;

      const skipButton = node.querySelector(
        ".watch-video--skip-content-button"
      );

      if (skipButton) {
        skipButton.click();
        notify();
        return;
      }

      const nextEpisodeButton = node.querySelector(
        "button[data-uia='next-episode-seamless-button-draining']"
      );

      if (nextEpisodeButton) {
        nextEpisodeButton.click();
        notify();
        return;
      }
    });
  });

  const config = { childList: true, subtree: true };
  observer.observe(targetElement, config);
}
