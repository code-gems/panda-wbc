// types
import { ElementDetails } from "../index";

// style
// import { styles } from "./styles/styles";

// components
import "./panda-month-calendar";

// utils
import { LitElement, html, PropertyValues, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("panda-date-picker-overlay")
export class PandaDatePickerOverlay extends LitElement {
	// css style
	static get styles() {
		return css`
			.overlay-cont {
				position: absolute;
				display: block;
				width: 100%;
				height: 100%;
				top: 0px;
				right: 0px;
				bottom: 0px;
				left: 0px;
				z-index: 999999;
				background-color: rgba(255, 0, 0, 0.1);
			}

			.overlay {
				position: absolute;
				display: block;
				opacity: 0.75;
			}
		`;
	}

	@property({ type: String })
	selectedDate!: string;

	@property({ type: Boolean, attribute: true })
	opened!: boolean;

	parentDetails!: ElementDetails;

	// DOM elements
	@query("#overlay")
	private _overlayEl!: HTMLDivElement;

	@query("#overlay-cont")
	private _overlayContEl!: HTMLDivElement;

	// event bindings
	private _resizeEventBinding: any;
	
	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================
	
	constructor() {
		super();
		this.opened = false;
		// event bindings
		this._resizeEventBinding = this.close.bind(this);
		window.addEventListener("resize", this._resizeEventBinding);
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		// expand overlay container to include scrollable area
		this._overlayContEl.style.width = `${document.body.scrollWidth}px`;
		this._overlayContEl.style.height = `${document.body.scrollHeight}px`;
		setTimeout(() => {
			this._showOverlayContent();
		}, 0);
	}

	public disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this._resizeEventBinding) {
			window.removeEventListener("resize", this._resizeEventBinding);
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div
				id="overlay-cont"
				class="overlay-cont"
				part="overlay-cont"
				@click="${() => this.close()}"	
			>
				<div
					id="overlay"
					class="overlay"
					part="overlay"
					@click="${(e: MouseEvent) => this._preventMouseEvent(e)}"	
				>
					<panda-month-calendar
						.selectedDate="${this.selectedDate}"
					>
					</panda-month-calendar>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public close() {
		const overlayRect = this._overlayEl.getBoundingClientRect();
		console.log("%c [_showOverlayContent] overlayRect", "font-size: 24px; color: green;", overlayRect);
		console.log("%c [OVERLAY] Close", "font-size: 24px; color: green;", this.selectedDate);
		const event = new CustomEvent("close", {});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _showOverlayContent() {
		const overlayRect = this._overlayEl.getBoundingClientRect();
		console.log("%c [_showOverlayContent] overlayRect", "font-size: 24px; color: green;", overlayRect);

		let overlayTop = this.parentDetails.bottom;
		let overlayLeft = this.parentDetails.left;

		if (overlayTop - window.scrollY + overlayRect.height > window.innerHeight) {
			overlayTop = this.parentDetails.top - overlayRect.height;
		}
		if (overlayLeft - window.scrollX + overlayRect.width > window.innerWidth) {
			overlayLeft = this.parentDetails.right - overlayRect.width;
		}
		// position overlay content
		this._overlayEl.style.top = `${overlayTop}px`;
		this._overlayEl.style.left = `${overlayLeft}px`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _preventMouseEvent(e: MouseEvent) {
		// prevent click event to prevent overlay from closing
		e.stopPropagation();
		e.preventDefault();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-date-picker-overlay": PandaDatePickerOverlay;
	}
}
