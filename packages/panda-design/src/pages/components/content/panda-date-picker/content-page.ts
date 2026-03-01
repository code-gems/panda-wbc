// types
import { PandaDatePickerChangeEvent, PandaDatePickerI18nConfig, PandaEvent } from "@panda-wbc/panda-date-picker";
import { ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import {PandaDatePicker} from "@panda-wbc/panda-date-picker/lib/panda-date-picker";
import "@panda-wbc/panda-date-picker";
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-icon/lib/food-icon-pack";

// utils & config
import { html, TemplateResult } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { ContentPageTemplate } from "../../../content-page-template";
import { page } from "../../../../utils/page-library";
import { pageConfig } from "./page-config";

// code snippets
import {
	implementationSnippet,
	installationSnippet
} from "./snippets/snippets";

@page(pageConfig)
@customElement("panda-date-picker-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public pageId = pageConfig.pageId;
	public customStyles = styles;

	@state()
	private readonly _presetDates = [
		{ label: "My B-Day", date: "2022-09-01" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
	];

	@state()
	private readonly _events: PandaEvent[] = [
		{ date: "2022-12-25", label: "Interview", description: "Wish me luck ;)", time: "14:30" },
		{ date: "2022-12-28", label: "Dinner with friends", description: "John's Pizza, Orchard St. #01-21 B1", time: "19:00" },
		{ date: "2022-12-02", label: "My Birthday", description: "Happy Birthday ME!!!", wholeDay: true, time: "12:00" },
		{ date: "2022-11-29", label: "Some event", description: "Some event description", wholeDay: true, time: "12:00" },
	];

	@state()
	private readonly _log: string[] = [];

	@state()
	private _value: string | null = `2026-02-22`;

	@state()
	private _readonly = false;

	@state()
	private _working = false;

	@state()
	private _disabled = false;
	
	@state()
	private _showClearButton = false;

	@state()
	private _selectedLanguage: "en" | "zh" = "en";

	@state()
	private _i18n!: PandaDatePickerI18nConfig;

	private readonly _i18nEnglish: PandaDatePickerI18nConfig = {
		today: "Today",
		cancel: "Cancel",
		select: "Select",
		months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		fullMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		fullDaysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	};

	private readonly _i18nChinese: PandaDatePickerI18nConfig = {
		today: "今天",
		cancel: "取消",
		select: "选择",
		months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		fullMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
		fullDaysOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
	};

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>

					</p>
				</div>

				<div class="rows">
					<div class="row">
						<div class="col-3">
							<panda-text-field
								label="Text Field (reference)"
								placeholder="Select birthday asd asd asd asd asd asd sad sadsad ..."
								show-clear-button
								.readonly="${this._readonly}"
								.working="${this._working}"
								.disabled="${this._disabled}"
							></panda-text-field>
						</div>
					</div>

					<div class="row">
						<div class="col-3">
							<panda-date-picker
								.value="${this._value}"
								.readonly="${this._readonly}"
								.working="${this._working}"
								.disabled="${this._disabled}"
								.showClearButton="${this._showClearButton}"
								.i18n="${this._i18n}"
								@change="${this._onDateChange}"
							></panda-date-picker>
						</div>
					</div>
				</div>

				<div class="rows">
					<div class="row">
						<div class="col-3">
							<panda-button @click="${this._onSetValue}">
								SET VALUE (${this._value ? this._value : "NULL"})
							</panda-button>
						</div>
						<div class="col-3">
							<panda-button @click="${this._onChangeLanguage}">
								TOGGLE I18N (${this._selectedLanguage === "en" ? "ZH" : "EN"})
							</panda-button>
						</div>
						<div class="col-3">
							<panda-button @click="${this._onToggleClearButton}">
								TOGGLE CLEAR BUTTON (${this._showClearButton ? "ON" : "OFF"})
							</panda-button>
						</div>
					</div>
					
					<div class="row">
						<div class="col-3">
							<panda-button @click="${this._onToggleWorking}">
								TOGGLE WORKING (${this._working ? "ON" : "OFF"})
							</panda-button>
						</div>
						<div class="col-3">
							<panda-button @click="${this._onToggleReadonly}">
								TOGGLE READ-ONLY (${this._readonly ? "ON" : "OFF"})
							</panda-button>
						</div>
						<div class="col-3">
							<panda-button @click="${this._onToggleDisabled}">
								TOGGLE DISABLE (${this._disabled ? "ON" : "OFF"})
							</panda-button>
						</div>
					</div>
				</div>

				<div class="rows">
					<div class="row">
						<div class="col-full">
							<p>Selected value: ${this._value}</p>
							<p>Event log:</p>
							<ul>
								${this._log.map((log) => html`<li>${log}</li>`)}
							</ul>
						</div>
					</div>
				</div>
				
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onDateChange(event: PandaDatePickerChangeEvent): void {
		console.log(
			`%c 🚀 [DEMO PAGE] (_onDateChange)`,
			"font-size: 24px; color: purple;",
			event.detail.value
		);

		this._value = event.detail.value;
		this._log.unshift(`Date changed to: ${this._value}`);
		this.requestUpdate();
	}

	private _onSetValue(): void {
		this._value = "1983-01-09";
	}

	private _onToggleWorking(): void {
		this._working = !this._working;
	}

	private _onToggleReadonly(): void {
		this._readonly = !this._readonly;
	}

	private _onToggleDisabled(): void {
		this._disabled = !this._disabled;
	}

	private _onToggleClearButton(): void {
		this._showClearButton = !this._showClearButton;
	}

	private _onChangeLanguage(): void {
		this._selectedLanguage = this._selectedLanguage === "en" ? "zh" : "en";
		this._i18n = this._selectedLanguage === "en"
			? this._i18nEnglish
			: this._i18nChinese;

		const datePicker = new PandaDatePicker();
		datePicker.readonly = this._readonly;
		datePicker.working = this._working;
		datePicker.disabled = this._disabled;
		datePicker.format = "";
		datePicker.value = this._value;
		datePicker.i18n = this._i18n;
		datePicker.highlightDates = [
			{ label: "Holiday", date: "2022-12-25" },
			{ label: "Christmas", date: "2022-12-26" },
			{ label: "Holiday", dateFrom: "2022-12-27", dateTo: "2022-12-30" },
		];

		// XXS injection test
		datePicker.helpText = `<img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="xss" />`;

		this.shadowRoot?.appendChild(datePicker);
	}
}