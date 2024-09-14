// types
import { PandaTextFieldOnInputEvent } from "../index";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult, PropertyValueMap } from "lit";
import { customElement, state, property, query } from "lit/decorators.js";

@customElement("panda-password-field")
export class PandaPasswordField extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: String, reflect: true })
	theme!: string;

	@property({ type: String })
	value!: string | null;

	@property({ type: String })
	label: string | null = null;

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

	@property({ type: Boolean, reflect: true })
	mandatory: boolean = false;

	@property({ type: Boolean, reflect: true })
	readonly: boolean = false;

	@property({ type: Boolean, attribute: "show-password-button", reflect: true })
	showPasswordButton: boolean = false;

	@property({ type: String, attribute: "spinner-type", reflect: true })
	spinnerType: string = "dots";

	// state props
	@state()
	private _mandatory: boolean = false;

	@state()
	private _showPassword: boolean = false;

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
		const _modCss: string[] = [];
		const _type = this._showPassword ? "text" : "password";
		let _labelHtml: TemplateResult = html``;
		let _spinnerHtml: TemplateResult = html``;
		let _showPasswordBtnHtml: TemplateResult = html``;

		// generate label if defined
		if (this.label) {
			_labelHtml = html`<div class="label" part="label">${this.label}</div>`;
		}

		// check if component is in busy state
		if (this.busy) {
			_spinnerHtml = html`
				<div class="spinner-cont" part="spinner-cont">
					<panda-spinner 
						part="spinner"
						spinner="${this.spinnerType}"
					>
					</panda-spinner>
				</div>
			`;
		}

		if (this.showPasswordButton) {
			const _icon = this._showPassword
				? "visibility-off"
				: "visibility";
			_showPasswordBtnHtml = html`
				<div
					class="show-password-button"
					part="show-password-button ${this._showPassword ? "show" : "hide"}"
					@click="${this._onToggleShowPassword}"
					@keypress="${this._onKeyPress}"
					tabindex="0"
				>
					<panda-icon icon="${_icon}"></panda-icon>
				</div>
			`;
		}

		if (this._mandatory) {
			_modCss.push("mandatory");
		}

		if (this.readonly) {
			_modCss.push("readonly");
		}

		if (this.disabled) {
			_modCss.push("disabled");
		}
		
		return html`
			${_labelHtml}
			<div
				class="password-field ${_modCss.join(" ")}"
				part="password-field ${_modCss.join(" ")}"
				theme="${this.theme}"
			>
				<slot name="prefix"></slot>
				<input
					type="${_type}"
					id="input"
					class="input"
					part="input ${_modCss.join(" ")}"
					.placeholder="${this.placeholder ?? ""}"
					.value="${this.value ?? ""}"
					?disabled="${this.disabled}"
					?autofocus="${this.autofocus}"
					?spellcheck="${this.spellcheck}"
					?required="${this.mandatory}"
					autocomplete="off"
					@input="${this._onInput}"
					@focus="${this._onFocus}"
					@blur="${this._onBlur}"
					tabindex="0"
				/>
				${_showPasswordBtnHtml}
				<slot name="suffix"></slot>
				${_spinnerHtml}
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

	private _onInput(e: Event): void {
		this.value = (e.target as HTMLInputElement).value;
		this._triggerInputEvent();
	}

	private _onToggleShowPassword(): void {
		this._showPassword = !this._showPassword;
	}

	private _onFocus(event: FocusEvent): void {
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

	private _onBlur(): void {
		this.focused = false;
	}

	private _onKeyPress(event: KeyboardEvent): void {
		if (event.code === "Space") {
			event.stopPropagation();
			event.preventDefault();
			this._onToggleShowPassword();
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-password-field": PandaPasswordField;
	}
}
