// types
import { PandaDate } from "../index";

// style
import { styles } from "./styles/month-calendar-styles";

// components
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-month-calendar")
export class PandaMonthCalendar extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: String })
	selectedDate: string | number = "";

	/**
	 * Show TODAY button on the calendar
	 * 
	 * [DEFAULT]: true
	 */
	@property({ type: Boolean })
	showToday: boolean = true;

	/**
	 * Set start of the week to Monday
	 * [DEFAULT]: false
	 */
	@property({ type: Boolean, attribute: "week-starts-on-monday" })
	weekStartsOnMonday: boolean = false;

	/**
	 * Set custom start of the week day.
	 * eg. set 1 to Monday.
	 * 
	 * [DEFAULT]: 0 (Sunday)
	 */
	@property({ type: Number })
	firstDayOfWeek: number = 0;

	/**
	 * Set custom list of months to display.
	 * 
	 * [DEFAULT]: null
	 */
	@property({ type: Array })
	customMonthList: string[] | null = null;

	/**
	 * Set custom list of week days to display.
	 * 
	 * [DEFAULT]: null
	 */
	 @property({ type: Array })
	customDaysOfWeekList: string[] | null = null;

	// private properties
	private _selectedDate: Date | null = null;
	private _selectedDateUnix: number | null = null;
	private _selectedDay: number | null = null;
	private _selectedMonth: number | null = null;
	private _selectedMonthDays: number | null = null;
	private _selectedYear: number | null = null;
	private _monthStartDay: number | null = null;

	// dictionary data
	private _monthList: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	private _daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(_changedProperties: PropertyValues): void {
		console.log("%c [updated] Panda Month Calendar", "font-size: 24px; color: green;", this.selectedDate);
		if (_changedProperties.has("selectedDate") && this.selectedDate) {
			this._parseSelectedDate(this.selectedDate);
		}
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		console.log("%c [firstUpdated] Panda Month Calendar", "font-size: 24px; color: green;", this.selectedDate);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div class="calendar-cont">
				${this._renderHeader()}
				${this._renderBody()}
				${this._renderFooter()}
			</div>
		`;
	}

	private _renderHeader() {
		console.log("%c [_renderHeader]", "font-size: 24px; color: red;", this._selectedDate);
		// check if we have a selected date
		if (this._selectedDate) {
			const monthName = this._monthList[this._selectedMonth || 0];

			return html`
				<div class="header" part="header">
					<div
						class="btn-icon"
						part="btn-icon"
						@click="${this._onMonthChangeBackward}"
					>
						<panda-icon icon="chevron-left"></panda-icon>
					</div>
					<div
						class="header-label"
						part="header-label"
						@click="${this._onChangeMonth}"
					>
						${monthName}&nbsp;
						${this._selectedYear}
					</div>
					<div
						class="btn-icon"
						part="btn-icon"
						@click="${this._onMonthChangeForward}"
					>
						<panda-icon icon="chevron-right"></panda-icon>
					</div>
				</div>
			`;
		}
	}

	private _renderBody() {
		return html`
			${this._renderDaysOfWeek()}
			<div class="">

			</div>
		`;
	}

	private _renderFooter() {

	}

	private _renderDaysOfWeek() {
		const headerHtml: TemplateResult[] = [];

		for (let i = 0; i < 7; i++) {
			// calculate day label index in case its set
			const dayLabelIndex = (i + this.firstDayOfWeek) % 7;

			headerHtml.push(html`
				<div class="cell">
					${this._daysOfWeek[dayLabelIndex]}
				</div>
			`);
		}

		return html`
			<div
				class="days-of-week"
				part="days-of-week"
			>
				${headerHtml}
			</div>	
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _parseSelectedDate(date: string | number): void {
		this._selectedDate = new Date(date);

		// check if date is valid
		if (isNaN(this._selectedDate.getTime())) {
			// if date is invalid, fallback to Today
			this._selectedDate = new Date();
		}
		
		this._selectedDateUnix = this._selectedDate.getTime();
		this._selectedDay = this._selectedDate.getDate();
		this._selectedMonth = this._selectedDate.getMonth();
		this._selectedYear = this._selectedDate.getFullYear();
		this._selectedMonthDays = this._getDaysInMonth(this._selectedYear, this._selectedMonth + 1);
		this._monthStartDay = this._selectedDate.getDay();

		console.log("%c [selectedDate]", "font-size: 24px; color: red;", this._selectedDate);
		console.log("%c [selectedDateUnix]", "font-size: 24px; color: red;", this._selectedDateUnix);
		console.log("%c [selectedDay]", "font-size: 24px; color: red;", this._selectedDay);
		console.log("%c [selectedMonth]", "font-size: 24px; color: red;", this._selectedMonth);
		console.log("%c [selectedYear]", "font-size: 24px; color: red;", this._selectedYear);
		console.log("%c [selectedMonthDays]", "font-size: 24px; color: red;", this._selectedMonthDays);
		console.log("%c [monthStartDay]", "font-size: 24px; color: red;", this._monthStartDay, this._daysOfWeek[this._monthStartDay]);
		// trigger update due to side effect
		this.requestUpdate();
	}

	private _getDaysInMonth(year: number, month: number): number {
		return new Date(year, month, 0).getDate();
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public selectDate(selectedDate: string | number): void {
		const newDate = new Date(selectedDate);
		// check if date is valid
		if (isNaN(newDate.getTime())) {
			console.warn("%c [PANDA DATE PICKER] selectDate - Invalid date format.", "font-size: 16px;");
		} else {
			this.selectedDate = selectedDate;
		}
	}

	public setFirstDayOfWeek(firstDayOfWeek: number): void {
		if (isNaN(firstDayOfWeek)) {
			console.warn("%c [PANDA DATE PICKER] setFirstDayOfWeek - Wrong type of argument. Provided value is not a number.", "font-size: 16px;");
		} else {
			this.firstDayOfWeek = firstDayOfWeek;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onAction() {
		const event = new CustomEvent("change", {
			detail: {
				date: this.selectedDate
			}
		});
		this.dispatchEvent(event);
	}

	private _onChangeMonth() {
		console.log("%c _onChangeMonth", "font-size: 24px; color: green;");
	}

	private _onMonthChangeBackward() {
		console.log("%c _onMonthChangeBackward", "font-size: 24px; color: green;");
	}

	private _onMonthChangeForward() {
		console.log("%c _onMonthChangeForward", "font-size: 24px; color: green;");
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-month-calendar": PandaMonthCalendar;
	}
}
