// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";

@customElement("panda-button")
export class PandaButton extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, reflect: true })
	busy: boolean = false;

	@property({ type: String, attribute: "spinner-type", reflect: true })
	spinnerType!: string;

	@property({ type: String })
	theme!: string;
	
	@property({ type: Boolean, attribute: "active", reflect: true })
	private _active!: boolean;

	@queryAssignedElements({ slot: "prefix" })
	_prefixSlot: any;

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

	protected firstUpdated(): void {
		// console.log("%c _prefixSlot", "font-size: 24px; color: red;", this._prefixSlot);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove events
		document.removeEventListener("mouseup", this._mouseUpEvent);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		const spinnerHtml: TemplateResult[] = [];

		if (this.busy) {
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
		if (this._active) modCss.push("active");
		if (this.disabled) modCss.push("disabled");
		if (this.busy) modCss.push("busy");

		return html`
			<button
				class="${modCss.join(" ")}"
				part="button ${modCss.join(" ")}"
				.disabled="${this.disabled}"
				tabindex="${this.busy || this.disabled ? "-1" : "0"}"
				@mousedown="${this._onMouseDown}"
			>
				<slot
					name="prefix"
					part="prefix"
					@slotchange="${this._onPrefixSlotChange}"
				>
				</slot>
				<div class="content" part="content">
					<slot></slot>
				</div>
				<slot name="suffix" part="suffix"></slot>
				${spinnerHtml}
			</button>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	
	private _onMouseDown(event: any) {
		// console.log("%c ⚡ (mouse down)", "font-size: 24px; color: red;", event);
		this._active = true;
	}
	
	private _onMouseUp(event: MouseEvent) {
		event.stopPropagation();
		// console.log("%c ⚡ (mouse up)", "font-size: 24px; color: red;", event);
		this._active = false;
	}

	private _onPrefixSlotChange(event: any) {
		// console.log("%c _onPrefixSlotChange", "font-size: 48px; color: red;", event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-button": PandaButton;
	}
}
