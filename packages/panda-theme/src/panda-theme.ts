// types
import { PandaThemeGroup } from "../index";

// utils
import pandaThemeController from "./panda-theme-controller";

export class PandaTheme extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = ["theme"];

	private _theme!: string;

	get theme(): string {
		return this._theme;
	}

	set theme(value: string) {
		if (this._theme !== value) {
			this._theme = value;
			this.setAttribute("theme", this._theme); // reflect to attribute
			pandaThemeController.applyTheme(this._theme);
		}
	}

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		// init theme
		pandaThemeController.initialize(this.theme);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "theme") {
			this._theme = _newValue;
			pandaThemeController.applyTheme(this._theme);
		}
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public getThemeList(): PandaThemeGroup[] {
		return pandaThemeController.getThemeList();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme": PandaTheme;
	}
}

// Register the custom element
if (!customElements.get("panda-theme")) {
	customElements.define("panda-theme", PandaTheme);
}

// Export mixins
export * from "./mixins";