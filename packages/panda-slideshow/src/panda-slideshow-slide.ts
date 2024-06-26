// types

// styles
import { slideStyles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("panda-slideshow-slide")
export class PandaSlideshowSlide extends LitElement {
	// css styles
	static get styles() {
		return slideStyles;
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
		"panda-slideshow-slide": PandaSlideshowSlide;
	}
}