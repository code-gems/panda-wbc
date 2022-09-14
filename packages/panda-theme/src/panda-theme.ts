// types
export type PandaThemeItem = {
	group: string;
	name: string;
	value: string;
	theme: string | CSSResult;
}

// themes
import { pandaThemeLight } from "./themes/panda-theme-light";

// utils
import { CSSResult, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-theme")
export class PandaTheme extends LitElement {

	@property({ type: String, attribute: true })
	theme!: string;

	private readonly _themeList: PandaThemeItem[] = [
		{ group: "Panda Theme", name: "Light", value: "panda-theme-light", theme: pandaThemeLight },
		{ group: "Panda Theme", name: "Dark", value: "panda-theme-dark", theme: pandaThemeLight }
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
		themeEl.innerHTML = pandaThemeLight.toString();
		document.head.appendChild(themeEl);
	}
}

// Export mixins
export * from "./mixins";

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme": PandaTheme;
	}
}
