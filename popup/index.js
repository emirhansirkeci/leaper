let netflix = document.querySelector("#netflix");
let youtube = document.querySelector("#youtube");

(async function updateSwitches() {
  const { switchStates } = await chrome.storage.local.get(["switchStates"]);

  if (!switchStates) {
    youtube.checked = true;
    netflix.checked = true;
    return;
  }

  youtube.checked = switchStates.youtube;
  netflix.checked = switchStates.netflix;
})();

youtube.addEventListener("click", () => {
  chrome.storage.local.set({
    switchStates: {
      youtube: youtube.checked,
      netflix: netflix.checked,
    },
  });
});

netflix.addEventListener("click", async () => {
  chrome.storage.local.set({
    switchStates: {
      youtube: youtube.checked,
      netflix: netflix.checked,
    },
  });
});
