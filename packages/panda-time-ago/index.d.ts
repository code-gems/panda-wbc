export const enum Intervals {
	SECOND = 1000,
	MINUTE = 1000 * 60,
	HOUR = 1000 * 60 * 60,
	DAY = 1000 * 60 * 60 * 24,
	MONTH = 1000 * 60 * 60 * 24 * 30,
	YEAR = 1000 * 60 * 60 * 24 * 30 * 12,
}

/** Localization config for custom language */
export interface PandaTimeAgoI18nConfig {
	yearAgo: string;
	yearsAgo: string;
	monthAgo: string;
	monthsAgo: string;
	dayAgo: string;
	daysAgo: string;
	yesterday: string;
	weekAgo: string;
	weeksAgo: string;
	hourAgo: string;
	hoursAgo: string;
	minAgo: string;
	justNow: string;
	// future
	nextYear: string;
	yearsFromNow: string;
	monthsFromNow: string;
	nextMonth: string;
	daysFromNow: string;
	tomorrow: string;
	nextWeek: string;
	weeksFromNow: string;
	hourFromNow: string;
	hoursFromNow: string;
	minFromNow: string;
}