// utils
import pandaThemeController from "./panda-theme-controller";

export class PandaTheme extends HTMLElement {
	/** component version */
	static readonly version: string = "1.0.0";

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
		}
	}

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	attributeChangedCallback(_name: string, _oldValue: string, _newValue: string): void {
		// check if value changed
		if (_oldValue === _newValue) {
			return;
		}

		if (_name === "theme") {
			this._theme = _newValue;
			pandaThemeController.setThemeId(this._theme);
		}
	}
}

// Register the custom element
if (!customElements.get("panda-theme")) {
	customElements.define("panda-theme", PandaTheme);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme": PandaTheme;
	}
}
