// styles
import { styles } from "./styles/overlay-styles";

// utils
import { applyStyles, parseBooleanAttribute } from "@panda-wbc/panda-utils/lib/component-utils";

export class PandaDialogOverlay extends HTMLElement {
	/** Version of the component. */
	public static readonly version = "1.0.0";
	
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = [
		"no-close-on-outside-click",
		"no-close-on-esc"
	];

	/**
	 * template
	 * --------
	 * The template content to be displayed in the dialog overlay.
	 * @type {Element | null}
	 * @public
	 */
	get template(): Element | null {
		return this._templateEl;
	}

	set template(value: Element | null) {
		this._templateEl = value;
	}

	private _templateEl!: Element | null;

	/**
	 * noCloseOnOutsideClick
	 * ----------------------
	 * Indicates whether the dialog should be closed when clicking outside of it.
	 * @default false
	 * @type {boolean}
	 * @attr no-close-on-outside-click
	 * @public
	 */
	get noCloseOnOutsideClick(): boolean {
		return this._noCloseOnOutsideClick;
	}

	set noCloseOnOutsideClick(value: boolean) {
		if (this._noCloseOnOutsideClick !== value) {
			this._noCloseOnOutsideClick = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._noCloseOnOutsideClick) {
				this.setAttribute("no-close-on-outside-click", "");
			} else {
				this.removeAttribute("no-close-on-outside-click");
			}
		}
	}

	private _noCloseOnOutsideClick!: boolean;

	/**
	 * noCloseOnEsc
	 * -------------
	 * Indicates whether the dialog should be closed when pressing [ESC] key.
	 * @default false
	 * @type {boolean}
	 * @attr no-close-on-esc
	 * @public
	 */
	get noCloseOnEsc(): boolean {
		return this._noCloseOnEsc;
	}

	set noCloseOnEsc(value: boolean) {
		if (this._noCloseOnEsc !== value) {
			this._noCloseOnEsc = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._noCloseOnEsc) {
				this.setAttribute("no-close-on-esc", "");
			} else {
				this.removeAttribute("no-close-on-esc");
			}
		}
	}

	private _noCloseOnEsc!: boolean;

	/**
	 * customStyles
	 * -------------
	 * Custom styles to be applied to the dialog content. This can be used by the parent component to apply custom styles to the dialog content.
	 * @type {string}
	 * @public
	 */
	get customStyles(): string {
		return this._customStyles;
	}

	set customStyles(value: string) {
		if (this._customStyles !== value) {
			this._customStyles = value;
		}
	}

	private _customStyles!: string;

	// private properties =============================================================================================
	private _preventClose!: boolean;

	// elements
	private readonly _overlayEl!: HTMLDivElement;
	private readonly _contentEl!: HTMLDivElement | null;
	
	// events
	private _dialogCloseEvent!: EventListener;
	private _keyPressEvent!: ((event: KeyboardEvent) => void);
	private _closeOverlayEvent!: EventListener;
	private _preventCloseEvent!: EventListener;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });

		// apply component styles
		applyStyles(styles, this.shadowRoot);
		
		// apply template
		this.shadowRoot!.innerHTML = /*html*/`
			<div class="dialog-overlay" part="dialog-overlay">
				<div class="content" part="content"></div>
			</div>
		`;

		// initialize class props
		this._preventClose = false;
		this._noCloseOnOutsideClick = false;
		this._noCloseOnEsc = false;

		if (this.shadowRoot) {
			// get elements handle
			this._overlayEl = this.shadowRoot.querySelector(".dialog-overlay") as HTMLDivElement;
			this._contentEl = this.shadowRoot.querySelector(".content") as HTMLDivElement;
		}
	}

	connectedCallback(): void {
		// add event listeners
		this._dialogCloseEvent = this._triggerCloseEvent.bind(this);
		document.addEventListener("panda-dialog-close", this._dialogCloseEvent);
		this._keyPressEvent = this._onKeyPress.bind(this);
		document.addEventListener("keydown", this._keyPressEvent);
		this._closeOverlayEvent = this._onCloseOverlay.bind(this);
		this._overlayEl.addEventListener("click", this._closeOverlayEvent);
		this._preventCloseEvent = this._onPreventClose.bind(this);
		this._contentEl!.addEventListener("click", this._preventCloseEvent);

		console.log(`%c ⚡ (connectedCallback) template`, "font-size: 24px; color: crimson; background: black;", this._templateEl, this.isConnected);

		// apply custom styles if any
		this._applyCustomStyles();
		// apply content if template is already set
		this._applyContent();
	}

	disconnectedCallback(): void {
		// remove events
		document.removeEventListener("panda-dialog-close", this._dialogCloseEvent);
		document.removeEventListener("keydown", this._keyPressEvent);
		this._overlayEl.removeEventListener("click", this._closeOverlayEvent);
		this._contentEl!.removeEventListener("click", this._preventCloseEvent);
	}

	attributeChangedCallback(_name: string, _oldValue: string, _newValue: string): void {
		// do not process if value did not change
		if (_oldValue === _newValue) {
			return;
		}
		switch (_name) {
			case "no-close-on-outside-click":
				this._noCloseOnOutsideClick = parseBooleanAttribute(_newValue);
				break;
			case "no-close-on-esc":
				this._noCloseOnEsc = parseBooleanAttribute(_newValue);
				break;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Apply custom styles to the dialog overlay */
	private _applyCustomStyles(): void {
		if (this._customStyles != null) {
			applyStyles([styles, this._customStyles], this.shadowRoot);
		}
	}

	/** Apply template content to dialog overlay */
	private _applyContent(): void {
		console.log(`%c ⚡ (applyContent) template`, "font-size: 24px; color: crimson; background: black;", this._templateEl, this.isConnected);
		if (this.isConnected && this._templateEl != null) {
			if (this._templateEl instanceof HTMLTemplateElement) {
				this._contentEl!.appendChild(this._templateEl.content.cloneNode(true));
			} else {
				this._contentEl!.appendChild(this._templateEl);
			}
		} else {
			console.log(
				`%c [PANDA DIALOG OVERLAY] (applyContent) Template element is null or component is not connected`, 
				"font-size: 16px; color: orange; background: black;", 
				this._templateEl,
				this.isConnected
			);
		}
	}

	private _triggerCloseEvent(): void {
		this.dispatchEvent(new CustomEvent("close", {}));
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onPreventClose(): void {
		// stopping propagation or preventing event will cause input type="file" to not work...
		// hence this is the working solution
		this._preventClose = true;
	}

	private _onCloseOverlay(): void {
		if (this._preventClose) {
			this._preventClose = false;
		} else if (!this._noCloseOnOutsideClick) {
			this._triggerCloseEvent();
		}
	}
	
	private _onKeyPress(event: KeyboardEvent): void {
		// check if [ESC] key was pressed
		if (event.key === "Escape" && !this._noCloseOnEsc) {
			this._triggerCloseEvent();
		}
	}
}

// Register the custom element
if (!customElements.get("panda-dialog-overlay")) {
	customElements.define("panda-dialog-overlay", PandaDialogOverlay);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-dialog-overlay": PandaDialogOverlay;
	}
}
