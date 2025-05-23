// types
import { PandaDetailsDialogOverlay } from "./panda-details-dialog-overlay";

// styles
import { styles } from "./styles/styles";

// components
import "./panda-details-dialog-overlay";

// utils
import { LitElement, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-details-dialog")
export class PandaDetailsDialog extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: String, reflect: true })
	for!: string;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	opened: boolean = false;

	@property({ type: Boolean, attribute: "no-close-on-outside-click", reflect: true })
	noCloseOnOutsideClick: boolean = false;

	@property({ type: Boolean, attribute: "no-close-on-esc", reflect: true })
	noCloseOnEsc: boolean = false;

	@property({ type: String })
	customStyle!: string;

	// HTML Elements

	private _contextEl!: Element;

	private readonly _template: Element = document.createElement("div");

	private _dialog: PandaDetailsDialogOverlay | null = null;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		Array
			.from(this.children)
			.forEach((child) => {
				if (child.tagName === "TEMPLATE" || typeof child.getAttribute("template") === "string") {
					this._template.innerHTML = child.innerHTML;
				}
			});

		// find popover context
		this._getContextElement();
		// add global event listener for external use
		document.addEventListener("panda-dialog-close", this._onCloseDialogOverlay.bind(this));
	}

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		if (_changedProperties.has("disabled") && this.disabled) {
			this._closeDialog();
		}
		if (_changedProperties.has("opened") && this.opened) {
			this._openDialog();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this._dialog !== null) {
			document.body.removeChild(this._dialog);
		}
		// remove global event listener
		document.removeEventListener("panda-dialog-close", this._onCloseDialogOverlay.bind(this));
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================
	
	private _getContextElement() {
		// check if we have context id
		if (this.for) {
			// get context element by id
			this._contextEl = this.parentNode?.querySelector(`#${this.for}`) as Element;
			if (!this._contextEl) {
				console.warn("%c [PANDA POPOVER] Context element not found for:", "font-size: 16px;", this.for);
			}
		}
	}

	private _openDialog(): void {
		// check if dialog already exists
		if (this._dialog === null) {
			this._dialog = document.createElement("panda-details-dialog-overlay");
			// set overlay props
			this._dialog.template = this._template;
			this._dialog.customStyle = this.customStyle;
			this._dialog.contextElement = this._contextEl;
			this._dialog.noCloseOnEsc = this.noCloseOnEsc;
			this._dialog.noCloseOnOutsideClick = this.noCloseOnOutsideClick;
			// add events listeners
			this._dialog.addEventListener("close", this._onCloseDialogOverlay.bind(this));
			// append overlay to the document body
			document.body.appendChild(this._dialog);
		}
	}

	private _closeDialog() {
		if (this._dialog !== null) {
			// remove event listeners
			this._dialog.removeEventListener("close", this._onCloseDialogOverlay.bind(this));
			document.body.removeChild(this._dialog);
			this._dialog = null;
		}
	}

	private _triggerCloseEvent(): void {
		const event = new CustomEvent("close", {});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onCloseDialogOverlay(): void {
		this._closeDialog();
		this._triggerCloseEvent();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-details-dialog": PandaDetailsDialog;
	}
}
