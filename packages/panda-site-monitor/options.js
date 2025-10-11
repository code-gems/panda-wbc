// This code runs in the context of the options page.
chrome.tabs.getCurrent(function(tab) {
  if (tab) {
    document.getElementById('tab-info').textContent = `
      Tab ID: ${tab.id}\n
      Tab Title: ${tab.title}\n
      Tab URL: ${tab.url}\n
    `;
  } else {
    document.getElementById('tab-info').textContent = "Could not get current tab.";
  }
});