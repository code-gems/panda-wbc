// styles
import { styles } from "./styles/styles";

export default class PandaShimmer extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
	static readonly observedAttributes = ["theme", "width", "height"];

	private _theme!: string;
	private _width!: string;
	private _height!: string;

	get theme(): string {
		return this._theme;
	}

	set theme(value: string) {
		if (this._theme !== value) {
			this._theme = value;
			this.setAttribute("theme", this._theme); // reflect to attribute
		}
	}

	get width(): string {
		return this._width;
	}

	set width(value: string) {
		if (this._width !== value) {
			this._width = value;
			this.setAttribute("width", this._width); // reflect to attribute
			this._updateStyle(); // update computed style
			this.render(); // re-render the component
		}
	}

	get height(): string {
		return this._height;
	}

	set height(value: string) {
		if (this._height !== value) {
			this._height = value;
			this.setAttribute("height", this._height); // reflect to attribute
			this._updateStyle(); // update computed style
			this.render(); // re-render the component
		}
	}

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================
	
	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		this._theme = "";
	}

	connectedCallback() {
		console.log("%c (connectedCallback)", "font-size: 24px; color: crimson; background: black;");
		// Check if the theme attribute is set and update the theme property accordingly
		if (this.hasAttribute("theme")) {
			this._theme = this.getAttribute("theme") ?? "";
		}
		this.render();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		console.log("%c (attributeChangedCallback)", "font-size: 24px; color: crimson; background: black;", _name, _oldValue, _newValue);
		if (_name === "theme") {
			this._theme = _newValue;
		}
		if (_name === "width") {
			console.log("%c (attributeChangedCallback) -> width", "font-size: 24px; color: crimson; background: black;", _name, _oldValue, _newValue);
			this._width = _newValue;
			this._updateStyle();
		}
		if (_name === "height") {
			console.log("%c (attributeChangedCallback) -> height", "font-size: 24px; color: crimson; background: black;", _name, _oldValue, _newValue);
			this._height = _newValue;
			this._updateStyle();
		}
		this.render();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	/** Renders the shimmer effect */
	render() {
		console.log("%c (render)", "font-size: 24px; color: crimson; background: black;");
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div
					class="shimmer ${this._theme}"
					part="shimmer ${this._theme}"
				>
					<slot></slot>
				</div>
			`;
		}
	}

	// ================================================================================================================
	// UTILS =========================================================================================================
	// ================================================================================================================

	/** Updates the style of the component based on the width and height properties */
	private _updateStyle(): void {
		console.log("%c (_updateStyle) style", "font-size: 24px; color: crimson; background: black;");
		if (this._width) {
			this.style.width = this._width;
		}
		if (this._height) {
			this.style.height = this._height;
		}
	}
}

// Register the custom element
if (!customElements.get("panda-shimmer")) {
	customElements.define("panda-shimmer", PandaShimmer);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-shimmer": PandaShimmer;
	}
}