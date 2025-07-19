// types
// ...

// styles
import { styles } from "./styles/styles";

// utils
import { PandaIconLibrary } from "./panda-icon-library";

// icons
import { defaultIcons } from "./resources/default-icons";

// register default icon pack
const pandaIconLibrary = new PandaIconLibrary();
pandaIconLibrary.registerIcons(defaultIcons);

export class PandaIcon extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
	static readonly observedAttributes = ["icon"];
	
	// icon ===========================================================================================================
	private _icon!: string;

	get icon(): string {
		return this._icon;
	}

	set icon(value: string) {
		if (this._icon !== value) {
			this._icon = value;
			this.setAttribute("icon", this._icon); // reflect to attribute
			this._renderIcon();
		}
	}

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// initialize class properties
		this._icon = "";
	}

	connectedCallback(): void {
		this._applyStyles();
		this._render();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "icon") {
			this._icon = _newValue;
			this._render();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	private _render(): string | void {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<div class="icon" part="icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						preserveAspectRatio="xMidYMid meet"
						x="0"
						y="0"
					>
						${this._renderIcon()}
					</svg>		
				</div>
			`;
		}
	}

	private _renderIcon(): string | void {
		const iconTemplate = pandaIconLibrary.getIcon(this.icon);
		if (iconTemplate) {
			// Set the inner HTML of the SVG element to the icon template
			return iconTemplate;
		} else {
			console.log(
				"%c [PANDA ICON] Icon not found",
				"font-size: 16px; color: orange; background: black;",
				this.icon
			);
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
if (!customElements.get("panda-icon")) {
	customElements.define("panda-icon", PandaIcon);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-icon": PandaIcon;
	}
}
