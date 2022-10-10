// types
import { PandaDate, PandaMonth, PandaDateRange } from "../index";

// style
import { styles } from "./styles/month-calendar-styles";
import { modifiers } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getDaysOfWeek, getFullMonths } from "./utils/utils";

@customElement("panda-month-calendar")
export class PandaMonthCalendar extends LitElement {
	// css style
	static get styles() {
		return [styles, modifiers];
	}

	@property({ type: String })
	selectedDate: string | number | null = "";
	
	/**
	 * Set bottom limit for date selection.
	 * 
	 * example: "2000-01-01" [YYYY-MM-DD] or 946684800000 [X]
	 * 
	 * [DEFAULT] null
	 */
	 @property({ type: String, attribute: true })
	 min!: string | null;
 
	 /**
	  * Set upper limit for date selection.
	  * 
	  * example: "2000-01-01" [YYYY-MM-DD] or 946684800000 [X]
	  * 
	  * [DEFAULT] null
	  */
	  @property({ type: String, attribute: true })
	 max!: string | null;
	 
	 /**
	  * Disable weekends from selection.
	  * 
	  * [DEFAULT] false
	  */
	 @property({ type: Boolean, attribute: "disable-weekends" })
	 disableWeekends!: boolean;
	 
	 /**
	  * Disable individual dates from selection.
	  * Supports wildcard notation "**" see example below
	  * 
	  * example: ["2020-01-01", "2020-02-**"]
	  * 
	  * [DEFAULT] null
	  */
	 @property({ type: Array })
	 disableDates!: string[] | null;
	 
	 /**
	  * Disable day(s) of the week from selection.
	  * 
	  * example: ["Wed", "Fri"]
	  * 
	  * [DEFAULT] null
	  */
	 @property({ type: Array })
	 disableWeekDays!: string[] | null;
	 
	 /**
	  * Disable date range from selection. 
	  * It is possible to define list of date ranges.
	  * 
	  * example: [{ from: "2020-01-01", to: "2020-01-20" }]
	  * 
	  * [DEFAULT] null
	  */
	 @property({ type: Array })
	 disableDateRange!: PandaDateRange[] | null;

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
	private _selectedDate: PandaDate | null = null;
	private _previousMonth: PandaMonth | null = null;
	private _currentMonth: PandaMonth | null = null;
	private _nextMonth: PandaMonth | null = null;

	// dictionary data
	private _monthList: string[] = getFullMonths();
	private _daysOfWeek: string[] = getDaysOfWeek();
	private _maxCalendarDays = 42;


	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(_changedProperties: PropertyValues): void {
		console.log("%c [updated] Panda Month Calendar", "font-size: 24px; color: red;", _changedProperties, this.selectedDate);
		if (_changedProperties.has("selectedDate") && this.selectedDate !== undefined) {
			this._parseSelectedDate(this.selectedDate);
		}

		if (_changedProperties.has("weekStartsOnMonday") && this.weekStartsOnMonday) {
			this.firstDayOfWeek = 1;
		}
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		console.log("%c [firstUpdated] Panda Month Calendar", "font-size: 24px; color: green;");

		console.log("%c selectedDate", "font-size: 24px; color: green;", this.selectedDate);
		console.log("%c min", "font-size: 24px; color: green;", this.min);
		console.log("%c max", "font-size: 24px; color: green;", this.max);
		console.log("%c disableWeekends", "font-size: 24px; color: green;", this.disableWeekends);
		console.log("%c disableDates", "font-size: 24px; color: green;", this.disableDates);
		console.log("%c disableWeekDays", "font-size: 24px; color: green;", this.disableWeekDays);
		console.log("%c disableDateRange", "font-size: 24px; color: green;", this.disableDateRange);
		console.log("%c weekStartsOnMonday", "font-size: 24px; color: green;", this.weekStartsOnMonday);
		console.log("%c firstDayOfWeek", "font-size: 24px; color: green;", this.firstDayOfWeek);
		console.log("%c customMonthList", "font-size: 24px; color: green;", this.customMonthList);
		console.log("%c customDaysOfWeekList", "font-size: 24px; color: green;", this.customDaysOfWeekList);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div class="calendar-cont">
				${this._renderHeader()}
				${this._renderDaysOfWeek()}
				${this._renderCalendar()}
			</div>
		`;
	}

	private _renderHeader() {
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

	private _renderCalendar() {
		if (this._previousMonth && this._currentMonth && this._nextMonth) {
			const daysHtml: TemplateResult[] = [];
			this._currentMonth.daysCount = this._getDaysInMonth(this._currentMonth.year, this._currentMonth.month);
			// calculate start day index
			const firstDayOfMonth = new Date(this._currentMonth.year, this._currentMonth.month, 1);
			this._currentMonth.startDayIndex = this._getDayIndex(firstDayOfMonth.getDay() - this.firstDayOfWeek);

			// reset month details
			this._previousMonth.days = [];
			this._currentMonth.days = [];
			this._nextMonth.days = [];

			// generate previous month days for display
			this._previousMonth.year = this._currentMonth.year;
			this._previousMonth.month = this._currentMonth.month;
			this._previousMonth = this._changeMonth(this._previousMonth, -1);
			this._previousMonth.daysCount = this._getDaysInMonth(this._previousMonth.year, this._previousMonth.month);
			// calculate previous month start day index
			let startIndex = this._previousMonth.daysCount - this._currentMonth.startDayIndex;

			for (let i = startIndex; i < this._previousMonth.daysCount; i++) {
				this._previousMonth.days.push({
					label: String(i + 1),
					date: this._formatDate(this._previousMonth.year, this._previousMonth.month, i + 1),
					selected: this._isSelected(this._previousMonth.year, this._previousMonth.month, i + 1),
					isToday: this._isToday(this._previousMonth.year, this._previousMonth.month, i + 1),
				});
			}

			for (let i = 0; i < this._currentMonth.daysCount; i++) {
				this._currentMonth.days.push({
					label: String(i + 1),
					date: this._formatDate(this._currentMonth.year, this._currentMonth.month, i + 1),
					selected: this._isSelected(this._currentMonth.year, this._currentMonth.month, i + 1),
					isToday: this._isToday(this._currentMonth.year, this._currentMonth.month, i + 1),
				});
			}

			// generate next month days for display
			this._nextMonth.year = this._currentMonth.year;
			this._nextMonth.month = this._currentMonth.month;
			this._nextMonth = this._changeMonth(this._nextMonth, 1);
			const maxDays = this._maxCalendarDays - (this._previousMonth.days.length + this._currentMonth.days.length);

			for (let i = 0; i < maxDays; i++) {
				this._nextMonth.days.push({
					label: String(i + 1),
					date: this._formatDate(this._nextMonth.year, this._nextMonth.month, i + 1),
					selected: this._isSelected(this._nextMonth.year, this._nextMonth.month, i + 1),
					isToday: this._isToday(this._nextMonth.year, this._nextMonth.month, i + 1),
				});
			}

			this._previousMonth.days.forEach(({ date, label, selected, disabled, isToday }) => {
				const cssClassList: string[] = [];
				// add calendar day classes				
				if (selected) cssClassList.push("selected");
				if (isToday) cssClassList.push("today");

				daysHtml.push(html`
					<div
						class="day btn txt-color-label ${cssClassList.join(" ")}"
						title="${date}"
						?selected="${selected}"
						?today="${isToday}"
						@click="${() => this._onSelectDate(date)}"
					>
						${label}
					</div>
				`);
			});

			this._currentMonth.days.forEach(({ date, label, selected, disabled, isToday }) => {
				const cssClassList: string[] = [];
				// add calendar day classes				
				if (selected) cssClassList.push("selected");
				if (isToday) cssClassList.push("today");

				daysHtml.push(html`
					<div
						class="day btn ${cssClassList.join(" ")}"
						title="${date}"
						?selected="${selected}"
						?today="${isToday}"
						@click="${() => this._onSelectDate(date)}"
					>
						${label}
					</div>
				`);
			});

			this._nextMonth.days.forEach(({ date, label, selected, disabled, isToday }) => {
				const cssClassList: string[] = [];
				// add calendar day classes				
				if (selected) cssClassList.push("selected");
				if (isToday) cssClassList.push("today");

				daysHtml.push(html`
					<div
						class="day btn txt-color-label ${cssClassList.join(" ")}"
						title="${date}"
						?selected="${selected}"
						?today="${isToday}"
						@click="${() => this._onSelectDate(date)}"
					>
						${label}
					</div>
				`);
			});

			return html`
			<div class="calendar">
				${daysHtml}
			</div>
		`;
		}
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

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _parseSelectedDate(date: string | number | null): void {
		let selectedDate: Date = new Date(date as string | number);

		// check if date is valid
		if (date === null || isNaN(selectedDate.getTime())) {
			// if date is invalid, fallback to Today
			selectedDate = new Date();
		}
		// update selected date object
		if (selectedDate) {
			this._selectedDate = {
				date: selectedDate,
				unix: selectedDate.getTime(),
				day: selectedDate.getDate(),
				month: selectedDate.getMonth(),
				year: selectedDate.getFullYear(),
			};
		}
		this._currentMonth = {
			year: selectedDate.getFullYear(),
			month: selectedDate.getMonth(),
			days: [],
			daysCount: 0,
			startDayIndex: 0
		};
		this._previousMonth = {
			year: selectedDate.getFullYear(),
			month: selectedDate.getMonth(),
			days: [],
			daysCount: 0,
			startDayIndex: 0
		};
		this._nextMonth = {
			year: selectedDate.getFullYear(),
			month: selectedDate.getMonth(),
			days: [],
			daysCount: 0,
			startDayIndex: 0
		};
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
		return new Date(year, month + 1, 0).getDate();
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

	/**
	 * Validate value if it exceeds maximal value.
	 * 
	 * @param {Number} value - value to validate 
	 * @param {Number} maxValue - max value to validate against
	 * @returns {Number} value that do not exceeds maximal value
	 */
	private _getMaxValue(value: number, maxValue: number): number {
		if (value > maxValue) {
			return maxValue;
		} else {
			return value;
		}
	}

	/**
	 * Return date string formatted against specified date format.
	 * @param {Number} year
	 * @param {Number} month - month value starts from 0
	 * @param {Number} day 
	 * @returns {String} Formatted date string
	 */
	private _formatDate(year: number, month: number, day: number): string {
		let _year = String(year);
		let _month = `0${month + 1}`.slice(-2);
		const _day = `0${day}`.slice(-2);

		// validate month
		if (month === 12) {
			_month = "01";
			_year = String(year + 1);
		}
		if (month === -1) {
			_month = "12";
			_year = String(year - 1);
		}
		return `${_year}-${_month}-${_day}`;
	}

	/**
	 * Check if provided date is equal to selected date
	 * 
	 * @param {Number} year 
	 * @param {Number} month 
	 * @param {Number} day 
	 * @returns {Boolean} 
	 */
	private _isSelected(year: number, month: number, day: number): boolean {
		return this.selectedDate
			? year === this._selectedDate!.year &&
			month === this._selectedDate!.month &&
			day === this._selectedDate!.day
			: false;
	}

	private _isToday(year: number, month: number, day: number): boolean {
		const today = new Date();
		const todayYear = today.getFullYear();
		const todayMonth = today.getMonth();
		const todayDay = today.getDate();
		return todayYear === year &&
			todayMonth === month &&
			todayDay === day;
	}

	private _changeMonth(pandaMonth: PandaMonth, offset: number): PandaMonth {
		const _pandaMonth = JSON.parse(JSON.stringify(pandaMonth));

		if (_pandaMonth.month !== null && _pandaMonth.year !== null) {
			_pandaMonth.month = _pandaMonth.month + offset;

			if (_pandaMonth.month < 0) {
				_pandaMonth.month = 11;
				_pandaMonth.year = _pandaMonth.year - 1;
			} else if (_pandaMonth.month > 11) {
				_pandaMonth.month = 0;
				_pandaMonth.year = _pandaMonth.year + 1;
			}
		}
		return _pandaMonth;
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
	}

	private _onChangeMonth() {
		// console.log("%c _onChangeMonth", "font-size: 24px; color: green;");
	}

	private _onMonthChangeBackward() {
		// console.log("%c _onMonthChangeBackward", "font-size: 24px; color: green;");

		if (
			this._previousMonth &&
			this._currentMonth &&
			this._nextMonth
		) {
			this._previousMonth = this._changeMonth(this._previousMonth, -1);
			this._currentMonth = this._changeMonth(this._currentMonth, -1);
			this._nextMonth = this._changeMonth(this._nextMonth, -1);
		}
		this.requestUpdate();
	}

	private _onMonthChangeForward() {
		// console.log("%c _onMonthChangeForward", "font-size: 24px; color: green;");
		if (
			this._previousMonth &&
			this._currentMonth &&
			this._nextMonth
		) {
			this._previousMonth = this._changeMonth(this._previousMonth, 1);
			this._currentMonth = this._changeMonth(this._currentMonth, 1);
			this._nextMonth = this._changeMonth(this._nextMonth, 1);
		}
		this.requestUpdate();
	}

	private _onSelectDate(date: string) {
		console.log("%c [MONTH CALENDAR] _onSelectDate", "font-size: 24px; color: green;", date);
		this.selectedDate = date;
		this._parseSelectedDate(date);

		// trigger change event
		const event = new CustomEvent("change", {
			detail: {
				date: this.selectedDate
			}
		});
		this.dispatchEvent(event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-month-calendar": PandaMonthCalendar;
	}
}
