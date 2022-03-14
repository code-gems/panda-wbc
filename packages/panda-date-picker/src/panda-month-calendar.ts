// style
import { styles } from "./styles/month-calendar-styles";

// components
// ...

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-month-calendar")
export class PandaMonthCalendar extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: String })
	selectedDate!: string;

	@property({ type: Date })
	today!: Date;

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this.selectedDate = "";
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		console.log("%c [firstUpdated] PandaMonthCalendar", "font-size: 24px; color: green;");

	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html`
			MONTH CALENDAR
			<button @click="${() => this._onAction()}">
				ACTION
			</button>
		`;
	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================

	private _onAction() {
		const event = new CustomEvent("change", {
			detail: {
				target: this.shadowRoot
			}
		});
		this.dispatchEvent(event);
	}
}
