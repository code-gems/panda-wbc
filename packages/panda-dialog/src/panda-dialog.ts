// types

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("panda-dialog")
export class PandaDialog extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	private _template!: Element;

	@query("#content")
	private _content!: Element;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this._template = document.createElement("div");
	}

	public connectedCallback(): void {
		super.connectedCallback();
		
		Array
			.from(this.children)
			.forEach((child) => {
				if (child.tagName === "TEMPLATE") {
					this._template.innerHTML = child.innerHTML;
				}
			});

		this._content.innerHTML = this._template.innerHTML;
		console.log("%c TEMPLATE", "font-size: 24px; color: green;", this._template.innerHTML);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`<div id="content"></div>`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

}

declare global {
	interface HTMLElementTagNameMap {
		"panda-dialog": PandaDialog;
	}
}
