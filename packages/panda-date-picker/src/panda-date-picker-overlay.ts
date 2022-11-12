// types
import { ElementDetails, PandaDateRange, PandaDatePickerChangeEvent, PandaDatePreset, PandaEvent } from "../index";

// style
// ...

// components
import "./panda-month-calendar";

// utils
import { LitElement, html, PropertyValues, css, TemplateResult } from "lit";
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
			}

			.overlay {
				position: absolute;
				display: flex;
				flex-flow: column;
				opacity: 0;

				transition: opacity 200ms ease-in-out;

				border: 1px solid var(--panda-bg-color-100);
				background-color: var(--panda-date-picker-bg-color, var(--panda-bg-color, hsl(0deg 0% 100%)));
				box-shadow: 0px 2px 4px var(--panda-shadow-color-20opc);
				box-sizing: border-box;
			}

			.overlay.show {
				opacity: 1;
			}

			.overlay-footer {
				display: flex;
				flex-flow: row nowrap;
			}
		`;
	}

	@property({ type: String })
	selectedDate!: string | number | null;

	@property({ type: Boolean, attribute: true })
	opened!: boolean;

	@property({ type: String })
	min!: string | null;

	@property({ type: String })
	max!: string | null;

	@property({ type: Array })
	disableDates!: string[] | null;

	@property({ type: Boolean })
	disableWeekends!: boolean;
	
	@property({ type: Array })
	disableWeekDays!: string[] | null;
	
	@property({ type: Array })
	disableDateRange!: PandaDateRange[] | null;
	
	@property({ type: Array })
	highlightDate!: PandaDatePreset[] | null;

	@property({ type: Array })
	events!: PandaEvent[] | null;
	
	@property({ type: Number })
	firstDayOfWeek!: number;

	@property({ type: Boolean, attribute: "week-starts-on-monday" })
	weekStartsOnMonday!: boolean;

	@property({ type: Array })
	presetDates!: PandaDatePreset[] | null;

	@property({ type: String })
	presetDatesHeader!: string | null;

	@property({ type: Boolean })
	showToday!: boolean;

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
		this.selectedDate = "";
		this.min = null;
		this.max = null;
		this.disableDates = null;
		this.disableWeekends = false;
		this.disableWeekDays = null;
		this.disableDateRange = null;
		this.presetDates = null;
		this.presetDatesHeader = null;
		this.highlightDate = null;
		this.events = null;
		this.weekStartsOnMonday = false;
		this.firstDayOfWeek = 0;
		this.showToday = true;

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
				@click="${this.close}"
			>
				<div
					id="overlay"
					class="overlay"
					part="overlay"
					@click="${this._preventMouseEvent}"	
				>
					<panda-month-calendar
						.selectedDate="${this.selectedDate}"
						.min="${this.min}"
						.max="${this.max}"
						.disableDates="${this.disableDates}"
						.disableWeekends="${this.disableWeekends}"
						.disableWeekDays="${this.disableWeekDays}"
						.disableDateRange="${this.disableDateRange}"
						.highlightDate="${this.highlightDate}"
						.events="${this.events}"
						.presetDates="${this.presetDates}"
						.presetDatesHeader="${this.presetDatesHeader}"
						.firstDayOfWeek="${this.firstDayOfWeek}"
						.weekStartsOnMonday="${this.weekStartsOnMonday}"
						@change="${(e: CustomEvent<PandaDatePickerChangeEvent>) => this._onSelectDate(e.detail.date)}"
						@close="${this.close}"
					>
					</panda-month-calendar>
					${this._renderFooter()}
				</div>
			</div>
		`;
	}

	private _renderFooter() {
		let todayBtnHtml: TemplateResult = html``;

		if (this.showToday) {
			todayBtnHtml = html`
				<panda-button
					theme="link"
					@click="${this._onSelectToday}"
				>
					TODAY
				</panda-button>
			`;
		}

		return html`
			<div 
				class="overlay-footer"
				part="overlay-footer"
			>
				${todayBtnHtml}
				<panda-button
					theme="link"
					@click="${this.close}"
				>
					CANCEL
				</panda-button>
			</div>
		`;
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public close() {
		this.dispatchEvent(new CustomEvent("close", {}));
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _showOverlayContent() {
		const overlayRect = this._overlayEl.getBoundingClientRect();
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
		this._overlayEl.classList.add("show");
	}

	private _triggerChangeEvent(date: string) {
		const event = new CustomEvent("change", {
			detail: {
				date
			}
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _preventMouseEvent(e: MouseEvent) {
		// prevent click event to prevent overlay from closing
		e.stopPropagation();
		e.preventDefault();
	}

	private _onSelectDate(date: string) {
		console.log("%c [DATE PICKER OVERLAY] _onSelectDate", "font-size: 24px; color: green;", date);

		// trigger change event
		this._triggerChangeEvent(date);
		this.close();
	}

	private _onSelectToday() {
		const today = new Date();
		const year = String(today.getFullYear());
		const month = `0${today.getMonth() + 1}`.slice(-2);
		const day = `0${today.getDate()}`.slice(-2);
		const date = `${year}-${month}-${day}`;

		// trigger change event
		this._triggerChangeEvent(date);
		this.close();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-date-picker-overlay": PandaDatePickerOverlay;
	}
}
