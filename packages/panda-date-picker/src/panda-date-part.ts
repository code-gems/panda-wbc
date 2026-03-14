// styles
import { styles } from "./styles/date-part";

// utils
import { applyStyles } from "@panda-wbc/panda-utils/lib/component-utils";

export class PandaDatePart extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// observed attributes ============================================================================================

	static get observedAttributes() {
		return [
			"value",
			"type",
		];
	}

	/**
	 * value
	 * ------
	 * The value of the date part. This is a string that represents the date part value (e.g., "01" for day, "12" for month, "2022" for year).
	 * The value is editable by the user and can be retrieved using the `value` property of the component.
	 * @default ""
	 * @type {string}
	 * @example
	 * <panda-date-part value="01"></panda-date-part>
	 */
	get value(): string {
		return this._value;
	}

	set value(value: string) {
		if (this._value !== value) {
			this._value = value;
		}
	}

	private _value!: string;

	/**
	 * type
	 * ------
	 * Defines the type of date part to render. Possible values are "DD", "MM" and "YYYY".
	 * This attribute is required and should be provided by the parent component (PandaDatePicker) when rendering date parts.
	 * @default "DD"
	 * @type {string}
	 * @example
	 * <panda-date-part type="MM"></panda-date-part>
	 * <panda-date-part type="YYYY"></panda-date-part>
	 */
	get type(): string {
		return this._type;
	}

	set type(value: string) {
		this._type = value;
		this.setAttribute("type", value);
	}

	private _type!: string;

	// private properties =============================================================================================

	private _ready!: boolean;
	private _maxLength!: number;
	private _keyPressedCount!: number;

	// elements
	private readonly _spanEl!: HTMLSpanElement;

	// events
	private readonly _focusEvent!: any;
	private readonly _blurEvent!: any;
	private readonly _keyDownEvent!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });

		applyStyles(styles, this.shadowRoot);

		// create element
		this._spanEl = document.createElement("span");
		this._spanEl.contentEditable = "true";
		this._spanEl.textContent = "DD"; // default value
		this.shadowRoot!.appendChild(this._spanEl);

		// initialize class properties
		this._ready = false;
		this._type = "DD";
		this._value = "";
		this._maxLength = 2;
		this._keyPressedCount = 0;

		if (this.shadowRoot) {
			// initialize events
			this._keyDownEvent = this._onKeyDown.bind(this);
			this._spanEl.addEventListener("keydown", this._keyDownEvent);
			this._focusEvent = this._onFocus.bind(this);
			this._spanEl.addEventListener("focus", this._focusEvent);
			this._blurEvent = this._onBlur.bind(this);
			this._spanEl.addEventListener("blur", this._blurEvent);
		}
	}

	connectedCallback(): void {
		this._ready = true;
		this._updateComponent();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// do not process if value did not change
		if (_oldValue === _newValue) {
			return;
		}
		switch (_name) {
			case "type":
				this._type = _newValue;
				break;
		}
		this._updateComponent();
	}

	private _updateComponent(): void {
		if (this._ready) {
			this._spanEl.textContent = this._value || this._type.toLocaleUpperCase();
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _selectAll(): void {
		console.log(`%c ⚡ [DATE PART] (_selectAll)`, "font-size: 16px; color: green; background: black;");
		const selection = globalThis.getSelection();
		const range = document.createRange();
		range.selectNodeContents(this._spanEl);

		if (selection) {
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}

	private _formatDisplayValue(): void {
		const currentValue = this._spanEl.textContent || "";

		if (this._type === "DD") {
			// for day, ensure value is between 1 and 31 and pad with leading zero if necessary
			let day = Number.parseInt(currentValue, 10);
			if (Number.isNaN(day) || day < 1) {
				day = 1;
			} else if (day > 31) {
				day = 31;
			}
			this._spanEl.textContent = day.toString().padStart(2, "0");
		} else if (this._type === "MM") {
			// for month, ensure value is between 1 and 12 and pad with leading zero if necessary
			let month = Number.parseInt(currentValue, 10);
			if (Number.isNaN(month) || month < 1) {
				month = 1;
			} else if (month > 12) {
				month = 12;
			}
			this._spanEl.textContent = month.toString().padStart(2, "0");
		} else if (this._type === "YY") {
			// for year, ensure value is a valid number and pad with leading zeros if necessary
			let year = Number.parseInt(currentValue, 10);
			if (Number.isNaN(year) || year < 1) {
				year = 1;
			} else if (year > 99) {
				year = 99;
			}
			this._spanEl.textContent = year.toString().padStart(2, "0");
		} else if (this._type === "YYYY") {
			// for year, ensure value is a valid number and pad with leading zeros if necessary
			let year = Number.parseInt(currentValue, 10);
			if (Number.isNaN(year) || year < 1) {
				year = 1;
			}
			this._spanEl.textContent = year.toString().padStart(4, "0");
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onFocus(): void {
		console.log(`%c ⚡ [DATE PART] (_onFocus)`, "font-size: 16px; color: green; background: black;");
		this._selectAll();
		this._keyPressedCount = 0;
	}

	private _onBlur(): void {
		console.log(`%c ⚡ [DATE PART] (_onBlur)`, "font-size: 16px; color: green; background: black;");
		this._formatDisplayValue();
		this._keyPressedCount = 0;
	}

	private _onKeyDown(event: KeyboardEvent): void {
		event.stopPropagation();
		event.preventDefault();

		this._keyPressedCount++;
		const keyValue = Number(event.key);
		console.log(`%c ⚡ [DATE PART] (_onKeyDown) key press count`, "font-size: 16px; color: green; background: black;", this._keyPressedCount);
		console.log(`%c ⚡ [DATE PART] (_onKeyDown) event`, "font-size: 16px; color: green; background: black;", event);
		console.log(`%c ⚡ [DATE PART] (_onKeyDown) keyValue`, "font-size: 16px; color: green; background: black;", keyValue);

		if (!Number.isNaN(keyValue)) {
			this._value = (this._value + keyValue.toString()).padStart(this._maxLength, "0").slice(-this._maxLength);
		// } else if (event.key === "Backspace") {
		// 	this._value = (this._value || "").slice(0, -1);
		}

		// update component
		this._updateComponent();
	}
}

// Register the custom element
if (!customElements.get("panda-date-part")) {
	customElements.define("panda-date-part", PandaDatePart);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-date-part": PandaDatePart;
	}
}