// types
import { PandaToggleChangeEvent } from "../index";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-toggle")
export class PandaToggle extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: Boolean, attribute: true, reflect: true })
	selected: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	indeterminate: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	busy: boolean = false;

	@property({ type: String, attribute: true })
	spinner: string = "dots";
	
	@property({ type: String, attribute: "selected-icon" })
	selectedIcon: string | null = null;

	@property({ type: String, attribute: "unselected-icon" })
	unselectedIcon: string | null = null;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		const selectedCss = this.selected ? "selected" : "";
		const modCss: string[] = [];
		let spinnerHtml: TemplateResult = html``;
		let selectedIconHtml: TemplateResult = html``;
		let unselectedIconHtml: TemplateResult = html``;

		if (this.busy) {
			spinnerHtml = html`
				<div
					class="spinner-cont"
					part="spinner-cont"
				>
					<panda-spinner
						part="spinner"
						spinner="${this.spinner}"
					>
					</panda-spinner>
				</div>
			`;
		}
		// apply selected icon
		if (this.selectedIcon) {
			selectedIconHtml = html`
				<panda-icon
					class="icon icon-selected"
					part="icon selected"
					.icon="${this.selectedIcon}"
				>
				</panda-icon>
			`;
		}
		// apply unselected icon
		if (this.unselectedIcon) {
			unselectedIconHtml = html`
				<panda-icon
					class="icon icon-unselected"
					part="icon unselected"
					.icon="${this.unselectedIcon}"
				>
				</panda-icon>
			`;
		}
		// aggregate modifier/status css classes
		if (this.selected) modCss.push("selected");
		if (this.disabled) modCss.push("disabled");

		return html`
			<div
				class="toggle ${modCss.join(" ")}"
				part="toggle ${selectedCss}"
				@click="${this._onToggle}"
				@keydown="${this._onKeyDown}"
				.tabIndex="${this.disabled ? -1 : 0}"
			>
				<div class="toggle-track" part="toggle-track"></div>
				<div
					class="toggle-handle"
					part="toggle-handle"
				>
					${selectedIconHtml}
					${unselectedIconHtml}
				</div>
				${spinnerHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _triggerChangeEvent(): void {
		const event: PandaToggleChangeEvent = new CustomEvent('change', {
			detail: {
				selected: this.selected,
			}
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onToggle(selected: boolean | null = null) {
		if (!this.disabled && !this.busy) {
			this.selected = selected === null ? !this.selected : selected;
			this.indeterminate = false;
		}
	}

	private _onKeyDown(event: KeyboardEvent): void {
		console.log("%c something", "font-size: 24px; color: green;", event);
		
		if (event.code === "Space") {
			event.stopPropagation();
			event.preventDefault();
			this._onToggle();
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-toggle": PandaToggle;
	}
}
