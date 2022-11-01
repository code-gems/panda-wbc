// types
import { PandaDate, PandaMonth, PandaDateRange, PandaDatePreset, PandaEvent } from "../index";

// style
import { styles } from "./styles/month-calendar-styles";
import { modifiers, callout } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getDaysOfWeek, getFullMonths, getMonths, isDateDisabled } from "./utils/utils";

@customElement("panda-month-calendar")
export class PandaMonthCalendar extends LitElement {
	// css style
	static get styles() {
		return [styles, callout, modifiers];
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

	/**
	 * i18n config for localization.
	 * 
	 * TBD
	 * 
	 * monthNames
	 * monthNamesShort
	 * weekdays
	 * weekdaysShort
	 * firstDayOfWeek: 0
	 * 
	 * today: "Today"
	 * cancel: "Cancel"
	 * 
	 */
	@property({ type: Object })
	localizedStrings!: any;

	/**
	 * Highlight particular date(s) on the calendar. 
	 * 
	 * example: [{ date: "2020-01-01", label: "Birthday" }]
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: Array })
	highlightDate: PandaDatePreset[] | null = null;

	/**
	 * Define event list for particular dates.
	 * 
	 * example: [{ date: "2022-09-01", label: "My Birthday", description: "Happy birthday ME!!!", wholeDay: true }]
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: Array })
	events: PandaEvent[] | null = null;

	/**
	 * Define custom date list.
	 * 
	 * example: [{ label: "Christmas", date: "2022-12-25" }]
	 */
	@property({ type: Array })
	presetDates: PandaDatePreset[] | null = null;

	/**
	 * Custom date list header label.
	 * 
	 * example: "Coming Events"
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: String })
	presetDatesHeader: string | null = null;

	private _dateHighlights: { [key: string]: string; } = {};
	/** key: yyyymmdd */
	private _allEvents: { [key: string]: PandaEvent[]; } = {};
	/** key: yyyymm */
	private _currentMonthEvents: { [key: string]: PandaEvent[]; } = {};

	// private properties
	private _selectedDate: PandaDate | null = null;
	private _previousMonth: PandaMonth | null = null;
	private _currentMonth: PandaMonth | null = null;
	private _nextMonth: PandaMonth | null = null;

	@property({ type: Boolean })
	private _showMonthSelection: boolean = false;

	@property({ type: Boolean })
	private _showYearSelection: boolean = false;

	// dictionary data
	private _fullMonthList: string[] = getFullMonths(); // eg. January, February ... etc.
	private _monthList: string[] = getMonths(); // eg. Jan, Feb ... etc.
	private _daysOfWeek: string[] = getDaysOfWeek(); // eg. Sun, Mon ... etc.
	private _maxCalendarDays = 42;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(_changedProperties: PropertyValues): void {
		console.log("%c [updated] Panda Month Calendar", "font-size: 24px; color: red;", _changedProperties, this.selectedDate);
		if (_changedProperties.has("selectedDate") && this.selectedDate !== undefined) {
			this._parseSelectedDate(this.selectedDate);
			this._parseEvents();
		}

		if (_changedProperties.has("weekStartsOnMonday") && this.weekStartsOnMonday) {
			this.firstDayOfWeek = 1;
		}

		if (_changedProperties.has("highlightDate") && this.highlightDate) {
			this._parseHighlights();
		}

		if (_changedProperties.has("events") && this.events) {
			this._parseEvents();
		}
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		console.log("%c [firstUpdated] Panda Month Calendar", "font-size: 24px; color: green;");
		console.log("%c presetDates", "font-size: 24px; color: green;", this.presetDates);
		console.log("%c presetDatesHeader", "font-size: 24px; color: green;", this.presetDatesHeader);

		console.log("%c events", "font-size: 24px; color: green;", this.events);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div class="calendar-cont" part="calendar-cont">
				${this._renderPresetDates()}
				<div class="calendar" part="calendar">
					${this._renderHeader()}
					<div class="calendar-body" part="calendar-body">
						${this._renderDaysOfWeek()}
						${this._renderCalendar()}
						${this._renderMonthSelection()}
						${this._renderYearSelection()}
					</div>
				</div>
				${this._renderEvents()}
			</div>
		`;
	}

	private _renderHeader() {
		if (this._currentMonth) {
			// check if month selection screen is shown
			if (this._showMonthSelection) {
				return html`
					<div class="header" part="header">
						<div
							class="btn-icon"
							part="btn-icon"
							@click="${this._onYearChangeBackward}"
						>
							<panda-icon icon="chevron-left"></panda-icon>
						</div>
						<div
							class="header-label"
							part="header-label"
							@click="${this._onShowYearSelection}"
						>
							${this._currentMonth.year}
						</div>
						<div
							class="btn-icon"
							part="btn-icon"
							@click="${this._onYearChangeForward}"
						>
							<panda-icon icon="chevron-right"></panda-icon>
						</div>
					</div>
				`;
			} else if (this._showYearSelection) {
				const decadeStart = Math.floor(this._currentMonth!.year / 10) * 10;
				const decadeEnd = String(decadeStart + 9).slice(-2);

				return html`
					<div class="header" part="header">
						<div
							class="btn-icon"
							part="btn-icon"
							@click="${this._onDecadeChangeBackward}"
						>
							<panda-icon icon="chevron-left"></panda-icon>
						</div>
						<div
							class="header-label"
							part="header-label"
							@click="${this._onShowMonthSelection}"
						>
							${decadeStart}-${decadeEnd}
						</div>
						<div
							class="btn-icon"
							part="btn-icon"
							@click="${this._onDecadeChangeForward}"
						>
							<panda-icon icon="chevron-right"></panda-icon>
						</div>
					</div>
				`;
			} else {
				const monthName = this._fullMonthList[this._currentMonth.month];

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
							class="header-label btn"
							part="header-label"
							@click="${this._onShowMonthSelection}"
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
	}

	private _renderCalendar(): TemplateResult | void {
		if (this._previousMonth && this._currentMonth && this._nextMonth) {
			const daysHtml: TemplateResult[] = [];

			this._generateCalendar();

			this._previousMonth.days.forEach(({ date, label, selected, disabled, isToday, highlight, eventCount }) => {
				const cssClassList: string[] = [];
				// add calendar day classes				
				if (disabled) cssClassList.push("disabled");
				if (selected) cssClassList.push("selected");
				if (isToday) cssClassList.push("today");
				if (eventCount) cssClassList.push("event");

				daysHtml.push(html`
					<div
						class="day btn inactive ${cssClassList.join(" ")}"
						title="${date}"
						?selected="${selected}"
						?today="${isToday}"
						@click="${() => this._onSelectDate(date, disabled)}"
					>
						${label}
						${this._renderHighlight(highlight)}
					</div>
				`);
			});

			this._currentMonth.days.forEach(({ date, label, selected, disabled, isToday, highlight, eventCount }) => {
				const cssClassList: string[] = [];
				// add calendar day classes				
				if (disabled) cssClassList.push("disabled");
				if (selected) cssClassList.push("selected");
				if (isToday) cssClassList.push("today");
				if (eventCount) cssClassList.push("event");

				daysHtml.push(html`
					<div
						class="day btn ${cssClassList.join(" ")}"
						title="${date}"
						?selected="${selected}"
						?today="${isToday}"
						@click="${() => this._onSelectDate(date, disabled)}"
					>
						${label}
						${this._renderHighlight(highlight)}
					</div>
				`);
			});

			this._nextMonth.days.forEach(({ date, label, selected, disabled, isToday, highlight, eventCount }) => {
				const cssClassList: string[] = [];
				// add calendar day classes				
				if (disabled) cssClassList.push("disabled");
				if (selected) cssClassList.push("selected");
				if (isToday) cssClassList.push("today");
				if (eventCount) cssClassList.push("event");

				daysHtml.push(html`
					<div
						class="day btn inactive ${cssClassList.join(" ")}"
						title="${date}"
						?selected="${selected}"
						?today="${isToday}"
						@click="${() => this._onSelectDate(date, disabled)}"
					>
						${label}
						${this._renderHighlight(highlight)}
					</div>
				`);
			});

			return html`
				<div class="calendar-row">
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
				<div class="day txt-primary">
					${this._daysOfWeek[dayLabelIndex]}
				</div>
			`);
		}

		return html`
			<div
				class="calendar-row days-of-week"
				part="days-of-week"
			>
				${headerHtml}
			</div>	
		`;
	}

	private _renderMonthSelection() {
		if (this._showMonthSelection) {
			const monthsHtml: TemplateResult[] = [];
			const today = new Date();
			const currentYear = today.getFullYear();
			const currentMonth = today.getMonth();

			for (let i = 0; i < 12; i++) {
				const selected = currentMonth === i && this._currentMonth?.year === currentYear
					? "active"
					: "";

				monthsHtml.push(html`
					<div
						class="tile btn ${selected}"
						part="month"
						@click="${() => this._onChangeMonth(i, this._currentMonth!.year)}"
					>
						${this._monthList[i]}
					</div>
				`);
			}

			for (let i = 0; i < 4; i++) {
				const active = currentMonth === i && this._nextMonth?.year === currentYear
					? "active"
					: "";

				monthsHtml.push(html`
					<div
						class="tile btn inactive ${active}"
						part="month"
						@click="${() => this._onChangeMonth(i, this._currentMonth!.year + 1)}"
					>
						${this._monthList[i]}
					</div>
				`);
			}

			return html`
				<div
					class="tile-cont"
					part="month-list"				
				>
					${monthsHtml}
				</div>
			`;
		}
	}

	private _renderYearSelection() {
		if (this._showYearSelection) {
			const yearsHtml: TemplateResult[] = [];
			const today = new Date();
			const currentYear = today.getFullYear();
			const decadeStart = Math.floor(this._currentMonth!.year / 10) * 10;

			for (let year = decadeStart - 2; year < decadeStart; year++) {
				const active = currentYear === year
					? "active"
					: "";

				yearsHtml.push(html`
					<div
						class="tile btn inactive ${active}"
						part="year"
						@click="${() => this._onChangeYear(year)}"
					>
						${year}
					</div>
				`);
			}

			for (let year = decadeStart; year < decadeStart + 10; year++) {
				const active = currentYear === year
					? "active"
					: "";

				yearsHtml.push(html`
					<div
						class="tile btn ${active}"
						part="year"
						@click="${() => this._onChangeYear(year)}"
					>
						${year}
					</div>
				`);
			}

			for (let year = decadeStart + 10; year < decadeStart + 14; year++) {
				const active = currentYear === year
					? "active"
					: "";

				yearsHtml.push(html`
					<div
						class="tile btn inactive ${active}"
						part="year"
						@click="${() => this._onChangeYear(year)}"
					>
						${year}
					</div>
				`);
			}

			return html`
				<div
					class="tile-cont"
					part="year-list"				
				>
					${yearsHtml}
				</div>
			`;
		}
	}

	private _renderHighlight(highlight: string): TemplateResult | void {
		if (highlight !== null) {
			return html`
				<div class="highlight">
					${String(highlight)}
				</div>
			`;
		}
	}

	private _renderPresetDates(): TemplateResult | void {
		if (this.presetDates?.length) {
			const listHtml: TemplateResult[] = [];

			this.presetDates.forEach(({ label, date = "" }) => {
				listHtml.push(html`
					<div
						class="date-list-item"
						part="date-list-item"
						@click="${() => this._onSelectDate(date, false)}"
					>
						${label}
					</div>
				`);
			});

			return html`
				<div class="date-list-cont" part="date-list-cont">
					<div class="date-list-header" part="date-list-header">
						${this.presetDatesHeader || "Presets"}
					</div>
					<div class="date-list scroll" part="date-list">
						${listHtml}
					</div>
				</div>
			`;
		}
	}

	private _renderEvents(): TemplateResult | void {
		let eventsHeader: string = "";
		console.log("%c _renderEvents", "font-size: 16px; color: red;", this._currentMonth, this._selectedDate);
		if (this.events?.length) {
			const listHtml: TemplateResult[] = [];

			if (this._selectedDate) {
				// generate event key for selected day
				const { year, month, day } = this._selectedDate;
				const _year = String(year);
				const _month = `0${month + 1}`.slice(-2);
				const _day = `0${day}`.slice(-2);
				const key = `${_year}${_month}${_day}`; // output: yyyymmdd

				if (this._allEvents[key]) {
					// extract events for selected date
					const eventList: PandaEvent[] = this._allEvents[key] ?? [];

					eventList.forEach(({ date, label, description, time, wholeDay }) => {

						listHtml.push(html`
							<div
								class="event"
								part="event"
							>
								<div class="event-body" part="event-body">
									<div class="name" part="event-name">
										${label}
									</div>
									<div class="description" part="event-description">
										${description}
									</div>
								</div>
							</div>
						`);
					});

					// set event list header
					eventsHeader = "Today";

				} else {
					// generate event key for selected day
					console.log("%c _currentMonth", "font-size: 16px; color: red;", this._currentMonth, this._currentMonthEvents);
					if (this._currentMonth) {
						const { year, month } = this._currentMonth;
						const _year = String(year);
						const _month = `0${month + 1}`.slice(-2);
						const key = `${_year}${_month}`; // output: yyyymm
						const eventList: PandaEvent[] = this._currentMonthEvents[key] ?? [];

						// check if there are any events for this month
						if (eventList.length) {
							eventList.forEach(({ date, label, selectable = true }) => {
								listHtml.push(html`
									<div
										class="event"
										part="event"
										@click="${() => this._onSelectEvent(date, selectable)}"
									>
										<div class="event-body" part="event-body">
											<div class="name" part="event-name">
												${label}
											</div>
											<div class="date" part="event-date">
												${date}
											</div>
										</div>
									</div>
								`);
							});

							// set event list header
							eventsHeader = "Upcoming";
						} else {
							listHtml.push(html`
								<div class="callout-cont" part="callout-cont">
									<div class="callout" part="callout">
										<div class="icon" part="callout-icon">
											<panda-icon icon="info"></panda-icon>
										</div>
										<div class="message" part="callout-message">
											No upcoming events for this month...
										</div>
									</div>
								</div>
							`);
							// set event list header
							eventsHeader = "Events";
						}
					}
				}
			}

			return html`
				<div class="events-cont" part="events-cont">
					<div class="events-header" part="events-header">
						${eventsHeader}
					</div>
					<div class="events scroll" part="events">
						${listHtml}
					</div>
				</div>
			`;
		}
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
		this._selectedDate = {
			date: selectedDate,
			unix: selectedDate.getTime(),
			day: selectedDate.getDate(),
			month: selectedDate.getMonth(),
			year: selectedDate.getFullYear(),
		};
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

		console.log("%c _parseSelectedDate _currentMonth", "font-size: 24px; color: red;", this._currentMonth);

	}

	private _generateCalendar() {
		if (this._previousMonth && this._currentMonth && this._nextMonth) {
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
				const dayOfWeek = (this._previousMonth.daysCount - (startIndex * 2) - firstDayOfMonth.getDay() + i) % 7;

				this._previousMonth.days.push({
					label: String(i + 1),
					date: this._formatDate(this._previousMonth.year, this._previousMonth.month, i + 1),
					selected: this._isSelected(this._previousMonth.year, this._previousMonth.month, i + 1),
					isToday: this._isToday(this._previousMonth.year, this._previousMonth.month, i + 1),
					disabled: isDateDisabled(
						this._previousMonth.year,
						this._previousMonth.month,
						i + 1,
						dayOfWeek,
						this.min,
						this.max,
						this.disableDates,
						this.disableDateRange,
						this.disableWeekends,
						this.disableWeekDays,
						this._daysOfWeek
					),
					highlight: this._hasHighlights(this._previousMonth.year, this._previousMonth.month, i + 1),
					eventCount: this._checkEvents(this._previousMonth.year, this._previousMonth.month, i + 1)
				});
			}

			for (let i = 0; i < this._currentMonth.daysCount; i++) {
				const dayOfWeek = (firstDayOfMonth.getDay() + i) % 7;

				this._currentMonth.days.push({
					label: String(i + 1),
					date: this._formatDate(this._currentMonth.year, this._currentMonth.month, i + 1),
					selected: this._isSelected(this._currentMonth.year, this._currentMonth.month, i + 1),
					isToday: this._isToday(this._currentMonth.year, this._currentMonth.month, i + 1),
					disabled: isDateDisabled(
						this._currentMonth.year,
						this._currentMonth.month,
						i + 1,
						dayOfWeek,
						this.min,
						this.max,
						this.disableDates,
						this.disableDateRange,
						this.disableWeekends,
						this.disableWeekDays,
						this._daysOfWeek
					),
					highlight: this._hasHighlights(this._currentMonth.year, this._currentMonth.month, i + 1),
					eventCount: this._checkEvents(this._currentMonth.year, this._currentMonth.month, i + 1)
				});
			}

			// generate next month days for display
			this._nextMonth.year = this._currentMonth.year;
			this._nextMonth.month = this._currentMonth.month;
			this._nextMonth = this._changeMonth(this._nextMonth, 1);
			const maxDays = this._maxCalendarDays - (this._previousMonth.days.length + this._currentMonth.days.length);

			for (let i = 0; i < maxDays; i++) {
				const dayOfWeek = (firstDayOfMonth.getDay() + this._currentMonth.daysCount + i) % 7;

				this._nextMonth.days.push({
					label: String(i + 1),
					date: this._formatDate(this._nextMonth.year, this._nextMonth.month, i + 1),
					selected: this._isSelected(this._nextMonth.year, this._nextMonth.month, i + 1),
					isToday: this._isToday(this._nextMonth.year, this._nextMonth.month, i + 1),
					disabled: isDateDisabled(
						this._nextMonth.year,
						this._nextMonth.month,
						i + 1,
						dayOfWeek,
						this.min,
						this.max,
						this.disableDates,
						this.disableDateRange,
						this.disableWeekends,
						this.disableWeekDays,
						this._daysOfWeek
					),
					highlight: this._hasHighlights(this._nextMonth.year, this._nextMonth.month, i + 1),
					eventCount: this._checkEvents(this._nextMonth.year, this._nextMonth.month, i + 1)
				});
			}
		}
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

	private _hasHighlights(year: number, month: number, day: number): string | null {
		const _year = String(year);
		const _month = `0${month + 1}`.slice(-2);
		const _day = `0${day}`.slice(-2);
		const key = `${_year}${_month}${_day}`;

		return this._dateHighlights[key] ?? null;
	}

	private _parseHighlights() {
		this._dateHighlights = {};
		if (this.highlightDate?.length) {
			this.highlightDate.forEach(({ date, label }) => {
				if (date) {
					const _date = new Date(date);
					const year = String(_date.getFullYear());
					const month = `0${_date.getMonth() + 1}`.slice(-2);
					const day = `0${_date.getDate()}`.slice(-2);
					const key = `${year}${month}${day}`;
					this._dateHighlights[key] = label || "?";
				}
			});
		}
	}

	private _checkEvents(year: number, month: number, day: number): number {
		const _year = String(year);
		const _month = `0${month + 1}`.slice(-2);
		const _day = `0${day}`.slice(-2);
		const key = `${_year}${_month}${_day}`;

		return this._allEvents[key]?.length ?? 0;
	}

	private _parseEvents() {
		this._allEvents = {};
		this._currentMonthEvents = {};

		if (this.events?.length) {
			this.events.forEach((event) => {
				const { date } = event;

				if (date) {
					const _date = new Date(date);
					const _year = String(_date.getFullYear());
					const _month = `0${_date.getMonth() + 1}`.slice(-2);
					const _day = `0${_date.getDate()}`.slice(-2);
					const _key1 = `${_year}${_month}${_day}`;
					const _key2 = `${_year}${_month}`;

					if (!this._allEvents[_key1]) {
						this._allEvents[_key1] = [];
					}
					this._allEvents[_key1].push(event);

					if (!this._currentMonthEvents[_key2]) {
						this._currentMonthEvents[_key2] = [];
					}
					this._currentMonthEvents[_key2].push(event);
				}
			});
		}
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

	private _onShowMonthSelection() {
		this._showMonthSelection = true;
		this._showYearSelection = false;
	}

	private _onChangeMonth(month: number, year: number) {
		this._showMonthSelection = false;
		this._currentMonth!.month = month;
		this._currentMonth!.year = year;
	}

	private _onChangeYear(year: number) {
		this._showYearSelection = false;
		this._currentMonth!.year = year;
	}

	private _onMonthChangeBackward() {
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

	private _onYearChangeBackward() {
		this._currentMonth!.year -= 1;
		this.requestUpdate();
	}

	private _onShowYearSelection() {
		this._showYearSelection = true;
		this._showMonthSelection = false;
	}

	private _onYearChangeForward() {
		this._currentMonth!.year += 1;
		this.requestUpdate();
	}

	private _onDecadeChangeBackward() {
		this._currentMonth!.year -= 10;
		this.requestUpdate();
	}

	private _onDecadeChangeForward() {
		this._currentMonth!.year += 10;
		this.requestUpdate();
	}

	private _onSelectDate(date: string, disabled: boolean) {
		if (!disabled) {
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

	private _onSelectEvent(date: string, selectable: boolean) {
		if (selectable) {
			this._onSelectDate(date, false);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-month-calendar": PandaMonthCalendar;
	}
}
