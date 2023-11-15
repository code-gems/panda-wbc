// type
import { PandaComboBoxChange, PandaComboBoxChangeEvent, ElementDetails, PandaComboBoxItem } from "../index";
import { PandaComboBoxOverlay } from "./panda-search-overlay";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-icon";
import "./panda-search-overlay";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { debounce } from "@panda-wbc/panda-core";
import { findItemByLabel, getItemLabel, getItemValue, minValue } from "./utils/utils";

@customElement("panda-search")
export class PandaSearch extends LitElement {
	// css style
	static get styles() {
		return [
			styles
		];
	}

	@property({ type: String })
	label!: string;

	@property({ type: String })
	value: string | number | null = null;

	@property({ type: String, attribute: true })
	placeholder: string | null = null;

	@property({ type: Boolean, attribute: true, reflect: true })
	focused: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	working: boolean = false;

	@property({ type: String, attribute: true })
	icon: string = "find";

	@property({ type: String, attribute: "spinner-type" })
	spinnerType: string = "dots";

	@property({ type: Number })
	delayInterval: number = 1000;

	@property({ type: Boolean, attribute: true, reflect: true })
	autoselect: boolean = false;

	// private props

	// elements
	@query("#input-field")
	private _inputFieldEl!: HTMLInputElement;

	// overlay events

	// debouncer
	private _onInputDebouncer: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback() {
		super.connectedCallback();
		// initialize debouncer
		this._onInputDebouncer = debounce(this._triggerInputDebouncedEvent, this.delayInterval);
	}

	protected updated(changedProps: PropertyValues): void {
		
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// cancel debouncer
		if (this._onInputDebouncer) {
			this._onInputDebouncer.cancel();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		let labelHtml: TemplateResult = html``;
		let spinnerHtml: TemplateResult = html``;
		let iconHtml: TemplateResult = html``;

		if (this.label) {
			labelHtml = html`<div class="label" part="label">${this.label}</div>`;
		}

		// check if component is in working state
		if (this.working) {
			spinnerHtml = html`
				<div class="spinner-cont" part="spinner-cont">
					<dragon-spinner spinner="${this.spinnerType}"></dragon-spinner>
				</div>
			`;
		}

		iconHtml = html`
			<div class="icon" part="icon">
				<dragon-icon icon="${this.icon}"></dragon-icon>
			</div>
		`;

		return html`
			${labelHtml}
			<div
				id="input-cont"
				class="input-cont"
				part="input-cont"
			>
				<slot name="prefix"></slot>
				<input
					id="input-field"
					class="input-field"
					part="input-field"
					type="text"
					.placeholder="${this.placeholder ?? ""}"
					.value="${this.value}"
					.disabled="${this.disabled}"
					@focus="${this._onFocus}"
					@blur="${this._onBlur}"
					@input="${this._onInput}"
				/>
				<slot name="suffix"></slot>
				${iconHtml}
				${spinnerHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _triggerInputEvent() {
		const event: CustomEvent<any> = new CustomEvent("on-input", {
			detail: {
				value: this.value,
			}
		});
		this.dispatchEvent(event);
	}

	private _triggerInputDebouncedEvent() {
		const event: CustomEvent<any> = new CustomEvent("on-input-debounced", {
			detail: {
				value: this.value,
			}
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onFocus() {
		this.focused = true;
		// check for autoselect flag
		if (this.autoselect) {
			this._inputFieldEl.select();
		}
	}

	private _onBlur() {
		this.focused = false;
	}

	private _onInput(value: string) {

	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-search": PandaSearch;
	}
}
