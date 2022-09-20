// types
import { PandaMonth } from "../index";

// style
import { styles } from "./styles/month-calendar-styles";
import { modifiers } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getDefaultMonth } from "./utils/utils";

@customElement("panda-month-calendar")
export class PandaMonthCalendar extends LitElement {
	// css style
	static get styles() {
		return [styles, modifiers];
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
	private _previousMonth: PandaMonth = getDefaultMonth();
	private _currentMonth: PandaMonth = getDefaultMonth();
	private _nextMonth: PandaMonth = getDefaultMonth();

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

		if (_changedProperties.has("weekStartsOnMonday") && this.weekStartsOnMonday) {
			this.firstDayOfWeek = 1;
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
		console.log("%c [_renderHeader]", "font-size: 24px; color: red;", this._currentMonth);
		// check if we have a selected date
		if (this._currentMonth) {
			const monthName = this._monthList[this._currentMonth.month || 0];

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
						${this._currentMonth.year}
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
			${this._renderCalendar()}
		`;
	}

	private _renderCalendar() {
		const daysHtml: TemplateResult[] = [];

		this._previousMonth.days.forEach((day) => {
			daysHtml.push(html`
				<div
					class="day btn txt-color-label"

				>
					${day.label}
				</div>
			`);
		});

		this._currentMonth.days.forEach((day) => {
			daysHtml.push(html`
				<div
					class="day btn"

				>
					${day.label}
				</div>
			`);
		});

		this._nextMonth.days.forEach((day) => {
			daysHtml.push(html`
				<div
					class="day btn txt-color-label"

				>
					${day.label}
				</div>
			`);
		});

		return html`
			<div class="calendar">
				${daysHtml}
			</div>
		`;
	}

	private _renderDaysOfWeek() {
		const headerHtml: TemplateResult[] = [];

		for (let i = 0; i < 7; i++) {
			// calculate day label index in case its set
			const dayLabelIndex = (i + this.firstDayOfWeek) % 7;

			headerHtml.push(html`
				<div class="day txt-color-label">
					${this._daysOfWeek[dayLabelIndex]}
				</div>
			`);
		}

		return html`
			<div
				class="calendar"
				part="days-of-week"
			>
				${headerHtml}
			</div>	
		`;
	}

	private _renderFooter() {
		return html`FOOTER`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _parseSelectedDate(date: string | number): void {
		this._currentMonth.date = new Date(date);

		// check if date is valid
		if (isNaN(this._currentMonth.date.getTime())) {
			// if date is invalid, fallback to Today
			this._currentMonth.date = new Date();
		}

		this._currentMonth.unix = this._currentMonth.date.getTime();
		this._currentMonth.day = this._currentMonth.date.getDate();
		this._currentMonth.month = this._currentMonth.date.getMonth();
		this._currentMonth.year = this._currentMonth.date.getFullYear();
		this._currentMonth.daysCount = this._getDaysInMonth(this._currentMonth.year, this._currentMonth.month + 1);
		// calculate start day index
		const firstDayOfMonth = new Date(this._currentMonth.year, this._currentMonth.month, 1);
		this._currentMonth.startDayIndex = this._getDayIndex(firstDayOfMonth.getDay() - this.firstDayOfWeek);

		// reset month details
		this._previousMonth.days = [];
		this._currentMonth.days = [];
		this._nextMonth.days = [];

		// generate previous month days for display
		for (let i = 0; i < this._currentMonth.startDayIndex; i++) {

			this._previousMonth.days.push({
				label: String(i + 1),
				date: this._formatDate(this._currentMonth.year, this._currentMonth.month - 1, i + 1)
			})
		}
		// generate current month days for display
		for (let i = 0; i < this._currentMonth.daysCount; i++) {
			this._currentMonth.days.push({
				label: String(i + 1),
				date: this._formatDate(this._currentMonth.year, this._currentMonth.month, i + 1)
			});
		}
		// generate next month days for display
		const maxDays = 42 - (this._previousMonth.days.length + this._currentMonth.daysCount);
		for (let i = 0; i < maxDays; i++) {
			this._nextMonth.days.push({
				label: String(i + 1),
				date: this._formatDate(this._currentMonth.year, this._currentMonth.month + 1, i + 1)
			});
		}

		console.log("%c [selectedDate]", "font-size: 24px; color: red;", this._currentMonth);
		console.log("%c [selectedDateUnix]", "font-size: 24px; color: red;", this._currentMonth.unix);
		console.log("%c [selectedDay]", "font-size: 24px; color: red;", this._currentMonth.day);
		console.log("%c [selectedMonth]", "font-size: 24px; color: red;", this._currentMonth);
		console.log("%c [selectedYear]", "font-size: 24px; color: red;", this._currentMonth.year);
		console.log("%c [selectedMonthDays]", "font-size: 24px; color: red;", this._currentMonth.daysCount);
		console.log("%c [monthStartDay]", "font-size: 24px; color: red;", this._currentMonth.startDayIndex, this._daysOfWeek[this._currentMonth.startDayIndex]);
		// trigger update due to side effect
		this.requestUpdate();
	}

	/**
	 * Get number of days in the month
	 * @param {Number} year
	 * @param {Number} month 
	 * @returns {Number} 
	 */
	private _getDaysInMonth(year: number, month: number): number {
		return new Date(year, month, 0).getDate();
	}

	/**
	 * Get day index for rendering
	 * @param {Number} dayOffset - day of the week
	 * @returns {Number} - day index offset for rendering and calculation purpose
	 */
	private _getDayIndex(dayOffset: number): number {
		if (dayOffset < 0) {
			return 7 + dayOffset;
		} else {
			return dayOffset;
		}
	}

	private _formatDate(year: number, month: number, day: number): string {
		let _year = String(year);
		let _month = `0${month}`.substring(-2);
		const _day = `0${day}`.substring(-2);

		// validate month
		if (month === 13) {
			_month = "01";
			_year = String(year + 1);
		}
		if (month === 0) {
			_month = "12";
			_year = String(year - 1);
		} 
		return `${year}-${_month}-${_day}`;
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
			// set value from 0 to 7
			this.firstDayOfWeek = firstDayOfWeek % 7;
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
