// types
import { PandaSpinner } from "@panda-wbc/panda-spinner";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";

export class PandaButton extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
	static readonly observedAttributes = [
		"theme",
		"disabled",
		"working",
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

	// working ========================================================================================================
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
	private _withPrefix!: boolean;
	private _withSuffix!: boolean;
	private _ready!: boolean;

	// elements
	private _buttonEl!: HTMLButtonElement;
	private _spinnerContEl!: HTMLDivElement;
	private _spinnerEl!: PandaSpinner;
	private _prefixSlotEl!: HTMLSlotElement;
	private _suffixSlotEl!: HTMLSlotElement;

	// events
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
			<button class="button" part="button">
				<slot name="prefix" part="prefix"></slot>
				<slot part="slot"></slot>
				<slot name="suffix" part="suffix"></slot>
			</button>
		`;

		// create spinner element
		this._spinnerContEl = document.createElement("div");
		this._spinnerContEl.className = "spinner-cont";
		this._spinnerContEl.part = "spinner-cont";
		this._spinnerContEl.innerHTML = /*html*/`<panda-spinner part="spinner"></panda-spinner>`;
		// get spinner element handle
		this._spinnerEl = this._spinnerContEl.querySelector("panda-spinner") as PandaSpinner;
		this._spinnerEl.spinner = this._spinnerType ?? "dots";

		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._theme = "";
		this._disabled = false;
		this._working = false;
		this._spinnerType = "dots";
		this._ready = false;

		// init events
		this._prefixSlotChangeEvent = this._onPrefixSlotChanged.bind(this);
		this._suffixSlotChangeEvent = this._onSuffixSlotChanged.bind(this);

		if (this.shadowRoot) {
			// get elements handle
			this._buttonEl = this.shadowRoot.querySelector(".button") as HTMLButtonElement;
			this._prefixSlotEl = this.shadowRoot.querySelector(`slot[name="prefix"]`) as HTMLSlotElement;
			this._suffixSlotEl = this.shadowRoot.querySelector(`slot[name="suffix"]`) as HTMLSlotElement;

			// add event listeners to component template
			this._prefixSlotEl.addEventListener("slotchange", this._prefixSlotChangeEvent);
			this._suffixSlotEl.addEventListener("slotchange", this._suffixSlotChangeEvent);
		}
	}

	connectedCallback() {
		this._ready = true;
		this._updateComponent();
	}

	disconnectedCallback() {
		// remove event listeners
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
			case "disabled":
				this._disabled = this._parseBooleanAttribute(_newValue);
				break;
			case "working":
				this._working = this._parseBooleanAttribute(_newValue);
				break;
			case "spinner-type":
				this._spinnerType = _newValue;
				break;
		}
		// update component
		this._updateComponent();
	}

	private _updateComponent(): void {
		if (this._ready) {
			// make component focusable
			if (this._disabled || this._working) {
				this._buttonEl.tabIndex = -1;
				this._buttonEl.disabled = true;
			} else {
				this._buttonEl.tabIndex = 0;
				this._buttonEl.disabled = false;
			}

			// add or remove spinner element
			if (this._working) {
				this._buttonEl.appendChild(this._spinnerContEl);
			} else {
				this._spinnerContEl.remove();
			}

			// update template css classes and parts
			this._updateTemplateCss();
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

	/** Update css classes and parts on the component template */
	private _updateTemplateCss(): void {
		const css: string[] = [];

		if (this._disabled) {
			css.push("disabled");
		}
		if (this._working) {
			css.push("working");
		}
		if (this._withPrefix) {
			css.push("with-prefix");
		}
		if (this._withSuffix) {
			css.push("with-suffix");
		}
		// update class names and parts
		this._buttonEl.className = `button ${css.join(" ")} ${this._theme}`;
		this._buttonEl.part = this._buttonEl.className;
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
}

// Register the custom element
if (!customElements.get("panda-button")) {
	customElements.define("panda-button", PandaButton);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-button": PandaButton;
	}
}
