// types
import { PandaTimePickerChangeEvent, PandaTimePickerI18nConfig, PandaTimePickerTimeFormat, PandaTimePickerView } from "../index";
import { PostMessageEventType, RawValue, TimeObject } from "./types";
import { PandaTimePickerClock } from "./panda-time-picker-clock";
import { PandaButton } from "@panda-wbc/panda-button";

// styles
import { styles } from "./styles/time-picker-overlay-styles";

// component
import "./panda-time-picker-clock";

// utils
import { applyStyles } from "@panda-wbc/panda-utils/lib/component-utils";
import { getEmptyTimeObject, getI18nConfig } from "./utils/utils";

// constants
import { DEFAULT_TIME_FORMAT, DEFAULT_TIME_PICKER_VIEW } from "./constants";

export class PandaTimePickerOverlay extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// value ==========================================================================================================
	get value() {
		return this._value;
	}

	set value(rawValue: RawValue) {
		if (this._value !== rawValue) {
			this._value = rawValue;
		}
	}

	private _value!: RawValue;

	// value object ===================================================================================================

	get valueObject() {
		return this._valueObject;
	}

	set valueObject(value: TimeObject) {
		this._valueObject = value;
	}

 	private _valueObject!: TimeObject;
	
	// time format ====================================================================================================
	get timeFormat() {
		return this._timeFormat;
	}

	set timeFormat(value: PandaTimePickerTimeFormat) {
		if (this._timeFormat !== value) {
			this._timeFormat = value;
			// update component
			this._updateComponent();
		}
	}

	private _timeFormat!: PandaTimePickerTimeFormat;

	// views ==========================================================================================================
	get views() {
		return this._views;
	}

	set views(value: PandaTimePickerView[]) {
		this._views = [...value];
		// update component
		this._updateComponent();
	}

	private _views!: PandaTimePickerView[];
	
	// minute step ====================================================================================================
	get minuteStep() {
		return this._minuteStep;
	}

	set minuteStep(value: number) {
		if (this._minuteStep !== value) {
			this._minuteStep = value;
			// update component
			this._updateComponent();
		}
	}

	private _minuteStep!: number;

	// second step ====================================================================================================
	get secondStep() {
		return this._secondStep;
	}

	set secondStep(value: number) {
		if (this._secondStep !== value) {
			this._secondStep = value;
			// update component
			this._updateComponent();
		}
	}

	private _secondStep!: number;

	// i18n ===========================================================================================================
	get i18n() {
		return this._i18n;
	}

	set i18n(value: PandaTimePickerI18nConfig) {
		if (this._i18n !== value) {
			this._i18n = {
				...getI18nConfig(),
				...value,
			};
			// update component
			this._updateComponent();
		}
	}

	private _i18n!: PandaTimePickerI18nConfig;

	// elements =======================================================================================================
	private _overlayEl!: HTMLElement;
	private _formEl!: HTMLElement;
	private _formTitleEl!: HTMLElement;
	private _clockEl!: PandaTimePickerClock;
	private _okButtonEl!: PandaButton;
	private _cancelButtonEl!: PandaButton;

	// events =========================================================================================================
	private readonly _closeOverlayEvent!: EventListener;
	private readonly _clockChangeEvent!: EventListener;
	private readonly _okButtonClickEvent!: EventListener;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// create component template
		this.shadowRoot!.innerHTML = /*html*/`
			<div class="overlay" part="overlay">
				<div class="form" part="form">
					<div class="header" part="header">
						<div class="title" part="title"></div>
						<div class="help-text" part="help-text"></div>
					</div>
					<div class="body" part="body">
						<panda-time-picker-clock></panda-time-picker-clock>
					</div>
					<div class="footer" part="footer">
						<panda-button class="cancel-button"></panda-button>
						<panda-button class="ok-button"></panda-button>
					</div>
				</div>
			</div>
		`;

		// apply styles
		applyStyles(styles, this.shadowRoot);

		// initialize class properties
		this._value = null;
		this._valueObject = getEmptyTimeObject();
		this._timeFormat = DEFAULT_TIME_FORMAT;
		this._views = [...DEFAULT_TIME_PICKER_VIEW];
		this._minuteStep = 1;
		this._secondStep = 1;
		this._i18n = getI18nConfig();

		// init event handlers
		this._closeOverlayEvent = this._onCloseOverlay.bind(this);
		this._clockChangeEvent = this._onClockChange.bind(this);
		this._okButtonClickEvent = this._onOkButtonClick.bind(this);

		if (this.shadowRoot) {
			this._overlayEl = this.shadowRoot.querySelector(".overlay") as HTMLElement;
			this._formEl = this.shadowRoot.querySelector(".form") as HTMLElement;
			this._formTitleEl = this.shadowRoot.querySelector(".title") as HTMLElement;
			this._clockEl = this.shadowRoot.querySelector("panda-time-picker-clock") as PandaTimePickerClock;
			this._okButtonEl = this.shadowRoot.querySelector(".ok-button") as PandaButton;
			this._cancelButtonEl = this.shadowRoot.querySelector(".cancel-button") as PandaButton;
		}
	}

	connectedCallback() {
		// add event listeners
		this._overlayEl.addEventListener("click", this._closeOverlayEvent);
		this._formEl.addEventListener("click", this._formClickEvent);
		this._clockEl.addEventListener("change", this._clockChangeEvent);
		this._okButtonEl.addEventListener("click", this._okButtonClickEvent);
		this._cancelButtonEl.addEventListener("click", this._closeOverlayEvent);
		// initial render
		this._updateComponent();
	}

	disconnectedCallback() {
		// remove event listeners
		this._overlayEl.removeEventListener("click", this._closeOverlayEvent);
		this._formEl.removeEventListener("click", this._formClickEvent);
		this._clockEl.removeEventListener("change", this._clockChangeEvent);
		this._okButtonEl.removeEventListener("click", this._okButtonClickEvent);
		this._cancelButtonEl.removeEventListener("click", this._closeOverlayEvent);
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _updateComponent(): void {
		if (this.isConnected) {
			console.log(
				`%c ⚡ [OVERLAY] (_updateComponent)`,
				"font-size: 24px; color: crimson; background: black;",
				this._value,
			);

			// update button labels
			this._okButtonEl.textContent = this._i18n.okButtonLabel;
			this._cancelButtonEl.textContent = this._i18n.cancelButtonLabel;
			// update form title
			this._formTitleEl.textContent = this._i18n.pickerFormTitle;
			// update component based on current properties
			this._clockEl.i18n = this._i18n;
			this._clockEl.views = this._views;
			this._clockEl.minuteStep = this._minuteStep;
			this._clockEl.secondStep = this._secondStep;
			this._clockEl.timeFormat = this._timeFormat;
			this._clockEl.value = this._value;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	/** Prevent propagation of the click event on the form element. */
	private _formClickEvent(event: Event): void {
		event.preventDefault();
		event.stopPropagation();
	}

	private _onCloseOverlay(): void {
		console.log(`%c ⚡ [OVERLAY] (_onOverlayClick)`, "font-size: 24px; color: lightblue; background: black;", document.activeElement);
		// trigger close event
		const event = new CustomEvent("post-message", {
			detail: {
				type: PostMessageEventType.CLOSE,
				value: null,
				valueObject: null,
			}
		});
		this.dispatchEvent(event);
	}

	private _onClockChange(event: Event): void {
		console.log(`%c ⚡ [OVERLAY] (_onClockChange)`, "font-size: 24px; color: lightgreen; background: black;", event);
		const {
			detail: {
				value,
				valueObject,
			},
		} = event as PandaTimePickerChangeEvent;

		this._value = value;
		this._valueObject = valueObject;
	}

	private _onOkButtonClick(): void {
		console.log(`%c ⚡ [OVERLAY] (_onOkButtonClick)`, "font-size: 24px; color: lightcoral; background: black;");
		// trigger change event
		const event = new CustomEvent("post-message", {
			detail: {
				type: PostMessageEventType.CHANGE,
				value: this._value,
				valueObject: this._valueObject,
			}
		});
		this.dispatchEvent(event);
	}
}

// Register the custom element
if (!customElements.get("panda-time-picker-overlay")) {
	customElements.define("panda-time-picker-overlay", PandaTimePickerOverlay);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-time-picker-overlay": PandaTimePickerOverlay;
	}
}