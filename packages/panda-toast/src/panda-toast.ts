// types

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("panda-toast")
class PandaToastElement extends LitElement {
	static get styles() {
		return styles;
	}

	@property({ type: String })
	id!: string;
	
	@property({ type: String, reflect: true })
	title: string = "";
	
	@property({ type: String, reflect: true })
	message: string = "";
	
	@property({ type: String, reflect: true })
	icon: string = "";
	
	@property({ type: Number, reflect: true })
	interval: number = 3000;
	
	@property({ type: Boolean, reflect: true })
	closable: boolean = true;

	// state props

	@state()
	private _show: boolean = false;
	
	private _closingTimer: number | null = null;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================
	
	firstUpdated(): void {
		// show toast
		this._show = true;

		this._closingTimer = setTimeout(() => {
			this._show = false;
		}, this.interval);
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
		let _titleHtml: TemplateResult = html``;
		let _closeBtnHtml: TemplateResult = html``;

		if (this.title) {
			_titleHtml = html`<div class="title" part="title">${this.title ?? ""}</div>`;
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
				${_titleHtml}
				<div class="message" part="message">${this.message}</div>
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