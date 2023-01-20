// types
import { PageCategory } from "panda-design-typings";

// styles

// components
import "@panda-wbc/panda-dialog";

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
			PANDA BUTTON DEMO PAGE

			
		`;
	}

	private _renderDialog() {
		if (this._showDialog) {
			return html`
				<panda-dialog
					opened
				>
					<template>
						<my-dialog-content id="${1234}"></my-dialog-content>
					</template>
				</panda-dialog>
			`;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
}