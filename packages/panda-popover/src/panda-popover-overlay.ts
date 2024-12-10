// style
import { PopoverPosition } from "../index";

// style
import { overlayStyles } from "./styles/styles";

// utils
import { LitElement, html, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import {
	isContextElementVisible,
	positionObserver,
	resetPositionCss,
} from "./utils/utils";

@customElement("panda-popover-overlay")
export class PandaPopoverOverlay extends LitElement {
	//css styles
	static get styles() {
		return overlayStyles;
	}

	@state()
	contextElement!: Element;

	@property({ type: Element })
	template!: Element;

	@property({ type: String })
	position: PopoverPosition = PopoverPosition.TOP;

	@property({ type: String })
	customStyle!: string;

	@property({ type: Boolean })
	show!: boolean;

	// view props
	@query("#popover")
	private readonly _contentEl!: HTMLDivElement;

	private _correctedPosition: PopoverPosition | null = null;

	private _positionObserver: any = null;
	private readonly _positionChangeEvent: any = this._onPositionChange.bind(this);

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

	render(): TemplateResult {
		return html`
			<div
				id="popover"
				class="popover"
				part="popover"
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
			console.log(
				"%c (_applyContent) contextElement:",
				"font-size: 24px; color: crimson; background: black;",
				contextElementRect.top,
				isContextElementVisible(contextElementRect)
			);

			if (this.template !== null && contextElementRect && isContextElementVisible(contextElementRect)) {
				this._contentEl.innerHTML = this.template.innerHTML;
				this._correctedPosition = null;

				// get overlay size details
				const overlayRect = this._contentEl.getBoundingClientRect();

				// check if we have enough space to display popover content and do the position correction
				let noSpaceBottom = false;
				let noSpaceTop = false;
				let noSpaceLeft = false;
				let noSpaceRight = false;

				// 1. check if we have enough space at the top
				if (contextElementRect.top - window.scrollY - overlayRect.height < 0) {
					noSpaceTop = true;
				}

				// check if correction is needed
				if (noSpaceTop && this.position === PopoverPosition.TOP) {
					this._correctedPosition = PopoverPosition.BOTTOM;
				}

				if (noSpaceTop && this.position === PopoverPosition.TOP_LEFT) {
					this._correctedPosition = PopoverPosition.BOTTOM_LEFT;
				}

				if (noSpaceTop && this.position === PopoverPosition.TOP_RIGHT) {
					this._correctedPosition = PopoverPosition.BOTTOM_RIGHT;
				}

				// 2. check if we have enough space at the bottom
				if (contextElementRect.bottom + overlayRect.height - window.scrollY > window.innerHeight) {
					noSpaceBottom = true;
				}
				// check if correction is needed
				if (noSpaceBottom && this.position === PopoverPosition.BOTTOM) {
					this._correctedPosition = PopoverPosition.TOP;
				}

				if (noSpaceBottom && this.position === PopoverPosition.BOTTOM_LEFT) {
					this._correctedPosition = PopoverPosition.TOP_LEFT;
				}

				if (noSpaceBottom && this.position === PopoverPosition.BOTTOM_RIGHT) {
					this._correctedPosition = PopoverPosition.TOP_RIGHT;
				}

				// 3. check if we have enough space on the right
				if (contextElementRect.right + overlayRect.width - window.scrollX > window.innerWidth) {
					noSpaceRight = true;
				}

				if (noSpaceRight && this.position === PopoverPosition.RIGHT) {
					this._correctedPosition = PopoverPosition.LEFT;
				}

				// 4. check if we have enough space on the left
				if (contextElementRect.left - overlayRect.width - window.scrollX < 0) {
					noSpaceLeft = true;
				}

				if (noSpaceLeft && this.position === PopoverPosition.LEFT) {
					this._correctedPosition = PopoverPosition.RIGHT;
				}

				// apply popover position
				const position = this._correctedPosition
					? this._correctedPosition
					: this.position;

				// set default position to top
				let overlayTop = contextElementRect.top - overlayRect.height;
				let overlayLeft = contextElementRect.left + (contextElementRect.width / 2) - (overlayRect.width / 2);

				switch (position) {
					case (PopoverPosition.TOP_LEFT):
						overlayLeft = contextElementRect.left;
						break;
					case (PopoverPosition.TOP_RIGHT):
						overlayLeft = contextElementRect.right - overlayRect.width;
						break;
					case (PopoverPosition.LEFT):
						overlayTop = contextElementRect.top + (contextElementRect.height / 2) - (overlayRect.height / 2);
						overlayLeft = contextElementRect.left - overlayRect.width;
						break;
					case (PopoverPosition.RIGHT):
						overlayTop = contextElementRect.top + (contextElementRect.height / 2) - (overlayRect.height / 2);
						overlayLeft = contextElementRect.right;
						break;
					case (PopoverPosition.BOTTOM):
						overlayTop = contextElementRect.bottom;
						break;
					case (PopoverPosition.BOTTOM_LEFT):
						overlayTop = contextElementRect.bottom;
						overlayLeft = contextElementRect.left;
						break;
					case (PopoverPosition.BOTTOM_RIGHT):
						overlayTop = contextElementRect.bottom;
						overlayLeft = contextElementRect.right - overlayRect.width;
						break;
				}

				// position overlay content
				this._contentEl.style.transform = `translate(${overlayLeft}px, ${overlayTop}px)`;
				// reset position classes
				resetPositionCss(this._contentEl);
				this._contentEl.classList.add(this._getPositionCss()); // add position css class
				this._contentEl.classList.add("show");
			} else {
				this._contentEl.classList.remove("show");
				this._contentEl.innerHTML = "";
			}
		}, 0);
	}

	private _getPositionCss(): string {
		const position = this._correctedPosition
			? this._correctedPosition
			: this.position;
		let positionCss: string = "";

		switch (position) {
			case PopoverPosition.BOTTOM:
				positionCss = "bottom";
				break;
			case PopoverPosition.LEFT:
				positionCss = "left";
				break;
			case PopoverPosition.RIGHT:
				positionCss = "right";
				break;
			case PopoverPosition.TOP_LEFT:
				positionCss = "top-left";
				break;
			case PopoverPosition.TOP_RIGHT:
				positionCss = "top-right";
				break;
			case PopoverPosition.BOTTOM_LEFT:
				positionCss = "bottom-left";
				break;
			case PopoverPosition.BOTTOM_RIGHT:
				positionCss = "bottom-right";
				break;
			case PopoverPosition.TOP:
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

	private _hidePopoverOverlay(): void {
		const event = new CustomEvent("hide", {});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

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

declare global {
	interface HTMLElementTagNameMap {
		"panda-popover-overlay": PandaPopoverOverlay;
	}
}
