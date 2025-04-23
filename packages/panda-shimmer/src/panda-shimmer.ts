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
	private _computedStyle!: string;

	get theme(): string {
		return this._theme;
	}

	set theme(value: string) {
		if (this._theme !== value) {
			this._theme = value;
			this.setAttribute("theme", this._theme); // reflect to attribute
		}
	}

	set width(value: string) {
		console.log("%c (set width)", "font-size: 24px; color: green;", value);

		if (this._width !== value) {
			this._width = value;
			this.setAttribute("width", this._width); // reflect to attribute
			
			this._computedStyle = this._getComputedStyle(); // update computed style
			this.render(); // re-render the component
		}
	}

	set height(value: string) {
		if (this._height !== value) {
			this._height = value;
			this.setAttribute("height", this._height); // reflect to attribute
			this._computedStyle = this._getComputedStyle(); // update computed style
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
		// Check if the theme attribute is set and update the theme property accordingly
		if (this.hasAttribute("theme")) {
			this._theme = this.getAttribute("theme") ?? "";
		}
		this.render();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "theme") {
			this._theme = _newValue;
		}
		if (_name === "width" || _name === "height") {
			this._computedStyle = this._getComputedStyle();
		}
		this.render();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	/** Renders the shimmer effect */
	render() {
		console.log("%c (render)", "font-size: 24px; color: green;");
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div
					class="shimmer ${this._theme}"
					part="shimmer ${this._theme}"
					style="${this._computedStyle};"
				>
					<slot></slot>
				</div>
			`;
		}
	}

	// ================================================================================================================
	// UTILS =========================================================================================================
	// ================================================================================================================

	/** Returns the computed style for the element */
	private _getComputedStyle(): string {
		let style = "";
		if (this._width) {
			style += `width: ${this._width};`;
		}
		if (this._height) {
			style += `height: ${this._height};`;
		}
		console.log("%c (_getComputedStyle) style", "font-size: 24px; color: green;", style);
		return style;
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