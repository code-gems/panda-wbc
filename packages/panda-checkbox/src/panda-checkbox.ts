// types
import { PandaCheckboxChangeEvent } from "../index";

// styles
import { styles } from "./styles/styles";

// components
import "./panda-checkbox-group";
import "@panda-wbc/panda-icon";

// utils
import { LitElement, TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-checkbox")
export class PandaCheckbox extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: String, reflect: true })
	name: string = "";

	@property({ type: Boolean, reflect: true })
	checked: boolean = false;

	@property({ type: Boolean, reflect: true })
	indeterminate: boolean = false;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, reflect: true })
	strikethrough: boolean = false;
	
	@property({ type: Boolean, attribute: "align-right", reflect: true })
	alignRight: boolean = false;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		const icon: string = this.checked
			? "check-box"
			: "check-box-outline-blank";
		
		// aggregate modifier/status css classes
		const cssMods: string[] = [];
		if (this.checked) cssMods.push("checked");
		if (this.disabled) cssMods.push("disabled");
		if (this.indeterminate) cssMods.push("indeterminate");
		if (this.alignRight) cssMods.push("align-right");
		// get part name base on component state
		const part: string[] = ["checkbox"];
		if (this.checked) part.push("checked")
		if (this.indeterminate) part.push("indeterminate")

		return html`
			<div
				class="checkbox ${cssMods.join(" ")}"
				part="${part.join(" ")}"
				@click="${this._onToggle}"
				@keydown="${this._onKeyDown}"
				.tabIndex="${this.disabled ? -1 : 0}"
			>
				<div class="icon" part="icon">
					<panda-icon icon="${icon}"></panda-icon>
				</div>
				<slot></slot>
			</div>
		`;
	}
	
	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================
	
	private _triggerChangeEvent(): void {
		const event: PandaCheckboxChangeEvent = new CustomEvent("change", {
			detail: {
				name: this.name,
				checked: this.checked
			}
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onToggle() {
		if (!this.disabled) {
			this.checked = !this.checked;
			this._triggerChangeEvent();
		}
	}

	private _onKeyDown(event: KeyboardEvent): void {
		if (event.code === "Space" || event.code === "Enter") {
			event.stopPropagation();
			event.preventDefault();
			this._onToggle();
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-checkbox": PandaCheckbox;
	}
}
