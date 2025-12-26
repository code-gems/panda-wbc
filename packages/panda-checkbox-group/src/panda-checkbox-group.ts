// types
import { PandaCheckboxChangeEvent } from "../index";

// styles
import { styles } from "./styles/styles";

export class PandaCheckboxGroup extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = [
		"theme",
		"label",
		"disabled",
		"horizontal",
		"align-right",
		"alignright",
	];

	// theme ===========================================================================================================
	/** Theme of the checkbox group. */
	private _theme!: string;

	get theme() {
		return this._theme;
	}

	set theme(value: string) {
		if (this._theme !== value) {
			this._theme = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("theme", this._theme);
			} else {
				this.removeAttribute("theme");
			}
		}
	}

	// label ==========================================================================================================
	/** Label for the checkbox group. */
	private _label!: string;

	get label() {
		return this._label;
	}

	set label(value: string) {
		if (this._label !== value) {
			this._label = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("label", this._label);
			} else {
				this.removeAttribute("label");
			}
		}
	}

	// disabled =======================================================================================================
	/**
	 * Whether the checkbox group is disabled.
	 * @default false
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
		}
	}

	// horizontal =======================================================================================================
	/**
	 * Whether the checkboxes are laid out horizontally.
	 * @default false
	 */
	private _horizontal!: boolean;

	get horizontal() {
		return this._horizontal;
	}

	set horizontal(value: boolean) {
		if (this._horizontal !== value) {
			this._horizontal = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("horizontal", "");
			} else {
				this.removeAttribute("horizontal");
			}
		}
	}

	// alignRight =====================================================================================================
	/**
	 * Whether the labels are aligned to the right of the checkboxes.
	 * @default false
	 */
	private _alignRight!: boolean;

	get alignRight() {
		return this._alignRight;
	}

	set alignRight(value: boolean) {
		if (this._alignRight !== value) {
			this._alignRight = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("alignright", "");
			} else {
				this.removeAttribute("alignright");
			}
		}
	}

	// view properties ================================================================================================
	private _ready!: boolean;

	// elements
	private _checkboxGroupEl!: HTMLDivElement;
	private _labelEl!: HTMLDivElement;

	// events
	private readonly _slotChangeEvent!: any;
	private readonly _changeEvent!: any;

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
			<slot
				class="checkbox-group"
				part="checkbox-group"
			></slot>
		`;

		// create label element
		this._labelEl = document.createElement("div");
		this._labelEl.className = "label";
		this._labelEl.part = "label";

		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._label = "";
		this._disabled = false;
		this._horizontal = false;
		this._theme = "";

		// init events
		this._slotChangeEvent = this._onSlotChange.bind(this);
		this._changeEvent = this._onChange.bind(this);

		// get template element handles
		if (this.shadowRoot) {
			// get elements handle
			this._checkboxGroupEl = this.shadowRoot.querySelector(".checkbox-group") as HTMLDivElement;

			// attach event listeners
			this._checkboxGroupEl.addEventListener("slotchange", this._slotChangeEvent);
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
			case "theme":
				this._theme = _newValue;
				break;
			case "label":
				this._label = _newValue;
				break;
			case "disabled":
				this._disabled = this._parseBooleanAttribute(_newValue);
				break;
			case "horizontal":
				this._horizontal = this._parseBooleanAttribute(_newValue);
				break;
			case "alignright":
			case "align-right":
				this._alignRight = this._parseBooleanAttribute(_newValue);
				break;
		}

		this._updateComponent();
	}

	private _updateComponent(): void {
		if (this._ready) {
			console.log(`%c ⚡ (_updateComponent)`, "font-size: 24px; color: crimson; background: black;");
			// add or remove label
			if (this._label) {
				this._labelEl.textContent = this._label;
				this.shadowRoot!.insertBefore(this._labelEl, this._checkboxGroupEl);
			} else {
				this._labelEl.remove();
			}
			
			// apply horizontal layout
			if (this._horizontal) {
				this._checkboxGroupEl.classList.add("horizontal");
			} else {
				this._checkboxGroupEl.classList.remove("horizontal");
			}
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

	private _triggerChangeEvent(event: any): void {
		console.log(`%c ⚡ _triggerChangeEvent`, "font-size: 24px; color: crimson; background: black;", event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	
	private _onSlotChange(): void {
		console.log(`%c ⚡ (_onSlotChange)`, "font-size: 24px; color: crimson; background: black;");
	}
	
	private _onChange(event: PandaCheckboxChangeEvent): void {
		console.log(`%c ⚡ (_onChange)`, "font-size: 24px; color: crimson; background: black;", event);
		
	}
}


// Register the custom element
if (!customElements.get("panda-checkbox-group")) {
	customElements.define("panda-checkbox-group", PandaCheckboxGroup);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-checkbox-group": PandaCheckboxGroup;
	}
}




// 	// css styles
// 	static get styles() {
// 		return groupStyles;
// 	}

// 	@property({ type: String, reflect: true })
// 	label!: string;

// 	@property({ type: Boolean, reflect: true })
// 	disabled: boolean = false;

// 	@property({ type: Boolean, reflect: true })
// 	horizontal: boolean = false;

// 	// state props
// 	@queryAssignedElements()
// 	private _slotNodes!: HTMLElement[];

// 	private _checkboxEls: HTMLElement[] = []; // all checkbox elements with event listeners

// 	@state()
// 	initialized: boolean = false;

// 	// events
// 	private _onChangeEvent: any = this._onChange.bind(this);

// 	// ================================================================================================================
// 	// LIFE CYCLE =====================================================================================================
// 	// ================================================================================================================

// 	disconnectedCallback(): void {
// 		super.disconnectedCallback();
// 		// remove event listeners
// 		this._checkboxEls.forEach((checkboxEl) => {
// 			checkboxEl.removeEventListener("change", this._onChangeEvent);
// 		});
// 		// clean up
// 		this._checkboxEls = [];
// 	}

// 	// ================================================================================================================
// 	// RENDERERS ======================================================================================================
// 	// ================================================================================================================

// 	protected render(): TemplateResult {
// 		const horizontal = this.horizontal ? " horizontal" : "";
// 		let labelHtml: TemplateResult = html``;

// 		if (this.label) {
// 			labelHtml = html`<div class="label" part="label">${this.label}</div>`;
// 		}

// 		return html`
// 			${labelHtml}
// 			<slot
// 				class="checkbox-group"
// 				part="checkbox-group"
// 				@slotchange="${this._onSlotChange}"
// 			>
// 			</slot>
// 		`;
// 	}

// 	// ================================================================================================================
// 	// HELPERS ========================================================================================================
// 	// ================================================================================================================

// 	private _triggerChangeEvent(name: string, checked: boolean): void {
// 		const event: PandaCheckboxChangeEvent = new CustomEvent('change', {
// 			detail: {
// 				name,
// 				checked,
// 			}
// 		});
// 		this.dispatchEvent(event);
// 		console.log("%c _triggerChangeEvent", "font-size: 24px; color: orange;", event);
// 	}

// 	// ================================================================================================================
// 	// EVENTS =========================================================================================================
// 	// ================================================================================================================

// 	private _onSlotChange(): void {
// 		console.log("%c _onSlotChange", "font-size: 24px; color: red;", this._slotNodes);
// 		// remove existing event listeners
// 		if (this.initialized) {
// 			this._checkboxEls.forEach((checkboxEl) => {
// 				checkboxEl.removeEventListener("change", this._onChangeEvent);
// 			});
// 			// clean up
// 			this._checkboxEls = [];
// 		}
// 		// add event listeners
// 		this._slotNodes.forEach((checkboxEl) => {
// 			console.log("%c _onSlotChange -> _slotNodes", "font-size: 24px; color: red;", checkboxEl);
// 			checkboxEl.addEventListener("change", this._onChangeEvent);
// 			this._checkboxEls.push(checkboxEl);
// 		});
// 	}

// 	private _onChange(event: PandaCheckboxChangeEvent): void {
// 		if (!this.disabled) {
// 			const { name, checked } = event.detail;
// 			this._triggerChangeEvent(name, checked);
// 		}
// 	}
// }

// declare global {
// 	interface HTMLElementTagNameMap {
// 		"panda-checkbox-group": PandaCheckboxGroup;
// 	}
// }
