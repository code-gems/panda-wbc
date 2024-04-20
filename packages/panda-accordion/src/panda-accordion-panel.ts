// types

// styles
import { slideStyles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("panda-panda-accordion-panel")
export class PandaAccordionPanel extends LitElement {
	// css styles
	static get styles() {
		return slideStyles;
	}

	@property({ type: Number, attribute: "selected-page" })
	selectedPage: number = 0;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			ACCORDION PANEL
		`;
	}
	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

}

declare global {
	interface HTMLElementTagNameMap {
		"panda-accordion-panel": PandaAccordionPanel;
	}
}