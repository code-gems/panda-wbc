// types
import { PageCategory } from "panda-design-typings";

// styles

// components
import "@panda-wbc/panda-dialog";
import "@panda-wbc/panda-date-picker";

// utils
import { html, LitElement, css } from "lit";
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
	static get styles() {
		return css`
			.button {
				display: inline-block;
				text-decoration: none;
				text-transform: uppercase;
				letter-spacing: 2px;
				color: #000;
				outline: 2px solid;
				padding: 20px 40px;
				position: relative;
				overflow: hidden;
				transition: color 700ms;
				cursor: pointer;
				user-select: none;
			}

			.button:hover {
				color: #fff;
			}

			.button:before {
				content: '';
				position: absolute;
				top: 0;
				left: -50px;
				width: 0;
				height: 100%;
				background-color: #d92390;
				transform: skewX(35deg);
				transform-origin: left center;
				z-index: -1;
				transition: width 700ms ease-in;
			}

			.button:after {
				content: '';
				position: absolute;
				top: 0;
				left: -50px;
				width: 0;
				height: 100%;
				background-color: #000;
				transform: skewX(35deg);
				transform-origin: left center;
				z-index: -1;
				transition: width 700ms ease-in 200ms;
			}

			.button:hover::before,
			.button:hover::after {
				width: 150%;
			}

			.promo-button {

			}

			.promo-button:before {
				content: '';
				position: absolute;
				top: -2px;
				bottom: -2px;
				left: -2px;
				right: -2px;
				background: linear-gradient(45deg, )
				background-size: 400%;
			}
		`;
	}

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

				<div
					class="button"
					@click="${this._onToggleDialog}"
				>
					SHOW DIALOG
				</div>

				${this._renderDialog()}
			</div>
		`;
	}

	private _renderDialog() {
		return html`
			<panda-dialog
				.opened="${this._showDialog}"
				@close="${this._onDialogClose}"
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

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onToggleDialog() {
		this._showDialog = !this._showDialog;
	}

	private _onDialogClose() {
		console.log("%c _onDialogClose", "font-size: 24px; color: green;");
	}
}