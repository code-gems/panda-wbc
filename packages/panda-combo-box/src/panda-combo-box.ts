// type
import { PandaComboBoxItem } from "../index";

// style
import { styles, modifiers } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html, TemplateResult, PropertyValues, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("panda-combo-box")
export class PandaComboBox extends LitElement {
	// css style
	static get styles() {
		return [
			styles,
			modifiers
		];
	}

	@property({ type: String })
	label!: string;

	@property({ type: String })
	value: string = "";
	
	@property({ type: Array })
	items: PandaComboBoxItem[] | null | undefined = [];

	@property({ type: Boolean, attribute: "allow-custom-value" })
	allowCustomValue: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	focused: boolean = false;

	// view props
	@property({ type: String })
	private _value: string = "";

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(changedProps: PropertyValues): void {
		if (changedProps.has("value") && this.value !== undefined) {
			this._value = this._getItemLabel();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		let labelHtml: TemplateResult = html``;
		console.log("%c label", "font-size: 24px; color: green;", this.label);
		if (this.label) {
			labelHtml = html`<div class="label" part="label">${this.label}</div>`;
		}

		return html`
			${labelHtml}
			<div
				class="combo-box"
				part="combo-box"
			>
				<input
					class="input-field"
					part="input-field"
					type="text"
					.value="${this._value}"
					@focus="${this._onFocus}"
					@blur="${this._onBlur}"
				/>
				<div
					class="icon"
					part="icon"
					@click="${this._onOpenDropDown}"
				>
					<panda-icon icon="chevron-down"></panda-icon>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/**
	 * Get label of selected item
	 * @returns {String} label associated with selected value
	 */
	private _getItemLabel(): string {
		if (this.items) {
			const label = this.items.find((item) => {
				return item.value === this.value;
			});
			return label?.value ?? "";
		} else {
			return "";
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onFocus() {
		this.focused = true;
	}

	private _onBlur() {
		this.focused = false;
	}

	private _onOpenDropDown() {

	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-combo-box": PandaComboBox;
	}
}
6