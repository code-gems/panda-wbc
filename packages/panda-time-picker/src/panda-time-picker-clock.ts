// types
import { PandaTimePickerI18nConfig, PandaTimePickerTimeFormat, PandaTimePickerView } from "../index";
import { Point, RawValue, TimeObject } from "./types";

// styles
import { styles } from "./styles/time-picker-clock-styles";

// utils
import { applyStyles } from "@panda-wbc/panda-utils/lib/component-utils";
import {
	arraysEqual,
	getI18nConfig,
	parseStepFromValue,
	parseTimeValue,
	parseViewFromString,
	parseViewsFromAttribute,
} from "./utils/utils";

// constants
import { DEFAULT_TIME_PICKER_VIEW, CLOCK_RADIUS } from "./constants";

export class PandaTimePickerClock extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// observed attributes ============================================================================================
	static readonly observedAttributes = [
		"value",
		"views",
		"selected-view",
		"minute-step",
		"second-step",
		"time-format",
	];

	/**
	 * The value property represents the current time value of the clock in a string format, 
	 * which can be used to display or manipulate the selected time within the PandaTimePickerClock component. 
	 * It is typically expected to be in a specific format (e.g., "HH:MM" or "HH:MM:SS") depending on the 
	 * configuration of the component and is reflected as an attribute for easy access and manipulation via HTML.
	 * @type {string|number}
	 * @attr value
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker-clock value="12:30"></panda-time-picker-clock>
	 * ```
	 */
	get value(): RawValue {
		return this._value;
	}

	set value(value: RawValue) {
		if (this._value !== value) {
			this._parseValue(value);
			this._updateComponent();
		}
	}

	private _value!: RawValue;

	/**
	 * timeFormat
	 * ---
	 * The format in which the time value should be displayed.
	 * @type {PandaTimePickerTimeFormat}
	 * @default "24hr"
	 * @attr time-format
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker-clock time-format="12hr"></panda-time-picker-clock>
	 * ```
	 */
	get timeFormat() {
		return this._timeFormat;
	}

	set timeFormat(value: PandaTimePickerTimeFormat) {
		if (this._timeFormat !== value) {
			this._timeFormat = value === "24" ? "24" : "12";
			// reflect to attribute
			if (value) {
				this.setAttribute("time-format", value);
			} else {
				this.removeAttribute("time-format");
			}
		}
	}

	private _timeFormat!: PandaTimePickerTimeFormat;

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
	 * <panda-time-picker-clock views="hours, minutes, seconds"></panda-time-picker-clock>
	 * ```
	 */
	get views() {
		return this._views;
	}

	set views(value: PandaTimePickerView[]) {
		// if the new value is different from the current value, update the views
		if (Array.isArray(value) && !arraysEqual(this._views, value)) {
			// if the value is a non-empty array, use it as the new views, otherwise use the default views
			if (value.length > 0) {
				this._views = [...value];
			} else {
				this._views = [...DEFAULT_TIME_PICKER_VIEW];
			}
			this._selectedView = this._views[0];
			// update the view
			this._updateViews();
		}
	}

	private _views!: PandaTimePickerView[];

	/**
	 * selectedView
	 * ---
	 * The currently selected view in the time picker. It determines which time unit is currently active and being displayed.
	 * Can be used to preselect a specific view when the time picker is opened or to programmatically switch between views.
	 * @type {PandaTimePickerView}
	 * @attr selected-view
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker-clock selected-view="minutes"></panda-time-picker-clock>
	 * ```
	 */
	get selectedView() {
		return this._selectedView;
	}

	set selectedView(value: PandaTimePickerView) {
		if (this._selectedView !== value) {
			this._selectedView = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("selected-view", value);
			} else {
				this.removeAttribute("selected-view");
			}
		}
	}

	private _selectedView!: PandaTimePickerView;

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
	 * <panda-time-picker-clock minute-step="15"></panda-time-picker-clock>
	 * ```
	 */
	get minuteStep() {
		return this._minuteStep;
	}

	set minuteStep(value: number) {
		if (this._minuteStep !== value) {
			// validate and parse the value
			this._minuteStep = parseStepFromValue(value);
			// reflect to attribute
			if (this._minuteStep === 1) {
				this.removeAttribute("minute-step");
			} else {
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
	 * <panda-time-picker-clock second-step="15"></panda-time-picker-clock>
	 * ```
	 */
	get secondStep() {
		return this._secondStep;
	}

	set secondStep(value: number) {
		if (this._secondStep !== value) {
			// validate and parse the value
			this._secondStep = parseStepFromValue(value);
			// reflect to attribute
			if (this._secondStep === 1) {
				this.removeAttribute("second-step");
			} else {
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
	private _dragged!: boolean;
	private _changedValue!: boolean;
	private _valueObject!: TimeObject;
	private _mousePosition!: Point;

	// elements =======================================================================================================
	private _formEl!: HTMLElement;
	private _clockEl!: HTMLElement;
	private _clockElRect!: DOMRect;
	private _clockCenterEl!: HTMLElement;
	private _clockScaleGroupEl!: SVGGElement;
	// hour hand elements
	private _hourGroupEl!: SVGGElement;
	private _hourHandEl!: SVGLineElement;
	// minute hand elements
	private _minuteGroupEl!: SVGGElement;
	private _minuteHandEl!: SVGLineElement;
	// second hand elements
	private _secondGroupEl!: SVGGElement;
	private _secondHandEl!: SVGLineElement;
	private _secondHandBackEl!: SVGLineElement;

	// time input elements ====================================================
	private readonly _inputFieldEl!: HTMLDivElement;
	private readonly _hourDisplayEl!: HTMLDivElement;
	private readonly _minuteDisplayEl!: HTMLDivElement;
	private readonly _secondDisplayEl!: HTMLDivElement;
	private readonly _periodDisplayEl!: HTMLDivElement;
	private readonly _separator1El!: HTMLSpanElement;
	private readonly _separator2El!: HTMLSpanElement;

	// events =========================================================================================================
	private readonly _changeViewEvent!: EventListener;
	private readonly _togglePeriodEvent!: EventListener;
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
							<!-- Clock scale -->
							<g class="clock-scale-group"></g>

							<!-- Hour hand -->
							<g class="hour-hand-group">
								<line class="hour-hand" x1="125" y1="150" x2="125" y2="40" />
							</g>

							<!-- Minute hand -->
							<g class="minute-hand-group">
								<line class="minute-hand" x1="125" y1="160" x2="125" y2="25" />
							</g>

							<!-- Second hand -->
							<g class="second-hand-group">
								<line class="second-hand" x1="125" y1="170" x2="125" y2="10" stroke-width="3" />
								<line class="second-hand" x1="125" y1="150" x2="125" y2="170" stroke-width="8" />
							</g>

							<!-- Clock value -->
							<circle class="clock-center" cx="125" cy="125" r="8" />
							<circle class="clock-center-dot" cx="125" cy="125" r="5" />
						</svg>
					</div>
				</div>
			</div>
		`;
		// apply component styles
		applyStyles(styles, this.shadowRoot);

		// create hour input element
		this._hourDisplayEl = document.createElement("div");
		this._hourDisplayEl.className = "time-input time-input-hour";
		this._hourDisplayEl.part = "time-input-hour";
		this._hourDisplayEl.dataset.timePart = "hours";

		// create minute input element
		this._minuteDisplayEl = document.createElement("div");
		this._minuteDisplayEl.className = "time-input time-input-minute";
		this._minuteDisplayEl.part = "time-input-minute";
		this._minuteDisplayEl.dataset.timePart = "minutes";

		// create second input element
		this._secondDisplayEl = document.createElement("div");
		this._secondDisplayEl.className = "time-input time-input-second";
		this._secondDisplayEl.part = "time-input-second";
		this._secondDisplayEl.dataset.timePart = "seconds";

		// create period input element
		this._periodDisplayEl = document.createElement("div");
		this._periodDisplayEl.className = "toggle-period";
		this._periodDisplayEl.part = "toggle-period";
		this._periodDisplayEl.innerHTML = `
			<span class="period period-am" part="period-am" data-value="am">AM</span>
			<span class="period period-pm" part="period-pm" data-value="pm">PM</span>
		`;

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
		this._mousePosition = { x: 0, y: 0 };
		this._views = [...DEFAULT_TIME_PICKER_VIEW];
		this._selectedView = "hours";
		this._timeFormat = "12";
		this._minuteStep = 1;
		this._secondStep = 1;

		// initialize event binders
		this._changeViewEvent = this._onChangeView.bind(this);
		this._togglePeriodEvent = this._onTogglePeriod.bind(this);
		this._mouseDownEvent = this._onMouseDown.bind(this);
		this._mouseMoveEvent = this._onMouseMove.bind(this);
		this._mouseUpEvent = this._onMouseUp.bind(this);

		// get elements handles
		if (this.shadowRoot) {
			this._formEl = this.shadowRoot.querySelector(".form") as HTMLElement;
			this._clockEl = this.shadowRoot.querySelector(".clock") as HTMLElement;
			this._clockCenterEl = this.shadowRoot.querySelector(".clock-center") as HTMLElement;
			this._clockScaleGroupEl = this.shadowRoot.querySelector(".clock-scale-group") as SVGGElement;
			this._hourHandEl = this.shadowRoot.querySelector(".hour-hand") as SVGLineElement;
			this._hourGroupEl = this.shadowRoot.querySelector(".hour-hand-group") as SVGGElement;
			this._minuteHandEl = this.shadowRoot.querySelector(".minute-hand") as SVGLineElement;
			this._minuteGroupEl = this.shadowRoot.querySelector(".minute-hand-group") as SVGGElement;
			this._secondHandEl = this.shadowRoot.querySelector(".second-hand") as SVGLineElement;
			this._secondGroupEl = this.shadowRoot.querySelector(".second-hand-group") as SVGGElement;
			this._inputFieldEl = this.shadowRoot.querySelector(".input-field") as HTMLDivElement;
		}
	}

	connectedCallback() {
		// attach event listeners
		this._inputFieldEl.addEventListener("click", this._changeViewEvent);
		this._periodDisplayEl.addEventListener("click", this._togglePeriodEvent);
		this._clockEl.addEventListener("mousedown", this._mouseDownEvent);
		this._clockEl.addEventListener("mousemove", this._mouseMoveEvent);
		document.addEventListener("mouseup", this._mouseUpEvent);
		// initial render
		this._updateComponent();
		// update the view
		this._updateViews();
		this._drawClockScale();
	}

	disconnectedCallback() {
		// detach event listeners
		this._inputFieldEl.removeEventListener("click", this._changeViewEvent);
		this._periodDisplayEl.removeEventListener("click", this._togglePeriodEvent);
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
				this._parseValue(this._value);
				break;

			case "time-format":
				this._timeFormat = _newValue === "24" ? "24" : "12";
				this._updateViews();
				break;

			case "views":
				this._views = parseViewsFromAttribute(_newValue);
				this._selectedView = this._views[0];
				this._updateViews();
				break;

			case "selected-view":
				this._selectedView = parseViewFromString(_newValue, this._views);
				break;

			case "minute-step":
				this._minuteStep = parseStepFromValue(_newValue);
				break;

			case "second-step":
				this._secondStep = parseStepFromValue(_newValue);
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
			// update period toggle state
			if (this._valueObject.period === "am") {
				this._periodDisplayEl.classList.add("am");
				this._periodDisplayEl.classList.remove("pm");
			} else {
				this._periodDisplayEl.classList.remove("am");
				this._periodDisplayEl.classList.add("pm");
			}
			
			// update form css class based on selected view
			// based on form css class clock show/hide time hands
			this._formEl.classList.remove("hour-view", "minute-view", "second-view", "active");
			if (this._selectedView === "hours") {
				this._formEl.classList.add("hour-view");
			} else if (this._selectedView === "minutes") {
				this._formEl.classList.add("minute-view");
			} else if (this._selectedView === "seconds") {
				this._formEl.classList.add("second-view");
			}

		}
	}

	/**
	 * Update the time input fields based on the enabled views and time format.
	 * This method checks which views (hours, minutes, seconds) are enabled and updates the corresponding input fields accordingly.
	 * It also handles the display of separators between time units and the period input for 12-hour format.
	 */
	private _updateViews(): void {
		if (this.isConnected) {
			// check if hours view is enabled
			if (this._views.includes("hours")) {
				this._hourDisplayEl.textContent = this._i18n.hourPlaceholder;
				this._inputFieldEl.appendChild(this._hourDisplayEl);
			} else {
				this._hourDisplayEl.remove();
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
				this._minuteDisplayEl.textContent = this._i18n.minutePlaceholder;
				this._inputFieldEl.appendChild(this._minuteDisplayEl);
			} else {
				this._minuteDisplayEl.remove();
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
				this._secondDisplayEl.textContent = this._i18n.secondPlaceholder;
				this._inputFieldEl.appendChild(this._secondDisplayEl);
			} else {
				this._secondDisplayEl.remove();
			}

			// check if view contains hours and if time format is 12 hours, then show period input
			if (this._views.includes("hours") && this._timeFormat === "12") {
				this._inputFieldEl.appendChild(this._periodDisplayEl);
			} else {
				this._periodDisplayEl.remove();
			}
		}
	}

	/** Update the clock hands based on the current value object. */
	private _updateClockHands(): void {
		console.log(`%c ⚡ (_updateClockHands)`, "font-size: 24px; color: crimson; background: black;", this._valueObject);
		if (this._valueObject) {
			this._drawHourHand(this._valueObject.hours);
			this._drawMinuteHand(this._valueObject.minutes);
			this._drawSecondHand(this._valueObject.seconds);
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _parseValue(rawValue: RawValue): void {
		const {
			value,
			valueObject,
		} = parseTimeValue(rawValue, this._timeFormat);
		this._value = value;
		this._valueObject = valueObject;

		console.log(
			`%c 🧪 [CLOCK] (_parseValue) ${rawValue}`,
			"font-size: 24px; color: limegreen; background: black; padding: 5px; border-radius: 10px;",
			this._valueObject
		);

		if (value != null) {
			// update time input fields based on the new value object
			this._hourDisplayEl.innerText = this._valueObject.hours != null ? this._valueObject.hours.toString().padStart(2, "0") : "";
			this._minuteDisplayEl.innerText = this._valueObject.minutes != null ? this._valueObject.minutes.toString().padStart(2, "0") : "";
			this._secondDisplayEl.innerText = this._valueObject.seconds != null ? this._valueObject.seconds.toString().padStart(2, "0") : "";
		}
		// update component
		this._updateComponent();
		this._updateClockHands();
	}

	private _drawClockScale(): void {
		// draw clock scale
		const existingScales = this.shadowRoot!.querySelectorAll(".clock-scale");
		existingScales.forEach((scale) => scale.remove());

		for (let i = 0; i < 60; i++) {
			const angle = (i / 60) * 2 * Math.PI - Math.PI / 2;
			const x1 = CLOCK_RADIUS + 115 * Math.cos(angle);
			const y1 = CLOCK_RADIUS + 115 * Math.sin(angle);
			const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			dot.setAttribute("cx", x1.toString());
			dot.setAttribute("cy", y1.toString());
			dot.setAttribute("r", "1");
			dot.setAttribute("class", "clock-scale-dot");
			this._clockScaleGroupEl.appendChild(dot);
		}

		for (let i = 0; i < 12; i++) {
			const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
			const x1 = CLOCK_RADIUS + 110 * Math.cos(angle);
			const y1 = CLOCK_RADIUS + 110 * Math.sin(angle);
			const x2 = CLOCK_RADIUS + 115 * Math.cos(angle);
			const y2 = CLOCK_RADIUS + 115 * Math.sin(angle);
			const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
			line.setAttribute("x1", x1.toString());
			line.setAttribute("y1", y1.toString());
			line.setAttribute("x2", x2.toString());
			line.setAttribute("y2", y2.toString());
			line.setAttribute("class", "clock-scale");
			this._clockScaleGroupEl.appendChild(line);
		}
	}

	private _drawHourHand(hour?: number | null): void {
		if (hour == null) {
			this._hourGroupEl.classList.add("hidden");
		} else {
			const tf = this._timeFormat === "24" ? 24 : 12;
			this._hourGroupEl.classList.remove("hidden");
			this._hourGroupEl.style.transform = `rotate(${(hour / tf) * 360}deg)`;
		}
	}

	private _drawMinuteHand(minute?: number | null): void {
		if (minute == null) {
			this._minuteGroupEl.classList.add("hidden");
		} else {
			this._minuteGroupEl.classList.remove("hidden");
			this._minuteGroupEl.style.transform = `rotate(${(minute / 60) * 360}deg)`;
			// let handLength = 110;
			// this._minuteHandEl.setAttribute("x2", (125 + handLength * Math.cos((minute / 60) * 2 * Math.PI - Math.PI / 2)).toString());
			// this._minuteHandEl.setAttribute("y2", (125 + handLength * Math.sin((minute / 60) * 2 * Math.PI - Math.PI / 2)).toString());
		}
	}

	private _drawSecondHand(second?: number | null): void {
		if (second == null) {
			this._secondGroupEl.classList.add("hidden");
		} else {
			this._secondGroupEl.classList.remove("hidden");
			this._secondGroupEl.style.transform = `rotate(${(second / 60) * 360}deg)`;
		}
	}

	private _switchView(view?: PandaTimePickerView): void {
		// if a specific view is provided and it is included in the available views, switch to that view
		if (view && this._views.includes(view)) {
			this._selectedView = view;
		} else if (view == null) {
			let currentIndex = this._views.indexOf(this._selectedView);
			// check if current index is NOT the last item in the views array
			// do NOT increment if current index is the last item in the views array to avoid switching to the first view
			if (this._views.length > currentIndex + 1) {
				currentIndex = (currentIndex + 1) % this._views.length;
			}
			// update selected view based on the new index
			this._selectedView = this._views[currentIndex];
		}
		// update clock view and value display based on the selected view
		this._updateClockHands();
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	
	private _onChangeView(event: Event): void {
		const timeInputEl = (event.target as HTMLElement).closest(".time-input") as HTMLDivElement;
		console.log(
			`%c 🧪 [CLOCK] (_onChangeView) ${timeInputEl?.dataset.timePart}`,
			"font-size: 24px; color: orange; background: black; padding: 5px; border-radius: 10px;",
			timeInputEl
		);

		if (timeInputEl) {
			const view = timeInputEl.dataset.timePart as PandaTimePickerView;
			this._switchView(view);
			this._updateComponent();
		}
	}

	private _onTogglePeriod(event: Event): void {
		const periodEl = (event.target as HTMLElement).closest(".period") as HTMLDivElement;
		if (periodEl) {
			this._valueObject.period = periodEl.dataset.value as "am" | "pm";
			this._updateComponent();
		}
	}

	private _onMouseDown(): void {
		this._dragged = true;
		this._changedValue = false;
		this._formEl.classList.add("active");
		this._clockElRect = this._clockEl.getBoundingClientRect();
	}

	private _onMouseMove(event: Event): void {
		if (this._dragged) {
			const clockWidth = this._clockElRect.width;
			const clockHeight = this._clockElRect.height;
			this._mousePosition.x = (event as MouseEvent).clientX - this._clockElRect.x - clockWidth / 2;
			this._mousePosition.y = ((event as MouseEvent).clientY - this._clockElRect.y - clockHeight / 2) * -1;

			let angle = Math.atan2(this._mousePosition.y, this._mousePosition.x) * (180 / Math.PI);
			// invert angle to match clock direction and rotate to make 12 o'clock at 0 degrees
			angle = (angle - 90) * -1;
			if (angle < 0) {
				angle = angle + 360;
			}

			if (this._selectedView === "hours") {
				// get degrees per hour based on time format
				const dph = this._timeFormat === "24"
					? 15 // 360 degrees / 24 hours = 15 degrees per hour
					: 30; // 360 degrees / 12 hours = 30 degrees per hour
					
				// calculate hour value based on the angle of the mouse position
				let hour = Math.round(angle / dph);

				// if time format is not 24 hours, convert hour value to 12-hour format
				if (this._timeFormat !== "24") {
					hour = hour % 12;
				} else {
					hour = hour % 24;
				}
				// value correction
				if (hour === 0 && this._timeFormat !== "24") {
					hour = 12;
				}
				// draw hour hand based on the calculated hour value
				this._drawHourHand(hour);
				// update selected value
				this._valueObject.hours = hour;
				// update hour input field
				this._hourDisplayEl.innerText = hour.toString().padStart(2, "0");
				this._changedValue = true;

			} else if (this._selectedView === "minutes") {
				// calculate minute value based on the angle of the mouse position
				let minute = Math.round(angle / 6); // 360 degrees / 60 minutes = 6 degrees per minute
				// round the minute value to the nearest step
				minute = Math.round(minute / this._minuteStep) * this._minuteStep;
				// value correction
				if (minute === 60) {
					minute = 0;
				}
				// draw minute hand based on the calculated minute value
				this._drawMinuteHand(minute);
				// update selected value
				this._valueObject.minutes = minute;
				// update minute input field
				this._minuteDisplayEl.innerText = minute.toString().padStart(2, "0");
				this._changedValue = true;

			} else if (this._selectedView === "seconds") {
				// calculate second value based on the angle of the mouse position
				let second = Math.round(angle / 6); // 360 degrees / 60 seconds = 6 degrees per second
				// round the second value to the nearest step
				second = Math.round(second / this._secondStep) * this._secondStep;
				// value correction
				if (second === 60) {
					second = 0;
				}
				// draw second hand based on the calculated second value
				this._drawSecondHand(second);
				// update selected value
				this._valueObject.seconds = second;
				// update second input field
				this._secondDisplayEl.innerText = second.toString().padStart(2, "0");
				this._changedValue = true;
			}
		}
	}

	/**
	 * check if dragging was initiated by mouse down event
	 * mouse up event is listened on a document which may cause it to trigger without a preceding mouse down event on the clock, 
	 * so we need to check if dragging was initiated before handling mouse up logic
	 */
	private _onMouseUp(): void {
		if (this._dragged) {
			this._dragged = false;
			if (this._changedValue) {
				this._switchView();
			}
			this._formEl.classList.remove("active");
			this._updateComponent();
		}
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