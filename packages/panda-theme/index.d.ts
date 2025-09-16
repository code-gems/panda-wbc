export const enum PandaThemeMode {
	DARK = "dark",
	LIGHT = "light",
	SYSTEM = "system",
}

export type PandaThemeState = {
	themeGroupId: string;
	themeId: string;
	themeMode: PandaThemeMode;
	finalThemeMode: PandaThemeMode;
	accentColorId: string;
}

export type PandaThemeAccentColor = {
	id: string; // unique value eg. panda-theme-accent-red
	name: string; // accent color name eg.: "Crimson Red"
	theme: string; // css string
	// accent color metadata
	primaryColor?: string | null; // primary color value eg.: "#ff0000"
	primaryTextColor?: string | null; // primary text color value eg.: "#ff0000"
	secondaryColor?: string | null; // secondary color value eg.: "#00ff00"
};

export interface PandaThemeDetails {
	id: string; // unique value eg. panda-theme-dark
	name: string; // theme option name eg.: "Dark"
	theme: string; // css string
	accentColors: PandaThemeAccentColor[];
}

export interface PandaThemeGroup {
	id: string;
	name: string; // theme group name eg.: "Panda Theme"
	light: PandaThemeDetails;
	dark: PandaThemeDetails;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export interface PandaThemeChangeEventDetail {
	themeGroupId: string;
	themeId: string;
	themeMode: string;
	accentColorId: string;

	// legacy props
	/** @deprecated */
	id: string | undefined; // selected theme id
	/** @deprecated */
	name: string | undefined; // selected theme name
}

export interface PandaThemeChangeEvent extends CustomEvent<PandaThemeChangeEventDetail> {}