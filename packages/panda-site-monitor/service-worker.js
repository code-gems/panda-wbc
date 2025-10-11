// service-worker.js
console.log("[Service worker] installed");

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
	.setPanelBehavior({ openPanelOnActionClick: true })
	.catch((error) => console.error(error));

// Creates a context menu item to open the side panel
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "openSidePanel",
		title: "Panda DevTools",
		contexts: ["all"],
	});
});

// Listens for context menu item clicks to open the side panel
chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "openSidePanel") {
		// This will open the panel in all the pages on the current window.
		chrome.sidePanel.open({ windowId: tab.windowId });
	}
});

chrome.tabs.onActivated.addListener((activeInfo) => {
	console.log('[Service worker] Active tab changed to tabId:', activeInfo.tabId);
	
	// You can also get full tab details if needed
	chrome.tabs.get(activeInfo.tabId, (tab) => {
		console.log('[Service worker] New active tab URL:', tab.url);
	});
});
