// types
import { PandaHeatmapI18nConfig, RGBAColor } from "../../index";

export const getI18nConfig = (): PandaHeatmapI18nConfig => ({
	noDataText: "No data available",
	loadingText: "Loading...",
});

const colorStringToRGBA = (color: string): RGBAColor => {
	if (!color) {
		return { r: 0, g: 0, b: 0, a: 100 };
	}
	const trimmed = color.trim();

	// Handle hex format
	if (trimmed.startsWith('#')) {
		return hexToRGBA(trimmed);
	}

	// Handle rgb/rgba format
	if (trimmed.startsWith('rgb')) {
		return rgbStringToRGBA(trimmed);
	}

	// Handle hsl/hsla format
	if (trimmed.startsWith('hsl')) {
		return hslStringToRGBA(trimmed);
	}

	// Handle named colors
	return colorNameToRgb(trimmed);
}

/**
 * Convert hex color string to RGBAColor
 * @param {String} hex color value in hex format
 * @returns RGBAColor object
 */
const hexToRGBA = (hex: string): RGBAColor => {
	// Remove # if present
	hex = hex.replace("#", "");

	let r: number = 0;
	let g: number = 0;
	let b: number = 0;
	let a: number = 100;

	if (hex.length === 3) {
		// Short format: #RGB
		r = Number.parseInt(hex[0] + hex[0], 16);
		g = Number.parseInt(hex[1] + hex[1], 16);
		b = Number.parseInt(hex[2] + hex[2], 16);
	} else if (hex.length === 4) {
		// Short format with alpha: #RGBA
		r = Number.parseInt(hex[0] + hex[0], 16);
		g = Number.parseInt(hex[1] + hex[1], 16);
		b = Number.parseInt(hex[2] + hex[2], 16);
		a = Math.round((Number.parseInt(hex[3] + hex[3], 16) / 255) * 100);
	} else if (hex.length === 6) {
		// Full format: #RRGGBB
		r = Number.parseInt(hex.substring(0, 2), 16);
		g = Number.parseInt(hex.substring(2, 4), 16);
		b = Number.parseInt(hex.substring(4, 6), 16);
	} else if (hex.length === 8) {
		// Full format with alpha: #RRGGBBAA
		r = Number.parseInt(hex.substring(0, 2), 16);
		g = Number.parseInt(hex.substring(2, 4), 16);
		b = Number.parseInt(hex.substring(4, 6), 16);
		a = Math.round((Number.parseInt(hex.substring(6, 8), 16) / 255) * 100);
	}

	return { r, g, b, a };
}

const rgbStringToRGBA = (rgb: string): RGBAColor => {
	// Match rgb(r, g, b) or rgba(r, g, b, a)
	const match = rgb.match(/rgba?\(([^)]+)\)/);
	if (!match) {
		return { r: 0, g: 0, b: 0, a: 100 };
	}

	const values = match[1].split(",").map(v => v.trim());
	const r = Number.parseInt(values[0]);
	const g = Number.parseInt(values[1]);
	const b = Number.parseInt(values[2]);
	const a = values[3]
		? Math.round(Number.parseFloat(values[3]) * 100)
		: 100;

	return { r, g, b, a };
}

const hslStringToRGBA = (hsl: string): RGBAColor => {
	// Match hsl(h, s%, l%) or hsla(h, s%, l%, a) or hsl(hdeg s% l% / a%)
	const match = hsl.match(/^hsl\((\d+)(?:deg)?(?:,)?\s*([\d.]+)%(?:,)?\s*([\d.]+)%\s*(?:[,/])?\s*([0-9.%]+)?\)$/);
	if (!match) {
		console.log(`%c ⚠️ [PANDA HEATMAP] Invalid hsl/hsla color: ${hsl}`, "font-size: 24px; color: crimson; background: black;");
		return { r: 0, g: 0, b: 0, a: 100 };
	}

	const h = Number.parseFloat(match[1].replace("deg", ""));
	const s = Number.parseFloat(match[2].replace("%", ""));
	const l = Number.parseFloat(match[3].replace("%", ""));
	const a = match[4]
		? Number.parseFloat(match[4].replace("%", ""))
		: 100;

	return hslToRGB(h, s, l, a);
}

const hslToRGB = (h: number, s: number, l: number, a: number): RGBAColor => {
	s /= 100;
	l /= 100;

	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = l - c / 2;

	let r = 0, g = 0, b = 0;

	if (h >= 0 && h < 60) {
		r = c; 
		g = x;
	} else if (h >= 60 && h < 120) {
		r = x;
		g = c;
	} else if (h >= 120 && h < 180) {
		g = c;
		b = x;
	} else if (h >= 180 && h < 240) {
		g = x;
		b = c;
	} else if (h >= 240 && h < 300) {
		r = x;
		b = c;
	} else if (h >= 300 && h < 360) {
		r = c;
		b = x;
	}

	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255),
		a,
	};
}

/**
 * Get color value from HTML color name
 * @param {String} colorName - HTML color name
 * @returns color value eg.: { r: 255, g: 10, b: 126, a: 100 }
 */
const colorNameToRgb = (colorName: string): RGBAColor => {
	const colorMap: {[colorName: string]: RGBAColor} = {
		aliceblue: { r: 240, g: 248, b: 255, a: 100 },
		antiquewhite: { r: 250, g: 235, b: 215, a: 100 },
		aqua: { r: 0, g: 255, b: 255, a: 100 },
		aquamarine: { r: 127, g: 255, b: 212, a: 100 },
		azure: { r: 240, g: 255, b: 255, a: 100 },
		beige: { r: 245, g: 245, b: 220, a: 100 },
		bisque: { r: 255, g: 228, b: 196, a: 100 },
		black: { r: 0, g: 0, b: 0, a: 100 },
		blanchedalmond: { r: 255, g: 235, b: 205, a: 100 },
		blue: { r: 0, g: 0, b: 255, a: 100 },
		blueviolet: { r: 138, g: 43, b: 226, a: 100 },
		brown: { r: 165, g: 42, b: 42, a: 100 },
		burlywood: { r: 222, g: 184, b: 135, a: 100 },
		cadetblue: { r: 95, g: 158, b: 160, a: 100 },
		chartreuse: { r: 127, g: 255, b: 0, a: 100 },
		chocolate: { r: 210, g: 105, b: 30, a: 100 },
		coral: { r: 255, g: 127, b: 80, a: 100 },
		cornflowerblue: { r: 100, g: 149, b: 237, a: 100 },
		cornsilk: { r: 255, g: 248, b: 220, a: 100 },
		crimson: { r: 220, g: 20, b: 60, a: 100 },
		cyan: { r: 0, g: 255, b: 255, a: 100 },
		darkblue: { r: 0, g: 0, b: 139, a: 100 },
		darkcyan: { r: 0, g: 139, b: 139, a: 100 },
		darkgoldenrod: { r: 184, g: 134, b: 11, a: 100 },
		darkgray: { r: 169, g: 169, b: 169, a: 100 },
		darkgreen: { r: 0, g: 100, b: 0, a: 100 },
		darkkhaki: { r: 189, g: 183, b: 107, a: 100 },
		darkmagenta: { r: 139, g: 0, b: 139, a: 100 },
		darkolivegreen: { r: 85, g: 107, b: 47, a: 100 },
		darkorange: { r: 255, g: 140, b: 0, a: 100 },
		darkorchid: { r: 153, g: 50, b: 204, a: 100 },
		darkred: { r: 139, g: 0, b: 0, a: 100 },
		darksalmon: { r: 233, g: 150, b: 122, a: 100 },
		darkseagreen: { r: 143, g: 188, b: 139, a: 100 },
		darkslateblue: { r: 72, g: 61, b: 139, a: 100 },
		darkslategray: { r: 47, g: 79, b: 79, a: 100 },
		darkturquoise: { r: 0, g: 206, b: 209, a: 100 },
		darkviolet: { r: 148, g: 0, b: 211, a: 100 },
		deeppink: { r: 255, g: 20, b: 147, a: 100 },
		deepskyblue: { r: 0, g: 191, b: 255, a: 100 },
		dimgray: { r: 105, g: 105, b: 105, a: 100 },
		dodgerblue: { r: 30, g: 144, b: 255, a: 100 },
		firebrick: { r: 178, g: 34, b: 34, a: 100 },
		floralwhite: { r: 255, g: 250, b: 240, a: 100 },
		forestgreen: { r: 34, g: 139, b: 34, a: 100 },
		fuchsia: { r: 255, g: 0, b: 255, a: 100 },
		gainsboro: { r: 220, g: 220, b: 220, a: 100 },
		ghostwhite: { r: 248, g: 248, b: 255, a: 100 },
		gold: { r: 255, g: 215, b: 0, a: 100 },
		goldenrod: { r: 218, g: 165, b: 32, a: 100 },
		gray: { r: 128, g: 128, b: 128, a: 100 },
		green: { r: 0, g: 128, b: 0, a: 100 },
		greenyellow: { r: 173, g: 255, b: 47, a: 100 },
		honeydew: { r: 240, g: 255, b: 240, a: 100 },
		hotpink: { r: 255, g: 105, b: 180, a: 100 },
		indianred: { r: 205, g: 92, b: 92, a: 100 },
		indigo: { r: 75, g: 0, b: 130, a: 100 },
		ivory: { r: 255, g: 255, b: 240, a: 100 },
		khaki: { r: 240, g: 230, b: 140, a: 100 },
		lavender: { r: 230, g: 230, b: 250, a: 100 },
		lavenderblush: { r: 255, g: 240, b: 245, a: 100 },
		lawngreen: { r: 124, g: 252, b: 0, a: 100 },
		lemonchiffon: { r: 255, g: 250, b: 205, a: 100 },
		lightblue: { r: 173, g: 216, b: 230, a: 100 },
		lightcoral: { r: 240, g: 128, b: 128, a: 100 },
		lightcyan: { r: 224, g: 255, b: 255, a: 100 },
		lightgoldenrodyellow: { r: 250, g: 250, b: 210, a: 100 },
		lightgray: { r: 211, g: 211, b: 211, a: 100 },
		lightgreen: { r: 144, g: 238, b: 144, a: 100 },
		lightpink: { r: 255, g: 182, b: 193, a: 100 },
		lightsalmon: { r: 255, g: 160, b: 122, a: 100 },
		lightseagreen: { r: 32, g: 178, b: 170, a: 100 },
		lightskyblue: { r: 135, g: 206, b: 250, a: 100 },
		lightslategray: { r: 119, g: 136, b: 153, a: 100 },
		lightsteelblue: { r: 176, g: 196, b: 222, a: 100 },
		lightyellow: { r: 255, g: 255, b: 224, a: 100 },
		lime: { r: 0, g: 255, b: 0, a: 100 },
		limegreen: { r: 50, g: 205, b: 50, a: 100 },
		linen: { r: 250, g: 240, b: 230, a: 100 },
		magenta: { r: 255, g: 0, b: 255, a: 100 },
		maroon: { r: 128, g: 0, b: 0, a: 100 },
		mediumaquamarine: { r: 102, g: 205, b: 170, a: 100 },
		mediumblue: { r: 0, g: 0, b: 205, a: 100 },
		mediumorchid: { r: 186, g: 85, b: 211, a: 100 },
		mediumpurple: { r: 147, g: 112, b: 219, a: 100 },
		mediumseagreen: { r: 60, g: 179, b: 113, a: 100 },
		mediumslateblue: { r: 123, g: 104, b: 238, a: 100 },
		mediumspringgreen: { r: 0, g: 250, b: 154, a: 100 },
		mediumturquoise: { r: 72, g: 209, b: 204, a: 100 },
		mediumvioletred: { r: 199, g: 21, b: 133, a: 100 },
		midnightblue: { r: 25, g: 25, b: 112, a: 100 },
		mintcream: { r: 245, g: 255, b: 250, a: 100 },
		mistyrose: { r: 255, g: 228, b: 225, a: 100 },
		moccasin: { r: 255, g: 228, b: 181, a: 100 },
		navajowhite: { r: 255, g: 222, b: 173, a: 100 },
		navy: { r: 0, g: 0, b: 128, a: 100 },
		oldlace: { r: 253, g: 245, b: 230, a: 100 },
		olive: { r: 128, g: 128, b: 0, a: 100 },
		olivedrab: { r: 107, g: 142, b: 35, a: 100 },
		orange: { r: 255, g: 165, b: 0, a: 100 },
		orangered: { r: 255, g: 69, b: 0, a: 100 },
		orchid: { r: 218, g: 112, b: 214, a: 100 },
		palegoldenrod: { r: 238, g: 232, b: 170, a: 100 },
		palegreen: { r: 152, g: 251, b: 152, a: 100 },
		paleturquoise: { r: 175, g: 238, b: 238, a: 100 },
		palevioletred: { r: 219, g: 112, b: 147, a: 100 },
		papayawhip: { r: 255, g: 239, b: 213, a: 100 },
		peachpuff: { r: 255, g: 218, b: 185, a: 100 },
		peru: { r: 205, g: 133, b: 63, a: 100 },
		pink: { r: 255, g: 192, b: 203, a: 100 },
		plum: { r: 221, g: 160, b: 221, a: 100 },
		powderblue: { r: 176, g: 224, b: 230, a: 100 },
		purple: { r: 128, g: 0, b: 128, a: 100 },
		rebeccapurple: { r: 102, g: 51, b: 153, a: 100 },
		red: { r: 255, g: 0, b: 0, a: 100 },
		rosybrown: { r: 188, g: 143, b: 143, a: 100 },
		royalblue: { r: 65, g: 105, b: 225, a: 100 },
		saddlebrown: { r: 139, g: 69, b: 19, a: 100 },
		salmon: { r: 250, g: 128, b: 114, a: 100 },
		sandybrown: { r: 244, g: 164, b: 96, a: 100 },
		seagreen: { r: 46, g: 139, b: 87, a: 100 },
		seashell: { r: 255, g: 245, b: 238, a: 100 },
		sienna: { r: 160, g: 82, b: 45, a: 100 },
		silver: { r: 192, g: 192, b: 192, a: 100 },
		skyblue: { r: 135, g: 206, b: 235, a: 100 },
		slateblue: { r: 106, g: 90, b: 205, a: 100 },
		slategray: { r: 112, g: 128, b: 144, a: 100 },
		snow: { r: 255, g: 250, b: 250, a: 100 },
		springgreen: { r: 0, g: 255, b: 127, a: 100 },
		steelblue: { r: 70, g: 130, b: 180, a: 100 },
		tan: { r: 210, g: 180, b: 140, a: 100 },
		teal: { r: 0, g: 128, b: 128, a: 100 },
		thistle: { r: 216, g: 191, b: 216, a: 100 },
		tomato: { r: 255, g: 99, b: 71, a: 100 },
		turquoise: { r: 64, g: 224, b: 208, a: 100 },
		violet: { r: 238, g: 130, b: 238, a: 100 },
		wheat: { r: 245, g: 222, b: 179, a: 100 },
		white: { r: 255, g: 255, b: 255, a: 100 },
		whitesmoke: { r: 245, g: 245, b: 245, a: 100 },
		yellow: { r: 255, g: 255, b: 0, a: 100 },
		yellowgreen: { r: 154, g: 205, b: 50, a: 100 },
	};
	return colorName && colorMap[colorName.toLocaleLowerCase()] || { r: 0, g: 0, b: 0, a: 100 };
}

/**
 * Interpolates between two colors based on a numeric value.
 * @param {Number} value The numeric value to interpolate.
 * @param {Number} min The minimum value.
 * @param {Number} max The maximum value.
 * @param {String} minColor The color corresponding to the minimum value.
 * @param {String} maxColor The color corresponding to the maximum value.
 * @returns {String} The interpolated color as a string (RGB format).
 */
export const interpolateColor = (
	value: number,
	min: number,
	max: number,
	minColor: string,
	maxColor: string
): string => {
	if (max === min) {
		return minColor;
	}

	const normalized = (value - min) / (max - min);
	const minRgb = colorStringToRGBA(minColor);
	const maxRgb = colorStringToRGBA(maxColor);

	if (!minRgb || !maxRgb) {
		return minColor;
	}

	const r = Math.round(minRgb.r + (maxRgb.r - minRgb.r) * normalized);
	const g = Math.round(minRgb.g + (maxRgb.g - minRgb.g) * normalized);
	const b = Math.round(minRgb.b + (maxRgb.b - minRgb.b) * normalized);

	return `rgba(${r}, ${g}, ${b}, 1)`;
}

/**
 * Gets the text color for a given background color.
 * @param {String} bgColor The background color.
 * @returns {String} The text color.
 */
export const getTextColor = (bgColor: string): string => {
	const rgb = colorStringToRGBA(bgColor) || bgColor.match(/\d+/g);
	if (!rgb) {
		return "#fff";
	}

	const brightness = Array.isArray(rgb)
		? (Number.parseInt(rgb[0]) * 299 + Number.parseInt(rgb[1]) * 587 + Number.parseInt(rgb[2]) * 114) / 1000
		: (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

	return brightness > 155 ? "#333" : "#fff";
}
