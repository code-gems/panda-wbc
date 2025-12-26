// types
import { PageCategory } from "panda-design-typings";

// styles

// components
import "@panda-wbc/panda-upload";

// utils
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-upload-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-upload-content-page></panda-upload-content-page>`
})
export class PandaUploadContentPage extends LitElement {


	@property({ type: Boolean })
	private _checked: boolean = false;

	@property({ type: Boolean })
	private _disabled: boolean = false;

	@property({ type: Boolean })
	private _indetermined: boolean = false;


	protected render() {
		return html`
			PANDA TOGGLE DEMO PAGE

			<panda-upload-button
				
			>
				UPLOAD FILES
			</panda-upload-button>
		`;
	}
}