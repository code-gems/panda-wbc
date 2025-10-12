console.log("[Side panel] script loaded");

window.onload = () => {
	console.log("[Side panel] (onload)", document);
	
	chrome.runtime.onMessage.addListener(
		(request, sender, sendResponse) => {
			console.log("[Side panel] (onMessage) request:", request);
			console.log("[Side panel] (onMessage) sender:", sender);
	
			// if (request.action === 'panda-message') {
				// console.log("[Side panel] (onMessage) script received message:", request);
	
				// sendResponse({ status: 'Message received in side panel' });
			// }
		}
	);

	const btn = document.getElementById("btn");
	if (btn) {
		btn.addEventListener("click", () => {
			chrome.tabs.query(
				{ active: true, lastFocusedWindow: true },
				(tabs) => {
					const activeTabId = tabs[0].id;
					chrome.tabs.sendMessage(
						activeTabId,
						{
							greeting: "[Side panel] hello from side panel"
						},
						(response) => {
							console.log("[Side panel] Response:", response);
						}
					);

					chrome.scripting.executeScript({
						target: { tabId: activeTabId },
						func: () => {
							// This function runs in the context of the active tab
							document.body.style.border = "5px solid green"; // Example: add a green border
							console.log("[Content injected] document:", document);
							console.log("[Content injected] window.data:", window.data);

							const event = new CustomEvent('panda-dev-tools-init', {});
							document.dispatchEvent(event);
							window.location.reload();
						},
					});
				}
			);
		});
	}
}


// 	const btn = document.getElementById("btn");
// 	if (btn) {
// 		btn.addEventListener("click", async () => {
// 			chrome.runtime.sendMessage({ action: "get-page-title" }, (response) => {
// 				if (response && response.title) {
// 					console.log("Page title:", response.title);
// 				}
// 			});
			
// 		});




// 	document.addEventListener("pandaMessage", (event) => {
// 		console.log("[Content] received pandaMessage event:", event.detail);
// 	});
// };

// chrome.action.onClicked.addListener(async (tab) => {
// 	console.log("[Side panel] action tab:", tab);

// 	try {
// 		await chrome.scripting.executeScript({
// 			target: { tabId: tab.id },
// 			func: () => {
// 				// This function runs in the context of the active tab
// 				document.body.style.border = "5px solid green"; // Example: add a green border
// 				console.log("[Content injected] panda:", window.panda);
// 				// chrome.runtime.sendMessage("kpoahboakbihhgciijolfbdjidhffldj", {
// 				// 	action: 'panda-message',
// 				// 	data: window.panda,
// 				// });
// 			},
// 		});
// 		console.log("Script injected and executed");
// 	} catch (err) {
// 		console.error("Failed to execute script: ", err);
// 	}
// });
