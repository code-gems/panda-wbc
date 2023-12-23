// types
import { PandaSwitchChangeEvent } from "../index";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement("panda-switch")
export class PandaSwitch extends LitElement {
	// css styles
	static get styles() {
		return [
			styles
		];
	}

	@property({ type: Boolean, reflect: true })
	checked: boolean = false;

	@property({ type: String })
	label: string | null = null;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	busy: boolean = false;

	@property({ type: Boolean, reflect: true })
	focused: boolean = false;

	@property({ type: String, attribute: "light-icon" })
	iconOn: string | null = null;

	@property({ type: String, attribute: "dark-icon" })
	iconOff: string | null = null;

	@property({ type: String, attribute: "spinner-type" })
	spinnerType: string = "dots";

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		let labelHtml: TemplateResult = html``;
		let spinnerHtml: TemplateResult = html``;
		let iconHtml: TemplateResult = html``;

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

		if (
			this.iconOn !== null &&
			this.iconOn !== undefined &&
			this.iconOff !== null &&
			this.iconOff !== undefined
		) {
			const icon = this.checked
				? this.iconOn
				: this.iconOff;

			iconHtml = html`<panda-icon icon="${icon}"></panda-icon>`;
		}

		return html`
			${labelHtml}
			<div class="switch-cont" part="switch-cont">
				<label
					class="switch"
					@change="${this._onToggle}"
					@focus="${this._onFocus}"
					@blur="${this._onBlur}"
				>
					<input
						type="checkbox"
						?checked="${this.checked}"
					>
					<span class="slider round">
						${iconHtml}
					</span>
				</label>
				${spinnerHtml}
			</div>
		`;
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

	private _onToggle() {
		this.checked = !this.checked;
		// trigger change event
		const event: PandaSwitchChangeEvent = new CustomEvent("change", {
			detail: {
				checked: this.checked
			}
		});
		this.dispatchEvent(event);
	}
}