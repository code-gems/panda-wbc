// types

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-multi-input")
export class PandaMultiInput extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: Array })
	values!: string[];

	@property({ type: Boolean, attribute: true, reflect: true })
	busy!: boolean;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled!: boolean;

	@property({ type: String, attribute: true })
	spinner!: string;	

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
			<div
				class="input-cont"
				part="input-cont"
			>
				${this._renderItems()}
				<input
					type="text"
					.value=""
				/>
				${spinnerHtml}
			</div>
		`;
	}

	private _renderItems() {
		const itemsHtml: TemplateResult[] = [];
		
		if (this.values?.length) {
			this.values.forEach((value) => {
				itemsHtml.push(html`
					<div
						class="input-item"
						part="input-item"
						
					>
						<label>${value}</label>
						<div
							class="btn"
							@click="${() => this._onRemoveItem(value)}"
						>
							<panda-icon icon="close"></panda-icon>
						</div>
					</div>
				`);
			});
		}

		return itemsHtml;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	_onRemoveItem(value: string) {

	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-multi-input": PandaMultiInput;
	}
}
