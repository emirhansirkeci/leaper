chrome.runtime.onMessage.addListener(async function (request) {
  if (request.message === "supported-site-detected") {
    const { switchStates } = await chrome.storage.local.get(["switchStates"]);

    if (switchStates?.netflix === false) return;

    console.log({
      status: "Working well",
      site: "Netflix",
      switchStates,
    });

    main();
  }
});

async function main() {
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
