// types
import { ElementDetails, TooltipPosition } from "../index";
import { PandaTooltipOverlay } from "./panda-tooltip-overlay";

// styles
import { styles } from "./styles/styles";

// components
import "./panda-tooltip-overlay";

// utils
import { LitElement, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import { minValue } from "./utils/utils";

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

	@property({ type: Boolean, attribute: true })
	opened: boolean = false;

	@property({ type: String, attribute: true })
	delay: number = 500;

	private _contextEl!: Element;

	// HTML Elements
	private _templateEl: Element = document.createElement("div");
	private _overlayEl: PandaTooltipOverlay | null = null;

	// events
	private _showTooltipEvent = this._onStartTimerShow.bind(this);
	private _hideTooltipEvent = this._onStartTimerHide.bind(this);
	private _immediateHideTooltipEvent = this._hideTooltip.bind(this);

	// timers
	private _showTimer: any = null;
	private _hideTimer: any = null;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		Array
			.from(this.children)
			.forEach((child) => {
				if (child.tagName === "TEMPLATE" || typeof child.getAttribute("template") === "string") {
					this._templateEl.innerHTML = child.innerHTML;
				}
			});

		// find tooltip context
		this._getContextElement();
	}

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		if (_changedProperties.has("opened") && this.opened) {
			this._getContextElement();
			setTimeout(() => {
				this._showTooltip();
			}, 0);
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// clear timers
		clearTimeout(this._showTimer);
		clearTimeout(this._showTimer);
		// clean up
		if (this._overlayEl !== null) {
			// remove context events
			this._contextEl.removeEventListener("mouseover", this._showTooltipEvent);
			this._contextEl.removeEventListener("mouseout", this._hideTooltipEvent);
			// remove tooltip overlay events
			this._overlayEl.removeEventListener("mouseover", this._showTooltipEvent);
			this._overlayEl.removeEventListener("mouseout", this._hideTooltipEvent);
			this._overlayEl.removeEventListener("hide", this._immediateHideTooltipEvent);
			// remove tooltip overlay from DOM
			document.body.removeChild(this._overlayEl);
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
		// check if we have context id
		if (this.for) {
			// get context element by id
			this._contextEl = this.parentNode?.querySelector(`#${this.for}`) as Element;
			if (this._contextEl) {
				// add events
				this._contextEl.addEventListener("mouseover", this._showTooltipEvent);
				this._contextEl.addEventListener("mouseout", this._hideTooltipEvent);
			} else {
				console.warn("%c [PANDA TOOLTIP] Context element not found for:", "font-size: 16px;", this.for);
			}
		}
	}

	private _showTooltip(): void {
		// check if tooltip already exists
		if (this._overlayEl === null) {
			this._overlayEl = document.createElement("panda-tooltip-overlay");
			// set overlay props
			this._overlayEl.template = this._templateEl;
			this._overlayEl.position = this.position;
			this._overlayEl.contextElementDetails = this._getElementDetails();
			// add events
			this._overlayEl.addEventListener("mouseover", this._showTooltipEvent);
			this._overlayEl.addEventListener("mouseout", this._hideTooltipEvent);
			this._overlayEl.addEventListener("hide", this._immediateHideTooltipEvent);
			// append overlay to the document body
			document.body.appendChild(this._overlayEl);
		}
	}

	private _getElementDetails(): ElementDetails {
		const rect = this._contextEl.getBoundingClientRect();
		const top = minValue(rect.top + window.scrollY, 0);
		const left = minValue(rect.left + window.scrollX, 0);
		const bottom = minValue(rect.bottom + window.scrollY, 0);
		const right = minValue(rect.right + window.scrollX, 0);

		return {
			width: rect.width,
			height: rect.height,
			top,
			left,
			bottom,
			right,
			target: this._contextEl
		};
	}

	private _hideTooltip() {
		if (this._overlayEl !== null) {
			document.body.removeChild(this._overlayEl);
			this._overlayEl = null;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onStartTimerShow() {
		// cancel hide timer
		if (this._hideTimer) {
			clearTimeout(this._hideTimer);
			this._hideTimer = null;
		}

		// start show tooltip countdown
		if (this._showTimer === null) {
			this._showTimer = setTimeout(() => {
				this._showTooltip();
				clearTimeout(this._showTimer);
				this._showTimer = null;
			}, this.delay);
		}
	}

	private _onStartTimerHide() {
		// cancel show timer
		if (this._showTimer) {
			clearTimeout(this._showTimer);
			this._showTimer = null;
		}

		// start hide tooltip countdown
		if (this._hideTimer === null) {
			this._hideTimer = setTimeout(() => {
				this._hideTooltip();
				clearTimeout(this._hideTimer);
				this._hideTimer = null;
			}, this.delay || 300);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-tooltip": PandaTooltip;
	}
}
