// types
import { PageCategory } from "panda-design-typings";

// components
import "@panda-wbc/panda-spinner";

// utils & config
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../common/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-spinner-demo-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DOCS,
	keywords,
	description,
	contextMenu,
	template: html`<panda-spinner-demo-page></panda-spinner-demo-page>`
})
export class PandaSpinnerDemoPage extends LitElement {




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