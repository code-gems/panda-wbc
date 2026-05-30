export type { PandaTimePicker } from "./src/panda-time-picker";
export type { PandaTimePickerClock } from "./src/panda-time-picker-clock";

export type PandaTimePickerI18nConfig = {
	pickerFormTitle: string;
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

export type PandaTimePickerChangeEvent = CustomEvent<{
	value: string | null;
	valueObject: {
		hours: number | null;
		minutes: number | null;
		seconds: number | null;
		period: TimePeriod | null;
	};
}>;