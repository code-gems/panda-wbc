// types
// ...

// styles
import { styles } from "./styles/styles";

// spinners
import { circle } from "./resources/circle";
import { dots } from "./resources/dots";
import { video } from "./resources/video";
import { google } from "./resources/google";

export class PandaSpinner extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = ["icon"];

	// spinner ========================================================================================================
	private _spinner!: string;

	get spinner(): string {
		return this._spinner;
	}

	set spinner(value: string) {
		if (this._spinner !== value) {
			this._spinner = value;
			// reflect to attribute
			this.setAttribute("spinner", this._spinner);
			this._renderSpinner();
		}
	}

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// initialize class properties
		this._spinner = "";
	}

	connectedCallback(): void {
		this._applyStyles();
		this._render();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "spinner") {
			this._spinner = _newValue;
			this._render();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	private _render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = /*html*/`
				<div class="spinner" part="spinner">
					${this._renderSpinner()}
				</div>
			`;
		}
	}

	private _renderSpinner(): string {
		switch (this._spinner) {
			case "circle":
				return circle;
			case "google":
				return google;
			case "video":
				return video;
			case "dots":
			default:
				return dots;
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
}

// Register the custom element
if (!customElements.get("panda-spinner")) {
	customElements.define("panda-spinner", PandaSpinner);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-spinner": PandaSpinner;
	}
}
