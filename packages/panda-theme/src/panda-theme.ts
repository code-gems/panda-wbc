// types
export type PandaThemeItem = {
	name: string;
	value: string;
	url: string;
	theme: string;
}

// themes
import { pandaThemeLight } from "./themes/panda-theme-light";

// utils
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-theme")
export class PandaTheme extends LitElement {

	@property({ type: String, attribute: true })
	theme!: string;

	private readonly _themeList: PandaThemeItem[] = [
		{ name: "Panda Theme Light", value: "panda-theme-light", url: "./theme/panda-theme-light.css", theme: pandaThemeLight },
		{ name: "Panda Theme Dark", value: "panda-theme-dark", url: "./theme/panda-theme-dark.css", theme: pandaThemeLight }
	];

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	protected firstUpdated(_changedProperties: Map<string, any>) {
		// init theme
		this._applyTheme();
	}

	protected updated(_changedProperties: Map<string, any>) {
		if (_changedProperties.has("theme") && this.theme) {
			this._applyTheme();
		}
	}

	// ================================================================================================================
	// ============================================================================================================ API
	// ================================================================================================================

	public getThemeList(): PandaThemeItem[] {
		return this._themeList;
	}

	// ================================================================================================================
	// ======================================================================================================== HELPERS
	// ================================================================================================================

	private _applyTheme() {
		// extract theme
		const themeEl = document.createElement("style");
		themeEl.innerHTML = pandaThemeLight;
		document.head.appendChild(themeEl);
	}
}