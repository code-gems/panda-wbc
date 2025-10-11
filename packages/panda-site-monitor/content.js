console.log("[Content] script loaded");

window.onload = () => {
	console.log("[Content] (window.onload) window:", window);
	console.log("[Content] chrome:", chrome);
	
	document.addEventListener("pandaMessage", (event) => {
		console.log("[Content] (pandaMessage event) received pandaMessage event:", event.detail);

		// Send a message to the background script
		chrome.runtime.sendMessage({
			action: 'panda-message',
			data: event.detail,
		});
	});


	chrome.runtime.onMessage.addListener(
		(request, sender, sendResponse) => {
			console.log("[Content] script received message:", request);

			// if (request.action === 'panda-message') {

			sendResponse({ status: 'Message received in content script' });
			// }
		}
	);

};

// window.onload = () => {
// 	console.log("onload", document.getElementById("btn"));

// 	console.log("panda:", window.panda);


// 	const btn = document.getElementById("btn");
// 	if (btn) {
// 		btn.addEventListener("click", () => {
// 			chrome.runtime.sendMessage({ type: "panda-message", data: "Button clicked!" });
// 		});
// 	}
// }

// chrome.runtime.onMessage.addListener(
// 	(request, sender, sendResponse) => {`
// 		console.log("[Side panel] script received message:", request);

// 		// if (request.action === 'panda-message') {

// 		// 	sendResponse({ status: 'Message received in side panel' });
// 		// }
// 	}
// );


	
	// setTimeout(async () => {
	// 	console.log("[Content] (sendMessage) panda:", window.panda);
	// 	console.log("[Content] (sendMessage) runtime:", chrome.runtime);
	// 	await chrome.runtime.sendMessage("kpoahboakbihhgciijolfbdjidhffldj", {
	// 		action: 'panda-message',
	// 		data: window.panda,
	// 	});
	// }, 2000);

	// chrome.runtime.onMessage.addListener(
	// 	(message, sender, sendResponse) => {
	// 		if (message.action === 'panda-message') {
	// 			console.log("[Content] (onMessage) panda:", message.data);
	// 		}
	// 	}
	// );
