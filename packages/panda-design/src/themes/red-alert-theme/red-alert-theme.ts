// types
import { PandaThemeGroup } from "@panda-wbc/panda-theme";

// import themes
import { themeLight } from "./theme/them-light";
import { themeDark } from "./theme/theme-dark";

// import accent colors
import { lightAccentColors } from "./theme/accent-colors-light";
import { darkAccentColors } from "./theme/accent-colors-dark";

export const redAlertTheme: PandaThemeGroup = {
	id: "red-alert-theme",
	name: "Red Alert Theme",
	light: {
		id: "red-alert-theme-light",
		name: "Light Theme",
		theme: themeLight,
		accentColors: lightAccentColors,
	},
	dark: {
		id: "red-alert-theme-dark",
		name: "Dark Theme",
		theme: themeDark,
		accentColors: darkAccentColors,
	},
}