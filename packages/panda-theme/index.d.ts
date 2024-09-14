import { CSSResult } from "lit";

export interface PandaThemeOption {
	id: string; // unique value eg. panda-theme-dark
	name: string; // theme option name eg.: "Dark"
	theme: string | CSSResult; // theme css
}

export interface PandaThemeGroup {
	groupName: string; // theme group name eg.: "Panda Theme"
	options: PandaThemeOption[];
}
