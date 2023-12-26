// types
import { PandaCheckboxChangeEvent } from "../index";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-checkbox")
export class PandaCheckbox extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: Boolean, attribute: true, reflect: true })
	checked: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	strikethrough: boolean = false;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		const cssMods: string[] = [];
		let icon: string = this.checked
			? "check-box"
			: "check-box-outline-blank";

		if (this.checked) {
			cssMods.push("checked");
		}
		
		if (this.disabled) {
			cssMods.push("disabled");
		}

		return html`
			<label
				class="checkbox-cont ${cssMods.join(" ")}"
				part="checkbox-cont"
				@click="${this._onToggleCheckbox}"
			>
				<input
					type="checkbox"
					class="checkbox"
					part="checkbox"
					.disabled="${this.disabled}"
					.checked="${this.checked}"
				/>
				<div class="icon" part="icon">
					<panda-icon icon="${icon}"></panda-icon>
				</div>
				<slot></slot>
			</label>
		`;
	}
	
	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================
	
	public toggle() {
		this.checked = !this.checked;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onToggleCheckbox(event: Event) {
		event.stopPropagation();
		event.preventDefault();

		// don't do anything if disabled
		if (this.disabled) {
			this.checked = !this.checked;
			const changeEvent: PandaCheckboxChangeEvent = new CustomEvent("change", {
				detail: {
					checked: this.checked
				}
			});
			this.dispatchEvent(changeEvent);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-checkbox": PandaCheckbox;
	}
}
