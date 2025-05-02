export interface PandaThemeOption {
	id: string; // unique value eg. panda-theme-dark
	name: string; // theme option name eg.: "Dark"
	theme: string; // css string
}

export interface PandaThemeGroup {
	groupName: string; // theme group name eg.: "Panda Theme"
	options: PandaThemeOption[];
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export interface PandaThemeChangeEventDetail {
	id: string | undefined; // selected theme id
	name: string | undefined; // selected theme name
}

export interface PandaThemeChangeEvent extends CustomEvent<PandaThemeChangeEventDetail> {}