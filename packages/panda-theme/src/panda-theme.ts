// types
import { PandaThemeMode } from "./types";

// utils
import pandaThemeController from "./panda-theme-controller";

export class PandaTheme extends HTMLElement {
	/** component version */
	static readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = [
		"theme-group-id",
		"theme-mode",
		"accent-color-id",
	];

	/**
	 * themeGroupId
	 * ---
	 * Get or set the current theme group id
	 * @returns {string} current theme group id
	 */
	get themeGroupId(): string {
		return this._themeId;
	}

	set themeGroupId(value: string) {
		if (this._themeId !== value) {
			this._themeId = value;
			this.setAttribute("theme-group-id", this._themeId + ""); // reflect to attribute
		}
	}

	private _themeId!: string;

	/**
	 * themeMode
	 * ---
	 * Get or set the current theme mode (light/dark)
	 * @returns {PandaThemeMode} current theme mode
	 */
	get themeMode(): PandaThemeMode {
		return this._themeMode;
	}

	set themeMode(value: PandaThemeMode) {
		if (this._themeMode !== value) {
			this._themeMode = value;
			this.setAttribute("theme-mode", this._themeMode + ""); // reflect to attribute
		}
	}

	private _themeMode!: PandaThemeMode;

	/**
	 * accentColorId
	 * ---
	 * Get or set the current accent color id
	 * @returns {string} current accent color id
	 */
	get accentColorId(): string {
		return this._accentColorId;
	}

	set accentColorId(value: string) {
		if (this._accentColorId !== value) {
			this._accentColorId = value;
			this.setAttribute("accent-color-id", this._accentColorId + ""); // reflect to attribute
		}
	}

	private _accentColorId!: string;

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

		switch (_name) {
			case "theme-group-id":
				this._themeId = _newValue;
				pandaThemeController.setThemeGroupId(this._themeId);
				break;
			case "theme-mode":
				this._themeMode = _newValue as PandaThemeMode;
				pandaThemeController.setThemeMode(this._themeMode);
				break;
			case "accent-color-id":
				this._accentColorId = _newValue;
				pandaThemeController.setAccentColorId(this._accentColorId);
				break;
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
