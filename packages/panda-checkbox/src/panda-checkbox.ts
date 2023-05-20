// types
// ...

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("panda-checkbox")
export class PandaCheckbox extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: Boolean, attribute: true, reflect: true })
	checked!: boolean;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================



	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div class="icon" part="icon">
				checkbox		
			</div>
		`;
	}
	
	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _updateIconTemplate() {
		
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-checkbox": PandaCheckbox;
	}
}
