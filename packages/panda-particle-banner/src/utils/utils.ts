// types
import { PandaParticleColor } from "../../index";

/**
 * Get random number between min and max value. Min value is set to 0 by default.
 * @param {Number} max - upper number limit
 * @param {Number} min - lower number limit, 0 by default
 * @param {Number} decimalPlaces - number precision [default: 2]
 * @returns Random integer between lower and upper number limit
 */
export const getRandomInt = (max: number, min: number = 0, decimalPlaces: number = 2): number => {
	const round = (num: number) => {
		const p = Math.pow(10, decimalPlaces);
		return Math.round(num * p) / p;
	}
	
	const randomInt = min + (Math.random() * (max - min));
	return round(randomInt);
};

/**
 * Validate provided value against min and max limits.
 * @param {Number} value - value to validate
 * @param {Number} min - min value
 * @param {Number} max - max value
 * @returns value between min and max. 
 */
export const minMax = (value: number, min: number, max: number): number => {
	if (value < min) {
		return min;
	} else if (value > max) {
		return max;
	} else {
		return value;
	}
};

export const validateColorHue = (hue: number): number => {
	// validate hue value
	if (hue < 0) {
		hue = 360 - hue;
	}
	if (hue > 360) {
		hue = hue - 360;
	}
	return hue;
};

/**
 * Get color value from HTML color name
 * @param {String} colorName - HTML color name
 * @returns color value eg.: { red: 255, green: 10, blue: 126 }
 */
const colorNameToRgb = (colorName: string): { red: number, green: number, blue: number } => {
	const colorMap: {[colorName: string]: { red: number, green: number, blue: number }} = {
		aliceblue: { red: 240, green: 248, blue: 255 },
		antiquewhite: { red: 250, green: 235, blue: 215 },
		aqua: { red: 0, green: 255, blue: 255 },
		aquamarine: { red: 127, green: 255, blue: 212 },
		azure: { red: 240, green: 255, blue: 255 },
		beige: { red: 245, green: 245, blue: 220 },
		bisque: { red: 255, green: 228, blue: 196 },
		black: { red: 0, green: 0, blue: 0 },
		blanchedalmond: { red: 255, green: 235, blue: 205 },
		blue: { red: 0, green: 0, blue: 255 },
		blueviolet: { red: 138, green: 43, blue: 226 },
		brown: { red: 165, green: 42, blue: 42 },
		burlywood: { red: 222, green: 184, blue: 135 },
		cadetblue: { red: 95, green: 158, blue: 160 },
		chartreuse: { red: 127, green: 255, blue: 0 },
		chocolate: { red: 210, green: 105, blue: 30 },
		coral: { red: 255, green: 127, blue: 80 },
		cornflowerblue: { red: 100, green: 149, blue: 237 },
		cornsilk: { red: 255, green: 248, blue: 220 },
		crimson: { red: 220, green: 20, blue: 60 },
		cyan: { red: 0, green: 255, blue: 255 },
		darkblue: { red: 0, green: 0, blue: 139 },
		darkcyan: { red: 0, green: 139, blue: 139 },
		darkgoldenrod: { red: 184, green: 134, blue: 11 },
		darkgray: { red: 169, green: 169, blue: 169 },
		darkgreen: { red: 0, green: 100, blue: 0 },
		darkkhaki: { red: 189, green: 183, blue: 107 },
		darkmagenta: { red: 139, green: 0, blue: 139 },
		darkolivegreen: { red: 85, green: 107, blue: 47 },
		darkorange: { red: 255, green: 140, blue: 0 },
		darkorchid: { red: 153, green: 50, blue: 204 },
		darkred: { red: 139, green: 0, blue: 0 },
		darksalmon: { red: 233, green: 150, blue: 122 },
		darkseagreen: { red: 143, green: 188, blue: 139 },
		darkslateblue: { red: 72, green: 61, blue: 139 },
		darkslategray: { red: 47, green: 79, blue: 79 },
		darkturquoise: { red: 0, green: 206, blue: 209 },
		darkviolet: { red: 148, green: 0, blue: 211 },
		deeppink: { red: 255, green: 20, blue: 147 },
		deepskyblue: { red: 0, green: 191, blue: 255 },
		dimgray: { red: 105, green: 105, blue: 105 },
		dodgerblue: { red: 30, green: 144, blue: 255 },
		firebrick: { red: 178, green: 34, blue: 34 },
		floralwhite: { red: 255, green: 250, blue: 240 },
		forestgreen: { red: 34, green: 139, blue: 34 },
		fuchsia: { red: 255, green: 0, blue: 255 },
		gainsboro: { red: 220, green: 220, blue: 220 },
		ghostwhite: { red: 248, green: 248, blue: 255 },
		gold: { red: 255, green: 215, blue: 0 },
		goldenrod: { red: 218, green: 165, blue: 32 },
		gray: { red: 128, green: 128, blue: 128 },
		green: { red: 0, green: 128, blue: 0 },
		greenyellow: { red: 173, green: 255, blue: 47 },
		honeydew: { red: 240, green: 255, blue: 240 },
		hotpink: { red: 255, green: 105, blue: 180 },
		indianred: { red: 205, green: 92, blue: 92 },
		indigo: { red: 75, green: 0, blue: 130 },
		ivory: { red: 255, green: 255, blue: 240 },
		khaki: { red: 240, green: 230, blue: 140 },
		lavender: { red: 230, green: 230, blue: 250 },
		lavenderblush: { red: 255, green: 240, blue: 245 },
		lawngreen: { red: 124, green: 252, blue: 0 },
		lemonchiffon: { red: 255, green: 250, blue: 205 },
		lightblue: { red: 173, green: 216, blue: 230 },
		lightcoral: { red: 240, green: 128, blue: 128 },
		lightcyan: { red: 224, green: 255, blue: 255 },
		lightgoldenrodyellow: { red: 250, green: 250, blue: 210 },
		lightgray: { red: 211, green: 211, blue: 211 },
		lightgreen: { red: 144, green: 238, blue: 144 },
		lightpink: { red: 255, green: 182, blue: 193 },
		lightsalmon: { red: 255, green: 160, blue: 122 },
		lightseagreen: { red: 32, green: 178, blue: 170 },
		lightskyblue: { red: 135, green: 206, blue: 250 },
		lightslategray: { red: 119, green: 136, blue: 153 },
		lightsteelblue: { red: 176, green: 196, blue: 222 },
		lightyellow: { red: 255, green: 255, blue: 224 },
		lime: { red: 0, green: 255, blue: 0 },
		limegreen: { red: 50, green: 205, blue: 50 },
		linen: { red: 250, green: 240, blue: 230 },
		magenta: { red: 255, green: 0, blue: 255 },
		maroon: { red: 128, green: 0, blue: 0 },
		mediumaquamarine: { red: 102, green: 205, blue: 170 },
		mediumblue: { red: 0, green: 0, blue: 205 },
		mediumorchid: { red: 186, green: 85, blue: 211 },
		mediumpurple: { red: 147, green: 112, blue: 219 },
		mediumseagreen: { red: 60, green: 179, blue: 113 },
		mediumslateblue: { red: 123, green: 104, blue: 238 },
		mediumspringgreen: { red: 0, green: 250, blue: 154 },
		mediumturquoise: { red: 72, green: 209, blue: 204 },
		mediumvioletred: { red: 199, green: 21, blue: 133 },
		midnightblue: { red: 25, green: 25, blue: 112 },
		mintcream: { red: 245, green: 255, blue: 250 },
		mistyrose: { red: 255, green: 228, blue: 225 },
		moccasin: { red: 255, green: 228, blue: 181 },
		navajowhite: { red: 255, green: 222, blue: 173 },
		navy: { red: 0, green: 0, blue: 128 },
		oldlace: { red: 253, green: 245, blue: 230 },
		olive: { red: 128, green: 128, blue: 0 },
		olivedrab: { red: 107, green: 142, blue: 35 },
		orange: { red: 255, green: 165, blue: 0 },
		orangered: { red: 255, green: 69, blue: 0 },
		orchid: { red: 218, green: 112, blue: 214 },
		palegoldenrod: { red: 238, green: 232, blue: 170 },
		palegreen: { red: 152, green: 251, blue: 152 },
		paleturquoise: { red: 175, green: 238, blue: 238 },
		palevioletred: { red: 219, green: 112, blue: 147 },
		papayawhip: { red: 255, green: 239, blue: 213 },
		peachpuff: { red: 255, green: 218, blue: 185 },
		peru: { red: 205, green: 133, blue: 63 },
		pink: { red: 255, green: 192, blue: 203 },
		plum: { red: 221, green: 160, blue: 221 },
		powderblue: { red: 176, green: 224, blue: 230 },
		purple: { red: 128, green: 0, blue: 128 },
		rebeccapurple: { red: 102, green: 51, blue: 153 },
		red: { red: 255, green: 0, blue: 0 },
		rosybrown: { red: 188, green: 143, blue: 143 },
		royalblue: { red: 65, green: 105, blue: 225 },
		saddlebrown: { red: 139, green: 69, blue: 19 },
		salmon: { red: 250, green: 128, blue: 114 },
		sandybrown: { red: 244, green: 164, blue: 96 },
		seagreen: { red: 46, green: 139, blue: 87 },
		seashell: { red: 255, green: 245, blue: 238 },
		sienna: { red: 160, green: 82, blue: 45 },
		silver: { red: 192, green: 192, blue: 192 },
		skyblue: { red: 135, green: 206, blue: 235 },
		slateblue: { red: 106, green: 90, blue: 205 },
		slategray: { red: 112, green: 128, blue: 144 },
		snow: { red: 255, green: 250, blue: 250 },
		springgreen: { red: 0, green: 255, blue: 127 },
		steelblue: { red: 70, green: 130, blue: 180 },
		tan: { red: 210, green: 180, blue: 140 },
		teal: { red: 0, green: 128, blue: 128 },
		thistle: { red: 216, green: 191, blue: 216 },
		tomato: { red: 255, green: 99, blue: 71 },
		turquoise: { red: 64, green: 224, blue: 208 },
		violet: { red: 238, green: 130, blue: 238 },
		wheat: { red: 245, green: 222, blue: 179 },
		white: { red: 255, green: 255, blue: 255 },
		whitesmoke: { red: 245, green: 245, blue: 245 },
		yellow: { red: 255, green: 255, blue: 0 },
		yellowgreen: { red: 154, green: 205, blue: 50 },
	};
	return colorName && colorMap[colorName.toLocaleLowerCase()] || { red: 0, green: 0, blue: 0 };
};

/**
 * Convert percentage or decimal value of alpha to number
 * @param {String} alpha - alpha value
 * @returns {Number} numeric value of alpha [0-100] [default: 100]
 */
const parseAlphaValue = (alpha: string | null | undefined): number => {
	if (alpha === null || alpha === undefined) {
		return 100;
	}
	// parse alpha value
	if (alpha.includes("%")) {
		// handle percentage value case
		const match = alpha.match(/^(\d+)/);
		return match !== null ? Number(match[0]) : 100;
	} else {
		// handle decimal value case
		return Math.round(Number(alpha) * 100);
	}
}

const rgbToHsl = (red: number, green: number, blue: number): PandaParticleColor => {
	// Normalize RGB values to the range [0, 1]
	const normalizedR = red / 255;
	const normalizedG = green / 255;
	const normalizedB = blue / 255;

	// Find the minimum and maximum values among the normalized RGB components
	const cmin = Math.min(normalizedR, normalizedG, normalizedB);
	const cmax = Math.max(normalizedR, normalizedG, normalizedB);
	const delta = cmax - cmin;

	// Calculate lightness
	const lightness = (cmax + cmin) / 2;

	// Calculate saturation
	const saturation = delta === 0
		? 0
		: delta / (1 - Math.abs(2 * lightness - 1));

	// Calculate hue
	let hue = 0;
	if (delta !== 0) {
		if (cmax === normalizedR) {
			hue = ((normalizedG - normalizedB) / delta + 6) % 6;
		} else if (cmax === normalizedG) {
			hue = ((normalizedB - normalizedR) / delta + 2) % 6;
		} else {
			hue = ((normalizedR - normalizedG) / delta + 4) % 6;
		}
	}

	// Convert hue to degrees
	hue = Math.round(hue * 60);

	return {
		hue,
		saturation: Math.round(saturation * 100),
		lightness: Math.round(lightness * 100),
		alpha: 100,
	};
};

/**
 * Converts any color string or color name to HSLA color values 
 * @param {String} color - color string or color name
 * @returns color values in HSL format
 */
export const parseColorString = (color: string): PandaParticleColor => {
	let hlsFormat = false;
	let red = 0;
	let green = 0;
	let blue = 0;
	let alpha = 100;

	let hue = 0;
	let saturation = 0;
	let lightness = 0;

	// validate color
	if (color !== null && color !== undefined && typeof color === "string") {
		if (color.includes("hsl")) {
			hlsFormat = true;
			let match = color.match(/^hsl\((\d+)(?:deg)?(?:,)?\s*([\d.]+)%(?:,)?\s*([\d.]+)%\s*(?:[,\/])?\s*([0-9.\%]+)?\)$/);

			if (match !== null) {
				hue = Number(match[1]);
				saturation = Number(match[2]);
				lightness = Number(match[3]);
				alpha = parseAlphaValue(match[4]);
			} else {
				console.warn("%c ✨ [PANDA PARTICLE BANNER] invalid color value!", "font-size: 16px;", color);
			}

		} else if (color.includes("rgb")) {
			let match = color.match(/^rgb(?:a)?\((\d+)(?:,)?\s*(\d+)(?:,)?\s*(\d+)\s*(?:[,\/])?\s*([0-9.\%]+)?\)$/);

			if (match !== null) {
				red = Number(match[1]);
				green = Number(match[2]);
				blue = Number(match[3]);
				alpha = parseAlphaValue(match[4]);
			} else {
				console.warn("%c ✨ [PANDA PARTICLE BANNER] invalid color value!", "font-size: 16px;", color);
			}

		} else if (color.includes("#")) {
			color = color.replace(/#/g, "");

			if (color.length === 3) {
				// handle hex short format eg. #fff
				red = parseInt(color.substring(0, 1).repeat(2), 16);
				green = parseInt(color.substring(1, 2).repeat(2), 16);
				blue = parseInt(color.substring(2, 3).repeat(2), 16);
			} else if (color.length === 4) {
				// handle hex short format with alpha channel eg. #fffc
				red = parseInt(color.substring(0, 1).repeat(2), 16);
				green = parseInt(color.substring(1, 2).repeat(2), 16);
				blue = parseInt(color.substring(2, 3).repeat(2), 16);
				alpha = parseInt(color.substring(3, 4).repeat(2), 16);
				alpha = Math.round(alpha * 100 / 255);
			} else if (color.length === 6) {
				// handle hex long format eg. #ffffff
				red = parseInt(color.substring(0, 2), 16);
				green = parseInt(color.substring(2, 4), 16);
				blue = parseInt(color.substring(4, 6), 16);
			} else if (color.length === 8) {
				// handle hex long format with alpha channel eg. #ffffffcc
				red = parseInt(color.substring(0, 2), 16);
				green = parseInt(color.substring(2, 4), 16);
				blue = parseInt(color.substring(4, 6), 16);
				alpha = parseInt(color.substring(6, 8), 16);
				alpha = Math.round(alpha * 100 / 255);
			} else {
				console.warn("%c ✨ [PANDA PARTICLE BANNER] invalid color value!", "font-size: 16px;", color);
			}

		} else if (color.match(/^[a-zA-Z]{3,}$/)) {
			({ red, green, blue } = colorNameToRgb(color));
		}

		if (!hlsFormat) {
			({ hue, saturation, lightness } = rgbToHsl(red, green, blue));
		}

		return {
			hue,
			saturation,
			lightness,
			alpha,
		};
	} else {
		return {
			hue: 0,
			saturation: 0,
			lightness: 0,
			alpha: 100,
		};
	}
};

/**
 * Get HSL color string from Panda Particle color object
 * @param {PandaParticleColor} color - panda particle color object
 * @returns {String} color string in hls format
 */
export const getHslColorString = (color: PandaParticleColor): string => {
	const {
		hue = 0,
		saturation = 0,
		lightness = 0,
		alpha = 100
	} = color;
	return `hsl(${hue}deg ${saturation}% ${lightness}% / ${alpha}%)`;
};

export const limitCheck = (value: number, limit: number | null): number => {
	if (limit === null || limit === undefined) {
		return value;
	}

	let _limit = Math.abs(limit);

	if (value > 0 && value > _limit) {
		return _limit;
	} else if (value < 0 && value < -_limit) {
		return -_limit
	} else {
		return value;
	}
};