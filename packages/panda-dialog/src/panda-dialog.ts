// types
import { PandaDialogOverlay } from "./panda-dialog-overlay";

// styles
import { styles } from "./styles/styles";

// components
import "./panda-dialog-overlay";

// utils
import { applyStyles, parseBooleanAttribute } from "@panda-wbc/panda-utils/lib/component-utils";

export class PandaDialog extends HTMLElement {
	/** Version of the component. */
	public static readonly version = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = [
		"opened",
		"no-close-on-outside-click",
		"no-close-on-esc"
	];

	/**
	 * opened
	 * ------
	 * Indicates whether the dialog is opened or not.
	 * When set to true, the dialog will be opened.
	 * @default false
	 * @type {boolean}
	 * @attr opened
	 * @public
	 */
	get opened(): boolean {
		return this._opened;
	}

	set opened(value: boolean) {
		if (this._opened !== value) {
			this._opened = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._opened) {
				this.setAttribute("opened", "");
			} else {
				this.removeAttribute("opened");
			}
		}
	}

	private _opened!: boolean;

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
	 * -----------
	 * Indicates whether the dialog should be closed when pressing the Escape key.
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
	 * Custom styles for the dialog component. This can be used by the 
	 * parent component to apply custom styles to the dialog content.
	 * @type {string}
	 * @public
	 * @example (JavaScript)
	 * ```javascript
	 * const customStyles = `
	 *   .dialog {
	 *     background-color: red;
	 *   }
	 * `;
	 * 
	 * const dialog = document.querySelector("panda-dialog");
	 * dialog.customStyles = customStyles;
	 * ```
	 * @example (HTML)
	 * ```html
	 * <panda-dialog>
	 *   <div template>
	 *     <div class="dialog">
	 *       <h1>Custom Styled Dialog</h1>
	 *       <p>This dialog has custom styles applied to it.</p>
	 *     </div>
	 *   </div>
	 * </panda-dialog>
	 * ```
	 */
	get customStyles(): string {
		return this._customStyles;
	}

	set customStyles(value: string) {
		if (this._customStyles !== value) {
			this._customStyles = value;
			// apply custom styles to the dialog overlay
			if (this._dialogEl != null) {
				applyStyles(this._customStyles, this._dialogEl.shadowRoot);
			}
		}
	}

	private _customStyles!: string;

	// private properties =============================================================================================
	// elements
	private _templateEl!: Element | null;
	private _dialogEl!: PandaDialogOverlay | null;

	// events
	private _dialogCloseEvent!: EventListener;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================
	
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		// apply component styles
		applyStyles(styles, this.shadowRoot);

		// initialize class props
		this._templateEl = document.createElement("div");
		this._dialogEl = null;
		this._opened = false;
		this._noCloseOnOutsideClick = false;
		this._noCloseOnEsc = false;
	}

	connectedCallback(): void {
		Array
			.from(this.children)
			.forEach((child) => {
				if (child.tagName === "TEMPLATE" || typeof child.getAttribute("template") === "string") {
					this._templateEl = child;
				}
			});
		
		// add event listeners
		this._dialogCloseEvent = this._onCloseDialogOverlay.bind(this);
		document.addEventListener("panda-dialog-close", this._dialogCloseEvent);
		// update component
		this._updateComponent();
	}

	disconnectedCallback(): void {
		if (this._dialogEl != null) {
			this._dialogEl.remove();
		}
		// remove global event listener
		document.removeEventListener("panda-dialog-close", this._dialogCloseEvent);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// do not process if value did not change
		if (_oldValue === _newValue) {
			return;
		}
		switch (_name) {
			case "opened":
				this._opened = parseBooleanAttribute(_newValue);
				break;
			case "no-close-on-outside-click":
				this._noCloseOnOutsideClick = parseBooleanAttribute(_newValue);
				break;
			case "no-close-on-esc":
				this._noCloseOnEsc = parseBooleanAttribute(_newValue);
				break;
		}
		// update component
		this._updateComponent();
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _updateComponent(): void {
		if (this.isConnected) {
			// open or close dialog
			if (this._opened) {
				this._openDialog();
			} else {
				this._closeDialog();
			}
			
			// update dialog props
			if (this._dialogEl != null) {
				this._dialogEl.noCloseOnEsc = this.noCloseOnEsc;
				this._dialogEl.noCloseOnOutsideClick = this.noCloseOnOutsideClick;
			}
		}
	}

	private _openDialog(): void {
		// check if dialog already exists
		if (this._dialogEl == null) {
			this._dialogEl = document.createElement("panda-dialog-overlay");
			// set overlay props
			this._dialogEl.template = this._templateEl;
			this._dialogEl.noCloseOnEsc = this.noCloseOnEsc;
			this._dialogEl.noCloseOnOutsideClick = this.noCloseOnOutsideClick;
			this._dialogEl.customStyles = this.customStyles;
			// add events listeners
			this._dialogEl.addEventListener("close", this._dialogCloseEvent);
			// append overlay to the document body
			document.body.appendChild(this._dialogEl);
		}
	}

	private _closeDialog() {
		if (this._dialogEl != null) {
			// remove event listeners
			this._dialogEl.removeEventListener("close", this._dialogCloseEvent);
			this._dialogEl.remove();
			this._dialogEl = null;
			// reset opened state
			this.opened = false;

			// trigger close event
			const event = new CustomEvent("close", {});
			this.dispatchEvent(event);
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onCloseDialogOverlay(): void {
		this._closeDialog();
	}
}

// Register the custom element
if (!customElements.get("panda-dialog")) {
	customElements.define("panda-dialog", PandaDialog);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-dialog": PandaDialog;
	}
}
