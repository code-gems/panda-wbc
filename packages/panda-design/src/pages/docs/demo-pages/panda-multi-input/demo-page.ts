// types
import { PageCategory } from "panda-design-typings";

// styles

// components
import "@panda-wbc/panda-multi-input";

// utils
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../common/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-multi-input-demo-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DOCS,
	keywords,
	description,
	contextMenu,
	template: html`<panda-multi-input-demo-page></panda-multi-input-demo-page>`
})
export class PandaMultiInputDemoPage extends LitElement {




	protected render() {
		return html`
			PANDA BUTTON DEMO PAGE

			<panda-multi-input>
				My Button
			</panda-multi-input>
		`;
	}
}