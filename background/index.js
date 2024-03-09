const SupportedSites = {
  youtube: "youtube",
  netflix: "netflix",
};

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status != "complete") return;

  const info = siteInfo(tab.url);

  if (!info.valid) return;

  const { switchStates } = await chrome.storage.local.get(["switchStates"]);

  if (info.site === SupportedSites.youtube && switchStates.youtube) {
    chrome.tabs.sendMessage(tabId, {
      activeSite: info.site,
    });
  }

  if (info.site === SupportedSites.netflix && switchStates.netflix) {
    chrome.tabs.sendMessage(tabId, {
      activeSite: info.site,
    });
  }
});

function siteInfo(url) {
  if (!/^http.*\/watch/i.test(url)) {
    return {
      site: "",
      valid: false,
    };
  }

  if (url.includes(SupportedSites.netflix)) {
    return {
      site: SupportedSites.netflix,
      valid: true,
    };
  }

  if (url.includes(SupportedSites.youtube)) {
    return {
      site: SupportedSites.youtube,
      valid: true,
    };
  }

  return {
    site: "",
    valid: false,
  };
}
