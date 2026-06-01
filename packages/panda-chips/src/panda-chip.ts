// types

// components
import "@panda-wbc/panda-icon";

// styles
import { styles } from "./styles/styles";

// utils
import { applyStyles, parseBooleanAttribute } from "@panda-wbc/panda-utils/lib/component-utils";
import { PandaIcon } from "@panda-wbc/panda-icon";
import { isEmpty } from "@panda-wbc/panda-utils";
import { PandaSpinner } from "@panda-wbc/panda-spinner";

export class PandaChip extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// observed attributes ============================================================================================

	static get observedAttributes() {
		return [
			"theme",
			"icon",
			"readonly",
			"working",
			"disabled",
			"closable",
			"spinner-type",
		];
	}

	/**
	 * theme
	 * ---
	 * The theme of the component. Can be used to apply different styles based on the theme.
	 * @type {string}
	 * @attr theme
	 * @default ""
	 * @public
	 * @example
	 * ```html
	 * <panda-chip theme="primary"></panda-chip>
	 * ```
	 */
	get theme() {
		return this._theme;
	}

	set theme(value: string) {
		if (this._theme !== value) {
			this._theme = value;
			// reflect to attribute
			if (isEmpty(value)) {
				this.removeAttribute("theme");
			} else {
				this.setAttribute("theme", value + "");
			}
		}
	}

	private _theme!: string;

	/**
	 * icon
	 * ---
	 * The icon of the component. Can be used to display an icon in the component.
	 * @type {string}
	 * @attr icon
	 * @default ""
	 * @public
	 * @example
	 * ```html
	 * <panda-chip icon="check"></panda-chip>
	 * ```
	 */
	get icon() {
		return this._icon;
	}

	set icon(value: string) {
		if (this._icon !== value) {
			this._icon = value;
			// reflect to attribute
			if (isEmpty(value)) {
				this.removeAttribute("icon");
			} else {
				this.setAttribute("icon", value + "");
			}
		}
	}

	private _icon!: string;

	/**
	 * readonly
	 * ---
	 * Whether the component is in readonly state. Can be used to disable interactions in the component.
	 * Read-only state is different from disabled state in that it can still be focusable and selectable, but not interactive.
	 * @type {boolean}
	 * @attr readonly
	 * @default false
	 * @public
	 * @example
	 * ```html
	 * <panda-chip readonly></panda-chip>
	 * ```
	 */
	get readonly() {
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

	private _readonly!: boolean;

	/**
	 * working
	 * ---
	 * Whether the component is in working state. Can be used to display a loading state in the component.
	 * @type {boolean}
	 * @attr working
	 * @default false
	 * @public
	 * @example
	 * ```html
	 * <panda-chip working></panda-chip>
	 * ```
	 */
	get working() {
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

	private _working!: boolean;

	/**
	 * disabled
	 * ---
	 * Whether the component is disabled.
	 * @type {boolean}
	 * @attr disabled
	 * @default false
	 * @public
	 * @example
	 * ```html
	 * <panda-chip disabled></panda-chip>
	 * ```
	 */
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

	private _disabled!: boolean;
	
	/**
	 * spinnerType
	 * ---
	 * The type of the spinner to be displayed when the component is in working state.
	 * @type {string}
	 * @attr spinner-type
	 * @default "dots"
	 * @public
	 * @example
	 * ```html
	 * <panda-chip spinner-type="video"></panda-chip>
	 * ```
	 */
	get spinnerType() {
		return this._spinnerType;
	}

	set spinnerType(value: string) {
		if (this._spinnerType !== value) {
			this._spinnerType = value;
			// reflect to attribute
			if (isEmpty(value)) {
				this._spinnerType = "dots";
				this.removeAttribute("spinner-type");
			} else {
				this.setAttribute("spinner-type", this._spinnerType + "");
			}
		}
	}

	private _spinnerType!: string;

	/**
	 * closable
	 * ---
	 * Whether the component is closable. If true, will display a close button in the component.
	 * @type {boolean}
	 * @attr closable
	 * @default false
	 * @public
	 * @example
	 * ```html
	 * <panda-chip closable></panda-chip>
	 * ```
	 */
	get closable() {
		return this._closable;
	}

	set closable(value: boolean) {
		if (this._closable !== value) {
			this._closable = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("closable", "");
			} else {
				this.removeAttribute("closable");
			}
		}
	}

	private _closable!: boolean;

	// state properties ===============================================================================================
	
	// elements =======================================================================================================
	private readonly _chipEl!: HTMLElement;
	private readonly _iconContEl!: HTMLDivElement;
	private readonly _iconEl!: PandaIcon;
	private readonly _closeButtonContEl!: HTMLDivElement;
	private readonly _closeButtonEl!: HTMLDivElement;
	private readonly _spinnerContEl!: HTMLDivElement;
	private readonly _spinnerEl!: PandaSpinner;

	// events =========================================================================================================
	private readonly _closeEvent!: EventListener;
	private readonly _closeButtonKeyDownEvent!: EventListener;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// apply component styles
		applyStyles(styles, this.shadowRoot);

		// create component template
		this.shadowRoot!.innerHTML = /*html*/`
			<div class="chip" part="chip">
				<slot class="label" part="label"></slot>
			</div>
		`;
		
		// create spinner element
		this._spinnerContEl = document.createElement("div");
		this._spinnerContEl.className = "spinner-cont";
		this._spinnerContEl.part = "spinner-cont";
		this._spinnerContEl.innerHTML = /*html*/`<panda-spinner part="spinner"></panda-spinner>`;
		this._spinnerEl = this._spinnerContEl.querySelector("panda-spinner") as PandaSpinner;
		this._spinnerEl.spinner = this._spinnerType ?? "dots";

		// create close button element
		this._closeButtonContEl = document.createElement("div");
		this._closeButtonContEl.className = "close-button-cont";
		this._closeButtonContEl.part = "close-button-cont";
		this._closeButtonContEl.innerHTML = /*html*/`
			<div class="close-button" part="close-button">
				<panda-icon icon="close" class="close-icon" part="close-icon"></panda-icon>
			</div>
		`;
		this._closeButtonEl = this._closeButtonContEl.querySelector(".close-button") as HTMLDivElement;
		this._closeButtonEl.tabIndex = 0; // make close button focusable

		// create icon element
		this._iconContEl = document.createElement("div");
		this._iconContEl.className = "icon-cont";
		this._iconContEl.part = "icon-cont";
		this._iconContEl.innerHTML = /*html*/`
			<div class="icon" part="icon">
				<panda-icon icon="check"></panda-icon>
			</div>
		`;
		this._iconEl = this._iconContEl.querySelector("panda-icon") as PandaIcon;

		// initialize event binders
		this._closeEvent = this._onClose.bind(this);
		this._closeButtonKeyDownEvent = this._onCloseButtonKeyDown.bind(this) as EventListener;

		if (this.shadowRoot) {
			// get elements handle
			this._chipEl = this.shadowRoot.querySelector(".chip") as HTMLElement;
		}
	}

	connectedCallback() {
		// add event listeners
		this._closeButtonEl.addEventListener("click", this._closeEvent);
		this._closeButtonEl.addEventListener("keydown", this._closeButtonKeyDownEvent);
		// initial component render
		this._updateComponent();
	}

	disconnectedCallback(): void {
		// remove event listeners
		this._closeButtonEl.removeEventListener("click", this._closeEvent);
		this._closeButtonEl.removeEventListener("keydown", this._closeButtonKeyDownEvent);
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
			case "icon":
				this._icon = _newValue;
				break;
			case "readonly":
				this._readonly = parseBooleanAttribute(_newValue);
				break;
			case "working":
				this._working = parseBooleanAttribute(_newValue);
				break;
			case "disabled":
				this._disabled = parseBooleanAttribute(_newValue);
				break;
			case "closable":
				this._closable = parseBooleanAttribute(_newValue);
				break;
			case "spinner-type":
				this._spinnerType = _newValue;
				break;
		}
		// update component based on new attribute value
		this._updateComponent();
	}
	
	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _updateComponent(): void {
		if (this.isConnected) {
			if (this._disabled || this._working) {
				this._chipEl.tabIndex = -1;
			} else {
				this._chipEl.tabIndex = 0;
			}

			if (isEmpty(this._icon)) {
				this._iconContEl.remove();
			} else {
				this._chipEl.prepend(this._iconContEl);
				this._iconEl.icon = this._icon;
			}

			// check if closable
			if (this._closable && !this.disabled && !this.working && !this._readonly) {
				this._chipEl.appendChild(this._closeButtonContEl);
			} else {
				this._closeButtonContEl.remove();
			}

			// check if working
			if (this._working && !this._disabled) {
				this._chipEl.appendChild(this._spinnerContEl);
			} else {
				this._spinnerContEl.remove();
			}

			// update template css classes and parts
			this._updateTemplateCss();
		}
	}

	// update template css classes and parts
	private _updateTemplateCss():void {
		const css: string[] = [];

		if (this._working) {
			css.push("working");
		}
		if (this._readonly) {
			css.push("readonly");
		}
		if (this._disabled) {
			css.push("disabled");
		}
		if (this._closable && !this._disabled && !this._working && !this._readonly) {
			css.push("closable");
		}
		if (!isEmpty(this._icon)) {
			css.push("with-icon");
		}
		// update class names and parts
		this._chipEl.className = "chip " + css.join(" ");
		this._chipEl.part = this._chipEl.className;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onClose(): void {
		console.log(`%c ⚡ [PANDA CHIP] (_onClose)`, "font-size: 24px; color: green; background: black;"); // todo: remove
		this.dispatchEvent(new CustomEvent("on-close", {}));
	}

	private _onCloseButtonKeyDown(event: KeyboardEvent): void {
		// trigger close event on Enter or Space key press
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			this._onClose();
		}
	}
}

// Register the custom element
if (!customElements.get("panda-chip")) {
	customElements.define("panda-chip", PandaChip);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-chip": PandaChip;
	}
}