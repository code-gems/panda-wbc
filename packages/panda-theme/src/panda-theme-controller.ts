// types
import { PandaThemeChangeEvent, PandaThemeGroup, PandaThemeDetails, PandaThemeAccentColor } from "../index";

// themes
import { pandaThemeLight } from "./themes/panda-theme-light";
import { pandaThemeDark } from "./themes/panda-theme-dark";
import { pandaAccentColors } from "./themes/panda-theme-accent-colors";

// utils
import { singleton } from "@panda-wbc/panda-utils";

class PandaThemeController {
	static instance: PandaThemeController | undefined;

	private readonly _defaultTheme!: string;
	private readonly _defaultAccentColor!: string;
	private _themeGroups!: PandaThemeGroup[];
	private _selectedTheme!: string;
	private _selectedAccentColor!: string;

	// elements
	private _themeEl!: HTMLStyleElement | null;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================
	
	constructor(defaultThemeId: string | null = null) {
		if (PandaThemeController.instance) {
			return PandaThemeController.instance;
		}
		PandaThemeController.instance = this;
		// initialize properties
		this._defaultTheme = defaultThemeId ?? "panda-theme-light";
		this._defaultAccentColor = "panda-accent-color-blue";
		this._selectedTheme = this._defaultTheme;
		this._selectedAccentColor = this._defaultAccentColor;

		// get theme element handle
		this._themeEl = document.querySelector("[panda-theme]");

		this._themeGroups = [{
			groupName: "Panda Theme",
			light: {
				id: "panda-theme-light",
				name: "Light",
				theme: pandaThemeLight,
				accentColors: pandaAccentColors,
			},
			dark: {
				id: "panda-theme-dark",
				name: "Dark",
				theme: pandaThemeDark,
				accentColors: pandaAccentColors,
			}
		}];
		// update accent color metadata
		this._updateAccentColorMetadata();
		// apply default theme
		this.applyTheme(this._defaultTheme);
	}

	static getInstance() {
		PandaThemeController.instance ??= new PandaThemeController();
		return PandaThemeController.instance;
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public getThemeList(): PandaThemeGroup[] {
		// deep clone themes
		return JSON.parse(JSON.stringify(this._themeGroups));	
	}

	public applyTheme(optionId: string): void {
		const selectedThemeOption = this._getThemeById(optionId);
		if (selectedThemeOption) {
			// update selected option id
			this._selectedTheme = optionId;
					
			// check support for StyleSheets
			if (document.adoptedStyleSheets) {
				// modern browsers
				const themeStyles = new CSSStyleSheet();
				const accentColorsStyles = selectedThemeOption.accentColors.find((color) => color.id === this._selectedAccentColor)?.theme.toString() ?? "";
				const allStyles = selectedThemeOption.theme.toString() + accentColorsStyles;
				themeStyles.replaceSync(allStyles);
				document.adoptedStyleSheets = [themeStyles];
			} 
			else if (this._themeEl) { // check if theme element exists
				this._themeEl.innerHTML = selectedThemeOption.theme.toString();
				this._themeEl.setAttribute("data-theme", optionId);
			} else {
				this._themeEl = document.createElement("style");
				this._themeEl.innerHTML = selectedThemeOption.theme.toString();
				this._themeEl.setAttribute("panda-theme", "");
				this._themeEl.setAttribute("data-theme", optionId);
				document.head.appendChild(this._themeEl);
			}
			// trigger theme change event
			this._triggerThemeChangeEvent();
		} else {
			console.warn(
				"%c ⚠️ [PANDA THEME CONTROLLER] applyTheme()",
				"font-size: 16px;",
				`Theme option with id "${optionId}" not found.`
			);
		}
	}

	/**
	 * Register a new theme group.
	 * @param themeGroup The theme group to register.
	 */
	public registerThemeGroup(themeGroup: PandaThemeGroup): void {
		// check if group already exists
		let existingThemeGroup = this._themeGroups.find(({ groupName }) => groupName === themeGroup.groupName);
		// if theme group exists, update its styles
		if (existingThemeGroup) {
			console.log(
				"%c [PANDA THEME CONTROLLER] registerThemeGroup() Updating existing group",
				"font-size: 16px; color: orange; background: black;",
				themeGroup.groupName
			);

			this._themeGroups = this._themeGroups.map((group) => {
				if (group.groupName === themeGroup.groupName) {
					return {
						...group,
						light: themeGroup.light ?? null,
						dark: themeGroup.dark ?? null,
					};
				}
				return group;
			});
			// update accent color metadata
			this._updateAccentColorMetadata();
		} else {
			// add new theme group
			this._themeGroups.push(themeGroup);
			console.log(
				"%c ⚡ [PANDA THEME CONTROLLER] registerThemeGroup()",
				"font-size: 16px; color: green; background: black;",
				`Added new theme group: ${themeGroup.groupName}`
			);
		}
	}

	/**
	 * Change the accent color of the current theme.
	 * @param accentColorId The id of the accent color to change to.
	 */
	public changeAccentColor(accentColorId: string): void {
		// check if accent color exists
		const selectedThemeGroup = this._getThemeById(this._selectedTheme);
		const thisAccentColor = selectedThemeGroup?.accentColors.find((color) => color.id === accentColorId);

		if (thisAccentColor) {
			this._selectedAccentColor = thisAccentColor.id;
			this.applyTheme(this._selectedTheme);
		} else {
			console.warn(
				"%c ⚠️ [PANDA THEME CONTROLLER] changeAccentColor()",
				"font-size: 16px;",
				`Accent color with id "${accentColorId}" not found in the current theme.`
			);
		}
	}

	public getAvailableAccentColors(): PandaThemeAccentColor[] {
		const selectedThemeGroup = this._getThemeById(this._selectedTheme);
		return selectedThemeGroup?.accentColors ?? [];
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _getThemeById(themeOptionId: string): PandaThemeDetails | null {
		let selectedThemeOption: PandaThemeDetails | null = null;
		if (themeOptionId) {
			this._themeGroups.forEach((group) => {
				if (group.light.id === themeOptionId) {
					selectedThemeOption = group.light;
				} else if (group.dark.id === themeOptionId) {
					selectedThemeOption = group.dark;
				}
			});
		}
		return selectedThemeOption;
	}

	private _triggerThemeChangeEvent(): void {
		const selectedThemeOption = this._getThemeById(this._selectedTheme);
		const event: PandaThemeChangeEvent = new CustomEvent("panda-theme-change", {
			detail: {
				id: selectedThemeOption?.id,
				name: selectedThemeOption?.name
			}
		});
		document.dispatchEvent(event);
	}

	/**
	 * Find the value of a CSS token in a stylesheet.
	 * @param {String} stylesheet The CSS stylesheet to search.
	 * @param {String} tokenName The name of the token to find.
	 * @returns {String|null} The value of the token, or null if not found.
	 */
	private _findTokenValue(stylesheet: string, tokenName: string): string | null {
		const regex = new RegExp(`${tokenName}:\\s*([^;]+);`);
		const match = regex.exec(stylesheet);

		if (match && match[1]) {
			return match[1].trim();
		}
		return null;
	}

	/** Update the metadata for accent colors in all themes. */
	private _updateAccentColorMetadata(): void {
		this._themeGroups.forEach((group) => {
			// update light theme accent color metadata
			group.light.accentColors.forEach((accentColor) => {
				accentColor.primaryColor = this._findTokenValue(accentColor.theme.toString(), "--panda-primary-color");
				accentColor.primaryTextColor = this._findTokenValue(accentColor.theme.toString(), "--panda-primary-text-color");
				accentColor.secondaryColor = this._findTokenValue(accentColor.theme.toString(), "--panda-secondary-color");
			});
			// update dark theme accent color metadata
			group.dark.accentColors.forEach((accentColor) => {
				accentColor.primaryColor = this._findTokenValue(accentColor.theme.toString(), "--panda-primary-color");
				accentColor.primaryTextColor = this._findTokenValue(accentColor.theme.toString(), "--panda-primary-text-color");
				accentColor.secondaryColor = this._findTokenValue(accentColor.theme.toString(), "--panda-secondary-color");
			});
		});
	}
}

// exports
export const pandaThemeController = singleton("pandaThemeController", () => new PandaThemeController());
export default pandaThemeController;

// register as global variable
(window as any).pandaThemeController = pandaThemeController;