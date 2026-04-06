import {
	rgbStringToRGBA,
	colorStringToRGBA,
	hexToRGBA,
	hslStringToRGBA,
	hslToRGB,
	colorNameToRgb,
	interpolateColor,
	getTextColorClass,
	getI18nConfig,
} from "../src/utils/utils";
import { expect, describe, it } from "vitest";

describe("Utils", () => {
	describe("rgbStringToRGBA", () => {

		// ====================================================
		// rgb() format
		// ====================================================

		it("should parse a basic rgb() string", () => {
			expect(rgbStringToRGBA("rgb(255, 0, 0)")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should parse rgb() with green", () => {
			expect(rgbStringToRGBA("rgb(0, 255, 0)")).toEqual({ r: 0, g: 255, b: 0, a: 100 });
		});

		it("should parse rgb() with blue", () => {
			expect(rgbStringToRGBA("rgb(0, 0, 255)")).toEqual({ r: 0, g: 0, b: 255, a: 100 });
		});

		it("should parse rgb() with all zeros (black)", () => {
			expect(rgbStringToRGBA("rgb(0, 0, 0)")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should parse rgb() with all max values (white)", () => {
			expect(rgbStringToRGBA("rgb(255, 255, 255)")).toEqual({ r: 255, g: 255, b: 255, a: 100 });
		});

		it("should parse rgb() with arbitrary mid-range values", () => {
			expect(rgbStringToRGBA("rgb(100, 149, 237)")).toEqual({ r: 100, g: 149, b: 237, a: 100 });
		});

		it("should default alpha to 100 when no alpha channel is given", () => {
			const result = rgbStringToRGBA("rgb(10, 20, 30)");
			expect(result.a).toBe(100);
		});

		// ====================================================
		// rgba() format
		// ====================================================

		it("should parse rgba() with full opacity (alpha = 1)", () => {
			expect(rgbStringToRGBA("rgba(255, 128, 0, 1)")).toEqual({ r: 255, g: 128, b: 0, a: 100 });
		});

		it("should parse rgba() with half opacity (alpha = 0.5)", () => {
			expect(rgbStringToRGBA("rgba(255, 128, 0, 0.5)")).toEqual({ r: 255, g: 128, b: 0, a: 50 });
		});

		it("should parse rgba() with zero opacity (alpha = 0)", () => {
			expect(rgbStringToRGBA("rgba(255, 128, 0, 0)")).toEqual({ r: 255, g: 128, b: 0, a: 0 });
		});

		it("should parse rgba() with alpha = 0.25 and round correctly", () => {
			expect(rgbStringToRGBA("rgba(0, 0, 0, 0.25)")).toEqual({ r: 0, g: 0, b: 0, a: 25 });
		});

		it("should parse rgba() with alpha = 0.75 and round correctly", () => {
			expect(rgbStringToRGBA("rgba(0, 0, 0, 0.75)")).toEqual({ r: 0, g: 0, b: 0, a: 75 });
		});

		it("should round alpha percentage correctly for fractional values", () => {
			// 0.333 * 100 = 33.3 -> rounds to 33
			const result = rgbStringToRGBA("rgba(0, 0, 0, 0.333)");
			expect(result.a).toBe(33);
		});

		// ====================================================
		// Whitespace handling
		// ====================================================

		it("should handle values with extra spaces", () => {
			expect(rgbStringToRGBA("rgb( 10 , 20 , 30 )")).toEqual({ r: 10, g: 20, b: 30, a: 100 });
		});

		it("should handle rgba() with extra spaces around alpha", () => {
			expect(rgbStringToRGBA("rgba( 255 , 0 , 0 , 0.5 )")).toEqual({ r: 255, g: 0, b: 0, a: 50 });
		});

		// ====================================================
		// Invalid / fallback behavior
		// ====================================================

		it("should return fallback color for an empty string", () => {
			expect(rgbStringToRGBA("")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should return fallback color for a non-rgb string", () => {
			expect(rgbStringToRGBA("not-a-color")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should return fallback color for a hex string", () => {
			expect(rgbStringToRGBA("#ff0000")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should return fallback color for rgb() with empty parentheses", () => {
			// regex requires at least one character inside parentheses
			expect(rgbStringToRGBA("rgb()")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should return fallback color for just the prefix with no parentheses", () => {
			expect(rgbStringToRGBA("rgb")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});
	});

	describe("colorStringToRGBA", () => {

		// ====================================================
		// Falsy / empty input
		// ====================================================

		it("should return fallback color for an empty string", () => {
			expect(colorStringToRGBA("")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should return fallback color for a whitespace-only string", () => {
			// whitespace trims to empty string which falls to colorNameToRgb with no match
			expect(colorStringToRGBA("   ")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		// ====================================================
		// Hex format
		// ====================================================

		it("should parse a 3-digit hex color (#RGB)", () => {
			expect(colorStringToRGBA("#f00")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should parse a 6-digit hex color (#RRGGBB)", () => {
			expect(colorStringToRGBA("#ff0000")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should parse a 6-digit hex color for blue", () => {
			expect(colorStringToRGBA("#0000ff")).toEqual({ r: 0, g: 0, b: 255, a: 100 });
		});

		it("should parse a 6-digit hex color for white", () => {
			expect(colorStringToRGBA("#ffffff")).toEqual({ r: 255, g: 255, b: 255, a: 100 });
		});

		it("should parse a 6-digit hex color for black", () => {
			expect(colorStringToRGBA("#000000")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should parse an 8-digit hex color with alpha (#RRGGBBAA)", () => {
			// 0x80 / 255 * 100 = 50.196... → rounds to 50
			expect(colorStringToRGBA("#ff000080")).toEqual({ r: 255, g: 0, b: 0, a: 50 });
		});

		it("should parse a 4-digit hex color with alpha (#RGBA)", () => {
			// #f008 → r:255 g:0 b:0 a: round((0x88/255)*100) = round(53.33) = 53
			expect(colorStringToRGBA("#f008")).toEqual({ r: 255, g: 0, b: 0, a: 53 });
		});

		it("should trim surrounding whitespace before parsing a hex color", () => {
			expect(colorStringToRGBA("  #ff0000  ")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		// ====================================================
		// rgb / rgba format
		// ====================================================

		it("should parse an rgb() string", () => {
			expect(colorStringToRGBA("rgb(0, 128, 255)")).toEqual({ r: 0, g: 128, b: 255, a: 100 });
		});

		it("should parse an rgba() string with fractional alpha", () => {
			expect(colorStringToRGBA("rgba(0, 128, 255, 0.5)")).toEqual({ r: 0, g: 128, b: 255, a: 50 });
		});

		// ====================================================
		// hsl / hsla format
		// ====================================================

		it("should parse an hsl() string for red (hsl(0, 100%, 50%))", () => {
			expect(colorStringToRGBA("hsl(0, 100%, 50%)")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should parse an hsl() string for green (hsl(120, 100%, 50%))", () => {
			expect(colorStringToRGBA("hsl(120, 100%, 50%)")).toEqual({ r: 0, g: 255, b: 0, a: 100 });
		});

		it("should parse an hsl() string for blue (hsl(240, 100%, 50%))", () => {
			expect(colorStringToRGBA("hsl(240, 100%, 50%)")).toEqual({ r: 0, g: 0, b: 255, a: 100 });
		});

		it("should parse an hsl() string for white (hsl(0, 0%, 100%))", () => {
			expect(colorStringToRGBA("hsl(0, 0%, 100%)")).toEqual({ r: 255, g: 255, b: 255, a: 100 });
		});

		it("should parse an hsla() string with alpha", () => {
			expect(colorStringToRGBA("hsl(0, 100%, 50%, 50%)")).toEqual({ r: 255, g: 0, b: 0, a: 50 });
		});

		// ====================================================
		// Named colors
		// ====================================================

		it("should parse the named color 'red'", () => {
			expect(colorStringToRGBA("red")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should parse the named color 'blue'", () => {
			expect(colorStringToRGBA("blue")).toEqual({ r: 0, g: 0, b: 255, a: 100 });
		});

		it("should parse the named color 'white'", () => {
			expect(colorStringToRGBA("white")).toEqual({ r: 255, g: 255, b: 255, a: 100 });
		});

		it("should parse the named color 'black'", () => {
			expect(colorStringToRGBA("black")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should parse named colors case-insensitively", () => {
			expect(colorStringToRGBA("RED")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should return fallback for an unknown named color", () => {
			expect(colorStringToRGBA("notacolor")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});
	});

	// ========================================================

	describe("getI18nConfig", () => {

		it("should return the default noDataText", () => {
			expect(getI18nConfig().noDataText).toBe("No data available");
		});

		it("should return the default loadingText", () => {
			expect(getI18nConfig().loadingText).toBe("Loading...");
		});

		it("should return a new object on each call", () => {
			expect(getI18nConfig()).not.toBe(getI18nConfig());
		});
	});

	// ========================================================

	describe("hexToRGBA", () => {

		// ====================================================
		// 3-digit (#RGB)
		// ====================================================

		it("should parse a 3-digit hex string without #", () => {
			expect(hexToRGBA("f00")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should parse a 3-digit hex string with #", () => {
			expect(hexToRGBA("#0f0")).toEqual({ r: 0, g: 255, b: 0, a: 100 });
		});

		// ====================================================
		// 4-digit (#RGBA)
		// ====================================================

		it("should parse a 4-digit hex string with alpha", () => {
			// #f00f → r:255, g:0, b:0, a: round((0xff/255)*100) = 100
			expect(hexToRGBA("#f00f")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should parse a 4-digit hex string with half-alpha", () => {
			// #f008 → a: round((0x88/255)*100) = round(53.33) = 53
			expect(hexToRGBA("#f008")).toEqual({ r: 255, g: 0, b: 0, a: 53 });
		});

		// ====================================================
		// 6-digit (#RRGGBB)
		// ====================================================

		it("should parse a 6-digit hex string for red", () => {
			expect(hexToRGBA("#ff0000")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should parse a 6-digit hex string for green", () => {
			expect(hexToRGBA("#00ff00")).toEqual({ r: 0, g: 255, b: 0, a: 100 });
		});

		it("should parse a 6-digit hex string for blue", () => {
			expect(hexToRGBA("#0000ff")).toEqual({ r: 0, g: 0, b: 255, a: 100 });
		});

		it("should parse a 6-digit hex string for black", () => {
			expect(hexToRGBA("#000000")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should parse a 6-digit hex string for white", () => {
			expect(hexToRGBA("#ffffff")).toEqual({ r: 255, g: 255, b: 255, a: 100 });
		});

		it("should parse a mixed-value 6-digit hex string", () => {
			expect(hexToRGBA("#1a2b3c")).toEqual({ r: 26, g: 43, b: 60, a: 100 });
		});

		// ====================================================
		// 8-digit (#RRGGBBAA)
		// ====================================================

		it("should parse an 8-digit hex string with full alpha", () => {
			expect(hexToRGBA("#ff0000ff")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should parse an 8-digit hex string with half alpha", () => {
			// 0x80 / 255 * 100 = 50.196... → rounds to 50
			expect(hexToRGBA("#ff000080")).toEqual({ r: 255, g: 0, b: 0, a: 50 });
		});

		it("should parse an 8-digit hex string with zero alpha", () => {
			expect(hexToRGBA("#ff000000")).toEqual({ r: 255, g: 0, b: 0, a: 0 });
		});

		// ====================================================
		// Unrecognised length fallback
		// ====================================================

		it("should return zero-color for an unrecognised hex length", () => {
			expect(hexToRGBA("#fffff")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});
	});

	// ========================================================

	describe("hslStringToRGBA", () => {

		it("should parse hsl(0, 100%, 50%) as red", () => {
			expect(hslStringToRGBA("hsl(0, 100%, 50%)")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should parse hsl(120, 100%, 50%) as green", () => {
			expect(hslStringToRGBA("hsl(120, 100%, 50%)")).toEqual({ r: 0, g: 255, b: 0, a: 100 });
		});

		it("should parse hsl(240, 100%, 50%) as blue", () => {
			expect(hslStringToRGBA("hsl(240, 100%, 50%)")).toEqual({ r: 0, g: 0, b: 255, a: 100 });
		});

		it("should parse hsl(0, 0%, 0%) as black", () => {
			expect(hslStringToRGBA("hsl(0, 0%, 0%)")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should parse hsl(0, 0%, 100%) as white", () => {
			expect(hslStringToRGBA("hsl(0, 0%, 100%)")).toEqual({ r: 255, g: 255, b: 255, a: 100 });
		});

		it("should default alpha to 100 when not provided", () => {
			expect(hslStringToRGBA("hsl(0, 100%, 50%)").a).toBe(100);
		});

		it("should parse hsl with alpha as a percentage", () => {
			expect(hslStringToRGBA("hsl(0, 100%, 50%, 50%)")).toEqual({ r: 255, g: 0, b: 0, a: 50 });
		});

		it("should return fallback for an invalid hsl string", () => {
			expect(hslStringToRGBA("hsl(invalid)")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should return fallback for an empty string", () => {
			expect(hslStringToRGBA("")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});
	});

	// ========================================================

	describe("hslToRGB", () => {

		it("should convert hue 0° (red) correctly", () => {
			expect(hslToRGB(0, 100, 50, 100)).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should convert hue 60° (yellow) correctly", () => {
			expect(hslToRGB(60, 100, 50, 100)).toEqual({ r: 255, g: 255, b: 0, a: 100 });
		});

		it("should convert hue 120° (green) correctly", () => {
			expect(hslToRGB(120, 100, 50, 100)).toEqual({ r: 0, g: 255, b: 0, a: 100 });
		});

		it("should convert hue 180° (cyan) correctly", () => {
			expect(hslToRGB(180, 100, 50, 100)).toEqual({ r: 0, g: 255, b: 255, a: 100 });
		});

		it("should convert hue 240° (blue) correctly", () => {
			expect(hslToRGB(240, 100, 50, 100)).toEqual({ r: 0, g: 0, b: 255, a: 100 });
		});

		it("should convert hue 300° (magenta) correctly", () => {
			expect(hslToRGB(300, 100, 50, 100)).toEqual({ r: 255, g: 0, b: 255, a: 100 });
		});

		it("should convert hue 350° (pink) correctly", () => {
			expect(hslToRGB(350, 100, 88, 100)).toEqual({ r: 255, g: 194, b: 204, a: 100 });
		});

		it("should convert black (0, 0, 0) correctly", () => {
			expect(hslToRGB(0, 0, 0, 100)).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should convert white (0, 0, 100) correctly", () => {
			expect(hslToRGB(0, 0, 100, 100)).toEqual({ r: 255, g: 255, b: 255, a: 100 });
		});

		it("should pass alpha through unchanged", () => {
			expect(hslToRGB(0, 100, 50, 42).a).toBe(42);
		});
	});

	// ========================================================

	describe("colorNameToRgb", () => {

		it("should return the correct color for 'red'", () => {
			expect(colorNameToRgb("red")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
		});

		it("should return the correct color for 'blue'", () => {
			expect(colorNameToRgb("blue")).toEqual({ r: 0, g: 0, b: 255, a: 100 });
		});

		it("should return the correct color for 'white'", () => {
			expect(colorNameToRgb("white")).toEqual({ r: 255, g: 255, b: 255, a: 100 });
		});

		it("should return the correct color for 'black'", () => {
			expect(colorNameToRgb("black")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should be case-insensitive", () => {
			expect(colorNameToRgb("RED")).toEqual({ r: 255, g: 0, b: 0, a: 100 });
			expect(colorNameToRgb("Blue")).toEqual({ r: 0, g: 0, b: 255, a: 100 });
		});

		it("should return the correct color for 'cornflowerblue'", () => {
			expect(colorNameToRgb("cornflowerblue")).toEqual({ r: 100, g: 149, b: 237, a: 100 });
		});

		it("should return fallback for an unknown color name", () => {
			expect(colorNameToRgb("notacolor")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});

		it("should return fallback for an empty string", () => {
			expect(colorNameToRgb("")).toEqual({ r: 0, g: 0, b: 0, a: 100 });
		});
	});

	// ========================================================

	describe("interpolateColor", () => {

		it("should return minColor when max === min", () => {
			expect(interpolateColor(50, 0, 0, "rgb(0, 0, 0)", "rgb(255, 255, 255)")).toBe("rgb(0, 0, 0)");
		});

		it("should return minColor RGB equivalent when value === min", () => {
			expect(interpolateColor(0, 0, 100, "rgb(0, 0, 0)", "rgb(200, 100, 50)")).toBe("rgb(0, 0, 0)");
		});

		it("should return maxColor RGB equivalent when value === max", () => {
			expect(interpolateColor(100, 0, 100, "rgb(0, 0, 0)", "rgb(200, 100, 50)")).toBe("rgb(200, 100, 50)");
		});

		it("should interpolate correctly at the midpoint", () => {
			// normalized = 0.5 → r=100, g=50, b=25
			expect(interpolateColor(50, 0, 100, "rgb(0, 0, 0)", "rgb(200, 100, 50)")).toBe("rgb(100, 50, 25)");
		});

		it("should interpolate correctly at one quarter", () => {
			// normalized = 0.25 → r=50, g=25, b=12 (round(12.5)=13 in some envs - use round)
			const result = interpolateColor(25, 0, 100, "rgb(0, 0, 0)", "rgb(200, 100, 50)");
			expect(result).toBe(`rgb(${Math.round(50)}, ${Math.round(25)}, ${Math.round(12.5)})`);
		});

		it("should work with named colors as input", () => {
			// black → white midpoint → rgb(128, 128, 128)
			const result = interpolateColor(50, 0, 100, "black", "white");
			expect(result).toBe("rgb(128, 128, 128)");
		});

		it("should work with hex colors as input", () => {
			const result = interpolateColor(50, 0, 100, "#000000", "#ffffff");
			expect(result).toBe("rgb(128, 128, 128)");
		});
	});

	// ========================================================

	describe("getTextColorClass", () => {

		it("should return 'dark' for a white background", () => {
			// brightness = (255*299 + 255*587 + 255*114) / 1000 = 255 > 155
			expect(getTextColorClass("white")).toBe("dark");
		});

		it("should return 'light' for a black background", () => {
			expect(getTextColorClass("black")).toBe("light");
		});

		it("should return 'dark' for a bright yellow background", () => {
			// yellow = rgb(255, 255, 0) → (255*299 + 255*587 + 0) / 1000 = 220.74 > 155
			expect(getTextColorClass("yellow")).toBe("dark");
		});

		it("should return 'light' for a dark navy background", () => {
			// navy = rgb(0, 0, 128) → (0 + 0 + 128*114) / 1000 = 14.59 < 155
			expect(getTextColorClass("navy")).toBe("light");
		});

		it("should return 'light' for a dark red background", () => {
			// darkred = rgb(139, 0, 0) → (139*299) / 1000 = 41.56 < 155
			expect(getTextColorClass("darkred")).toBe("light");
		});

		it("should return 'dark' for a light pink background", () => {
			// lightpink = rgb(255, 182, 193) → (255*299 + 182*587 + 193*114) / 1000
			// = (76245 + 106834 + 22002) / 1000 = 205.08 > 155
			expect(getTextColorClass("lightpink")).toBe("dark");
		});

		it("should return 'dark' for an rgb() string with high brightness", () => {
			expect(getTextColorClass("rgb(255, 255, 255)")).toBe("dark");
		});

		it("should return 'light' for an rgb() string with low brightness", () => {
			expect(getTextColorClass("rgb(10, 10, 10)")).toBe("light");
		});
	});
});
