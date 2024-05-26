// https://www.cssscript.com/demo/fullscreen-scrolling-presentation-pageable/#markup
// types
import { PandaPipsPagerChangeEvent } from "../index";

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("panda-pips-pager")
export class PandaPipsPager extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: Number, reflect: true })
	selected: number = 0;

	@property({ type: Number, reflect: true })
	total: number = 0;

	@property({ type: Number, attribute: "max-pips", reflect: true })
	maxPips: number | null = null;

	@property({ type: Boolean, reflect: true })
	vertical: boolean = false;

	// components
	@query("#pagination")
	private _paginationEl!: HTMLDivElement;

	@query("#pips-cont")
	private _pipsContEl!: HTMLDivElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	firstUpdated(): void {
		const paginationRect = this._paginationEl.getBoundingClientRect();
		const pipsContRect = this._pipsContEl.getBoundingClientRect();
		console.log("%c paginationRect", "font-size: 24px; color: green;", paginationRect.width);
		console.log("%c pipsContRect", "font-size: 24px; color: green;", pipsContRect.width);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		const verticalCss = this.vertical
			? "vertical"
			: "";

		return html`
			<div
				id="pagination"
				class="pagination"
				part="pagination"
			>
				<div
					id="pips-cont"
					class="pips-cont ${verticalCss}"
					part="pips-cont ${verticalCss}"
				>
					${this._renderPips()}
				</div>
			</div>
		`;
	}

	private _renderPips(): TemplateResult[] {
		const pipsHtml: TemplateResult[] = [];

		for (let index = 0; index < this.total; index++) {
			const active = index === this.selected
				? "active"
				: "";

			pipsHtml.push(html`
				<div
					class="pip ${active}"
					part="pip ${active}"
					@click="${() => this._onChangePage(index)}"	
				>
				</div>
			`);
		}

		return pipsHtml;
	}



	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _triggerChangePageEvent(): void {
		const event: PandaPipsPagerChangeEvent = new CustomEvent("change", {
			detail: {
				pageIndex: this.selected
			}
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChangePage(pageIndex: number): void {
		this.selected = pageIndex;
		this._triggerChangePageEvent();
	}

}

declare global {
	interface HTMLElementTagNameMap {
		"panda-pips-pager": PandaPipsPager;
	}
}