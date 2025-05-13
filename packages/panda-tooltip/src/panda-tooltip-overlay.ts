// types
import { TooltipPosition } from "../index";

// styles
import { styles } from "./styles/overlay-styles";

// utils
import { LitElement, html, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { positionObserver } from "./utils/utils";

@customElement("panda-tooltip-overlay")
export class PandaTooltipOverlay extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: Object })
	contextElement!: Element;

	@property({ type: Element })
	template!: Element | null;

	@property({ type: String })
	position!: TooltipPosition;

	@property({ type: String })
	customStyle!: string;

	// view props
	@query("#tooltip")
	private readonly _contentEl!: HTMLDivElement;

	private _correctedPosition: TooltipPosition | null = null;

	private _positionObserver: any = null;
	private readonly _positionChangeEvent: any = this._onHideOverlay.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		// add position change observer
		if (this.contextElement) {
			this._positionObserver = positionObserver(this.contextElement, this._positionChangeEvent);
		}		
	}
		
	protected updated(_changedProperties: PropertyValues): void {
		if (_changedProperties.has("template") && this.template) {
			this._applyContent();
		}
		// check if custom style is defined
		if (_changedProperties.has("customStyle") && this.customStyle !== undefined) {
			this._applyCustomStyle();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// cancel position observer
		if (this._positionObserver !== null) {
			this._positionObserver.cancel();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render() {
		return html`
			<div
				id="tooltip"
				class="tooltip"
				part="tooltip"
			>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Apply template content to overlay */
	private _applyContent() {
		setTimeout(() => {
			const contextElementRect = this.contextElement.getBoundingClientRect();
			
			if (this.template !== null && contextElementRect) {
				this._contentEl.innerHTML = this.template.innerHTML;
				this._correctedPosition = null;
				// get overlay size details
				const overlayRect = this._contentEl.getBoundingClientRect();

				// check if we have enough space to display tooltip content and do the position correction
				let noSpaceBottom = false;
				let noSpaceTop = false;
				let noSpaceLeft = false;
				let noSpaceRight = false;
				
				// 1. check if we have enough space at the top
				if (contextElementRect.top - window.scrollY - overlayRect.height < 0) {
					noSpaceTop = true;
				}

				// check if correction is needed
				if (noSpaceTop && this.position === TooltipPosition.TOP) {
					this._correctedPosition = TooltipPosition.BOTTOM;
				}

				if (noSpaceTop && this.position === TooltipPosition.TOP_LEFT) {
					this._correctedPosition = TooltipPosition.BOTTOM_LEFT;
				}

				if (noSpaceTop && this.position === TooltipPosition.TOP_RIGHT) {
					this._correctedPosition = TooltipPosition.BOTTOM_RIGHT;
				}

				// 2. check if we have enough space at the bottom
				if (contextElementRect.bottom + overlayRect.height - window.scrollY > window.innerHeight) {
					noSpaceBottom = true;
				}
				// check if correction is needed
				if (noSpaceBottom && this.position === TooltipPosition.BOTTOM) {
					this._correctedPosition = TooltipPosition.TOP;
				}

				if (noSpaceBottom && this.position === TooltipPosition.BOTTOM_LEFT) {
					this._correctedPosition = TooltipPosition.TOP_LEFT;
				}

				if (noSpaceBottom && this.position === TooltipPosition.BOTTOM_RIGHT) {
					this._correctedPosition = TooltipPosition.TOP_RIGHT;
				}

				// 3. check if we have enough space on the right
				if (contextElementRect.right + overlayRect.width - window.scrollX > window.innerWidth) {
					noSpaceRight = true;
				}

				if (noSpaceRight && this.position === TooltipPosition.RIGHT) {
					this._correctedPosition = TooltipPosition.LEFT;
				}

				// 4. check if we have enough space on the left
				if (contextElementRect.left - overlayRect.width - window.scrollX < 0) {
					noSpaceLeft = true;
				}

				if (noSpaceLeft && this.position === TooltipPosition.LEFT) {
					this._correctedPosition = TooltipPosition.RIGHT;
				}

				// apply tooltip position
				const position = this._correctedPosition ?? this.position;

				// set default position to top
				let overlayTop = contextElementRect.top - overlayRect.height;
				let overlayLeft = contextElementRect.left + (contextElementRect.width / 2) - (overlayRect.width / 2);

				switch (position) {
					case (TooltipPosition.TOP_LEFT):
						overlayLeft = contextElementRect.left;
						break;
					case (TooltipPosition.TOP_RIGHT):
						overlayLeft = contextElementRect.right - overlayRect.width;
						break;
					case (TooltipPosition.LEFT):
						overlayTop = contextElementRect.top + (contextElementRect.height / 2) - (overlayRect.height / 2);
						overlayLeft = contextElementRect.left - overlayRect.width;
						break;
					case (TooltipPosition.RIGHT):
						overlayTop = contextElementRect.top + (contextElementRect.height / 2) - (overlayRect.height / 2);
						overlayLeft = contextElementRect.right;
						break;
					case (TooltipPosition.BOTTOM):
						overlayTop = contextElementRect.bottom;
						break;
					case (TooltipPosition.BOTTOM_LEFT):
						overlayTop = contextElementRect.bottom;
						overlayLeft = contextElementRect.left;
						break;
					case (TooltipPosition.BOTTOM_RIGHT):
						overlayTop = contextElementRect.bottom;
						overlayLeft = contextElementRect.right - overlayRect.width;
						break;
				}

				// position overlay content
				this._contentEl.style.transform = `translate(${overlayLeft}px, ${overlayTop}px)`;
				this._contentEl.classList.add(this._getPositionCss()); // add position css class
				this._contentEl.classList.add("show");
			}
		}, 0);
	}

	private _getPositionCss(): string {
		const position = this._correctedPosition
			? this._correctedPosition
			: this.position;
		let positionCss: string = "";

		switch (position) {
			case TooltipPosition.BOTTOM:
				positionCss = "bottom";
				break;
			case TooltipPosition.LEFT:
				positionCss = "left";
				break;
			case TooltipPosition.RIGHT:
				positionCss = "right";
				break;
			case TooltipPosition.TOP_LEFT:
				positionCss = "top-left";
				break;
			case TooltipPosition.TOP_RIGHT:
				positionCss = "top-right";
				break;
			case TooltipPosition.BOTTOM_LEFT:
				positionCss = "bottom-left";
				break;
			case TooltipPosition.BOTTOM_RIGHT:
				positionCss = "bottom-right";
				break;
			case TooltipPosition.TOP:
			default:
				positionCss = "top"; // set default
		}
		return positionCss;
	}

	/** Apply user defined custom style to this components shadowRoot */
	private _applyCustomStyle(): void {
		if (this.customStyle && this.shadowRoot) {
			const customStyle = document.createElement("style");
			customStyle.innerHTML = this.customStyle;
			customStyle.setAttribute("scope", "custom-style");
			this.shadowRoot.appendChild(customStyle);
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onHideOverlay() {
		const event = new CustomEvent("hide", {});
		this.dispatchEvent(event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-tooltip-overlay": PandaTooltipOverlay;
	}
}
