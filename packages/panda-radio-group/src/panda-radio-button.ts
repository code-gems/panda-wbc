// style
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("panda-radio-button")
export class PandaRadioButton extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: String })
	value!: any;

	@property({ type: Boolean, attribute: true, reflect: true })
	checked: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	focused: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled: boolean = false;

	@property({ type: String, reflect: true })
	theme!: string;

	// state props
	@state()
	private _clicked: boolean = false;

	// events
	private _documentMouseUpEvent = this._onMouseUp.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		// add event listeners
		document.addEventListener("mouseup", this._documentMouseUpEvent);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove event listeners
		document.removeEventListener("mouseup", this._documentMouseUpEvent);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		const checked: string = this.checked
			? "checked"
			: "";
		const clicked: string = this._clicked && !this.disabled
			? "clicked"
			: "";
		const disabled: string = this.disabled
			? "disabled"
			: "";
		
		return html`
			<div
				class="radio-button ${clicked} ${disabled}"
				part="radio-button"
				@click="${this._onClick}"
				@mousedown="${this._onMouseDown}"
				@mouseup="${this._onMouseUp}"
				@keypress="${this._onKeyPress}"
				@focus="${this._onFocus}"
				@blur="${this._onBlur}"
				tabindex="0"
			>
				<div class="checkmark ${checked}" part="checkmark"></div>
				<slot></slot>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _triggerSelectEvent(): void {
		if (this.disabled) {
			return;
		}
		this.focused = false;
		const clickEvent = new CustomEvent("on-select", {
			detail: {
				value: this.value
			}
		});
		this.dispatchEvent(clickEvent);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	public _onFocus(): void {
		this.focused = true;
	}
	
	public _onBlur(): void {
		this.focused = false;
	}
	
	private _onMouseDown(): void {
		if (!this.disabled) {
			this._clicked = true;
		}
	}

	private _onMouseUp(): void {
		if (!this.disabled) {
			this._clicked = false;
		}
	}

	private _onKeyPress(event: KeyboardEvent) {
		if (event.code === "Space" || event.code === "Enter") {
			this._triggerSelectEvent();
			event.stopPropagation();
			event.preventDefault();
		}
	}

	private _onClick(): void {
		this._triggerSelectEvent();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-radio-button": PandaRadioButton;
	}
}
