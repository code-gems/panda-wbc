// types

// components
import "@panda-wbc/panda-icon";

// styles
import { styles } from "./styles/styles";

// utils
import { applyStyles } from "@panda-wbc/panda-utils/lib/component-utils";

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
			if (value) {
				this.setAttribute("theme", value + "");
			} else {
				this.removeAttribute("theme");
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
			if (value) {
				this.setAttribute("icon", value + "");
			} else {
				this.removeAttribute("icon");
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
			if (value == null || value === "") {
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
	private _chipEl!: HTMLElement;
	private _closeButtonContEl!: HTMLDivElement;
	private _closeButtonEl!: HTMLDivElement;
	
	// events =========================================================================================================
	private _closeEvent!: EventListener;

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

	}

	connectedCallback() {
		// add event listeners
		this._closeEvent = this._onClose.bind(this);
		this.addEventListener("close", this._closeEvent);
		// initial component render
		this._updateComponent();
	}

	disconnectedCallback(): void {
		// remove event listeners

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
		}
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

		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onClose(): void {
		this.dispatchEvent(new CustomEvent("close", {}));
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