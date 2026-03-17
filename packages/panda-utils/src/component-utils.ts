/**
 * Apply component styles to shadow root.
 * @param {string | string[]} styles styles to apply
 * @param {ShadowRoot} target shadow root to apply styles to
 * @description This function applies the provided styles to the target shadow root. 
 * It first checks if the browser supports adoptedStyleSheets, and if so, it uses that API to apply the styles. 
 * If not, it falls back to creating a style element and appending it to the shadow root.
 */
export const applyStyles = (styles: string | string[], target: ShadowRoot | null): void => {
	if (target == null || styles == null) {
		return;
	}
	// check for adoptedStyleSheets support
	if (target.adoptedStyleSheets) {
		if (Array.isArray(styles)) {
			const cssStyleSheets = styles.map((style) => {
				const cssStyleSheet = new CSSStyleSheet();
				cssStyleSheet.replaceSync(style);
				return cssStyleSheet;
			});
			target.adoptedStyleSheets = cssStyleSheets;
		} else {
			const cssStyleSheet = new CSSStyleSheet();
			cssStyleSheet.replaceSync(styles);
			target.adoptedStyleSheets = [cssStyleSheet];
		}
	} else {
		// fallback for browsers that do not support adoptedStyleSheets
		const styleEl = document.createElement("style");
		styleEl.textContent = Array.isArray(styles)
			? styles.join("\n")
			: styles;

		target.appendChild(styleEl);
	}
}

/**
 * Parses an attribute value to boolean.
 * @param value value to parse
 * @description Parses a value to boolean. If the value is "true" or true, it returns true, otherwise false.
 * @returns {boolean}
 */
export const parseBooleanAttribute = (value: unknown): boolean => {
	return value === "true" || value === true || value === "";
}

/**
 * Parses an attribute value to a number
 * @param {unknown} value value to parse
 * @param {number | null} fallbackValue fallback value if provided value is invalid
 * @returns {number | null}
 */
export const parseNumberAttribute = (value: unknown, fallbackValue: number | null = null): number | null => {
	// check for null and undefined
	if (value == null) {
		return fallbackValue;
	}
	// check if already a number and if it's valid
	if (typeof value === "number") {
		return Number.isNaN(value) || !Number.isFinite(value)
			? fallbackValue
			: value;
	}
	// Try to parse as number
	const parsedValue = Number(value);
	// return fallback if parsing resulted in NaN or infinity
	return Number.isNaN(parsedValue) || !Number.isFinite(parsedValue)
		? fallbackValue
		: parsedValue;
}

/**
 * Sanitizes a string to prevent XSS attacks by escaping special characters.
 * @param {string} value string to sanitize
 * @returns {string} sanitized string
 */
export const sanitizeString = (value: string): string => {
	return value.replace(/[&<>"'`=\/]/g, (char) => {
		return ({
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
			'`': '&#x60;',
			'=': '&#x3D;',
			'/': '&#x2F;',
		} as Record<string, string>)[char];
	});
}
