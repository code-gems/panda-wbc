// types
import { PageCategory } from "panda-design-typings";

// components
import "@panda-wbc/panda-flag";

// utils & config
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-flag-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-flag-content-page></panda-flag-content-page>`
})
export class PandaFlagContentPage extends LitElement {




	protected render() {
		return html`
			PANDA FLAG DEMO PAGE

			<panda-flag flag="sg"></panda-flag>
		`;
	}
}