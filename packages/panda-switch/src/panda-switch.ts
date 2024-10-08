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
		return styles;
	}

	static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: Boolean, reflect: true })
	checked: boolean = false;

	@property({ type: String, reflect: true  })
	label: string | null = null;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, reflect: true })
	busy: boolean = false;

	@property({ type: Boolean, reflect: true })
	focused: boolean = false;

	@property({ type: String, attribute: "light-icon", reflect: true })
	iconOn: string | null = null;

	@property({ type: String, attribute: "dark-icon", reflect: true })
	iconOff: string | null = null;

	@property({ type: String, attribute: "spinner-type", reflect: true  })
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

		const cssMods: string[] = [];

		if (this.checked) {
			cssMods.push("checked");
		}

		if (this.disabled) {
			cssMods.push("disabled");
		}

		return html`
			${labelHtml}
			<div class="switch-cont" part="switch-cont">
				<label
					class="switch ${cssMods.join(" ")}"
					@change="${this._onToggle}"
					@focus="${this._onFocus}"
					@blur="${this._onBlur}"
					@keypress="${this._onKeyPress}"
					tabindex="0"
				>
					<input
						type="checkbox"
						?checked="${this.checked}"
					>
					<span class="slider">
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
	
	private _onKeyPress(event: KeyboardEvent) {
		console.log("%c _onKeyPress", "font-size: 24px; color: green;", event);
		if (event.code === "Space" || event.code === "Enter") {
			this._onToggle();
			event.stopPropagation();
			event.preventDefault();
		}
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