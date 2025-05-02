// types
import { PandaThemeChangeEvent, PandaThemeGroup, PandaThemeOption } from "../index";

// themes
import { pandaThemeLight } from "./themes/panda-theme-light";
import { pandaThemeDark } from "./themes/panda-theme-dark";

class PandaThemeController {
	static instance: any;
	private _selectedOptionId!: string;
	private readonly _defaultOptionId!: string;
	private readonly _themeGroups!: PandaThemeGroup[];
	
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
		// set default theme
		this._themeEl = document.querySelector("panda-theme") as HTMLStyleElement | null;
		
		this._selectedOptionId = "panda-theme-light";
		this._defaultOptionId = "panda-theme-light";
		this._themeGroups = [
			{
				groupName: "Panda Theme",
				options: [
					{
						id: "panda-theme-light",
						name: "Light",
						theme: pandaThemeLight
					},
					{
						id: "panda-theme-dark",
						name: "Dark",
						theme: pandaThemeDark
					},
				]
			}
		];
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public initialize(optionId: string | null = null): void {
		// get styles element handle
		this._themeEl = this._getStyleElement();
		// add theme to the header
		this.applyTheme(optionId ?? this._defaultOptionId);
	}

	public getThemeList(): PandaThemeGroup[] {
		// deep clone themes
		return JSON.parse(JSON.stringify(this._themeGroups));	
	}

	public applyTheme(optionId: string): void {
		const selectedThemeOption = this._getThemeOptionById(optionId);
		if (selectedThemeOption) {
			// update selected option id
			this._selectedOptionId = optionId;
			// check if theme element is available
						
			if (this._themeEl) {
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
			console.log(
				"%c ⚠️ [PANDA THEME CONTROLLER] applyTheme()",
				"font-size: 16px; color: crimson; background: black;",
				`Theme option with id "${optionId}" not found.`
			);
		}
	}

	public registerThemeGroup(themeGroup: PandaThemeGroup): void {
		// check if group already exists
		const existingThemeGroup = this._themeGroups.find(({ groupName }) => groupName === themeGroup.groupName);
		// if theme group exists, update its styles
		if (existingThemeGroup) {
			console.log(
				
				"%c [PANDA THEME CONTROLLER] registerThemeGroup()",
				"font-size: 16px; color: orange; background: black;",
				themeGroup.groupName
			);
			
			existingThemeGroup.options = themeGroup.options;
		} else {
			// add new theme group
			this._themeGroups.push(themeGroup);
			console.log(
				"%c [PANDA THEME CONTROLLER] registerThemeGroup()",
				"font-size: 16px; color: orange; background: black;",
				`Added new theme group: ${themeGroup.groupName}`
			);
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _getStyleElement(): HTMLStyleElement | null {
		return document.querySelector("[panda-theme]") as HTMLStyleElement;
	}

	private _getThemeOptionById(themeOptionId: string): PandaThemeOption | null {
		let selectedThemeOption: PandaThemeOption | null = null;
		if (themeOptionId) {
			this._themeGroups.forEach((themeGroup) => {
				themeGroup.options.forEach((themeOption) => {
					if (themeOption.id === themeOptionId) {
						selectedThemeOption = themeOption;
					}
				});
			});
		}
		return selectedThemeOption;
	}

	private _triggerThemeChangeEvent(): void {
		const selectedThemeOption = this._getThemeOptionById(this._selectedOptionId);
		const event: PandaThemeChangeEvent = new CustomEvent("panda-theme-change", {
			detail: {
				id: selectedThemeOption?.id,
				name: selectedThemeOption?.name
			}
		});
		document.dispatchEvent(event);
	}
}

// exports
export const pandaThemeController = new PandaThemeController();
export default pandaThemeController;

// register as global variable
(window as any).pandaThemeController = pandaThemeController;