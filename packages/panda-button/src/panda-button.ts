// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";

@customElement("panda-button")
export class PandaButton extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, reflect: true })
	busy: boolean = false;

	@property({ type: String, attribute: "spinner-type" })
	spinnerType: string = "dots";

	@property({ type: String })
	theme!: string;

	@queryAssignedElements({ slot: "prefix" })
	_prefixSlot: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {

		console.log("%c _prefixSlot", "font-size: 24px; color: red;", this._prefixSlot);
		
	}

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
						spinner="${this.spinnerType}"
					>
					</panda-spinner>
				</div>
			`);
		}
		
		return html`
			<button
				class="${this.disabled ? "disabled" : ""}"
				part="button"
				.disabled="${this.disabled}"
				tabindex="0"
			>
				<slot
					name="prefix"
					part="prefix"
					@slotchange="${this._onPrefixSlotChange}"
				>
				</slot>
				<div class="content" part="content">
					<slot></slot>
				</div>
				<slot name="suffix" part="suffix"></slot>
				${spinnerHtml}
			</button>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onPrefixSlotChange(event: any) {
		console.log("%c _onPrefixSlotChange", "font-size: 48px; color: red;", event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-button": PandaButton;
	}
}
