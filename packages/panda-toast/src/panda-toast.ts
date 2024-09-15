// types
// ...

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("panda-toast")
export class PandaToastElement extends LitElement {
	static get styles() {
		return styles;
	}

	@property({ type: String, reflect: true })
	theme!: string;
	
	@property({ type: String, reflect: true })
	header: string = "";
	
	@property({ type: String, reflect: true })
	message: string = "";
	
	@property({ type: String, reflect: true })
	icon: string = "";
	
	@property({ type: Number, reflect: true })
	interval: number = 3000;
	
	@property({ type: Boolean, reflect: true })
	closable: boolean = false;

	// state props

	@state()
	private _show: boolean = false;
	
	private _closingTimer: number | null = null;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================
	
	firstUpdated(): void {
		setTimeout(() => {
			// show toast
			this._show = true;
	
			this._closingTimer = setTimeout(async () => {
				this._show = false;
				await new Promise((r) => setTimeout(r, 200));
				this._onCloseToast();
			}, this.interval);
		}, 0);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// clear timer
		clearTimeout(this._closingTimer as number);
	}
	
	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================
	
	render(): TemplateResult {
		let _iconHtml: TemplateResult = html``;
		let _headerHtml: TemplateResult = html``;
		let _closeBtnHtml: TemplateResult = html``;

		if (this.header) {
			_headerHtml = html`<div class="title" part="title">${this.header ?? ""}</div>`;
		}

		if (this.icon) {
			_iconHtml = html`
				<div class="icon" part="icon">
					<panda-icon icon="${this.icon ?? "info"}"></panda-icon>
				</div>
			`;
		}

		if (this.closable) {
			_closeBtnHtml = html`
				<div
					class="btn-close"
					part="btn-close"
					@click="${this._onCloseToast}"
				>
					<panda-icon icon="close" part="icon"></panda-icon>
				</div>
			`;
		}

		return html`
			<div
				class="toast ${this._show ? "show" : ""}"
				part="toast"
			>
				${_iconHtml}
				<div class="content" part="content">
					${_headerHtml}
					<div class="message" part="message">${this.message}</div>
				</div>
				${_closeBtnHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	
	private _onCloseToast(): void {
		const event = new CustomEvent("close", {});
		this.dispatchEvent(event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-toast": PandaToastElement;
	}
}