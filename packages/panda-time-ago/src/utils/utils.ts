// types
import { PandaTimeAgoI18nConfig, Intervals } from "../../index";

/**
 * Convert date string to human readable time
 * @param {String|Number} time - Date string or unix timestamp
 * @param {Boolean} allowFuture - Allow converting future dates
 * @param {PandaTimeAgoI18nConfig} i18n - Localization config
 * @returns {String} Human readable time
 */
export const getTimeAgo = (
	time: string | number | null,
	allowFuture: boolean = false,
	i18n: PandaTimeAgoI18nConfig,
): string => {
	if (time === null || time === undefined) {
		return "";
	}
	const fromDate: number = new Date(time).getTime();
	const toDate: number = new Date().getTime();
	const when = toDate - fromDate;
	const whenSeconds = Math.round(when / Intervals.SECOND);
	const whenMinutes = Math.round(when / Intervals.MINUTE);
	const whenHours = Math.round(when / Intervals.HOUR);
	const whenDays = Math.round(when / Intervals.DAY);
	const whenWeeks = Math.abs(Math.round(whenDays / 7));
	const whenMonths = Math.round(when / Intervals.MONTH);
	const whenYears = Math.round(when / Intervals.YEAR);
	let timeAgo = "";

	// years
	if (whenYears > 1) timeAgo = `${whenYears} ${i18n.yearsAgo}`;
	if (whenYears === 1) timeAgo = i18n.yearAgo;
	// months
	if (whenMonths > 1 && whenMonths < 12) timeAgo = `${whenMonths} ${i18n.monthsAgo}`;
	if (whenMonths === 1) timeAgo = i18n.monthAgo;
	// days
	if (whenDays > 1 && whenDays < 30) timeAgo = `${whenDays} ${i18n.daysAgo}`;
	if (whenDays < 30) {
		if (whenWeeks === 1) {
			timeAgo = i18n.weekAgo;
		} else {
			timeAgo = `${whenWeeks} ${i18n.weeksAgo}`;
		}
	}
	if (whenDays === 14) timeAgo = `2 ${i18n.weeksAgo}`;
	if (whenDays < 7) timeAgo = `${whenDays} ${i18n.daysAgo}`;
	if (whenDays === 7) timeAgo = i18n.weekAgo;
	if (whenDays === 1) timeAgo = i18n.yesterday;
	// hours
	if (whenHours < 24) timeAgo = `${whenHours} ${i18n.hoursAgo}`;
	if (whenHours === 1) timeAgo = i18n.hourAgo;
	// minutes
	if (whenMinutes < 60) timeAgo = `${whenMinutes} ${i18n.minAgo}`;
	// seconds
	if (whenSeconds < 60 && whenSeconds >= 0) timeAgo = i18n.justNow;

	if (allowFuture) {
		// years
		if (whenYears < -1) timeAgo = `${Math.abs(whenYears)} ${i18n.yearsFromNow}`;
		if (whenYears === -1) timeAgo = i18n.nextYear;
		// months
		if (whenMonths < -1 && whenMonths > -12) timeAgo = `${Math.abs(whenMonths)} ${i18n.monthsFromNow}`;
		if (whenMonths === -1) timeAgo = i18n.nextMonth;
		// days
		if (whenDays < -1 && whenDays > -30) timeAgo = `${Math.abs(whenDays)} ${i18n.daysFromNow}`;
		if (whenDays < -7 && whenDays > -30) {
			if (whenWeeks === 1) {
				timeAgo = i18n.nextWeek;
			} else {
				timeAgo = `${whenWeeks} ${i18n.weeksFromNow}`;
			}
		}
		if (whenDays === -14) timeAgo = `2 ${i18n.weeksFromNow}`;
		if (whenDays === -7) timeAgo = i18n.nextWeek;
		if (whenDays === -1) timeAgo = i18n.tomorrow;
		// hours
		if (whenHours > -24 && whenHours < 0) timeAgo = `${Math.abs(whenHours)} ${i18n.hoursFromNow}`;
		if (whenHours === -1) timeAgo = i18n.hourFromNow;
		// minutes
		if (whenMinutes > -60 && whenMinutes < 0) timeAgo = `${Math.abs(whenMinutes)} ${i18n.minFromNow}`;
	}
	return timeAgo;
}