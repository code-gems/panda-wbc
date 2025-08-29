// types
// ...

// styles
import { styles } from "./styles/styles";

// spinners
import { circle } from "./resources/circle";
import { dots } from "./resources/dots";
import { dotsBounce } from "./resources/dots-bounce";
import { gooeyBalls } from "./resources/gooey-balls";
import { google } from "./resources/google";
import { video } from "./resources/video";

export class PandaSpinner extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = ["spinner"];

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
		}
	}

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// apply component styles
		this._applyStyles();
		// initialize class properties
		this._spinner = "";
		// render component
		this._render();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "spinner") {
			this._spinner = _newValue;
		}
		this._render();
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
			case "gooey-balls":
				return gooeyBalls;
			case "google":
				return google;
			case "video":
				return video;
			case "dots-bounce":
				return dotsBounce;
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
