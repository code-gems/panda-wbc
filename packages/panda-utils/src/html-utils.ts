/**
 * XSS HTML Sanitizer
 * Sanitizes an HTML string against Cross-Site Scripting (XSS) attacks.
 * No third-party libraries used — pure TypeScript DOM + regex logic.
 */

// ─── Configuration ────────────────────────────────────────────────────────────

/** Tags that are completely stripped along with their content. */
const BLOCKED_TAGS = new Set([
	"script", "style", "iframe", "object", "embed", "applet",
	"base", "form", "input", "button", "textarea", "select",
	"option", "link", "meta", "frame", "frameset", "noframes",
	"noscript", "xml", "xmp", "plaintext",
]);

/** Tags whose content is kept but the tag itself is removed (unwrapped). */
const UNWRAP_TAGS = new Set([
	"html", "head", "body", "title",
]);

/** Tags that are allowed through (with attribute filtering). */
const ALLOWED_TAGS = new Set([
	"a", "abbr", "acronym", "address", "article", "aside",
	"b", "bdi", "bdo", "big", "blockquote", "br", "caption",
	"cite", "code", "col", "colgroup", "dd", "del", "details",
	"dfn", "div", "dl", "dt", "em", "figcaption", "figure",
	"footer", "h1", "h2", "h3", "h4", "h5", "h6", "header",
	"hr", "i", "img", "ins", "kbd", "li", "main", "mark",
	"nav", "ol", "p", "pre", "q", "rp", "rt", "ruby", "s",
	"samp", "section", "small", "span", "strong", "sub", "summary",
	"sup", "table", "tbody", "td", "tfoot", "th", "thead",
	"time", "tr", "tt", "u", "ul", "var", "wbr",
]);

/** Per-tag allowed attributes. "*" key applies to all tags. */
const ALLOWED_ATTRIBUTES: Record<string, Set<string>> = {
	"*": new Set([
		"id", "class", "title", "aria-label", "aria-describedby",
		"aria-hidden", "aria-role", "role", "tabindex", "lang", "dir",
		"data-*",  // handled specially below
	]),
	a: new Set(["href", "name", "target", "rel"]),
	img: new Set(["src", "alt", "width", "height", "loading"]),
	td: new Set(["colspan", "rowspan", "headers"]),
	th: new Set(["colspan", "rowspan", "scope"]),
	col: new Set(["span"]),
	colgroup: new Set(["span"]),
	time: new Set(["datetime"]),
	del: new Set(["cite", "datetime"]),
	ins: new Set(["cite", "datetime"]),
	blockquote: new Set(["cite"]),
	q: new Set(["cite"]),
	ol: new Set(["start", "reversed", "type"]),
	li: new Set(["value"]),
};

/** Protocols allowed in href/src attributes. */
const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:", "ftp:"]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Checks whether a URL is safe (allowed protocol, no javascript:/data: injection).
 */
function isSafeUrl(value: string): boolean {
	const trimmed = value.trim().toLowerCase().replace(/[\x00-\x1f\x7f]/g, "");

	// Block javascript:, vbscript:, data: and other dangerous schemes
	if (/^(javascript|vbscript|data|livescript|mocha):/i.test(trimmed)) {
		return false;
	}

	try {
		// Relative URLs are fine
		if (!trimmed.includes(":")) return true;
		const url = new URL(trimmed);
		return ALLOWED_PROTOCOLS.has(url.protocol);
	} catch {
		// Relative URL — allow it
		return true;
	}
}

/**
 * Determines whether an attribute name/value pair is safe to keep.
 */
function isSafeAttribute(tagName: string, attrName: string, attrValue: string): boolean {
	const name = attrName.toLowerCase().trim();
	const value = attrValue.trim();

	// Block all event handlers (on*)
	if (/^on\w+/i.test(name)) return false;

	// Block attributes that can carry scripts
	if (["formaction", "action", "srcdoc", "xlink:href", "xmlns"].includes(name)) return false;

	// data-* attributes are globally allowed (value still sanitised below)
	const isDataAttr = name.startsWith("data-");

	const globalAttrs = ALLOWED_ATTRIBUTES["*"];
	const tagAttrs = ALLOWED_ATTRIBUTES[tagName] ?? new Set();
	const allowed = isDataAttr || globalAttrs.has(name) || tagAttrs.has(name);

	if (!allowed) return false;

	// Sanitize URL attributes
	if (["href", "src", "action", "formaction", "cite"].includes(name)) {
		return isSafeUrl(value);
	}

	// Block CSS expressions inside style-like attributes
	if (name === "style") return false; // style blocked globally here for safety

	// Block values that look like script injections
	if (/expression\s*\(|javascript\s*:/i.test(value)) return false;

	return true;
}

// ─── Core Sanitizer ───────────────────────────────────────────────────────────

/**
 * Sanitizes an HTML string against XSS attacks.
 *
 * Strategy:
 *  1. Parse with DOMParser (browser) or regex fallback (Node / non-DOM env).
 *  2. Walk every node, drop blocked tags + dangerous attributes.
 *  3. Serialize back to an HTML string.
 *
 * @param html - Raw, potentially malicious HTML string.
 * @returns   Clean, XSS-safe HTML string.
 */
export function sanitizeHtml(html: string): string {
	if (!html || typeof html !== "string") return "";

	// ── Browser path (DOMParser available) ──────────────────────────────────────
	if (typeof window !== "undefined" && typeof window.DOMParser !== "undefined") {
		return sanitizeWithDOMParser(html);
	}

	// ── Node / non-browser path (regex-based) ───────────────────────────────────
	return sanitizeWithRegex(html);
}

// ─── Browser implementation ───────────────────────────────────────────────────

function sanitizeWithDOMParser(html: string): string {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	sanitizeNode(doc.body);
	return doc.body.innerHTML;
}

function sanitizeNode(node: Node): void {
	const toRemove: Node[] = [];
	const toUnwrap: Node[] = [];

	node.childNodes.forEach((child) => {
		if (child.nodeType === Node.ELEMENT_NODE) {
			const el = child as Element;
			const tag = el.tagName.toLowerCase();

			if (BLOCKED_TAGS.has(tag)) {
				toRemove.push(child);
				return;
			}

			if (UNWRAP_TAGS.has(tag)) {
				toUnwrap.push(child);
				return;
			}

			if (!ALLOWED_TAGS.has(tag)) {
				// Unknown tag — unwrap (keep content, remove tag)
				toUnwrap.push(child);
				return;
			}

			// Sanitize attributes
			const attrsToRemove: string[] = [];
			Array.from(el.attributes).forEach((attr) => {
				if (!isSafeAttribute(tag, attr.name, attr.value)) {
					attrsToRemove.push(attr.name);
				}
			});
			attrsToRemove.forEach((a) => el.removeAttribute(a));

			// Force rel="noopener noreferrer" on links that open in new tab
			if (tag === "a" && el.getAttribute("target") === "_blank") {
				el.setAttribute("rel", "noopener noreferrer");
			}

			// Recurse
			sanitizeNode(el);
		} else if (child.nodeType === Node.COMMENT_NODE) {
			// Strip all HTML comments — they can hide injection payloads
			toRemove.push(child);
		}
		// TEXT_NODE — always safe; leave as-is
	});

	toRemove.forEach((n) => node.removeChild(n));
	toUnwrap.forEach((n) => {
		while (n.firstChild) node.insertBefore(n.firstChild, n);
		node.removeChild(n);
	});
}

// ─── Regex / Node.js implementation ───────────────────────────────────────────

/**
 * Lightweight regex-based sanitizer for non-browser environments.
 * Handles the most common XSS vectors without a full DOM.
 */
function sanitizeWithRegex(html: string): string {
	// 1. Decode common HTML entities that could hide payloads before tag parsing
	let clean = decodeObfuscatedEntities(html);

	// 2. Strip HTML comments
	clean = clean.replace(/<!--[\s\S]*?-->/g, "");

	// 3. Remove blocked tags and their entire content
	for (const tag of BLOCKED_TAGS) {
		const re = new RegExp(`<${tag}[\\s\\S]*?<\\/${tag}\\s*>|<${tag}[^>]*\\/?>`, "gi");
		clean = clean.replace(re, "");
	}

	// 4. Process remaining tags
	clean = clean.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (match, rawTag, rawAttrs) => {
		const tag = rawTag.toLowerCase();

		if (BLOCKED_TAGS.has(tag)) return "";
		if (UNWRAP_TAGS.has(tag)) return ""; // drop the tag, content was already there

		if (!ALLOWED_TAGS.has(tag)) return ""; // unknown tag stripped entirely

		// Self-closing check
		const selfClose = match.endsWith("/>") ? " /" : "";
		const isClosing = match.startsWith("</");
		if (isClosing) return `</${tag}>`;

		// Sanitize attributes
		const safeAttrs = sanitizeAttributeString(tag, rawAttrs);

		// Force rel on target=_blank links
		if (tag === "a" && /target\s*=\s*["']?_blank/i.test(safeAttrs)) {
			const withRel = safeAttrs.replace(/rel\s*=\s*["'][^"']*["']/gi, "");
			return `<a${withRel} rel="noopener noreferrer"${selfClose}>`;
		}

		return safeAttrs ? `<${tag} ${safeAttrs.trim()}${selfClose}>` : `<${tag}${selfClose}>`;
	});

	return clean;
}

/**
 * Extracts and sanitizes individual attribute key=value pairs from a raw
 * attribute string (the part inside a tag after the tag name).
 */
function sanitizeAttributeString(tag: string, rawAttrs: string): string {
	const attrRegex = /([\w:.-]+)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]*)))?/g;
	const safe: string[] = [];
	let m: RegExpExecArray | null;

	while ((m = attrRegex.exec(rawAttrs)) !== null) {
		const name = m[1];
		const value = m[2] ?? m[3] ?? m[4] ?? "";

		if (isSafeAttribute(tag, name, value)) {
			safe.push(value !== "" ? `${name}="${escapeAttrValue(value)}"` : name);
		}
	}

	return safe.join(" ");
}

/** Escape dangerous characters inside attribute values. */
function escapeAttrValue(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#x27;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

/**
 * Decode a limited set of HTML entities / encoding tricks used to bypass
 * naive filters (e.g. &#106;avascript:, &#x6A;avascript:).
 */
function decodeObfuscatedEntities(html: string): string {
	return html
		.replace(/&#x([0-9a-fA-F]+);?/g, (_, hex) =>
			String.fromCharCode(parseInt(hex, 16)))
		.replace(/&#([0-9]+);?/g, (_, dec) =>
			String.fromCharCode(parseInt(dec, 10)))
		.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
			String.fromCharCode(parseInt(hex, 16)));
}