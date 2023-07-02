// type
import { ElementDetails, PandaDatePreset, PandaDateRange, PandaEvent } from "../index";
import { PandaDatePickerOverlay } from "./panda-date-picker-overlay";

// style
import { styles, modifiers } from "./styles/styles";

// components
import "./panda-month-calendar";
import "./panda-date-picker-overlay";
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html, TemplateResult, PropertyValues, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import {
	getDaysOfWeek,
	getFullDaysOfWeek,
	getFullMonths,
	getMonths,
	isDateValid,
	minValue,
	parseDate,
	isDateDisabled
} from "./utils/utils";
import { debounce, Debouncer } from "@panda-wbc/panda-core";

@customElement("panda-date-picker")
export class PandaDatePicker extends LitElement {
	// css style
	static get styles() {
		return [styles, modifiers];
	}

	/**
	 * Status property, helps indicate loading/work in progress status of the component.
	 * Busy component will change its appearance and display spinner. 
	 * To change type of the spinner animation use "spinner" property.
	 * For available spinner types refer to spinner page demo.
	 * 
	 * [DEFAULT] false
	 */
	@property({ type: Boolean, attribute: true, reflect: true })
	busy: boolean = false;

	/**
	 * Status property, indicate inactive/read-only state. Disable component will change its appearance
	 * and will not allow any user interaction.
	 * 
	 * [DEFAULT] false
	 */
	@property({ type: Boolean, attribute: true, reflect: true })
	disabled: boolean = false;

	/**
	 * Status property, indicating if month calendar overlay is shown.
	 * 
	 * [DEFAULT] false
	 */
	@property({ type: Boolean, reflect: true })
	opened: boolean = false;

	/**
	 * Change default spinner animation to other panda-spinner.
	 * 
	 * example: "video"
	 * 
	 * [DEFAULT] "dots"
	 */
	@property({ type: String, attribute: true })
	spinner: string = "dots";

	/**
	 * Change default calendar icon to other panda-icon.
	 * 
	 * example: "cake"
	 * 
	 * [DEFAULT] "calendar"
	 */
	@property({ type: String, attribute: true })
	icon: string = "calendar";

	/**
	 * Show TODAY button in the footer.
	 * 
	 * [DEFAULT]: true
	 */
	@property({ type: Boolean, attribute: "show-today" })
	showToday: boolean = true;

	/**
	 * Currently selected date.
	 * 
	 * example: "2000-01-01" [YYYY-MM-DD] or 946684800000 [X]
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: String })
	value!: string | number | null;

	/**
	 * Default text that shows when no date is selected.
	 * 
	 * example: "Select..."
	 * 
	 * [DEFAULT] ""
	 */
	@property({ type: String, attribute: true })
	placeholder: string = "";

	/**
	 * Set bottom limit for date selection.
	 * 
	 * example: "2000-01-01" [YYYY-MM-DD] or 946684800000 [X]
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: String, attribute: true })
	min: string | null = null;

	/**
	 * Set upper limit for date selection.
	 * 
	 * example: "2000-01-01" [YYYY-MM-DD] or 946684800000 [X]
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: String, attribute: true })
	max: string | null = null;

	/**
	 * Disable weekends from selection.
	 * 
	 * [DEFAULT] false
	 */
	@property({ type: Boolean, attribute: "disable-weekends" })
	disableWeekends: boolean = false;

	/**
	 * Disable individual dates from selection.
	 * Supports wildcard notation "**" see example below
	 * 
	 * example: ["2020-01-01", "2020-02-**"]
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: Array })
	disableDates: string[] | null = [];

	/**
	 * Disable day(s) of the week from selection.
	 * 
	 * example: ["Wed", "Fri"]
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: Array })
	disableWeekDays: string[] | null = [];

	/**
	 * Disable date range from selection. 
	 * It is possible to define list of date ranges.
	 * 
	 * example: [{ from: "2020-01-01", to: "2020-01-20" }]
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: Array })
	disableDateRange: PandaDateRange[] | null = [];

	/**
	 * Highlight particular date(s) on the calendar. 
	 * 
	 * example: [{ date: "2020-01-01", label: "Birthday" }]
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: Array })
	highlightDate: PandaDatePreset[] | null = [];
  
	/**
	 * Define event list for particular dates.
	 * 
	 * example: [{ date: "2022-09-01", label: "My Birthday", description: "Happy birthday ME!!!", wholeDay: true }]
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: Array })
	events: PandaEvent[] | null = [];

	/**
	 * Set custom start of the week day.
	 * eg. set 1 to Monday.
	 * 
	 * [DEFAULT]: 0 (Sunday)
	 */
	@property({ type: Number })
	firstDayOfWeek: number = 0;

	/**
   * Set start of the week to Monday
   * [DEFAULT]: false
   */
	@property({ type: Boolean, attribute: "week-starts-on-monday" })
	weekStartsOnMonday: boolean = false;

	/**
	 * Format of displayed date.
	 * 
	 * example: "DD MMM YYYY" -> output: 14 Feb 2022
	 * 
	 * [DEFAULT] "YYYY-MM-DD"
	 */
	@property({ type: String, attribute: true })
	format: string | null = null;

	/**
	 * Define custom date list for quick selection.
	 * 
	 * example: [{ label: "Christmas", date: "2022-12-25" }]
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: Array })
	presetDates: PandaDatePreset[] | null = [];

	/**
	 * Custom date list header label.
	 * 
	 * example: "Coming Events"
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: String })
	presetDatesHeader: string | null = null;
	
	/**
	 * Show/hide clear button on date input field
	 * 
	 * [DEFAULT] false
	 */
	@property({ type: Boolean, attribute: "hide-clear-button" })
	hideClearButton: boolean = false;

	// private props
	@property({ type: String })
	private _displayValue: string = "";
	private _fullMonthList: string[] = getFullMonths();
	private _monthList: string[] = getMonths();
	private _fullDaysOfWeek: string[] = getFullDaysOfWeek();
	private _daysOfWeek: string[] = getDaysOfWeek();

	// elements
	@query("#input-field")
	private _dateInputEl!: HTMLInputElement;
	private _overlayEl!: PandaDatePickerOverlay | null;

	// event bindings
	private _selectDateEventBinding: (e: any) => void = this._onSelectedDateChange.bind(this);
	private _hideOverlayEventBinding: (e: any) => void = this._closeOverlay.bind(this);

	// debouncers
	private _evaluateDateDebouncer: () => void | Debouncer | null = debounce(this._evaluateDate, 50);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(changedProps: PropertyValues) {
		if (changedProps.has("opened") && this.opened) {
			this._openDatePickerOverlay();
		}

		if (changedProps.has("value") && changedProps.get("value") !== undefined) {
			this._displayValue = this._formatDate(this.value || null);
		}
	}

	protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		this._displayValue = this._formatDate(this.value || null);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		let spinnerHtml: TemplateResult = html``;
		let clearIconHtml: TemplateResult = html``;

		if (this.busy) {
			spinnerHtml = html`
				<div
					class="spinner-cont"
					part="spinner-cont"
				>
					<panda-spinner
						part="spinner"
						spinner="${this.spinner}"
					>
					</panda-spinner>
				</div>
			`;
		}

		if (this.value && !this.hideClearButton && !this.disabled) {
			clearIconHtml = html`
				<div
					class="icon ${this.disabled ? "hidden" : ""}"
					part="icon"
					@click="${() => this._onClearDate()}"
				>
					<panda-icon icon="close"></panda-icon>
				</div>
			`;
		}

		return html`
			<div
				class="date-picker"
				part="date-picker"
			>
				<div
					class="icon"
					part="icon"
					@click="${(e: MouseEvent) => this._onSetInputFocus(e)}"
				>
					<panda-icon icon="${this.icon}"></panda-icon>
				</div>
				<div class="date-input" part="date-input">
					<input
						id="input-field"
						class="input-field"
						part="input-field"
						type="text"
						.value="${this._displayValue}"
						.placeholder="${this.placeholder}"
						.disabled="${this.disabled}"
						@mouseup="${this._onInputFieldClick}"
						@keyup="${this._onInputFieldKeyUp}"
						@keydown="${this._onInputFieldKeyDown}"
						@input="${(e: any) => this._onChangeDate((e.target as HTMLInputElement).value)}"
						@focus="${this._onInputFieldFocus}"
						@blur="${this._onInputFieldBlur}"
					/>
				</div>
				${clearIconHtml}
				${spinnerHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _getDatePickerPosition(): ElementDetails {
		const rect = this.getBoundingClientRect();
		const top = minValue(rect.top + window.scrollY, 0);
		const left = minValue(rect.left + window.scrollX, 0);
		const bottom = minValue(rect.bottom + window.scrollY, 0);
		const right = minValue(rect.right + window.scrollX, 0);

		return {
			width: rect.width,
			height: rect.height,
			top,
			left,
			bottom,
			right,
		};
	}

	/**
	 * Open date picker overlay and attach it to document body.
	 */
	private _openDatePickerOverlay() {
		if (!this._overlayEl) {
			// create date picker overlay element
			this._overlayEl = document.createElement("panda-date-picker-overlay");

			// add event listeners
			// this._datePickerOverlayEl.addEventListener("select-date", this._selectDateEventBinding);
			this._overlayEl.addEventListener("change", this._selectDateEventBinding);
			this._overlayEl.addEventListener("close", this._hideOverlayEventBinding);

			// set date picker overlay's props
			this._overlayEl.selectedDate = this.value || null;
			this._overlayEl.min = this.min || null;
			this._overlayEl.max = this.max || null;
			this._overlayEl.disableDates = this.disableDates;
			this._overlayEl.disableWeekends = this.disableWeekends;
			this._overlayEl.disableWeekDays = this.disableWeekDays;
			this._overlayEl.disableDateRange = this.disableDateRange;
			this._overlayEl.highlightDate = this.highlightDate;
			this._overlayEl.events = this.events;
			this._overlayEl.presetDates = this.presetDates;
			this._overlayEl.presetDatesHeader = this.presetDatesHeader;
			this._overlayEl.firstDayOfWeek = this.firstDayOfWeek;
			this._overlayEl.weekStartsOnMonday = this.weekStartsOnMonday;
			this._overlayEl.showToday = this.showToday;

			// set date picker overlay's position
			this._overlayEl.parentDetails = this._getDatePickerPosition();

			// append element to document body
			document.body.appendChild(this._overlayEl);
			this.opened = true;
		}
	}

	/**
	 * Removes date picker overlay element from DOM if present
	 */
	private _closeOverlay() {
		console.log("%c [_closeOverlay] _overlayEl", "font-size: 24px; color: orange;", this._overlayEl);
		if (this._overlayEl) {
			// remove event listeners
			this._overlayEl.removeEventListener("change", this._selectDateEventBinding);
			this._overlayEl.removeEventListener("close", this._hideOverlayEventBinding);
			// clean up
			document.body.removeChild(this._overlayEl);
			this._overlayEl = null;
			this.opened = false;
		}
	}

	private _triggerChangeEvent() {
		console.log("%c [DATE PICKER] CHANGE DATE EVENT", "font-size: 16px; color: green;", this.value);
		const event = new CustomEvent("change", {
			detail: {
				date: this.value
			}
		});
		this.dispatchEvent(event);
	}

	private _formatDate(date: string | number | null): string {
		console.log("%c [DATE PICKER] _formatDate", "font-size: 16px; color: orange;", date);

		// check if date is provided
		if (date !== null && this.format !== null) {
			let _formattedDate: string = "";
			let _date: Date = new Date(date);

			// validate date string
			if (isNaN(_date.getTime())) {
				return "";
			} else {
				// extract available data format
				const replaceMap: { [pattern: string]: string } = {
					DDDD: this._fullDaysOfWeek[_date.getDay()], 	// eg. Monday, Tuesday, Wednesday ... Sunday
					DDD: this._daysOfWeek[_date.getDay()], 			// eg. Mon, Tue, Wed ... Sun
					DD: `0${_date.getDate()}`.slice(-2), 			// eg. 01, 02, 03 ... 30 - day of the month prefixed with zero
					D: _date.getDate() + "", 						// eg. 1, 2, 3 ... 30 day of the month
					MMMM: this._fullMonthList[_date.getMonth()], 	// eg. January, February, March ... December
					MMM: this._monthList[_date.getMonth()], 		// eg. Jan, Feb, Mar ... Dec
					MM: `0${_date.getMonth() + 1}`.slice(-2), 		// eg. 01, 02, 03 ... 12 - month prefixed with zero
					M: `${_date.getMonth() + 1}`, 					// eg. 1, 2, 3 ... 12 - month 
					YYYY: _date.getFullYear() + "", 				// eg. 1998, 1999, 2000 ... 2022
					YY: `${_date.getFullYear()}`.slice(-2),	 		// eg. 98, 99, 00 ... 22 - last two digits of the year
				};

				const replacer = (match: string): string => replaceMap[match];

				_formattedDate = _formattedDate = this.format;
				return _formattedDate.replace(/YYYY|YY|MMMM|MMM|MM|M|DDDD|DDD|DD|D/g, replacer);
			}
		} else if (date !== null && this.format === null) {
			return date as string;
		} else {
			return "";
		}
	}

	/**
	 * Check if date entered by user is valid.
	 */
	private _evaluateDate(): void {
		this._displayValue = this._displayValue.trim();

		// check if date value has been cleared by user
		if (this._displayValue !== "") {
			if (isDateValid(this._displayValue)) {
				// convert user date input to acceptable format
				const newDate = parseDate(this._displayValue);

				// check if value changed
				if (newDate !== this.value) {
					// check if date is disabled
					if (this._isDateDisabled(newDate as string)) {
						this.value = null;
						this._displayValue = "Invalid date";
						this.setAttribute("invalid", "");
					} else {
						this.value = newDate;
						this._displayValue = this._formatDate(this.value);
						this.removeAttribute("invalid");
					}
					// notify date change
					this._triggerChangeEvent();
				}

				this.value = parseDate(this._displayValue);
				this._displayValue = this._formatDate(this.value);
				this.removeAttribute("invalid");

			} else if (this.value !== null) {
				this.value = null;
				this.removeAttribute("invalid");
	
				// update month calendar if shown
				if (this._overlayEl) {
					this._overlayEl.selectedDate = null;
				}
				// notify date change
				this._triggerChangeEvent();
			}
		}
	}

	/**
	 * Validate date against all user provided rules
	 * @param date - date to validate [expected format: YYYY-MM-DD]
	 * @returns {Boolean}
	 */
	private _isDateDisabled(date: string): boolean {
		const _date = new Date(date);
		const year = _date.getFullYear();
		const month = _date.getMonth() + 1;
		const day = _date.getDate();
		const dayOfWeek = _date.getDay();
		const daysOfWeek = getDaysOfWeek();

		return isDateDisabled(
			year,
			month,
			day,
			dayOfWeek,
			this.min,
			this.max,
			this.disableDates,
			this.disableDateRange,
			this.disableWeekends,
			this.disableWeekDays,
			daysOfWeek
		);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onSetInputFocus(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();

		if (this._dateInputEl) {
			this.opened = !this.opened;
			if (this.opened) {
				this.setAttribute("focused", "");
				this._dateInputEl.focus();
				this._openDatePickerOverlay();
			} else {
				this._closeOverlay();
			}
		}
	}

	private _onInputFieldFocus(e: Event) {
		e.stopPropagation();
		e.preventDefault();
		// set focused attribute on date picker element
		if (this._dateInputEl) {
			this.setAttribute("focused", "");
		}
	}

	private _onInputFieldBlur() {
		// remove focused attribute on date picker element
		if (this._dateInputEl) {
			this.removeAttribute("focused");
		}
		this._evaluateDateDebouncer();
		// get rid of extra spaces
		this._displayValue = this._displayValue.trim();
		this.requestUpdate();
	}

	private _onInputFieldClick(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		this._openDatePickerOverlay();
	}

	private _onInputFieldKeyUp(e: KeyboardEvent) {
		console.log("%c 🔣 [DATE PICKER] _onInputFieldKeyUp", "font-size: 16px; color: red;", e.key);
		if (e.key === "Enter") {
			this._evaluateDateDebouncer();
			this._closeOverlay();
		} else if (
			e.key !== "Tab" &&
			e.key !== "Shift" &&
			!this.busy &&
			!this.disabled &&
			!this.opened
		) {
			this._openDatePickerOverlay();
		}
	}

	private _onInputFieldKeyDown(e: KeyboardEvent) {
		console.log("%c 🔣 [DATE PICKER] _onInputFieldKeyDown", "font-size: 16px; color: red;", e.key, this.opened);
		if (e.key === "Tab" && this.opened) {
			this._evaluateDateDebouncer();
			this._closeOverlay();
		}
	}

	private _onChangeDate(date: string) {
		console.log("%c 🔣 [DATE PICKER] [ON INPUT] _onChangeDate", "font-size: 16px; color: blue;", date);
		// validate input
		this._displayValue = date || "";
		this.removeAttribute("invalid");

		if (
			!this.disabled && isDateValid(date) ||
			!this.disabled && date === null
		) {
			// update month calendar if opened
			if (this._overlayEl) {
				this._overlayEl.selectedDate = date;
			}
		}
	}

	private _onClearDate() {
		console.log("%c 🔣 [DATE PICKER] _onClearDate", "font-size: 16px; color: green;");
		this._displayValue = "";
		this.value = null;
		this.removeAttribute("invalid");
		// update month calendar if opened
		if (this._overlayEl) {
			this._overlayEl.selectedDate = null;
		}
		// notify date change
		this._triggerChangeEvent();
	}

	private _onSelectedDateChange(e: any) {
		console.log("%c 🔣 [DATE PICKER] _onSelectedDateChange", "font-size: 16px; color: green;", e);
		this.value = e.detail.date;
		this.removeAttribute("invalid");
		// notify date change
		this._triggerChangeEvent();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-date-picker": PandaDatePicker;
	}
}
