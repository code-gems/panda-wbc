// style
import { accentColorItemStyles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

export class PandaThemeAccentColorItem extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = ["selected", "primary-color", "primary-text-color", "secondary-color"];

	// selected =======================================================================================================
	private _selected!: boolean;

	get selected(): boolean {
		return this._selected;
	}

	set selected(value: boolean) {
		if (this._selected !== value) {
			this._selected = value;
			// reflect to attribute
			if (this._selected) {
				this.setAttribute("selected", "");
			} else {
				this.removeAttribute("selected");
			}
		}
	}

	// primaryColor ===================================================================================================
	private _primaryColor!: string | null;

	get primaryColor(): string | null {
		return this._primaryColor;
	}

	set primaryColor(value: string | null) {
		if (this._primaryColor !== value) {
			this._primaryColor = value;
			// reflect to attribute
			if (this._primaryColor) {
				this.setAttribute("primary-color", this._primaryColor);
			} else {
				this.removeAttribute("primary-color");
			}
		}
	}

	// primaryTextColor ===============================================================================================
	private _primaryTextColor!: string | null;

	get primaryTextColor(): string | null {
		return this._primaryTextColor;
	}

	set primaryTextColor(value: string | null) {
		if (this._primaryTextColor !== value) {
			this._primaryTextColor = value;
			// reflect to attribute
			if (this._primaryTextColor) {
				this.setAttribute("primary-text-color", this._primaryTextColor);
			} else {
				this.removeAttribute("primary-text-color");
			}
		}
	}

	// secondaryColor =================================================================================================
	private _secondaryColor!: string | null;

	get secondaryColor(): string | null {
		return this._secondaryColor;
	}

	set secondaryColor(value: string | null) {
		if (this._secondaryColor !== value) {
			this._secondaryColor = value;
			// reflect to attribute
			if (this._secondaryColor) {
				this.setAttribute("secondary-color", this._secondaryColor);
			} else {
				this.removeAttribute("secondary-color");
			}
		}
	}

	// view properties ================================================================================================

	// template elements
	private readonly _accentColorEl!: HTMLDivElement;
	private readonly _primaryColorEl!: HTMLDivElement;
	private readonly _secondaryColorEl!: HTMLDivElement;
	private readonly _selectedIconEl!: HTMLDivElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		// create shadow root
		this.attachShadow({ mode: "open", delegatesFocus: true });

		// apply component styles
		this._applyStyles();

		// create component template
		const template = document.createElement("template");
		template.innerHTML = `
			<div
				class="accent-color"
				part="accent-color"
				tab-index="0"
			>
				<div class="primary-color" part="primary-color"></div>
				<div class="secondary-color" part="secondary-color"></div>
				<div class="selected-icon" part="selected-icon">
					<panda-icon icon="check"></panda-icon>
				</div>
			</div>
		`;

		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._selected = false;
		this._primaryColor = null;
		this._secondaryColor = null;

		// get template element handles
		if (this.shadowRoot) {
			this._accentColorEl = this.shadowRoot.querySelector(".accent-color") as HTMLDivElement;
			this._primaryColorEl = this.shadowRoot.querySelector(".primary-color") as HTMLDivElement;
			this._secondaryColorEl = this.shadowRoot.querySelector(".secondary-color") as HTMLDivElement;
			this._selectedIconEl = this.shadowRoot.querySelector(".selected-icon") as HTMLDivElement;
		}

		// Update the component state
		this._updateState();
	}

	/**
	 * Handle attribute changes.
	 * @param _name The name of the attribute that changed.
	 * @param _oldValue The old value of the attribute.
	 * @param _newValue The new value of the attribute.
	 */
	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		switch (_name) {
			case "selected":
				this._selected = this._parseBooleanAttribute(_newValue);
				break;
			case "primary-color":
				this._primaryColor = _newValue;
				break;
			case "primary-text-color":
				this._primaryTextColor = _newValue;
				break;
			case "secondary-color":
				this._secondaryColor = _newValue;
				break;
		}
		// Update the component state
		this._updateState();
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================
	
	/** Apply component styles. */
	private _applyStyles(): void {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(accentColorItemStyles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	/**
	 * Parses an attribute value to boolean.
	 * @param value value to parse
	 * @description Parses a value to boolean. If the value is "true" or true, it returns true, otherwise false.
	 * @returns {Boolean}
	 */
	private _parseBooleanAttribute(value: unknown): boolean {
		return value === "true" || value === true || value === "";
	}

	/** Update the component state */
	private _updateState(): void {
		// Update the primary color element
		if (this._primaryColor != null) {
			this._primaryColorEl.style.backgroundColor = this._primaryColor;
		}
		// Update the secondary color element
		if (this._secondaryColor != null) {
			this._secondaryColorEl.classList.remove("hidden");
			this._secondaryColorEl.style.backgroundColor = this._secondaryColor;
		} else {
			this._secondaryColorEl.classList.add("hidden");
		}

		if (this._selected) {
			this._accentColorEl.classList.add("selected");
			this._accentColorEl.style.setProperty("--panda-theme-accent-color-item-icon-color", this._primaryTextColor);
			this._selectedIconEl.classList.add("show");
		} else {
			this._accentColorEl.classList.remove("selected");
			this._selectedIconEl.classList.remove("show");
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	
}

// Register the custom element
if (!customElements.get("panda-theme-accent-color-item")) {
	customElements.define("panda-theme-accent-color-item", PandaThemeAccentColorItem);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme-accent-color-item": PandaThemeAccentColorItem;
	}
}