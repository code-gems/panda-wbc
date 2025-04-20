// types
import { TooltipPosition } from "../index";
import { PandaTooltipOverlay } from "./panda-tooltip-overlay";

// styles
import { styles } from "./styles/styles";

// components
import "./panda-tooltip-overlay";

// utils
import { LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

// constants
const DEFAULT_DELAY = 500;

@customElement("panda-tooltip")
export class PandaTooltip extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: String, reflect: true })
	for!: string;

	@property({ type: String, reflect: true })
	position!: TooltipPosition;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: String, reflect: true })
	delay!: number;

	@property({ type: String })
	customStyle!: string;

	private _contextEl!: Element;

	// HTML Elements
	private readonly _templateEl: Element = document.createElement("div");
	private _overlayEl: PandaTooltipOverlay | null = null;

	// events
	private readonly _showTooltipEvent = this._onStartTimerShow.bind(this);
	private readonly _hideTooltipEvent = this._onStartTimerHide.bind(this);
	private readonly _immediateHideTooltipEvent = this._hideTooltip.bind(this);

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

	protected updated(_changedProperties: PropertyValues): void {
		if (_changedProperties.has("disabled") && this.disabled) {
			this._hideTooltip();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// clear timers
		clearTimeout(this._showTimer);
		clearTimeout(this._hideTimer);
		// clean up
		if (this._contextEl !== null) {
			// remove context events
			this._contextEl.removeEventListener("mouseover", this._showTooltipEvent);
			this._contextEl.removeEventListener("mouseout", this._hideTooltipEvent);
		}
		if (this._overlayEl !== null) {
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
		} else {
			// if no id is provided, use the parent element as context
			this._contextEl = this.parentNode as Element;
		}
	}

	private _showTooltip(): void {
		// check if tooltip already exists
		if (this._overlayEl === null && !this.disabled) {
			this._overlayEl = document.createElement("panda-tooltip-overlay");
			// set overlay props
			this._overlayEl.template = this._templateEl;
			this._overlayEl.position = this.position || TooltipPosition.TOP;
			this._overlayEl.contextElement = this._contextEl;
			this._overlayEl.customStyle = this.customStyle;
			// add events
			this._overlayEl.addEventListener("mouseover", this._showTooltipEvent);
			this._overlayEl.addEventListener("mouseout", this._hideTooltipEvent);
			this._overlayEl.addEventListener("hide", this._immediateHideTooltipEvent);
			// append overlay to the document body
			document.body.appendChild(this._overlayEl);
		}
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
			}, this.delay || DEFAULT_DELAY);
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
			}, this.delay || DEFAULT_DELAY);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-tooltip": PandaTooltip;
	}
}
