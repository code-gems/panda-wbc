// types
import { PandaSelectItem } from "../index";

// components
import "@panda-wbc/panda-theme";
import "../src/panda-select";

// utils
import { LitElement, html, css } from "lit";

class DemoPage extends LitElement {
	// css styles
	static styles = css`

	`;

	private _value!: string;
	private _itemList!: PandaSelectItem[];

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this._itemList = [
			{ label: "Header 1", value: "h1" },
			{ label: "Header 2", value: "h2" },
			{ label: "Header 3", value: "h3" },
			{ label: "Paragraph", value: "p" },
			{ label: "Normal Text", value: "-" },
		];

		this._value = "-";
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html`
			<panda-theme></panda-theme>
			<h2>Panda Select - Demo</h2>
			<panda-select
				.value="${this._value}"
				.items="${this._itemList}"
				.disabled="${false}"
				.busy="${false}"
				@change="${(e: any) => this._onPandaSelectChange(e)}"
			></panda-select>
		`;
	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================

	private _onPandaSelectChange(e: any) {
		console.log("%c _onPandaSelectChange", "font-size: 24px; color: green;", e);
	}
}
window.customElements.define("demo-page", DemoPage);
