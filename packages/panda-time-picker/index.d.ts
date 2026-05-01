export type PandaTimePickerI18nConfig = {
	hourPlaceholder: string;
	minutePlaceholder: string;
	secondPlaceholder: string;
	periodPlaceholder: string;
	am: string;
	pm: string;
}

export type PandaTimePickerView = "hours" | "minutes" | "seconds";

export type PandaTimePickerTimeFormat = "12" | "24";