// types
import { PandaThemeSelectI18nConfig } from "../../index";

/**
 * Get the default internationalization (i18n) configuration.
 * @returns {PandaThemeSelectI18nConfig} The default i18n configuration.
 */
export const getDefaultI18nConfig = (): PandaThemeSelectI18nConfig => {
	return {
		lightHeaderText: "Light Theme",
		lightHeaderIcon: "sun",
		lightFooterText: "Light Mode",
		lightFooterDescription: "Bright and clear light color scheme for well-lit environments",

		darkHeaderText: "Dark Theme",
		darkHeaderIcon: "moon",
		darkFooterText: "Dark Mode",
		darkFooterDescription: "Eyes friendly dark color scheme for low light environments",

		systemHeaderText: "System Theme",
		systemHeaderIcon: "monitor",
		systemFooterText: "System Preference",
		systemFooterDescription: "This theme will fallback to your system settings.",
	};
}

// /**
//  * Get the CSS tokens for the theme group preview.
//  * @returns {String} The CSS tokens as a string.
//  */
// export const getThemeGroupPreviewTokens = (): string => {
// 	return ``;
// 	return `
// 		/* light theme preview tokens */
// 		--panda-theme-preview-app-border-color: hsl(0deg 0% 80%);
// 		--panda-theme-preview-app-background-color: hsl(0deg 0% 92%);
// 		--panda-theme-preview-background-color: hsl(0deg 0% 95%);
		
// 		--panda-theme-preview-content-border-color: hsl(0deg 0% 86%);
// 		--panda-theme-preview-content-color: hsl(0deg 0% 100%);
		
// 		--panda-theme-preview-sidebar-background-color: hsl(0deg 3% 22%);
// 		--panda-theme-preview-sidebar-item-color: hsl(0deg 3% 32%);
// 		--panda-theme-preview-sidebar-item-color-selected: hsl(0deg 3% 42%);
		
// 		--panda-theme-preview-button-color: hsl(0deg 0% 92%);
// 		--panda-theme-preview-button-primary-color: hsl(209deg 78% 46%);

// 		--panda-theme-preview-top-bar-background-color: hsl(0deg 0% 92%);
// 		--panda-theme-preview-top-bar-button-red: hsl(14deg 82% 53%);
// 		--panda-theme-preview-top-bar-button-yellow: hsl(50deg 99% 56%);
// 		--panda-theme-preview-top-bar-button-green: hsl(101deg 48% 51%);
		
// 		/* dark theme preview tokens */
// 		--panda-theme-preview-app-border-color-dark: hsl(274deg 30% 30%);
// 		--panda-theme-preview-app-background-color-dark: hsl(274deg 30% 20%);
// 		--panda-theme-preview-background-color-dark: hsl(274deg 30% 15%);
		
// 		--panda-theme-preview-content-color-dark: hsl(274deg 30% 30%);
// 		--panda-theme-preview-content-border-color-dark: hsl(275deg 31% 15%);

// 		--panda-theme-preview-sidebar-background-color-dark: hsl(274deg 30% 12%);
// 		--panda-theme-preview-sidebar-item-color-dark: hsl(274deg 30% 32%);
// 		--panda-theme-preview-sidebar-item-color-selected-dark: hsl(274deg 30% 42%);

// 		--panda-theme-preview-button-color-dark: hsl(274deg 30% 35%);
// 		--panda-theme-preview-button-primary-color-dark: hsl(344deg 100% 64%);

// 		--panda-theme-preview-top-bar-background-color-dark: hsl(274deg 30% 35%);
// 		--panda-theme-preview-top-bar-button-red-dark: hsl(14deg 82% 53%);
// 		--panda-theme-preview-top-bar-button-yellow-dark: hsl(50deg 99% 56%);
// 		--panda-theme-preview-top-bar-button-green-dark: hsl(101deg 48% 51%);
// 	`;
// };