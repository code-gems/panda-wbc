// types
import { PandaVisibilityChangeEvent, PopoverPosition } from "../index";
import { PandaPopoverOverlay } from "./panda-popover-overlay";

// components
import "./panda-popover-overlay";

// styles
import { styles } from "./styles/styles";

export class PandaPopover extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = [
		"for",
		"position-vertical",
		"position-horizontal",
		"disabled",
		"customStyle",
	];

	// for ============================================================================================================
	private _for!: string;

	get for(): string {
		return this._for;
	}

	set for(value: string) {
		if (this._for !== value) {
			this._for = value;
			this.setAttribute("for", this._for); // reflect to attribute
		}
	}

	// position vertical ==============================================================================================
	private _positionVertical!: PopoverPosition;

	get positionVertical(): PopoverPosition {
		return this._positionVertical;
	}

	set positionVertical(value: PopoverPosition) {
		if (this._positionVertical !== value) {
			this._positionVertical = value;
			this.setAttribute("position-vertical", this._positionVertical); // reflect to attribute
		}
	}

	// position horizontal ============================================================================================
	private _positionHorizontal!: PopoverPosition;

	get positionHorizontal(): PopoverPosition {
		return this._positionHorizontal;
	}

	set positionHorizontal(value: PopoverPosition) {
		if (this._positionHorizontal !== value) {
			this._positionHorizontal = value;
			this.setAttribute("position-horizontal", this._positionHorizontal); // reflect to attribute
		}
	}

	// align-vertical =================================================================================================
	private _alignVertical!: PopoverPosition;

	get alignVertical(): PopoverPosition {
		return this._alignVertical;
	}

	set alignVertical(value: PopoverPosition) {
		if (this._alignVertical !== value) {
			this._alignVertical = value;
			this.setAttribute("align-vertical", this._alignVertical); // reflect to attribute
		}
	}

	// align-horizontal ===============================================================================================
	private _alignHorizontal!: PopoverPosition;

	get alignHorizontal(): PopoverPosition {
		return this._alignHorizontal;
	}

	set alignHorizontal(value: PopoverPosition) {
		if (this._alignHorizontal !== value) {
			this._alignHorizontal = value;
			this.setAttribute("align-horizontal", this._alignHorizontal); // reflect to attribute
		}
	}

	// disabled =======================================================================================================
	private _disabled: boolean = false;

	get disabled(): boolean {
		return this._disabled;
	}

	set disabled(value: boolean) {
		if (this._disabled !== value) {
			this._disabled = value;
			this.setAttribute("disabled", String(this._disabled)); // reflect to attribute
		}
	}

	// custom style ===================================================================================================
	private _customStyle!: string;

	get customStyle(): string {
		return this._customStyle;
	}

	set customStyle(value: string) {
		if (this._customStyle !== value) {
			this._customStyle = value;
		}
	}

	// elements
	private _anchorEl!: Element;
	private _templateEl!: Element;
	private _overlayEl!: PandaPopoverOverlay | null;

	// events
	private readonly _showPopoverEvent!: any;
	private readonly _hidePopoverEvent!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		console.log("%c ⚡ (constructor)", "font-size: 16px; color: crimson; background: black;");

		this.attachShadow({ mode: "open" });
		// init class properties
		this._for = "";
		this._positionVertical = PopoverPosition.TOP;
		this._positionHorizontal = PopoverPosition.LEFT;
		this._alignVertical = PopoverPosition.BOTTOM;
		this._alignHorizontal = PopoverPosition.LEFT;
		this._disabled = false;
		this._customStyle = "";
		// elements
		this._overlayEl = null;
		// add event listeners
		this._showPopoverEvent = this._showPopover.bind(this);
		this._hidePopoverEvent = this._hidePopover.bind(this);
	}

	connectedCallback(): void {
		console.log("%c ⚡ (connectedCallback)", "font-size: 16px; color: crimson; background: black;");
		// find template element
		this._templateEl = document.createElement("div");
		Array
			.from(this.children)
			.forEach((child) => {
				// check if child is a template element or has a template attribute
				if (child.tagName === "TEMPLATE" || typeof child.getAttribute("template") === "string") {
					this._templateEl.innerHTML = child.innerHTML;
				}
			});

		// apply styles
		this._applyStyles();
		// find popover anchor element
		this._getAnchorElement();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		console.log("%c ⚡ (attributeChangedCallback)", "font-size: 16px; color: crimson; background: black;", _name, _oldValue, _newValue);
		if (_name === "for") {
			this._for = _newValue;
			// if the "for" attribute is changed, we need to get the new anchor element
			if (_oldValue !== null) {
				this._getAnchorElement();
			}
		}
		// hide popover if disabled attribute is set
		if (_name === "disabled" && _newValue) {
			this._disabled = _newValue;
			this._hidePopover();
		}
		// set vertical position from attribute
		if (_name === "position-vertical") {
			this._positionVertical = _newValue;
		}
		// set horizontal position from attribute
		if (_name === "position-horizontal") {
			this._positionHorizontal = _newValue;
		}
	}

	disconnectedCallback(): void {
		// clean up
		if (this._anchorEl !== null) {
			// remove anchor element events
			this._anchorEl.removeEventListener("click", this._showPopoverEvent);
		}
		if (this._overlayEl !== null) {
			// remove popover overlay events
			this._overlayEl.removeEventListener("close", this._hidePopoverEvent);
			// remove popover overlay from DOM
			document.body.removeChild(this._overlayEl);
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================
	
	/** Apply styles to the component */
	private _applyStyles() {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	/** Get the anchor element for the popover */
	private _getAnchorElement() {
		// check if we have context id
		if (this._for) {
			// get context element by id
			this._anchorEl = this.parentNode?.querySelector(`#${this._for}`) as Element;

			if (this._anchorEl) {
				// add events
				this._anchorEl.addEventListener("click", this._showPopoverEvent);
			} else {
				console.warn("%c ⚠️ [PANDA POPOVER] Context element not found for:", "font-size: 16px;", this._for);
			}
		} else {
			// if no context id is provided, use the parent element as the context
			this._anchorEl = this.parentNode as Element;
			this._anchorEl.addEventListener("click", this._showPopoverEvent);
		}
		console.log("%c ⚡ (_getAnchorElement)", "font-size: 16px; color: crimson; background: black;", this._for, this._anchorEl);
	}

	/** Show the popover */
	private _showPopover(): void {
		console.log("%c ⚡ (_showPopover)", "font-size: 16px; color: crimson; background: black;");
		// check if popover already exists
		if (this._overlayEl === null && !this._disabled) {
			console.log("%c ⚡ (_showPopover) template", "font-size: 16px; color: crimson; background: black;", this._templateEl);
			console.log("%c ⚡ (_showPopover) anchor", "font-size: 16px; color: crimson; background: black;", this._anchorEl);
			console.log("%c ⚡ (_showPopover) position", "font-size: 16px; color: crimson; background: black;", this._positionVertical, this._positionHorizontal);


			this._overlayEl = document.createElement("panda-popover-overlay");
			// set overlay props
			this._overlayEl.templateEl = this._templateEl;
			this._overlayEl.positionVertical = this._positionVertical ?? PopoverPosition.TOP;
			this._overlayEl.positionHorizontal = this._positionHorizontal ?? PopoverPosition.LEFT;
			this._overlayEl.anchorEl = this._anchorEl;
			this._overlayEl.customStyle = this._customStyle;
			// add events
			this._overlayEl.addEventListener("close", this._hidePopoverEvent);
			// append overlay to the document body
			document.body.appendChild(this._overlayEl);
			// notify visibility change
			this._triggerVisibilityChangeEvent(true);
		}
	}

	/** Hide the popover and clean up */
	private _hidePopover(): void {
		if (this._overlayEl !== null) {
			document.body.removeChild(this._overlayEl);
			this._overlayEl = null;
		}
		// notify visibility change
		this._triggerVisibilityChangeEvent(false);
	}

	/** Trigger visibility change event */
	private _triggerVisibilityChangeEvent(visible: boolean): void {
		const event: PandaVisibilityChangeEvent = new CustomEvent("visibility-change", {
			detail: {
				visible
			}
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	/** Hide the popover */
	hidePopover(): void {
		this._hidePopover();
	}

	/** Show the popover */
	showPopover(): void {
		this._showPopover();
	}
}

// Register the custom element
if (!customElements.get("panda-popover")) {
	customElements.define("panda-popover", PandaPopover);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-popover": PandaPopover;
	}
}