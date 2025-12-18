// types
import { PandaMultiSelectComboBoxItem, PandaSelectChangeEvent, PandaSelectChangeEventDetails, PandaSelectI18nConfig } from "../index";
import { PandaMultiSelectComboBoxOverlay } from "./panda-multi-select-combo-box-overlay";
import { PandaSpinner } from "@panda-wbc/panda-spinner";
import {
	ElementDetails,
	PostMessageEvent,
	MessageType,
	SuperItem,
} from "./types";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-text-slider";
import "./panda-multi-select-combo-box-overlay";

// utils
import { getI18nConfig, getItemDisabledFlag, getItemLabel, getItemValue, includes } from "./utils/utils";
import { PandaTextSlider } from "@panda-wbc/panda-text-slider";

export class PandaMultiSelectComboBox extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";
	
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// observed attributes ============================================================================================
	static get observedAttributes() {
		return [
			"theme",
			"min",
			"max",
			"label",
			"help-text",
			"error-message",
			"item-label-path",
			"item-value-path",
			"placeholder",
			"placeholder-interval",
			"filter-placeholder",
			"filter-placeholder-interval",
			"show-filter",
			"show-item-count",
			"show-clear-button",
			"disable-auto-open",
			"hide-dropdown-button",
			"disabled",
			"working",
			"readonly",
			"auto-expand",
			"spinner-type",
			"multiselect",
			"mandatory",
		];
	}

	// theme ==========================================================================================================
	/** Theme of the component. */
	private _theme!: string;
	
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

	// value ==========================================================================================================
	/** Currently selected value(s). */
	private _value!: any[];
	
	get value() {
		return this._value;
	}

	set value(value: unknown) {
		if (this._value !== value) {
			if (Array.isArray(value)) {
				// check for non-multiselect mode
				if (!this._multiselect && value.length > 1) {
					// keep only the first value
					this._value = [value[0]];
					console.warn(
						`⚠️ [PANDA SELECT] Non-multiselect mode: only the first value is kept. 
						Use the 'multiselect' attribute to enable multi-selection.`
					);
				} else {
					this._value = value;
				}
			} else if (value == null) {
				this._value = [];
			} else {
				this._value = [value];
			}
			// parse new items
			this._parseItems();
		}
	}

	// items ==========================================================================================================
	/**
	 * Array of items for the select box to select from.
	 */
	private _items!: PandaMultiSelectComboBoxItem[];

	get items() {
		return this._items;
	}

	set items(items: PandaMultiSelectComboBoxItem[]) {
		if (this._items !== items) {
			this._items = items;
			// parse new items
			this._parseItems();
		}
	}

	// itemLabelPath ==================================================================================================
	/**
	 * Path to the label property in the item objects.
	 * Default is "label".
	 */
	private _itemLabelPath!: string | null;

	get itemLabelPath() {
		return this._itemLabelPath;
	}

	set itemLabelPath(value: string | null) {
		if (this._itemLabelPath !== value) {
			this._itemLabelPath = value;
			// parse items
			this._parseItems();
		}
	}

	// itemValuePath ==================================================================================================
	/**
	 * Path to the value property in the item objects.
	 * Default is "value".
	 */
	private _itemValuePath!: string | null;

	get itemValuePath() {
		return this._itemValuePath;
	}

	set itemValuePath(value: string | null) {
		if (this._itemValuePath !== value) {
			this._itemValuePath = value;
			// parse items
			this._parseItems();
		}
	}

	// label ==========================================================================================================
	/**
	 * Label text for the select box.
	 * Default is an empty string.
	 */
	private _label!: string;

	get label() {
		return this._label;
	}

	set label(value: string) {
		if (this._label !== value) {
			this._label = value ?? "";
			// reflect to attribute
			this.setAttribute("label", value + "");
		}
	}

	// helpText =======================================================================================================
	/**
	 * Help text to display below the select box.
	 * Default is an empty string.
	 */
	private _helpText!: string;

	get helpText() {
		return this._helpText;
	}

	set helpText(value: string) {
		if (this._helpText !== value) {
			this._helpText = value ?? "";
			// reflect to attribute
			this.setAttribute("help-text", value + "");
		}
	}

	// errorMessage ===================================================================================================
	/**
	 * Error message to display below the select box.
	 * Default is an empty string.
	 */
	private _errorMessage!: string;

	get errorMessage() {
		return this._errorMessage;
	}

	set errorMessage(value: string) {
		if (this._errorMessage !== value) {
			this._errorMessage = value ?? "";
			// reflect to attribute
			this.setAttribute("error-message", value + "");
		}
	}

	// placeholder ====================================================================================================
	/**
	 * Placeholder text for the select input field.
	 * Default is an empty string.
	 */
	private _placeholder!: string[];

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

	// placeholderInterval ============================================================================================
	/**
	 * Interval in milliseconds for updating the placeholder text.
	 * Value must be greater than or equal to 1000 ms.
	 * Default is 3000 ms.
	 */
	private _placeholderInterval!: number;

	get placeholderInterval() {
		return this._placeholderInterval;
	}

	set placeholderInterval(value: number) {
		if (this._placeholderInterval !== value) {
			const interval = Number(value);

			if (Number.isNaN(interval) || interval < 1000) {
				this._placeholderInterval = 3000;
				console.warn(`⚠️ [PANDA SELECT] placeholderInterval must be a number greater than or equal to 1000 ms.`);
				// reflect to attribute
				this.removeAttribute("placeholder-interval");
			} else {
				this._placeholderInterval = interval;
				// reflect to attribute
				this.setAttribute("placeholder-interval", this._placeholderInterval + "");
			}
		}
	}

	// showFilter =====================================================================================================
	/**
	 * If true, the overlay filter input field is shown.
	 * Default is false.
	 */
	private _showFilter!: boolean;
	
	get showFilter() {
		return this._showFilter;
	}

	set showFilter(value: boolean) {
		if (this._showFilter !== value) {
			this._showFilter = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("show-filter", "");
			} else {
				this.removeAttribute("show-filter");
			}
		}
	}

	// filterPlaceholder ==============================================================================================
	/**
	 * Placeholder text for the overlay filter input field.
	 * Default is an empty string.
	 */
	private _filterPlaceholder!: string[];

	get filterPlaceholder() {
		return this._filterPlaceholder;
	}

	set filterPlaceholder(value: string | string[]) {
		if (this._filterPlaceholder !== value) {
			if (Array.isArray(value)) {
				this._filterPlaceholder = value.map((placeholderText) => placeholderText + "");
			} else {
				this._filterPlaceholder = [value + ""];
			}
			// check if overlay is shown
			if (this._overlayEl) {
				this._overlayEl.filterPlaceholder = this._filterPlaceholder;
			}
		}
	}

	// filterPlaceholderInterval ======================================================================================
	/**
	 * Interval in milliseconds for updating the filter placeholder text.
	 * Value must be greater than or equal to 1000 ms.
	 * Default is 3000 ms.
	 */
	private _filterPlaceholderInterval!: number;

	get filterPlaceholderInterval() {
		return this._filterPlaceholderInterval;
	}

	set filterPlaceholderInterval(value: number) {
		if (this._filterPlaceholderInterval !== value) {
			const interval = Number(value);

			if (Number.isNaN(interval) || interval < 1000) {
				this._filterPlaceholderInterval = 3000;
				console.warn(`⚠️ [PANDA SELECT] filterPlaceholderInterval must be a number greater than or equal to 1000 ms.`);
				// reflect to attribute
				this.removeAttribute("filter-placeholder-interval");
			} else {
				this._filterPlaceholderInterval = interval;
				// reflect to attribute
				this.setAttribute("filter-placeholder-interval", this._filterPlaceholderInterval + "");
			}
			// check if overlay is shown
			if (this._overlayEl) {
				this._overlayEl.filterPlaceholderInterval = this._filterPlaceholderInterval;
			}
		}
	}

	// min ============================================================================================================
	/**
	 * The minimum amount of items that can be selected.
	 * Default is null (no minimum).
	 */
	private _min!: number | null;

	get min() {
		return this._min;
	}

	set min(value: number | null) {
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

	// max ============================================================================================================
	/**
	 * The maximum amount of items that can be selected.
	 * Default is null (no maximum).
	 */
	private _max!: number | null;

	get max() {
		return this._max;
	}

	set max(value: number | null) {
		if (this._max !== value) {
			if (value == null || value <= 0) {
				this._max = null;
			} else {
				this._max = value;
			}
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("max");
			} else {
				this.setAttribute("max", value + "");
			}
		}
	}

	// disabled =======================================================================================================
	/**
	 * If true, the component is disabled and cannot be interacted with.
	 * Default is false.
	 */
	private _disabled!: boolean;
	
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
			// update items
			this._renderItems();
		}
	}

	//  working =======================================================================================================
	/**
	 * If true, the component is in working state and shows a spinner.
	 * Default is false.
	 */
	private _working!: boolean;
	
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

	// readonly =======================================================================================================
	/**
	 * If true, the component is read-only and cannot be modified by the user. 
	 * Default is false.
	 */
	private _readonly!: boolean;
	
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
			// update items
			this._renderItems();
		}
	}

	// spinnerType ====================================================================================================
	/**
	 * Type of spinner to show when in working state.
	 * Default is "dots".
	 */
	private _spinnerType!: string;
		
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

	// multiselect ====================================================================================================
	/**
	 * If true, multiple items can be selected.
	 * Default is false.
	 */
	private _multiselect!: boolean;
	
	get multiselect() {
		return this._multiselect;
	}

	set multiselect(value: boolean) {
		if (this._multiselect !== value) {
			this._multiselect = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("multiselect", "");
			} else {
				this.removeAttribute("multiselect");
			}
			// update items
			this._renderItems();
		}
	}

	// autoExpand =====================================================================================================
	/**
	 * If true, the overlay will automatically expand to show all items without scrolling.
	 * Default is false.
	 */
	private _autoExpand!: boolean;

	get autoExpand() {
		return this._autoExpand;
	}

	set autoExpand(value: boolean) {
		if (this._autoExpand !== value) {
			this._autoExpand = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("auto-expand", "");
			} else {
				this.removeAttribute("auto-expand");
			}
		}
	}

	// mandatory ======================================================================================================
	private _mandatory!: boolean;
	
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

	// showItemCount ==================================================================================================
	/**
	 * If true, the count of selected items is shown in the select box.
	 * Default is false.
	 */
	private _showItemCount!: boolean;
	
	get showItemCount() {
		return this._showItemCount;
	}

	set showItemCount(value: boolean) {
		if (this._showItemCount !== value) {
			this._showItemCount = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("show-item-count", "");
			} else {
				this.removeAttribute("show-item-count");
			}
			// update items
			this._renderItems();
		}
	}

	// showClearButton ================================================================================================
	/**
	 * If true, a clear button is shown on the select box.
	 * Default is false.
	 */
	private _showClearButton!: boolean;

	get showClearButton() {
		return this._showClearButton;
	}

	set showClearButton(value: boolean) {
		if (this._showClearButton !== value) {
			this._showClearButton = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("show-clear-button", "");
			} else {
				this.removeAttribute("show-clear-button");
			}
		}
	}

	// hideDropdownButton =============================================================================================
	/**
	 * If true, the dropdown button is hidden on the select box.
	 * Incompatible with disableAutoOpen=true.
	 * Default is false.
	 */
	private _hideDropdownButton!: boolean;

	get hideDropdownButton() {
		return this._hideDropdownButton;
	}

	set hideDropdownButton(value: boolean) {
		if (this._hideDropdownButton !== value) {
			this._hideDropdownButton = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("hide-dropdown-button", "");
			} else {
				this.removeAttribute("hide-dropdown-button");
			}
		}
	}

	// disableAutoOpen ================================================================================================
	/**
	 * If true, the overlay will not open automatically when the select box is clicked.
	 * Default is false.
	 */
	private _disableAutoOpen!: boolean;

	get disableAutoOpen() {
		return this._disableAutoOpen;
	}

	set disableAutoOpen(value: boolean) {
		if (this._disableAutoOpen !== value) {
			this._disableAutoOpen = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("disable-auto-open", "");
			} else {
				this.removeAttribute("disable-auto-open");
			}
		}
	}

	// i18n ===========================================================================================================
	private _i18n!: PandaSelectI18nConfig;

	get i18n() {
		return this._i18n;
	}

	set i18n(value: PandaSelectI18nConfig) {
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

	// customStyle ====================================================================================================
	private _customStyle!: string;

	get customStyle() {
		return this._customStyle;
	}

	set customStyle(value: string) {
		if (this._customStyle !== value) {
			this._customStyle = value;
			// apply custom style to overlay if exists
			if (this._overlayEl) {
				this._overlayEl.customStyle = value;
			}
		}
	}

	// groupRenderer ==================================================================================================

	groupRenderer!: (groupName: string, items: SuperItem[]) => string;

	// cellRenderer ===================================================================================================

	itemRenderer!: (item: SuperItem) => string;

	// footerRenderer =================================================================================================

	footerRenderer!: (items: SuperItem[]) => string;

	// filter =========================================================================================================
	
	filter!: (item: SuperItem, searchText: string) => boolean;

	// view properties ================================================================================================

	private _parsedItems!: SuperItem[];
	/** Flag to indicate if the component is ready. */
	private _showMandatoryFlag!: boolean;
	private _withPrefix!: boolean;
	private _withSuffix!: boolean;
	private _ready!: boolean;

	// elements
	private _overlayEl!: PandaMultiSelectComboBoxOverlay | null;
	private readonly _selectEl!: HTMLDivElement;
	private readonly _itemsContEl!: HTMLDivElement;
	private readonly _itemsEl!: HTMLDivElement;
	private readonly _spinnerEl!: PandaSpinner;
	private readonly _spinnerContEl!: HTMLDivElement;
	private readonly _placeholderEl!: PandaTextSlider;
	private readonly _iconEl!: HTMLDivElement;
	private readonly _clearButtonEl!: HTMLDivElement;
	private readonly _clearButtonIconEl!: HTMLDivElement;
	private readonly _labelEl!: HTMLDivElement;
	private readonly _helpTextEl!: HTMLDivElement;
	private readonly _errorMessageEl!: HTMLDivElement;
	private readonly _prefixSlotEl!: HTMLSlotElement;
	private readonly _suffixSlotEl!: HTMLSlotElement;

	// events
	private readonly _keyDownEvent!: any;
	private readonly _showOverlayEvent!: any;
	private readonly _closeOverlayEvent!: any;
	private readonly _postMessageEvent!: any;
	private readonly _iconButtonClickEvent!: any;
	private readonly _clearButtonClickEvent!: any;
	private readonly _removeItemEvent!: any;
	private readonly _prefixSlotChangeEvent!: any;
	private readonly _suffixSlotChangeEvent!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });

		// apply component styles
		this._applyStyles();

		// create component template
		const template = document.createElement("template");
		template.innerHTML = /*html*/`
			<div
				id="select"
				class="select"
				part="select"
			>
				<slot name="prefix" part="prefix"></slot>
				<div
					id="items-cont"
					class="items-cont"
					part="items-cont"
				>
					<div
						id="items"
						class="items"
						part="items"
					></div>
				</div>
				<slot name="suffix" part="suffix"></slot>
				<div
					id="icon"
					class="icon"
					part="icon"
				>
					<panda-icon icon="chevron-down" part="icon-image"></panda-icon>
				</div>
			</div>
		`;

		// create spinner element
		this._spinnerContEl = document.createElement("div");
		this._spinnerContEl.className = "spinner-cont";
		this._spinnerContEl.part = "spinner-cont";
		this._spinnerContEl.innerHTML = /*html*/`<panda-spinner part="spinner"></panda-spinner>`;
		// get spinner element handle
		this._spinnerEl = this._spinnerContEl.querySelector("panda-spinner") as PandaSpinner;
		this._spinnerEl.spinner = this._spinnerType ?? "dots";

		// create placeholder element
		this._placeholderEl = document.createElement("panda-text-slider");
		this._placeholderEl.className = "placeholder";
		this._placeholderEl.part = "placeholder";
		this._placeholderEl.hide = true;

		// create clear button element
		this._clearButtonEl = document.createElement("div");
		this._clearButtonEl.className = "clear-button";
		this._clearButtonEl.part = "clear-button";
		this._clearButtonEl.innerHTML = /*html*/`
			<div
				id="clear-button-icon"
				class="clear-button-icon"
				part="clear-button-icon"
			>
				<panda-icon icon="close"></panda-icon>
			</div>
		`;
		// get clear button icon element handle
		this._clearButtonIconEl = this._clearButtonEl.querySelector("#clear-button-icon") as HTMLDivElement;

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

		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._i18n = getI18nConfig();
		this._spinnerType = "dots";
		this._label = "";
		this._helpText = "";
		this._errorMessage = "";
		this._placeholder = [];
		this._filterPlaceholder = [];
		this._theme = "";
		this._items = [];
		this._value = [];
		this._itemLabelPath = null;
		this._itemValuePath = null;
		this._min = null;
		this._max = null;
		this._autoExpand = false;
		this._multiselect = false;
		this._disabled = false;
		this._working = false;
		this._showFilter = false;
		this._readonly = false;
		this._mandatory = false;
		this._showItemCount = false;
		this._showClearButton = false;
		this._showMandatoryFlag = false;
		this._disableAutoOpen = false;
		this._hideDropdownButton = false;
		this._placeholderInterval = 3000;
		this._filterPlaceholderInterval = 3000;
		this._parsedItems = [];
		this._withPrefix = false;
		this._withSuffix = false;
		this._ready = false;
		
		// init events
		this._keyDownEvent = this._onKeyDown.bind(this);
		this._showOverlayEvent = this._onShowOverlay.bind(this);
		this._closeOverlayEvent = this._onCloseOverlay.bind(this);
		this._postMessageEvent = this._onPostMessage.bind(this);
		this._iconButtonClickEvent = this._onIconClick.bind(this);
		this._clearButtonClickEvent = this._onClearButtonClick.bind(this);
		this._removeItemEvent = this._onRemoveItem.bind(this);
		this._prefixSlotChangeEvent = this._onPrefixSlotChanged.bind(this);
		this._suffixSlotChangeEvent = this._onSuffixSlotChanged.bind(this);

		// get template element handles
		if (this.shadowRoot) {
			// get elements handle
			this._selectEl = this.shadowRoot.getElementById("select") as HTMLDivElement;
			this._itemsContEl = this.shadowRoot.getElementById("items-cont") as HTMLDivElement;
			this._itemsEl = this.shadowRoot.getElementById("items") as HTMLDivElement;
			this._iconEl = this.shadowRoot.getElementById("icon") as HTMLDivElement;
			this._itemsContEl.insertBefore(this._placeholderEl, this._itemsEl);
			this._prefixSlotEl = this.shadowRoot.querySelector(`slot[name="prefix"]`) as HTMLSlotElement;
			this._suffixSlotEl = this.shadowRoot.querySelector(`slot[name="suffix"]`) as HTMLSlotElement;

			// add event listeners
			window.addEventListener("resize", this._closeOverlayEvent);
			this._selectEl.addEventListener("click", this._showOverlayEvent);
			this._selectEl.addEventListener("keydown", this._keyDownEvent);
			this._clearButtonIconEl.addEventListener("click", this._clearButtonClickEvent);
			this._iconEl.addEventListener("click", this._iconButtonClickEvent);
			this._itemsEl.addEventListener("click", this._removeItemEvent);
			this._prefixSlotEl.addEventListener("slotchange", this._prefixSlotChangeEvent);
			this._suffixSlotEl.addEventListener("slotchange", this._suffixSlotChangeEvent);
		}
	}

	connectedCallback(): void {
		this._ready = true;
		this._evaluateMandatoryFlag();
		this._updateComponent();
	}

	disconnectedCallback(): void {
		// remove event listeners
		window.removeEventListener("resize", this._closeOverlayEvent);
		this._selectEl.removeEventListener("click", this._showOverlayEvent);
		this._selectEl.removeEventListener("keydown", this._keyDownEvent);
		this._clearButtonIconEl.removeEventListener("click", this._clearButtonClickEvent);
		this._iconEl.removeEventListener("click", this._iconButtonClickEvent);
		this._itemsEl.removeEventListener("click", this._removeItemEvent);
		this._prefixSlotEl.removeEventListener("slotchange", this._prefixSlotChangeEvent);
		this._suffixSlotEl.removeEventListener("slotchange", this._suffixSlotChangeEvent);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// do not process if value did not change
		if (_oldValue === _newValue) {
			return;
		}
		switch (_name) {
			case "theme":
				this._theme = _newValue;
				break;
			case "item-label-path":
				this._itemLabelPath = _newValue;
				break;
			case "item-value-path":
				this._itemValuePath = _newValue;
				break;
			case "min":
				this._min = this._parseNumberAttribute(_newValue);
				break;
			case "max":
				this._max = this._parseNumberAttribute(_newValue);
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
			case "placeholder":
				this._placeholder = [_newValue];
				break;
			case "placeholder-interval":
				this.placeholderInterval = this._parseNumberAttribute(_newValue) ?? 3000;
				this._placeholderEl.sliderInterval = this._placeholderInterval;
				break;
			case "filter-placeholder":
				this._filterPlaceholder = _newValue;
				break;
			case "filter-placeholder-interval":
				this.filterPlaceholderInterval = this._parseNumberAttribute(_newValue) ?? 3000;
				break;
			case "auto-expand":
				this._autoExpand = this._parseBooleanAttribute(_newValue);
				break;
			case "mandatory":
				this._mandatory = this._parseBooleanAttribute(_newValue);
				break;
			case "multiselect":
				this._multiselect = this._parseBooleanAttribute(_newValue);
				break;
			case "show-item-count":
				this._showItemCount = this._parseBooleanAttribute(_newValue);
				break;
			case "show-clear-button":
				this._showClearButton = this._parseBooleanAttribute(_newValue);
				break;
			case "show-filter":
				this._showFilter = this._parseBooleanAttribute(_newValue);
				break;
			case "hide-dropdown-button":
				this._hideDropdownButton = this._parseBooleanAttribute(_newValue);
				break;
			case "disable-auto-open":
				this._disableAutoOpen = this._parseBooleanAttribute(_newValue);
				break;
			case "disabled":
				this._disabled = this._parseBooleanAttribute(_newValue);
				break;
			case "working":
				this._working = this._parseBooleanAttribute(_newValue);
				break;
			case "readonly":
				this._readonly = this._parseBooleanAttribute(_newValue);
				break;
			case "spinner-type":
				this._spinnerType = _newValue;
				this._spinnerEl.spinner = this._spinnerType;
				break;
		}
		this._evaluateMandatoryFlag();
		this._updateComponent();
	}

	private _updateComponent(): void {
		if (this._ready) {
			// make component focusable
			if (this._disabled || this._working) {
				this._selectEl.tabIndex = -1;
			} else {
				this._selectEl.tabIndex = 0;
			}
			
			// close overlay if component is disabled, working or readonly
			if (this._disabled || this._working || this._readonly) {
				this._onCloseOverlay();
			}

			// show or hide placeholder
			if (this._value.length) {
				this._placeholderEl.hide = true;
			} else {
				// stop placeholder animation if component is disabled, working or readonly
				if (this._disabled || this._working || this._readonly) {
					this._placeholderEl.stop();
				}

				this._placeholderEl.slides = this._placeholder;
				this._placeholderEl.hide = false;
			}

			// add or remove spinner
			if (this._working) {
				this._selectEl.appendChild(this._spinnerContEl);
			} else {
				this._spinnerContEl.remove();
			}

			// add or remove label
			if (this._label) {
				this._labelEl.textContent = this._label;
				this.shadowRoot!.insertBefore(this._labelEl, this._selectEl);
			} else {
				this._labelEl.remove();
			}

			// add or remove label
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

			// show clear button
			if (
				this._showClearButton &&
				this._value.length &&
				!this._disabled &&
				!this._readonly &&
				!this._working
			) {
				// insert clear button before dropdown icon
				this._selectEl.insertBefore(this._clearButtonEl, this._iconEl);
			} else {
				this._clearButtonEl.remove();
			}

			// warn about incompatible features
			if (this._hideDropdownButton && this._disableAutoOpen) {
				console.warn(`⚠️ [PANDA SELECT] hide-dropdown-button cannot be used together with disable-auto-open.`);
			}

			// update template css classes and parts
			this._updateTemplateCss();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	/** Render the items in the select box. */
	private _renderItems(): void {
		// render selected items
		if (this._multiselect) {
			// check if show item count is enabled
			if (this._showItemCount) {
				const selectedItemsLabel = this._i18n.selectedItems ?? "Selected items";
				const itemCount = this._parsedItems.filter((item) => item.selected).length;
				if (itemCount === this._parsedItems.length) {
					const allItemsLabel = this._i18n.allItems ?? "All";
					// update items element
					this._itemsEl.innerHTML = /*html*/`
						<div
							class="item single-item"
							part="item single-item"
						>
							${allItemsLabel} (${itemCount})
						</div>
					`;
				} else if (itemCount > 0) {
					// update items element
					this._itemsEl.innerHTML = /*html*/`
						<div
						class="item single-item"
						part="item single-item"
						>
							${selectedItemsLabel} (${itemCount})
						</div>
					`;
				} else {
					this._itemsEl.innerHTML = "";
				}
			} else {
				const itemsHtml: string[] = [];

				for (const [index, item] of this._parsedItems.entries()) {
					const { label, selected, disabled } = item;

					if (selected) {
						const removeBtnHtml = disabled || this._readonly || this._disabled
							? ""
							: /*html*/`
								<div
									class="remove-button"
									part="remove-button"
									data-index="${index}"
								>
									<panda-icon icon="close" part="remove-button-icon"></panda-icon>
								</div>
							`;

						itemsHtml.push(/*html*/`
							<div class="item chip" part="item chip">
								<div class="label">${label}</div>
								${removeBtnHtml}
							</div>
						`);
					}
				}
				// update items element
				this._itemsEl.innerHTML = itemsHtml.join("");
			}
		} else {
			const itemsHtml: string[] = [];

			for (const item of this._parsedItems) {
				const { label, selected } = item;
				if (selected) {
					itemsHtml.push(/*html*/`
						<div
							class="item single-item"
							part="item single-item"
						>
							${label}
						</div>
					`);
				}
			}
			// update items element
			this._itemsEl.innerHTML = itemsHtml.join("");
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Apply component styles to shadow root. */
	private _applyStyles(): void {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	/**
	 * Parses an attribute value to boolean.
	 * @param value value to parse
	 * @description Parses a value to boolean. If the value is "true" or true, it returns true, otherwise false.
	 * @returns {Boolean}
	 */
	private _parseBooleanAttribute(value: unknown): boolean {
		return value === "true" || value === true || value === "";
	}

	/**
	 * Parses an attribute value to a number
	 * @param value value to parse
	 * @param {Number} fallbackValue fallback value if provided value is invalid
	 * @returns {Number}
	 */
	private _parseNumberAttribute(value: unknown, fallbackValue: number | null = null): number | null {
		// check for null and undefined
		if (value == null) {
			return fallbackValue;
		}
		// check if already a number and if it's valid
		if (typeof value === "number") {
			return Number.isNaN(value) || !Number.isFinite(value)
				? fallbackValue
				: value;
		}
		// Try to parse as number
		const parsedValue = Number(value);
		// return fallback if parsing resulted in NaN or infinity
		return Number.isNaN(parsedValue) || !Number.isFinite(parsedValue)
			? fallbackValue
			: parsedValue;
	}

	/**
	 * Get details about the select element
	 * @returns {ElementDetails} details about the select element
	 */
	private _getElementDetails(): ElementDetails {
		const rect = this._selectEl.getBoundingClientRect();
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

	private _parseItems(): void {
		// clear items
		this._parsedItems = [];

		if (Array.isArray(this._items)) {
			// for non-multiselect mode, track if an item is already selected
			let alreadySelected = false;
			// parse items
			for (const [index, item] of this._items.entries()) {
				const group = item.group ?? "";
				const label = getItemLabel(item, this._itemLabelPath);
				const value = getItemValue(item, this._itemValuePath);
				const disabled = getItemDisabledFlag(item);
				const isSelected = includes(this._value, value);
				let selected = false;

				if (this._multiselect) {
					// allow multiple selected items
					selected = isSelected;
				} else if (isSelected && !alreadySelected) {
					// allow only 1 selected item
					selected = true;
					// mark that an item is selected
					alreadySelected = true;
				}

				this._parsedItems.push({
					index,
					group,
					label,
					value,
					selected,
					disabled,
					active: false,
				});
			}
		} else {
			this._parsedItems = [];
		}
		// update items
		this._renderItems();
	}

	private _showOverlay(): void {
		// check if overlay element is already shown
		if (this._overlayEl == null && !this._disabled && !this._working && !this._readonly) {
			// show overlay
			this._overlayEl = document.createElement("panda-multi-select-combo-box-overlay");
			this._overlayEl.items = this._parsedItems;
			this._overlayEl.multiselect = this._multiselect;
			this._overlayEl.max = this._max;
			this._overlayEl.showFilter = this._showFilter;
			this._overlayEl.filterPlaceholder = this._filterPlaceholder;
			this._overlayEl.filterPlaceholderInterval = this._filterPlaceholderInterval;
			this._overlayEl.i18n = this._i18n;
			this._overlayEl.parentDetails = this._getElementDetails();
			this._overlayEl.customStyle = this._customStyle;
			this._overlayEl.groupRenderer = this.groupRenderer;
			this._overlayEl.itemRenderer = this.itemRenderer;
			this._overlayEl.footerRenderer = this.footerRenderer;
			this._overlayEl.filter = this.filter;
			// check for css variables
			// const overlayWidth = getComputedStyle(this).getPropertyValue("--panda-select-overlay-width");
			// this._overlayEl.dropdownWidth = overlayWidth || this._overlayWidth;

			// add event listeners
			this._overlayEl.addEventListener("post-message", this._postMessageEvent);
			this._overlayEl.addEventListener("close", this._closeOverlayEvent);
			document.body.appendChild(this._overlayEl);

			// add rotate class from icon element
			this._iconEl.classList.add("rotate");
		}
	}

	private _triggerChangeEvent(): void {
		const value: string | string[] = this._multiselect
				? [...this._value]
				: this._value[0];
		const event: PandaSelectChangeEvent = new CustomEvent("change", {
			detail: {
				value,
			},
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(event);
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
		this._selectEl.className = `select ${cssString}`;
		this._selectEl.part = this._selectEl.className;
		this._itemsContEl.className = `items-cont ${cssString}`;
		this._itemsContEl.part = this._itemsContEl.className;
		this._prefixSlotEl.part = this._withPrefix ? `prefix ${cssString}` : "prefix";
		this._suffixSlotEl.part = this._withSuffix ? `suffix ${cssString}` : "suffix";

		// add feature specific classes
		if (this._autoExpand) {
			this._selectEl.classList.add("auto-expand");
		} else {
			this._selectEl.classList.remove("auto-expand");
		}
		
		// show or hide dropdown icon
		if (this._hideDropdownButton) {
			this._selectEl.classList.add("hide-dropdown-button");
		} else {
			this._selectEl.classList.remove("hide-dropdown-button");
		}

		// add gap if component has help or error message
		if (this._helpText || this._errorMessage) {
			this._selectEl.classList.add("with-message");
		} else {
			this._selectEl.classList.remove("with-message");
		}
	}

	/** Update mandatory flag */
	private _evaluateMandatoryFlag(): void {
		// evaluate only for default component state
		if (this._mandatory && !this._disabled && !this._working && !this._readonly) {
			if (this._multiselect) {
				if (
					this._min == null && this._value.length > 0 ||
					this._min != null && this._value.length >= this._min
				) {
					this._showMandatoryFlag = false;
				} else {
					this._showMandatoryFlag = true;
				}
			} else if (!this._multiselect && this._value.length > 0) {
				this._showMandatoryFlag = false;
			} else {
				this._showMandatoryFlag = true;
			}
		} else {
			this._showMandatoryFlag = false;
		}
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

	private _onKeyDown(event: KeyboardEvent): void {
		switch (event.code) {
			case "ArrowUp":
			case "ArrowDown":
				event.preventDefault();
				this._showOverlay();
				break;
			case "ArrowLeft":
			case "ArrowRight":
				event.preventDefault();
				break;
			case "Tab":
			case "Escape":
				this._onCloseOverlay();
				break;
		}
	}

	private _onShowOverlay(): void {
		// check if auto open is disabled
		if (this._disableAutoOpen) {
			return;
		}
		this._showOverlay();
	}

	private _onIconClick(): void {
		// check if auto open is disabled
		if (this._disableAutoOpen) {
			this._showOverlay();
		}
	}

	private _onCloseOverlay(): void {
		if (this._overlayEl) {
			// remove event listeners
			this._overlayEl.removeEventListener("post-message", this._postMessageEvent);
			this._overlayEl.removeEventListener("close", this._closeOverlayEvent);
			// remove overlay element from DOM
			this._overlayEl.remove();
			this._overlayEl = null;
			// remove rotate class from icon element
			this._iconEl.classList.remove("rotate");
			// set focus back to element
			this.focus();
		}
	}

	private _onClearButtonClick(event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation();
		// clear value
		this._parsedItems = this._parsedItems.map((item) => {
			// only deselect item if not disabled
			item.selected = item.disabled
				? item.selected
				: false;
			return item;
		});
		// update value
		this._value = this._parsedItems
			.filter((item) => item.selected)
			.map((item) => item.value);
		this._renderItems();
		this._evaluateMandatoryFlag();
		this._triggerChangeEvent();
		this._updateComponent();
	}

	private _onRemoveItem(event: MouseEvent): void {
		const removeBtn = (event.target as HTMLElement).closest(".remove-button") as HTMLDivElement;

		if (removeBtn) {
			// prevent opening overlay
			event.preventDefault();
			event.stopPropagation();

			// get index of item to remove
			const index = Number.parseInt(removeBtn.dataset["index"] || "-1", 10);
			// deselect item
			this._parsedItems[index].selected = false;
			
			// update value
			this._value = this._parsedItems
				.filter((item) => item.selected)
				.map((item) => item.value);
			this._renderItems();
			this._evaluateMandatoryFlag();
			this._triggerChangeEvent();
			this._updateComponent();
		}
	}

	private _onPostMessage(event: PostMessageEvent): void {
		const { messageType, items } = event.detail;

		switch (messageType) {
			case MessageType.UPDATE:
				// handle item selection
				this._value = items
					.filter((item) => item.selected)
					.map((item) => item.value);
				this._parsedItems = items;
				// update items in select box
				this._renderItems();
				this._evaluateMandatoryFlag();
				this._triggerChangeEvent();
				this._updateComponent();
				break;
			case MessageType.UPDATE_AND_CLOSE:
				// handle item selection
				this._value = items
					.filter((item) => item.selected)
					.map((item) => item.value);
				this._parsedItems = items;
				// update items in select box
				this._renderItems();
				this._evaluateMandatoryFlag();
				this._triggerChangeEvent();
				this._onCloseOverlay();
				this._updateComponent();
				break;
			case MessageType.CLOSE:
				this._onCloseOverlay();
				break;
		}
	}
}

// Register the custom element
if (!customElements.get("panda-multi-select-combo-box")) {
	customElements.define("panda-multi-select-combo-box", PandaMultiSelectComboBox);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-multi-select-combo-box": PandaMultiSelectComboBox;
	}
}
