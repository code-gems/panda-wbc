// style
import { styles } from "./styles/styles";

// components


// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-grid-layout")
export class PandaGridLayout extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	gridConfig: any;

	// elements


	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<div
				id="grid-layout"
				class="grid-layout"
				part="grid-layout"
			>
				<div
					class="grid-layout-wrap"
					part="grid-layout-wrap"
				>
					<slot></slot>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-grid-layout": PandaGridLayout;
	}
}
