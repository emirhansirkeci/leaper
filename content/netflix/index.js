chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "supported-site-detected") {
    main();
  }
});

async function main() {
  const { switchStates } = await chrome.storage.local.get(["switchStates"]);

  if (!switchStates.netflix) return;

  console.log({
    status: "Working well",
    site: "Netflix",
    targetElement,
  });

  const targetElement = document.querySelector(
    "#appMountPoint > div > div > div.watch-video"
  );

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const node = mutation.addedNodes[0];
      if (!node) return;

      const skipButton = node.querySelector(
        ".watch-video--skip-content-button"
      );

      if (skipButton) {
        return skipButton.click();
      }

      const nextEpisodeButton = node.querySelector(
        "button[data-uia='next-episode-seamless-button-draining']"
      );

      if (nextEpisodeButton) {
        return nextEpisodeButton.click();
      }
    });
  });

  const config = { childList: true, subtree: true };
  observer.observe(targetElement, config);
}
