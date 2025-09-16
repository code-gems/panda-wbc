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

export type PandaThemeModeChangeEventDetails = {
	themeMode: string;
}

export interface PandaThemeModeChangeEvent extends CustomEvent<PandaThemeModeChangeEventDetails> {}

export type PandaThemeAccentColorListChangeEventDetails = {
	accentColorId: string;
}

export interface PandaThemeAccentColorListChangeEvent extends CustomEvent<PandaThemeAccentColorListChangeEventDetails> {}