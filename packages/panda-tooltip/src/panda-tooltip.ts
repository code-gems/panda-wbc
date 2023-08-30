// types
import { TooltipPosition } from "../index";
import { PandaTooltipOverlay } from "./panda-tooltip-overlay";

// styles
import { styles } from "./styles/styles";

// components
import "./panda-tooltip-overlay";

// utils
import { LitElement, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-tooltip")
export class PandaTooltip extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: String, attribute: true })
	for: string | null = null;

	@property({ type: String, attribute: true })
	position: TooltipPosition = TooltipPosition.TOP;

	private _contextEl!: Element;
	private _contextElRect!: DOMRect;

	// HTML Elements
	private _template: Element = document.createElement("div");
	private _tooltip: any | null = null;

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
		
		console.log("%c _template", "font-size: 24px; color: orange;", this._template);

		// find tooltip context
		this._getContextElement();
	}

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this._tooltip !== null) {
			document.body.removeChild(this._tooltip);
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _getContextElement() {
		console.log("%c _getContextElement", "font-size: 24px; color: green;", this.for);
		if (this.for) {
			console.log("%c parent node", "font-size: 24px; color: green;", this.parentNode);
			this._contextEl = this.parentNode?.querySelector(`#${this.for}`) as Element;

			if (this._contextEl) {
				console.log("%c contextEl", "font-size: 24px; color: green;", this._contextEl);

				const _contextElRect: DOMRect = this._contextEl.getBoundingClientRect();
				console.log("%c contextEl DOMRect", "font-size: 24px; color: green;", _contextElRect);
			

			} else {
				console.warn("%c [PANDA TOOLTIP] Context element not found for:", "font-size: 16px;", this.for);
				
			}
		}
	}

	private _showTooltip(): void {
		// check if tooltip already exists
		if (this._tooltip === null) {
			this._tooltip = document.createElement("panda-tooltip-overlay");
			// set overlay props
			this._tooltip.template = this._template;
			// add events
			this._tooltip.addEventListener("close", this._closeDialogEvent);
			// append overlay to the document body
			document.body.appendChild(this._tooltip);
		}
	}

	private _hideTooltip() {
		if (this._tooltip !== null) {
			document.body.removeChild(this._tooltip);
			this._tooltip = null;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onCloseDialogOverlay(): void {
		this._hideTooltip();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-tooltip": PandaTooltip;
	}
}
