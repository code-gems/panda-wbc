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
			this._render();
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
		this._applyStyles();
		this._render();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "theme") {
			this._theme = _newValue;
		}
		this._render();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	/** Renders the badge */
	private _render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<div
					class="badge ${this._theme}"
					part="badge ${this._theme}"
				>
					<slot></slot>
				</div>
			`;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _applyStyles() {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
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