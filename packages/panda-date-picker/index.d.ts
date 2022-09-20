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

export interface PandaMonth {
	date: Date | null;
	unix: number | null;
	day: number | null;
	month: number | null;
	year: number | null;
	// rendering props
	days: any[];
	daysCount: number | null; // number of days in the month
	startDayIndex: number | null; // index of a weekday of the first day eg. 4 for Thu
}

// ====================================================================================================================
// ============================================================================================================= EVENTS
// ====================================================================================================================

export interface PandaDatePickerChangeEvent {
	date: string;
}
