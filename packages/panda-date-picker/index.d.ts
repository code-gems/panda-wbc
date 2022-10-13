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
	days: any[];
	daysCount: number; // number of days in the month
	startDayIndex: number; // index of a weekday of the first day eg. 4 for Thu
}

export type PandaDateRange = {
	from: string;
	to: string;
}

export type PandaDateHighlight = {
	label: string;
	date: string;
}

// ====================================================================================================================
// ============================================================================================================= EVENTS
// ====================================================================================================================

export interface PandaDatePickerChangeEvent {
	date: string;
}
