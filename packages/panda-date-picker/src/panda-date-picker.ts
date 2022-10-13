// type
import { ElementDetails, PandaDateHighlight, PandaDateRange } from "../index";
import { PandaDatePickerOverlay } from "./panda-date-picker-overlay";

// style
import { styles } from "./styles/styles";

// components
import "./panda-month-calendar";
import "./panda-date-picker-overlay";
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-icon";
// import "@panda-wbc/panda-icon/lib/food-icon-pack";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { getDaysOfWeek, getFullDaysOfWeek, getFullMonths, getMonths, getParentOffsetLeft, getParentOffsetTop, minValue } from "./utils/utils";

@customElement("panda-date-picker")
export class PandaDatePicker extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	static state: any;

	@property({ type: Boolean, attribute: true, reflect: true })
	busy!: boolean;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled!: boolean;

	@property({ type: Boolean, reflect: true })
	opened!: boolean;

	@property({ type: String, attribute: true })
	spinner!: string;
              
	/**
	 * Change default calendar icon to other panda-icon.
	 * 
	 * example: "cake"
	 * 
	 * [DEFAULT] "calendar"
	 */
	@property({ type: String, attribute: true })
	icon!: string;
 
	/**
	 * Show TODAY button in the footer.
	 * 
	 * [DEFAULT]: true
	 */
	@property({ type: Boolean, attribute: "show-today" })
	showToday!: boolean;
 
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
	placeholder!: string;

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
	 * Highlight particular date(s) on the calendar. 
	 * 
	 * example: [{ date: "2020-01-01", label: "Birthday" }]
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: Array })
	highlightDate!: PandaDateHighlight[] | null;

	/**
	 * Format of displayed date.
	 * 
	 * example: "DD MMM YYYY" -> output: 14 Feb 2022
	 * 
	 * [DEFAULT] "YYYY-MM-DD"
	 */
	@property({ type: String, attribute: true })
	format!: string | null;

	// private props
	private _fullMonthList: string[] = getFullMonths();
	private _monthList: string[] = getMonths();
	private _fullDaysOfWeek: string[] = getFullDaysOfWeek();
	private _daysOfWeek: string[] = getDaysOfWeek();

	// DOM elements
	@query("#input-field")
	private _dateInputEl!: HTMLInputElement;

	private _overlayEl!: PandaDatePickerOverlay | null;

	// event bindings
	private _selectDateEventBinding: any;
	private _hideOverlayEventBinding: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.busy = false;
		this.opened = false;
		this.disabled = false;
		this.spinner = "dots";
		this.format = null;
		this.placeholder = "";
		this.icon = "calendar";
		this.showToday = true;

		this.min = null;
		this.max = null;
		this.disableDates = [];
		this.disableWeekends = false;
		this.disableWeekDays = [];
		this.disableDateRange = [];

		// event bindings
		this._selectDateEventBinding = this._onSelectedDateChange.bind(this);
		this._hideOverlayEventBinding = this._hideOverlay.bind(this);
	}

	protected updated(changedProps: PropertyValues) {
		if (changedProps.has("opened") && this.opened) {
			console.log("%c [DATE PICKER] opened", "font-size: 24px; color: red;", this.opened);
			this._openDatePickerOverlay();
		}
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

		if (this.value) {
			clearIconHtml = html`
				<div
					class="icon"
					part="icon"
					@click="${() => this._onChangeDate(null)}"
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
						.value="${this._formatDate(this.value)}"
						.placeholder="${this.placeholder}"
						.disabled="${this.disabled}"
						@mouseup="${(e: MouseEvent) => this._onInputFieldClick(e)}"
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
		let top = minValue(rect.top + window.scrollY + getParentOffsetTop(this), 0);
		let left = minValue(rect.left + window.scrollX + getParentOffsetLeft(this), 0);
		let bottom = minValue(rect.bottom + window.scrollY + getParentOffsetTop(this), 0);
		let right = minValue(rect.right + window.scrollX + getParentOffsetLeft(this), 0);

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
			this._overlayEl.selectedDate = this.value;
			this._overlayEl.min = this.min;
			this._overlayEl.max = this.max;
			this._overlayEl.disableDates = this.disableDates;
			this._overlayEl.disableWeekends = this.disableWeekends;
			this._overlayEl.disableWeekDays = this.disableWeekDays;
			this._overlayEl.disableDateRange = this.disableDateRange;
			this._overlayEl.highlightDate = this.highlightDate;
			this._overlayEl.showToday = this.showToday;

			// set date picker overlay's position
			this._overlayEl.parentDetails = this._getDatePickerPosition();

			// append element to document body
			document.body.appendChild(this._overlayEl);
		}
	}

	/**
	 * Removes date picker overlay element from DOM if present
	 */
	private _hideOverlay() {
		if (this._overlayEl) {
			// remove event listeners
			this._overlayEl.removeEventListener("close", this._hideOverlayEventBinding);
			// clean up
			document.body.removeChild(this._overlayEl);
			this._overlayEl = null;
			this.opened = false;
		}
	}

	private _triggerChangeEvent() {
		const event = new CustomEvent("change", {
			detail: {
				date: this.value
			}
		});
		this.dispatchEvent(event);
	}

	private _formatDate(date: string | number | null): string {
		console.log("%c [DATE PICKER] _formatDate", "font-size: 24px; color: orange;", date);
		
		// check if date is provided
		if (date !== null && this.format !== null) {
			let _formattedDate: string = "";
			let _date: Date = new Date(date);
			
			// validate date string
			if (isNaN(_date.getTime())) {
				return "";
			} else {
				// extract available data format
				const DDDD = this._fullDaysOfWeek[_date.getDay()]; 		// eg. Monday, Tuesday, Wednesday ... Sunday
				const DDD = this._daysOfWeek[_date.getDay()]; 			// eg. Mon, Tue, Wed ... Sun
				const DD = `0${_date.getDate()}`.slice(-2); 			// eg. 01, 02, 03 ... 30 - day of the month prefixed with zero
				const D = _date.getDate() + ""; 						// eg. 1, 2, 3 ... 30 day of the month
				const MMMM = this._fullMonthList[_date.getMonth()]; 	// eg. January, February, March ... December
				const MMM = this._monthList[_date.getMonth()]; 			// eg. Jan, Feb, Mar ... Dec
				const MM = `0${_date.getMonth() + 1}`.slice(-2); 		// eg. 01, 02, 03 ... 12 - month prefixed with zero
				const M = `${_date.getMonth() + 1}`; 					// eg. 1, 2, 3 ... 12 - month 
				const YYYY = _date.getFullYear() + ""; 					// eg. 1998, 1999, 2000 ... 2022
				const YY = `${_date.getFullYear()}`.slice(-2);	 		// eg. 98, 99, 00 ... 22 - last two digits of the year

				_formattedDate = _formattedDate = this.format;
				_formattedDate = _formattedDate.replace(/YYYY/g, YYYY);
				_formattedDate = _formattedDate.replace(/YY/g, YY);
				_formattedDate = _formattedDate.replace(/MMMM/g, MMMM);
				_formattedDate = _formattedDate.replace(/MMM/g, MMM);
				_formattedDate = _formattedDate.replace(/MM/g, MM);
				_formattedDate = _formattedDate.replace(/M/g, M);
				_formattedDate = _formattedDate.replace(/DDDD/g, DDDD);
				_formattedDate = _formattedDate.replace(/DDD/g, DDD);
				_formattedDate = _formattedDate.replace(/DD/g, DD);
				_formattedDate = _formattedDate.replace(/D/g, D);
				return _formattedDate;
			}
		} else if (date !== null && this.format === null) {
			return date as string;
		} else {
			return "";
		}

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
				this._hideOverlay();
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
	}

	private _onInputFieldClick(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		this._openDatePickerOverlay();
	}

	private _onChangeDate(date: string | null) {
		console.log("%c [DATE PICKER] _onChangeDate [internal]", "font-size: 24px; color: green;", date);
		this.value = date;
		if (this._overlayEl) {
			this._overlayEl.selectedDate = date;
		}
		this._triggerChangeEvent();
	}

	private _onSelectedDateChange(e: any) {
		console.log("%c [DATE PICKER] _onSelectedDateChange", "font-size: 24px; color: green;", e);
		this.value = e.detail.date;
		this._triggerChangeEvent();

	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-date-picker": PandaDatePicker;
	}
}
