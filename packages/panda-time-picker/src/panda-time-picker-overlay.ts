// types
import { PandaTimePickerI18nConfig, PandaTimePickerView } from "../index";
import { RawValue } from "./types";

// styles
import { styles } from "./styles/time-picker-overlay-styles";

// component
import "./panda-time-picker-clock";

// utils
import { applyStyles } from "@panda-wbc/panda-utils/lib/component-utils";
import { getI18nConfig } from "./utils/utils";
import { PandaTimePickerClock } from "./panda-time-picker-clock";

export class PandaTimePickerOverlay extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	/**
	 * value
	 * ---
	 * Currently selected time value.
	 * @type {string|number|null}
	 * @default ""
	 * @attr value
	 * @public
	 * @example
	 * acceptable input formats:
	 * 1. HH:MM eg. 14:30
	 * 2. HH:MM:SS eg. 14:30:45
	 * 3. HH:MM AA eg. 02:30 PM
	 * 4. HH:MM:SS AA eg. 02:30:45 PM
	 * 5. X eg. 1672531199000 (UNIX timestamp in milliseconds)
	 * ```html
	 * <panda-time-picker value="14:30"></panda-time-picker>
	 * <panda-time-picker value="02:30 PM"></panda-time-picker>
	 * ```
	 */
	get value() {
		return this._value;
	}

	set value(rawValue: RawValue) {
		if (this._value !== rawValue) {
			// this._parseValue(rawValue);
		}
	}

	private _value!: RawValue;
	
	/**
	 * view
	 * ---
	 * The view of the time picker. It determines which time units are displayed and can be selected by the user.
	 * @type {PandaTimePickerView[]}
	 * @attr views
	 * @default ["hours", "minutes"]
	 * @attr view
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker views="hours, minutes, seconds"></panda-time-picker>
	 * ```
	 */
	get views() {
		return this._views;
	}

	set views(value: PandaTimePickerView[]) {
		this._views = [...value];
	}

	private _views!: PandaTimePickerView[];
	
	/**
	 * minuteStep
	 * ---
	 * The step value for minutes in the time picker component. It determines the increment/decrement step for minutes when using the spinner or keyboard input.
	 * For example, if minuteStep is set to 5, the minutes will increment/decrement in steps of 5 (e.g., 0, 5, 10, 15, etc.).
	 * @type {number}
	 * @default 1
	 * @attr minute-step
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker minute-step="15"></panda-time-picker>
	 * ```
	 */
	get minuteStep() {
		return this._minuteStep;
	}

	set minuteStep(value: number) {
		if (this._minuteStep !== value) {
			this._minuteStep = value;
		}
	}

	private _minuteStep!: number;

	/**
	 * secondStep
	 * ---
	 * The step value for seconds in the time picker component. 
	 * It determines the increment/decrement step for seconds when using the spinner or keyboard input.
	 * For example, if secondStep is set to 5, the seconds will increment/decrement in steps of 5 (e.g., 0, 5, 10, 15, etc.).
	 * @type {number}
	 * @default 1
	 * @attr second-step
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker second-step="15"></panda-time-picker>
	 * ```
	 */
	get secondStep() {
		return this._secondStep;
	}

	set secondStep(value: number) {
		if (this._secondStep !== value) {
			this._secondStep = value;
		}
	}

	private _secondStep!: number;

	/**
	 * i18n
	 * ---
	 * Internationalization (i18n) configuration for the component. 
	 * It allows you to customize the display of time values based on different locales and preferences.
	 * The i18n configuration object can have the following properties:
	 * - hh: A string representing the hour format (e.g., "HH" for 24-hour format or "hh" for 12-hour format).
	 * - mm: A string representing the minute format (e.g., "MM").
	 * - ss: A string representing the second format (e.g., "SS").
	 * - am: A string representing the ante meridiem (AM) designator (e.g., "AM").
	 * - pm: A string representing the post meridiem (PM) designator (e.g., "PM").
	 * @type {PandaTimePickerI18nConfig}
	 * @default { hh: "HH", mm: "MM", ss: "SS", am: "AM", pm: "PM" }
	 */
	get i18n() {
		return this._i18n;
	}

	set i18n(value: PandaTimePickerI18nConfig) {
		if (this._i18n !== value) {
			this._i18n = {
				...getI18nConfig(),
				...value,
			};
		}
	}

	private _i18n!: PandaTimePickerI18nConfig;

	// private properties =============================================================================================

	// elements =======================================================================================================
	private _overlayEl!: HTMLElement;
	private _formEl!: HTMLElement;
	private _clockEl!: PandaTimePickerClock;

	// events =========================================================================================================
	private readonly _overlayTabKeyEvent!: EventListener;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// create component template
		this.shadowRoot!.innerHTML = /*html*/`
			<div class="overlay" part="overlay">
				<div class="form" part="form">
					<div class="header" part="header">
						<div class="title" part="title"></div>
						<div class="help-text" part="help-text"></div>
					</div>
					<div class="body" part="body">
						<panda-time-picker-clock></panda-time-picker-clock>
					</div>
					<div class="footer" part="footer"></div>
				</div>
			</div>
		`;

		// apply styles
		applyStyles(styles, this.shadowRoot);

		// initialize class properties
		this._i18n = getI18nConfig();

		// init event handlers
		this._overlayTabKeyEvent = this._onOverlayTabKey.bind(this);

		if (this.shadowRoot) {
			this._overlayEl = this.shadowRoot.querySelector(".overlay") as HTMLElement;
			this._formEl = this.shadowRoot.querySelector(".form") as HTMLElement;
			this._clockEl = this.shadowRoot.querySelector("panda-time-picker-clock") as PandaTimePickerClock;
		}
	}

	connectedCallback() {
		// add event listeners
		this._overlayEl.addEventListener("keydown", this._overlayTabKeyEvent);

		// initial render
		this._updateComponent();
	}

	disconnectedCallback() {
		// remove event listeners
		this._overlayEl.removeEventListener("keydown", this._overlayTabKeyEvent);
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _updateComponent(): void {
		if (this.isConnected) {
			// update component based on current properties
			this._clockEl.views = this._views;
			this._clockEl.minuteStep = this._minuteStep;
			this._clockEl.secondStep = this._secondStep;
			this._clockEl.i18n = this._i18n;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onOverlayTabKey(event: Event): void {
		if (document.activeElement === this && (event as KeyboardEvent).code === "Tab") {
			// prevent tab key to trap focus inside the overlay
			event.preventDefault();
		}
	}

}

// Register the custom element
if (!customElements.get("panda-time-picker-overlay")) {
	customElements.define("panda-time-picker-overlay", PandaTimePickerOverlay);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-time-picker-overlay": PandaTimePickerOverlay;
	}
}