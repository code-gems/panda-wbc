// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";

export class PandaButtonNew extends HTMLElement {
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

		// create component template
		const template = document.createElement("template");
		template.innerHTML = /*html*/`
			<div class="button">
				<slot name="prefix"></slot>
				<div class="label"><slot></slot></div>
				<slot name="suffix"></slot>
			</div>
		`;
		
		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

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

}

// Register the custom element
if (!customElements.get("panda-button-new")) {
	customElements.define("panda-button-new", PandaButtonNew);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-button-new": PandaButtonNew;
	}
}
