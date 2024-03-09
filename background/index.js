const SupportedSites = {
  youtube: "youtube",
  netflix: "netflix",
};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  const siteInfo = isValidUrl(tab.url);

  if (changeInfo.status != "complete" && !siteInfo.valid) return;

  if (siteInfo.site === SupportedSites.youtube) {
    chrome.tabs.sendMessage(tabId, {
      message: siteInfo.site,
    });
  }

  if (siteInfo.site === SupportedSites.netflix) {
    chrome.tabs.sendMessage(tabId, {
      message: siteInfo.site,
    });
  }

  return;
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
  if (!/^http.*\/watch/i.test(url)) return;

  if (url.includes(SupportedSites.netflix)) {
    return {
      site: SupportedSites.netflix,
      valid: true,
    };
  }

  if (url.includes(SupportedSites.netflix)) {
    return {
      site: SupportedSites.netflix,
      valid: true,
    };
  }

  return {
    site: "",
    valid: false,
  };
}
