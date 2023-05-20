// types
import { PandaCheckboxChangeEvent } from "@panda-wbc/panda-checkbox";
import { PageCategory } from "panda-design-typings";

// styles

// components
import "@panda-wbc/panda-checkbox";

// utils
import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-checkbox-demo-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DOCS,
	keywords,
	description,
	contextMenu,
	template: html`<panda-checkbox-demo-page></panda-checkbox-demo-page>`,
})
export class PandaCheckboxDemoPage extends LitElement {
	static get styles() {
		return css`
			
		`;
	}

	@property({ type: Boolean })
	checked: boolean = false;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================


	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<panda-checkbox
				.checked="${this.checked}"
				@change="${(e: PandaCheckboxChangeEvent) => this._onCheckboxChange(e.detail.checked)}"
			>
			<panda-checkbox>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onCheckboxChange(checked: boolean) {
		this.checked = checked;
	}
}