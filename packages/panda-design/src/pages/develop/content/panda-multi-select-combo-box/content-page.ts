// types
import { ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-multi-select-combo-box";
import "@panda-wbc/panda-text-field"

// utils & config
import { TemplateResult, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import { pageConfig } from "./page-config";
import { PandaMultiSelectComboBoxItem } from "@panda-wbc/panda-multi-select-combo-box";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// code snippets
// ...

import { SyntaxHighlighter } from "./code";
import { PandaSelectChangeEvent } from "@panda-wbc/panda-select";
import { PandaComboBoxChangeEvent } from "@panda-wbc/panda-combo-box";

@page(pageConfig)
@customElement("panda-multi-select-combo-box-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public pageId: string = pageConfig.pageId;
	public customStyles = styles;

	// demo props

	private readonly _items: PandaMultiSelectComboBoxItem[] = [
		{ label: "Argentina", value: "AR", group: "South America" },
		{ label: "Austria", value: "AT", group: "Europe" },
		{ label: "Brazil", value: "BR", group: "South America" },
		{ label: "China", value: "CN", group: "Asia" },
		{ label: "Colombia Colombia Colombia Colombia Colombia Colombia Colombia Colombia Colombia", value: "CO", group: "South America" },
		{ label: "France", value: "FR", group: "Europe" },
		{ label: "Germany", value: "DE", group: "Europe" },
		{ label: "Italy", value: "IT", group: "Europe" },
		{ label: "Mexico", value: "MX", group: "North America" },
		{ label: "Netherlands", value: "NL", group: "Europe" },
		{ label: "Peru", value: "PE", group: "South America" },
		{ label: "Poland", value: "PL", group: "Europe" },
		{ label: "Portugal", value: "PT", group: "Europe" },
		{ label: "Singapore", value: "SG", group: "Asia" },
		{ label: "Spain", value: "ES", group: "Europe" },
		{ label: "Switzerland", value: "CH", group: "Europe" },
		{ label: "United States", value: "US", group: "North America" },
		{ label: "Vietnam", value: "VN", group: "Asia" },
	];

	private readonly _itemsCustom: any[] = [
		{ name: "Argentina", group: "South America", code: "AR" },
		{ name: "Austria", code: "AT", group: "Europe" },
		{ name: "Belgium", code: "BE", group: "Europe" },
		{ name: "Brazil", code: "BR", group: "South America" },
		{ name: "Canada", code: "CA", group: "North America" },
		{ name: "China", code: "CN", disabled: true },
		{ name: "Colombia Colombia Colombia Colombia Colombia Colombia Colombia Colombia Colombia", code: "CO", group: "South America" },
		{ name: "France", code: "FR", group: "Europe" },
		{ name: "Germany", code: "DE", group: "Europe" },
		{ name: "Italy", code: "IT", group: "Europe" },
		{ name: "Mexico", code: "MX", group: "North America" },
		{ name: "Netherlands", code: "NL", group: "Europe" },
		{ name: "Peru", code: "PE", group: "South America" },
		{ name: "Poland", code: "PL", group: "Europe", disabled: true },
		{ name: "Portugal", code: "PT", group: "Europe" },
		{ name: "Russia", code: "RU", group: "Europe" },
		{ name: "Singapore", code: "SG", group: "Asia" },
		{ name: "Spain", code: "ES", group: "Europe" },
		{ name: "Switzerland", code: "CH", group: "Europe" },
		{ name: "United States", code: "US", group: "North America" },
		{ name: "Vietnam", code: "VN", group: "Asia", disabled: true },
		{ name: "Zimbabwe", code: "ZW" },
	];

	private readonly _sizes = [
		{ label: "[default]", value: "" },
		{ label: "Size S", value: "size-s" },
		{ label: "Size L", value: "size-l" },
		{ label: "Size XL", value: "size-xl" },
	];

	private readonly _customStyle = `
		.country-item {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
		}

		.country-item .flag {
			display: flex;
			flex-shrink: 0;
			justify-content: center;
			align-items: center;
			width: 24px;
			height: 100%;
		}

		.country-item .label {
			font-weight: 500;
		}

		.footer-actions {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: 5px;
			background-color: var(--panda-background-color-300);
			border-radius: 5px;
		}
	`;

	@state()
	private _size: string = "";

	@state()
	private _theme: string = "";

	private readonly _themes = [
		{ label: "[default]", value: "" },
		{ label: "Mandatory", value: "mandatory" },
		{ label: "Valid", value: "valid" },
		{ label: "Invalid", value: "invalid" },
	];

	private readonly _i18nChinese = {
		allItems: "所有选项",
		selectAll: "全选",
		selectedItems: "已选项",
		reset: "重置",
		filterPlaceholder: ["输入以过滤..."],
		noDataFound: "未找到数据",
	};

	private _value = null;

	@state()
	private _multiselect = false;

	@state()
	private _mandatory = false;

	@state()
	private _readonly = false;

	@state()
	private _working = false;

	@state()
	private _disabled = false;

	@state()
	private _autoExpand = false;

	@state()
	private _showClearButton = false;
	
	@state()
	private _disableAutoOpen = false;

	@state()
	private _hideDropdownButton = false;

	@state()
	private _showFilter = false;

	@state()
	private _showItemCount = false;

	@state()
	private _min: number | null = null;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>Multi-Select Combo Box</h1>
				<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		const ts = `
const xxx = async (name: string): void => {
  // comments
  console.log(\`Hello, \${name}!\`);
}

// @syntax-html
<!-- comments -->
<div class="asd" disabled>
  <div class="asd" disabled><p>
    Some text
  </div>
</div>
`;
		// const code = new SyntaxHighlighter([{ code: ts, language: 'typescript' }]).highlight();
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						// describe multiselect component

					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-half">
									<panda-button>PLACEHOLDER</panda-button>
								</div>
							</div>
							<div class="row">
								<div class="col-2">
									<panda-combo-box
										label="Select size:"
										.value="${this._size}"
										.items="${this._sizes}"
										@change="${this._onSizeChange}"
									></panda-combo-box>
								</div>
								<div class="col-2">
									<panda-combo-box
										label="Select theme:"
										.value="${this._theme}"
										.items="${this._themes}"
										@change="${this._onThemeChange}"
									></panda-combo-box>
								</div>
							</div>
							<div class="row">

								<div class="col-3">
									<panda-multi-select-combo-box
										theme="${this._size + " " + this._theme}"
										label="Select country:"
										error-message="this is an error message"
										placeholder="Select country..."
										.items="${this._items}"
										.value="${this._value}"
										
										.hideDropdownButton="${this._hideDropdownButton}"
										.min="${this._min}"
										.autoExpand="${this._autoExpand}"
										.showFilter="${this._showFilter}"
										.showItemCount="${this._showItemCount}"
										.showClearButton="${this._showClearButton}"
										.disableAutoOpen="${this._disableAutoOpen}"
										.readonly="${this._readonly}"
										.multiselect="${this._multiselect}"
										.mandatory="${this._mandatory}"
										.working="${this._working}"
										.disabled="${this._disabled}"


										.itemRenderer="${this._itemRenderer}"
										.groupRenderer="${this._groupRenderer}"
										.footerRenderer="${this._renderFooter}"

										.customStyle="${this._customStyle}"

										@change="${this._onChange}"
									>
									</panda-multi-select-combo-box>
								</div>

								<div class="col-half">
									<div id="value-cont">
										<b>Selected value:</b>
										${this._renderValues(this._value)}
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-3">
									<panda-text-field
										placeholder="Enter..."
										.theme="${this._size + " " + this._theme}"
									></panda-text-field>
								</div>
							</div>

							<div class="row">
								<div class="col-3">
									<panda-button @click="${this._onToggleMultiselect}">
										Toggle Multiselect (${this._multiselect ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleReadonly}">
										Toggle Readonly (${this._readonly ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleWorking}">
										Toggle Working (${this._working ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleDisabled}">
										Toggle Disabled (${this._disabled ? "ON" : "OFF"})
									</panda-button>
								</div>
							</div>

							<div class="row">
								<div class="col-3">
									<panda-button @click="${this._onToggleAutoExpand}">
										Toggle Auto-Expand (${this._autoExpand ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleShowClearButton}">
										Toggle Clear Button (${this._showClearButton ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleShowFilter}">
										Toggle Filter (${this._showFilter ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleMandatory}">
										Toggle Mandatory (${this._mandatory ? "ON" : "OFF"})
									</panda-button>
								</div>
							</div>

							<div class="row">
								<div class="col-3">
									<panda-button @click="${this._onAsyncDisable}">
										Async Disable (2 sec)
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onAsyncReadonly}">
										Async Readonly (2 sec)
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onAsyncWorking}">
										Async Working (2 sec)
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onSetMinValue}">
										Set min value (${this._min ? "2" : "null"})
									</panda-button>
								</div>
							</div>

							<div class="row">
								<div class="col-3">
									<panda-button @click="${this._onToggleDisableAutoOpen}">
										Toggle AutoOpen (${this._disableAutoOpen ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleDropdownButton}">
										Toggle Dropdown Button (${this._hideDropdownButton ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleItemCount}">
										Toggle Item Count (${this._showItemCount ? "ON" : "OFF"})
									</panda-button>
								</div>
							</div>

<!--
							<div class="row">
								<div class="col-half">
									<panda-multi-select-combo-box
										label="Select country: (single)"
										placeholder="Select..."
										show-filter
										show-clear-button
										.items="${this._items}"
										.value="${"CO"}"
										@change="${this._onChange}"
									>
										<div slot="prefix" class="icon">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-multi-select-combo-box>
								</div>
							</div>
-->
						</div>
					</div>
				</div>

			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderValues(value: any): TemplateResult | TemplateResult[] {
		if (value == null || value?.length === 0) {
			return html`<i>[no values]</i>`;
		} else if (Array.isArray(value)) {
			return html`${value.join(", ")}`;
		} else {
			return html`<div>${value}</div>`;
		}
	}

	private _itemRenderer(item: any): string {
		return `
			<div class="country-item">
				<div class="flag">
					<panda-flag flag="${item.value}"></panda-flag>
				</div>
				<div class="label">
					${item.label}
				</div>
			</div>
		`;
	}

	private _groupRenderer(groupName: string, items: any[]): string {
		const selectedCount = items.filter(i => i.selected).length;
		return `
			${groupName} <panda-badge theme="info size-s">${selectedCount}/${items.length}</panda-badge>
		`;
	}

	private _renderFooter(items: any[]): string {
		return `
			<div class="footer-actions">
				<div class="label">
					Total items: ${items.length}
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChange(event: PandaSelectChangeEvent): void {
		console.log(`%c ⚡ [DEMO] (_onChange) event`, "font-size: 24px; color: blue;", event.detail);
		this._value = event.detail.value;
		this.requestUpdate();
	}

	private _onToggleMultiselect(): void {
		console.log(`%c ⚡ [DEMO] (_onToggleMultiselect)`, "font-size: 24px; color: blue;", !this._multiselect);
		this._multiselect = !this._multiselect;
	}

	private _onToggleReadonly(): void {
		console.log(`%c ⚡ [DEMO] (_onToggleReadonly)`, "font-size: 24px; color: blue;", !this._readonly);
		this._readonly = !this._readonly;
	}

	private _onToggleWorking(): void {
		console.log(`%c ⚡ [DEMO] (_onToggleWorking)`, "font-size: 24px; color: blue;", !this._working);
		this._working = !this._working;
	}

	private _onToggleDisabled(): void {
		console.log(`%c ⚡ [DEMO] (_onToggleDisabled)`, "font-size: 24px; color: blue;", !this._disabled);
		this._disabled = !this._disabled;
	}

	private _onToggleAutoExpand(): void {
		console.log(`%c ⚡ [DEMO] (_onToggleAutoExpand)`, "font-size: 24px; color: blue;", !this._autoExpand);
		this._autoExpand = !this._autoExpand;
	}

	private _onToggleShowClearButton(): void {
		console.log(`%c ⚡ [DEMO] (_onToggleShowClearButton)`, "font-size: 24px; color: blue;", !this._showClearButton);
		this._showClearButton = !this._showClearButton;
	}

	private _onToggleShowFilter(): void {
		console.log(`%c ⚡ [DEMO] (_onToggleShowFilter)`, "font-size: 24px; color: blue;", !this._showFilter);
		this._showFilter = !this._showFilter;
	}

	private async _onToggleDisableAutoOpen(): Promise<void> {
		console.log(`%c ⚡ [DEMO] (_onToggleDisableAutoOpen)`, "font-size: 24px; color: blue;");
		this._disableAutoOpen = !this._disableAutoOpen;
	}

	private _onToggleMandatory(): void {
		console.log(`%c ⚡ [DEMO] (_onToggleMandatory)`, "font-size: 24px; color: blue;", !this._mandatory);
		this._mandatory = !this._mandatory;
	}

	private _onToggleDropdownButton(): void {
		console.log(`%c ⚡ [DEMO] (_onToggleDropdownButton)`, "font-size: 24px; color: blue;");
		this._hideDropdownButton = !this._hideDropdownButton;
	}

	private async _onAsyncDisable(): Promise<void> {
		console.log(`%c ⚡ [DEMO] (_onAsyncDisable)`, "font-size: 24px; color: blue;");

		await new Promise((r) => setTimeout(r, 2000));
		this._disabled = !this._disabled;
	}

	private async _onAsyncReadonly(): Promise<void> {
		console.log(`%c ⚡ [DEMO] (_onAsyncReadonly)`, "font-size: 24px; color: blue;");

		await new Promise((r) => setTimeout(r, 2000));
		this._readonly = !this._readonly;
	}

	private async _onAsyncWorking(): Promise<void> {
		console.log(`%c ⚡ [DEMO] (_onAsyncWorking)`, "font-size: 24px; color: blue;");

		await new Promise((r) => setTimeout(r, 2000));
		this._working = !this._working;
	}

	private _onSizeChange(event: PandaComboBoxChangeEvent): void {
		this._size = event.detail.value;
		console.log(`%c ⚡ [DEMO] (_onSizeChange)`, "font-size: 24px; color: blue;", this._size);
	}

	private _onThemeChange(event: PandaComboBoxChangeEvent): void {
		this._theme = event.detail.value;
		console.log(`%c ⚡ [DEMO] (_onThemeChange)`, "font-size: 24px; color: blue;", this._theme);
	}

	private _onSetMinValue(): void {
		console.log(`%c ⚡ [DEMO] (_onSetMinValue)`, "font-size: 24px; color: blue;");
		this._min = this._min ? null : 2;
	}

	private _onToggleItemCount(): void {
		console.log(`%c ⚡ [DEMO] (_onToggleItemCount)`, "font-size: 24px; color: blue;");
		this._showItemCount = !this._showItemCount;
	}
}
