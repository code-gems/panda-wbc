/**
 * Sanitizes HTML string to prevent XSS attacks
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHTML = (html: string): string => {
	// Create a temporary DOM parser
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");

	// Define allowed tags (whitelist approach)
	const allowedTags = new Set([
		"p", "br", "span", "div", "h1", "h2", "h3", "h4", "h5", "h6",
		"strong", "em", "u", "b", "i", "strike", "del", "ins",
		"ul", "ol", "li", "blockquote", "pre", "code",
		"a", "img", "table", "thead", "tbody", "tr", "th", "td",
		"hr", "sup", "sub", "small", "mark"
	]);

	// Define allowed attributes per tag
	const allowedAttributes: Record<string, Set<string>> = {
		"a": new Set(["href", "title", "target", "rel"]),
		"img": new Set(["src", "alt", "title", "width", "height"]),
		"td": new Set(["colspan", "rowspan"]),
		"th": new Set(["colspan", "rowspan", "scope"]),
		"*": new Set(["class", "id", "part", "icon"]) // Allowed for all tags
	};

	// Define allowed URL schemes
	const allowedSchemes = new Set(["http:", "https:", "mailto:", "tel:"]);

	/**
	 * Recursively sanitize DOM nodes
	 */
	const sanitizeNode = (node: Node): Node | null => {
		// Handle text nodes - they're safe
		if (node.nodeType === Node.TEXT_NODE) {
			return node.cloneNode(false);
		}

		// Handle element nodes
		if (node.nodeType === Node.ELEMENT_NODE) {
			const element = node as Element;
			const tagName = element.tagName.toLowerCase();

			// Remove disallowed tags
			if (!allowedTags.has(tagName) && ![...allowedTags].includes("panda")) {
				return null;
			}

			// Create sanitized element
			const sanitized = document.createElement(tagName);

			// Sanitize attributes
			const attributes = element.attributes;
			for (const attribute of attributes) {
				const attr = attribute;
				const attrName = attr.name.toLowerCase();
				const attrValue = attr.value;

				// Skip event handlers (on*)
				if (attrName.startsWith("on")) {
					continue;
				}

				// Check if attribute is allowed for this tag
				const tagAllowedAttrs = allowedAttributes[tagName] || new Set();
				const globalAllowedAttrs = allowedAttributes["*"] || new Set();

				if (!tagAllowedAttrs.has(attrName) && !globalAllowedAttrs.has(attrName)) {
					continue;
				}

				// Special validation for href and src
				if (attrName === "href" || attrName === "src") {
					if (!isValidURL(attrValue)) {
						continue;
					}
				}

				// Special handling for target attribute
				if (attrName === "target" && attrValue === "_blank") {
					sanitized.setAttribute(attrName, attrValue);
					// Add security attributes when target is _blank
					sanitized.setAttribute("rel", "noopener noreferrer");
					continue;
				}

				// Set the attribute
				sanitized.setAttribute(attrName, attrValue);
			}

			// Recursively sanitize children
			const children = node.childNodes;
			for (const child of children) {
				const sanitizedChild = sanitizeNode(child);
				if (sanitizedChild) {
					sanitized.appendChild(sanitizedChild);
				}
			}

			return sanitized;
		}

		// Ignore other node types (comments, etc.)
		return null;
	}

	/**
	 * Validate URL to prevent javascript: and data: schemes
	 */
	const isValidURL = (url: string): boolean => {
		const trimmed = url.trim().toLowerCase();

		// Block javascript: and data: schemes
		if (trimmed.startsWith("javascript:") || trimmed.startsWith("data:")) {
			return false;
		}

		// Allow relative URLs
		if (trimmed.startsWith("/") || trimmed.startsWith("./") || trimmed.startsWith("../")) {
			return true;
		}

		// Allow fragment identifiers
		if (trimmed.startsWith("#")) {
			return true;
		}

		// Check absolute URLs
		try {
			const urlObj = new URL(url, globalThis.location.href);
			return allowedSchemes.has(urlObj.protocol);
		} catch {
			// If URL parsing fails, be conservative and reject
			return false;
		}
	}

	// Sanitize the body content
	const sanitizedBody = document.createElement("div");
	const bodyChildren = doc.body.childNodes;

	for (const child of bodyChildren) {
		const sanitizedChild = sanitizeNode(child);
		if (sanitizedChild) {
			sanitizedBody.appendChild(sanitizedChild);
		}
	}

	return sanitizedBody.innerHTML;
}

// // Example usage:
// const maliciousHTML = `
//   <div>
//     <p>Safe content</p>
//     <script>alert("XSS")</script>
//     <img src="x" onerror="alert("XSS")">
//     <a href="javascript:alert("XSS")">Malicious link</a>
//     <a href="https://example.com" onclick="alert("XSS")">Safe link with handler</a>
//     <div onload="alert("XSS")">Div with handler</div>
//   </div>
// `;

// const sanitized = sanitizeHTML(maliciousHTML);
// console.log("Sanitized HTML:", sanitized);
// // Output will have scripts and event handlers removed