// types
import { PandaTimePickerI18nConfig } from "../index";
import { RawValue } from "./types";

// styles
import { styles } from "./styles/time-picker-clock-styles";

export class PandaTimePickerClock extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = ["value"];

	private _value!: string;
	
	get value(): string {
		return this._value;
	}

	set value(value: string) {
		if (this._value !== value) {
			this._value = value;
			this.setAttribute("value", this._value); // reflect to attribute
			this._updateComponent();
		}
	}

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });

		this._value = "";
	}

	connectedCallback() {
		
		this._updateComponent();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "value") {
			this._value = _newValue;
			this._updateComponent();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	/** Renders the badge */
	private _updateComponent() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<div
					class="clock-view"
					part="clock-view"
				>
					<svg
						class="clock"
						width="200"
						height="200"
						viewBox="0 0 100 100"
					>
						<circle cx="50" cy="50" r="45" fill="white" stroke="black" stroke-width="2" />
						
					</svg>
					<div class="footer" part="footer">
						<button class="cancel" part="cancel">Cancel</button>
						<button class="ok" part="ok">OK</button>
					</div>
				</div>
			`;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

}

// Register the custom element
if (!customElements.get("panda-time-picker-clock")) {
	customElements.define("panda-time-picker-clock", PandaTimePickerClock);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-time-picker-clock": PandaTimePickerClock;
	}
}