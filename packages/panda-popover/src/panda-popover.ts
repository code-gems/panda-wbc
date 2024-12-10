// types
import { PandaVisibilityChangeEvent, PopoverPosition } from "../index";
import { PandaPopoverOverlay } from "./panda-popover-overlay";

// components
import "./panda-popover-overlay";

// styles
import { styles } from "./styles/styles";

// constants
const DEFAULT_DELAY = 500;

// utils
import { LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-popover")
export class PandaPopover extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: String, reflect: true })
	for!: string;

	@property({ type: String, reflect: true })
	position!: PopoverPosition;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, reflect: true })
	show: boolean = false;

	@property({ type: String, reflect: true })
	delay!: number;

	@property({ type: String })
	customStyle!: string;

	private _contextEl!: Element;

	// HTML Elements
	private _templateEl: Element = document.createElement("div");
	private _overlayEl: PandaPopoverOverlay | null = null;

	// events
	private readonly _showPopoverEvent = this._onStartTimerShow.bind(this);
	private readonly _hidePopoverEvent = this._onStartTimerHide.bind(this);
	private readonly _immediateHidePopoverEvent = this._hidePopover.bind(this);

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

		// find popover context
		this._getContextElement();
	}

	protected updated(_changedProperties: PropertyValues): void {
		if (_changedProperties.has("disabled") && this.disabled) {
			this._hidePopover();
		}

		if (_changedProperties.has("show") && this.show) {
			this._showPopover();
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
			this._contextEl.removeEventListener("mouseover", this._showPopoverEvent);
			this._contextEl.removeEventListener("mouseout", this._hidePopoverEvent);
		}
		if (this._overlayEl !== null) {
			// remove popover overlay events
			this._overlayEl.removeEventListener("mouseover", this._showPopoverEvent);
			this._overlayEl.removeEventListener("mouseout", this._hidePopoverEvent);
			this._overlayEl.removeEventListener("hide", this._immediateHidePopoverEvent);
			// remove popover overlay from DOM
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
				this._contextEl.addEventListener("mouseover", this._showPopoverEvent);
				this._contextEl.addEventListener("mouseout", this._hidePopoverEvent);
			} else {
				console.warn("%c [PANDA POPOVER] Context element not found for:", "font-size: 16px;", this.for);
			}
		}
	}

	private _showPopover(): void {
		// check if popover already exists
		if (this._overlayEl === null && !this.disabled) {
			this._overlayEl = document.createElement("panda-popover-overlay");
			// set overlay props
			this._overlayEl.template = this._templateEl;
			this._overlayEl.position = this.position ?? PopoverPosition.TOP;
			this._overlayEl.contextElement = this._contextEl;
			this._overlayEl.customStyle = this.customStyle;
			this._overlayEl.show = this.show;
			// add events
			this._overlayEl.addEventListener("mouseover", this._showPopoverEvent);
			this._overlayEl.addEventListener("mouseout", this._hidePopoverEvent);
			this._overlayEl.addEventListener("hide", this._immediateHidePopoverEvent);
			// append overlay to the document body
			document.body.appendChild(this._overlayEl);
			// notify visibility change
			this._triggerVisibilityChangeEvent(true);
		}
	}

	private _hidePopover(): void {
		if (this._overlayEl !== null && !this.show) {
			document.body.removeChild(this._overlayEl);
			this._overlayEl = null;
		}
		// notify visibility change
		this._triggerVisibilityChangeEvent(false);
	}

	private _triggerVisibilityChangeEvent(visible: boolean): void {
		const event: PandaVisibilityChangeEvent = new CustomEvent("visibility-change", {
			detail: {
				visible
			}
		});
		this.dispatchEvent(event);
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

		// start show popover countdown
		if (this._showTimer === null) {
			this._showTimer = setTimeout(() => {
				this._showPopover();
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

		// start hide popover countdown
		if (this._hideTimer === null) {
			this._hideTimer = setTimeout(() => {
				this._hidePopover();
				clearTimeout(this._hideTimer);
				this._hideTimer = null;
			}, this.delay || DEFAULT_DELAY);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-popover": PandaPopover;
	}
}