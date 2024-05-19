// types
import { PandaTextareaOnInputDetail } from "../index";

// styles
import { styles } from "./styles/styles";
import { scrollbar } from "@panda-wbc/panda-theme";

// utils
import { LitElement, html, TemplateResult, PropertyValueMap } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement("panda-textarea")
export class PandaTextarea extends LitElement {
	// css styles
	static get styles() {
		return [styles, scrollbar];
	}

	@property({ type: String, attribute: true, reflect: true })
	theme!: string;

	@property({ type: String })
	value: string = "";

	@property({ type: String })
	label: string | null = null;

	@property({ type: String })
	placeholder: string | null = null;

	// @property({
	// 	type: String,
	// 	reflect: true,
	// 	converter: {
	// 		fromAttribute(value, type) {
	// 			console.log("%c (converter)", "font-size: 24px; color: red;", typeof value, value);
	// 			return value === "vertical" ? true : "h";
	// 		}
	// 	}
	// })
	// resize: string | boolean | null = null;

	@property({ type: Number, reflect: true })
	rows!: number;

	@property({ type: Number, reflect: true })
	cols!: number;

	@property({ type: Number, attribute: "maxlength", reflect: true })
	maxLength: number | null = null;

	@property({ type: Boolean, attribute: "hard-limit", reflect: true })
	hardLimit: boolean = false;

	@property({ type: Boolean, attribute: "show-length", reflect: true })
	showLength: boolean = false;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, reflect: true })
	busy: boolean = false;

	@property({ type: String, attribute: "spinner-type", reflect: true })
	spinnerType: string = "dots";

	@property({ type: Boolean, reflect: true })
	focused: boolean = false;

	@property({ type: Boolean, reflect: true })
	autofocus: boolean = false;

	@property({ type: Boolean, reflect: true })
	autoselect: boolean = false;

	@property({ type: Boolean, reflect: true })
	spellcheck: boolean = false;
	
	@property({ type: Boolean, attribute: true })
	mandatory: boolean = false;

	// state props
	@property({ type: Boolean, attribute: true, reflect: true })
	private _mandatory: boolean = false;

	@state()
	private _counter: number = 0;

	// elements
	@query("#textarea")
	private _textareaEl!: HTMLInputElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		// update mandatory flag
		this._evaluateMandatoryFlag();
		// autofocus
		if (this.autofocus) {
			this._textareaEl.focus();
		}
		this._counter = this.value.length;
	}

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		if (_changedProperties.has("value")) {
			// update mandatory flag
			this._evaluateMandatoryFlag();
		}

		if (_changedProperties.has("spellcheck")) {
			// focus on the textarea to rerender text
			this._textareaEl.focus();
		}

		// set input max length
		if (_changedProperties.has("maxLength") && this.maxLength !== undefined) {
			if (typeof this.maxLength === "number" && this.hardLimit) {
				this._textareaEl.maxLength = this.maxLength;
			}
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		let labelHtml: TemplateResult = html``;
		let spinnerHtml: TemplateResult = html``;
		let counterHtml: TemplateResult = html``;
		let cssMod: string[] = [];

		// validate counter
		if (typeof this.maxLength === "number" && !this.hardLimit && this.maxLength < this._counter) {
			cssMod.push("invalid");
		}

		// generate label if defined
		if (this.label) {
			labelHtml = html`<div class="label" part="label">${this.label}</div>`;
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

		if (this.showLength) {
			const max = this.maxLength ? `/${this.maxLength}` : ``;
			counterHtml = html`
				<div class="counter ${cssMod.join(" ")}" part="counter ${cssMod.join(" ")}">
					${this._counter}${max}
				</div>
			`;
		}

		// calculate mod css
		if (this._mandatory) cssMod.push("mandatory");
		if (this.disabled) cssMod.push("disabled");
		if (this.busy) cssMod.push("busy");

		return html`
			${labelHtml}
			<div
				class="textarea-cont ${cssMod.join(" ")}"
				part="textarea-cont ${cssMod.join(" ")}"
			>
				<textarea
					id="textarea"
					class="textarea scrollbar"
					part="textarea"
					.value="${this.value}"
					.placeholder="${this.placeholder ?? ""}"
					.rows="${this.rows}"
					.cols="${this.cols}"
					.spellcheck="${this.spellcheck}"
					.disabled="${this.disabled}"
					?autofocus="${this.autofocus}"
					@input="${this._onInput}"
					@change="${this._onChange}"
					@focus="${this._onFocus}"
					@blur="${this._onBlur}"
				></textarea>
				${spinnerHtml}
			</div>
			${counterHtml}
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _triggerInputEvent(): void {
		const event = new CustomEvent<PandaTextareaOnInputDetail>("on-input", {
			detail: {
				value: this.value
			}
		});
		this.dispatchEvent(event);
	}

	private _triggerChangeEvent(): void {
		const event = new CustomEvent<PandaTextareaOnInputDetail>("change", {
			detail: {
				value: this.value
			}
		});
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
		this._onFocus();
		this._textareaEl.focus();
	}

	public clear(): void {
		this.value = "";
		this._triggerInputEvent();
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onFocus() {
		this.focused = true;
		// check autoselect feature
		if (this.autoselect) {
			this._textareaEl.select();
		}
	}

	private _onBlur() {
		this.focused = false;
	}

	private _onInput(event: Event): void {
		this.value = (event.target as HTMLInputElement).value;
		this._counter = this.value.length;
		this._triggerInputEvent();
	}

	private _onChange(event: Event): void {
		this.value = (event.target as HTMLInputElement).value;
		this._triggerChangeEvent();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-textarea": PandaTextarea;
	}
}