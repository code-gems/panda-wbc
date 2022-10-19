// types
import { PandaDateRange } from "../../index";

export const minValue = (value: number, min: number): number => value < min ? min : value;

export const maxValue = (value: number, max: number): number => value > max ? max : value;

export const getMonths = (): string[] => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getFullMonths = (): string[] => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getDaysOfWeek = (): string[] => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getFullDaysOfWeek = (): string[] => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const isDateValid = (date: string | null): boolean => {
	if (date === null) {
		return false;
	} else {
		const _date = new Date(date);
		return !isNaN(_date.getTime());
	}
};

export const unformatInputDate = (date: string | null, format: string | null): string | null=> {
	if (date && isDateValid(date) || format === null) {
		return date;
	} else {
		return null;
	}
};

export const getDateOffset = (date: string): number | null => {
	let dateOffset = null;

	if (date) {
		const year = Number(date.slice(0, 4));
		const month = Number(date.slice(5, 7));
		const day = Number(date.slice(8, 10));
		dateOffset = year * 10000 + month * 100 + day;
	}

	return dateOffset;
};

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
		
		if (_minDateOffset && _minDateOffset >= dateOffset) {
			disabled = true;
		}
	}

	// max date
	if (max) {
		const _maxDateOffset = getDateOffset(max);
		
		if (_maxDateOffset && _maxDateOffset <= dateOffset) {
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