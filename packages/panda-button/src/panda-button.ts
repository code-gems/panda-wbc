// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";

export class PandaButton extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
	static readonly observedAttributes = [
		"theme",
		"disabled",
		"working",
		"spinner-type",
	];
	
	// theme ==========================================================================================================
	private _theme!: string;
	
	// theme ==========================================================================================================
	private _disabled!: boolean;
	
	// working ==========================================================================================================
	private _working!: boolean;
	
	// spinnerType ==========================================================================================================
	private _spinnerType!: string;
	
	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// apply component styles
		this._applyStyles();
		// initialize class properties
		this._theme = "";
		this._disabled = false;
		this._working = false;
		this._spinnerType = "dots";
		// render component
		this._render();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "theme") {
			this._theme = _newValue;
		}
		if (_name === "disabled") {
			this._disabled = this._parseBooleanAttribute(_newValue);
		}
		if (_name === "working") {
			this._working = this._parseBooleanAttribute(_newValue);
		}
		this._render();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	private _render() {
		if (this.shadowRoot) {
			// check for working state
			const spinnerHtml = this._working
				? /*html*/`
					<div class="spinner-cont" part="spinner-cont">
						<panda-spinner
							theme="${this._theme ?? ""}"
							part="spinner"
							spinner="${this._spinnerType ?? "dots"}"
						>
						</panda-spinner>
					</div>
				`
				: "";
			
			// get tab index based on the component state
			const tabIndex = this._disabled ? "-1" : "0"

			// get css classes based on component state
			const cssClasses: string[] = [];
			if (this._disabled) {
				cssClasses.push("disabled");
			}
			if (this._working) {
				cssClasses.push("working");
			}

			// render component template
			this.shadowRoot.innerHTML = /*html*/`
				<button
					class="button ${cssClasses.join(" ")}"
					part="button ${cssClasses.join(" ")}"
					${this._disabled || this._working? "disabled" : ""}
					tabindex="${tabIndex}"
				>
					<slot name="prefix"></slot>
					<slot></slot>
					<slot name="suffix"></slot>
					${spinnerHtml}
				</button>
			`;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _applyStyles(): void {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles);
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
	private _parseBooleanAttribute(value: any): boolean {
		return value === "true" || value === true || value === "";
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	

}

// Register the custom element
if (!customElements.get("panda-button")) {
	customElements.define("panda-button", PandaButton);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-button": PandaButton;
	}
}
