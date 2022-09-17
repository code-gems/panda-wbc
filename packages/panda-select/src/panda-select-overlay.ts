// style
import { PandaSelectItem } from "../index";

// style
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-select-overlay")
export class PandaSelectOverlay extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: String })
	value!: PandaSelectItem | any | null;

	@property({ type: Array })
	items!: PandaSelectItem[] | any[];

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this.value = null;
		this.items = [];
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html`
			<div class="panda-overlay-cont">
				<div
					id="panda-overlay"
					class="panda-overlay"
					part="overlay"
				>
					${this._renderItemList()}
				</div>
			</div>
		`;
	}

	private _renderItemList() {
		const itemsHtml: TemplateResult[] = [];

		this.items.forEach((item) => {
			itemsHtml.push(html`
				<div
					class="list-item"
					part="list-item"
					@click="${() => this._onItemSelected(item)}"
				>
					${item?.label}
				</div>
			`);
		});

		return html`
			<div
				class="list"
				part="list"
			>
				${itemsHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// ============================================================================================================ API
	// ================================================================================================================

	/**
	 * Communicate to parent element that this overlay is getting closed
	 */
	public close() {
		console.log("%c [PANDA SELECT OVERLAY] Close", "font-size: 24px; color: green;");
		const event = new CustomEvent("close", {});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================

	private _onItemSelected(item: PandaSelectItem | any) {
		const event = new CustomEvent("select-item", { detail: item });
		this.dispatchEvent(event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-select-overlay": PandaSelectOverlay;
	}
}
