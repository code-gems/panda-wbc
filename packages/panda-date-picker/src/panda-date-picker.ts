// style
import { styles } from "./styles/styles";

// components
import "./panda-month-calendar";
import "./panda-overlay";
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-date-picker")
export class PandaDatePicker extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: Boolean, attribute: true })
	busy!: boolean;

	@property({ type: Boolean, attribute: true })
	disabled!: boolean;

	@property({ type: String, attribute: true })
	spinner!: string;

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this.busy = false;
		this.disabled = false;
		this.spinner = "dots";
	}

	protected updated(changedProps: PropertyValues) {
		if (changedProps.has("disabled") && this.disabled) {
			this.setAttribute("disabled", "");
		}
		if (changedProps.has("busy") && this.busy) {
			this.setAttribute("busy", "");
		}
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {

		return html`
			<panda-month-calendar
				.selectedDate="${"2022-03-14"}"
				@change="${(e: any) => this._onSelectedDateChange(e)}"
			>
			</panda-month-calendar>
		`;
	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================

	_onSelectedDateChange(e: any) {
		console.log("%c _onSelectedDateChange", "font-size: 24px; color: green;", e.detail);
	}
}