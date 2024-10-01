// types
// ...

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { PandaIconLibrary } from "./panda-icon-library";

// icons
import { defaultIcons } from "./resources/default-icons";

// register default icon pack
const pandaIconLibrary = new PandaIconLibrary();
pandaIconLibrary.registerIcons(defaultIcons);

@customElement("panda-icon")
export class PandaIcon extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: String, reflect: true })
	icon: string = "";

	@query("#svg")
	private _svgEl!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(): void {
		this._updateIconTemplate();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div class="icon" part="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<g id="svg"></g>
				</svg>		
			</div>
		`;
	}
	
	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _updateIconTemplate() {
		const iconTemplate = pandaIconLibrary.getIcon(this.icon);
		this._svgEl.innerHTML = iconTemplate;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-icon": PandaIcon;
	}
}
