// types
// ...

// styles
import { styles } from "./styles/overlay-styles";

// utils
import { LitElement, html, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ElementDetails, TooltipPosition } from "..";
import { minValue, positionObserver } from "./utils/utils";

@customElement("panda-tooltip-overlay")
export class PandaTooltipOverlay extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: Object })
	contextElementDetails!: ElementDetails;

	@property({ type: Element })
	template!: Element | null;

	@property({ type: String, attribute: true })
	position: TooltipPosition = TooltipPosition.TOP;

	// view props
	@query("#tooltip")
	private _contentEl!: HTMLDivElement;

	private _correctedPosition: TooltipPosition | null = null;

	private _positionObserver: any = null;
	private _positionChangeEvent: any = this._onHideOverlay.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// cancel position observer
		if (this._positionObserver !== null) {
			this._positionObserver.cancel();
		}
	}

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		if (_changedProperties.has("template") && this.template) {
			this._applyContent();
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
			if (this.template !== null) {
				this._contentEl.innerHTML = this.template.innerHTML;

				// get overlay size details
				const overlayRect = this._contentEl.getBoundingClientRect();

				// set default position to top
				let overlayTop = this.contextElementDetails.top - overlayRect.height;
				let overlayLeft = this.contextElementDetails.left + (this.contextElementDetails.width / 2) - (overlayRect.width / 2);

				// check if we have enough space to display tooltip content and do the position correction
				let noSpaceBottom = false;
				let noSpaceTop = false;
				let noSpaceLeft = false;
				let noSpaceRight = false;
				
				// 1. check if we have enough space at the top
				if (overlayTop - window.scrollY - overlayRect.height < 0) {
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
				if (this.contextElementDetails.bottom + overlayRect.height - window.scrollY > window.innerHeight) {
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
				if (this.contextElementDetails.right + overlayRect.width - window.scrollX > window.innerWidth) {
					noSpaceRight = true;
				}

				if (noSpaceRight && this.position === TooltipPosition.RIGHT) {
					this._correctedPosition = TooltipPosition.LEFT;
				}

				// 4. check if we have enough space on the left
				if (this.contextElementDetails.left - overlayRect.width - window.scrollX < 0) {
					noSpaceLeft = true;
				}

				if (noSpaceLeft && this.position === TooltipPosition.LEFT) {
					this._correctedPosition = TooltipPosition.RIGHT;
				}

				// apply tooltip position
				const position = this._correctedPosition
					? this._correctedPosition
					: this.position;

				switch (position) {
					case (TooltipPosition.BOTTOM):
						overlayTop = this.contextElementDetails.bottom;
						break;
					case (TooltipPosition.LEFT):
						overlayTop = this.contextElementDetails.top + (this.contextElementDetails.height / 2) - (overlayRect.height / 2);
						overlayLeft = this.contextElementDetails.left - overlayRect.width;
						break;
					case (TooltipPosition.RIGHT):
						overlayTop = this.contextElementDetails.top + (this.contextElementDetails.height / 2) - (overlayRect.height / 2);
						overlayLeft = this.contextElementDetails.right;
						break;
					case (TooltipPosition.BOTTOM_LEFT):
						overlayTop = this.contextElementDetails.bottom;
						overlayLeft = this.contextElementDetails.left;
						break;
					case (TooltipPosition.BOTTOM_RIGHT):
						overlayTop = this.contextElementDetails.bottom;
						overlayLeft = this.contextElementDetails.right - overlayRect.width;
						break;
				}

				// position overlay content
				this._contentEl.style.top = `${overlayTop}px`;
				this._contentEl.style.left = `${overlayLeft}px`;
				this._contentEl.classList.add(this._getPositionCss()); // add position css class
				this._contentEl.classList.add("show");

				// add position change observer
				if (this._positionObserver === null) {
					this._positionObserver = positionObserver(this.contextElementDetails.target, this._positionChangeEvent);
				}
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
