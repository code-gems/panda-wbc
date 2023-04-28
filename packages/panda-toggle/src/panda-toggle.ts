// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-toggle")
export class PandaToggle extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: Boolean, attribute: true, reflect: true })
	checked: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	indeterminate: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	busy: boolean = false;

	@property({ type: String, attribute: true })
	spinner: string = "dots";

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
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
			<label class="toggle" part="toggle">
				<input
					type="checkbox"
					.checked=${this.checked}
					.disabled=${this.disabled} 
					.indeterminate=${this.indeterminate}
					@change=${this._onToggle}
				>
				<span class="slider"></span>
				${spinnerHtml}
			</label>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onToggle(e: any) {
		this.checked = e.target.checked;
		this.indeterminate = e.target.indeterminate;

		const event = new CustomEvent('change', {
			detail: {
				checked: this.checked,
				indeterminate: this.indeterminate
			}
		});
		this.dispatchEvent(event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-toggle": PandaToggle;
	}
}
