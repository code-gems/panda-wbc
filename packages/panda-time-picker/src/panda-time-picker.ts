// types
import { PandaTimePickerI18nConfig, PandaTimePickerView, PandaTimePickerTimeFormat } from "../index";
import { OnPasteEventDetail, RawValue, TimeObject } from "./types";
import { PandaIcon } from "@panda-wbc/panda-icon";
import { PandaSpinner } from "@panda-wbc/panda-spinner";
import { PandaTimePickerOverlay } from "./panda-time-picker-overlay";
import { PandaTimePickerInput } from "./panda-time-picker-input";

// styles
import { styles, pickerButtonStylers, clearButtonStylers } from "./styles/time-picker-styles";

// components
import "./panda-time-picker-overlay";
import "./panda-time-picker-input";
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";

// utils
import { applyStyles, parseBooleanAttribute } from "@panda-wbc/panda-utils/lib/component-utils";
import { isEmpty } from "@panda-wbc/panda-utils/src/panda-utils";
import {
	arraysEqual,
	formatValue,
	getEmptyTimeObject,
	getI18nConfig,
	isValueObjectComplete,
	parseTimeValue,
	validateTimeObject,
} from "./utils/utils";

// constants
import { DEFAULT_TIME_FORMAT, DEFAULT_TIME_PICKER_VIEW } from "./constants";

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
			"label",
			"help-text",
			"error-message",
			"value",
			"views",
			"format",
			"time-format",
			"disabled",
			"readonly",
			"mandatory",
			"working",
			"spinner-type",
			"show-clear-button",
			"picker-icon",
			"hide-picker-button",
			"minute-step",
			"second-step",
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
			this._parseValue(rawValue);
		}
	}

	private _value!: RawValue;

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
		// if the new value is different from the current value, update the views
		if (Array.isArray(value) && !arraysEqual(this._views, value)) {

			console.log(`%c [PANDA TIME PICKER] set views:`,
				"font-size: 16px; color: cyan; background: black;",
				value
			);

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
	 * timeFormat
	 * ---
	 * The format in which the time value should be displayed.
	 * @type {PandaTimePickerTimeFormat}
	 * @default "24hr"
	 * @attr time-format
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker time-format="12hr"></panda-time-picker>
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
	 * label
	 * ---
	 * Label to display above the time picker component.
	 * @type {string}
	 * @default ""
	 * @attr label
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker label="Select Time"></panda-time-picker>
	 * ```
	 */
	get label() {
		return this._label;
	}

	set label(value: string) {
		if (this._label !== value) {
			this._label = value ?? "";
			// reflect to attribute
			if (isEmpty(value)) {
				this.removeAttribute("label");
			} else {
				this.setAttribute("label", value + "");
			}
		}
	}

	private _label!: string;

	/**
	 * helpText
	 * ---
	 * Help text to display below the component.
	 * @type {string}
	 * @default ""
	 * @attr help-text
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker help-text="Select a time"></panda-time-picker>
	 * ```
	 */
	get helpText() {
		return this._helpText;
	}

	set helpText(value: string) {
		if (this._helpText !== value) {
			this._helpText = value ?? "";
			// reflect to attribute
			if (isEmpty(value)) {
				this.removeAttribute("help-text");
			} else {
				this.setAttribute("help-text", value + "");
			}
		}
	}

	private _helpText!: string;

	/**
	 * errorMessage
	 * ---
	 * Error message to display below the component.
	 * @type {string}
	 * @default ""
	 * @attr error-message
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker error-message="Invalid time"></panda-time-picker>
	 * ```
	 */
	get errorMessage() {
		return this._errorMessage;
	}

	set errorMessage(value: string) {
		if (this._errorMessage !== value) {
			this._errorMessage = value ?? "";
			// reflect to attribute
			if (isEmpty(value)) {
				this.removeAttribute("error-message");
			} else {
				this.setAttribute("error-message", value + "");
			}
		}
	}

	private _errorMessage!: string;

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

	/**
	 * pickerIcon
	 * ---
	 * The icon to be displayed in the picker button of the time picker component.
	 * @type {string}
	 * @default "clock"
	 * @attr picker-icon
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker picker-icon="clock"></panda-time-picker>
	 * ```
	 */
	get pickerIcon() {
		return this._pickerIcon;
	}

	set pickerIcon(value: string) {
		if (this._pickerIcon !== value) {
			this._pickerIcon = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("picker-icon", value + "");
			} else {
				this.removeAttribute("picker-icon");
			}
		}
	}

	private _pickerIcon!: string;

	/**
	 * hidePickerButton
	 * ---
	 * If true, the picker button will be hidden in the time picker component.
	 * @type {boolean}
	 * @default false
	 * @attr hide-picker-button
	 * @public
	 * @example
	 * ```html
	 * <panda-time-picker hide-picker-button></panda-time-picker>
	 * ```
	 */
	get hidePickerButton() {
		return this._hidePickerButton;
	}

	set hidePickerButton(value: boolean) {
		if (this._hidePickerButton !== value) {
			this._hidePickerButton = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._hidePickerButton) {
				this.setAttribute("hide-picker-button", "");
			} else {
				this.removeAttribute("hide-picker-button");
			}
		}
	}

	private _hidePickerButton!: boolean;

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

	// private properties =============================================================================================
	private _invalid!: boolean;
	private _valueObject!: TimeObject;
	private _showMandatoryFlag!: boolean;
	private _withPrefix!: boolean;
	private _withSuffix!: boolean;

	// elements =======================================================================================================
	private readonly _timePickerEl!: HTMLDivElement;
	private readonly _inputFieldEl!: HTMLDivElement;
	private readonly _hourInputEl!: PandaTimePickerInput;
	private readonly _minuteInputEl!: PandaTimePickerInput;
	private readonly _secondInputEl!: PandaTimePickerInput;
	private readonly _periodInputEl!: PandaTimePickerInput;
	private readonly _separator1El!: HTMLSpanElement;
	private readonly _separator2El!: HTMLSpanElement;
	// spinner elements =======================================================
	private readonly _spinnerContEl!: HTMLDivElement;
	private readonly _spinnerEl!: PandaSpinner;
	// overlay element
	private _overlayEl!: PandaTimePickerOverlay;
	// label /help text / error message element ===============================
	private readonly _labelEl!: HTMLDivElement;
	private readonly _helpTextEl!: HTMLDivElement;
	private readonly _errorMessageEl!: HTMLDivElement;
	// clear button elements ==================================================
	private readonly _clearButtonContEl!: HTMLDivElement;
	private readonly _clearButtonEl!: HTMLDivElement;
	// picker button elements =================================================
	private readonly _pickerButtonContEl!: HTMLDivElement;
	private readonly _pickerButtonEl!: HTMLDivElement;
	private readonly _pickerButtonIconEl!: PandaIcon;
	// prefix/suffix slot elements ============================================
	private readonly _prefixSlotEl!: HTMLSlotElement;
	private readonly _suffixSlotEl!: HTMLSlotElement;

	// events =========================================================================================================
	private readonly _timePickerClickEvent!: EventListener;
	private readonly _timeInputEvent!: EventListener;
	private readonly _inputFocusNextEvent!: EventListener;
	private readonly _inputFocusPrevEvent!: EventListener;
	private readonly _inputPasteEvent!: EventListener;
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
			</div>
		`;
		// apply component styles
		applyStyles([styles, pickerButtonStylers, clearButtonStylers], this.shadowRoot);

		// create label element
		this._labelEl = document.createElement("div");
		this._labelEl.className = "label";
		this._labelEl.part = "label";

		// create help text element
		this._helpTextEl = document.createElement("div");
		this._helpTextEl.className = "help-text";
		this._helpTextEl.part = "help-text";

		// create error message element
		this._errorMessageEl = document.createElement("div");
		this._errorMessageEl.className = "error-message";
		this._errorMessageEl.part = "error-message";

		// create hour input element
		this._hourInputEl = document.createElement("panda-time-input");
		this._hourInputEl.placeholder = "HH";
		this._hourInputEl.className = "time-input";
		this._hourInputEl.part = "time-input-hour";
		this._hourInputEl.dataset.timePart = "hours";
		this._hourInputEl.inputMode = "numeric";
		this._hourInputEl.max = 23;

		// create minute input element
		this._minuteInputEl = document.createElement("panda-time-input");
		this._minuteInputEl.placeholder = "MM";
		this._minuteInputEl.className = "time-input";
		this._minuteInputEl.part = "time-input-minute";
		this._minuteInputEl.dataset.timePart = "minutes";
		this._minuteInputEl.inputMode = "numeric";
		this._minuteInputEl.max = 59;

		// create second input element
		this._secondInputEl = document.createElement("panda-time-input");
		this._secondInputEl.placeholder = "SS";
		this._secondInputEl.className = "time-input";
		this._secondInputEl.part = "time-input-second";
		this._secondInputEl.dataset.timePart = "seconds";
		this._secondInputEl.inputMode = "numeric";
		this._secondInputEl.max = 59;

		// create period input element
		this._periodInputEl = document.createElement("panda-time-input");
		this._periodInputEl.placeholder = "AA";
		this._periodInputEl.className = "time-input period-input";
		this._periodInputEl.part = "time-input-period";
		this._periodInputEl.dataset.timePart = "period";
		this._periodInputEl.inputMode = "text";

		// create separator element
		this._separator1El = document.createElement("span");
		this._separator1El.textContent = ":";
		this._separator2El = document.createElement("span");
		this._separator2El.textContent = ":";

		// create picker button element
		this._pickerButtonContEl = document.createElement("div");
		this._pickerButtonContEl.className = "picker-button-cont";
		this._pickerButtonContEl.part = "picker-button-cont";
		this._pickerButtonContEl.innerHTML = /*html*/`
			<div class="picker-button" part="picker-button">
				<panda-icon icon="clock" class="picker-icon" part="picker-icon"></panda-icon>
			</div>
		`;
		this._pickerButtonEl = this._pickerButtonContEl.querySelector(".picker-button") as HTMLDivElement;
		this._pickerButtonEl.tabIndex = 0; // make picker button focusable
		this._pickerButtonIconEl = this._pickerButtonContEl.querySelector(".picker-icon") as HTMLDivElement;

		// create clear button element
		this._clearButtonContEl = document.createElement("div");
		this._clearButtonContEl.className = "clear-button-cont";
		this._clearButtonContEl.part = "clear-button-cont";
		this._clearButtonContEl.innerHTML = /*html*/`
			<div class="clear-button" part="clear-button">
				<panda-icon icon="close" class="clear-icon" part="clear-icon"></panda-icon>
			</div>
		`;
		this._clearButtonEl = this._clearButtonContEl.querySelector(".clear-button") as HTMLDivElement;
		this._clearButtonEl.tabIndex = 0; // make clear button focusable

		// create spinner element
		this._spinnerContEl = document.createElement("div");
		this._spinnerContEl.className = "spinner-cont";
		this._spinnerContEl.part = "spinner-cont";
		this._spinnerContEl.innerHTML = /*html*/`<panda-spinner part="spinner"></panda-spinner>`;
		// get spinner element handle
		this._spinnerEl = this._spinnerContEl.querySelector("panda-spinner") as PandaSpinner;
		this._spinnerEl.spinner = this._spinnerType ?? "dots";

		// initialize class properties
		this._value = undefined;
		this._valueObject = {
			hours: null,
			minutes: null,
			seconds: null,
			period: null,
		};
		this._theme = "";
		this._i18n = getI18nConfig();
		this._spinnerType = "dots";
		this._disabled = false;
		this._readonly = false;
		this._mandatory = false;
		this._working = false;
		this._withPrefix = false;
		this._withSuffix = false;
		this._showClearButton = false;
		this._hidePickerButton = false;
		this._invalid = false;
		this._views = [...DEFAULT_TIME_PICKER_VIEW];
		this._timeFormat = DEFAULT_TIME_FORMAT;

		// initialize event binders
		this._timePickerClickEvent = this._onTimePickerClick.bind(this);
		this._timeInputEvent = this._onTimeInput.bind(this);
		this._inputFocusNextEvent = this._onInputFocusNext.bind(this);
		this._inputFocusPrevEvent = this._onInputFocusPrev.bind(this);
		this._inputPasteEvent = this._onInputPaste.bind(this) as EventListener;
		this._clearButtonClickEvent = this._onClearButtonClick.bind(this);
		this._pickerButtonClickEvent = this._onPickerButtonClick.bind(this);
		this._prefixSlotChangeEvent = this._onPrefixSlotChanged.bind(this);
		this._suffixSlotChangeEvent = this._onSuffixSlotChanged.bind(this);

		// get template element handles
		if (this.shadowRoot) {
			this._timePickerEl = this.shadowRoot.querySelector(".time-picker") as HTMLDivElement;
			this._inputFieldEl = this.shadowRoot.querySelector(".input-field") as HTMLDivElement;
			this._prefixSlotEl = this.shadowRoot.querySelector(`slot[name="prefix"]`) as HTMLSlotElement;
			this._suffixSlotEl = this.shadowRoot.querySelector(`slot[name="suffix"]`) as HTMLSlotElement;
		}
	}

	connectedCallback() {
		// add event listeners
		this._timePickerEl.addEventListener("click", this._timePickerClickEvent);
		this._inputFieldEl.addEventListener("on-input", this._timeInputEvent);
		this._inputFieldEl.addEventListener("on-focus-next", this._inputFocusNextEvent);
		this._inputFieldEl.addEventListener("on-focus-prev", this._inputFocusPrevEvent);
		this._inputFieldEl.addEventListener("on-paste", this._inputPasteEvent);
		this._pickerButtonEl.addEventListener("click", this._pickerButtonClickEvent);
		this._clearButtonEl.addEventListener("click", this._clearButtonClickEvent);
		this._prefixSlotEl.addEventListener("slotchange", this._prefixSlotChangeEvent);
		this._suffixSlotEl.addEventListener("slotchange", this._suffixSlotChangeEvent);
		// evaluate mandatory flag
		this._evaluateMandatoryFlag();
		// initial component update
		this._updateComponent();
		// update the view
		this._updateViews();
	}

	disconnectedCallback() {
		// remove event listeners
		this._timePickerEl.removeEventListener("click", this._timePickerClickEvent);
		this._inputFieldEl.removeEventListener("on-input", this._timeInputEvent);
		this._inputFieldEl.removeEventListener("on-focus-next", this._inputFocusNextEvent);
		this._inputFieldEl.removeEventListener("on-focus-prev", this._inputFocusPrevEvent);
		this._pickerButtonEl.removeEventListener("click", this._pickerButtonClickEvent);
		this._clearButtonEl.removeEventListener("click", this._clearButtonClickEvent);
		this._prefixSlotEl.removeEventListener("slotchange", this._prefixSlotChangeEvent);
		this._suffixSlotEl.removeEventListener("slotchange", this._suffixSlotChangeEvent);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// check if value changed
		if (_oldValue == _newValue) {
			return;
		}

		switch (_name) {
			case "label":
				this._label = _newValue;
				break;

			case "help-text":
				this._helpText = _newValue;
				break;

			case "error-message":
				this._errorMessage = _newValue;
				break;

			case "value":
				this._value = _newValue;
				break;

			case "format":
				this._format = _newValue;
				break;

			case "time-format":
				this._timeFormat = _newValue;
				this._updateViews();
				this._updateTimePickerValues();
				this._evaluateMandatoryFlag();
				break;

			case "theme":
				this._theme = _newValue;
				break;

			case "disabled":
				this._disabled = parseBooleanAttribute(_newValue);
				break;

			case "readonly":
				this._readonly = parseBooleanAttribute(_newValue);
				break;

			case "mandatory":
				this._mandatory = parseBooleanAttribute(_newValue);
				break;

			case "working":
				this._working = parseBooleanAttribute(_newValue);
				break;

			case "show-clear-button":
				this._showClearButton = parseBooleanAttribute(_newValue);
				break;

			case "hide-picker-button":
				this._hidePickerButton = parseBooleanAttribute(_newValue);
				break;

			case "picker-icon":
				this._pickerIcon = _newValue ?? "clock";
				break;

			case "spinner-type":
				this._spinnerType = _newValue ?? "dots";
				break;

			case "views":
				this._views = _newValue.split(",").map((view: string) => view.trim()) as PandaTimePickerView[];
				this._updateViews();
				break;

			case "minute-step":
				this.minuteStep = parseInt(_newValue);
				break;

			case "second-step":
				this.secondStep = parseInt(_newValue);
				break;
		}
		// update component
		this._updateComponent();
	}

	private _updateComponent(): void {
		if (this.isConnected) {
			// update spinner
			if (this._working && !this._disabled) {
				// add spinner to input wrap
				this._timePickerEl.appendChild(this._spinnerContEl);
				// block input field and hide it
				this._inputFieldEl.classList.add("hidden");
			} else {
				// remove spinner from input wrap
				this._spinnerContEl.remove();
				this._inputFieldEl.classList.remove("hidden");
			}

			// add or remove label
			if (this._label) {
				this._labelEl.textContent = this._label;
				this.shadowRoot!.insertBefore(this._labelEl, this._timePickerEl);
			} else {
				this._labelEl.remove();
			}

			// add or remove help text
			if (this._helpText) {
				this._helpTextEl.textContent = this._helpText;
				this.shadowRoot!.appendChild(this._helpTextEl);
			} else {
				this._helpTextEl.remove();
			}

			// add or remove error message
			if (this._errorMessage) {
				this._errorMessageEl.textContent = this._errorMessage;
				this.shadowRoot!.appendChild(this._errorMessageEl);
			} else {
				this._errorMessageEl.remove();
			}

			// update clear button
			if (this._showClearButton && this._value != null && !this._disabled && !this._readonly && !this._working) {
				// add clear button to input wrap
				this._timePickerEl.insertBefore(this._clearButtonContEl, this._suffixSlotEl);
			} else {
				// remove clear button from input wrap
				this._clearButtonContEl.remove();
			}

			// update picker button
			if (this._hidePickerButton) {
				this._pickerButtonContEl.remove();
			} else {
				this._timePickerEl.insertBefore(this._pickerButtonContEl, this._suffixSlotEl);
				this._pickerButtonIconEl.icon = this._pickerIcon ?? "clock"; // default to clock icon if pickerIcon is not set
			}

			// update time picker state to reflect read-only, working or disabled state
			this._updateTimePickerState();

			// update template css classes and parts
			this._updateTemplateCss();
		}
	}

	/** Update the time input fields based on the enabled views and time format. */
	private _updateViews(): void {
		if (this.isConnected) {
			let focusIndex = 0;
			// check if hours view is enabled
			if (this._views.includes("hours")) {
				this._inputFieldEl.appendChild(this._hourInputEl);
				this._hourInputEl.dataset.focusIndex = focusIndex.toString();
				this._hourInputEl.placeholder = this._i18n.hourPlaceholder;
				this._hourInputEl.max = this._timeFormat === "12" ? 12 : 23;
				this._hourInputEl.min = this._timeFormat === "12" ? 1 : 0;
				this._hourInputEl.tabIndex = 0;
				focusIndex++;
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
				this._inputFieldEl.appendChild(this._minuteInputEl);
				this._minuteInputEl.dataset.focusIndex = focusIndex.toString();
				this._minuteInputEl.placeholder = this._i18n.minutePlaceholder;
				focusIndex++;
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
				this._inputFieldEl.appendChild(this._secondInputEl);
				this._secondInputEl.dataset.focusIndex = focusIndex.toString();
				this._secondInputEl.placeholder = this._i18n.secondPlaceholder;
				focusIndex++;
			} else {
				this._secondInputEl.remove();
			}
			// check if view contains hours and if time format is 12 hours, then show period input
			if (this._views.includes("hours") && this._timeFormat === "12") {
				this._inputFieldEl.appendChild(this._periodInputEl);
				this._periodInputEl.dataset.focusIndex = focusIndex.toString();
				this._periodInputEl.placeholder = this._i18n.periodPlaceholder;
			} else {
				this._periodInputEl.remove();
			}
		}
	}

	/**
	 * Update time picker values based on the current time format (12h or 24h).
	 * This method ensures that the hours and period values are correctly adjusted
	 * when switching between 12-hour and 24-hour formats.
	 */
	private _updateTimePickerValues(): void {
		// if time format is 12 hours and hours value is greater than 12, then convert it to 12 hours format
		if (this._timeFormat === "12" && this._valueObject.hours != null) {
			if (this._valueObject.hours > 12) {
				this._valueObject.hours = this._valueObject.hours - 12;
				this._valueObject.period = "pm";
			} else if (this._valueObject.hours === 12) {
				this._valueObject.period = "pm";
			} else if (this._valueObject.hours === 0) {
				this._valueObject.hours = 12;
				this._valueObject.period = "am";
			} else {
				this._valueObject.period = "am";
			}
			// update hour and period input fields
			this._hourInputEl.value = this._valueObject.hours.toString().padStart(2, "0");
			this._periodInputEl.value = this._valueObject.period;
		} else if (this._timeFormat === "24" && this._valueObject.hours != null && this._valueObject.period != null) {
			if (this._valueObject.period === "pm" && this._valueObject.hours < 12) {
				this._valueObject.hours = this._valueObject.hours + 12;
			} else if (this._valueObject.period === "am" && this._valueObject.hours === 12) {
				this._valueObject.hours = 0;
			}
			// update hour input field
			this._hourInputEl.value = this._valueObject.hours.toString().padStart(2, "0");
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

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

		this._pickerButtonContEl.className = `picker-button-cont ${cssString}`;
		this._pickerButtonContEl.part = this._pickerButtonContEl.className;

		this._clearButtonContEl.className = `clear-button-cont ${cssString}`;
		this._clearButtonContEl.part = this._clearButtonContEl.className;

		// update invalid class
		if (this._invalid) {
			this._timePickerEl.classList.add("invalid");
			this._timePickerEl.part = this._timePickerEl.className;
			// update label element
			this._labelEl.classList.add("invalid");
			this._labelEl.part = this._labelEl.className;
		} else {
			this._timePickerEl.classList.remove("invalid");
			this._timePickerEl.part = this._timePickerEl.className;
			// update label element
			this._labelEl.classList.remove("invalid");
			this._labelEl.part = this._labelEl.className;
		}

		// update clear button container class for styling based on presence of picker button
		if (this._hidePickerButton) {
			this._clearButtonContEl.classList.add("without-picker-button");
		} else {
			this._clearButtonContEl.classList.remove("without-picker-button");
		}
	}

	private _showOverlay(): void {
		if (this._overlayEl == null && !this.disabled && !this.readonly && !this.working) {
			// create overlay element
			this._overlayEl = document.createElement("panda-time-picker-overlay");
			
			console.log(`%c [PANDA TIME PICKER] (_showOverlay) Creating overlay element:`,
				"font-size: 16px; color: cyan; background: black;",
				this._views
			);
			
			this._overlayEl.views = this._views;

			// show overlay
			document.body.appendChild(this._overlayEl);
		}
	}

	private _parseValue(rawValue: RawValue): void {
		const {
			value,
			valueObject,
		} = parseTimeValue(rawValue, this._timeFormat);
		this._value = value;
		this._valueObject = valueObject;

		// console.log("Parsed value:", {
		// 	value: this._value,
		// 	valueObject: this._valueObject,
		// });

		// console.log(`%c (_parseValue) hours:`, "font-size: 24px; color: blue; background: black;", this._valueObject?.hours?.toString().padStart(2, "0"));
		// console.log(`%c (_parseValue) minutes:`, "font-size: 24px; color: green; background: black;", this._valueObject?.minutes?.toString().padStart(2, "0"));
		// console.log(`%c (_parseValue) seconds:`, "font-size: 24px; color: red; background: black;", this._valueObject?.seconds?.toString().padStart(2, "0"));
		// console.log(`%c (_parseValue) period:`, "font-size: 24px; color: purple; background: black;", this._valueObject?.period);

		if (value != null) {
			// update time input fields based on the new value object
			this._hourInputEl.value = this._valueObject.hours != null ? this._valueObject.hours.toString().padStart(2, "0") : "";
			this._minuteInputEl.value = this._valueObject.minutes != null ? this._valueObject.minutes.toString().padStart(2, "0") : "";
			this._secondInputEl.value = this._valueObject.seconds != null ? this._valueObject.seconds.toString().padStart(2, "0") : "";
			this._periodInputEl.value = this._valueObject.period;
		}

		// evaluate mandatory flag based on the new value
		this._evaluateMandatoryFlag();
		// update component to reflect changes in value and value object
		this._updateComponent();
	}

	/**
	 * Set focus to time input element based on the provided index.
	 * @param {number} index focus index of the element
	 */
	private _setFocus(index: number): void {
		const inputEl = this._inputFieldEl.querySelector(`panda-time-input[data-focus-index="${index}"]`) as PandaTimePickerInput;
		if (inputEl) {
			inputEl.focus();
		}
	}

	/** Update mandatory flag */
	private _evaluateMandatoryFlag(): void {
		this._showMandatoryFlag = this._mandatory && !isValueObjectComplete(this._valueObject, this._views, this._timeFormat);
	}

	private _updateValueObject(value: string, timePart: string): void {
		// if value object is null, initialize it
		switch (timePart) {
			case "hours":
				this._valueObject.hours = parseInt(value) ?? null;
				break;
			case "minutes":
				this._valueObject.minutes = parseInt(value) ?? null;
				break;
			case "seconds":
				this._valueObject.seconds = parseInt(value) ?? null;
				break;
			case "period":
				this._valueObject.period = value
					? value.toLowerCase() === "pm" ? "pm" : "am"
					: null;
				break;
		}

		// check if time value object is complete
		const complete = isValueObjectComplete(
			this._valueObject,
			this._views,
			this._timeFormat
		);

		if (complete) {
			this._showMandatoryFlag = false;
			// validate time value object and update valid flag
			this._invalid = !validateTimeObject(
				this._valueObject,
				this._views,
				this._timeFormat
			);
			// only trigger change event if the value object is valid to prevent emitting incomplete or invalid time values
			if (!this._invalid) {
				this._triggerChangeEvent();
			}
		} else {
			this._showMandatoryFlag = this._mandatory;
			this._invalid = false;
		}
		// update component to reflect changes in value object
		this._updateComponent();
	}

	private _updateTimePickerState(): void {
		// update tabindex for focusable elements when disabled / readonly / working
		if (this._disabled || this._readonly || this._working) {
			this._pickerButtonEl.tabIndex = -1;
			this._clearButtonEl.tabIndex = -1;
		} else {
			this._pickerButtonEl.tabIndex = 0;
			this._clearButtonEl.tabIndex = 0;
		}

		// update readonly state
		if (this._readonly || this._working) {
			this._timePickerEl.tabIndex = 0; // make entire time picker focusable in read-only state to allow focus retention
		} else {
			this._timePickerEl.tabIndex = -1; // remove time picker from tab order when not read-only
		}

		// update disabled state
		if (this._disabled) {
			this._timePickerEl.tabIndex = -1; // remove time picker from tab order when disabled
		}

		if (this._readonly || this._disabled) {
			this._hourInputEl.disabled = true;
			this._minuteInputEl.disabled = true;
			this._secondInputEl.disabled = true;
			this._periodInputEl.disabled = true;
		} else {
			this._hourInputEl.disabled = false;
			this._minuteInputEl.disabled = false;
			this._secondInputEl.disabled = false;
			this._periodInputEl.disabled = false;
		}

		// update min value for hour input based on time format
		if (this._timeFormat === "12") {
			this._hourInputEl.min = 1;
		} else {
			this._hourInputEl.min = 0;
		}
	}

	/**
	 * Trigger change event with the selected time value in the detail. If clear flag is true, value will be null in the event detail.
	 * @param {boolean} clear if true, value in event detail will be null, otherwise it will be the formatted time string based on the selected time value
	 */
	private _triggerChangeEvent(clear: boolean = false): void {
		let value = null;
		if (!clear) {
			value = formatValue(this._valueObject, this._format, this._views, this._timeFormat);
			this._value = value;
		}
		const changeEvent = new CustomEvent("change", {
			detail: {
				value,
			},
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(changeEvent);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onPrefixSlotChanged(): void {
		this._withPrefix = true;
		this._updateComponent();
	}

	private _onSuffixSlotChanged(): void {
		this._withSuffix = true;
		this._updateComponent();
	}

	private _onTimeInput = (event: Event): void => {
		const timeInputEl = (event.target as HTMLElement).closest(".time-input") as PandaTimePickerInput;
		// update value object based on the input change
		this._updateValueObject(
			timeInputEl.value as string,
			timeInputEl.dataset.timePart as string
		);
	}

	private _onInputFocusNext = (event: Event): void => {
		const inputEl = (event.target as HTMLElement).closest(".time-input") as PandaTimePickerInput;
		const focusIndex = parseInt(inputEl.dataset.focusIndex ?? "0");
		// set focus to next input element
		this._setFocus(focusIndex + 1);
	}

	private _onInputFocusPrev = (event: Event): void => {
		const inputEl = (event.target as HTMLElement).closest(".time-input") as PandaTimePickerInput;
		const focusIndex = parseInt(inputEl.dataset.focusIndex ?? "0");

		if (focusIndex > 0) {
			// set focus to previous input element
			this._setFocus(focusIndex - 1);
		}
	}

	private _onInputPaste = (event: CustomEvent<OnPasteEventDetail>): void => {
		const value = event.detail.value;
		this._parseValue(value);
		this._triggerChangeEvent();
	}

	// handle component container clicks to set focus to time inputs
	private _onTimePickerClick = (): void => {
		this._setFocus(0);
	}

	private _onClearButtonClick = (event: Event): void => {
		// prevent clicking parent container and triggering focus event on time picker element
		event.stopPropagation();
		this._value = null;
		this._valueObject = getEmptyTimeObject();
		// clear input fields
		this._hourInputEl.value = null;
		this._minuteInputEl.value = null;
		this._secondInputEl.value = null;
		this._periodInputEl.value = null;

		this._triggerChangeEvent(true);
		this._evaluateMandatoryFlag();
		this._updateComponent();
		this._setFocus(0);
	}

	// handle picker button click to show time selection overlay
	private _onPickerButtonClick = (event: Event): void => {
		// prevent clicking parent container and triggering focus event on time picker element
		event.stopPropagation();

		// console.log(`%c ⚡ [PANDA TIME PICKER] (_onPickerButtonClick)`, "font-size: 24px; color: crimson; background: black;");
		this._showOverlay();
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
