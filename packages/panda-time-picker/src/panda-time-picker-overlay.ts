// types
import { PandaTimePickerI18nConfig, PandaTimePickerTimeFormat, PandaTimePickerView } from "../index";
import { RawValue } from "./types";

// styles
import { styles } from "./styles/time-picker-overlay-styles";

// component
import "./panda-time-picker-clock";

// utils
import { applyStyles } from "@panda-wbc/panda-utils/lib/component-utils";
import { getI18nConfig } from "./utils/utils";
import { PandaTimePickerClock } from "./panda-time-picker-clock";
import { DEFAULT_TIME_PICKER_VIEW } from "./constants";

export class PandaTimePickerOverlay extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	get value() {
		return this._value;
	}

	set value(rawValue: RawValue) {
		if (this._value !== rawValue) {
			this._value = rawValue;
		}
	}

	private _value!: RawValue;
	
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

	get views() {
		return this._views;
	}

	set views(value: PandaTimePickerView[]) {
		this._views = [...value];
		// update component
		this._updateComponent();
	}

	private _views!: PandaTimePickerView[];
	
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

	// private properties =============================================================================================

	// elements =======================================================================================================
	private _overlayEl!: HTMLElement;
	private _formEl!: HTMLElement;
	private _clockEl!: PandaTimePickerClock;

	// events =========================================================================================================
	private readonly _overlayTabKeyEvent!: EventListener;

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
					<div class="footer" part="footer"></div>
				</div>
			</div>
		`;

		// apply styles
		applyStyles(styles, this.shadowRoot);

		// initialize class properties
		this._value = null;
		this._timeFormat = "24";
		this._views = [...DEFAULT_TIME_PICKER_VIEW];
		this._minuteStep = 1;
		this._secondStep = 1;
		this._i18n = getI18nConfig();

		// init event handlers
		this._overlayTabKeyEvent = this._onOverlayTabKey.bind(this);

		if (this.shadowRoot) {
			this._overlayEl = this.shadowRoot.querySelector(".overlay") as HTMLElement;
			this._formEl = this.shadowRoot.querySelector(".form") as HTMLElement;
			this._clockEl = this.shadowRoot.querySelector("panda-time-picker-clock") as PandaTimePickerClock;
		}
	}

	connectedCallback() {
		// add event listeners
		this._overlayEl.addEventListener("keydown", this._overlayTabKeyEvent);

		// initial render
		this._updateComponent();
	}

	disconnectedCallback() {
		// remove event listeners
		this._overlayEl.removeEventListener("keydown", this._overlayTabKeyEvent);
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _updateComponent(): void {
		if (this.isConnected) {
			// update component based on current properties
			this._clockEl.value = this._value;
			this._clockEl.views = this._views;
			this._clockEl.minuteStep = this._minuteStep;
			this._clockEl.secondStep = this._secondStep;
			this._clockEl.timeFormat = this._timeFormat;
			this._clockEl.i18n = this._i18n;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onOverlayTabKey(event: Event): void {
		if (document.activeElement === this && (event as KeyboardEvent).code === "Tab") {
			// prevent tab key to trap focus inside the overlay
			event.preventDefault();
		}
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