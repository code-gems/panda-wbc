// types

// styles
import { contentStyles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("panda-full-page-content")
export class PandaFullPageContent extends LitElement {
	// css styles
	static get styles() {
		return contentStyles;
	}

	@property({ type: Number, attribute: "selected-page" })
	selectedPage: number = 0;

	@property({ type: Boolean, attribute: "hide-pagination", reflect: true })
	hidePagination: boolean = false;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<slot>
			</slot>
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
		"panda-full-page-content": PandaFullPageContent;
	}
}