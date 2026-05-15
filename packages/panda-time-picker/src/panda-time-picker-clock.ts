// types
import { PandaTimePickerI18nConfig, PandaTimePickerTimeFormat, PandaTimePickerView } from "../index";
import { Point, RawValue, TimeObject } from "./types";

// styles
import { styles } from "./styles/time-picker-clock-styles";

// utils
import { applyStyles, parseNumberAttribute } from "@panda-wbc/panda-utils/lib/component-utils";
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
			this._value = value;
			// this.setAttribute("value", this._value); // reflect to attribute
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
			this._timeFormat = value;
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
	private _valueObject!: TimeObject;
	private _mousePosition!: Point;

	// elements =======================================================================================================
	private _clockEl!: HTMLElement;
	private _clockCenterEl!: HTMLElement;
	private _clockValueEl!: HTMLElement;
	private _clockScaleGroupEl!: SVGGElement;
	// hour hand elements
	private _hourGroupEl!: SVGGElement;
	private _hourHandEl!: SVGLineElement;
	private _hourHandCenterEl!: SVGCircleElement;
	// minute hand elements
	private _minuteGroupEl!: SVGGElement;
	private _minuteHandEl!: SVGLineElement;
	private _minuteHandCenterEl!: SVGCircleElement;
	// second hand elements
	private _secondGroupEl!: SVGGElement;
	private _secondHandEl!: SVGLineElement;
	private _secondHandCenterEl!: SVGCircleElement;

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
							<!-- Clock scale -->
							<g class="clock-scale-group"></g>

							<!-- Hour hand -->
							<g class="hour-hand-group">
								<line class="hour-hand" x1="125" y1="125" x2="125" y2="70" />
								<circle class="hour-hand-center" cx="125" cy="70" r="5" />
							</g>

							<!-- Minute hand -->
							<g class="minute-hand-group">
								<line class="minute-hand" x1="125" y1="125" x2="125" y2="50" />
								<circle class="minute-hand-center" cx="125" cy="50" r="5" />
							</g>

							<!-- Second hand -->
							<g class="second-hand-group">
								<line class="second-hand" x1="125" y1="125" x2="125" y2="40" />
								<circle class="second-hand-center" cx="125" cy="40" r="5" />
							</g>

							<!-- Clock value -->
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
		this._mousePosition = { x: 0, y: 0 };
		this._views = [...DEFAULT_TIME_PICKER_VIEW];
		this._selectedView = "hours";
		this._timeFormat = "12";

		// initialize event binders
		this._mouseDownEvent = this._onMouseDown.bind(this);
		this._mouseMoveEvent = this._onMouseMove.bind(this);
		this._mouseUpEvent = this._onMouseUp.bind(this);

		// get elements handles
		if (this.shadowRoot) {
			this._clockEl = this.shadowRoot.querySelector(".clock") as HTMLElement;
			this._clockCenterEl = this.shadowRoot.querySelector(".clock-center") as HTMLElement;
			this._clockValueEl = this.shadowRoot.querySelector(".clock-value") as HTMLElement;
			this._clockScaleGroupEl = this.shadowRoot.querySelector(".clock-scale-group") as SVGGElement;
			this._hourHandEl = this.shadowRoot.querySelector(".hour-hand") as SVGLineElement;
			this._hourHandCenterEl = this.shadowRoot.querySelector(".hour-hand-center") as SVGCircleElement;
			this._minuteHandEl = this.shadowRoot.querySelector(".minute-hand") as SVGLineElement;
			this._minuteHandCenterEl = this.shadowRoot.querySelector(".minute-hand-center") as SVGCircleElement;
			this._secondHandEl = this.shadowRoot.querySelector(".second-hand") as SVGLineElement;
			this._secondHandCenterEl = this.shadowRoot.querySelector(".second-hand-center") as SVGCircleElement;
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
		this._drawClockScale();
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
			if (this._views.includes("hours") && this._timeFormat === "12") {
				this._inputFieldEl.appendChild(this._periodInputEl);
			} else {
				this._periodInputEl.remove();
			}

			// update clock view based on enabled views

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

	}

	private _drawClockScale(): void {
		// <line class="clock-scale" x1="125" y1="6" x2="125" y2="16" />
		// <line class="clock-scale" x1="125" y1="234" x2="125" y2="244" />

		// draw clock scale
		const existingScales = this.shadowRoot!.querySelectorAll(".clock-scale");
		existingScales.forEach((scale) => scale.remove());


		for (let i = 0; i < 48; i++) {
			const angle = (i / 48) * 2 * Math.PI - Math.PI / 2;
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

	private _drawHourHand(hour: number): void {
		const handLength = 80;
		// this._hourHandEl.setAttribute("x2", (125 + handLength * Math.cos((hour / 12) * 2 * Math.PI - Math.PI / 2)).toString());
		// this._hourHandEl.setAttribute("y2", (125 + handLength * Math.sin((hour / 12) * 2 * Math.PI - Math.PI / 2)).toString());
		this._hourHandCenterEl.setAttribute("cx", (125 + handLength * Math.cos((hour / 12) * 2 * Math.PI - Math.PI / 2)).toString());
		this._hourHandCenterEl.setAttribute("cy", (125 + handLength * Math.sin((hour / 12) * 2 * Math.PI - Math.PI / 2)).toString());
	}

	private _drawMinuteHand(minute: number): void {
		const handLength = 100;
		this._minuteHandEl.setAttribute("x2", (125 + handLength * Math.cos((minute / 60) * 2 * Math.PI - Math.PI / 2)).toString());
		this._minuteHandEl.setAttribute("y2", (125 + handLength * Math.sin((minute / 60) * 2 * Math.PI - Math.PI / 2)).toString());
		this._minuteHandCenterEl.setAttribute("cx", (125 + handLength * Math.cos((minute / 60) * 2 * Math.PI - Math.PI / 2)).toString());
		this._minuteHandCenterEl.setAttribute("cy", (125 + handLength * Math.sin((minute / 60) * 2 * Math.PI - Math.PI / 2)).toString());
	}

	private _drawSecondHand(second: number): void {
		const handLength = 110;
		this._secondHandEl.setAttribute("x2", (125 + handLength * Math.cos((second / 60) * 2 * Math.PI - Math.PI / 2)).toString());
		this._secondHandEl.setAttribute("y2", (125 + handLength * Math.sin((second / 60) * 2 * Math.PI - Math.PI / 2)).toString());
		this._secondHandCenterEl.setAttribute("cx", (125 + handLength * Math.cos((second / 60) * 2 * Math.PI - Math.PI / 2)).toString());
		this._secondHandCenterEl.setAttribute("cy", (125 + handLength * Math.sin((second / 60) * 2 * Math.PI - Math.PI / 2)).toString());
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onMouseDown(event: Event): void {

		this._dragged = true;
		if (this._selectedView === "hours") {
			this._clockEl.classList.add("active-hour");
		} else if (this._selectedView === "minutes") {
			this._clockEl.classList.add("active-minute");
		} else if (this._selectedView === "seconds") {
			this._clockEl.classList.add("active-second");
		}
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
			this._mousePosition.x = (event as MouseEvent).clientX - rects[0].x - clockWidth / 2;
			this._mousePosition.y = ((event as MouseEvent).clientY - rects[0].y - clockHeight / 2) * -1;

			let angle = Math.atan2(this._mousePosition.y, this._mousePosition.x) * (180 / Math.PI);
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
			const step = 1;
			minute = Math.round(minute / step) * step;
			if (minute === 60) {
				minute = 0;
			}

			let second = Math.round(angle / 6);
			second = Math.round(second / step) * step;
			if (second === 60) {
				second = 0;
			}

			this._drawHourHand(hour);

			// this._drawMinuteHand(minute);
			// this._drawSecondHand(second);


			this._clockValueEl.innerHTML = hour.toFixed(0);
			// this._clockValueEl.innerHTML = minute.toFixed(0);
			// this._clockValueEl.innerHTML = second.toFixed(0);
		}
	}

	private _onMouseUp(event: Event): void {
		this._dragged = false;
		this._clockEl.classList.remove("active-hour", "active-minute", "active-second");
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