// types
import { PageCategory } from "panda-design-typings";

// styles

// components
import "@panda-wbc/panda-button";

// utils
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-button-demo-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DOCS,
	keywords,
	description,
	contextMenu,
	template: html`<panda-button-demo-page></panda-button-demo-page>`
})
export class PandaButtonDemoPage extends LitElement {




	protected render() {
		return html`
			PANDA BUTTON DEMO PAGE

			<panda-button>
				My Button
			</panda-button>
		`;
	}
}