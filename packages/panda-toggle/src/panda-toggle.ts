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

	@property({ type: Boolean, reflect: true })
	selected: boolean = false;

	@property({ type: Boolean, reflect: true })
	indeterminate: boolean = false;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, reflect: true })
	busy: boolean = false;

	@property({ type: String })
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

	protected render(): TemplateResult {
		const selected = this.selected ? "selected" : "";
		const indeterminate = this.indeterminate ? "indeterminate" : "";
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
		if (this.indeterminate) modCss.push("indeterminate");

		return html`
			<div
				class="toggle ${modCss.join(" ")}"
				part="toggle ${selected} ${indeterminate}"
				@click="${this._onToggle}"
				@keydown="${this._onKeyDown}"
				.tabIndex="${this.disabled ? -1 : 0}"
			>
				<div class="toggle-track" part="toggle-track"></div>
				<div class="toggle-handle" part="toggle-handle">
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
		console.log("%c _triggerChangeEvent", "font-size: 24px; color: orange;", event);
	}

	private _setSelected(selected: boolean): void {
		if (
			!this.disabled && !this.busy && this.selected !== selected ||
			!this.disabled && !this.busy && this.indeterminate
		) {
			this.selected = selected;
			this.indeterminate = false;
			this._triggerChangeEvent();
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onToggle(): void {
		if (!this.disabled && !this.busy) {
			this.selected = !this.selected;
			this.indeterminate = false;
			this._triggerChangeEvent();
		}
	}

	private _onKeyDown(event: KeyboardEvent): void {
		console.log("%c something", "font-size: 24px; color: green;", event);

		switch (event.code) {
			case "Space":
			case "Enter":
				this._onToggle();
				event.stopPropagation();
				event.preventDefault();
				break;
			case "ArrowLeft":
				this._setSelected(false);
				event.stopPropagation();
				event.preventDefault();
				break;
			case "ArrowRight":
				this._setSelected(true);
				event.stopPropagation();
				event.preventDefault();
				break;
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-toggle": PandaToggle;
	}
}
