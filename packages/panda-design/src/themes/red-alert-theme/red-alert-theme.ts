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
	description: "A theme group inspired by the iconic Red Alert game.",
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
	previewTokens: `
		:host {
			/* light theme preview tokens */
			--panda-theme-preview-app-border-color: hsl(345deg 86% 25%);
			--panda-theme-preview-app-background-color: hsl(345deg 86% 54%);
			--panda-theme-preview-background-color: hsl(345deg 86% 46%);
			
			--panda-theme-preview-content-border-color: hsl(345deg 86% 38%);
			--panda-theme-preview-content-color: hsl(344deg 100% 64%);
						
			--panda-theme-preview-sidebar-item-color: hsl(345deg 86% 29%);
			--panda-theme-preview-sidebar-item-color-selected: hsl(345deg 86% 24%);
			--panda-theme-preview-sidebar-background-color: hsl(345deg 86% 34%);
			
			--panda-theme-preview-button-color: hsl(345deg 86% 46%);
			--panda-theme-preview-button-primary-color: hsl(36deg 100% 50%);

			--panda-theme-preview-top-bar-background-color: hsl(345deg 86% 44%);
			--panda-theme-preview-top-bar-button-red: hsl(345deg 86% 66%);
			--panda-theme-preview-top-bar-button-yellow: hsl(36deg 100% 50%);
			--panda-theme-preview-top-bar-button-green: hsl(101deg 48% 51%);

			/* dark theme preview tokens */
			--panda-theme-preview-app-border-color-dark: hsl(274deg 30% 30%);
			--panda-theme-preview-app-background-color-dark: hsl(274deg 30% 20%);
			--panda-theme-preview-background-color-dark: hsl(274deg 30% 15%);
			
			--panda-theme-preview-content-border-color-dark: hsl(275deg 31% 15%);
			--panda-theme-preview-content-color-dark: hsl(274deg 30% 30%);
			
			--panda-theme-preview-sidebar-background-color-dark: hsl(274deg 30% 12%);
			--panda-theme-preview-sidebar-item-color-dark: hsl(274deg 30% 32%);
			--panda-theme-preview-sidebar-item-color-selected-dark: hsl(274deg 30% 42%);
			
			--panda-theme-preview-button-color-dark: hsl(274deg 30% 40%);
			--panda-theme-preview-button-primary-color-dark: hsl(344deg 100% 64%);

			--panda-theme-preview-top-bar-background-color-dark: hsl(274deg 30% 35%);
			--panda-theme-preview-top-bar-button-red-dark: hsl(14deg 82% 53%);
			--panda-theme-preview-top-bar-button-yellow-dark: hsl(50deg 99% 56%);
			--panda-theme-preview-top-bar-button-green-dark: hsl(101deg 48% 51%);
		}
	`,
}