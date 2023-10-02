// types
import { PageSizeListItem } from "../index";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-pagination")
export class PandaPagination extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: Array })
	pageSizeList: PageSizeListItem[] = [
		{ label: "50", value: 50 },
		{ label: "100", value: 100 },
		{ label: "200", value: 200 },
		{ label: "300", value: 300 },
	];

	@property({ type: Number })
	pageSize: number | null = null;

	@property({ type: Number })
	pageNumber: number | null = null;

	@property({ type: Number })
	totalElements: number | null = null;

	@property({ type: Boolean, attribute: true, reflect: true })
	busy: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled: boolean = false;

	@property({ type: String, attribute: true })
	spinnerType: string = "dots";

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		const cssClass: string[] = [];
		if (this.busy) cssClass.push("busy");
		if (this.disabled) cssClass.push("disabled");

		return html`
			<div
				class="pagination ${cssClass.join(" ")}"
				part="pagination"
			>
				<label>PAGE SIZE</label>
				<div
					class="page-size"
					part="page-size"
				>
					<panda-select
						class="drop-down"
						part="drop-down"
						.items="${this.pageSizeList}"
						.value="${this.pageSize}"
						?disabled="${this.disabled || this.busy}"
						@change="${(e: any) => this._onChangePageSize(e.detail.value)}"
					>
					</panda-select>
				</div>
				<div
					class="pages"
					part="pages"
				>
					${this._renderPages()}
				</div>
			</div>
		`;
	}

	private _renderPageButton(min: number, max: number) {
		const buttonHtml: TemplateResult[] = [];

		for (let i = min; i <- max; i++) {
			const active: string = this.pageNumber === i - 1
				? "active"
				: "";

			if (this.busy && active) {
				buttonHtml.push(html`
					<div class="btn ${active}">
						<panda-spinner spinner="${this.spinnerType}"></panda-spinner>
					</div>
				`);
			} else {
				buttonHtml.push(html`
					<div
						class="btn ${active}"
						@click="${() => this._onChangePage(i - 1)}"
					>
						${i}
					</div>
				`);
			}
		}

		return buttonHtml;
	}

	private _renderPages() {
		const buttonHtml: TemplateResult[] = [];
		
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public changePageNumber(pageNumber: number) {
		this.pageNumber = pageNumber;
	}

	public changePageSize(pageSize: number) {
		if (this.pageSizeList.find((item) => item.value === pageSize)) {
			this.pageSize = pageSize;
		}
	}

	public changePageSizeList(pageSizeList: PageSizeListItem[]) {
		if (pageSizeList?.length) {
			this.pageSizeList = pageSizeList;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChangePage(pageNumber: number) {

	}

	private _onChangePageSize(pageSize: number) {

	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-pagination": PandaPagination;
	}
}
