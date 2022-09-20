// type
import { ElementDetails } from "../index";
import { PandaDatePickerOverlay } from "./panda-date-picker-overlay";

// style
import { styles } from "./styles/styles";

// components
import "./panda-month-calendar";
import "./panda-date-picker-overlay";
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { getParentOffsetLeft, getParentOffsetTop, minValue } from "./utils/utils";

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

	@property({ type: String, attribute: true })
	spinner!: string;

	@property({ type: String })
	value!: string;

	@property({ type: Boolean, reflect: true })
	opened!: boolean;

	// private props

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
		let cssClass = ""

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
					@click="${(e: MouseEvent) => this._onSetInputFocus(e)}"
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
					<panda-icon icon="calendar"></panda-icon>
				</div>
				<div class="date-input" part="date-input">
					<input
						id="input-field"
						class="input-field"
						part="input-field"
						type="text"
						.value="${this.value}"
						.disabled="${this.disabled}"
						@mouseup="${(e: MouseEvent) => this._onInputFieldClick(e)}"
						@input="${(e: any) => this._onChangeDate((e.target as HTMLInputElement).value)}"
						@focus="${(e: any) => this._onInputFieldFocus(e)}"
						@blur="${() => this._onInputFieldBlur()}"
					/>
				</div>
				${clearIconHtml}
				<div
					class="icon"
					part="icon"
					@click="${(e: MouseEvent) => this._onSetInputFocus(e)}"
				>
					<panda-icon icon="chevron-down"></panda-icon>
				</div>
				${spinnerHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
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
			this._overlayEl.addEventListener("close", this._hideOverlayEventBinding);

			// set date picker overlay's props
			this._overlayEl.selectedDate = this.value;

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

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

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

	private _onChangeDate(date: string) {
		console.log("%c [PANDA DATE PICKER] _onSelectedDateChange", "font-size: 24px; color: green;", date);
	}

	private _onSelectedDateChange(e: any) {
		console.log("%c [PANDA DATE PICKER] _onSelectedDateChange", "font-size: 24px; color: green;", e.detail);
		const event = new CustomEvent("change", {
			detail: {
				date: e.detail.date
			}
		});
		this.dispatchEvent(event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-date-picker": PandaDatePicker;
	}
}
