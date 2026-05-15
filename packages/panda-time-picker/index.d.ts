export type { PandaTimePicker } from "./src/panda-time-picker";
export type { PandaTimePickerClock } from "./src/panda-time-picker-clock";

export type PandaTimePickerI18nConfig = {
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
}

export interface PandaTimePickerChangeEvent extends CustomEvent<PandaTimePickerChangeEventDetail> {}