// types


// style
import { itemStyles } from "./styles/styles";

// utils
import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-button-group-item")
export class PandaButtonGroupItem extends LitElement {
	// css style
	static get styles() {
		return itemStyles;
	}

	static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: String })
	id!: string;

	@property({ type: String, reflect: true })
	theme!: string;

	@property({ type: String })
	label!: string;

	@property({ type: String })
	value!: any;

	@property({ type: String, reflect: true })
	icon!: string;

	@property({ type: Boolean, reflect: true })
	selected!: boolean;

	@property({ type: Boolean, reflect: true })
	disabled!: boolean;

	@property({ type: Boolean, reflect: true })
	working!: boolean;
	
	@property({ type: String, attribute: "spinner-type", reflect: true })
	spinnerType!: string;

	@property({ type: Boolean, attribute: "active", reflect: true })
	private _active!: boolean;

	// events
	private readonly _mouseUpEvent = this._onMouseUp.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		// add events
		document.addEventListener("mouseup", this._mouseUpEvent);
	}

	updated(_changedProps: PropertyValues): void {
		// console.log("%c PANDA BUTTON GROUP ITEM (updated)", "font-size: 24px; color: green;", this.disabled);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove events
		document.removeEventListener("mouseup", this._mouseUpEvent);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		const spinnerHtml: TemplateResult[] = [];

		if (this.working) {
			spinnerHtml.push(html`
				<div
					class="spinner-cont"
					part="spinner-cont"
				>
					<panda-spinner
						part="spinner"
						spinner="${this.spinnerType ?? "dots"}"
					>
					</panda-spinner>
				</div>
			`);
		}

		const modCss: string[] = [];
		if (this._active) {
			modCss.push("active");
		}
		if (!this.working && this.selected) {
			modCss.push("selected");
		}
		if (this.disabled) {
			modCss.push("disabled");
		}
		if (this.working) {
			modCss.push("working");
		}

		return html`
			<div
				class="item ${modCss.join(" ")}"
				part="item ${modCss.join(" ")}"
				tabindex="${this.working || this.disabled ? "-1" : "0"}"
				@mousedown="${this._onMouseDown}"
			>
				<slot name="prefix-icon"></slot>
				<slot name="prefix-badge"></slot>
				<slot name="prefix"></slot>
				<div
					class="label ${modCss.join(" ")}"
					part="label ${modCss.join(" ")}"
				>
					<slot></slot>
					${this.label}
				</div>
				<slot name="suffix"></slot>
				<slot name="suffix-icon"></slot>
				<slot name="suffix-badge"></slot>
				${spinnerHtml}
			</div>	
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onMouseDown(event: MouseEvent) {
		// console.log("%c ⚡ (mouse down)", "font-size: 24px; color: red;", event);
		this._active = true;
	}
	
	private _onMouseUp(event: MouseEvent) {
		event.stopPropagation();
		// console.log("%c ⚡ (mouse up)", "font-size: 24px; color: red;", event);
		this._active = false;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-button-group-item": PandaButtonGroupItem;
	}
}