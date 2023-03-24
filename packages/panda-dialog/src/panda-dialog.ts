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

	@property({ type: Boolean, attribute: true })
	opened: boolean = false;

	// HTML Elements
	private _template: Element = document.createElement("div");
	private _dialog: PandaDialogOverlay | null = null;

	// events
	private _closeDialogEvent = this._onCloseDialogOverlay.bind(this);

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
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _openDialog(): void {
		// check if dialog already exists
		if (this._dialog === null) {
			this._dialog = document.createElement("panda-dialog-overlay");
			// set overlay props
			this._dialog.template = this._template;
			// add events
			this._dialog.addEventListener("close", this._closeDialogEvent);
			// append overlay to the document body
			document.body.appendChild(this._dialog);
		}
	}

	private _closeDialog() {
		if (this._dialog !== null) {
			document.body.removeChild(this._dialog);
			this._dialog = null;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onCloseDialogOverlay(): void {
		this._closeDialog();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-dialog": PandaDialog;
	}
}
