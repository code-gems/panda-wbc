// types

// styles
import { styles } from "./styles/styles";

// components
import "./panda-chip";
import "./panda-chips";

// utils
import { LitElement, TemplateResult, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement("panda-chips-input")
export class PandaChipsInput extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: String, reflect: true })
	theme!: string;

	@property({ type: String, reflect: true })
	label!: string;

	@property({ type: Array })
	chips!: any[];
	
	@property({ type: String })
	placeholder: string | null = null;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;
	
	@property({ type: Boolean, reflect: true })
	busy: boolean = false;

	@property({ type: Boolean, reflect: true })
	focused: boolean = false;

	@property({ type: Boolean, reflect: true })
	autofocus: boolean = false;

	@property({ type: Boolean, reflect: true })
	autoselect: boolean = false;

	@property({ type: Boolean, reflect: true })
	spellcheck: boolean = false;

	@property({ type: Boolean })
	mandatory: boolean = false;

	@property({ type: String, attribute: "spinner-type", reflect: true })
	spinnerType!: string;

	// state props
	@state()
	private _inputText!: string;

	// elements
	@query("#input")
	private readonly _inputEl!: HTMLInputElement;
	
	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		const modCss: string[] = [];
		let labelHtml: TemplateResult = html``;
		let spinnerHtml: TemplateResult = html``;

		// generate label if defined
		if (this.label) {
			labelHtml = html`
				<div class="label" part="label">
					${this.label}
				</div>
			`;
		}

		// check if component is in busy state
		if (this.busy) {
			spinnerHtml = html`
				<div class="spinner-cont" part="spinner-cont">
					<panda-spinner
						part="spinner"
						spinner="${this.spinnerType ?? "dots"}"
					>
					</panda-spinner>
				</div>
			`;
		}

		if (this.disabled) {
			modCss.push("disabled");
		}
		if (this.mandatory) {
			modCss.push("mandatory");
		}

		return html`
			${labelHtml}
			<div
				class="chips-cont"
				part="chips-cont"
			>
				<slot name="prefix"></slot>
				<div
					class=""
					part=""
				>

				</div>
				<slot name="suffix"></slot>
				${spinnerHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	


	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-chips-input": PandaChipsInput;
	}
}
