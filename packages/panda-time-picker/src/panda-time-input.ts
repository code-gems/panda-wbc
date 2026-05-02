// types
import { TimeInputValue } from "./types";

// styles
import { styles } from "./styles/time-picker-input-styles";

// utils
import { applyStyles, parseInputModeAttribute, parseNumberAttribute } from "@panda-wbc/panda-utils/lib/component-utils";
import { validKeyInput } from "./utils/utils";

const DEFAULT_MAX_VALUE = 59;
const DEFAULT_MIN_VALUE = 0;

export class PandaTimeInput extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// observed attributes ============================================================================================
	static get observedAttributes() {
		return [
			"value",
			"placeholder",
			"max",
			"min",
			"input-mode"
		];
	}

	/**
	 * value
	 * ---
	 * Currently selected time value.
	 * @type {TimeInputValue}
	 * @default null
	 * @attr value
	 * @public
	 * @example
	 * ```html
	 * <panda-time-input value="14"></panda-time-input>
	 * ```
	 */
	get value() {
		return this._value;
	}

	set value(value: TimeInputValue) {
		if (this._value !== value) {
			this._value = parseNumberAttribute(value);
		}
	}

	private _value!: TimeInputValue;

	/**
	 * placeholder
	 * ---
	 * Defines the placeholder text for the input field when it is empty. 
	 * This text typically provides a hint to the user about what kind of input is expected (e.g., "HH" for time input). 
	 * The placeholder text is displayed inside the input field and disappears when the user starts typing.
	 * @type {string}
	 * @default ""
	 * @attr placeholder
	 * @public
	 * @example
	 * ```html
	 * <panda-time-input placeholder="HH"></panda-time-input>
	 * ```
	 */
	get placeholder() {
		return this._placeholder;
	}

	set placeholder(value: string) {
		if (this._placeholder !== value) {
			this._placeholder = value + "";
			// reflect to attribute
			if (value) {
				this.setAttribute("placeholder", value + "");
			} else {
				this.removeAttribute("placeholder");
			}
		}
	}

	private _placeholder!: string;

	/**
	 * max
	 * ---
	 * Defines the maximum time value that can be entered in the input field.
	 * @type {number}
	 * @default 59
	 * @attr max
	 * @public
	 * @example
	 * ```html
	 * <panda-time-input max="24"></panda-time-input>
	 * ```
	 */
	get max() {
		return this._max;
	}

	set max(value: number) {
		if (this._max !== value) {
			this._max = parseNumberAttribute(value) ?? DEFAULT_MAX_VALUE;
		}
	}

	private _max!: number;

	/**
	 * min
	 * ---
	 * Defines the minimum time value that can be entered in the input field.
	 * @type {number}
	 * @default 0
	 * @attr min
	 * @public
	 * @example
	 * ```html
	 * <panda-time-input min="0"></panda-time-input>
	 * ```
	 */
	get min() {
		return this._min;
	}

	set min(value: number) {
		if (this._min !== value) {
			this._min = parseNumberAttribute(value) ?? DEFAULT_MIN_VALUE;
		}
	}

	private _min!: number;

	/**
	 * inputMode
	 * ---
	 * Specifies the type of virtual keyboard to display on mobile devices when the input field is focused.
	 * @type {string}
	 * @default "numeric"
	 * @attr input-mode
	 * @public
	 * @example
	 * ```html
	 * <panda-time-input input-mode="numeric"></panda-time-input>
	 * ```
	 */
	get inputMode() {
		return this._inputMode;
	}

	set inputMode(_value: string) {
		if (this._inputMode !== _value) {
			this._inputMode = parseInputModeAttribute(_value);
			this._inputEl.setAttribute("input-mode", this._inputMode);
		}
	}

	private _inputMode!: string;

	// private properties =============================================================================================

	private _inputOffset!: number;
	private _focused!: boolean;

	// elements
	private readonly _inputEl!: HTMLDivElement;

	// events
	private readonly _inputKeyDownEvent!: (event: KeyboardEvent) => void;
	private readonly _inputFocusEvent!: EventListener;
	private readonly _inputBlurEvent!: EventListener;
	private readonly _cancelEvent!: EventListener;
	private readonly _inputClickEvent!: EventListener;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// apply component template
		this.shadowRoot!.innerHTML = /*html*/`
			<div
				contenteditable="true"
				class="time-input"
				part="time-input"
			></div>
		`;
		// apply component styles
		applyStyles(styles, this.shadowRoot);

		// initialize properties
		this._value = null;
		this._placeholder = "";
		this._inputMode = "numeric";
		this._inputOffset = 0;
		this._focused = false;
		this._max = DEFAULT_MAX_VALUE;
		this._min = DEFAULT_MIN_VALUE;

		// initialize event binders
		this._inputKeyDownEvent = this._onInputKeyDown.bind(this);
		this._inputFocusEvent = this._onInputFocus.bind(this);
		this._inputBlurEvent = this._onInputBlur.bind(this);
		this._inputClickEvent = this._onInputClick.bind(this);
		this._cancelEvent = this._onPreventEvent.bind(this);

		// get elements handles
		if (this.shadowRoot) {
			this._inputEl = this.shadowRoot.querySelector(".time-input") as HTMLDivElement;
			this._inputEl.spellcheck = false;
			this._inputEl.autocorrect = false;
			this._inputEl.autocapitalize = "off";
			this._inputEl.draggable = false;
		}
	}

	connectedCallback() {
		// attach event listeners
		this._inputEl.addEventListener("keydown", this._inputKeyDownEvent);
		this._inputEl.addEventListener("click", this._inputClickEvent);
		this._inputEl.addEventListener("focus", this._inputFocusEvent);
		this._inputEl.addEventListener("blur", this._inputBlurEvent);
		this._inputEl.addEventListener("dragstart", this._cancelEvent);
		this._inputEl.addEventListener("mousedown", this._cancelEvent);
		// initial render
		this._updateComponent();
	}

	disconnectedCallback() {
		// detach event listeners
		this._inputEl.removeEventListener("keydown", this._inputKeyDownEvent);
		this._inputEl.removeEventListener("click", this._inputClickEvent);
		this._inputEl.removeEventListener("focus", this._inputFocusEvent);
		this._inputEl.removeEventListener("blur", this._inputBlurEvent);
		this._inputEl.removeEventListener("dragstart", this._cancelEvent);
		this._inputEl.removeEventListener("mousedown", this._cancelEvent);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// check if value has actually changed
		if (_oldValue == _newValue) {
			return;
		}

		switch (_name) {
			case "value":
				this._value = parseNumberAttribute(_newValue);
				break;

			case "placeholder":
				this._placeholder = _newValue || "";
				break;

			case "max":
				this._max = parseNumberAttribute(_newValue) ?? DEFAULT_MAX_VALUE;
				break;

			case "min":
				this._min = parseNumberAttribute(_newValue) ?? DEFAULT_MIN_VALUE;
				break;

			case "input-mode":
				this._inputMode = parseInputModeAttribute(_newValue);
				break;
		}
		// update component to reflect the new value
		this._updateComponent();
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _updateComponent(): void {
		if (this.isConnected) {
			// update input value
			if (this._value == null) {
				this._inputEl.textContent = this._placeholder;
				this.setAttribute("empty", "");
			} else {
				this._inputEl.textContent = this._value + "";
				this.removeAttribute("empty");
			}

			// update input mode attribute
			if (this._inputMode != null) {
				this._inputEl.setAttribute("inputmode", this._inputMode);
			}
		}
	}

	private _selectAll(): void {
		if (globalThis.getSelection && document.createRange) {
			const range = document.createRange();
			range.selectNodeContents(this._inputEl);

			const selection = globalThis.getSelection();
			selection!.removeAllRanges();
			selection!.addRange(range);
		} else if ((document.body as any).createTextRange) {
			const range = (document.body as any).createTextRange();
			range.moveToElementText(this._inputEl);
			range.select();
		}
	}

	private _clearSelection(): void {
		if (globalThis.getSelection) {
			globalThis.getSelection()!.removeAllRanges();
		} else if ((document as any).selection) {
			(document as any).selection.empty();
		}
	}

	private _triggerChangeEvent(): void {
		this.dispatchEvent(new CustomEvent("change", {
			bubbles: true,
			composed: true,
			detail: {
				value: this._value,
			}
		}));
	}

	private _triggerFocusPrev(): void {
		this.dispatchEvent(new CustomEvent("on-focus-prev", {
			bubbles: true,
			composed: true,
		}));
	}

	private _triggerFocusNext(): void {
		this.dispatchEvent(new CustomEvent("on-focus-next", {
			bubbles: true,
			composed: true,
		}));
	}

	private _handleNumericInput(key: string): void {
		// handle up arrow key for incrementing the value =====================
		if (key === "ArrowUp") {
			const inputValue = parseInt(this._inputEl.textContent + "", 10);
			if (isNaN(inputValue)) {
				this._value = String(this._min).padStart(2, "0");
			} else {
				const newValue = inputValue + 1;
				this._value = String(newValue > this._max ? this._min : newValue).padStart(2, "0");
			}
			this._inputOffset = 1;
			this._updateComponent();
			this._selectAll();
			this._triggerChangeEvent();
			return;
		}

		// handle down arrow key for decrementing the value ===================
		if (key === "ArrowDown") {
			const inputValue = parseInt(this._inputEl.textContent + "", 10);
			if (isNaN(inputValue)) {
				this._value = String(this._min).padStart(2, "0");
			} else {
				const newValue = inputValue - 1;
				this._value = String(newValue < this._min ? this._max : newValue).padStart(2, "0");
			}
			this._inputOffset = 1;
			this._updateComponent();
			this._selectAll();
			this._triggerChangeEvent();
			return;
		}

		// input correction logic: ============================================
		// if input offset is 0, we are entering the first digit of the time value, so we set the value to the entered digit and move the offset to 1
		// if input offset is 1, we are entering the second digit of the time value, so we append the entered digit to the existing value and move the offset to 2
		if (this._inputOffset === 0 || this._inputOffset > 1) {
			this._value = String(key).padStart(2, "0");
			this._inputOffset = 1;
		} else if (this._inputOffset === 1) {
			const inputValue = parseInt(this._inputEl.textContent + key, 10);
			const max = this._max == null
				? DEFAULT_MAX_VALUE
				: parseInt(this._max + "", 10);
			
			// validate input value against max value
			if (inputValue > max) {
				this._value = String(key).padStart(2, "0");
				this._inputOffset = 1;
			} else {
				this._value = String(inputValue).padStart(2, "0");
				this._inputOffset = 2;
			}
		}

		this._updateComponent();
		this._selectAll();
		this._triggerChangeEvent();

		// trigger focus next event after change event, not before
		if (this._inputOffset === 2) {
			this._triggerFocusNext();
			this._inputOffset = 0;
		}
	}

	private _handleAlphabeticInput(key: string): void {
		// handle up arrow key for incrementing the value =====================
		if (key === "ArrowUp" || key === "ArrowDown") {
			if (String(this._value).toLocaleLowerCase() === "am") {
				this._value = "PM";
			} else {
				this._value = "AM";
			}
		}

		// handle A and P keys for AM/PM ===================
		if (key.toLocaleLowerCase() === "a") {
			this._value = "AM";
		}
		if (key.toLocaleLowerCase() === "p") {
			this._value = "PM";
		}

		this._updateComponent();
		this._selectAll();
		this._triggerChangeEvent();
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	/** Focuses the input element and selects all its content */
	public focus(): void {
		this._inputEl.focus();
		this._selectAll();
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onInputKeyDown(event: KeyboardEvent): void {
		// trigger focus next event on enter key press ========================
		if (event.key === "Enter") {
			this._triggerFocusNext();
			return;
		}
		// trigger focus prev event on shift + tab key press ==================
		if (event.key === "Tab" && event.shiftKey) {
			this._triggerFocusPrev();
			return;
		}
		// if event.key is undefined or null, we cannot process the input, so we return early
		// ignore tab key as it is used for navigation
		if (event.key == null || event.key === "Tab") {
			return;
		}
		// prevent typing into the input directly, we will handle it manually to have more control over the input behavior
		event.preventDefault();
		// validate key input based on the input mode, if the key is not valid for the current input mode, we ignore it
		if (!validKeyInput(event.key, this._inputMode)) {
			return;
		}

		// handle backspace key ===============================================
		if (event.key === "Backspace" || event.key === "Delete") {
			this._inputOffset = 0;
			this._value = null;
			// update component to reflect the new value
			this._updateComponent();
			this._selectAll();
			this._triggerChangeEvent();
			return;
		}
		// handle left arrow key for navigation ===============================
		if (event.key === "ArrowLeft") {
			this._triggerFocusPrev();
			return;
		}
		// handle right arrow key for navigation ==============================
		if (event.key === "ArrowRight") {
			this._triggerFocusNext();
			return;
		}		
		// handle input based on the input mode (numeric or alphabetic) =======
		if (this._inputMode === "numeric") {
			this._handleNumericInput(event.key);
		} else {
			this._handleAlphabeticInput(event.key);
		}
	}

	private _onInputClick(): void {
		this._selectAll();
	}

	private _onInputFocus(): void {
		console.log(`%c ⚡ [panda time input](focus)`, "font-size: 24px; color: green; background: black;", this._focused);
		if (!this._focused) {
			this._selectAll();
		}
		this._focused = true;
		this.setAttribute("focused", "");
		this._inputOffset = 0;
	}
	
	private _onInputBlur(): void {
		console.log(`%c ⚡ [panda time input](blur)`, "font-size: 24px; color: crimson; background: black;", this._focused);
		this._focused = false;
		this.removeAttribute("focused");
		this._inputOffset = 0;
		this._clearSelection();
	}

	/** Prevent default behavior for certain events */
	private _onPreventEvent(event: Event): void {
		event.preventDefault();
	}
}

// Register the custom element
if (!customElements.get("panda-time-input")) {
	customElements.define("panda-time-input", PandaTimeInput);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-time-input": PandaTimeInput;
	}
}