export const enum Theme {
	SYSTEM = "system",
	DARK = "dark",
	LIGHT = "light"
}

export type PandaThemeSelectChangeEventDetails = {
	theme: string;
}

export interface PandaThemeSelectChangeEvent extends CustomEvent<PandaThemeSelectChangeEventDetails> {}