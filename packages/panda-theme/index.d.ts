import { CSSResult } from "lit";

export interface PandaThemeOption {
	id: string; // unique value
	name: string; // theme option name eg.: "Dark"
	theme: string | CSSResult;
}

export interface PandaThemeGroup {
	groupName: string; // theme group name eg.: "Panda Theme"
	options: PandaThemeOption[];
}
