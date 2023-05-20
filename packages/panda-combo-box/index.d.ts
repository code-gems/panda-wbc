export const enum MonthCalendarViewMode {
	DEFAULT = "DEFAULT",
	COMPACT = "COMPACT"
}

export type ElementDetails = {
	width: number;
	height: number;
	top: number;
	left: number;
	bottom: number;
	right: number;
}

export interface PandaDate {
	date: Date;
	unix: number;
	day: number;
	month: number;
	year: number;
}

export interface PandaMonth {
	month: number;
	year: number;
	// rendering props
	days: PandaDay[];
	daysCount: number; // number of days in the month
	startDayIndex: number; // index of a weekday of the first day eg. 4 for Thu
}

export interface PandaDay {
	label: string; // value shown on calendar eg.: 1, 2, 3.. etc
	date: string; // date string formatted against specified date format eg.: 2022-12-28
	dayKey: string;
	// status props
	selected: boolean;
	disabled: boolean;
	isToday: boolean;
	// feature props
	highlightString: string | null; // highlight string eg.: "BIRTHDAY"
	eventCount: number; // number of events associated with this day
}

export type PandaDateRange = {
	from: string;
	to: string;
}

export type PandaDateHighlight = {
	label: string;
	date: string;
}

export type PandaEvent = {
	date: string; // YYYY-MM-DD
	label: string;
	description?: string;
	time?: string; // HH:MM
	wholeDay?: boolean;
	selectable?: boolean;
}

export interface PandaParsedEvent extends PandaEvent {
	dayKey: string; // YYYYMMDD
	monthKey: string; // YYYYMM
	timestamp: number; // unix timestamp from provided event date
}

export type PandaDatePreset = {
	label: string;
	date?: string;
	dateFrom?: string;
	dateTo?: string;
}

// ====================================================================================================================
// ============================================================================================================= EVENTS
// ====================================================================================================================

export interface PandaDatePickerChangeEvent {
	date: string;
}
