// types
import { PageCategory } from "panda-design-typings";

// styles

// components
import "@panda-wbc/panda-combo-box";

// utils
import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";

// page config
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-combo-box-demo-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DOCS,
	keywords,
	description,
	contextMenu,
	template: html`<panda-combo-box-demo-page></panda-combo-box-demo-page>`,
})
export class PandaComboBoxDemoPage extends LitElement {
	static get styles() {
		return css`
			
		`;
	}

	@property({ type: String })
	private _value: string | null = null;

	@property({ type: Array })
	private _items: any[] = [
		{ name: "Item #1", value: "value 1" },
		{ name: "Item #2", value: "value 2" },
		{ name: "Item #3", value: "value 3" },
		{ name: "Item #4", value: "value 4" },
		{ name: "Item #5", value: "value 5" },
		{ name: "Item #6", value: "value 6" },
	];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<panda-combo-box
				.value="${this._value}"
				.items="${this._items}"
				@change="${this._onChange}"
			>
			</panda-combo-box>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChange(e: any) {
		console.log("%c _onChange", "font-size: 24px; color: green;", e);
	}
}