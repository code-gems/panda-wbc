// types
import { PageCategory } from "panda-design-typings";

// components
import "@panda-wbc/panda-flag";

// utils & config
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../common/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-flag-demo-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DOCS,
	keywords,
	description,
	contextMenu,
	template: html`<panda-flag-demo-page></panda-flag-demo-page>`
})
export class PandaFlagDemoPage extends LitElement {




	protected render() {
		return html`
			PANDA FLAG DEMO PAGE

			<panda-flag flag="sg"></panda-flag>
		`;
	}
}