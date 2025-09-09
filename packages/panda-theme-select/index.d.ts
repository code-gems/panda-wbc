export const enum PandaThemeMode {
	SYSTEM = "system",
	DARK = "dark",
	LIGHT = "light"
}

export type PandaThemeAccentColor = {
	id: string;
	primaryColor: string;
	primaryTextColor: string;
	secondaryColor?: string;
}

export interface PandaThemeSelectI18nConfig {
	lightHeaderText: string;
	lightHeaderIcon?: string;
	lightFooterText?: string;
	lightFooterDescription?: string;

	darkHeaderText: string;
	darkHeaderIcon?: string;
	darkFooterText?: string;
	darkFooterDescription?: string;

	systemHeaderText: string;
	systemHeaderIcon?: string;
	systemFooterText?: string;
	systemFooterDescription?: string;
}

// ====================================================================================================================
// EVENT ==============================================================================================================
// ====================================================================================================================

export type PandaThemeSelectChangeEventDetails = {
	theme: string;
}

export interface PandaThemeSelectChangeEvent extends CustomEvent<PandaThemeSelectChangeEventDetails> {}

export type PandaThemeAccentColorListChangeEventDetails = {
	selected: string;
}

export interface PandaThemeAccentColorListChangeEvent extends CustomEvent<PandaThemeAccentColorListChangeEventDetails> {}