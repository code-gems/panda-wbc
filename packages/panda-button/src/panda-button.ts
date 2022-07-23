// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-button")
export class PandaButton extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: Boolean, attribute: true, reflect: true })
	busy!: boolean;

	@property({ type: Boolean, attribute: true, reflect: true })
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

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		const spinnerHtml: TemplateResult[] = [];
		if (this.busy) {
			spinnerHtml.push(html`
				<div
					class="spinner-cont"
					part="spinner-cont"
				>
					<panda-spinner
						part="spinner"
						spinner="${this.spinner}"
					>
					</panda-spinner>
				</div>
			`);
		}
		return html`
			<button class="${this.disabled ? "disabled" : ""}" part="button">
				<slot name="prefix" part="prefix"></slot>
				<div class="content" part="content">
					<slot></slot>
				</div>
				<slot name="suffix" part="suffix"></slot>
				${spinnerHtml}
			</button>
		`;
	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================

	// ...
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-button": PandaButton;
	}
}
