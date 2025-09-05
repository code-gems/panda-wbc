export const enum Theme {
	SYSTEM = "system",
	DARK = "dark",
	LIGHT = "light"
}

export interface PandaThemeSelectI18nConfig {
	light: string;
	dark: string;
	system: string;
}

// ====================================================================================================================
// EVENT ==============================================================================================================
// ====================================================================================================================

export type PandaThemeSelectChangeEventDetails = {
	theme: string;
}

export interface PandaThemeSelectChangeEvent extends CustomEvent<PandaThemeSelectChangeEventDetails> {}