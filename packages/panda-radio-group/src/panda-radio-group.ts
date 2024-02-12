// types
import { PandaRadioGroupChangeEvent } from "../index";
import { PandaRadioButton } from "./panda-radio-button";

// styles
import { radioGroupStyles } from "./styles/styles";

// components
import "./panda-radio-button";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-radio-group")
export class PandaRadioGroup extends LitElement {
	// css styles
	static get styles() {
		return radioGroupStyles;
	}

	@property({ type: String })
	value!: any;

	@property({ type: String })
	label: string | null = null;

	@property({ type: Boolean, attribute: "orientation-horizontal", reflect: true })
	orientationHorizontal: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled: boolean = false;

	// aria
	@property({ type: String, reflect: true })
	role: string = "radiogroup";

	// events
	private _radioButtonClickEvent: any = this._onChangeEvent.bind(this);

	// elements
	private _radioButtonNodeList: PandaRadioButton[] = [];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		this._initRadioGroup();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove event listeners
		if (this._radioButtonNodeList.length) {
			this._radioButtonNodeList.forEach((radioButton) => {
				radioButton.removeEventListener("on-select", this._radioButtonClickEvent);
			});
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		let labelHtml: TemplateResult = html``;

		// generate label if defined
		if (this.label !== null && this.label !== undefined) {
			labelHtml = html`
				<div
					class="label"
					part="label"
				>
					${this.label}
				</div>
			`;
		}
		
		const orientation = this.orientationHorizontal
			? "horizontal"
			: "";

		return html`
			${labelHtml}
			<div
				class="radio-group ${orientation}"
				part="radio-group"
			>
				<slot></slot>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Create radio group and preselect option */
	private _initRadioGroup(): void {
		// get all radio button elements
		 Array
		 	.from(this.children)
			.forEach((child) => {
				// create radio button collection
				if (child.tagName === "PANDA-RADIO-BUTTON") {
					this._radioButtonNodeList.push(child as PandaRadioButton);
					// add click event listener
					child.addEventListener("on-select", this._radioButtonClickEvent);
					// get selected value
					if ((child as PandaRadioButton).checked) {
						this.value = (child as PandaRadioButton).value;
					}
					// check disabled flag
					if (this.disabled) {
						(child as PandaRadioButton).disabled = true;
					}
				}
			});
		this._selectRadioButton(this.value);
	}

	/** Update 'checked' attribute on all radio buttons based on selected value */ 
	private _selectRadioButton(value: any): void {
		this._radioButtonNodeList.forEach((radioButton) => {
			// set checked attribute on the selected radio button
			radioButton.checked = radioButton.value === value;
		});
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChangeEvent(event: PandaRadioGroupChangeEvent): void {
		this.value = event.detail.value;
		this._selectRadioButton(event.detail.value);
		console.log("%c [PANDA RADIO GROUP] _onChangeEvent", "font-size: 24px; color: green;", event.detail.value);
		const changeEvent = new CustomEvent("change", {
			detail: {
				value: this.value
			}
		});
		this.dispatchEvent(changeEvent);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-radio-group": PandaRadioGroup;
	}
}