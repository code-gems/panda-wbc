// types

// components
import "./panda-chip";

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, PropertyValues, TemplateResult, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("panda-chips")
export class PandaChips extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: Array })
	chips!: any[];
	
	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;
	
	@property({ type: Boolean, reflect: true })
	busy: boolean = false;

	// state props
	@state()
	private _parsedChips: any[] = [];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	updated(_changedProps: PropertyValues): void {
		if (_changedProps) {

		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render() {
		return html`
			${this._renderChips()}
		`;
	}

	private _renderChips(): TemplateResult[] {
		const chipsHtml: TemplateResult[] = [];

		this._parsedChips.forEach((chip) => {
			const {
				icon,
				label,
				value,
				removable,
			} = chip;

			chipsHtml.push(html`
				<panda-chip
					.icon="${icon}"
					.label="${label}"
					.value="${value}"
					?removable="${removable}"
				>
				</panda-chip>
			`);
		});

		return chipsHtml;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _parseChips(): void {

	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
}