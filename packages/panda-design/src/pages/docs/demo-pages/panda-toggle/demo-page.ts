// types
import { PageCategory } from "panda-design-typings";

// styles

// components
import "@panda-wbc/panda-toggle";

// utils
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-toggle-demo-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DOCS,
	keywords,
	description,
	contextMenu,
	template: html`<panda-toggle-demo-page></panda-toggle-demo-page>`
})
export class PandaToggleDemoPage extends LitElement {


	@property({ type: Boolean })
	private _checked: boolean = false;

	@property({ type: Boolean })
	private _disabled: boolean = false;

	@property({ type: Boolean })
	private _indeterminate: boolean = false;

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<h1>PANDA TOGGLE DEMO PAGE</h1>
			<label>Default view<label><br />
			<panda-toggle
				.checked="${this._checked}"
			>
			</panda-toggle>
			<br />
			<label>disabled<label><br />
			<panda-toggle disabled></panda-toggle>
			<br />
			<label>indeterminate<label><br />
			<panda-toggle indeterminate></panda-toggle>
			<br />
			<label>indeterminate and disabled<label><br />
			<panda-toggle
				disabled
				indeterminate
			>
			</panda-toggle>
			<br />
			<label>Busy<label><br />
			<panda-toggle busy></panda-toggle>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
}