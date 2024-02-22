chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  try {
    if (changeInfo.status === "complete" && isValidUrl(tab.url)) {
      console.log({
        currently_watching: tab.url,
      });

      chrome.tabs.sendMessage(tabId, {
        message: "supported-site-detected",
      });
    }
  } catch (error) {
    console.log({
      error,
      url: tab.url,
      isValidUrl: isValidUrl(tab.url),
      tab,
    });
  }
});

function isValidUrl(url) {
  const r = /^http.*\/watch/i;
  return r.test(url);
}
