// types
import { PandaDialogOverlay } from "./panda-dialog-overlay";

// styles
import { styles } from "./styles/styles";

// components
import "./panda-dialog-overlay";

// utils
import { LitElement, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-dialog")
export class PandaDialog extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: Boolean, attribute: true, reflect: true })
	opened: boolean = false;

	// HTML Elements
	private _template: Element = document.createElement("div");
	private _dialog: PandaDialogOverlay | null = null;

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

		// add global event listener for external use
		document.addEventListener("panda-dialog-close", this._onCloseDialogOverlay.bind(this));
	}

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
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

	private _openDialog(): void {
		// check if dialog already exists
		if (this._dialog === null) {
			this._dialog = document.createElement("panda-dialog-overlay");
			// set overlay props
			this._dialog.template = this._template;
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
		"panda-dialog": PandaDialog;
	}
}
