fetch(chrome.runtime.getURL("/content/utils/notify.html"))
  .then((r) => r.text())
  .then((html) => {
    // Not using innerHTML as it would break js event listeners of the page
    document.body.insertAdjacentHTML("beforeend", html);
  });
