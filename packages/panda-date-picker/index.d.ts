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
	date: Date | null;
	unix: number | null;
	day: number | null;
	month: number | null;
	year: number | null;
}

// ====================================================================================================================
// ============================================================================================================= EVENTS
// ====================================================================================================================

export interface PandaDatePickerChangeEvent {
	date: string;
}
