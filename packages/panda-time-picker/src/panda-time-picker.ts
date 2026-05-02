// types
import { PandaTimePickerI18nConfig, PandaTimePickerView, PandaTimePickerTimeFormat } from "../index";
import { TimeValue } from "./types";
import { PandaTimeInput } from "./panda-time-input";
import { PandaSpinner } from "@panda-wbc/panda-spinner";

// styles
import { styles } from "./styles/time-picker-styles";

// components
import "./panda-time-input";
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";

// utils
import { applyStyles, parseBooleanAttribute } from "@panda-wbc/panda-utils/lib/component-utils";
import { getI18nConfig, parseTimeValue } from "./utils/utils";

// constants
const DEFAULT_TIME_PICKER_VIEW = ["hours", "minutes"] as PandaTimePickerView[];
const DEFAULT_TIME_FORMAT: PandaTimePickerTimeFormat = "12";

export class PandaTimePicker extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";
	
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// observed attributes ============================================================================================
	static get observedAttributes() {
		return [
			"theme",
			"value",
			"format",
			"time-format",
			"disabled",
			"readonly",
			"mandatory",
			"working",
			"spinner-type",
			"show-clear-button",
		];
	}

	/**
	 * theme
	 * ---
	 * The theme of the component. It can be used to apply different styles to the component. 
	 * The value of the theme attribute will be used as a class name on the component. 
	 * For example, if the theme attribute is set to "dark", the component will have a class name of "dark". 
	 * This allows you to apply different styles to the component based on the theme.
	 * @type {string}
	 * @default ""
	 * @attr theme
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker theme="mandatory"></panda-time-picker>
	 * ```
	 */
	get theme() {
		return this._theme;
	}

	set theme(value: string) {
		if (this._theme !== value) {
			this._theme = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("theme", value);
			} else {
				this.removeAttribute("theme");
			}
		}
	}

	private _theme!: string;
	
	/**
	 * value
	 * ---
	 * Currently selected time value.
	 * @type {string}
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

	set value(value: unknown) {
		if (this._value !== value) {
			this._value = parseTimeValue(value);
		}
	}

	private _value!: TimeValue | null;

	/**
	 * format
	 * ---
	 * The format in which the time value should be returned.
	 * @type {string}
	 * @default ""
	 * @attr format
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker format="HH:MM"></panda-time-picker>
	 * ```
	 */
	get format() {
		return this._format;
	}

	set format(value: string) {
		if (this._format !== value) {
			this._format = value;
			// reflect to attribute
			if (this._format) {
				this.setAttribute("format", this._format + "");
			} else {
				this.removeAttribute("format");
			}
		}
	}

	private _format!: string;

	/**
	 * view
	 * ---
	 * The view of the time picker. It determines which time units are displayed and can be selected by the user.
	 * @type {PandaTimePickerView[]}
	 * @default ["hours", "minutes"]
	 * @attr view
	 * @public
	 */
	get views() {
		return this._views;
	}

	set views(value: PandaTimePickerView[]) {
		if (this._views !== value) {
			if (Array.isArray(value)) {
				this._views = value;
			} else {
				this._views = [...DEFAULT_TIME_PICKER_VIEW];
			}
		}
	}

	private _views!: PandaTimePickerView[];

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
	 * disabled
	 * ---
	 * If true, the component will be in a disabled state and user will not be able to interact with it.
	 * In disabled state, the component will display the selected time value but will not allow any changes to it. 
	 * This prop is useful when you want to display a time value without allowing the user to modify it additionally
	 * in disabled state component will not be able to retain or receive focus.
	 * @type {boolean}
	 * @default false
	 * @attr disabled
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker disabled></panda-time-picker>
	 * ```
	 */
	get disabled() {
		return this._disabled;
	}

	set disabled(value: boolean) {
		if (this._disabled !== value) {
			this._disabled = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("disabled", "");
			} else {
				this.removeAttribute("disabled");
			}
		}
	}

	private _disabled!: boolean;

	/**
	 * mandatory
	 * ---
	 * If true, the component will show a mandatory flag and will be considered as a required field in forms.
	 * Mandatory state will be visually indicated and will be removed once value is set. 
	 * This prop is useful when the component is used within forms and you want to indicate that the field is required.
	 * @type {boolean}
	 * @default false
	 * @attr mandatory
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker mandatory></panda-time-picker>
	 * ```
	 */
	get mandatory() {
		return this._mandatory;
	}

	set mandatory(value: boolean) {
		if (this._mandatory !== value) {
			this._mandatory = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("mandatory", "");
			} else {
				this.removeAttribute("mandatory");
			}
		}
	}

	private _mandatory!: boolean;

	/**
	 * readonly
	 * ---
	 * If true, the component will be in a read-only state and user will not be able to interact with it.
	 * In read-only state, the component will display the selected time value but will not allow any changes to it. 
	 * This prop is useful when you want to display a time value without allowing the user to modify it.
	 * Component in read-only state can receive and retain focus, but will not allow any changes to the value.
	 * This is different from disabled state where component cannot receive or retain focus.
	 * @type {boolean}
	 * @default false
	 * @attr readonly
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker readonly></panda-time-picker>
	 * ```
	 */
	get readonly() {
		return this._readonly;
	}

	set readonly(value: boolean) {
		if (this._readonly !== value) {
			this._readonly = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("readonly", "");
			} else {
				this.removeAttribute("readonly");
			}
		}
	}

	private _readonly!: boolean;
	
	/**
	 * working
	 * ---
	 * If true, the component will be in a working state and will show a spinner to indicate that some background process is ongoing.
	 * In working state, the component will display a spinner and will not allow any user interaction. 
	 * This prop is useful when you want to indicate that some background process is ongoing and user needs to wait until it is completed.
	 * @type {boolean}
	 * @default false
	 * @attr working
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker working></panda-time-picker>
	 * ```
	 */
	get working() {
		return this._working;
	}

	set working(value: boolean) {
		if (this._working !== value) {
			this._working = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("working", "");
			} else {
				this.removeAttribute("working");
			}
		}
	}

	private _working!: boolean;

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
			// update overlay if exists
			if (this._overlayEl) {
				this._overlayEl.i18n = this._i18n;
			}
		}
	}

	private _i18n!: PandaTimePickerI18nConfig;

	/**
	 * spinnerType
	 * ---
	 * The type of spinner to be shown in the working state.
	 * @type {string}
	 * @default "dots"
	 * @attr spinner-type
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker spinner-type="dots"></panda-time-picker>
	 * <panda-time-picker spinner-type="google"></panda-time-picker>
	 * ```
	 */
	get spinnerType() {
		return this._spinnerType;
	}

	set spinnerType(value: string) {
		if (this._spinnerType !== value) {
			this._spinnerType = value;
			// reflect to attribute
			if (value == null || value === "") {
				this._spinnerType = "dots";
				this.removeAttribute("spinner-type");
			} else {
				this.setAttribute("spinner-type", this._spinnerType + "");
			}
		}
	}
	
	private _spinnerType!: string;

	/**
	 * showClearButton
	 * ---
	 * If true, the clear button will be displayed in the time picker component when a value is selected.
	 * @type {boolean}
	 * @default false
	 * @attr show-clear-button
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker show-clear-button></panda-time-picker>
	 * ```
	 */
	get showClearButton() {
		return this._showClearButton;
	}

	set showClearButton(value: boolean) {
		if (this._showClearButton !== value) {
			this._showClearButton = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._showClearButton) {
				this.setAttribute("show-clear-button", "");
			} else {
				this.removeAttribute("show-clear-button");
			}
		}
	}

	private _showClearButton!: boolean;

	// private properties =============================================================================================
	private _focused!: boolean;
	private _showMandatoryFlag!: boolean;
	private _ignoreFocusEvent!: boolean;
	private _withPrefix!: boolean;
	private _withSuffix!: boolean;

	// elements
	private readonly _timePickerEl!: HTMLDivElement;
	private readonly _inputFieldEl!: HTMLDivElement;
	private readonly _hourInputEl!: PandaTimeInput;
	private readonly _minuteInputEl!: PandaTimeInput;
	private readonly _secondInputEl!: PandaTimeInput;
	private readonly _periodInputEl!: PandaTimeInput;
	private readonly _separator1El!: HTMLSpanElement;
	private readonly _overlayEl!: any; // PandaTimePickerOverlay; <---------- swap later for actual type when overlay is implemented
	private readonly _spinnerContEl!: HTMLDivElement;
	private readonly _spinnerEl!: PandaSpinner;
	private readonly _clearButtonEl!: HTMLDivElement;
	private readonly _clearButtonIconEl!: HTMLDivElement;
	private readonly _pickerButtonIconEl!: HTMLDivElement;
	private readonly _prefixSlotEl!: HTMLSlotElement;
	private readonly _suffixSlotEl!: HTMLSlotElement;

	// events
	private readonly _timePickerFocusEvent!: EventListener;
	private readonly _timePickerBlurEvent!: EventListener;
	private readonly _inputChangeEvent!: EventListener;
	private readonly _inputFocusNextEvent!: EventListener;
	private readonly _inputFocusPrevEvent!: EventListener;
	private readonly _clearButtonClickEvent!: EventListener;
	private readonly _pickerButtonClickEvent!: EventListener;
	private readonly _prefixSlotChangeEvent!: EventListener;
	private readonly _suffixSlotChangeEvent!: EventListener;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// apply component template
		this.shadowRoot!.innerHTML = /*html*/`
			<div class="time-picker" part="time-picker">
				<slot name="prefix" part="prefix"></slot>
				<div class="input-field" part="input-field"></div>
				<slot name="suffix" part="suffix"></slot>
				<div class="picker-button" part="picker-button">
					<div class="picker-icon" part="picker-icon" tabindex="0">
						<panda-icon icon="clock"></panda-icon>
					</div>
				</div>
			</div>
		`;
		// apply component styles
		applyStyles(styles, this.shadowRoot);

		// create hour input element
		this._hourInputEl = document.createElement("panda-time-input");
		this._hourInputEl.placeholder = "HH";
		this._hourInputEl.className = "time-input";
		this._hourInputEl.part = "time-input-hour";
		this._hourInputEl.inputMode = "numeric";
		this._hourInputEl.max = 23;

		// create minute input element
		this._minuteInputEl = document.createElement("panda-time-input");
		this._minuteInputEl.placeholder = "MM";
		this._minuteInputEl.className = "time-input";
		this._minuteInputEl.part = "time-input-minute";
		this._minuteInputEl.inputMode = "numeric";
		this._minuteInputEl.max = 59;

		// create second input element
		this._secondInputEl = document.createElement("panda-time-input");
		this._secondInputEl.placeholder = "SS";
		this._secondInputEl.className = "time-input";
		this._secondInputEl.part = "time-input-second";
		this._secondInputEl.inputMode = "numeric";
		this._secondInputEl.max = 59;

		// create period input element
		this._periodInputEl = document.createElement("panda-time-input");
		this._periodInputEl.placeholder = "AA";
		this._periodInputEl.className = "time-input period-input";
		this._periodInputEl.part = "time-input-period";
		this._periodInputEl.inputMode = "text";

		// create separator element
		this._separator1El = document.createElement("span");
		this._separator1El.textContent = ":";

		// create clear button element
		this._clearButtonEl = document.createElement("div");
		this._clearButtonEl.className = "clear-button";
		this._clearButtonEl.part = "clear-button";
		this._clearButtonEl.innerHTML = /*html*/`
			<div class="clear-icon" part="clear-icon">
				<panda-icon icon="close"></panda-icon>
			</div>
		`;
		this._clearButtonIconEl = this._clearButtonEl.querySelector(".clear-icon") as HTMLDivElement;

		// create spinner element
		this._spinnerContEl = document.createElement("div");
		this._spinnerContEl.className = "spinner-cont";
		this._spinnerContEl.part = "spinner-cont";
		this._spinnerContEl.innerHTML = /*html*/`<panda-spinner part="spinner"></panda-spinner>`;
		// get spinner element handle
		this._spinnerEl = this._spinnerContEl.querySelector("panda-spinner") as PandaSpinner;
		this._spinnerEl.spinner = this._spinnerType ?? "dots";

		// initialize class properties
		this._value = null;
		this._i18n = getI18nConfig();
		this._spinnerType = "dots";
		this._focused = false;
		this._disabled = false;
		this._readonly = false;
		this._mandatory = false;
		this._working = false;
		this._showClearButton = false;
		this._withPrefix = false;
		this._withSuffix = false;
		this._views = [...DEFAULT_TIME_PICKER_VIEW];
		this._timeFormat = DEFAULT_TIME_FORMAT;

		// initialize event binders
		this._timePickerFocusEvent = this._onTimePickerFocus.bind(this);
		this._timePickerBlurEvent = this._onTimePickerBlur.bind(this);
		this._inputChangeEvent = this._onInputChange.bind(this);
		this._inputFocusNextEvent = this._onInputFocusNext.bind(this);
		this._inputFocusPrevEvent = this._onInputFocusPrev.bind(this);
		this._clearButtonClickEvent = this._onClearButtonClick.bind(this);
		this._pickerButtonClickEvent = this._onPickerButtonClick.bind(this);
		this._prefixSlotChangeEvent = this._onPrefixSlotChanged.bind(this);
		this._suffixSlotChangeEvent = this._onSuffixSlotChanged.bind(this);

		// get template element handles
		if (this.shadowRoot) {
			this._timePickerEl = this.shadowRoot.querySelector(".time-picker") as HTMLDivElement;
			this._inputFieldEl = this.shadowRoot.querySelector(".input-field") as HTMLDivElement;
			this._pickerButtonIconEl = this.shadowRoot.querySelector(".picker-icon") as HTMLDivElement;
			this._prefixSlotEl = this.shadowRoot.querySelector(`slot[name="prefix"]`) as HTMLSlotElement;
			this._suffixSlotEl = this.shadowRoot.querySelector(`slot[name="suffix"]`) as HTMLSlotElement;
		}
	}

	connectedCallback() {
		// add event listeners
		this._timePickerEl.addEventListener("focus", this._timePickerFocusEvent);
		this._timePickerEl.addEventListener("blur", this._timePickerBlurEvent);
		this._inputFieldEl.addEventListener("change", this._inputChangeEvent);
		this._inputFieldEl.addEventListener("on-focus-next", this._inputFocusNextEvent);
		this._inputFieldEl.addEventListener("on-focus-prev", this._inputFocusPrevEvent);
		this._pickerButtonIconEl.addEventListener("click", this._pickerButtonClickEvent);
		this._clearButtonIconEl.addEventListener("click", this._clearButtonClickEvent);
		this._prefixSlotEl.addEventListener("slotchange", this._prefixSlotChangeEvent);
		this._suffixSlotEl.addEventListener("slotchange", this._suffixSlotChangeEvent);


		// this._timePickerEl.addEventListener("focusin", () => {
		// 	console.log(`%c ⚡ [panda time picker](focusin)`, "font-size: 24px; color: green; background: black;");
		// 	this.setAttribute("focused", "");
		// });
		
		// this._timePickerEl.addEventListener("focusout", () => {
		// 	console.log(`%c ⚡ [panda time picker](focusout)`, "font-size: 24px; color: crimson; background: black;");
		// 	this.removeAttribute("focused");
		// });

		// evaluate mandatory flag
		this._evaluateMandatoryFlag();
		// initial component update
		this._updateComponent();
	}

	disconnectedCallback() {
		// remove event listeners
		this._timePickerEl.removeEventListener("focus", this._timePickerFocusEvent);
		this._timePickerEl.removeEventListener("blur", this._timePickerBlurEvent);
		this._inputFieldEl.removeEventListener("change", this._inputChangeEvent);
		this._inputFieldEl.removeEventListener("on-focus-next", this._inputFocusNextEvent);
		this._inputFieldEl.removeEventListener("on-focus-prev", this._inputFocusPrevEvent);
		this._pickerButtonIconEl.removeEventListener("click", this._pickerButtonClickEvent);
		this._clearButtonIconEl.removeEventListener("click", this._clearButtonClickEvent);
		this._prefixSlotEl.removeEventListener("slotchange", this._prefixSlotChangeEvent);
		this._suffixSlotEl.removeEventListener("slotchange", this._suffixSlotChangeEvent);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// check if value changed
		if (_oldValue == _newValue) {
			return;
		}

		switch (_name) {
			case "value":
				this.value = _newValue;
				break;

			case "format":
				this.format = _newValue;
				break;

			case "time-format":
				this.timeFormat = _newValue;
				break;

			case "theme":
				this.theme = _newValue;
				break;

			case "disabled":
				this.disabled = parseBooleanAttribute(_newValue);
				break;

			case "readonly":
				this.readonly = parseBooleanAttribute(_newValue);
				break;

			case "mandatory":
				this.mandatory = parseBooleanAttribute(_newValue);
				break;

			case "working":
				this.working = parseBooleanAttribute(_newValue);
				break;

			case "show-clear-button":
				this._showClearButton = parseBooleanAttribute(_newValue);
				break;

			case "spinner-type":
				this.spinnerType = _newValue;
				break;
		}
		// update component
		this._updateComponent();
	}

	private _updateComponent(): void {
		if (this.isConnected) {
			// update spinner
			if (this._working) {
				// add spinner to input wrap
				this._timePickerEl.appendChild(this._spinnerContEl);
			} else {
				// remove spinner from input wrap
				this._spinnerContEl.remove();
			}

			// update clear button
			if (this._showClearButton && this._value && !this._disabled && !this._readonly) {
				// add clear button to input wrap
				this._timePickerEl.insertBefore(this._clearButtonEl, this._inputFieldEl.nextSibling);
			} else {
				// remove clear button from input wrap
				this._clearButtonEl.remove();
			}

			// update the view
			this._updateViews();

			// update template css classes and parts
			this._updateTemplateCss();
		}
	}

	private _updateViews(): void {
		if (this.isConnected) {
			let focusIndex = 0;
			// check if hours view is enabled
			if (this._views.includes("hours")) {
				this._inputFieldEl.appendChild(this._hourInputEl);
				this._hourInputEl.dataset.focusIndex = focusIndex.toString();
				this._hourInputEl.placeholder = this._i18n.hourPlaceholder;
				this._hourInputEl.tabIndex = 0;
				focusIndex++;
			} else {
				this._hourInputEl.remove();
			}

			if (this._views.length > 1) {
				this._inputFieldEl.appendChild(this._separator1El);
			} else {
				this._separator1El.remove();
			}
			
			// check if minutes view is enabled
			if (this._views.includes("minutes")) {
				this._inputFieldEl.appendChild(this._minuteInputEl);
				this._minuteInputEl.dataset.focusIndex = focusIndex.toString();
				this._minuteInputEl.placeholder = this._i18n.minutePlaceholder;
				focusIndex++;
			} else {
				this._minuteInputEl.remove();
			}

			// check if seconds view is enabled
			if (this._views.includes("seconds")) {
				this._inputFieldEl.appendChild(this._secondInputEl);
				this._secondInputEl.dataset.focusIndex = focusIndex.toString();
				this._secondInputEl.placeholder = this._i18n.secondPlaceholder;
				focusIndex++;
			} else {
				this._secondInputEl.remove();
			}

			if (this._views.includes("hours") && this._timeFormat !== "24") {
				this._inputFieldEl.appendChild(this._periodInputEl);
				this._periodInputEl.dataset.focusIndex = focusIndex.toString();
				this._periodInputEl.placeholder = this._i18n.periodPlaceholder;
			}
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _showOverlay(): void {
		if (this._overlayEl == null && !this.disabled && !this.readonly && !this.working) {

		}
	}

	/**
	 * Set focus to time input element based on the provided index.
	 * @param {number} index focus index of the element
	 */
	private _setFocus(index: number): void {
		const inputEl = this._inputFieldEl.querySelector(`panda-time-input[data-focus-index="${index}"]`) as PandaTimeInput;
		if (inputEl) {
			inputEl.focus();
		}
	}
	
	/** Update mandatory flag */
	private _evaluateMandatoryFlag(): void {
		if (this._value == null) {
			this._showMandatoryFlag = this._mandatory;
		} else {
			this._showMandatoryFlag = false;
		}
	}

	/** Update css classes and parts on the component template */
	private _updateTemplateCss(): void {
		const css: string[] = [];

		if (this._working) {
			css.push("working");
		}
		if (this._readonly) {
			css.push("readonly");
		}
		if (this._disabled) {
			css.push("disabled");
		}
		if (this._showMandatoryFlag) {
			css.push("mandatory");
		}
		if (this._withPrefix) {
			css.push("with-prefix");
		}
		if (this._withSuffix) {
			css.push("with-suffix");
		}

		// update class names and parts
		const cssString = css.join(" ");
		this._timePickerEl.className = `time-picker ${cssString}`;
		this._timePickerEl.part = this._timePickerEl.className;

	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onTimePickerFocus(): void {
		console.log(`%c ⚡ [panda time picker](focus)`, "font-size: 24px; color: green; background: black;", this._focused);
		// if (this._ignoreFocusEvent) {
		// 	this._ignoreFocusEvent = false;
		// 	return;
		// }
		// set focus to first time input element
		// this._setFocus(0);
	}

	private _onTimePickerBlur(): void {
		// console.log(`%c ⚡ [panda time picker](blur)`, "font-size: 24px; color: crimson; background: black;", this._focused);
	}

	private _onPrefixSlotChanged(): void {
		this._withPrefix = true;
		this._updateComponent();
	}

	private _onSuffixSlotChanged(): void {
		this._withSuffix = true;
		this._updateComponent();
	}

	private _onInputChange = (event: Event): void => {
		const timeInputEl = (event.target as HTMLElement).closest("panda-time-input") as PandaTimeInput;
		console.log(
			`%c ⚡ [PANDA TIME PICKER] (_onInputChange)`,
			"font-size: 24px; color: crimson; background: black;",
			timeInputEl, timeInputEl.value
		);
	}

	private _onInputFocusNext = (event: Event): void => {
		const inputEl = (event.target as HTMLElement).closest("panda-time-input") as PandaTimeInput;
		const focusIndex = parseInt(inputEl.dataset.focusIndex ?? "0");
		// set focus to next input element
		this._setFocus(focusIndex + 1);
	}

	private _onInputFocusPrev = (event: Event): void => {
		const inputEl = (event.target as HTMLElement).closest("panda-time-input") as PandaTimeInput;
		const focusIndex = parseInt(inputEl.dataset.focusIndex ?? "0");

		if (focusIndex > 0) {
			// set focus to previous input element
			this._setFocus(focusIndex - 1);
		} else {
			this._ignoreFocusEvent = true;
		}
	}

	private _onClearButtonClick = (): void => {
		console.log(`%c ⚡ [PANDA TIME PICKER] (_onClearButtonClick)`, "font-size: 24px; color: crimson; background: black;");
		this._value = null;
	}
	
	private _onPickerButtonClick = (event: Event): void => {
		console.log(`%c ⚡ [PANDA TIME PICKER] (_onPickerButtonClick)`, "font-size: 24px; color: crimson; background: black;");
		this._showOverlay();
		if (!this._focused) {
			this.focus();
		}
	}
}

// Register the custom element
if (!customElements.get("panda-time-picker")) {
	customElements.define("panda-time-picker", PandaTimePicker);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-time-picker": PandaTimePicker;
	}
}
