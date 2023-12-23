// types
import { PandaTextFieldOnInputDetail } from "../index";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("panda-text-field")
export class PandaTextField extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: String })
	value!: string | null;

	@property({ type: String })
	label: string | null = null;

	@property({ type: String })
	placeholder: string | null = null;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	busy: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	focused: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	autofocus: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	autoselect: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	spellcheck: boolean = false;

	@property({ type: Boolean, attribute: true })
	mandatory: boolean = false;

	@property({ type: String, attribute: true })
	theme!: string;

	@property({ type: String, attribute: "spinner-type" })
	spinnerType: string = "dots";

	// view props
	@property({ type: Boolean, attribute: true, reflect: true })
	private _mandatory: boolean = false;

	// elements
	@query("#input")
	private _inputEl!: HTMLInputElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		// update mandatory flag
		this._evaluateMandatoryFlag();
		// autofocus
		if (this.autofocus) {
			this._inputEl.focus();
		}
	}

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		if (_changedProperties.has("value")) {
			// update mandatory flag
			this._evaluateMandatoryFlag();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		let labelHtml: TemplateResult = html``;
		let spinnerHtml: TemplateResult = html``;

		// generate label if defined
		if (this.label) {
			labelHtml = html`
				<div
					class="label"
					part="label"
				>
					${this.label}
				</div>
			`;
		}

		// check if component is in busy state
		if (this.busy) {
			spinnerHtml = html`
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
			`;
		}
		
		return html`
			${labelHtml}
			<div
				class="text-field ${this.disabled ? "disabled" : ""} ${this._mandatory ? "mandatory" : ""}"
				part="text-field"
				theme="${this.theme}"
			>
				<slot name="prefix"></slot>
				<input
					type="text"
					id="input"
					class="input"
					part="input"
					.placeholder="${this.placeholder || ""}"
					.value="${this.value || ""}"
					.disabled="${this.disabled}"
					?autofocus="${this.autofocus}"
					.spellcheck="${this.spellcheck}"
					@input="${this._onInput}"
					@focus="${this._onFocus}"
					@blur="${this._onBlur}"
				/>
				<slot name="suffix"></slot>
				${spinnerHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _triggerInputEvent() {
		const event: CustomEvent<PandaTextFieldOnInputDetail> = new CustomEvent("on-input", {
			detail: {
				value: this.value as string
			}
		})
		this.dispatchEvent(event);
	}

	/** Update mandatory flag */
	private _evaluateMandatoryFlag() {
		if (this.mandatory) {
			if (
				this.value !== null &&
				this.value !== undefined &&
				this.value !== "" &&
				String(this.value).length
			) {
				this._mandatory = false;
			} else {
				this._mandatory = true;
			}
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onInput(e: Event) {
		this.value = (e.target as HTMLInputElement).value;
		this._triggerInputEvent();
	}

	private _onFocus() {
		this.focused = true;
		// check autoselect feature
		if (this.autoselect) {
			this._inputEl.select();
		}
	}

	private _onBlur() {
		this.focused = false;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-text-field": PandaTextField;
	}
}
