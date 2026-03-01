// types
import { PandaDatePickerI18nConfig, PandaDatePreset, PandaDateRange } from "../../index";
import { DateValue } from "../type";

// utils
import { isEmpty } from "@panda-wbc/panda-utils";

export const getDateOffset = (date: string): number | null => {
	let dateOffset = null;

	if (date) {
		const year = Number(date.slice(0, 4));
		const month = Number(date.slice(5, 7));
		const day = Number(date.slice(8, 10));
		dateOffset = year * 10000 + month * 100 + day;
	}

	return dateOffset;
}

export const isDateDisabled = (
	year: number,
	month: number,
	day: number,
	dayOfWeek: number,
	min: string | null,
	max: string | null,
	disableDates: string[] | null,
	disableDateRange: PandaDateRange[] | null,
	disableWeekends: boolean,
	disableWeekDays: string[] | null,
	daysOfWeek: string[]
): boolean => {
	const dateOffset = year * 10000 + (month + 1) * 100 + day;
	const _year = String(year);
	const _month = `0${month + 1}`.slice(-2);
	const _day = `0${day}`.slice(-2);
	let disabled: boolean = false;

	// min date
	if (min) {
		const _minDateOffset = getDateOffset(min);

		if (_minDateOffset && _minDateOffset > dateOffset) {
			disabled = true;
		}
	}

	// max date
	if (max) {
		const _maxDateOffset = getDateOffset(max);

		if (_maxDateOffset && _maxDateOffset < dateOffset) {
			disabled = true;
		}
	}

	// disabled dates
	if (disableDates?.length) {
		disableDates.forEach((date) => {
			const yyyy = date.slice(0, 4);
			const mm = date.slice(5, 7);
			const dd = date.slice(8, 10);

			if (
				(yyyy === _year || yyyy === "****") &&
				(mm === _month || mm === "**") &&
				(dd === _day || dd === "**")
			) {
				console.log("%c [PANDA MONTH CALENDAR] disableDates:", "font-size: 24px; color: red;", year, month + 1, day);
				disabled = true;
			}
		});
	}

	// disable weekends
	if (
		disableWeekends && dayOfWeek === 0 ||
		disableWeekends && dayOfWeek === 6
	) {
		console.log("%c [PANDA MONTH CALENDAR] disableWeekends:", "font-size: 24px; color: red;", year, month + 1, day);
		disabled = true;
	}

	// disable date ranges
	if (disableDateRange?.length) {
		disableDateRange.forEach((dateRange) => {
			const dateFrom = String(dateRange.from) ?? null;
			const dateTo = String(dateRange.to) ?? null;

			if (dateFrom && dateTo) {
				const fromYear = Number(dateFrom.slice(0, 4));
				const fromMonth = Number(dateFrom.slice(5, 7));
				const fromDay = Number(dateFrom.slice(8, 10));
				const toYear = Number(dateTo.slice(0, 4));
				const toMonth = Number(dateTo.slice(5, 7));
				const toDay = Number(dateTo.slice(8, 10));
				// calculate date offsets for comparison
				const fromDateOffset = fromYear * 10000 + fromMonth * 100 + fromDay;
				const toDateOffset = toYear * 10000 + toMonth * 100 + toDay;

				if (dateOffset >= fromDateOffset && dateOffset <= toDateOffset) {
					console.log("%c [PANDA MONTH CALENDAR] disableDateRange:", "font-size: 24px; color: red;", year, month + 1, day);
					disabled = true;
				}
			}

		});
	}

	// disable days of week
	if (disableWeekDays?.length) {
		disableWeekDays.forEach((disableDayOfWeek) => {
			if (disableDayOfWeek.toLocaleLowerCase() === daysOfWeek[dayOfWeek].toLocaleLowerCase()) {
				console.log("%c [PANDA MONTH CALENDAR] disableDayOfWeek:", "font-size: 24px; color: red;", disableDayOfWeek, dayOfWeek);
				disabled = true;
			}
		});
	}

	return disabled;
}

/**
 * Get default i18n config for date formatting and calendar rendering.
 * @returns {PandaDatePickerI18nConfig} default i18n config object
 */
export const getDefaultI18nConfig = (): PandaDatePickerI18nConfig => ({
	today: "Today",
	cancel: "Cancel",
	select: "Select",
	months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	fullMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	fullDaysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
});

export const getMonths = (i18nConfig: PandaDatePickerI18nConfig | null = null): string[] => {
	if (i18nConfig) {
		return i18nConfig.months;
	} else {
		return getDefaultI18nConfig().months;
	}
}

export const getFullMonths = (i18nConfig: PandaDatePickerI18nConfig | null = null): string[] => {
	if (i18nConfig) {
		return i18nConfig.fullMonths;
	} else {
		return getDefaultI18nConfig().fullMonths;
	}
}

export const getDaysOfWeek = (i18nConfig: PandaDatePickerI18nConfig | null = null): string[] => {
	if (i18nConfig) {
		return i18nConfig.daysOfWeek;
	} else {
		return getDefaultI18nConfig().daysOfWeek;
	}
}

export const getFullDaysOfWeek = (i18nConfig: PandaDatePickerI18nConfig | null = null): string[] => {
	if (i18nConfig) {
		return i18nConfig.fullDaysOfWeek;
	} else {
		return getDefaultI18nConfig().fullDaysOfWeek;
	}
}

/**
 * Convert date string to formatted date string eg. [YYYY-MM-DD]
 * @param {string | null} dateString - valid date to parse
 * @returns {string | null} formatted date output format: [YYYY-MM-DD]
 */
export const parseDateString = (dateString: string | null): string | null => {
	if (dateString !== null && isValidDate(dateString)) {
		const date = new Date(dateString);
		const yyyy = date.getFullYear();
		const mm = `${date.getMonth() + 1}`.padStart(2, "0");
		const dd = `${date.getDate()}`.padStart(2, "0");

		return `${yyyy}-${mm}-${dd}`;
	} else {
		return null;
	}
}

/**
 * Check if the provided date string is a valid date.
 * @param {string | null} value - date string to validate
 * @returns {boolean} boolean indicating whether the date string is valid or not
 */
export const isValidDate = (value: DateValue): boolean => {
	if (value == null || value === "") {
		return false;
	} else {
		const date = new Date(value);
		return !Number.isNaN(date.getTime());
	}
}

/**
 * Format a date value according to the specified format and i18n configuration.
 * @param {DateValue} value - date value to format
 * @param {string} format - format string
 * @param {PandaDatePickerI18nConfig | null} i18nConfig - i18n configuration object
 * @returns {string} formatted date string
 */
export const formatDate = (
	value: DateValue = null,
	format: string = "YYYY-MM-DD",
	i18nConfig: PandaDatePickerI18nConfig | null = null
): string => {
	console.log(
		`%c 🧪 (formatDate) value: ${value}, format: ${format}`,
		"font-size: 24px; color: limegreen; background: black;"
	);

	if (isValidDate(value)) {
		// check if i18n config is passed, if not use default config
		const i18n = i18nConfig ?? getDefaultI18nConfig();
		let formattedDate = "";
		let date = new Date(value!);

		// extract available data format
		const replaceMap: { [pattern: string]: string } = {
			DDDD: i18n.fullDaysOfWeek[date.getDay()], 		// eg. Monday, Tuesday, Wednesday ... Sunday
			DDD: i18n.daysOfWeek[date.getDay()], 			// eg. Mon, Tue, Wed ... Sun
			DD: `${date.getDate()}`.padStart(2, "0"), 		// eg. 01, 02, 03 ... 30 - day of the month prefixed with zero
			D: date.getDate() + "", 						// eg. 1, 2, 3 ... 30 day of the month
			MMMM: i18n.fullMonths[date.getMonth()], 		// eg. January, February, March ... December
			MMM: i18n.months[date.getMonth()], 				// eg. Jan, Feb, Mar ... Dec
			MM: `${date.getMonth() + 1}`.padStart(2, "0"), 	// eg. 01, 02, 03 ... 12 - month prefixed with zero
			M: `${date.getMonth() + 1}`, 					// eg. 1, 2, 3 ... 12 - month 
			YYYY: date.getFullYear() + "", 					// eg. 1998, 1999, 2000 ... 2022
			YY: `${date.getFullYear()}`.slice(-2),	 		// eg. 98, 99, 00 ... 22 - last two digits of the year
		};

		const replacer = (match: string): string => replaceMap[match];

		// if format is empty or not provided, use default format
		formattedDate = format ?? "YYYY-MM-DD";
		console.log(
			`%c 🧪 (formatDate) 1. formatted date: ${formattedDate}, format: ${format}`,
			"font-size: 24px; color: limegreen; background: black;"
		);
		return formattedDate.replace(/YYYY|YY|MMMM|MMM|MM|M|DDDD|DDD|DD|D/g, replacer);


	} else {
		console.log(
			`%c 🧪 (formatDate) 2. invalid date provided`,
			"font-size: 24px; color: limegreen; background: black;"
		);
		return "";
	}
}

/**
 * Get preset date string based on the provided preset label and preset dates array. 
 * @param {string} presetLabel - The label of the preset date to retrieve.
 * @param {PandaDatePreset[] | null} presetDates - The array of preset dates.
 * @returns {string | null} The preset date string if found, otherwise null.
 */
export const getPresetDateByLabel = (presetLabel: string, presetDates: PandaDatePreset[] | null): string | null => {
	if (presetDates) {
		const preset = presetDates.find(({ label }) => label.toLocaleLowerCase() === presetLabel.toLocaleLowerCase());
		if (preset) {
			if ("date" in preset) {
				return preset.date;
			}
		}
	}
	return null;
}