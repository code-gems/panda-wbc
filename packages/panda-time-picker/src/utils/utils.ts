// types
import { PandaTimePickerI18nConfig, PandaTimePickerTimeFormat, PandaTimePickerView } from "../../index";
import { DEFAULT_TIME_PICKER_VIEW } from "../constants";
import { RawValue, TimeObject, TimePeriod } from "../types";

/**
 * Utility function to generate a time format string based on the provided views and time mode 12/24h.
 * For example, if the views are ["hours", "minutes"] and the time format is "12", the generated format will be "HH:MM AA".
 * If the views are ["hours", "minutes", "seconds"] and the time format is "24", the generated format will be "HH:MM:SS".
 * If no views are provided, it defaults to "HH:MM AA" for 12-hour format and "HH:MM" for 24-hour format.
 * @param {string[]} views The views to consider (e.g., ["hours", "minutes", "seconds"]).
 * @param {string} timeFormat The time format ("12" or "24").
 * @returns {string} The generated time format string.
 */
export const getFormatFromViews = (views: string[], timeFormat: string): string => {
	if (views.length === 0) {
		return timeFormat !== "24" ? "HH:MM AA" : "HH:MM";
	}

	let format = "";
	if (views.includes("hours")) {
		format += "HH";
	}
	if (views.includes("minutes")) {
		format += (format ? ":" : "") + "MM";
	}
	if (views.includes("seconds")) {
		format += (format ? ":" : "") + "SS";
	}
	if (views.includes("hours") && timeFormat !== "24") {
		format += " AA";
	}
	return format;
}

/**
 * Formats a time value object into a string based on the provided format, views, and time format.
 * @param {TimeObject} valueObject The time value object to format.
 * @param {string} format The format string.
 * @param {string[]} views The views to consider (e.g., ["hours", "minutes", "seconds"]).
 * @param {string} timeFormat The time format ("12" or "24").
 * @returns {string} The formatted time string.
 */
export const formatValue = (
	valueObject: TimeObject,
	format: string,
	views: string[],
	timeFormat: string
): string => {
	const { hours, minutes, seconds, period } = valueObject;
	let parsedFormat = format == null || format.trim() === ""
		? getFormatFromViews(views, timeFormat)
		: format.toLocaleUpperCase();

	const replacer = (match: string): string => {
		switch (match) {
			case "HH":
				if (views.includes("hours")) {
					if (timeFormat === "12") {
						return hours != null ? String(hours % 12 || 12).padStart(2, "0") : "00";
					} else {
						return hours != null ? String(hours).padStart(2, "0") : "00";
					}
				}
				return "00";
			case "MM":
				if (views.includes("minutes")) {
					return minutes != null ? String(minutes).padStart(2, "0") : "00";
				}
				return "00";
			case "SS":
				if (views.includes("seconds")) {
					return seconds != null ? String(seconds).padStart(2, "0") : "00";
				}
				return "00";
			case "AA":
				if (views.includes("hours") && timeFormat === "12") {
					return period != null ? period.toUpperCase() : "";
				}
				return "";
			default:
				return match;
		}
	};

	// replace format tokens with actual values
	parsedFormat = parsedFormat.replace(/HH|MM|SS|AA/g, replacer);
	return parsedFormat.trim();
};

/**
 * Utility function to check if a time ValueObject is complete based on the provided views and time format. 
 * A ValueObject is considered complete if all the required fields for the specified views are present and valid.
 * For example, if the views include "hours" and "minutes", then the ValueObject must have valid "hours" and "minutes" properties.
 * If the time format is 12-hour, then the ValueObject must also have a valid "period" property ("am" or "pm").
 * 
 * @param {TimeObject} valueObject The time value object to check.
 * @param {string[]} views The views to consider (e.g., ["hours", "minutes", "seconds"]).
 * @param {string} timeFormat The time format ("12" or "24").
 * @returns {boolean} True if the value object is complete, false otherwise.
 */
export const isValueObjectComplete = (valueObject: TimeObject, views: string[], timeFormat: string): boolean => {
	let complete = true;
	if (views.includes("hours") && (valueObject.hours == null || isNaN(valueObject.hours))) {
		complete = false;
	}
	if (views.includes("minutes") && (valueObject.minutes == null || isNaN(valueObject.minutes))) {
		complete = false;
	}
	if (views.includes("seconds") && (valueObject.seconds == null || isNaN(valueObject.seconds))) {
		complete = false;
	}
	if (
		views.includes("hours") && // if hours view is included
		timeFormat !== "24" && // and time format is 12-hour
		(
			valueObject.period == null || // then period must be present and valid
			(valueObject.period !== "am" && valueObject.period !== "pm") // (must be "am" or "pm")
		)
	) {
		complete = false;
	}

	// console.log(`%c ⚡ valueObject`, "font-size: 24px; color: crimson; background: black;", valueObject);
	// console.log(`%c ⚡ views`, "font-size: 24px; color: crimson; background: black;", views);
	// console.log(`%c ⚡ timeFormat`, "font-size: 24px; color: crimson; background: black;", timeFormat);
	// console.log(`%c ⚡ complete`, "font-size: 24px; color: crimson; background: black;", complete);

	return complete;
}

/**
 * Utility function to create an empty TimeObject with all properties set to null.
 * @returns {TimeObject} An empty TimeObject.
 */
export const getEmptyTimeObject = (): TimeObject => ({
	hours: null,
	minutes: null,
	seconds: null,
	period: null,
});

/**
 * Parses a time value from various input formats into a TimeValue object.
 * acceptable input formats:
 * 1. HH:MM eg. 14:30
 * 2. HH:MM:SS eg. 14:30:45
 * 3. HH:MM AA eg. 02:30 PM
 * 4. HH:MM:SS AA eg. 02:30:45 PM
 * 5. X eg. 1672531199000 or "1672531199000" (UNIX timestamp in milliseconds)
 * 6. { "hours": number; "minutes": number; "seconds": number; "period": "am" | "pm" }
 * @param value The value to be parsed into a TimeValue object.
 * @returns A TimeValue object or null if the input is invalid.
 */
export const parseTimeValue = (value: RawValue, timeFormat: string): { value: RawValue; valueObject: TimeObject } => {
	if (value == null) {
		return {
			value,
			valueObject: getEmptyTimeObject(),
		};
	} else if (typeof value === "number" || (typeof value === "string" && /^\d+$/.test(value))) { // value is a number or all digit sequence string (timestamp) 
		const date = new Date(value);
		let hours = date.getHours();
		return {
			value,
			valueObject: {
				hours,
				minutes: date.getMinutes(),
				seconds: date.getSeconds(),
				period: hours >= 12 ? TimePeriod.PM : TimePeriod.AM,
			},
		};
	} else if (typeof value === "string") {
		const normalizedValue = value.trim();
		const matches = normalizedValue.match(/^(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?\s*([aApP][mM]?)?$/);

		let hours = 0;
		let minutes = 0;
		let seconds = 0;
		let period: string | null = null;

		if (matches) {
			hours = Number(matches[1]);
			minutes = matches[2] != null ? Number(matches[2]) : 0;
			seconds = matches[3] != null ? Number(matches[3]) : 0;
			period = matches[4] ?? null;
		} else {
			const [time, rawPeriod] = normalizedValue.split(/\s+/);
			const [parsedHours, parsedMinutes, parsedSeconds] = (time ?? "").split(":").map(Number);
			hours = Number.isNaN(parsedHours) ? 0 : parsedHours;
			minutes = Number.isNaN(parsedMinutes) ? 0 : parsedMinutes;
			seconds = Number.isNaN(parsedSeconds) ? 0 : parsedSeconds;
			period = rawPeriod ?? null;
		}

		const parsedPeriod = parseTimePeriod(period);
		const originalHours = hours;

		if (timeFormat === "24") {
			if (parsedPeriod === TimePeriod.PM && hours < 12) {
				hours += 12;
			}
			if (parsedPeriod === TimePeriod.AM && hours === 12) {
				hours = 0;
			}
			period = hours >= 12 ? TimePeriod.PM : TimePeriod.AM;
		} else {
			if (hours > 12) {
				hours = hours % 12 || 12;
			}
			period = parsedPeriod ?? (originalHours >= 12 ? TimePeriod.PM : TimePeriod.AM);
		}

		return {
			value,
			valueObject: {
				hours,
				minutes,
				seconds,
				period: parseTimePeriod(period),
			},
		};
	} else {
		console.warn(`%c ⚠️ [PANDA TIME PICKER] Invalid time value: ${value}`, "color: orange; background: black;");
		return {
			value,
			valueObject: getEmptyTimeObject(),
		};
	}
}

export const parseTimePeriod = (period: string | null): TimePeriod | null => {
	if (period == null) {
		return null;
	}
	const normalizedPeriod = period.trim().toLowerCase();
	if (normalizedPeriod === "am" || normalizedPeriod === "a") {
		return TimePeriod.AM;
	} else if (normalizedPeriod === "pm" || normalizedPeriod === "p") {
		return TimePeriod.PM;
	}
	return null;
}

/**
 * Provides the default internationalization (i18n) configuration for the PandaTimePicker component.
 * @returns {PandaTimePickerI18nConfig} The default i18n configuration object.
 */
export const getI18nConfig = (): PandaTimePickerI18nConfig => {
	return {
		hourPlaceholder: "HH",
		minutePlaceholder: "MM",
		secondPlaceholder: "SS",
		periodPlaceholder: "AA",
	};
}

export const validKeyInput = (key: string, inputMode: string): boolean => {
	const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"];

	// validate type input based on the input mode
	if (inputMode === "numeric") {
		// allow only digits and control keys for numeric input mode
		if (!allowedKeys.includes(key) && !/^\d$/.test(key)) {
			return false;
		}
	} else if (inputMode === "text") {
		// allow only letters for text input mode
		if (!allowedKeys.includes(key) && !/^[a-zA-Z]$/.test(key)) {
			return false;
		}
	}
	return true;
}

/**
 * Utility function to compare two string arrays for equality.
 * @param {string[]} a The first array to compare.
 * @param {string[]} b The second array to compare.
 * @returns {boolean} True if the arrays are equal, false otherwise.
 */
export const arraysEqual = (a: string[], b: string[]): boolean => {
	if (a.length !== b.length) {
		return false;
	}
	return a.every((val, i) => val === b[i]);
}

/**
 * Validates a time value object based on the provided views and time format.
 * It checks if all the required fields for the specified views are present and valid.
 * For example, if the views include "hours" and "minutes", then the ValueObject must have valid "hours" and "minutes" properties.
 * If the time format is 12-hour, then the ValueObject must also have a valid "period" property ("am" or "pm").
 * @param {TimeObject} valueObject The time value object to validate.
 * @param {string[]} views The views to consider (e.g., ["hours", "minutes", "seconds"]).
 * @param {PandaTimePickerTimeFormat} timeFormat The time format ("12" or "24").
 * @returns {boolean} True, if the value object is valid, false otherwise.
 */
export const validateTimeObject = (valueObject: TimeObject, views: string[], timeFormat: PandaTimePickerTimeFormat): boolean => {
	if (!valueObject) {
		return false;
	}
	const timeObject = { ...getEmptyTimeObject(), ...valueObject };
	const { hours, minutes, seconds, period } = timeObject;

	// check if view includes hours
	if (views.includes("hours")) {
		// check if value is present and a valid number
		if (hours == null || isNaN(hours)) {
			return false;
		}
		// validate hours based on time format to catch cases like 00:00 AM or 13:00 PM which are invalid in 12-hour format
		if (
			hours < 1 && timeFormat === "12" ||
			hours > 12 && timeFormat === "12"
		) {
			return false;
		}
	}

	if (views.includes("minutes")) {
		if (minutes == null || isNaN(minutes)) {
			return false;
		}
		if (minutes < 0 || minutes > 59) {
			return false;
		}
	}

	if (views.includes("seconds")) {
		if (seconds == null || isNaN(seconds)) {
			return false;
		}
		if (seconds < 0 || seconds > 59) {
			return false;
		}
	}

	if (views.includes("period")) {
		if (period == null || (period !== "am" && period !== "pm")) {
			return false;
		}
	}
	return true;
}

/**
 * Utility function to parse a comma-separated string of views into an array of PandaTimePickerView.
 * If the input string is empty or invalid, it defaults to the predefined DEFAULT_TIME_PICKER_VIEW.
 * @param {string} value The comma-separated string of views (e.g., "hours,minutes,seconds").
 * @returns {PandaTimePickerView[]} An array of PandaTimePickerView.
 */
export const parseViewsFromAttribute = (value: string): PandaTimePickerView[] => {
	const validViews: PandaTimePickerView[] = ["hours", "minutes", "seconds"];
	const parsedViews = value
		.split(",")
		.map((view) => view.trim())
		.filter((view): view is PandaTimePickerView => validViews.includes(view as PandaTimePickerView));

	return parsedViews.length > 0
		? parsedViews
		: [...DEFAULT_TIME_PICKER_VIEW]; // default to predefined views if no valid views are parsed
}

/**
 * Utility function to parse a string value into a PandaTimePickerView based on the provided views.
 * If the parsed view is not included in the provided views, it defaults to the first view in the array or a predefined default view.
 * @param {string} value The string value to parse.
 * @param {PandaTimePickerView[]} views The array of available views.
 * @returns {PandaTimePickerView} The parsed view or a default view.
 */
export const parseViewFromString = (value: string, views: PandaTimePickerView[]): PandaTimePickerView => {
	const view = value.trim() as PandaTimePickerView;
	return views.includes(view)
		? view
		: views[0] || DEFAULT_TIME_PICKER_VIEW[0]; // default to the first view or predefined default view
}

/**
 * Utility function to parse a string or number value into a valid step number for minutes or seconds.
 * It validates that the parsed number is a positive integer between 1 and 59. If the input value is invalid, it defaults to 1.
 * @param {string | number | null} value The string or number value to parse into a step number.
 * @returns {number} The parsed step number or the default value of 1.
 */
export const parseStepFromValue = (value: string | number | null): number => {
	// if the value is null or undefined, return the default step value
	if (value == null) {
		return 1; // default step value
	}
	// if the value is a number, validate it directly
	if (typeof value === "number") {
		return isNaN(value) || value <= 0 || !isFinite(value) || value > 59
			? 1
			: value;
	}
	// if the value is a string, parse it into a number and validate it
	const parsedValue = parseInt(value, 10);
	return isNaN(parsedValue) || parsedValue <= 0 || !isFinite(parsedValue) || parsedValue > 59
		? 1
		: parsedValue;
}