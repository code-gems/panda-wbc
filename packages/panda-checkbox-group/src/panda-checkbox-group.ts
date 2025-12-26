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
	private _checkboxEls!: Element[];

	// elements
	private _checkboxGroupEl!: HTMLSlotElement;
	private _labelEl!: HTMLDivElement;

	// events
	private readonly _slotChangeEvent!: any;

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
		this._theme = "";
		this._disabled = false;
		this._alignRight = false;
		this._horizontal = false;
		this._checkboxEls = [];

		// init events
		this._slotChangeEvent = this._onSlotChange.bind(this);

		// get template element handles
		if (this.shadowRoot) {
			// get elements handle
			this._checkboxGroupEl = this.shadowRoot.querySelector(".checkbox-group") as HTMLSlotElement;
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
			case "horizontal":
				this._horizontal = this._parseBooleanAttribute(_newValue);
				break;
			case "label":
				this._label = _newValue;
				break;
			case "theme":
				this._theme = _newValue;
				this._updateCheckboxes();
				break;
			case "disabled":
				this._disabled = this._parseBooleanAttribute(_newValue);
				this._updateCheckboxes();
				break;
			case "alignright":
			case "align-right":
				this._alignRight = this._parseBooleanAttribute(_newValue);
				this._updateCheckboxes();
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

	/** Parses the checkboxes assigned to the slot and updates the internal list. */
	private _parseCheckboxes(): void {
		console.log(`%c ⚡ (_parseCheckboxes)`, "font-size: 24px; color: crimson; background: black;");
		const assignedElements = this._checkboxGroupEl.assignedElements({ flatten: true });
		this._checkboxEls = [];
		assignedElements.forEach((checkboxEl) => {
			console.log(`%c ⚡ (_parseCheckboxes) checkboxEl`, "font-size: 24px; color: crimson; background: black;", checkboxEl, checkboxEl.tagName);
			if (checkboxEl.tagName.toLowerCase() === "panda-checkbox") {
				this._checkboxEls.push(checkboxEl);
			}
		});
		console.log(`%c ⚡ (_parseCheckboxes) final`, "font-size: 24px; color: crimson; background: black;", this._checkboxEls);
	}

	/** Updates all checkboxes in the group based on the group properties. */
	private _updateCheckboxes(): void {
		this._checkboxEls.forEach((checkboxEl) => {
			if (this._theme != null && this._theme !== "") {
				checkboxEl.setAttribute("theme", this._theme);
			} else {
				checkboxEl.removeAttribute("theme");
			}

			if (this._disabled) {
				checkboxEl.setAttribute("disabled", "true");
			} else {
				checkboxEl.removeAttribute("disabled");
			}

			if (this._alignRight) {
				checkboxEl.setAttribute("align-right", "true");
			} else {
				checkboxEl.removeAttribute("align-right");
			}
		});
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	
	/** Handles the slotchange event to re-parse checkboxes and update the component. */
	private _onSlotChange(): void {
		console.log(`%c ⚡ (_onSlotChange)`, "font-size: 24px; color: crimson; background: black;");
		this._parseCheckboxes();
		this._updateCheckboxes();
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
