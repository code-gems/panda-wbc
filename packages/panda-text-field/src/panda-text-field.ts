// types
import { PandaTextFieldOnInputEvent } from "../index";

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

	static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: String, reflect: true })
	theme!: string;

	@property({ type: String })
	value!: string | null;

	@property({ type: String, reflect: true })
	label!: string;

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

	// view props
	@property({ type: Boolean, reflect: true })
	private _mandatory: boolean = false;

	// elements
	@query("#input")
	private readonly _inputEl!: HTMLInputElement;

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
				class="text-field ${modCss.join(" ")}"
				part="text-field ${modCss.join(" ")}"
				theme="${this.theme}"
			>
				<slot name="prefix"></slot>
				<input
					type="text"
					id="input"
					class="input"
					part="input ${modCss.join(" ")}"
					.placeholder="${this.placeholder ?? ""}"
					.value="${this.value ?? ""}"
					.disabled="${this.disabled}"
					?autofocus="${this.autofocus}"
					.spellcheck="${this.spellcheck}"
					autocomplete="off"
					@input="${this._onInput}"
					@focus="${this._onFocus}"
					@blur="${this._onBlur}"
					tabindex="0"
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
		const event: PandaTextFieldOnInputEvent = new CustomEvent("on-input", {
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
	// API ============================================================================================================
	// ================================================================================================================

	public focus(): void {
		this._inputEl.focus();
	}

	public clear(): void {
		this.value = "";
		this._triggerInputEvent();
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onInput(e: Event) {
		this.value = (e.target as HTMLInputElement).value;
		this._triggerInputEvent();
	}

	private _onFocus(event: FocusEvent) {
		this.focused = true;
		// check autoselect feature
		if (this.autoselect) {
			this._inputEl.select();
		} else if (this.value !== null && this.value !== undefined) {
			// if user uses tab key to get to the component, by default
			// all text will be selected ignoring autoselect flag
			// set selection caret to the end of the text
			const _inputValue = (event as any).target.value;
			this._inputEl.setSelectionRange(_inputValue.length + 1, _inputValue.length + 1);
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
