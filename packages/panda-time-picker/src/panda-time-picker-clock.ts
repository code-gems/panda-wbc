// types
import { PandaTimePickerI18nConfig, PandaTimePickerView } from "../index";
import { Point, RawValue, TimeObject } from "./types";

// styles
import { styles } from "./styles/time-picker-clock-styles";

// components
// ...

// utils
import { applyStyles } from "@panda-wbc/panda-utils/lib/component-utils";
import { arraysEqual, getI18nConfig } from "./utils/utils";

// constants
import { DEFAULT_TIME_PICKER_VIEW } from "./constants";

export class PandaTimePickerClock extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// observed attributes ============================================================================================
	static readonly observedAttributes = [
		"value",
		"views",
		"minute-step",
		"second-step",
	];

	/**
	 * The value property represents the current time value of the clock in a string format, 
	 * which can be used to display or manipulate the selected time within the PandaTimePickerClock component. 
	 * It is typically expected to be in a specific format (e.g., "HH:MM" or "HH:MM:SS") depending on the 
	 * configuration of the component and is reflected as an attribute for easy access and manipulation via HTML.
	 * @type {RawValue}
	 */
	get value(): RawValue {
		return this._value;
	}

	set value(value: RawValue) {
		if (this._value !== value) {
			this._value = value;
			// this.setAttribute("value", this._value); // reflect to attribute
			this._updateComponent();
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
		console.log(`%c [PANDA TIME PICKER CLOCK] (set views) new value:`,
			"font-size: 16px; color: orange; background: black;",
			value
		);
		// if the new value is different from the current value, update the views
		if (Array.isArray(value) && !arraysEqual(this._views, value)) {
			// if the value is a non-empty array, use it as the new views, otherwise use the default views
			if (value.length > 0) {
				this._views = [...value];
			} else {
				this._views = [...DEFAULT_TIME_PICKER_VIEW];
			}
			// update the view
			this._updateViews();
		}
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
			// reflect to attribute
			if (value == null || value <= 0 || isNaN(value) || !isFinite(value) || value > 59) {
				this._minuteStep = 1;
				this.removeAttribute("minute-step");
			} else {
				this._minuteStep = value;
				this.setAttribute("minute-step", this._minuteStep + "");
			}
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
			// reflect to attribute
			if (value == null || value <= 0 || isNaN(value) || !isFinite(value) || value > 59) {
				this._secondStep = 1;
				this.removeAttribute("second-step");
			} else {
				this._secondStep = value;
				this.setAttribute("second-step", this._secondStep + "");
			}
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
	 * @public
	 */
	get i18n(): PandaTimePickerI18nConfig {
		return this._i18n;
	}

	set i18n(config: PandaTimePickerI18nConfig) {
		this._i18n = config;
		this._updateComponent();
	}

	private _i18n!: PandaTimePickerI18nConfig;

	// private properties =============================================================================================
	private _invalid!: boolean;
	private _dragged!: boolean;
	private _valueObject!: TimeObject;
	private _mousePos!: Point;

	// elements =======================================================================================================
	private _clockEl!: HTMLElement;
	private _clockCenterEl!: HTMLElement;
	private _clockValueEl!: HTMLElement;
	// time input elements ====================================================
	private readonly _inputFieldEl!: HTMLDivElement;
	private readonly _hourInputEl!: HTMLDivElement;
	private readonly _minuteInputEl!: HTMLDivElement;
	private readonly _secondInputEl!: HTMLDivElement;
	private readonly _periodInputEl!: HTMLDivElement;
	private readonly _separator1El!: HTMLSpanElement;
	private readonly _separator2El!: HTMLSpanElement;

	// events =========================================================================================================
	private readonly _mouseMoveEvent!: EventListener;
	private readonly _mouseDownEvent!: EventListener;
	private readonly _mouseUpEvent!: EventListener;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		this.shadowRoot!.innerHTML = `
			<div class="form" part="form">
				<div class="header" part="header">
					<div class="input-field" part="input-field"></div>
				</div>
				<div class="body" part="body">
					<div class="clock-cont" part="clock-cont">
						<svg
							class="clock"
							width="250"
							height="250"
							viewBox="0 0 250 250"
						>
							<circle class="clock-face" cx="125" cy="125" r="125" />
							<circle class="clock-center" cx="125" cy="125" r="5" />
							<text class="clock-value" x="125" y="125"></text>
						</svg>
					</div>
				</div>
			</div>
		`;
		// apply component styles
		applyStyles(styles, this.shadowRoot);

		// create hour input element
		this._hourInputEl = document.createElement("div");
		this._hourInputEl.className = "time-input";
		this._hourInputEl.part = "time-input-hour";
		this._hourInputEl.dataset.timePart = "hours";

		// create minute input element
		this._minuteInputEl = document.createElement("div");
		this._minuteInputEl.className = "time-input";
		this._minuteInputEl.part = "time-input-minute";
		this._minuteInputEl.dataset.timePart = "minutes";

		// create second input element
		this._secondInputEl = document.createElement("div");
		this._secondInputEl.className = "time-input";
		this._secondInputEl.part = "time-input-second";
		this._secondInputEl.dataset.timePart = "seconds";

		// create period input element
		this._periodInputEl = document.createElement("div");
		this._periodInputEl.innerHTML = `
			<span class="period-am" part="period-am">AM</span>
			<span class="period-pm" part="period-pm">PM</span>
		`;
		this._periodInputEl.className = "toggle-period";
		this._periodInputEl.part = "toggle-period";
		this._periodInputEl.dataset.timePart = "period";

		// create separator element
		this._separator1El = document.createElement("span");
		this._separator1El.className = "separator";
		this._separator1El.textContent = ":";
		this._separator2El = document.createElement("span");
		this._separator2El.className = "separator";
		this._separator2El.textContent = ":";

		// initialize properties
		this._value = "";
		this._i18n = getI18nConfig();
		this._dragged = false;
		this._mousePos = { x: 0, y: 0 };
		this._views = [...DEFAULT_TIME_PICKER_VIEW];

		// initialize event binders
		this._mouseDownEvent = this._onMouseDown.bind(this);
		this._mouseMoveEvent = this._onMouseMove.bind(this);
		this._mouseUpEvent = this._onMouseUp.bind(this);

		// get elements handles
		if (this.shadowRoot) {
			this._clockEl = this.shadowRoot.querySelector(".clock") as HTMLElement;
			this._clockCenterEl = this.shadowRoot.querySelector(".clock-center") as HTMLElement;
			this._clockValueEl = this.shadowRoot.querySelector(".clock-value") as HTMLElement;
			this._inputFieldEl = this.shadowRoot.querySelector(".input-field") as HTMLDivElement;
		}
	}

	connectedCallback() {
		// attach event listeners
		this._clockEl.addEventListener("mousedown", this._mouseDownEvent);
		this._clockEl.addEventListener("mousemove", this._mouseMoveEvent);
		document.addEventListener("mouseup", this._mouseUpEvent);
		// initial render
		this._updateComponent();
		// update the view
		this._updateViews();
	}

	disconnectedCallback() {
		// detach event listeners
		this._clockEl.removeEventListener("mousedown", this._mouseDownEvent);
		this._clockEl.removeEventListener("mousemove", this._mouseMoveEvent);
		document.removeEventListener("mouseup", this._mouseUpEvent);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// check if value changed
		if (_oldValue == _newValue) {
			return;
		}

		switch (_name) {
			case "value":
				this._value = _newValue;
				break;
		}

		// update component
		this._updateComponent();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	/** Renders the badge */
	private _updateComponent() {
		if (this.isConnected) {

		}
	}

	/** Update the time input fields based on the enabled views and time format. */
	private _updateViews(): void {
		if (this.isConnected) {

			console.log(`%c [PANDA TIME PICKER CLOCK] (_updateViews) enabled views:`,
				"font-size: 16px; color: cyan; background: black;",
				this._views
			);

			// check if hours view is enabled
			if (this._views.includes("hours")) {
				this._hourInputEl.textContent = this._i18n.hourPlaceholder;
				this._inputFieldEl.appendChild(this._hourInputEl);
			} else {
				this._hourInputEl.remove();
			}

			// check if minutes view is enabled
			if (this._views.includes("minutes")) {
				// check if hours view is enabled to decide whether to show separator
				if (this._views.includes("hours")) {
					this._inputFieldEl.appendChild(this._separator1El);
				} else {
					this._separator1El.remove();
				}
				// add minute input to input wrap
				this._minuteInputEl.textContent = this._i18n.minutePlaceholder;
				this._inputFieldEl.appendChild(this._minuteInputEl);
			} else {
				this._minuteInputEl.remove();
			}

			// check if seconds view is enabled
			if (this._views.includes("seconds")) {
				// check if hours or minutes view is enabled to decide whether to show separator
				if (this._views.includes("minutes") || this._views.includes("hours")) {
					this._inputFieldEl.appendChild(this._separator2El);
				} else {
					this._separator2El.remove();
				}
				// add second input to input wrap
				this._secondInputEl.textContent = this._i18n.secondPlaceholder;
				this._inputFieldEl.appendChild(this._secondInputEl);
			} else {
				this._secondInputEl.remove();
			}
			
			// check if view contains hours and if time format is 12 hours, then show period input
			if (this._views.includes("hours")) {
				this._inputFieldEl.appendChild(this._periodInputEl);
			} else {
				this._periodInputEl.remove();
			}
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onMouseDown(event: Event): void {

		this._dragged = true;
		this._clockEl.classList.add("active");
		// console.log(`%c ⚡ [PANDA TIME PICKER CLOCK] (_onMouseDown) event:`,
		// 	"font-size: 24px; color: crimson; background: black;",
		// 	event
		// );
		// console.log(`%c ⚡ [PANDA TIME PICKER CLOCK] (_onMouseDown) rects:`,
		// 	"font-size: 24px; color: crimson; background: black;",
		// 	rects
		// );
	}

	private _onMouseMove(event: Event): void {
		if (this._dragged) {
			const rects = this._clockEl.getClientRects();
			const clockWidth = rects[0].width;
			const clockHeight = rects[0].height;
			this._mousePos.x = (event as MouseEvent).clientX - rects[0].x - clockWidth / 2;
			this._mousePos.y = ((event as MouseEvent).clientY - rects[0].y - clockHeight / 2) * -1;

			let angle = Math.atan2(this._mousePos.y, this._mousePos.x) * (180 / Math.PI);
			// invert angle to match clock direction and rotate to make 12 o'clock at 0 degrees
			angle = (angle - 90) * -1;
			if (angle < 0) {
				angle = angle + 360;
			}

			let hour = Math.round(angle / 30);
			if (hour === 0) {
				hour = 12;
			}

			let minute = Math.round(angle / 6);
			const step = 5;
			minute = Math.round(minute / step) * step;
			if (minute === 60) {
				minute = 0;
			}

			this._clockValueEl.innerHTML = minute.toFixed(0);
		}
	}

	private _onMouseUp(event: Event): void {
		this._dragged = false;
		this._clockEl.classList.remove("active");
		// console.log(`%c ⚡ [PANDA TIME PICKER CLOCK] (_onMouseUp) event:`,
		// 	"font-size: 24px; color: crimson; background: black;",
		// 	event
		// );
	}

}

// Register the custom element
if (!customElements.get("panda-time-picker-clock")) {
	customElements.define("panda-time-picker-clock", PandaTimePickerClock);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-time-picker-clock": PandaTimePickerClock;
	}
}