// types
import { ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-button";
import "@panda-wbc/panda-dialog";

// utils
import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ContentPageTemplate } from "../../../content-page-template";
import { page } from "../../../../utils/page-library";
import { pageConfig } from "./page-config";

@page(pageConfig)
@customElement("panda-dialog-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public contentPageConfig = pageConfig;
	public customStyles = styles;

	@state()
	private _showDialog = false;

	@state()
	private _showDialog2 = false;

	private readonly _closeDialogEvent = this._onDialogClose.bind(this);

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		console.log("%c ⚡ [DEMO] (render)", "font-size: 24px; color: limegreen; background: black;", this._showDialog);
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>

					</p>
				</div>

				<div class="rows">
					<div class="row">
						<div class="col-3">
							<panda-button @click="${this._onToggleDialog}">
								SHOW DIALOG
							</panda-button>
						</div>
						<div class="col-3">
							<panda-button @click="${this._onToggleDialog2}">
								SHOW DIALOG (Template)
							</panda-button>
						</div>
					</div>
				</div>

			</div>

			<panda-dialog
				.opened="${this._showDialog}"
				@close="${this._onDialogClose}"
				no-close-on-esc
			>
				<div template>
					<div style="display: flex; flex-flow: column; padding: 10px;">
						<h2 style="margin: 0;">Dialog Title</h2>
						<p>
							This is the content of the dialog.<br />
							You can put any content here, such as text, images, forms, etc.<br />
							Click the button below to close the dialog.
						</p>
						<panda-button @click="${this._closeDialogEvent}">CLOSE DIALOG</panda-button>
					</div>
				</div>
			</panda-dialog>

			<panda-dialog
				.opened="${this._showDialog2}"
				@close="${this._onDialogClose2}"
			>
				<template>
					<div style="display: flex; flex-flow: column; padding: 10px;">
						<h2 style="margin: 0;">Dialog Title</h2>
						<p>
							This is the content of the dialog.<br />
							You can put any content here, such as text, images, forms, etc.<br />
							Click the button below to close the dialog.
						</p>
					</div>
				</template>
			</panda-dialog>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onToggleDialog() {
		this._showDialog = true;
		console.log("%c ⚡ [DEMO] (_onToggleDialog)", "font-size: 24px; color: limegreen; background: black;", this._showDialog);
	}

	private _onToggleDialog2() {
		this._showDialog2 = true;
		console.log("%c ⚡ [DEMO] (_onToggleDialog)", "font-size: 24px; color: limegreen; background: black;", this._showDialog2);
	}

	private _onDialogClose(): void {
		this._showDialog = false;
		console.log("%c ⚡ [DEMO] (_onDialogClose)", "font-size: 24px; color: crimson; background: black;", this._showDialog);
	}
	
	private _onDialogClose2(): void {
		this._showDialog2 = false;
		console.log("%c ⚡ [DEMO] (_onDialogClose2)", "font-size: 24px; color: crimson; background: black;", this._showDialog2);
	}
}