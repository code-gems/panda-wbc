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
				console.log("%c child", "font-size: 24px; color: green;", child, typeof child.getAttribute("template") === "string");
				if (child.tagName === "TEMPLATE" || typeof child.getAttribute("template") === "string") {
					this._template.innerHTML = child.innerHTML;
				}
			});

		console.log("%c TEMPLATE", "font-size: 24px; color: green;", this._template.innerHTML);
	}

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		if (_changedProperties.has("opened") && this.opened) {
			console.log("%c updated -> opened", "font-size: 24px; color: green;", this.opened);
			this._openDialog();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this._dialog !== null) {
			document.body.removeChild(this._dialog);
			console.log("%c disconnectedCallback -> removed dialog ", "font-size: 24px; color: orange;");
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _openDialog(): void {
		// check if dialog already exists
		if (this._dialog === null) {
			console.log("%c _openDialog", "font-size: 24px; color: orange;", this._template);
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
		console.log("%c _onCloseDialogOverlay", "font-size: 24px; color: green;");
		this._closeDialog();
	}
	
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-dialog": PandaDialog;
	}
}
