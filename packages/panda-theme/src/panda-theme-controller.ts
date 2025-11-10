// types
import {
	PandaThemeAccentColor,
	PandaThemeChangeEvent,
	PandaThemeDetails,
	PandaThemeGroup,
	PandaThemeMode,
	PandaThemeState,
} from "../index";

// themes
import { pandaThemeLight } from "./themes/panda-theme-light";
import { pandaThemeDark } from "./themes/panda-theme-dark";
import { lightAccentColors } from "./themes/panda-theme-light-accent-colors";
import { darkAccentColors } from "./themes/panda-theme-dark-accent-colors";

// utils
import { singleton, generateUuid } from "@panda-wbc/panda-utils";

// constants
const LOG_STYLES = "font-size: 16px; color: limegreen; background: black;";
const LOG_STYLES_WARN = "font-size: 16px; color: orange; background: black;";

class PandaThemeController {
	static instance: PandaThemeController | undefined;

	private readonly _defaultThemeGroupId!: string;
	private readonly _defaultThemeId!: string;
	private readonly _defaultThemeMode!: PandaThemeMode;
	private readonly _defaultAccentColorId!: string;
	private _themeGroups!: PandaThemeGroup[];
	private _selectedThemeGroupId!: string;
	private _selectedThemeId!: string;
	private _selectedThemeMode!: PandaThemeMode;
	private _selectedAccentColorId!: string;
	private _selectedBrowserThemeMode!: PandaThemeMode;
	private readonly _darkModeMediaQuery!: MediaQueryList;
	
	// subscription/callback list
	private readonly _callbackList!: Map<string, any>;

	// events
	private readonly _deviceThemeChangeEvent!: any;

	// elements
	private _themeEl!: HTMLStyleElement | null;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================
	
	constructor() {
		if (PandaThemeController.instance) {
			return PandaThemeController.instance;
		}
		PandaThemeController.instance = this;
		// initialize properties
		this._themeGroups = [{
			id: "panda-theme",
			name: "Panda Theme",
			light: {
				id: "panda-theme-light",
				name: "Light Theme",
				theme: pandaThemeLight,
				accentColors: lightAccentColors,
			},
			dark: {
				id: "panda-theme-dark",
				name: "Dark Theme",
				theme: pandaThemeDark,
				accentColors: darkAccentColors,
			},
		}];
		// set default values
		this._defaultThemeGroupId = "panda-theme";
		this._defaultThemeId = "panda-theme-light";
		this._defaultThemeMode = PandaThemeMode.LIGHT;
		this._defaultAccentColorId = "blue";

		this._selectedThemeGroupId = this._defaultThemeGroupId;
		this._selectedThemeId = this._defaultThemeId;
		this._selectedThemeMode = this._defaultThemeMode;
		this._selectedAccentColorId = this._defaultAccentColorId;
		this._darkModeMediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
		this._selectedBrowserThemeMode = this._getBrowserThemeMode();
		this._callbackList = new Map();

		// initialize events
		this._deviceThemeChangeEvent = this._onDeviceThemeChange.bind(this);

		// add event listeners
		this._darkModeMediaQuery.addEventListener("change", this._deviceThemeChangeEvent);
		
		// update accent color metadata
		this._updateThemeMetadata();

		// get theme element handle
		this._themeEl = document.querySelector("[panda-theme]");

		// apply default theme
		this._applyTheme();
	}

	static getInstance() {
		PandaThemeController.instance ??= new PandaThemeController();
		return PandaThemeController.instance;
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	/** Get all registered theme groups */
	public getThemeGroups(): PandaThemeGroup[] {
		return this._themeGroups;	
	}

	/**
	 * Register a new theme group.
	 * @param themeGroup The theme group to register.
	 */
	public registerThemeGroup(themeGroup: PandaThemeGroup): void {
		// check if group already exists
		let existingThemeGroup = this._themeGroups.find(({ id }) => id === themeGroup.id);
		// if theme group exists, update its styles
		if (existingThemeGroup) {
			console.log(
				"%c ⚠️ [PANDA THEME CONTROLLER] (registerThemeGroup) Theme group already registered! Updating group!",
				LOG_STYLES_WARN,
				themeGroup.name
			);

			this._themeGroups = this._themeGroups.map((group) => {
				if (group.name === themeGroup.name) {
					return {
						...group,
						light: themeGroup.light ?? null,
						dark: themeGroup.dark ?? null,
					};
				}
				return group;
			});
		} else {
			// add new theme group
			this._themeGroups.push(themeGroup);
			console.log(
				`%c ⚡ [PANDA THEME CONTROLLER] (registerThemeGroup) Registered new theme group: ${themeGroup.name}`,
				LOG_STYLES
			);
		}
		// update accent color metadata
		this._updateThemeMetadata();
	}

	/** Get currently selected theme group id */
	public getThemeGroupId(): string {
		return this._selectedThemeGroupId;
	}

	/**
	 * Change theme group id and apply new theme.
	 * @param themeGroupId new theme group id to be selected
	 */
	public setThemeGroupId(themeGroupId: string): void {
		const thisThemeGroup = this._themeGroups.find(({ id }) => id === themeGroupId);
		if (thisThemeGroup) {
			this._selectedThemeGroupId = themeGroupId;
			// get them mode
			const finalThemeMode = this._getFinalThemeMode();
			
			// update themeId and accentColorId after group change
			if (finalThemeMode === PandaThemeMode.LIGHT) {
				this._selectedThemeId = thisThemeGroup.light.id;
				this._selectedAccentColorId = thisThemeGroup.light.accentColors[0].id;
			} else {
				this._selectedThemeId = thisThemeGroup.dark.id;
				this._selectedAccentColorId = thisThemeGroup.dark.accentColors[0].id;
			}

			// apply theme
			this._applyTheme();
		} else {
			console.log(
				`%c ⚠️ [PANDA THEME CONTROLLER] (setThemeGroupId) Theme group not registered! "${themeGroupId}"`,
				LOG_STYLES_WARN
			);
		}
	}

	/**
	 * Change selected theme id.
	 * [IMPORTANT] This method is deprecated and will be removed. 
	 * By right theme id should only be changed internally by controller upon theme mode change
	 * @deprecated
	 */
	public setThemeId(themeId: string): void {
		// find theme group this themeId belongs to
		const thisThemeGroup = this._getThemeGroupById(themeId);
		if (thisThemeGroup) {
			this._selectedThemeId = themeId;
			this._applyTheme();
		} else {
			console.log(
				`%c ⚠️ [PANDA THEME CONTROLLER] Theme id not registered! ${themeId}`,
				LOG_STYLES_WARN
			);
		}
	}

	public getAccentColorId(): string {
		return this._selectedAccentColorId;
	}

	/**
	 * Change the accent color id of the current theme and apply it to current theme.
	 * @param accentColorId new accent color id
	 */
	public setAccentColorId(accentColorId: string): void {
		// check if value changed
		if (accentColorId === this._selectedAccentColorId) {
			return;
		}
		// check if accent color exists
		const selectedThemeOption = this._getSelectedTheme();
		const thisAccentColor = selectedThemeOption?.accentColors.find((color) => color.id === accentColorId);

		if (thisAccentColor) {
			this._selectedAccentColorId = thisAccentColor.id;
			this._applyTheme();
		} else {
			console.warn(
				`%c ⚠️ [PANDA THEME CONTROLLER] (setAccentColor) Accent color with id "${accentColorId}" not found in the current theme.`,
				LOG_STYLES_WARN
			);
		}
	}

	/**
	 * Get list of accent colors for currently selected theme
	 * @returns list of accent colors defined for current theme
	 */
	public getAvailableAccentColors(): PandaThemeAccentColor[] {
		const selectedThemeGroup = this._getSelectedTheme();
		return selectedThemeGroup?.accentColors ?? [];
	}

	/** Get currently selected theme mode */
	public getThemeMode(): PandaThemeMode {
		return this._selectedThemeMode;
	}

	/**
	 * Change current theme mode for selected theme group and apply it.
	 * @param themeMode new theme mode
	 */
	public setThemeMode(themeMode: PandaThemeMode): void {
		// check if value changed
		if (themeMode === this._selectedThemeMode && themeMode !== PandaThemeMode.SYSTEM) {
			return;
		}
		const thisThemeGroup = this._getThemeGroup();
		// check if theme group exist
		if (thisThemeGroup) {
			switch (themeMode) {
				case PandaThemeMode.LIGHT:
				case PandaThemeMode.DARK:
					// update theme id
					this._selectedThemeId = thisThemeGroup[themeMode]?.id;
					break;
				case PandaThemeMode.SYSTEM: {
					// update browser theme mode
					this._selectedBrowserThemeMode = this._getBrowserThemeMode();
					const systemThemeMode = this._selectedBrowserThemeMode === PandaThemeMode.LIGHT
						? PandaThemeMode.LIGHT
						: PandaThemeMode.DARK;
					// update theme id
					this._selectedThemeId = thisThemeGroup[systemThemeMode]?.id;
					break;
				}
				default:
					console.log(
						`%c ⚠️ [PANDA THEME CONTROLLER] (setThemeMode) Invalid theme mode: "${themeMode}"`,
						LOG_STYLES_WARN
					);
					break;
			}
			this._selectedThemeMode = themeMode;
			// update accent color id after change
			this._updateAccentColorId();
			this._applyTheme();
		} else {
			console.log(
				`%c ⚠️ [PANDA THEME CONTROLLER] (setThemeMode) Theme group not defined! ${this._selectedThemeGroupId}`,
				LOG_STYLES_WARN
			);
		}
	}

	/**
	 * Register callback function for theme state changes.
	 * @param callback function to be called when theme state changed
	 */
	public subscribe(callback: any): string {
		const callbackId = generateUuid();
		// add subscription
		this._callbackList.set(callbackId, callback);

		// initial call to callback function with current theme state
		if (callback && typeof callback === "function") {
			const themeState: PandaThemeState = {
				themeGroupId: this._selectedThemeGroupId,
				themeId: this._selectedThemeId,
				themeMode: this._selectedThemeMode,
				finalThemeMode: this._getFinalThemeMode(),
				accentColorId: this._selectedAccentColorId,
			};
			callback(themeState);
		}
		return callbackId;
	}

	/**
	 * Remove subscription for theme state updates.
	 * @param callbackId callback id to unsubscribe from updates
	 */
	public unsubscribe(callbackId: string): void {
		// remove subscription
		this._callbackList.delete(callbackId);
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _applyTheme(): void {
		const selectedThemeOption = this._getSelectedTheme();
		if (selectedThemeOption) {
			// aggregate all styles
			const allStyles: string[] = [];
			// get accent color styles
			const accentColorsStyles = selectedThemeOption.accentColors.find((color) => color.id === this._selectedAccentColorId)?.theme.toString() ?? "";
			// add main stylesheet
			allStyles.push(selectedThemeOption.theme.toString());
			// add accent colors
			allStyles.push(accentColorsStyles);

			// check support for StyleSheets
			if (document.adoptedStyleSheets) {
				// modern browsers
				const themeStyles = new CSSStyleSheet();
				// apply stylesheet
				themeStyles.replaceSync(allStyles.join(" "));
				document.adoptedStyleSheets = [themeStyles];
			} 
			else if (this._themeEl) { // check if theme element exists
				this._themeEl.innerHTML = allStyles.join(" ");
				this._themeEl.setAttribute("data-theme-id", this._selectedThemeId);
				this._themeEl.setAttribute("data-accent-colors", this._selectedAccentColorId);
			} else {
				this._themeEl = document.createElement("style");
				this._themeEl.innerHTML = allStyles.join(" ");
				this._themeEl.setAttribute("panda-theme", "");
				this._themeEl.setAttribute("data-theme-id", this._selectedThemeId);
				this._themeEl.setAttribute("data-accent-colors", this._selectedAccentColorId);
				document.head.appendChild(this._themeEl);
			}
			// trigger theme change event
			this._triggerThemeChangeEvent();
			// notify subscribers
			this._notify();
		} else {
			console.warn(
				`%c ⚠️ [PANDA THEME CONTROLLER] (applyTheme) Theme option with id "${this._selectedThemeId}" not found.`,
				LOG_STYLES_WARN
			);
		}
	}

	/**
	 * Get browser theme mode
	 * @returns browser theme mode
	 */
	private _getBrowserThemeMode(): PandaThemeMode {
		const isLightMode = globalThis.matchMedia && globalThis.matchMedia("(prefers-color-scheme: light)");
		const isDarkMode = globalThis.matchMedia && globalThis.matchMedia("(prefers-color-scheme: dark)");

		if (isLightMode.matches) {
			return PandaThemeMode.LIGHT;
		}
		if (isDarkMode.matches) {
			return PandaThemeMode.DARK;
		}
		return PandaThemeMode.SYSTEM;
	}

	/** Get currently selected theme group object */
	private _getThemeGroup(): PandaThemeGroup | undefined {
		return this._themeGroups.find(({ id }) => id === this._selectedThemeGroupId);
	}

	/**
	 * Get currently selected theme details object.
	 * @returns theme details or null
	 */
	private _getSelectedTheme(): PandaThemeDetails | null {
		const thisThemeGroup = this._getThemeGroup();
		const finalThemeMode = this._getFinalThemeMode();
		return finalThemeMode === PandaThemeMode.LIGHT
			? thisThemeGroup?.light || null
			: thisThemeGroup?.dark || null;
	}

	/**
	 * Get selected theme mode or browser theme mode in case
	 * selected theme mode falls back to browser settings.
	 * @returns either light or dark theme mode value
	 */
	private _getFinalThemeMode(): PandaThemeMode {
		this._selectedBrowserThemeMode = this._getBrowserThemeMode();
		return this._selectedThemeMode === PandaThemeMode.SYSTEM
			? this._selectedBrowserThemeMode
			: this._selectedThemeMode;
	}

	private _getThemeGroupById(themeId: string): PandaThemeGroup | null {
		let themeGroup: PandaThemeGroup | null = null;
		if (themeId) {
			this._themeGroups.forEach((group) => {
				if (group.light.id === themeId || group.dark.id === themeId) {
					themeGroup = group;
				}
			});
		}
		return themeGroup;
	}

	private _triggerThemeChangeEvent(): void {
		const selectedThemeOption = this._getSelectedTheme();
		const event: PandaThemeChangeEvent = new CustomEvent("panda-theme-change", {
			detail: {
				themeGroupId: this._selectedThemeGroupId,
				themeId: this._selectedThemeId,
				themeMode: this._selectedThemeMode,
				accentColorId: this._selectedAccentColorId,
				// legacy props
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

		return match?.[1]?.trim() ?? null;
	}

	/** Update the metadata for all theme groups. */
	private _updateThemeMetadata(): void {
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

	/**
	 * Update accentColorId after theme mode changed.
	 * Retain accent color if possible.
	 */
	private _updateAccentColorId(): void {
		const selectedThemeOption = this._getSelectedTheme();
		if (selectedThemeOption) {
			const accentColors = selectedThemeOption.accentColors ?? [];
			// check if currently selected accent color id exists among accent colors after theme group/theme mode change
			const thisAccentColor = accentColors.find(({ id }) => id === this._selectedAccentColorId);
			if (!thisAccentColor) {
				this._selectedAccentColorId = accentColors[0].id;
				console.log(
					`%c 🧪 [PANDA THEME CONTROLLER] (_updateAccentColorId) Theme accent color id not found! defaulting to first accent color!" ${this._selectedAccentColorId}"`,
					LOG_STYLES_WARN
				);
			}
		}
	}

	/** Notify all subscribed classes about theme state update */
	private _notify(): void {
		this._callbackList.forEach((callback) => {
			if (callback && typeof callback === "function") {
				const themeState: PandaThemeState = {
					themeGroupId: this._selectedThemeGroupId,
					themeId: this._selectedThemeId,
					themeMode: this._selectedThemeMode,
					finalThemeMode: this._getFinalThemeMode(),
					accentColorId: this._selectedAccentColorId,
				};
				callback(themeState);
			}
		});
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onDeviceThemeChange(): void {
		// check if theme mode is SYSTEM and handle the change
		if (this._selectedThemeMode === PandaThemeMode.SYSTEM) {
			this.setThemeMode(PandaThemeMode.SYSTEM);
		}
	}
}

// exports
export const pandaThemeController = singleton("pandaThemeController", () => new PandaThemeController());
export default pandaThemeController;

// register as global variable
(window as any).pandaThemeController = pandaThemeController;

/**
 * Adding onThemeChange() callback to component class.
 * Triggered each time theme changes.
 */
export const themeWatch = () => {
	return (target: any): typeof target => {
		return class extends target {
			connectedCallback() {
				this.__safeInvoke(super.connectedCallback);
				// define theme change callback
				const callback = (themeState: PandaThemeState) => {
					// update class callback method with current theme state
					this.__safeInvoke(super.onThemeChange, themeState);
				}
				// register callback function
				this.__callbackId = pandaThemeController.subscribe(callback);
			}

			disconnectedCallback() {
				pandaThemeController.unsubscribe(this.__callbackId);
				this.__safeInvoke(super.disconnectedCallback);
			}

			__safeInvoke(fn: any, ...args: any[]) {
				if (fn) {
					fn.bind(this)(...args);
				}
			}
		}
	}
}