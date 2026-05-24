// utils
import { expect, describe, it } from "vitest";

// Import the functions to be tested
import {
	getFormatFromViews,
	formatValue,
	isValueObjectComplete,
	getEmptyTimeObject,
	parseTimeValue,
	parseTimePeriod,
	getI18nConfig,
	validKeyInput,
	arraysEqual,
	validateTimeObject,
	parseViewsFromAttribute,
	parseViewFromString,
	parseStepFromValue,
} from "../src/utils/utils";

// ====================================================================================================================
// getFormatFromViews
// ====================================================================================================================

describe("getFormatFromViews", () => {
	it("should return 'HH:MM AA' when views is empty and timeFormat is '12'", () => {
		expect(getFormatFromViews([], "12")).toBe("HH:MM AA");
	});

	it("should return 'HH:MM' when views is empty and timeFormat is '24'", () => {
		expect(getFormatFromViews([], "24")).toBe("HH:MM");
	});

	it("should return 'HH:MM AA' for hours + minutes in 12h format", () => {
		expect(getFormatFromViews(["hours", "minutes"], "12")).toBe("HH:MM AA");
	});

	it("should return 'HH:MM' for hours + minutes in 24h format", () => {
		expect(getFormatFromViews(["hours", "minutes"], "24")).toBe("HH:MM");
	});

	it("should return 'HH:MM:SS AA' for hours + minutes + seconds in 12h format", () => {
		expect(getFormatFromViews(["hours", "minutes", "seconds"], "12")).toBe("HH:MM:SS AA");
	});

	it("should return 'HH:MM:SS' for hours + minutes + seconds in 24h format", () => {
		expect(getFormatFromViews(["hours", "minutes", "seconds"], "24")).toBe("HH:MM:SS");
	});

	it("should return only 'MM' when only minutes view is provided", () => {
		expect(getFormatFromViews(["minutes"], "12")).toBe("MM");
	});

	it("should return 'MM:SS' when only minutes and seconds views are provided", () => {
		expect(getFormatFromViews(["minutes", "seconds"], "24")).toBe("MM:SS");
	});

	it("should return 'HH AA' when only hours view is provided in 12h format", () => {
		expect(getFormatFromViews(["hours"], "12")).toBe("HH AA");
	});

	it("should return 'HH' when only hours view is provided in 24h format", () => {
		expect(getFormatFromViews(["hours"], "24")).toBe("HH");
	});
});

// ====================================================================================================================
// formatValue
// ====================================================================================================================

describe("formatValue", () => {
	const allViews = ["hours", "minutes", "seconds"];

	it("should format a complete time object in 12h format", () => {
		const obj = { hours: 3, minutes: 5, seconds: 9, period: "pm" as const };
		expect(formatValue(obj, "HH:MM:SS AA", allViews, "12")).toBe("03:05:09 PM");
	});

	it("should format a complete time object in 24h format", () => {
		const obj = { hours: 14, minutes: 30, seconds: 0, period: null };
		expect(formatValue(obj, "HH:MM:SS", allViews, "24")).toBe("14:30:00");
	});

	it("should use placeholder tokens for null fields", () => {
		const obj = { hours: null, minutes: null, seconds: null, period: null };
		expect(formatValue(obj, "HH:MM:SS AA", allViews, "12")).toBe("00:00:00");
	});

	it("should derive format from views when format is null", () => {
		const obj = { hours: 10, minutes: 20, seconds: null, period: "am" as const };
		// null format -> getFormatFromViews(["hours","minutes"], "12") -> "HH:MM AA"
		expect(formatValue(obj, null as any, ["hours", "minutes"], "12")).toBe("10:20 AM");
	});

	it("should derive format from views when format is an empty string", () => {
		const obj = { hours: 10, minutes: 20, seconds: null, period: "am" as const };
		// empty string format -> getFormatFromViews(["hours","minutes"], "12") -> "HH:MM AA"
		expect(formatValue(obj, "" as any, ["hours", "minutes"], "12")).toBe("10:20 AM");
	});

	it("should derive format from views when format is an untrimmed empty string", () => {
		const obj = { hours: 10, minutes: 20, seconds: null, period: "am" as const };
		// untrimmed empty string format -> getFormatFromViews(["hours","minutes"], "12") -> "HH:MM AA"
		expect(formatValue(obj, "   " as any, ["hours", "minutes"], "12")).toBe("10:20 AM");
	});

	it("should leave 00 token when seconds view is not included", () => {
		const obj = { hours: 1, minutes: 2, seconds: 3, period: "am" as const };
		expect(formatValue(obj, "HH:MM:SS AA", ["hours", "minutes"], "12")).toBe("01:02:00 AM");
	});

	it("should leave 00 token when hours view is not included", () => {
		const obj = { hours: 1, minutes: 5, seconds: 0, period: null };
		expect(formatValue(obj, "HH:MM", ["minutes"], "24")).toBe("00:05");
	});

	it("should pad single-digit values with leading zeros", () => {
		const obj = { hours: 1, minutes: 2, seconds: 3, period: "am" as const };
		expect(formatValue(obj, "HH:MM:SS AA", allViews, "12")).toBe("01:02:03 AM");
	});
});

// ====================================================================================================================
// isValueObjectComplete
// ====================================================================================================================

describe("isValueObjectComplete", () => {
	it("should return true for a fully populated object in 12h format", () => {
		const obj = { hours: 3, minutes: 30, seconds: 0, period: "pm" as const };
		expect(isValueObjectComplete(obj, ["hours", "minutes", "seconds"], "12")).toBe(true);
	});

	it("should return true for a fully populated object in 24h format", () => {
		const obj = { hours: 14, minutes: 30, seconds: 0, period: null };
		expect(isValueObjectComplete(obj, ["hours", "minutes", "seconds"], "24")).toBe(true);
	});

	it("should return false when hours is null and hours view is required", () => {
		const obj = { hours: null, minutes: 30, seconds: 0, period: "am" as const };
		expect(isValueObjectComplete(obj, ["hours", "minutes"], "12")).toBe(false);
	});

	it("should return false when minutes is null and minutes view is required", () => {
		const obj = { hours: 10, minutes: null, seconds: 0, period: "am" as const };
		expect(isValueObjectComplete(obj, ["hours", "minutes"], "12")).toBe(false);
	});

	it("should return false when seconds is null and seconds view is required", () => {
		const obj = { hours: 10, minutes: 30, seconds: null, period: "am" as const };
		expect(isValueObjectComplete(obj, ["hours", "minutes", "seconds"], "12")).toBe(false);
	});

	it("should return false when period is null in 12h format", () => {
		const obj = { hours: 10, minutes: 30, seconds: 0, period: null };
		expect(isValueObjectComplete(obj, ["hours", "minutes"], "12")).toBe(false);
	});

	it("should return false when period is invalid (not am/pm) in 12h format", () => {
		const obj = { hours: 10, minutes: 30, seconds: 0, period: "xx" as any };
		expect(isValueObjectComplete(obj, ["hours", "minutes"], "12")).toBe(false);
	});

	it("should return true even with null period in 24h format", () => {
		const obj = { hours: 14, minutes: 30, seconds: null, period: null };
		expect(isValueObjectComplete(obj, ["hours", "minutes"], "24")).toBe(true);
	});

	it("should return true when seconds view is not included and seconds is null", () => {
		const obj = { hours: 10, minutes: 30, seconds: null, period: "am" as const };
		expect(isValueObjectComplete(obj, ["hours", "minutes"], "12")).toBe(true);
	});
});

// ====================================================================================================================
// getEmptyTimeObject
// ====================================================================================================================

describe("getEmptyTimeObject", () => {
	it("should return an object with all null properties", () => {
		expect(getEmptyTimeObject()).toEqual({
			hours: null,
			minutes: null,
			seconds: null,
			period: null,
		});
	});

	it("should return a new object on each call", () => {
		const a = getEmptyTimeObject();
		const b = getEmptyTimeObject();
		expect(a).not.toBe(b);
	});
});

// ====================================================================================================================
// parseTimeValue
// ====================================================================================================================

describe("parseTimeValue", () => {
	it("should return empty TimeObject for null value", () => {
		const result = parseTimeValue(null, "12");
		expect(result.value).toBeNull();
		expect(result.valueObject).toEqual(getEmptyTimeObject());
	});

	it("should return empty TimeObject for undefined value", () => {
		const result = parseTimeValue(undefined, "12");
		expect(result.value).toBeUndefined();
		expect(result.valueObject).toEqual(getEmptyTimeObject());
	});

	it("should parse a UNIX timestamp (number)", () => {
		// 2025-04-27T12:22:56.604Z -> local hours depend on system; use Date API to verify
		const ts = 1777519376604;
		const date = new Date(ts);
		const result = parseTimeValue(ts, "12");
		expect(result.value).toBe(ts);
		expect(result.valueObject.hours).toBe(date.getHours());
		expect(result.valueObject.minutes).toBe(date.getMinutes());
		expect(result.valueObject.seconds).toBe(date.getSeconds());
		expect(result.valueObject.period).toBe(date.getHours() >= 12 ? "pm" : "am");
	});

	it("should route a numeric string through the timestamp path (note: new Date(string) returns Invalid Date, so hours/minutes are NaN)", () => {
		// The code matches /^\d+$/ and passes the string directly to new Date(value).
		// new Date("1777519376604") is an Invalid Date in V8, so getHours() returns NaN.
		const ts = 1777519376604;
		const result = parseTimeValue(String(ts), "12");
		expect(result.value).toBe(String(ts));
		expect(isNaN(result.valueObject.hours as number)).toBe(true);
		expect(isNaN(result.valueObject.minutes as number)).toBe(true);
	});

	it("should parse HH:MM:SS AA string in 12h format and preserve provided period", () => {
		const result = parseTimeValue("12:30:45 pm", "12");
		expect(result.value).toBe("12:30:45 pm");
		expect(result.valueObject).toEqual({
			hours: 12,
			minutes: 30,
			seconds: 45,
			period: "pm",
		});
	});

	it("should parse HH:MM:SS AA string in 12h format (am)", () => {
		const result = parseTimeValue("01:15:00 am", "12");
		expect(result.valueObject).toEqual({
			hours: 1,
			minutes: 15,
			seconds: 0,
			period: "am",
		});
	});

	it("should parse HH:MM string without seconds in 12h format (AM)", () => {
		const result = parseTimeValue("09:45 am", "12");
		expect(result.valueObject.hours).toBe(9);
		expect(result.valueObject.minutes).toBe(45);
		expect(result.valueObject.period).toBe("am");
	});

	it("should parse HH:MM string without seconds in 12h format (PM)", () => {
		const result = parseTimeValue("09:45 pm", "12");
		expect(result.valueObject.hours).toBe(9);
		expect(result.valueObject.minutes).toBe(45);
		expect(result.valueObject.period).toBe("pm");
	});

	it("should parse HH:MM:SS string in 24h format", () => {
		const result = parseTimeValue("14:30:00", "24");
		expect(result.valueObject.hours).toBe(14);
		expect(result.valueObject.minutes).toBe(30);
		expect(result.valueObject.seconds).toBe(0);
	});

	it("should convert 24h time with PM period to 24h hours (e.g. 02:30 PM -> 14)", () => {
		const result = parseTimeValue("02:30 PM", "24");
		expect(result.valueObject.hours).toBe(14);
		expect(result.valueObject.minutes).toBe(30);
	});

	it("should convert 24h time with AM period to 24h hours (e.g. 02:30 AM -> 02)", () => {
		const result = parseTimeValue("02:30 AM", "24");
		expect(result.valueObject.hours).toBe(2);
		expect(result.valueObject.minutes).toBe(30);
	});

	it("should convert 24h time with invalid period to correct period (e.g. 17:45 AM -> 17)", () => {
		const result = parseTimeValue("17:45 AM", "24");
		expect(result.valueObject.hours).toBe(17);
		expect(result.valueObject.minutes).toBe(45);
		expect(result.valueObject.period).toBe("pm");
	});

	it("should convert >12h string to 12h format when timeFormat is '12'", () => {
		// "14:00" in 12h format should become hours=2, period="PM"
		const result = parseTimeValue("14:00", "12");
		expect(result.valueObject.hours).toBe(2);
		expect(result.valueObject.period).toBe("pm");
	});

	it("should return empty TimeObject for an invalid (non-numeric, non-time) object value", () => {
		const result = parseTimeValue({ hours: 1 } as any, "12");
		expect(result.valueObject).toEqual(getEmptyTimeObject());
	});

	it("should convert 12h time string with provided period without space separation (e.g. 02:30PM -> 02:30 PM)", () => {
		const result = parseTimeValue("02:30PM", "12");
		expect(result.valueObject).toEqual({
			hours: 2,
			minutes: 30,
			seconds: 0,
			period: "pm",
		});
	});
});

// ====================================================================================================================
// parseTimePeriod
// ====================================================================================================================

describe("parseTimePeriod", () => {
	it("should return null for null input", () => {
		expect(parseTimePeriod(null)).toBeNull();
	});

	it("should return 'am' for 'am'", () => {
		expect(parseTimePeriod("am")).toBe("am");
	});

	it("should return 'am' for 'AM'", () => {
		expect(parseTimePeriod("AM")).toBe("am");
	});

	it("should return 'am' for 'a'", () => {
		expect(parseTimePeriod("a")).toBe("am");
	});

	it("should return 'pm' for 'pm'", () => {
		expect(parseTimePeriod("pm")).toBe("pm");
	});

	it("should return 'pm' for 'PM'", () => {
		expect(parseTimePeriod("PM")).toBe("pm");
	});

	it("should return 'pm' for 'p'", () => {
		expect(parseTimePeriod("p")).toBe("pm");
	});

	it("should return null for an unrecognized string", () => {
		expect(parseTimePeriod("noon")).toBeNull();
	});

	it("should trim whitespace before parsing", () => {
		expect(parseTimePeriod("  pm  ")).toBe("pm");
	});
});

// ====================================================================================================================
// getI18nConfig
// ====================================================================================================================

describe("getI18nConfig", () => {
	it("should return the default i18n configuration", () => {
		expect(getI18nConfig()).toEqual({
			
			okButtonLabel: "OK",
			cancelButtonLabel: "Cancel",
			hourPlaceholder: "HH",
			minutePlaceholder: "MM",
			secondPlaceholder: "SS",
			periodPlaceholder: "AA",
		});
	});
});

// ====================================================================================================================
// validKeyInput
// ====================================================================================================================

describe("validKeyInput", () => {
	describe("numeric mode", () => {
		it("should allow digit keys", () => {
			expect(validKeyInput("0", "numeric")).toBe(true);
			expect(validKeyInput("9", "numeric")).toBe(true);
		});

		it("should allow control keys (Backspace, Delete, Arrow*, Tab)", () => {
			expect(validKeyInput("Backspace", "numeric")).toBe(true);
			expect(validKeyInput("Delete", "numeric")).toBe(true);
			expect(validKeyInput("ArrowLeft", "numeric")).toBe(true);
			expect(validKeyInput("ArrowRight", "numeric")).toBe(true);
			expect(validKeyInput("ArrowUp", "numeric")).toBe(true);
			expect(validKeyInput("ArrowDown", "numeric")).toBe(true);
			expect(validKeyInput("Tab", "numeric")).toBe(true);
		});

		it("should reject letter keys", () => {
			expect(validKeyInput("a", "numeric")).toBe(false);
		});

		it("should reject special character keys", () => {
			expect(validKeyInput(":", "numeric")).toBe(false);
			expect(validKeyInput(" ", "numeric")).toBe(false);
		});
	});

	describe("text mode", () => {
		it("should allow letter keys", () => {
			expect(validKeyInput("a", "text")).toBe(true);
			expect(validKeyInput("Z", "text")).toBe(true);
		});

		it("should allow control keys", () => {
			expect(validKeyInput("Backspace", "text")).toBe(true);
			expect(validKeyInput("Tab", "text")).toBe(true);
		});

		it("should reject digit keys", () => {
			expect(validKeyInput("5", "text")).toBe(false);
		});

		it("should reject special character keys", () => {
			expect(validKeyInput(":", "text")).toBe(false);
		});
	});

	describe("unknown mode", () => {
		it("should allow any key when input mode is unrecognized", () => {
			expect(validKeyInput("x", "unknown")).toBe(true);
			expect(validKeyInput("5", "unknown")).toBe(true);
		});
	});
});

// ====================================================================================================================
// arraysEqual
// ====================================================================================================================

describe("arraysEqual", () => {
	it("should return true for two equal arrays", () => {
		expect(arraysEqual(["a", "b", "c"], ["a", "b", "c"])).toBe(true);
	});

	it("should return false for arrays of different lengths", () => {
		expect(arraysEqual(["a", "b"], ["a", "b", "c"])).toBe(false);
	});

	it("should return false for arrays with different values", () => {
		expect(arraysEqual(["a", "b", "c"], ["a", "b", "x"])).toBe(false);
	});

	it("should return true for two empty arrays", () => {
		expect(arraysEqual([], [])).toBe(true);
	});

	it("should be order-sensitive (same elements, different order -> false)", () => {
		expect(arraysEqual(["a", "b"], ["b", "a"])).toBe(false);
	});
});

// ====================================================================================================================
// validateTimeObject
// ====================================================================================================================

describe("validateTimeObject", () => {
	it("should return false for null/undefined valueObject", () => {
		expect(validateTimeObject(null as any, ["hours", "minutes"], "12")).toBe(false);
	});

	it("should return true for a valid 12h time object", () => {
		const obj = { hours: 3, minutes: 30, seconds: 0, period: "pm" as const };
		expect(validateTimeObject(obj, ["hours", "minutes", "seconds"], "12")).toBe(true);
	});

	it("should return true for a valid 24h time object", () => {
		const obj = { hours: 14, minutes: 30, seconds: 0, period: null };
		expect(validateTimeObject(obj, ["hours", "minutes", "seconds"], "24")).toBe(true);
	});

	it("should return false when hours is null and hours view is required", () => {
		const obj = { hours: null, minutes: 30, seconds: 0, period: "am" as const };
		expect(validateTimeObject(obj, ["hours", "minutes"], "12")).toBe(false);
	});

	it("should return false when hours is 0 in 12h format (out of 1-12 range)", () => {
		const obj = { hours: 0, minutes: 0, seconds: 0, period: "am" as const };
		expect(validateTimeObject(obj, ["hours", "minutes"], "12")).toBe(false);
	});

	it("should return false when hours > 12 in 12h format", () => {
		const obj = { hours: 13, minutes: 0, seconds: 0, period: "pm" as const };
		expect(validateTimeObject(obj, ["hours", "minutes"], "12")).toBe(false);
	});

	it("should return true when hours is 24 in 24h format", () => {
		const obj = { hours: 23, minutes: 59, seconds: 59, period: null };
		expect(validateTimeObject(obj, ["hours", "minutes", "seconds"], "24")).toBe(true);
	});

	it("should return false when minutes < 0", () => {
		const obj = { hours: 10, minutes: -1, seconds: 0, period: "am" as const };
		expect(validateTimeObject(obj, ["hours", "minutes"], "12")).toBe(false);
	});

	it("should return false when minutes > 59", () => {
		const obj = { hours: 10, minutes: 60, seconds: 0, period: "am" as const };
		expect(validateTimeObject(obj, ["hours", "minutes"], "12")).toBe(false);
	});

	it("should return false when seconds < 0", () => {
		const obj = { hours: 10, minutes: 30, seconds: -1, period: "am" as const };
		expect(validateTimeObject(obj, ["hours", "minutes", "seconds"], "12")).toBe(false);
	});

	it("should return false when seconds > 59", () => {
		const obj = { hours: 10, minutes: 30, seconds: 60, period: "am" as const };
		expect(validateTimeObject(obj, ["hours", "minutes", "seconds"], "12")).toBe(false);
	});

	it("should return false when period view is required but period is null", () => {
		const obj = { hours: 10, minutes: 30, seconds: 0, period: null };
		expect(validateTimeObject(obj, ["hours", "minutes", "period"], "12")).toBe(false);
	});

	it("should return false when period view is required but period is invalid", () => {
		const obj = { hours: 10, minutes: 30, seconds: 0, period: "xx" as any };
		expect(validateTimeObject(obj, ["hours", "minutes", "period"], "12")).toBe(false);
	});

	it("should return true when period view is required and period is valid", () => {
		const obj = { hours: 10, minutes: 30, seconds: 0, period: "am" as const };
		expect(validateTimeObject(obj, ["hours", "minutes", "period"], "12")).toBe(true);
	});

	it("should handle partial valueObject by merging with empty object", () => {
		// Only hours provided, minutes required
		const obj = { hours: 5 } as any;
		expect(validateTimeObject(obj, ["hours", "minutes"], "12")).toBe(false);
	});
});

// ====================================================================================================================
// parseViewsFromAttribute
// ====================================================================================================================

describe("parseViewsFromAttribute", () => {
	it("should parse a single view", () => {
		expect(parseViewsFromAttribute("hours")).toEqual(["hours"]);
	});

	it("should parse multiple comma-separated views", () => {
		expect(parseViewsFromAttribute("hours,minutes,seconds")).toEqual(["hours", "minutes", "seconds"]);
	});

	it("should trim whitespace around view names", () => {
		expect(parseViewsFromAttribute("hours, minutes , seconds")).toEqual(["hours", "minutes", "seconds"]);
	});

	it("should parse two views", () => {
		expect(parseViewsFromAttribute("hours,minutes")).toEqual(["hours", "minutes"]);
	});

	it("should handle a single view with surrounding whitespace", () => {
		expect(parseViewsFromAttribute("  seconds  ")).toEqual(["seconds"]);
	});

	it("should return default views when input is an empty string", () => {
		// DEFAULT_TIME_PICKER_VIEW = ["hours", "minutes"]
		expect(parseViewsFromAttribute("")).toEqual(["hours", "minutes"]);
	});

	it("should return default views when input is only whitespace", () => {
		// DEFAULT_TIME_PICKER_VIEW = ["hours", "minutes"]
		expect(parseViewsFromAttribute("   ")).toEqual(["hours", "minutes"]);
	});

	it("should return default views when input is invalid", () => {
		// DEFAULT_TIME_PICKER_VIEW = ["hours", "minutes"]
		expect(parseViewsFromAttribute("invalid")).toEqual(["hours", "minutes"]);
	});
});

// ====================================================================================================================
// parseViewFromString
// ====================================================================================================================

describe("parseViewFromString", () => {
	const views = ["hours", "minutes", "seconds"] as any[];

	it("should return the view when it is included in the views array", () => {
		expect(parseViewFromString("hours", views)).toBe("hours");
		expect(parseViewFromString("minutes", views)).toBe("minutes");
		expect(parseViewFromString("seconds", views)).toBe("seconds");
	});

	it("should trim whitespace from the input value", () => {
		expect(parseViewFromString("  hours  ", views)).toBe("hours");
	});

	it("should return the first view when the value is not in the views array", () => {
		expect(parseViewFromString("invalid", views)).toBe("hours");
	});

	it("should return the first view when value is an empty string", () => {
		expect(parseViewFromString("", views)).toBe("hours");
	});

	it("should fall back to DEFAULT_TIME_PICKER_VIEW[0] when views array is empty", () => {
		// DEFAULT_TIME_PICKER_VIEW = ["hours", "minutes"]
		expect(parseViewFromString("minutes", [])).toBe("hours");
	});

	it("should fall back to DEFAULT_TIME_PICKER_VIEW[0] when views is empty and value is invalid", () => {
		expect(parseViewFromString("invalid", [])).toBe("hours");
	});
});

// ====================================================================================================================
// parseStepFromValue
// ====================================================================================================================

describe("parseStepFromValue", () => {
	it("should return 1 for null", () => {
		expect(parseStepFromValue(null)).toBe(1);
	});

	it("should return the same number for valid numeric step values", () => {
		expect(parseStepFromValue(1)).toBe(1);
		expect(parseStepFromValue(5)).toBe(5);
		expect(parseStepFromValue(59)).toBe(59);
	});

	it("should return 1 for invalid numeric values", () => {
		expect(parseStepFromValue(0)).toBe(1);
		expect(parseStepFromValue(-1)).toBe(1);
		expect(parseStepFromValue(60)).toBe(1);
		expect(parseStepFromValue(Number.NaN)).toBe(1);
		expect(parseStepFromValue(Number.POSITIVE_INFINITY)).toBe(1);
		expect(parseStepFromValue(Number.NEGATIVE_INFINITY)).toBe(1);
	});

	it("should parse valid integer strings", () => {
		expect(parseStepFromValue("1")).toBe(1);
		expect(parseStepFromValue("10")).toBe(10);
		expect(parseStepFromValue("59")).toBe(59);
	});

	it("should return 1 for invalid strings", () => {
		expect(parseStepFromValue("")).toBe(1);
		expect(parseStepFromValue("abc")).toBe(1);
		expect(parseStepFromValue("0")).toBe(1);
		expect(parseStepFromValue("-5")).toBe(1);
		expect(parseStepFromValue("60")).toBe(1);
	});

	it("should parse strings with surrounding whitespace", () => {
		expect(parseStepFromValue(" 7 ")).toBe(7);
	});

	it("should follow parseInt behavior for mixed strings", () => {
		expect(parseStepFromValue("5px")).toBe(5);
	});
});