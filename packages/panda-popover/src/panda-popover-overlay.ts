// style
import { PopoverPosition } from "../index";

// style
import { overlayStyles } from "./styles/styles";

// utils
import {
	isContextElementVisible,
	positionObserver,
	resetPositionCss,
} from "./utils/utils";

export class PandaPopoverOverlay extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = [
		"for",
		"position-vertical",
		"position-horizontal",
		"align-vertical",
		"align-horizontal",
		"customStyle",
		"show"
	];

	// show ===========================================================================================================
	private _show!: boolean;

	get show(): boolean {
		return this._show;
	}

	set show(value: boolean) {
		if (this._show !== value) {
			this._show = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("show", "");
			} else {
				this.removeAttribute("show");
			}
		}
	}

	// anchor element =================================================================================================
	private _anchorEl!: Element;

	get anchorEl(): Element {
		return this._anchorEl;
	}

	set anchorEl(value: Element) {
		if (this._anchorEl !== value) {
			this._anchorEl = value;
		}
	}

	// template =======================================================================================================
	private _templateEl!: Element;

	get templateEl(): Element {
		return this._templateEl;
	}

	set templateEl(value: Element) {
		if (this._templateEl !== value) {
			this._templateEl = value;
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

	// view props
	private _preventClose!: boolean;
	private _correctedPositionVertical!: PopoverPosition | null;
	private _correctedPositionHorizontal!: PopoverPosition | null;
	private _positionObserver!: any;
	
	// events
	private readonly _positionChangeEvent!: any;
	
	// elements
	private _popoverEl!: HTMLDivElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		console.log("%c 🧪 (constructor)", "font-size: 24px; color: limegreen; background: black;");
		// initialize properties
		this._positionVertical = PopoverPosition.TOP;
		this._positionHorizontal = PopoverPosition.LEFT;
		this._preventClose = false;
		this._correctedPositionVertical = null;
		this._correctedPositionHorizontal = null;
		this._positionObserver = null;
		// initialize events
		this._positionChangeEvent = this._onPositionChange.bind(this);
	}

	connectedCallback(): void {
		console.log("%c 🧪 (connectedCallback)", "font-size: 24px; color: limegreen; background: black;");
		this._render();
		this._applyStyles();
		// add position change observer
		// if (this._anchorEl) {
			// this._positionObserver = positionObserver(this._anchorEl, this._positionChangeEvent);
		// }
		// initialize elements
		this._popoverEl = this.shadowRoot?.querySelector("#popover") as HTMLDivElement;
		// initialize events
		this.addEventListener("click", this._onCloseOverlay.bind(this));
		this._popoverEl.addEventListener("click", this._onPreventClose.bind(this));
		console.log("%c 🧪 (connectedCallback) _popoverEl", "font-size: 24px; color: limegreen; background: black;", this._popoverEl);
		// apply content
		this._applyContent();
	}

	disconnectedCallback(): void {
		console.log("%c 🧪 (disconnectedCallback)", "font-size: 24px; color: limegreen; background: black;");
		// cancel position observer
		if (this._positionObserver !== null) {
			this._positionObserver.cancel();
		}
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		console.log("%c 🧪 (attributeChangedCallback)", "font-size: 24px; color: limegreen; background: black;", _name, _oldValue, _newValue);
		if (_name === "template") {
			this._applyContent();
		}
		// check if custom style is defined
		if (_name === "customStyle") {
			this._applyCustomStyle();
		}
		this._render();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	private _render() {
		console.log("%c 🧪 (_render)", "font-size: 24px; color: limegreen; background: black;", this.shadowRoot);
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<div
					id="popover"
					class="popover"
					part="popover"
				>
				</div>
			`;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Apply styles to this components shadowRoot */
	private _applyStyles() {
		console.log("%c 🧪 (_applyStyles)", "font-size: 24px; color: limegreen; background: black;", this.shadowRoot);
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(overlayStyles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	/** Apply template content to overlay */
	private _applyContent() {
		setTimeout(() => {
			const anchorElRect = this._anchorEl.getBoundingClientRect();
			console.log("%c 🧪 (_applyContent)", "font-size: 24px; color: limegreen; background: black;", anchorElRect);
			console.log("%c 🧪 (_applyContent) pos V", "font-size: 24px; color: limegreen; background: black;", this._positionVertical);
			console.log("%c 🧪 (_applyContent) pos H", "font-size: 24px; color: limegreen; background: black;", this._positionHorizontal);
			console.log(
				"%c (_applyContent) anchorElRect:",
				"font-size: 24px; color: crimson; background: black;",
				anchorElRect.top,
				isContextElementVisible(anchorElRect)
			);

			if (this.templateEl !== null && anchorElRect && isContextElementVisible(anchorElRect)) {
				this._popoverEl.innerHTML = this.templateEl.innerHTML;
				this._correctedPositionVertical = null;

				// get overlay size details
				const overlayRect = this._popoverEl.getBoundingClientRect();

				// check if we have enough space to display popover content and do the position correction
				let noSpaceBottom = false;
				let noSpaceTop = false;
				let noSpaceLeft = false;
				let noSpaceRight = false;

				// 1. check if we have enough space at the top ========================================================
				if (anchorElRect.top - window.scrollY - overlayRect.height < 0) {
					noSpaceTop = true;
				}
				// check if correction is needed
				if (noSpaceTop && this.positionVertical === PopoverPosition.TOP) {
					this._correctedPositionVertical = PopoverPosition.BOTTOM;
				}

				// 2. check if we have enough space at the bottom =====================================================
				if (anchorElRect.bottom + overlayRect.height - window.scrollY > window.innerHeight) {
					noSpaceBottom = true;
				}
				// check if correction is needed
				if (noSpaceBottom && this.positionVertical === PopoverPosition.BOTTOM) {
					this._correctedPositionVertical = PopoverPosition.TOP;
				}

				// 3. check if we have enough space on the right ======================================================
				if (anchorElRect.right + overlayRect.width - window.scrollX > window.innerWidth) {
					noSpaceRight = true;
				}
				// check if correction is needed
				if (noSpaceRight && this.positionHorizontal === PopoverPosition.RIGHT) {
					this._correctedPositionHorizontal = PopoverPosition.LEFT;
				}

				// 4. check if we have enough space on the left =======================================================
				if (anchorElRect.left - overlayRect.width - window.scrollX < 0) {
					noSpaceLeft = true;
				}
				// check if correction is needed
				if (noSpaceLeft && this.positionHorizontal === PopoverPosition.LEFT) {
					this._correctedPositionHorizontal = PopoverPosition.RIGHT;
				}

				// apply popover corrected position ===================================================================
				const positionVertical = this._correctedPositionVertical ?? this.positionVertical;
				const positionHorizontal = this._correctedPositionHorizontal ?? this.positionHorizontal;

				// set default position to top
				let overlayTop = anchorElRect.top - overlayRect.height;
				let overlayLeft = anchorElRect.left + (anchorElRect.width / 2) - (overlayRect.width / 2);

				switch (positionHorizontal) {
					case (PopoverPosition.LEFT):
						overlayLeft = anchorElRect.left;
						break;
					case (PopoverPosition.CENTER):
						overlayLeft = anchorElRect.left + (anchorElRect.width / 2) - (overlayRect.width / 2);
						break;
					case (PopoverPosition.RIGHT):
						overlayLeft = anchorElRect.right - overlayRect.width;
						break;
				}

				switch (positionVertical) {
					case (PopoverPosition.TOP):
						overlayTop = anchorElRect.top - overlayRect.height;
						break;
					case (PopoverPosition.CENTER):
						overlayTop = anchorElRect.top + (anchorElRect.height / 2) - (overlayRect.height / 2);
						break;
					case (PopoverPosition.BOTTOM):
						overlayTop = anchorElRect.bottom;
						break;
				}

				// position overlay content
				// this._popoverEl.style.transform = `translate(${overlayLeft}px, ${overlayTop}px)`;
				this._popoverEl.style.top = `${overlayTop}px`;
				this._popoverEl.style.left = `${overlayLeft}px`;
				// reset position classes
				resetPositionCss(this._popoverEl);
				this._popoverEl.classList.add("show");
			} else {
				this._popoverEl.classList.remove("show");
				this._popoverEl.innerHTML = "";
			}
		}, 0);
	}

	/** Apply user defined custom style to this components shadowRoot */
	private _applyCustomStyle(): void {
		if (this.customStyle && this.shadowRoot) {
			const customStyle = new CSSStyleSheet();
			customStyle.replaceSync(this.customStyle);
			this.shadowRoot.adoptedStyleSheets.push(customStyle);
		}
	}

	private _hidePopoverOverlay(): void {
		const event = new CustomEvent("hide", {});
		this.dispatchEvent(event);
	}

	private _triggerCloseEvent(): void {
		const event = new CustomEvent("close", {});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onPreventClose(): void {
		this._preventClose = true;
	}

	private _onCloseOverlay(): void {
		if (this._preventClose) {
			this._preventClose = false;
		} else {
			this._triggerCloseEvent();
		}
	}

	private _onPositionChange() {
		console.log("%c (_onPositionChange)", "font-size: 24px; color: crimson; background: black;");
		if (this.show) {
			console.log("%c (_onPositionChange) LOOP BACK TO APPLY CONTENT:", "font-size: 24px; color: crimson; background: black;");
			this._applyContent();
		} else {
			this._hidePopoverOverlay();
		}
	}
}

// Register the custom element
if (!customElements.get("panda-popover-overlay")) {
	customElements.define("panda-popover-overlay", PandaPopoverOverlay);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-popover-overlay": PandaPopoverOverlay;
	}
}
