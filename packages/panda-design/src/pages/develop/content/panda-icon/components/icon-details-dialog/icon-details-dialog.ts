// types

// styles
import { styles } from "./styles/styles";
import { scrollbar } from "@panda-wbc/panda-theme/lib/mixins";

// components
import "@panda-wbc/panda-click-to-copy";
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-icon/lib/av-icon-pack";
import "@panda-wbc/panda-icon/lib/food-icon-pack";
import "@panda-wbc/panda-icon/lib/map-icon-pack";
import "../../../../../../web-parts/code-sample/code-sample";

// utils
import { LitElement, TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { uiComponents } from "../../../../../../styles/styles";

@customElement("icon-details-dialog")
export class IconDetailsDialog extends LitElement {
	static get styles() { 
		return [
			styles,
			scrollbar,
			uiComponents.dialog,
		];
	}

	@property({ type: String, attribute: true, reflect: true })
	icon!: string;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================


	
	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		return html`
			<div class="dialog">
				<div class="header">
					<label>Icon Details</label>
					<div
						class="btn-close"
						@click="${this._onClose}"
					>
						<panda-icon icon="close"></panda-icon>
					</div>
				</div>
				<div class="body scrollbar">
					<div class="body-wrap">
						asd

					</div>
				</div>
				<div class="footer">
					<panda-button
						theme="flat"
						@click="${this._onClose}"
					>
						CLOSE
					</panda-button>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onClose(): void {
		const event = new CustomEvent("panda-dialog-close", {});
		document.dispatchEvent(event);
	}
}