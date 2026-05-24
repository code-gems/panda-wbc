export type { PandaTimePicker } from "./src/panda-time-picker";
export type { PandaTimePickerClock } from "./src/panda-time-picker-clock";

export type PandaTimePickerI18nConfig = {
	okButtonLabel: string;
	cancelButtonLabel: string;
	
	hourPlaceholder: string;
	minutePlaceholder: string;
	secondPlaceholder: string;
	periodPlaceholder: string;
}

export type PandaTimePickerView = "hours" | "minutes" | "seconds";

export type PandaTimePickerTimeFormat = "12" | "24";

// EVENTS =====================================================================

type PandaTimePickerChangeEventDetail = {
	value: string | null;
	valueObject: {
		hours: number | null;
		minutes: number | null;
		seconds: number | null;
		period: TimePeriod | null;
	};
}

export interface PandaTimePickerChangeEvent extends CustomEvent<PandaTimePickerChangeEventDetail> {}