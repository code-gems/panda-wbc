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

@customElement("panda-button-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-button-content-page></panda-button-content-page>`
})
export class PandaButtonContentPage extends LitElement {




	protected render() {
		return html`
			PANDA BUTTON DEMO PAGE

			<panda-button>
				My Button
			</panda-button>
		`;
	}
}