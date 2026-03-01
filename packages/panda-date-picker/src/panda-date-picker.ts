// types
import { PandaDatePickerI18nConfig, PandaDatePreset } from "../index";
import { DateValue, ElementDetails, PostMessageEvent, PostMessageEventType } from "./type";
import { PandaDatePickerOverlay } from "./panda-date-picker-overlay";
import { Debouncer } from "@panda-wbc/panda-utils/types";
import { PandaSpinner } from "@panda-wbc/panda-spinner";
import { PandaTextSlider } from "@panda-wbc/panda-text-slider";
import { PandaIcon } from "@panda-wbc/panda-icon";

// styles
import { styles } from "./styles/styles";

// components
import "./panda-date-picker-overlay";
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-text-slider";

// utils
import {
	formatDate,
	getDefaultI18nConfig,
	getPresetDateByLabel,
	isValidDate,
	parseDateString,
} from "./utils/utils";
import {
	applyStyles,
	parseBooleanAttribute,
	parseNumberAttribute,
	sanitizeString,	
} from "@panda-wbc/panda-utils/lib/component-utils";
import { debounce } from "@panda-wbc/panda-utils";

export class PandaDatePicker extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// observed attributes ============================================================================================
	static get observedAttributes() {
		return [
			"autocomplete",
			"autofocus",
			"autoselect",
			"disable-auto-open",
			"disable-quick-select",
			"disable-weekends",
			"disabled",
			"error-message",
			"first-day-of-week",
			"format",
			"help-text",
			"icon-position",
			"icon",
			"label",
			"mandatory",
			"max",
			"min",
			"placeholder-interval",
			"placeholder",
			"preset-dates-header",
			"readonly",
			"show-clear-button",
			"show-today",
			"spellcheck",
			"spinner-type",
			"week-starts-on-monday",
			"working",
		];
	}

	/**
	 * value
	 * ------
	 * The selected date value of the component. This can be set programmatically or by user interaction with the calendar.
	 * @default null
	 * @remarks The value is typically formatted as a date string (e.g., "2020-12-25") according to the specified date format.
	 */
	get value() {
		return this._value;
	}

	set value(value: DateValue) {
		if (this._value !== value) {
			console.log(`%c ⚡ (set value)`, "font-size: 24px; color: green; background: black;", typeof value, value, this._value);
			this._value = value;
			// check if component is ready before updating display value and component
			if (this._ready) {
				this._updateDisplayValue();
				this._updateComponent();
			}
		}
	}

	private _value!: DateValue;

	/**
	 * format
	 * ------
	 * Defines the format in which the date value is displayed in the input field and how user input is parsed.
	 * @type {string}
	 * @default "YYYY-MM-DD"
	 * @remarks The format string can include the following tokens:
	 * - YYYY: 4-digit year (e.g., 2020)
	 * - YY: 2-digit year (e.g., 20)
	 * - MMMM: Full month name (e.g., January, February)
	 * - MMM: 3-letter month abbreviation (e.g., Jan, Feb, Mar)
	 * - MM: 2-digit month (e.g., 01 for January)
	 * - M: 1 or 2-digit month (e.g., 1 for January)
	 * - DDDD: Full day of the week (e.g., Monday, Tuesday)
	 * - DDD: Day of the week (e.g., Mon, Tue, Wed)
	 * - DD: 2-digit day of the month (e.g., 05)
	 * - D: 1 or 2-digit day of the month (e.g., 5)
	 * @example "DD MMM YYYY" -> "25 Dec 2020"
	 */
	get format() {
		return this._format;
	}

	set format(value: string) {
		if (this._format !== value) {
			this._format = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("format");
			} else {
				this.setAttribute("format", value + "");
			}
		}
	}

	private _format!: string;

	/**
	 * min
	 * ------
	 * Set lower limit for date selection.
	 * @default null
	 * @remarks The min property defines the earliest date that can be selected by the user. 
	 * If a user attempts to select a date that is earlier than the specified min date, the component will prevent the selection. 
	 * The min date can be set using a date string formatted according to the specified date format (e.g., "2020-01-01") or 
	 * as a Unix timestamp (e.g., 1577836800000 for January 1, 2020).
	 * @example "2000-01-01" [YYYY-MM-DD] or 946684800000 [X]
	 */
	get min() {
		return this._min;
	}

	set min(value: DateValue) {
		if (this._min !== value) {
			this._min = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("min");
			} else {
				this.setAttribute("min", value + "");
			}
		}
	}

	private _min!: DateValue;

	/**
	 * max
	 * ------
	 * Set upper limit for date selection.
	 * @default null
	 * @remarks The max property defines the latest date that can be selected by the user.
	 * If a user attempts to select a date that is later than the specified max date, the component will prevent the selection.
	 * The max date can be set using a date string formatted according to the specified date format (e.g., "2020-12-31") or 
	 * as a Unix timestamp (e.g., 1609372800000 for December 31, 2020).
	 * @example "2000-01-01" [YYYY-MM-DD] or 946684800000 [X]
	 */
	get max() {
		return this._max;
	}

	set max(value: DateValue) {
		if (this._max !== value) {
			this._max = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("max");
			} else {
				this.setAttribute("max", value + "");
			}
		}
	}

	private _max!: DateValue;

	/**
	 * disableWeekends
	 * ------
	 * Disable weekends from selection.
	 * @default false
	 * @remarks If true, Saturdays and Sundays are disabled and cannot be selected by the user. 
	 */
	get disableWeekends() {
		return this._disableWeekends;
	}

	set disableWeekends(value: boolean) {
		if (this._disableWeekends !== value) {
			this._disableWeekends = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._disableWeekends) {
				this.setAttribute("disable-weekends", "");
			} else {
				this.removeAttribute("disable-weekends");
			}
		}
	}

	private _disableWeekends!: boolean;

	/**
	 * disableDates
	 * ------
	 * Disable individual dates from selection.
	 * Supports wildcard notation "**" see example below
	 * @default null
	 * @remarks The disableDates property allows you to specify an array of date strings that should be disabled and not selectable by the user.
	 * The date strings should be formatted according to the specified date format (e.g., "2020-12-25") or can include wildcards for 
	 * flexible matching (e.g., "****-12-25" to disable December 25th of every year).
	 * @example ["2020-01-01", "2020-02-**"]
	 */
	private _disableDates!: string[] | null;

	get disableDates() {
		return this._disableDates;
	}

	set disableDates(value: string[] | null) {
		if (this._disableDates !== value) {
			this._disableDates = value;
			// update overlay if open
			if (this._overlayEl) {
				this._overlayEl.disableDates = this._disableDates;
			}
		}
	}

	/**
	 * presetDates
	 * ------
	 * Preset dates that are highlighted in the calendar and can be quickly selected by the user.
	 * Supports wildcard notation "**" see example below
	 * @default null
	 * @remarks The preset dates are highlighted in the calendar with a different color and are displayed at the top of the month view for quick selection.
	 * @example [{ label: "Christmas", date: "****-12-25" }]
	 */
	get presetDates() {
		return this._presetDates;
	}

	set presetDates(value: PandaDatePreset[] | null) {
		if (this._presetDates !== value) {
			this._presetDates = value;
			// update overlay if open
			if (this._overlayEl) {
				this._overlayEl.presetDates = this._presetDates;
			}
		}
	}

	private _presetDates!: PandaDatePreset[] | null;

	/**
	 * presetDatesHeader
	 * ------
	 * Defines the header text for the preset dates section in the calendar.
	 * @default "Presets"
	 * @example "Holiday Highlights"
	 * @remarks This header is displayed above the list of preset dates in the month view of the calendar.
	 */
	get presetDatesHeader() {
		return this._presetDatesHeader;
	}

	set presetDatesHeader(value: string) {
		if (this._presetDatesHeader !== value) {
			this._presetDatesHeader = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("preset-dates-header");
			} else {
				this.setAttribute("preset-dates-header", value + "");
			}
		}
	}

	private _presetDatesHeader!: string;

	/**
	 * highlightDates
	 * ------
	 * Highlight specific dates in the calendar with custom labels and styles.
	 * @default null
	 * @remarks The highlightDates property allows you to specify an array of dates that should be visually highlighted in the calendar.
	 */
	get highlightDates() {
		return this._highlightDates;
	}

	set highlightDates(value: PandaDatePreset[] | null) {
		if (this._highlightDates !== value) {
			this._highlightDates = value;
			// update overlay if open
			if (this._overlayEl) {
				this._overlayEl.highlightDates = this._highlightDates;
			}
		}
	}

	private _highlightDates!: PandaDatePreset[] | null;

	/**
	 * weekStartsOnMonday
	 * ------
	 * If true, the calendar week starts on Monday instead of Sunday.
	 * @default false
	 * @remarks When this property is set to true, the calendar will display Monday as the first day of the week, 
	 * followed by Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday. If false, the week starts on Sunday.
	 * This feature is incompatible with firstDayOfWeek property.
	 */
	get weekStartsOnMonday() {
		return this._weekStartsOnMonday;
	}

	set weekStartsOnMonday(value: boolean) {
		if (this._weekStartsOnMonday !== value) {
			this._weekStartsOnMonday = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._weekStartsOnMonday) {
				this.setAttribute("week-starts-on-monday", "");
			} else {
				this.removeAttribute("week-starts-on-monday");
			}
		}
	}

	private _weekStartsOnMonday!: boolean;

	/**
	 * firstDayOfWeek
	 * ------
	 * Defines the first day of the week in the calendar.
	 * @default 0
	 * @remarks The firstDayOfWeek property allows you to specify which day of the week should be considered the first day in the calendar.
	 * @example 0 -> Sunday, 1 -> Monday
	 */
	get firstDayOfWeek() {
		return this._firstDayOfWeek;
	}

	set firstDayOfWeek(value: number) {
		if (this._firstDayOfWeek !== value) {
			this._firstDayOfWeek = value;
			// reflect to attribute
			if (this._firstDayOfWeek == null) {
				this.removeAttribute("first-day-of-week");
			} else {
				this.setAttribute("first-day-of-week", value + "");
			}
		}
	}

	private _firstDayOfWeek!: number;

	/**
	 * label
	 * ------
	 * Defines the label text for the date picker input field.
	 * @default null
	 * @remarks The label is displayed above the input field and provides a description of the expected input.
	 * @example "Select a date"
	 */
	get label() {
		return this._label;
	}
	
	set label(value: string) {
		if (this._label !== value) {
			this._label = sanitizeString(value);
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("label");
			} else {
				this.setAttribute("label", this._label + "");
			}
		}
	}

	private _label!: string;
	
	/**
	 * helpText
	 * ------
	 * Helper text displayed below the input field to provide additional information or instructions to the user.
	 * @default null
	 * @remarks The help text is typically used to give users more context about the expected input or to provide guidance on how to use the date picker. 
	 * It is displayed below the input field and is usually styled in a smaller font size and a lighter color to differentiate it from the main label.
	 */
	get helpText() {
		return this._helpText;
	}

	set helpText(value: string) {
		if (this._helpText !== value) {
			this._helpText = sanitizeString(value);
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("help-text");
			} else {
				this.setAttribute("help-text", this._helpText + "");
			}
		}
	}

	private _helpText!: string;

	/**
	 * errorMessage
	 * ------
	 * Error message displayed below the input field. This is typically used to show validation errors when the user input is invalid.
	 * @default null
	 * @remarks The error message is displayed below the input field in red color to indicate that there is an issue with the user's input.
	 */
	get errorMessage() {
		return this._errorMessage;
	}

	set errorMessage(value: string) {
		if (this._errorMessage !== value) {
			this._errorMessage = sanitizeString(value);
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("error-message");
			} else {
				this.setAttribute("error-message", this._errorMessage + "");
			}
		}
	}

	private _errorMessage!: string;

	/**
	 * placeholder
	 * ------
	 * Placeholder text displayed in the input field when no date is selected.
	 * @default null
	 * @remarks The placeholder text provides a hint to the user about what kind of input is expected.
	 * If multiple placeholder texts are provided as an array, the component will cycle through them at the specified interval defined by the placeholderInterval property.
	 * @example "Select a date" or ["Select a date", "Pick a day", "Choose..."]
	 */
	get placeholder() {
		return this._placeholder;
	}

	set placeholder(value: string | string[]) {
		if (this._placeholder !== value) {
			// set placeholder value
			if (Array.isArray(value)) {
				this._placeholder = value.map((placeholderText) => placeholderText + "");
			} else {
				this._placeholder = [value + ""];
			}
			this._placeholderEl.slides = this._placeholder;
			this._updateComponent();
		}
	}
	
	private _placeholder!: string[];

	/**
	 * placeholderInterval
	 * ------
	 * Defines the interval in milliseconds at which the placeholder text changes when multiple placeholder texts are provided.
	 * @default 3000
	 * @remarks When multiple placeholder texts are provided, the component will cycle through them at the specified interval, 
	 * updating the placeholder text in the input field accordingly.
	 */
	get placeholderInterval() {
		return this._placeholderInterval;
	}

	set placeholderInterval(value: number | null) {
		if (this._placeholderInterval !== value) {
			this._placeholderInterval = parseNumberAttribute(value, 3000);
			// reflect to attribute
			if (this._placeholderInterval == null) {
				this.removeAttribute("placeholder-interval");
			} else {
				this.setAttribute("placeholder-interval", this._placeholderInterval + "");
			}
		}
	}

	private _placeholderInterval!: number | null;

	/**
	 * showToday
	 * ------
	 * If true, highlights today's date in the calendar and allows quick selection of today's date.
	 * @default false
	 * @remarks When this property is set to true, today's date will be visually highlighted in the calendar 
	 * (e.g., with a different background color) to make it easily identifiable. 
	 * Additionally, there may be a quick selection option (e.g., a "Today" button) that allows users to quickly 
	 * select today's date without having to navigate through the calendar.
	 */
	get showToday() {
		return this._showToday;
	}

	set showToday(value: boolean) {
		if (this._showToday !== value) {
			this._showToday = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._showToday) {
				this.setAttribute("show-today", "");
			} else {
				this.removeAttribute("show-today");
			}
		}
	}

	private _showToday!: boolean;

	/**
	 * spinnerType
	 * ------
	 * Defines the type of spinner to show when the component is in a working state.
	 * @default "dots"
	 * @remarks When the component is in the working state, a spinner is displayed to indicate that a background process is ongoing.
	 */
	get spinnerType() {
		return this._spinnerType;
	}

	set spinnerType(value: string) {
		if (this._spinnerType !== value) {
			this._spinnerType = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("spinner-type");
			} else {
				this.setAttribute("spinner-type", this._spinnerType);
			}
		}
	}

	private _spinnerType!: string;

	/**
	 * autocomplete
	 * ------
	 * Defines the autocomplete behavior of the input field.
	 * @default "off"
	 * @remarks This property controls whether the browser's autocomplete feature is enabled for the date input field.
	 */
	get autocomplete() {
		return this._autocomplete;
	}

	set autocomplete(value: AutoFill) {
		if (this._autocomplete !== value) {
			this._autocomplete = value;
			// reflect to attribute
			if (value == null || value === "off") {
				this._autocomplete = "off";
				this.removeAttribute("autocomplete");
			} else {
				this.setAttribute("autocomplete", this._autocomplete);
			}
		}
	}

	private _autocomplete!: AutoFill;

	/**
	 * spellcheck
	 * ------
	 * If true, enables spell checking for the input field.
	 * @default false
	 * @remarks When spellcheck is enabled, the browser will check the spelling of the text entered in the input field 
	 * and may provide suggestions for misspelled words. This is typically used for text inputs, but can also be 
	 * applied to date inputs if needed.
	 */
	get spellcheck() {
		return this._spellcheck;
	}

	set spellcheck(value: boolean) {
		if (this._spellcheck !== value) {
			this._spellcheck = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._spellcheck) {
				this.setAttribute("spellcheck", "");
			} else {
				this.removeAttribute("spellcheck");
			}
		}
	}

	private _spellcheck!: boolean;

	/**
	 * autoselect
	 * ------
	 * If true, the component will automatically select the date when the user clicks on a date in the calendar or uses 
	 * keyboard to navigate and select a date.
	 * @default false
	 * @remarks When autoselect is enabled, the selected date will be immediately applied to the input field and the 
	 * value will be updated as soon as the user selects a date in the calendar.
	 */
	get autoselect() {
		return this._autoselect;
	}

	set autoselect(value: boolean) {
		if (this._autoselect !== value) {
			this._autoselect = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._autoselect) {
				this.setAttribute("autoselect", "");
			} else {
				this.removeAttribute("autoselect");
			}
		}
	}

	private _autoselect!: boolean;

	/**
	 * disableAutoOpen
	 * ------
	 * If true, the overlay will not open automatically when the input box is clicked.
	 * Overlay can still be opened by clicking on calendar icon or using keyboard.
	 * @default false
	 */
	get disableAutoOpen() {
		return this._disableAutoOpen;
	}

	set disableAutoOpen(value: boolean) {
		if (this._disableAutoOpen !== value) {
			this._disableAutoOpen = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._disableAutoOpen) {
				this.setAttribute("disable-auto-open", "");
			} else {
				this.removeAttribute("disable-auto-open");
			}
		}
	}

	private _disableAutoOpen!: boolean;

	/**
	 * showClearButton
	 * ------
	 * If true, shows a clear button inside the input field when a date is selected, 
	 * allowing users to quickly clear the selection.
	 * @default false
	 * @remarks The clear button is only visible when a date is selected and the component is not disabled or read-only.
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
	 * icon
	 * ------
	 * Name of the icon to display inside the input field.
	 * Refer to PandaIcon documentation for more details on supported icons.
	 * @default null
	 * @example "calendar"
	 */
	get icon() {
		return this._icon;
	}

	set icon(value: string) {
		if (this._icon !== value) {
			this._icon = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("icon");
			} else {
				this.setAttribute("icon", value + "");
			}
		}
	}

	private _icon!: string;

	/**
	 * iconPosition
	 * ------
	 * Defines the position of the icon inside the input field.
	 * @default "left"
	 * @remarks If set to "right", the icon will be displayed on the right side of the input field.
	 */
	get iconPosition() {
		return this._iconPosition;
	}

	set iconPosition(value: string) {
		if (this._iconPosition !== value) {
			this._iconPosition = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("icon-position");
			} else {
				this.setAttribute("icon-position", value + "");
			}
		}
	}

	private _iconPosition!: string;

	/**
	 * readonly
	 * ------
	 * If true, the component is read-only and cannot be modified by the user.
	 * @default false
	 * @remarks When the component is read-only, it is non-interactive and typically appears visually distinct 
	 * (e.g., grayed out) to indicate that it cannot be edited.
	 */
	get readonly() {
		return this._readonly;
	}

	/** setter */
	set readonly(value: boolean) {
		if (this._readonly !== value) {
			this._readonly = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._readonly) {
				this.setAttribute("readonly", "");
			} else {
				this.removeAttribute("readonly");
			}
		}
	}

	private _readonly!: boolean;

	/**
	 * working
	 * ------
	 * If true, the component is in a working state, typically indicating that a background process is ongoing 
	 * (e.g., loading data).
	 * In this state, a spinner is displayed to indicate that the user should wait.
	 * @default false
	 * @remarks When the component is in the working state, user interaction is disabled to prevent changes while the 
	 * background process is running. 
	 * The appearance of the component may also change to visually indicate that it is busy (e.g., by showing a spinner 
	 * or dimming the input field).
	 */
	get working() {
		return this._working;
	}

	set working(value: boolean) {
		if (this._working !== value) {
			this._working = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._working) {
				this.setAttribute("working", "");
			} else {
				this.removeAttribute("working");
			}
		}
	}
	
	private _working!: boolean;

	/**
	 * disabled
	 * ------
	 * If true, the component is disabled and cannot be interacted with.
	 * @default false
	 * @remarks When the component is disabled, it is non-interactive and typically appears visually distinct (e.g., grayed out) to indicate that it cannot be used.
	 */
	get disabled() {
		return this._disabled;
	}

	set disabled(value: boolean) {
		if (this._disabled !== value) {
			this._disabled = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._disabled) {
				this.setAttribute("disabled", "");
			} else {
				this.removeAttribute("disabled");
			}
			// update items
			this._updateComponent();
		}
	}

	private _disabled!: boolean;

	/**
	 * mandatory
	 * ------
	 * If true, the component is mandatory and must be filled out by the user.
	 * @default false
	 */
	private _mandatory!: boolean;

	get mandatory() {
		return this._mandatory;
	}

	set mandatory(value: boolean) {
		if (this._mandatory !== value) {
			this._mandatory = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._mandatory) {
				this.setAttribute("mandatory", "");
			} else {
				this.removeAttribute("mandatory");
			}
		}
	}

	/**
	 * autofocus
	 * ------
	 * If true, the component will automatically receive focus when it is added to the DOM.
	 * @default false
	 */
	get autofocus() {
		return this._autofocus;
	}

	set autofocus(value: boolean) {
		if (this._autofocus !== value) {
			this._autofocus = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._autofocus) {
				this.setAttribute("autofocus", "");
			} else {
				this.removeAttribute("autofocus");
			}
		}
	}

	private _autofocus!: boolean;

	/**
	 * disableQuickSelect
	 * ------
	 * If true, disables the quick selection in the calendar. 
	 * This means that every time user selects a date in the calendar, 
	 * the user has to click on "OK" button to confirm the selection.
	 */
	get disableQuickSelect() {
		return this._disableQuickSelect;
	}

	set disableQuickSelect(value: boolean) {
		if (this._disableQuickSelect !== value) {
			this._disableQuickSelect = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._disableQuickSelect) {
				this.setAttribute("disable-quick-select", "");
			} else {
				this.removeAttribute("disable-quick-select");
			}
		}
	}

	private _disableQuickSelect!: boolean;

	/**
	 * multiselect
	 * ------
	 * If true, allows the user to select multiple dates in the calendar.
	 * @default false
	 * @remarks When multiselect is enabled, users can select more than one date in the calendar.
	 */
	get multiselect() {
		return this._multiselect;
	}

	set multiselect(value: boolean) {
		if (this._multiselect !== value) {
			this._multiselect = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._multiselect) {
				this.setAttribute("multiselect", "");
			} else {
				this.removeAttribute("multiselect");
			}
		}
	}

	private _multiselect!: boolean;

	/**
	 * i18n
	 * ------
	 * Internationalization configuration for the date picker.
	 * @default English labels for months, days of the week, and "Today" button.
	 * @remarks This configuration allows you to customize the language and labels used in the date picker, 
	 * such as month names, day names, and the label for the "Today" button etc.
	 * If not provided, default English labels will be used.
	 */
	get i18n() {
		return this._i18n;
	}

	set i18n(value: PandaDatePickerI18nConfig) {
		if (this._i18n !== value) {
			this._i18n = value;
			this._i18n = {
				...getDefaultI18nConfig(),
				...this._i18n,				
			};
			// check if overlay is open, if yes update i18n config of overlay
			if (this._overlayEl?.isConnected) {
				this._overlayEl.i18n = this._i18n;
			}
		}
	}

	private _i18n!: PandaDatePickerI18nConfig;

	// private properties =============================================================================================
	private _ready!: boolean;
	private _focused!: boolean;
	private _showMandatoryFlag!: boolean;
	private _withPrefix!: boolean;
	private _withSuffix!: boolean;
	private _invalid!: boolean;

	// elements
	private readonly _datePickerEl!: HTMLDivElement;
	private readonly _prefixSlotEl!: HTMLSlotElement;
	private readonly _suffixSlotEl!: HTMLSlotElement;
	private readonly _labelEl!: HTMLDivElement;
	private readonly _helpTextEl!: HTMLDivElement;
	private readonly _errorMessageEl!: HTMLDivElement;
	private readonly _spinnerEl!: PandaSpinner;
	private readonly _spinnerContEl!: HTMLDivElement;
	private readonly _iconContEl!: HTMLDivElement;
	private readonly _iconEl!: PandaIcon;
	private readonly _inputWrapEl!: HTMLDivElement;
	private readonly _inputContEl!: HTMLDivElement;
	private readonly _inputEl!: HTMLInputElement;
	private readonly _placeholderEl!: PandaTextSlider;
	private readonly _clearButtonEl!: HTMLDivElement;
	private readonly _clearButtonIconEl!: HTMLDivElement;
	private readonly _footerEl!: HTMLDivElement;
	// overlay element
	private _overlayEl!: PandaDatePickerOverlay;

	// events
	private readonly _datePickerClickEvent!: any;
	private readonly _inputEvent!: any;
	private readonly _focusInputEvent!: any;
	private readonly _blurInputEvent!: any;
	private readonly _prefixSlotChangeEvent!: any;
	private readonly _suffixSlotChangeEvent!: any;
	private readonly _clearButtonClickEvent!: any;
	private readonly _iconClickEvent!: any;
	private readonly _postMessageEvent!: any;

	// debouncers
	private readonly _evaluateUserInputDebounce!: Debouncer;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });

		// apply component styles
		applyStyles(styles, this.shadowRoot);

		// create component template
		const template = document.createElement("template");
		template.innerHTML = /*html*/`
			<div class="date-picker" part="date-picker">
				<slot name="prefix" part="prefix"></slot>
				<div class="input-wrap" part="input-wrap">
					<div class="input-cont" part="input-cont">
						<!-- placeholder will be inserted here -->
						<input id="input" type="text" class="input" part="input" />
						<div class="clear-button" part="clear-button">
							<panda-icon class="icon" part="icon" icon="close"></panda-icon>
						</div>
					</div>
					<div class="icon-cont" part="icon-cont">
						<!-- calendar icon will be inserted here -->
					</div>
				</div>
				<slot name="suffix" part="suffix"></slot>
			</div>
			<div class="footer" part="footer">
				<!-- help text / error message will be inserted here -->
			</div>
		`;

		// create panda-spinner element
		this._spinnerEl = document.createElement("panda-spinner");
		this._spinnerEl.part = "spinner";
		this._spinnerEl.spinner = this._spinnerType;

		// create spinner element
		this._spinnerContEl = document.createElement("div");
		this._spinnerContEl.className = "spinner-cont";
		this._spinnerContEl.part = "spinner-cont";
		// append panda-spinner inside
		this._spinnerContEl.appendChild(this._spinnerEl);

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

		// create placeholder element
		this._placeholderEl = document.createElement("panda-text-slider");
		this._placeholderEl.className = "placeholder";
		this._placeholderEl.part = "placeholder";
		this._placeholderEl.hide = true;

		// create calendar icon element
		this._iconEl = document.createElement("panda-icon");
		this._iconEl.className = "icon";
		this._iconEl.part = "icon";
		this._iconEl.icon = "calendar";

		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._ready = false;
		this._label = "";
		this._helpText = "";
		this._errorMessage = "";
		this._icon = "";
		this._iconPosition = "right";
		this._showMandatoryFlag = false;
		this._invalid = false;
		this._readonly = false;
		this._working = false;
		this._disabled = false;
		this._mandatory = false;
		this._showClearButton = false;
		this._placeholder = [];
		this._placeholderInterval = null;
		this._autocomplete = "off";
		this._spellcheck = false;
		this._spinnerType = "dots";
		this._i18n = getDefaultI18nConfig();

		// get template element handles
		if (this.shadowRoot) {
			// assign template elements
			this._datePickerEl = this.shadowRoot.querySelector(".date-picker") as HTMLDivElement;
			this._inputWrapEl = this.shadowRoot.querySelector(".input-wrap") as HTMLDivElement;
			// calendar icon
			this._iconContEl = this.shadowRoot.querySelector(".icon-cont") as HTMLDivElement;
			this._iconContEl.appendChild(this._iconEl);
			// clear button
			this._clearButtonEl = this.shadowRoot.querySelector(".clear-button") as HTMLDivElement;
			this._clearButtonIconEl = this._clearButtonEl.querySelector(".icon") as HTMLDivElement;
			// input field
			this._inputContEl = this.shadowRoot.querySelector(".input-cont") as HTMLDivElement;
			this._inputEl = this.shadowRoot.getElementById("input") as HTMLInputElement;
			// placeholder
			this._inputContEl.insertBefore(this._placeholderEl, this._inputEl);
			// prefix / suffix
			this._prefixSlotEl = this.shadowRoot.querySelector(`slot[name="prefix"]`) as HTMLSlotElement;
			this._suffixSlotEl = this.shadowRoot.querySelector(`slot[name="suffix"]`) as HTMLSlotElement;
			// footer
			this._footerEl = this.shadowRoot.querySelector(".footer") as HTMLDivElement;
			
			// add event listeners to component template
			this._datePickerClickEvent = this._onDatePickerClick.bind(this);
			this._datePickerEl.addEventListener("click", this._datePickerClickEvent);
			this._inputEvent = this._onInput.bind(this);
			this._inputEl.addEventListener("input", this._inputEvent);
			this._focusInputEvent = this._onFocus.bind(this);
			this._inputEl.addEventListener("focus", this._focusInputEvent);
			this._blurInputEvent = this._onBlur.bind(this);
			this._inputEl.addEventListener("blur", this._blurInputEvent);
			this._clearButtonClickEvent = this._onClearButtonClick.bind(this);
			this._clearButtonIconEl.addEventListener("click", this._clearButtonClickEvent);
			this._iconClickEvent = this._onIconClick.bind(this);
			this._iconContEl.addEventListener("click", this._iconClickEvent);
			this._prefixSlotChangeEvent = this._onPrefixSlotChanged.bind(this);
			this._prefixSlotEl.addEventListener("slotchange", this._prefixSlotChangeEvent);
			this._suffixSlotChangeEvent = this._onSuffixSlotChanged.bind(this);
			this._suffixSlotEl.addEventListener("slotchange", this._suffixSlotChangeEvent);
			// overlay event
			this._postMessageEvent = this._onPostMessage.bind(this);
			// initialize debouncers
			this._evaluateUserInputDebounce = debounce(this._evaluateUserInput.bind(this), 50);
		}
	}

	connectedCallback(): void {
		// initial update
		this._ready = true;
		this._updateComponent();
		this._updateDisplayValue();
	}

	disconnectedCallback(): void {
		// remove event listeners from component template
		this._datePickerEl.removeEventListener("click", this._datePickerClickEvent);
		this._inputEl.removeEventListener("input", this._inputEvent);
		this._inputEl.removeEventListener("focus", this._focusInputEvent);
		this._inputEl.removeEventListener("blur", this._blurInputEvent);
		this._clearButtonIconEl.removeEventListener("click", this._clearButtonClickEvent);
		this._iconContEl.removeEventListener("click", this._iconClickEvent);
		this._prefixSlotEl.removeEventListener("slotchange", this._prefixSlotChangeEvent);
		this._suffixSlotEl.removeEventListener("slotchange", this._suffixSlotChangeEvent);

		// cancel debouncers
		this._evaluateUserInputDebounce.cancel();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// ignore if value did not change
		if (_oldValue === _newValue) {
			return;
		}

		switch (_name) {
			case "disable-auto-open":
				this._disableAutoOpen = parseBooleanAttribute(_newValue);
				break;

			case "disable-quick-select":
				this._disableQuickSelect = parseBooleanAttribute(_newValue);
				break;

			case "format":
				this._format = _newValue;
				break;

			case "min":
				this._min = _newValue;
				break;

			case "max":
				this._max = _newValue;
				break;

			case "label":
				this._label = _newValue;
				break;

			case "help-text":
				this._helpText = _newValue;
				break;

			case "error-message":
				this._errorMessage = _newValue;
				break;

			case "icon":
				this._icon = _newValue;
				// update icon element
				this._iconEl.icon = this._icon;
				break;

			case "icon-position":
				this._iconPosition = _newValue ?? "right";
				break;

			case "readonly":
				this._readonly = parseBooleanAttribute(_newValue);
				// update input readonly property
				this._inputEl.readOnly = this._readonly;
				if (this._readonly) {
					this._placeholderEl.stop();
				} else if (!this._disabled && !this._working) {
					this._placeholderEl.reset();
				}
				break;

			case "working":
				this._working = parseBooleanAttribute(_newValue);
				// stop/start placeholder animation
				if (this._working) {
					this._placeholderEl.stop();
				} else if (!this._disabled && !this._readonly) {
					this._placeholderEl.reset();
				}
				break;

			case "disabled":
				this._disabled = parseBooleanAttribute(_newValue);
				// update input disabled property
				this._inputEl.disabled = this._disabled;
				// update tab index
				this._inputEl.tabIndex = this._disabled ? -1 : 0;
				// stop/start placeholder animation
				if (this._disabled) {
					this._placeholderEl.stop();
				} else if (!this._working && !this._readonly) {
					this._placeholderEl.reset();
				}
				break;

			case "mandatory":
				this._mandatory = parseBooleanAttribute(_newValue);
				this._inputEl.required = this._mandatory;
				break;

			case "show-clear-button":
				this._showClearButton = parseBooleanAttribute(_newValue);
				break;

			case "show-today":
				this._showToday = parseBooleanAttribute(_newValue);
				break;

			case "placeholder":
				this._placeholder = [_newValue];
				break;

			case "placeholder-interval":
				this._placeholderInterval = parseNumberAttribute(_newValue, 3000);
				this._placeholderEl.sliderInterval = this._placeholderInterval as number;
				break;

			case "autocomplete":
				this._autocomplete = _newValue;
				// update input autocomplete property
				this._inputEl.autocomplete = this._autocomplete ?? "off";
				break;

			case "autoselect":
				this._autoselect = parseBooleanAttribute(_newValue);
				break;

			case "autofocus":
				this._autofocus = parseBooleanAttribute(_newValue);
				// update input autofocus property
				if (this._autofocus) {
					this._inputEl.autofocus = this._autofocus;
				} else {
					this._inputEl.removeAttribute("autofocus");
				}
				break;

			case "spellcheck":
				this._spellcheck = parseBooleanAttribute(_newValue);
				// update input spellcheck property
				if (this._spellcheck) {
					this._inputEl.spellcheck = this._spellcheck;
				} else {
					this._inputEl.removeAttribute("spellcheck");
				}
				break;

			case "spinner-type":
				this._spinnerType = _newValue;
				this._spinnerEl.spinner = this._spinnerType;
				break;
		}
		// update component on attribute change
		this._updateComponent();
	}

	private _updateComponent(): void {
		if (this._ready) {
			// check if label is defined
			if (this._label == null || this._label === "") {
				this._labelEl.remove();
			} else {
				this._labelEl.innerHTML = this._label;
				this.shadowRoot!.insertBefore(this._labelEl, this._datePickerEl);
			}

			// check if help text is defined
			if (this._helpText == null || this._helpText === "") {
				this._helpTextEl.remove();
			} else {
				this._helpTextEl.innerHTML = this._helpText;
				// insert help text element to footer
				this._footerEl.insertBefore(this._helpTextEl, this._footerEl.firstChild);
			}

			// check if error message is defined
			if (this._errorMessage == null || this._errorMessage === "") {
				this._errorMessageEl.remove();
			} else {
				this._errorMessageEl.innerHTML = this._errorMessage;
				// insert error message element to footer
				this._footerEl.appendChild(this._errorMessageEl);
			}

			// check autocomplete value and set input autocomplete attribute accordingly
			if (this._autocomplete == null || this._autocomplete === "off") {
				this._autocomplete = "off";
				this._inputEl.autocomplete = "off";
			} else {
				this._inputEl.autocomplete = this._autocomplete;
			}

			// update spellcheck attribute of input element
			if (this._spellcheck) {
				this._inputEl.spellcheck = true;
			} else {
				this._inputEl.removeAttribute("spellcheck");
			}

			// update placeholder
			if (this._value == null || this._value === "") {
				this._placeholderEl.hide = false;
				// don't animate placeholder if component is either disabled, working or readonly 
				if (this._disabled || this._working || this._readonly) {
					this._placeholderEl.stop();
				}
				this._placeholderEl.slides = this._placeholder;
				this._placeholderEl.hide = false;
			} else {
				this._placeholderEl.hide = true;
			}

			// // update icon position
			if (this._iconPosition == null || this._iconPosition === "" || this._iconPosition === "right") {
				this._inputWrapEl.classList.remove("reverse");
			} else {
				this._inputWrapEl.classList.add("reverse");
			}

			// update clear button
			if (this._isClearButtonVisible()) {
				// add clear button to input wrap
				this._clearButtonEl.classList.add("show");
			} else {
				// remove clear button from input wrap
				this._clearButtonEl.classList.remove("show");
			}

			// update working state
			if (this._working && !this._disabled) {
				// add spinner element
				this._datePickerEl.appendChild(this._spinnerContEl);
			} else {
				// remove spinner element
				this._spinnerContEl.remove();
			}

			// update template CSS classes and parts
			this._updateTemplateCss();
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Update template CSS classes and parts */
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
		if (this._focused) {
			css.push("focused");
		}
		if (this._withPrefix) {
			css.push("with-prefix");
		}
		if (this._withSuffix) {
			css.push("with-suffix");
		}
		if (this._iconPosition == null || this._iconPosition === "" || this._iconPosition === "left") {
			css.push("icon-left");
		} else {
			css.push("icon-right");
		}
		if (this._isClearButtonVisible()) {
			css.push("clear-button-visible");
		}
		// update class names and parts
		const cssString = css.join(" ");
		this._datePickerEl.className = `date-picker ${cssString}`;
		this._datePickerEl.part = this._datePickerEl.className;

		// update input class names and parts
		this._inputEl.className = `input ${cssString}`;
		this._inputEl.part = this._inputEl.className;

		// update placeholder class names and parts
		this._placeholderEl.className = `placeholder ${cssString}`;
		this._placeholderEl.part = this._placeholderEl.className;
	}

	private _triggerInputEvent(): void {
		const event = new CustomEvent("change", {
			detail: {
				value: this._value,
			},
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(event);
	}

	/**
	 * Determines whether the clear button is visible based on the current state of the component.
	 * @returns {boolean} True if the clear button is visible, false otherwise.
	 */
	private _isClearButtonVisible(): boolean {
		return !!this._showClearButton && !!this._value && !this._disabled && !this._readonly;
	}

	private _getDatePickerPosition(): ElementDetails {
		const rect = this._datePickerEl.getBoundingClientRect();
		const top = Math.max(rect.top + window.scrollY, 0);
		const left = Math.max(rect.left + window.scrollX, 0);
		const bottom = Math.max(rect.bottom + window.scrollY, 0);
		const right = Math.max(rect.right + window.scrollX, 0);

		return {
			width: rect.width,
			height: rect.height,
			top,
			left,
			bottom,
			right,
		};
	}

	private _showOverlay(): void {
		// check if overlay element is already shown
		if (this._overlayEl?.isConnected || this._disabled || this._readonly || this._working) {
			return;
		} else {
			// create overlay element
			this._overlayEl = document.createElement("panda-date-picker-overlay");
			this._overlayEl.value = this._value;
			this._overlayEl.min = this._min;
			this._overlayEl.max = this._max;
			this._overlayEl.presetDates = this._presetDates;
			this._overlayEl.presetDatesHeader = this._presetDatesHeader;
			this._overlayEl.weekStartsOnMonday = this._weekStartsOnMonday;
			this._overlayEl.firstDayOfWeek = this._firstDayOfWeek;
			this._overlayEl.showToday = this._showToday;
			this._overlayEl.disableQuickSelect = this._disableQuickSelect;
			this._overlayEl.i18n = this._i18n;
			this._overlayEl.parentDetails = this._getDatePickerPosition();
			// add event listener
			this._overlayEl.addEventListener("post-message", this._postMessageEvent);
			// append overlay to body
			document.body.appendChild(this._overlayEl);
		}
	}

	private _hideOverlay(): void {
		if (this._overlayEl?.isConnected) {
			this._overlayEl.remove();
		}
	}

	private _evaluateUserInput(value: string): void {
		console.log(`%c ⚡ (_evaluateUserInput)`, "font-size: 24px; color: green; background: black;", value);

		// 1. check if value is empty
		if (value === "") {
			console.log(`%c ⚡ (_evaluateUserInput) 1. value is empty`, "font-size: 24px; color: green; background: black;", value);
			this._invalid = false;
			this._value = null;
			return;
		}

		// 2. check if value is a valid date
		let dateString: string | null = null;
		if (isValidDate(value)) {
			console.log(`%c ⚡ (_evaluateUserInput) 2. value is a valid date`, "font-size: 24px; color: green; background: black;", value);
			dateString = parseDateString(value);
		} else {
			// 3. check if entered value matches presets
			if (this._presetDates && getPresetDateByLabel(value, this._presetDates) != null) {
				console.log(`%c ⚡ (_evaluateUserInput) 3. value matches a preset date`, "font-size: 24px; color: green; background: black;", value);
				dateString = getPresetDateByLabel(value, this._presetDates);
			} else {
				console.log(`%c ⚡ (_evaluateUserInput) 3. value is not a valid date`, "font-size: 24px; color: green; background: black;", value);
				this._value = null;
				this._invalid = true;
				return;
			}
		}

		// 4. check if date is within min and max range
		console.log(`%c ⚡ (_evaluateUserInput) 4. dateString`, "font-size: 24px; color: green; background: black;", dateString);

		this._value = dateString;
		this._invalid = false;


		// 5. check if value changed
	}

	private _updateDisplayValue(): void {
		// if value is null or empty, set input value to empty string
		if (this._value == null || this._value === "") {
			this._inputEl.value = "";
			console.log(
				`%c ⚡ (_updateDisplayValue) 1. clear input`, 
				"font-size: 24px; color: orange; background: black;",
				this._value
			);
			return;
		}
		
		const displayValue = formatDate(this._value, this._format);
		this._inputEl.value = displayValue;
		console.log(
			`%c ⚡ (_updateDisplayValue) 2. displayValue: "${displayValue}"`, 
			"font-size: 24px; color: orange; background: black;"
		);
		console.log(
			`%c ⚡ (_updateDisplayValue) 2. format date`, 
			"font-size: 24px; color: orange; background: black;",
			this._value,
			this._format,
			displayValue
		);
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	/**
	 * Sets focus to the input element of the date picker.
	 * @param options An optional object that specifies options for focusing the element, such as `preventScroll`.
	 * If `preventScroll` is true, the page will not scroll to bring the element into view when it receives focus.
	 */
	focus(options?: FocusOptions): void {
		this._inputEl.focus(options);
	}

	/** Opens the date picker overlay, allowing the user to select a date from the calendar view. */
	open(): void {
		this._showOverlay();
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onSuffixSlotChanged(): void {
		this._withSuffix = true;
		this._updateComponent();
	}

	private _onPrefixSlotChanged(): void {
		this._withPrefix = true;
		this._updateComponent();
	}

	private _onDatePickerClick(): void {
		console.log(
			`%c ⚡ (_onDatePickerClick)`,
			"font-size: 24px; color: green; background: black;",
			this._disableAutoOpen || this._disabled || this._readonly || this._working
		);

		if (this._disableAutoOpen || this._disabled || this._readonly || this._working) {
			return;
		}
		this._showOverlay();
	}

	private _onIconClick(): void {
		console.log(`%c ⚡ (_onIconClick)`, "font-size: 24px; color: green; background: black;");
		if (this._disabled || this._readonly || this._working) {
			return;
		}
		this._inputEl.focus();
		this._showOverlay();
	}

	private _onInput(event: Event): void {
		const value = (event.target as HTMLInputElement).value.trim();
		console.log(`%c ⚡ (_onInput) value`, "font-size: 24px; color: green; background: black;", value, this._value + " (current value)");
		// console.log(`%c ⚡ (_onInput) value`, "font-size: 24px; color: green; background: black;", value);
		// step 1 - validate input value
		// for now, we will just check if the input value is a valid date string
		// in the future, we can add more validation rules (e.g., min/max date, disabled dates etc.)

		this._evaluateUserInputDebounce(value);

		// this._updateComponent();
	}

	private _onFocus(event: FocusEvent): void {
		console.log(`%c ⚡ (_onFocus)`, "font-size: 24px; color: green; background: black;");
		this._focused = true;
		// check autoselect feature
		if (this._autoselect) {
			this._inputEl.select();
		} else if (this._value != null) {
			const _inputValue = (event as any).target.value;
			// set selection caret to the end of the text
			this._inputEl.setSelectionRange(_inputValue.length, _inputValue.length);
		}
		this._updateComponent();
	}

	private _onBlur(): void {
		console.log(`%c ⚡ (_onBlur)`, "font-size: 24px; color: green; background: black;");
		this._focused = false;
		this._updateDisplayValue();
		this._updateComponent();
	}
	
	private _onClearButtonClick(): void {
		// if component is disabled, readonly or working, do nothing
		if (this._disabled || this._readonly || this._working) {
			return;
		}
		console.log(`%c ⚡ (_onClearButtonClick) value`, "font-size: 24px; color: green; background: black;", this._value);
		this._value = null;
		this._invalid = false;
		this._inputEl.focus();
		this._updateDisplayValue();
		this._triggerInputEvent();
		this._updateComponent();
	}

	private _onPostMessage(event: PostMessageEvent): void {
		console.log(
			`%c ⚡ (_onPostMessage) value`,
			"font-size: 24px; color: green; background: black;",
			event.detail
		);

		switch (event.detail.type) {
			case PostMessageEventType.Close:
				this._hideOverlay();
				break;

			case PostMessageEventType.Select:
				// ...
				break;

			case PostMessageEventType.SelectToday:
				// ...
				this._hideOverlay();
				break;

		}
	}
}

// Register the custom element
if (!customElements.get("panda-date-picker")) {
	customElements.define("panda-date-picker", PandaDatePicker);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-date-picker": PandaDatePicker;
	}
}