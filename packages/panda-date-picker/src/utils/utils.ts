// types
import { PandaMonth } from "../../index";

export const minValue = (value: number, min: number): number => value < min ? min : value;

export const maxValue = (value: number, max: number): number => value > max ? max : value;

/**
 * Get offset top of an element
 * @param el - element 
 * @returns {Number} offset top value for given element 
 */
export const getParentOffsetTop = (el: HTMLElement): number => {
	if (el.offsetParent) {
		console.log("%c offset top ->", "font-size: 24px; color: green;", el.offsetParent, (el.offsetParent as any).offsetTop);
		return (el.offsetParent as any).offsetTop + getParentOffsetTop(el.offsetParent as HTMLElement);
	} else {
		return 0;
	}
};

/**
 * Get offset left of an element
 * @param el - element 
 * @returns {Number} offset left value for given element 
 */
export const getParentOffsetLeft = (el: HTMLElement): number => {
	if (el.offsetParent) {
		console.log("%c offset left ->", "font-size: 24px; color: green;", el.offsetParent, (el.offsetParent as any).offsetLeft);
		return (el.offsetParent as any).offsetLeft + getParentOffsetLeft(el.offsetParent as HTMLElement);
	} else {
		return 0;
	}
};

/**
 * Parse date string and return Date object
 * @param {String} date - Date string to parse
 * @param {String} format - custom format string eg. "YYYY DD MM"
 * @returns {Date} Date object
 */
export const parseDate = (date: string, format: string): Date => {
	if (!date) {
		return new Date();
	} else {
		// check if date format is provided
		// if (format) {

		// }
		const parsedDate: Date | number = new Date(date);

		if (Object.prototype.toString.call(parsedDate) === "[object Date]") {
			// it is a date
			if (isNaN(parsedDate as any)) {
				return new Date();
			} else {
				return parsedDate;
			}
		} else {
			return new Date();
		}
	}
};

export const getDefaultMonth = (): PandaMonth => ({
	date: null,
	unix: null,
	day: null,
	month: null,
	year: null,
	daysCount: null,
	days: [],
	startDayIndex: null,
});