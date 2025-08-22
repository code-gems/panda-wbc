// types
import { PandaTextFieldOnInputEvent } from "../index";
import { PandaTextSlider } from "@panda-wbc/panda-text-slider";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-text-slider";

export class PandaTextField extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = [
		"theme",
		"value",
		"label",
		"placeholder",
		"placeholder-interval",
		"description",
		"max-length",
		"show-character-counter",
		"disabled",
		"working",
		"readonly",
		"autofocus",
		"autoselect",
		"autocomplete",
		"spellcheck",
		"mandatory",
		"spinner-type",
	];

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
	private _value!: any;

	get value(): any {
		return this._value;
	}

	set value(value: any) {
		console.log(`%c 🔥 (set value)`, "font-size: 16px; color: crimson; background: black;", value);
		if (this._value !== value) {
			this._value = value;
			this._updateComponent();
		}
	}

	// label ==========================================================================================================
	private _label!: string;

	get label(): string {
		return this._label;
	}

	set label(value: string) {
		console.log(`%c 🔥 (set label)`, "font-size: 16px; color: crimson; background: black;", value, typeof value);
		if (this._label !== value) {
			// reflect to attribute
			this.setAttribute("label", value + "");
			this._label = value;
			this._updateComponent();
		}
	}

	// placeholder ====================================================================================================
	private _placeholder!: string | string[];

	get placeholder(): string | string[] {
		return this._placeholder;
	}

	set placeholder(value: string | string[]) {
		if (this._placeholder !== value) {
			// reflect to attribute
			// this.setAttribute("placeholder", this._placeholder);
			this._placeholder = value;
			// convert placeholder to an array
			const placeholders = Array.isArray(this.placeholder)
				? this.placeholder
				: [...this.placeholder];
			this._placeholderEl.slides = placeholders;
			this._updateComponent();
		}
	}

	// placeholderInterval ============================================================================================
	private _placeholderInterval!: number | null;

	get placeholderInterval(): number | null {
		return this._placeholderInterval;
	}

	set placeholderInterval(value: number | null) {
		if (this._placeholderInterval !== value) {
			// reflect to attribute
			this.setAttribute("placeholder-interval", this._placeholderInterval + "");
			this._placeholderInterval = this._parseNumberAttribute(value);
			this._placeholderEl.sliderInterval = this._placeholderInterval as number;
			this._updateComponent();
		}
	}

	// description ====================================================================================================
	private _description!: string;

	get description(): string {
		return this._description;
	}

	set description(value: string) {
		if (this._description !== value) {
			// reflect to attribute
			this.setAttribute("description", this._description);
			this._description = value;
			this._updateComponent();
		}
	}

	// maxLength ======================================================================================================
	private _maxLength!: number | null;

	get maxLength(): number | null {
		return this._maxLength;
	}

	set maxLength(value: number | null) {
		if (this._maxLength !== value) {
			this._maxLength = this._parseNumberAttribute(value);
			// reflect to attribute
			this.setAttribute("max-length", this._maxLength + "");
		}
	}

	// showCharacterCounter ===========================================================================================
	private _showCharacterCounter!: boolean;

	get showCharacterCounter(): boolean {
		return this._showCharacterCounter;
	}

	set showCharacterCounter(value: boolean) {
		if (this._showCharacterCounter !== value) {
			this._showCharacterCounter = this._parseBooleanAttribute(value);
			// reflect to attribute
			if (value) {
				this.setAttribute("show-character-counter", "");
			} else {
				this.removeAttribute("show-character-counter");
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
			this._disabled = this._parseBooleanAttribute(value);
			// reflect to attribute
			if (value) {
				this.setAttribute("disabled", "");
			} else {
				this.removeAttribute("disabled");
			}
		}
	}

	// working ========================================================================================================
	private _working!: boolean;

	get working(): boolean {
		return this._working;
	}

	set working(value: boolean) {
		if (this._working !== value) {
			this._working = this._parseBooleanAttribute(value);
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
			this._readonly = this._parseBooleanAttribute(value);
			// reflect to attribute
			if (value) {
				this.setAttribute("readonly", "");
			} else {
				this.removeAttribute("readonly");
			}
		}
	}

	// autofocus ======================================================================================================
	private _autofocus!: boolean;

	get autofocus(): boolean {
		return this._autofocus;
	}

	set autofocus(value: boolean) {
		if (this._autofocus !== value) {
			this._autofocus = this._parseBooleanAttribute(value);
			// reflect to attribute
			if (value) {
				this.setAttribute("autofocus", "");
			} else {
				this.removeAttribute("autofocus");
			}
		}
	}

	// autoselect =====================================================================================================
	private _autoselect!: boolean;

	get autoselect(): boolean {
		return this._autoselect;
	}

	set autoselect(value: boolean) {
		if (this._autoselect !== value) {
			this._autoselect = this._parseBooleanAttribute(value);
			// reflect to attribute
			if (value) {
				this.setAttribute("autoselect", "");
			} else {
				this.removeAttribute("autoselect");
			}
		}
	}

	// autocomplete ===================================================================================================
	private _autocomplete!: string;

	get autocomplete(): string {
		return this._autocomplete;
	}

	set autocomplete(value: string) {
		if (this._autocomplete !== value) {
			this._autocomplete = value;
			// reflect to attribute
			this.setAttribute("autocomplete", this._autocomplete);
		}
	}

	// spellcheck =====================================================================================================
	private _spellcheck!: boolean;

	get spellcheck(): boolean {
		return this._spellcheck;
	}

	set spellcheck(value: boolean) {
		if (this._spellcheck !== value) {
			this._spellcheck = this._parseBooleanAttribute(value);
			// reflect to attribute
			if (value) {
				this.setAttribute("spellcheck", "");
			} else {
				this.removeAttribute("spellcheck");
			}
		}
	}

	// mandatory ======================================================================================================
	private _mandatory!: boolean;

	get mandatory(): boolean {
		return this._mandatory;
	}

	set mandatory(value: boolean) {
		console.log(`%c 🔥 1. (set mandatory)`, "font-size: 16px; color: crimson; background: black;", value);
		if (this._mandatory !== value) {
			this._mandatory = this._parseBooleanAttribute(value);
			console.log(`%c 🔥 2. (set mandatory)`, "font-size: 16px; color: crimson; background: black;", this._mandatory);
			// reflect to attribute
			if (this._mandatory) {
				this.setAttribute("mandatory", "");
			} else {
				this.removeAttribute("mandatory");
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

	// view properties ================================================================================================
	private _ready!: boolean;
	private _focused!: boolean;
	private _withPrefix!: boolean;
	private _withSuffix!: boolean;
	private _showMandatoryFlag!: boolean;
	private _textLength!: number;

	// elements
	private readonly _counterEl!: HTMLDivElement;
	private readonly _descriptionEl!: HTMLDivElement;
	private readonly _footerEl!: HTMLDivElement;
	private readonly _inputEl!: HTMLInputElement;
	private readonly _labelEl!: HTMLDivElement;
	private readonly _placeholderEl!: PandaTextSlider;
	private readonly _prefixSlotEl!: HTMLSlotElement;
	private readonly _spinnerEl!: HTMLDivElement;
	private readonly _suffixSlotEl!: HTMLSlotElement;
	private readonly _textFieldEl!: HTMLDivElement;
	private readonly _inputWrapEl!: HTMLDivElement;

	// events
	private readonly _inputEvent!: any;
	private readonly _focusInputEvent!: any;
	private readonly _blurInputEvent!: any;
	private readonly _prefixSlotChangeEvent!: any;
	private readonly _suffixSlotChangeEvent!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		console.log(`%c ⚡ (constructor)`, "font-size: 16px; color: orange; background: black;");
		super();
		// create shadow root
		this.attachShadow({ mode: "open", delegatesFocus: true });

		// apply component styles to a shadow root
		this._applyStyles();

		// create component template
		const template = document.createElement("template");
		template.innerHTML = /*html*/`
			<div class="text-field" part="text-field">
				<slot name="prefix"></slot>
				<div class="input-wrap" part="input-wrap">
					<input type="text" class="input" part="input" />
				</div>
				<slot name="suffix"></slot>
			</div>
			<div class="footer" part="footer"></div>
		`;
		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._theme = "";
		this._label = "";
		this._description = "";
		this._placeholder = "";
		this._placeholderInterval = null;
		this._working = false;
		this._readonly = false;
		this._disabled = false;
		this._maxLength = null;
		this._showCharacterCounter = false;
		this._spinnerType = "dots";

		// view props
		this._ready = false;
		this._focused = false;
		this._withPrefix = false;
		this._withSuffix = false;
		this._showMandatoryFlag = false;
		this._textLength = 0;

		// init events
		this._inputEvent = this._onInput.bind(this);
		this._focusInputEvent = this._onFocus.bind(this);
		this._blurInputEvent = this._onBlur.bind(this);
		this._prefixSlotChangeEvent = this._onPrefixSlotChanged.bind(this);
		this._suffixSlotChangeEvent = this._onSuffixSlotChanged.bind(this);

		// create placeholder element
		this._placeholderEl = document.createElement("panda-text-slider");
		this._placeholderEl.className = "placeholder";
		this._placeholderEl.part = "placeholder";
		this._placeholderEl.hide = true;

		// create spinner element
		this._spinnerEl = document.createElement("div");
		this._spinnerEl.className = "spinner-cont";
		this._spinnerEl.part = "spinner-cont";
		this._spinnerEl.innerHTML = /*html*/`
			<panda-spinner
				part="spinner"
				spinner="${this._spinnerType ?? "dots"}"
			>
			</panda-spinner>
		`;
		// create label element
		this._labelEl = document.createElement("div");
		this._labelEl.className = "label";
		this._labelEl.part = "label";

		// create description element
		this._descriptionEl = document.createElement("div");
		this._descriptionEl.className = "description";
		this._descriptionEl.part = "description";

		// create counter element
		this._counterEl = document.createElement("div");
		this._counterEl.className = "counter";
		this._counterEl.part = "counter";

		// get template element handles
		if (this.shadowRoot) {
			// assign template elements
			this._textFieldEl = this.shadowRoot.querySelector(`.text-field`) as HTMLDivElement;
			this._inputWrapEl = this.shadowRoot.querySelector(`.input-wrap`) as HTMLDivElement;
			this._inputEl = this.shadowRoot.querySelector(`input[type="text"]`) as HTMLInputElement;
			this._inputEl.tabIndex = 0; // update tab index
			this._inputWrapEl.insertBefore(this._placeholderEl, this._inputEl);
			this._footerEl = this.shadowRoot.querySelector(`.footer`) as HTMLInputElement;
			this._prefixSlotEl = this.shadowRoot.querySelector(`slot[name="prefix"]`) as HTMLSlotElement;
			this._suffixSlotEl = this.shadowRoot.querySelector(`slot[name="suffix"]`) as HTMLSlotElement;
		}
	}

	connectedCallback() {
		console.log(`%c ⚡ (connectedCallback)`, "font-size: 16px; color: orange; background: black;", this.shadowRoot);
		// add event listeners to component template
		this._inputEl.addEventListener("input", this._inputEvent);
		this._inputEl.addEventListener("focus", this._focusInputEvent);
		this._inputEl.addEventListener("blur", this._blurInputEvent);
		this._prefixSlotEl.addEventListener("slotchange", this._prefixSlotChangeEvent);
		this._suffixSlotEl.addEventListener("slotchange", this._suffixSlotChangeEvent);
		
		// update mandatory flag
		this._evaluateMandatoryFlag();

		// check if autofocus flag is enabled
		if (this.autofocus) {
			this._inputEl.focus();
		}
		
		// render component
		this._ready = true;
		this._updateComponent();
	}

	disconnectedCallback() {
		// remove event listeners
		this._inputEl.removeEventListener("input", this._inputEvent);
		this._inputEl.removeEventListener("focus", this._focusInputEvent);
		this._inputEl.removeEventListener("blur", this._blurInputEvent);
		this._prefixSlotEl.removeEventListener("slotchange", this._prefixSlotChangeEvent);
		this._suffixSlotEl.removeEventListener("slotchange", this._suffixSlotChangeEvent);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		console.log(`%c ⚡ (updated) ${_name}`, "font-size: 16px; color: orange; background: black;", _newValue);
		switch (_name) {
			case "value":
				this._value = _newValue;
				// update mandatory flag
				this._evaluateMandatoryFlag();
				break;

			case "theme":
				this._theme = _newValue;
				break;

			case "label":
				this._label = _newValue;
				break;

			case "placeholder":
				this._placeholder = _newValue;
				break;

			case "placeholder-interval":
				this._placeholderInterval = this._parseNumberAttribute(_newValue);
				break;

			case "description":
				this._description = _newValue;
				break;

			case "spinner-type":
				this._spinnerType = _newValue;
				break;

			case "max-length":
				this._maxLength = this._parseNumberAttribute(_newValue);
				if (this._maxLength != null) {
					// set max-length onto input element
					this._inputEl.maxLength = this._maxLength;
					// check if text is longer than max length
					this._value = this._value?.slice(0, this._maxLength);
					this._textLength = this._value?.length || 0;
					this._inputEl.value = this._value;
					// check if current text is at its max length
					if (this._textLength === this._maxLength) {
						this._counterEl.classList.add("shake");
					}
					// add counter to footer element
					this._footerEl.appendChild(this._counterEl);
				} else {
					// clear max length from input element
					this._inputEl.removeAttribute("maxLength");
					// remove counter from footer element
					if (!this._showCharacterCounter) {
						this._counterEl.remove();
					}
				}
				break;

			case "disabled":
				this._disabled = this._parseBooleanAttribute(_newValue);
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

			case "working":
				this._working = this._parseBooleanAttribute(_newValue);
				// stop/start placeholder animation
				if (this._working) {
					this._placeholderEl.stop();
				} else if (!this._disabled && !this._readonly) {
					this._placeholderEl.reset();
				}
				break;

			case "readonly":
				this._readonly = this._parseBooleanAttribute(_newValue);
				// update input readonly property
				this._inputEl.readOnly = this._readonly;
				// stop/start placeholder animation
				if (this._readonly) {
					this._placeholderEl.stop();
				} else if (!this._disabled && !this._working) {
					this._placeholderEl.reset();
				}
				break;

			case "mandatory":
				this._mandatory = this._parseBooleanAttribute(_newValue);
				break;

			case "autocomplete":
				this._autocomplete = _newValue;
				// update input autocomplete property
				this._inputEl.autocomplete = this._autocomplete as AutoFill;
				break;

			case "autoselect":
				this._autoselect = this._parseBooleanAttribute(_newValue);
				break;

			case "autofocus":
				this._autofocus = this._parseBooleanAttribute(_newValue);
				// update input autofocus property
				if (this._autofocus) {
					this._inputEl.autofocus = this._autofocus;
				} else {
					this._inputEl.removeAttribute("autofocus");
				}
				break;

			case "spellcheck":
				this._spellcheck = this._parseBooleanAttribute(_newValue);
				// update input spellcheck property
				if (this._spellcheck) {
					this._inputEl.spellcheck = this._spellcheck;
				} else {
					this._inputEl.removeAttribute("spellcheck");
				}
				break;

			case "show-character-counter":
				this._showCharacterCounter = this._parseBooleanAttribute(_newValue);
				if (this._showCharacterCounter) {
					this._textLength = this._value?.length || 0;
					// add counter to footer element
					this._footerEl.appendChild(this._counterEl);
				} else if (!this._maxLength) {
					this._counterEl.remove();
				}
				break;
		}
		this._updateComponent();
	}

	private _updateComponent() {
		if (this._ready) {
			console.log(`%c ⚡ (_updateComponent)`, "font-size: 16px; color: orange; background: black;", this.shadowRoot);
			// update input value
			this._inputEl.value = this._value ?? "";
		
			// check if label is defined
			if (this._label != null) {
				this._labelEl.innerHTML = this._label;
				this.shadowRoot!.insertBefore(this._labelEl, this._textFieldEl);
			} else {
				this._labelEl.remove();
			}

			// update working state
			if (this._working && !this._disabled) {
				// add spinner element
				this._textFieldEl.appendChild(this._spinnerEl);
			} else {
				// remove spinner element
				this._spinnerEl.remove();
			}
			
			// check if description is defined
			if (this._description) {
				this._descriptionEl.innerHTML = this._description;
				// check if max-length is enabled
				if (this._maxLength != null || this._showCharacterCounter) {
					// insert description element before counter element
					this._footerEl.insertBefore(this._descriptionEl, this._counterEl);
				} else {
					// insert description element to footer
					this._footerEl.appendChild(this._descriptionEl);
				}
			} else {
				this._descriptionEl.remove();
			}
			
			// check if max length is defined
			if (this._maxLength || this._showCharacterCounter) {
				// generate counter text
				const counter = this._maxLength
					? `${this._textLength}/${this._maxLength}`
					: this._textLength + "";
				this._counterEl.innerText = counter;
			}

			// update placeholder
			if (this._placeholder) {
				this._placeholderEl.hide = !!this._value;
				// don't animate placeholder if component is either disabled, working or readonly 
				if (this._disabled || this._working || this._readonly) {
					this._placeholderEl.stop();
				}
			}

			// update mandatory flag
			this._evaluateMandatoryFlag();

			// update css classes
			this._textFieldEl.className = "text-field " + this._getStateCssClass();
			this._textFieldEl.part = "text-field " + this._getStateCssClass();
			this._inputEl.className = "input " + this._getStateCssClass();
			this._inputEl.part = "input " + this._getStateCssClass();
			this._placeholderEl.className = "placeholder " + this._getStateCssClass();
			this._placeholderEl.part = "placeholder " + this._getStateCssClass();
			this._inputWrapEl.className = "input-wrap " + this._getStateCssClass();
			this._inputWrapEl.part = this._inputWrapEl.className;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _applyStyles(): void {
		console.log(`%c ⚡ (_applyStyles)`, "font-size: 16px; color: orange; background: black;", this.shadowRoot);
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	/** Get css classes based on component state */
	private _getStateCssClass(): string {
		const cssClasses: string[] = [];
		if (this._working) {
			cssClasses.push("working");
		}
		if (this._readonly) {
			cssClasses.push("readonly");
		}
		if (this._disabled) {
			cssClasses.push("disabled");
		}
		if (this._showMandatoryFlag) {
			cssClasses.push("mandatory");
		}
		if (this._focused) {
			cssClasses.push("focused");
		}
		if (this._withPrefix) {
			cssClasses.push("with-prefix");
		}
		if (this._withSuffix) {
			cssClasses.push("with-suffix");
		}
		return cssClasses.join(" ");
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
			return isNaN(value) || !isFinite(value)
				? fallbackValue
				: value;
		}
		// Try to parse as number
		const parsedValue = Number(value);
		// return fallback if parsing resulted in NaN or infinity
		return isNaN(parsedValue) || !isFinite(parsedValue)
			? fallbackValue
			: parsedValue;
	}

	private _triggerInputEvent(): void {
		const event: PandaTextFieldOnInputEvent = new CustomEvent("on-input", {
			detail: {
				value: this._value as string
			}
		})
		this.dispatchEvent(event);
	}

	/** Update mandatory flag */
	private _evaluateMandatoryFlag(): void {
		// evaluate only for default component state
		if (this._mandatory && !this._disabled && !this._working && !this._readonly) {
			if (
				this._value != null &&
				this._value !== "" &&
				String(this._value).trim().length
			) {
				this._showMandatoryFlag = false;
			} else {
				this._showMandatoryFlag = true;
			}
		} else {
			this._showMandatoryFlag = false;
		}
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public focus(): void {
		this._inputEl.focus();
	}

	public clear(): void {
		this._value = "";
		this._triggerInputEvent();
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

	private _onInput(event: Event): void {
		this._value = (event.target as HTMLInputElement).value;
		this._textLength = this._value?.length || 0;
		// shake counter if limit reached
		if (this._maxLength != null && this._textLength === this._maxLength) {
			console.log(`%c ⚡ (_onInput) text length / max `, "font-size: 16px; color: orange; background: black;", this._textLength, this._maxLength);
			this._counterEl.classList.add("shake");
		} else {
			this._counterEl.classList.remove("shake");
		}
		this._triggerInputEvent();
		this._updateComponent();
	}

	private _onFocus(event: FocusEvent): void {
		this._focused = true;
		console.log(`%c ⚡ (_onFocus) _focused: ${this._focused}`, "font-size: 16px; color: orange; background: black;");
		// check autoselect feature
		if (this._autoselect) {
			this._inputEl.select();
		} else if (this._value != null) {
			// if user uses tab key to get to the component, by default
			// all text will be selected ignoring autoselect flag
			// set selection caret to the end of the text
			const _inputValue = (event as any).target.value;
			this._inputEl.setSelectionRange(_inputValue.length + 1, _inputValue.length + 1);
		}
		this._updateComponent();
	}

	private _onBlur(): void {
		this._focused = false;
		console.log(`%c ⚡ (_onBlur) _focused: ${this._focused}`, "font-size: 16px; color: orange; background: black;");
		this._updateComponent();
	}
}

// Register the custom element
if (!customElements.get("panda-text-field")) {
	customElements.define("panda-text-field", PandaTextField);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-text-field": PandaTextField;
	}
}
