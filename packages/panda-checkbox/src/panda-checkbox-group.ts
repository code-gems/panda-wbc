// types
import { PandaCheckboxChangeEvent } from "../index";

// styles
import { groupStyles } from "./styles/styles";

// utils
import { LitElement, TemplateResult, html } from "lit";
import { customElement, property, state, queryAssignedElements } from "lit/decorators.js";

@customElement("panda-checkbox-group")
export class PandaCheckboxGroup extends LitElement {
	// css styles
	static get styles() {
		return groupStyles;
	}

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, reflect: true })
	horizontal: boolean = false;

	// state props
	@queryAssignedElements()
	private _slotNodes!: HTMLElement[];

	private _checkboxEls: HTMLElement[] = []; // all checkbox elements with event listeners

	@state()
	initialized: boolean = false;

	// events
	private _onChangeEvent: any = this._onChange.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		const horizontal = this.horizontal ? " horizontal" : "";
		return html`
			<slot
				class="checkbox-group"
				part="checkbox-group"
				@slotchange="${this._onSlotChange}"
			>
			</slot>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _triggerChangeEvent(name: string, checked: boolean): void {
		const event: PandaCheckboxChangeEvent = new CustomEvent('change', {
			detail: {
				name,
				checked,
			}
		});
		this.dispatchEvent(event);
		console.log("%c _triggerChangeEvent", "font-size: 24px; color: orange;", event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onSlotChange(): void {
		console.log("%c _onSlotChange", "font-size: 24px; color: red;", this._slotNodes);
		// remove existing event listeners
		if (this.initialized) {
			this._checkboxEls.forEach((checkboxEl) => {
				checkboxEl.removeEventListener("change", this._onChangeEvent);
			});
			// clean up
			this._checkboxEls = [];
		}
		// add event listeners
		this._slotNodes.forEach((checkboxEl) => {
			checkboxEl.addEventListener("change", this._onChangeEvent);
			this._checkboxEls.push(checkboxEl);
		});
	}

	private _onChange(event: PandaCheckboxChangeEvent): void {
		if (!this.disabled) {
			const {name, checked } = event.detail;
			this._triggerChangeEvent(name, checked);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-checkbox-group": PandaCheckboxGroup;
	}
}
