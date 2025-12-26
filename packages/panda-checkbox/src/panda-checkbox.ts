// types
import { PandaCheckboxChangeEvent } from "../index";

// style
import { styles } from "./styles/styles";

export class PandaCheckbox extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = [
		"theme",
		"name",
		"checked",
		"disabled",
		"indeterminate",
		"help-text",
		"strikethrough",
		"align-right",
		"alignright",
	];

	// theme ===========================================================================================================
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

	// name ===========================================================================================================
	private _name!: string;

	get name() {
		return this._name;
	}

	set name(value: string) {
		if (this._name !== value) {
			this._name = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("name", this._name);
			} else {
				this.removeAttribute("name");
			}
		}
	}

	// checked ========================================================================================================
	private _checked!: boolean;

	get checked() {
		return this._checked;
	}

	set checked(value: boolean) {
		if (this._checked !== value) {
			this._checked = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("checked", "");
			} else {
				this.removeAttribute("checked");
			}
		}
	}

	// disabled =======================================================================================================
	/**
	 * Indicates whether the checkbox is disabled.
	 * A disabled checkbox is non-interactive and cannot be changed by the user.
	 * This property is used to indicate that the option is not available for selection.
	 * When set to true, the checkbox will appear grayed out and will not respond to user input.
	 * Note: Disabled checkboxes do not submit their value in forms.
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

	// indeterminate ==================================================================================================
	/**
	 * Indicates whether the checkbox is in an indeterminate state.
	 * An indeterminate checkbox is neither checked nor unchecked.
	 * This property does not affect the "checked" property.
	 * It is typically used to represent a "partially selected" state.
	 * Note: The indeterminate state is visual only and does not affect form submission.
	 */
	private _indeterminate!: boolean;

	get indeterminate() {
		return this._indeterminate;
	}

	set indeterminate(value: boolean) {
		if (this._indeterminate !== value) {
			this._indeterminate = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("indeterminate", "");
			} else {
				this.removeAttribute("indeterminate");
			}
		}
	}

	// helpText =======================================================================================================
	/**
	 * Help text provides additional information about the checkbox.
	 * It is displayed below the checkbox label in a smaller font.
	 * This property is optional.
	 */
	private _helpText!: string;

	get helpText() {
		return this._helpText;
	}

	set helpText(value: string) {
		if (this._helpText !== value) {
			this._helpText = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("help-text", this._helpText);
			} else {
				this.removeAttribute("help-text");
			}
		}
	}

	// strikethrough ==================================================================================================
	/**
	 * Indicates whether the checkbox label should be displayed with a strikethrough style.
	 * This is to indicate that the option is no longer valid or has been removed.
	 * When set to true, the label text will have a line through it.
	 */
	private _strikethrough!: boolean;

	get strikethrough() {
		return this._strikethrough;
	}

	set strikethrough(value: boolean) {
		if (this._strikethrough !== value) {
			this._strikethrough = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("strikethrough", "");
			} else {
				this.removeAttribute("strikethrough");
			}
		}
	}

	// alignRight =====================================================================================================
	/**
	 * Indicates whether the checkbox should be aligned to the right side.
	 * When set to true, the checkbox will appear on the right side of the label.
	 * Default is false, meaning the checkbox is aligned to the left side.
	 * This property is useful for right-to-left (RTL) layouts or specific design requirements.
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
				this.setAttribute("align-right", "");
			} else {
				this.removeAttribute("align-right");
			}
		}
	}

	// view properties ================================================================================================

	private _ready!: boolean;

	// elements
	private readonly _checkboxEl!: HTMLDivElement;
	private readonly _labelEl!: HTMLDivElement;
	private readonly _helpTextEl!: HTMLDivElement;
	private readonly _iconEl!: HTMLDivElement;

	// events
	private readonly _onClickEvent!: any;
	private readonly _onKeyDownEvent!: any;

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
			<div class="checkbox" part="checkbox" tabindex="-1">
				<div class="icon" part="icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 18 18"
						preserveAspectRatio="xMidYMid meet"
						x="0"
						y="0"
					>
						<path
							class="box-outline"
							d="M15.001,16.499c0.828,0,1.498-0.67,1.498-1.498V3c0-0.828-0.67-1.501-1.498-1.501h-12
							C2.174,1.5,1.5,2.173,1.5,3v12c0,0.828,0.674,1.498,1.501,1.498H15.001 M15.001,18h-12C1.343,18,0,16.655,0,15.001V3
							c0-1.658,1.343-3,3.001-3h12C16.655,0,18,1.343,18,3v12C18,16.655,16.655,18,15.001,18z"
						/>
						<path
							class="box" 
							d="M15.001,18h-12C1.343,18,0,16.655,0,15.001V3c0-1.658,1.343-3,3.001-3h12C16.655,0,18,1.343,18,3v12
							C18,16.655,16.655,18,15.001,18z"
						/>
						<polyline class="check" points="3 9 7 13 15 5"/>
						<polyline class="dash" points="4 9 14 9"/>
					</svg>
				</div>
				<div class="label-cont" part="label-cont">
					<div class="label" part="label">
						<slot></slot>
					</div>
					<div class="help-text" part="help-text"></div>
				</div>
			</div>
		`;
		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._theme = "";
		this._name = "";
		this._checked = false;
		this._disabled = false;
		this._indeterminate = false;
		this._helpText = "";
		this._strikethrough = false;
		this._alignRight = false;
		this._ready = false;

		// init events
		this._onClickEvent = this._onClick.bind(this);
		this._onKeyDownEvent = this._onKeyDown.bind(this);

		// get template element handles
		if (this.shadowRoot) {
			// get elements handle
			this._checkboxEl = this.shadowRoot.querySelector(".checkbox") as HTMLDivElement;
			this._helpTextEl = this.shadowRoot.querySelector(".help-text") as HTMLDivElement;
			this._iconEl = this.shadowRoot.querySelector(".icon") as HTMLDivElement;
			this._labelEl = this.shadowRoot.querySelector(".label") as HTMLDivElement;

			// add event listeners
			this._checkboxEl.addEventListener("keydown", this._onKeyDownEvent);
			this._labelEl.addEventListener("click", this._onClickEvent);
			this._iconEl.addEventListener("click", this._onClickEvent);
		}
	}

	connectedCallback(): void {
		this._ready = true;
		this._updateComponent();
	}

	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
		// do not process if value did not change
		if (oldValue === newValue) {
			return;
		}

		switch (name) {
			case "theme":
				this._theme = newValue || "";
				break;
			case "name":
				this._name = newValue || "";
				break;
			case "help-text":
				this._helpText = newValue || "";
				break;
			case "checked":
				this._checked = this._parseBooleanAttribute(newValue);
				break;
			case "indeterminate":
				this._indeterminate = this._parseBooleanAttribute(newValue);
				break;
			case "disabled":
				this._disabled = this._parseBooleanAttribute(newValue);
				break;
			case "strikethrough":
				this._strikethrough = this._parseBooleanAttribute(newValue);
				break;
			case "alignright":
			case "align-right":
				this._alignRight = this._parseBooleanAttribute(newValue);
				break;
		}
		// update component
		this._updateComponent();
	}

	private _updateComponent(): void {
		if (this._ready) {
			// make component focusable
			if (this._disabled) {
				this._iconEl.tabIndex = -1;
			} else {
				this._iconEl.tabIndex = 0;
			}

			// check if help text is set
			if (this._helpText && this._helpText.length > 0) {
				this._helpTextEl.textContent = this._helpText;
				this._helpTextEl.style.display = "block";
			} else {
				this._helpTextEl.textContent = "";
				this._helpTextEl.style.display = "none";
			}

			// update css classes and parts
			this._updateTemplateCss();
		}
	}

	/** Update css classes and parts on the component template */
	private _updateTemplateCss(): void {
		const css: string[] = [];

		if (this._disabled) {
			css.push("disabled");
		}
		if (this._checked) {
			css.push("checked");
		}

		if (this._indeterminate) {
			css.push("indeterminate");
		}
		if (this._strikethrough) {
			css.push("strikethrough");
		}
		if (this._alignRight) {
			css.push("align-right");
		}

		// update css classes and parts
		const cssString = css.join(" ");
		this._checkboxEl.className = `checkbox ${cssString}`;
		this._checkboxEl.part = this._checkboxEl.className;
		this._iconEl.className = `icon ${cssString}`;
		this._iconEl.part = this._iconEl.className;
		this._labelEl.className = `label ${cssString}`;
		this._labelEl.part = this._labelEl.className;
		this._helpTextEl.className = `help-text ${cssString}`;
		this._helpTextEl.part = this._helpTextEl.className;
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

	private _triggerChangeEvent(): void {
		const event: PandaCheckboxChangeEvent = new CustomEvent("change", {
			detail: {
				checked: this._checked,
				name: this._name || undefined
			},
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onClick(): void {
		if (this._disabled) {
			return;
		}
		// toggle checked state
		if (this._indeterminate) {
			this._indeterminate = false;
			this.checked = true;
		} else {
			this.checked = !this._checked;
		}
		// update component and trigger change event
		this._updateComponent();
		this._triggerChangeEvent();
	}

	private _onKeyDown(event: KeyboardEvent): void {
		if (this._disabled) {
			return;
		}
		// handle key press
		switch (event.code) {
			case "Space":
			case "Enter":
				event.preventDefault();
				this._onClick();
				break;
		}
	}
}

// Register the custom element
if (!customElements.get("panda-checkbox")) {
	customElements.define("panda-checkbox", PandaCheckbox);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-checkbox": PandaCheckbox;
	}
}
