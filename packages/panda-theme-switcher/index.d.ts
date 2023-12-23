import { PandaThemeSwitcher } from "./src/panda-theme-switcher";

export type PandaThemeSwitcher = typeof PandaThemeSwitcher;

export const enum PandaThemeSwitcherTheme {
	LIGHT = "light",
	DARK = "dark",
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export interface PandaThemeSwitcherToggleEventDetails {
	value: PandaSwitcherTheme;
}

export interface PandaThemeSwitcherToggleEvent extends CustomEvent<PandaThemeSwitcherToggleEventDetails> {}