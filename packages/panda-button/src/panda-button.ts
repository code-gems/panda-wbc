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

	// template elements
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
		// initialize class properties
		this._theme = "";
		this._disabled = false;
		this._working = false;
		this._spinnerType = "dots";
		// init events
		this._prefixSlotChangeEvent = this._onPrefixSlotChanged.bind(this);
		this._suffixSlotChangeEvent = this._onSuffixSlotChanged.bind(this);
		// render component
		this._render();
	}

	connectedCallback() {
		if (this.shadowRoot) {
			// find slot elements
			this._prefixSlotEl = this.shadowRoot.querySelector(`slot[name="prefix"]`) as HTMLSlotElement;
			this._suffixSlotEl = this.shadowRoot.querySelector(`slot[name="suffix"]`) as HTMLSlotElement;
			// add event listeners to component template
			this._prefixSlotEl.addEventListener("slotchange", this._prefixSlotChangeEvent);
			this._suffixSlotEl.addEventListener("slotchange", this._suffixSlotChangeEvent);
		}
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
						>
						</panda-spinner>
					</div>
				`
				: "";
			
			// get tab index based on the component state
			const tabIndex = this._disabled ? "-1" : "0"

			// get css classes based on component state
			const cssClasses: string[] = [];
			if (this._disabled) {
				cssClasses.push("disabled");
			}
			if (this._working) {
				cssClasses.push("working");
			}
			if (this._withPrefix) {
				cssClasses.push("with-prefix");
			}
			if (this._withSuffix) {
				cssClasses.push("with-suffix");
			}

			// render component template
			this.shadowRoot.innerHTML = /*html*/`
				<button
					class="button ${cssClasses.join(" ")} ${this._theme}"
					part="button ${cssClasses.join(" ")} ${this._theme}"
					${this._disabled || this._working? "disabled" : ""}
					tabindex="${tabIndex}"
				>
					<slot name="prefix" part="prefix"></slot>
					<slot part="slot"></slot>
					<slot name="suffix" part="suffix"></slot>
					${spinnerHtml}
				</button>
			`;
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

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	
	private _onPrefixSlotChanged(): void {
		this._withPrefix = true;
		this._render();
	}
	
	private _onSuffixSlotChanged(): void {
		this._withSuffix = true;
		this._render();
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
