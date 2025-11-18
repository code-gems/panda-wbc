// types
import { PandaMultiSelectComboBoxItem } from "../index";
import { PandaMultiSelectComboBoxOverlay } from "./panda-multi-select-combo-box-overlay";
import {
	ElementDetails,
	PostMessageEvent,
	PostMessageType,
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
import { getItemDisabledFlag, getItemLabel, getItemValue, includes } from "./utils/utils";

export class PandaMultiSelectComboBox extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
	static get observedAttributes() {
		return [
			"theme",
			"label",
			"help-text",
			"error-message",
			"item-label-path",
			"item-value-path",
			"placeholder",
			"show-filter",
			"disabled",
			"working",
			"spinner-type",
			"multiselect",
			"mandatory",
		];
	}

	// theme ==========================================================================================================
	private _theme!: string;
	
	get theme(): string {
		return this._theme;
	}

	set theme(value: string) {
		if (this._theme !== value) {
			this._theme = value;
			// reflect to attribute
			this.setAttribute("theme", this._theme);
		}
	}

	// value ==========================================================================================================
	private _value!: any[];
	
	get value(): unknown {
		return this._value;
	}

	set value(value: unknown) {
		if (this._value !== value) {
			if (Array.isArray(value)) {
				// check for non-multiselect mode
				if (!this._multiselect && value.length > 1) {
					// keep only the first value
					this._value = [value[0]];
					console.warn(`⚠️ [PANDA MULTI_SELECT] Non-multiselect mode: only the first value is kept. Use the 'multiselect' attribute to enable multi-selection.`);
				} else {
					this._value = [...value];
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
	private _items!: PandaMultiSelectComboBoxItem[];

	get items(): PandaMultiSelectComboBoxItem[] {
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
	private _itemLabelPath!: string | null;

	get itemLabelPath(): string | null {
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
	private _itemValuePath!: string | null;

	get itemValuePath(): string | null {
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
	private _label!: string;

	get label(): string {
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
	private _helpText!: string;

	get helpText(): string {
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
	private _errorMessage!: string;

	get errorMessage(): string {
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
	private _placeholder!: string | string[];

	get placeholder(): string | string[] {
		return this._placeholder;
	}

	set placeholder(value: string | string[]) {
		if (this._placeholder !== value) {
			this._placeholder = value;
			// convert placeholder to an array
			const placeholders = Array.isArray(this.placeholder)
				? this.placeholder
				: [...this.placeholder];
			// this._placeholderEl.slides = placeholders;
		}
	}

	// showFilter =======================================================================================================
	private _showFilter!: boolean;
	
	get showFilter(): boolean {
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

	// disabled =======================================================================================================
	private _disabled!: boolean;
	
	get disabled(): boolean {
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

	//  working =======================================================================================================
	private _working!: boolean;
	
	get working(): boolean {
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
	private _readonly!: boolean;
	
	get readonly(): boolean {
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

	// spinnerType ====================================================================================================
	private _spinnerType!: string;
		
	get spinnerType(): string {
		return this._spinnerType;
	}

	set spinnerType(value: string) {
		if (this._spinnerType !== value) {
			this._spinnerType = value;
			// reflect to attribute
			this.setAttribute("spinner-type", this._spinnerType);
		}
	}

	// multiselect ====================================================================================================
	private _multiselect!: boolean;
	
	get multiselect(): boolean {
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
		}
	}

	// mandatory ======================================================================================================
	private _mandatory!: boolean;
	
	get mandatory(): boolean {
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
	private _showItemCount!: boolean;
	
	get showItemCount(): boolean {
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
		}
	}

	// cellRenderer ===================================================================================================

	itemRenderer!: () => string;

	// filter =========================================================================================================
	
	filter!: (item: SuperItem, searchText: string) => boolean;

	// view properties ================================================================================================

	private _parsedItems!: SuperItem[];

	// elements
	private _selectEl!: HTMLDivElement;
	private _overlayEl!: PandaMultiSelectComboBoxOverlay | null;

	// events
	private readonly _showOverlayEvent!: any;
	private readonly _closeOverlayEvent!: any;
	private readonly _postMessageEvent!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// apply component styles
		this._applyStyles();
		// initialize class properties
		this._label = "";
		this._helpText = "";
		this._errorMessage = "";
		this._placeholder = "";
		this._theme = "";
		this._items = [];
		this._value = [];
		this._itemLabelPath = null;
		this._itemValuePath = null;
		this._multiselect = false;
		this._disabled = false;
		this._working = false;
		this._spinnerType = "dots";

		this._parsedItems = [];

		// init events
		this._showOverlayEvent = this._onShowOverlay.bind(this);
		this._closeOverlayEvent = this._onCloseOverlay.bind(this);
		this._postMessageEvent = this._onPostMessage.bind(this);
		// render template
		this._render();
	}

	connectedCallback(): void {
		if (this.shadowRoot) {
			// get elements handle
			this._selectEl = this.shadowRoot.getElementById("select") as HTMLDivElement;

			// add event listeners
			this._selectEl.addEventListener("click", this._showOverlayEvent);
		}
	}

	disconnectedCallback(): void {
		// remove event listeners
		this._selectEl.removeEventListener("click", this._showOverlayEvent);
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
				this._placeholder = _newValue;
				break;
			case "multiselect":
				this._multiselect = this._parseBooleanAttribute(_newValue);
				break;
			case "show-filter":
				this._showFilter = this._parseBooleanAttribute(_newValue);
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
				break;
		}
		this._render();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	private _render() {
		if (this.shadowRoot) {
			// check for working state
			const spinnerHtml = this._working
				? /*html*/`
					<div class="spinner-cont" part="spinner-cont">
						<panda-spinner
							theme="${this._theme ?? ""}"
							part="spinner"
							spinner="${this._spinnerType ?? "dots"}"
						></panda-spinner>
					</div>
				`
				: "";
			
			// generate label html
			const labelHtml = this._label
				? /*html*/`
					<div class="label" part="label">
						${this._label}
					</div>
				`
				: "";
			// generate help text html
			const helpTextHtml = this._helpText
				? /*html*/`
					<div class="help-text" part="help-text">
						${this._helpText}
					</div>
				`
				: "";
			// generate error message html
			const errorMessageHtml = this._errorMessage
				? /*html*/`
					<div class="error-message" part="error-message">
						${this._errorMessage}
					</div>
				`
				: "";

			// render component template
			this.shadowRoot.innerHTML = /*html*/`
				${labelHtml}
				<div
					id="select"
					class="select"
					part="select"
				>
					<slot name="prefix" part="prefix"></slot>
					${this._renderItems()}
					<slot name="suffix" part="suffix"></slot>
					${spinnerHtml}
				</div>
				${helpTextHtml}
				${errorMessageHtml}
			`;
		}
	}

	private _renderItems(): string {
		console.log(
			`%c ⚡ (_renderItems)`,
			"font-size: 24px; color: crimson; background: black;",
			this._parsedItems
		);
		const itemsHtml: string[] = [];

		for (const item of this._parsedItems) {
			const { label, value, selected } = item;
			if (selected) {
				itemsHtml.push(/*html*/`
					<div>
						${label}
					</div>
				`);
			}
		}

		return /*html*/`
			<div class="items-cont" part="items-cont">
				${itemsHtml.join("\n")}
			</div>
		`;
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
			for (const item of this._items) {
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
		this._render();
	}

	private _showOverlay(): void {
		console.log(`%c ⚡ (_showOverlay)`, "font-size: 24px; color: crimson; background: black;");
		// check if overlay element is already shown
		if (this._overlayEl == null && !this._disabled && !this._working && !this._readonly) {
			// show overlay
			this._overlayEl = document.createElement("panda-multi-select-combo-box-overlay");
			this._overlayEl.items = this._parsedItems;
			this._overlayEl.multiselect = this._multiselect;
			this._overlayEl.showFilter = this._showFilter;
			this._overlayEl.parentDetails = this._getElementDetails();

			// add event listeners
			this._overlayEl.addEventListener("post-message", this._postMessageEvent);
			this._overlayEl.addEventListener("close", this._closeOverlayEvent);
			document.body.appendChild(this._overlayEl);
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onShowOverlay(event: MouseEvent): void {
		console.log(`%c ⚡ (_onShowOverlay)`, "font-size: 24px; color: crimson; background: black;", event);
		this._showOverlay();
	}

	private _onCloseOverlay(): void {
		console.log(`%c ⚡ (_onCloseOverlay)`, "font-size: 24px; color: crimson; background: black;");
		if (this._overlayEl) {
			// remove event listeners
			this._overlayEl.removeEventListener("post-message", this._postMessageEvent);
			this._overlayEl.removeEventListener("close", this._closeOverlayEvent);
			// remove overlay element from DOM
			this._overlayEl.remove();
			this._overlayEl = null;
		}
	}

	private _onPostMessage(event: PostMessageEvent): void {
		console.log(`%c ⚡ (_onPostMessage)`, "font-size: 24px; color: crimson; background: black;", event);
		const { action, value } = event.detail;

		switch (action) {
			case PostMessageType.SELECT:
				// handle item selection
				break;
			case PostMessageType.DESELECT:
				// handle item deselection
				break;
			case PostMessageType.CLOSE:
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
