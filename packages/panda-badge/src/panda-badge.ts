// styles
import { styles } from "./styles/styles";

export default class PandaBadge extends HTMLElement {
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
			this.render();
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
		this.render();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	/** Renders the badge */
	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div
					class="badge ${this._theme}"
					part="badge ${this._theme}"
				>
					<slot></slot>
				</div>
			`;
		}
	}

}

// Register the custom element
if (!customElements.get("panda-badge")) {
	customElements.define("panda-badge", PandaBadge);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-badge": PandaBadge;
	}
}