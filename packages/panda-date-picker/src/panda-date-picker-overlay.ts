// types
import { PandaDatePickerI18nConfig, PandaDatePreset } from "../index";
import { DateValue, ElementDetails, PostMessageEvent, PostMessageEventType } from "./type";
import { PandaButton } from "@panda-wbc/panda-button";

// styles
import { styles } from "./styles/overlay-styles";

// component
import "@panda-wbc/panda-button";
import "./panda-month-view";

// utils
import { getDefaultI18nConfig } from "./utils/utils";

export class PandaDatePickerOverlay extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// value ==========================================================================================================
	private _value!: DateValue;

	get value() {
		return this._value;
	}

	set value(value: DateValue) {
		if (this._value !== value) {
			this._value = value;
		}
	}

	// min ============================================================================================================
	private _min!: DateValue;

	get min() {
		return this._min;
	}

	set min(value: DateValue) {
		if (this._min !== value) {
			this._min = value;
		}
	}

	// max ============================================================================================================
	private _max!: DateValue;

	get max() {
		return this._max;
	}

	set max(value: DateValue) {
		if (this._max !== value) {
			this._max = value;
		}
	}

	// disableWeekends ================================================================================================
	private _disableWeekends!: boolean;

	get disableWeekends() {
		return this._disableWeekends;
	}

	set disableWeekends(value: boolean) {
		if (this._disableWeekends !== value) {
			this._disableWeekends = value;
		}
	}

	// disableDates ===================================================================================================
	private _disableDates!: string[] | null;

	get disableDates() {
		return this._disableDates;
	}

	set disableDates(value: string[] | null) {
		if (this._disableDates !== value) {
			this._disableDates = value;
		}
	}

	// presetDates ====================================================================================================
	private _presetDates!: PandaDatePreset[] | null;

	get presetDates() {
		return this._presetDates;
	}

	set presetDates(value: PandaDatePreset[] | null) {
		if (this._presetDates !== value) {
			this._presetDates = value;
		}
	}

	// presetDatesHeader ==============================================================================================
	private _presetDatesHeader!: string | null;

	get presetDatesHeader() {
		return this._presetDatesHeader;
	}

	set presetDatesHeader(value: string | null) {
		if (this._presetDatesHeader !== value) {
			this._presetDatesHeader = value;
		}
	}

	// weekStartsOnMonday =============================================================================================
	private _weekStartsOnMonday!: boolean;

	get weekStartsOnMonday() {
		return this._weekStartsOnMonday;
	}

	set weekStartsOnMonday(value: boolean) {
		if (this._weekStartsOnMonday !== value) {
			this._weekStartsOnMonday = value;
		}
	}

	// firstDayOfWeek =================================================================================================
	private _firstDayOfWeek!: number;

	get firstDayOfWeek() {
		return this._firstDayOfWeek;
	}

	set firstDayOfWeek(value: number) {
		if (this._firstDayOfWeek !== value) {
			this._firstDayOfWeek = value;
		}
	}
	// highlightDates =================================================================================================
	private _highlightDates!: PandaDatePreset[] | null;

	get highlightDates() {
		return this._highlightDates;
	}

	set highlightDates(value: PandaDatePreset[] | null) {
		if (this._highlightDates !== value) {
			this._highlightDates = value;
		}
	}

	// showToday ======================================================================================================
	private _showToday!: boolean;

	get showToday() {
		return this._showToday;
	}

	set showToday(value: boolean) {
		if (this._showToday != value) {
			this._showToday = value;
			this._updateComponent();
		}
	}

	// disableQuickSelect =============================================================================================
	private _disableQuickSelect!: boolean;

	get disableQuickSelect() {
		return this._disableQuickSelect;
	}

	set disableQuickSelect(value: boolean) {
		if (this._disableQuickSelect != value) {
			this._disableQuickSelect = value;
			this._updateComponent();
		}
	}
	
	// i18n ===========================================================================================================
	private _i18n!: PandaDatePickerI18nConfig;
	
	get i18n() {
		return this._i18n;
	}

	set i18n(value: PandaDatePickerI18nConfig) {
		this._i18n = {
			...getDefaultI18nConfig(),
			...value,
		};
		this._updateComponent();
	}

	// parentDetails ==================================================================================================
	private _parentDetails!: ElementDetails;

	get parentDetails() {
		return this._parentDetails;
	}

	set parentDetails(value: ElementDetails) {
		this._parentDetails = value;
	}	

	// view properties ================================================================================================
	private _ready = false;

	// elements
	private readonly _dialogOverlayEl!: HTMLElement;
	private readonly _dialogEl!: HTMLElement;
	private readonly _footerEl!: HTMLElement;
	private readonly _monthViewEl!: HTMLElement;
	private readonly _todayButtonEl!: PandaButton;
	private readonly _cancelButtonEl!: PandaButton;
	private readonly _selectButtonEl!: PandaButton;

	// events
	private readonly _overlayClickEvent!: any;
	private readonly _closeEvent!: any;
	private readonly _selectTodayEvent!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });

		// apply component styles
		this._applyStyles();

		// create component template
		const template = document.createElement("template");
		template.innerHTML = /*html*/`
			<div class="dialog-overlay" part="dialog-overlay">
				<div class="dialog" part="dialog">
					<panda-month-view></panda-month-view>
					<div class="footer" part="footer">
						<panda-button id="btn-cancel" part="button cancel"></panda-button>
					</div>
				</div>
			</div>
		`;
		this.shadowRoot?.appendChild(template.content.cloneNode(true));

		// create today button element
		this._todayButtonEl = document.createElement("panda-button");
		this._todayButtonEl.theme = "primary";
		this._todayButtonEl.className = "button";
		this._todayButtonEl.part = "button today";

		// create select button element
		this._selectButtonEl = document.createElement("panda-button");
		this._selectButtonEl.theme = "primary";
		this._selectButtonEl.className = "button";
		this._selectButtonEl.part = "button select";

		// initialize class properties
		this._ready = false;
		this._value = null;
		this._min = null;
		this._max = null;
		this._disableDates = null;
		this._disableWeekends = false;
		this._presetDates = null;
		this._presetDatesHeader = null;
		this._highlightDates = null;
		this._weekStartsOnMonday = false;
		this._firstDayOfWeek = 0;
		this._showToday = false;
		this._i18n = getDefaultI18nConfig();

		// get template element handles
		if (this.shadowRoot) {
			// assign template elements
			this._dialogOverlayEl = this.shadowRoot.querySelector(".dialog-overlay") as HTMLElement;
			this._dialogEl = this.shadowRoot.querySelector(".dialog") as HTMLElement;
			this._footerEl = this.shadowRoot.querySelector(".footer") as HTMLElement;
			this._monthViewEl = this.shadowRoot.querySelector("panda-month-view") as HTMLElement;
			this._cancelButtonEl = this.shadowRoot.getElementById("btn-cancel") as PandaButton;

			// add event listeners to component template
			this._closeEvent = this._onClose.bind(this);
			this._cancelButtonEl.addEventListener("click", this._closeEvent);
			this._dialogOverlayEl.addEventListener("click", this._closeEvent);
			this._overlayClickEvent = this._onDialogClick.bind(this);
			this._dialogEl.addEventListener("click", this._overlayClickEvent);
			this._selectTodayEvent = this._onSelectToday.bind(this);
			this._todayButtonEl.addEventListener("click", this._selectTodayEvent);
		}
	}

	connectedCallback() {
		this._ready = true;
		this._updateComponent();
	}

	disconnectedCallback() {
		// remove event listeners
		this._cancelButtonEl.removeEventListener("click", this._closeEvent);
		this._dialogOverlayEl.removeEventListener("click", this._closeEvent);
		this._todayButtonEl.removeEventListener("click", this._selectTodayEvent);
	}

	private _updateComponent() {
		console.log(
			`%c 🗨️⚡ [OVERLAY] (_updateComponent) ready?`,
			"font-size: 24px; color: purple; background: black;",
			this._ready,
			this._showToday
		);
		if (this._ready) {
			// show today button if enabled
			if (this._showToday) {
				this._todayButtonEl.textContent = this._i18n.today;
				this._footerEl.prepend(this._todayButtonEl);
				console.log(
					`%c 🗨️⚡ [OVERLAY] (_updateComponent) show today button?`,
					"font-size: 24px; color: purple; background: black;",
					this._showToday,
					this._todayButtonEl
				);
			} else {
				this._todayButtonEl.remove();
			}

			// update cancel button text
			this._cancelButtonEl.textContent = this._i18n.cancel;

			// position and show overlay content
			this._showOverlayContent();
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================
	
	/** Apply component styles to shadow root. */
	private _applyStyles(): void {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	private _showOverlayContent() {
		const overlayRect = this._dialogEl.getBoundingClientRect();
		let overlayTop = this.parentDetails.bottom;
		let overlayLeft = this.parentDetails.left;

		if (overlayTop - window.scrollY + overlayRect.height > window.innerHeight) {
			overlayTop = this.parentDetails.top - overlayRect.height;
		}
		if (overlayLeft - window.scrollX + overlayRect.width > window.innerWidth) {
			overlayLeft = this.parentDetails.right - overlayRect.width;
		}
		// position overlay content
		this._dialogEl.style.top = `${overlayTop}px`;
		this._dialogEl.style.left = `${overlayLeft}px`;
		this._dialogEl.classList.add("show");
	}

	private _updateMonthView(): void {
		// update month view properties
		(this._monthViewEl as any).value = this.value;
		(this._monthViewEl as any).min = this.min;
		(this._monthViewEl as any).max = this.max;
		(this._monthViewEl as any).disableWeekends = this.disableWeekends;
		(this._monthViewEl as any).disableDates = this.disableDates;
		(this._monthViewEl as any).presetDates = this.presetDates;
		(this._monthViewEl as any).presetDatesHeader = this.presetDatesHeader;
		(this._monthViewEl as any).highlightDates = this.highlightDates;
		(this._monthViewEl as any).weekStartsOnMonday = this.weekStartsOnMonday;
		(this._monthViewEl as any).firstDayOfWeek = this.firstDayOfWeek;
	}

	private _triggerPostMessageEvent(eventType: PostMessageEventType): void {
		const event: PostMessageEvent = new CustomEvent("post-message", {
			detail: {
				type: eventType,
				value: "",
			},
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onDialogClick(event: MouseEvent): void {
		console.log(`%c 🗨️⚡ [OVERLAY] (_onDialogClick)`, "font-size: 24px; color: green; background: black;");
		// prevent mouse event
		event.stopPropagation();
		event.preventDefault();
	}

	private _onClose(): void {
		console.log(`%c 🗨️⚡ [OVERLAY] (_onClose)`, "font-size: 24px; color: green; background: black;");
		this._triggerPostMessageEvent(PostMessageEventType.Close);
	}

	private _onSelectToday(): void {
		console.log(`%c 🗨️⚡ [OVERLAY] (_onSelectToday)`, "font-size: 24px; color: green; background: black;");
		this._triggerPostMessageEvent(PostMessageEventType.SelectToday);
	}
}

// Register the custom element
if (!customElements.get("panda-date-picker-overlay")) {
	customElements.define("panda-date-picker-overlay", PandaDatePickerOverlay);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-date-picker-overlay": PandaDatePickerOverlay;
	}
}