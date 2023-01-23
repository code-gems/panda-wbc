// types
import { PageCategory } from "panda-design-typings";

// styles

// components
import "@panda-wbc/panda-dialog";
import "@panda-wbc/panda-date-picker";

// utils
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { page } from "../../../../common/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-dialog-demo-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DOCS,
	keywords,
	description,
	contextMenu,
	template: html`<panda-dialog-demo-page></panda-dialog-demo-page>`,
})
export class PandaMultiInputDemoPage extends LitElement {

	@property({ type: Boolean })
	private _showDialog: boolean = false;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================


	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div style="height: 200vh;">
				PANDA DIALOG

				<button
					@click="${this._onToggleDialog}"
				>
					SHOW DIALOG
				</button>

				${this._renderDialog()}
			</div>
		`;
	}

	private _renderDialog() {
		if (this._showDialog) {
			return html`
				<panda-dialog
					opened
				>
					<div template>
						DEMO PAGE DIALOG BODY
						<panda-date-picker
							
						>
						</panda-date-picker>
					</div>
				</panda-dialog>
			`;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onToggleDialog() {
		this._showDialog = !this._showDialog;
	}
}