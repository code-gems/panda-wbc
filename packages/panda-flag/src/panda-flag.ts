// styles
import { styles } from "./styles/styles";

// utils
import { getFlagTemplate } from "./utils/utils";

export class PandaFlag extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = ["flag", "square"];

	// flag ============================================================================================================
	private _flag!: string;

	get flag(): string {
		return this._flag;
	}

	set flag(value: string) {
		if (this._flag !== value) {
			this._flag = value;
			// reflect to attribute
			this.setAttribute("flag", this._flag);
			this._render();
		}
	}

	// square ==========================================================================================================
	private _square!: boolean;

	get square(): boolean {
		return this._square;
	}

	set square(value: boolean) {
		if (this._square !== value) {
			this._square = value;
			// reflect to attribute
			if (this._square) {
				this.setAttribute("square", "");
			} else {
				this.removeAttribute("square");
			}
			this._render();
		}
	}

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// initialize class properties
		this._flag = "";
		this._square = false;
	}

	connectedCallback(): void {
		this._applyStyles();
		this._render();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// set flag from attribute
		if (_name === "flag") {
			this._flag = _newValue;
			this._render();
		}
		// set square from attribute
		if (_name === "square") {
			this._square = this._parseBooleanAttribute(_newValue);
			this._render();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	private _render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = /*html*/`
				<div class="flag" part="flag">
					${getFlagTemplate(this._flag, this._square)}
				</div>
			`;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _applyStyles(): void {
		if (this.shadowRoot) {
			const style = new CSSStyleSheet();
			style.replaceSync(styles);
			this.shadowRoot.adoptedStyleSheets = [style];
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
}

// Register the custom element
if (!customElements.get("panda-flag")) {
	customElements.define("panda-flag", PandaFlag);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-flag": PandaFlag;
	}
}
