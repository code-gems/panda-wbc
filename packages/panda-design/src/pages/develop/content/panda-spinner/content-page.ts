// types
import { PageCategory } from "panda-design-typings";

// components
import "@panda-wbc/panda-spinner";

// utils & config
import { html, LitElement, css } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-spinner-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-spinner-content-page></panda-spinner-content-page>`
})
export class PandaSpinnerContentPage extends LitElement {
	// css styles
	static get styles() {
		return css`

		`;
	}



	protected render() {
		return html`
			PANDA SPINNER DEMO PAGE

			<panda-spinner></panda-spinner>
			<panda-spinner spinner="video"></panda-spinner>
			<panda-spinner spinner="google"></panda-spinner>
			<panda-spinner spinner="circle"></panda-spinner>
		`;
	}
}