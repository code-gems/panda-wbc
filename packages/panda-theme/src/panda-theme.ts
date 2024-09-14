// types
import { PandaThemeGroup } from "../index";

// themes
import { pandaThemeLight } from "./themes/panda-theme-light";
import { pandaThemeDark } from "./themes/panda-theme-dark";

// utils
import { LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-theme")
export class PandaTheme extends LitElement {

	@property({ type: String, attribute: true })
	theme!: string;

	// theme element
	private _themeEl!: HTMLStyleElement;

	private readonly _themeList: PandaThemeGroup[] = [
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

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		// init theme
		this._applyTheme();
	}

	protected updated(_changedProperties: PropertyValues): void {
		if (_changedProperties.has("theme") && this.theme) {
			this._applyTheme();
		}
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public getThemeList(): PandaThemeGroup[] {
		return this._themeList;
	}

	public registerTheme(themeGroup: PandaThemeGroup): void {
		this._themeList.push(themeGroup);
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _getThemeString(themeOptionId: string): string {
		let themeString: string = "";

		if (themeOptionId) {
			this._themeList.forEach((themeGroup) => {
				themeGroup.options.forEach((themeOption) => {
					if (themeOption.id === themeOptionId) {
						themeString = themeOption.theme.toString();
					}
				});
			});
		}
		return themeString;
	}

	private _applyTheme() {
		// check if theme element exists
		if (this._themeEl) {
			this._themeEl.innerHTML = this._getThemeString(this.theme);
		} else {
			this._themeEl = document.createElement("style");
			this._themeEl.setAttribute("panda-theme", "");
			this._themeEl.innerHTML = this._getThemeString(this.theme);
			document.head.appendChild(this._themeEl);
		}
	}
}

// Export mixins
export * from "./mixins";

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme": PandaTheme;
	}
}
