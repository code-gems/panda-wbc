// types
import { PandaTimePickerI18nConfig } from "../../index";
import { TimeValue } from "../types";

/**
 * Parses a time value from various input formats into a TimeValue object.
 * acceptable input formats:
 * 1. HH:MM eg. 14:30
 * 2. HH:MM:SS eg. 14:30:45
 * 3. HH:MM AA eg. 02:30 PM
 * 4. HH:MM:SS AA eg. 02:30:45 PM
 * 5. X eg. 1672531199000 (UNIX timestamp in milliseconds)
 * 6. { "hours": number; "minutes": number; "seconds": number; "period": "am" | "pm" }
 * @param value The value to be parsed into a TimeValue object.
 * @returns A TimeValue object or null if the input is invalid.
 */
export const parseTimeValue = (value: unknown): TimeValue | null => {
	if (value == null) {
		return null;
	} else if (typeof value === "string") {
		const [time, period] = value.split(" ");
		const [hours, minutes, seconds] = time.split(":").map(Number.parseInt);



		return {
			hours: hours || 0,
			minutes: minutes || 0,
			seconds: seconds || 0,
			period: period as "am" | "pm",
		};
	} else if (typeof value === "number") {
		const date = new Date(value);
		const hours = date.getHours();
		return {
			hours: hours % 12 || 12,
			minutes: date.getMinutes(),
			seconds: date.getSeconds(),
			period: hours >= 12 ? "pm" : "am",
		};
	} else {
		return null;
	}
}

export const parseTimePeriod = (period: string | null): "am" | "pm" | null => {
	if (period == null) {
		return null;
	}
	const normalizedPeriod = period.trim().toLowerCase();
	if (normalizedPeriod === "am" || normalizedPeriod === "a") {
		return "am";
	} else if (normalizedPeriod === "pm" || normalizedPeriod === "p") {
		return "pm";
	}
	return null;
}

/**
 * Provides the default internationalization (i18n) configuration for the PandaTimePicker component.
 * @returns {PandaTimePickerI18nConfig} The default i18n configuration object.
 */
export const getI18nConfig = (): PandaTimePickerI18nConfig => {
	return {
		hourPlaceholder: "hh",
		minutePlaceholder: "MM",
		secondPlaceholder: "SS",
		periodPlaceholder: "AA",
		am: "AM",
		pm: "PM",
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