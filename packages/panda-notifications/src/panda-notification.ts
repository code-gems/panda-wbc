// types
// ...

// styles
import { notificationStyles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, queryAssignedElements, state } from "lit/decorators.js";

@customElement("panda-notification")
export class PandaNotification extends LitElement {
	// css styles
	static get styles() {
		return notificationStyles;
	}

	@property({ type: String, attribute: true, reflect: true })
	theme: string = "";

	@property({ type: String })
	icon: string = "";

	@property({ type: Boolean, attribute: "hide-icon" })
	hideIcon: boolean = false;

	@property({ type: Boolean, reflect: true })
	closable: boolean = false;
	
	@property({ type: String, attribute: "spinner-type" })
	spinnerType: string = "google";

	@queryAssignedElements({ slot: "header", flatten: false })
	private _headerNodes!: HTMLElement[];

	@state()
	private _hasHeader: boolean = false;

	@queryAssignedElements({ slot: "footer", flatten: false })
	private _footerNodes!: HTMLElement[];

	@state()
	private _hasFooter: boolean = false;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...	

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		const cssMods = [];
		// add css classes to adjust the layout
		if (this._hasHeader) {
			cssMods.push("with-header");
		}
		if (this._hasFooter) {
			cssMods.push("with-footer");
		}
		if (this.hideIcon) {
			cssMods.push("no-icon");
		}

		return html`
			<div
				class="notification ${cssMods.join(" ")}"
				part="notification"
			>
				<div
					class="body"
					part="body"
				>
					<!-- icon -->
					${this._renderIcon()}

					<div
						class="message"
						part="message"
					>
						<div class="header">
							<slot
								class="header-prefix"
								name="header-prefix"
							></slot>
							<slot
								class="header-text"
								name="header"
								@slotchange=${this._onHeaderSlotChange}
							></slot>
						</div>

						<!-- message slot -->
						<slot></slot>
					</div>

					<!-- close button -->
					${this._renderCloseButton()}

				</div>

				<div
					class="footer"
					part="footer"
				>
					<slot
						name="footer"
						@slotchange=${this._onFooterSlotChange}
					>
					</slot>					
				</div>

			</div><!-- notification -->
		`;
	}

	private _renderCloseButton(): TemplateResult | void {
		if (this.closable) {
			return html`
				<div
					class="btn-close"
					part="btn-close"
					@click="${this._onClose}"
				>
					<panda-icon icon="close"></panda-icon>
				</div>
			`;
		}
	}

	private _renderIcon(): TemplateResult | void {
		if (!this.hideIcon) {
			const theme = this.theme ?? "";

			if (String(theme).toLocaleLowerCase().includes("spinner")) {
				return html`
					<div
						class="icon"
						part="icon"
					>
						<panda-spinner .spinner="${this.spinnerType}"></panda-spinner>
					</div>
				`;
			} else {
				let icon: string = "notification";

				if (theme.includes("info")) {
					icon = "info";
				}
				if (theme.includes("done")) {
					icon = "check-circle";
				}
				if (theme.includes("warn")) {
					icon = "warning";
				}
				if (theme.includes("alert")) {
					icon = "error";
				}
				// check if custom icon is declared
				if (this.icon) {
					icon = this.icon;
				}

				return html`
					<div
						class="icon"
						part="icon"
					>
						<panda-icon .icon="${icon}"></panda-icon>
					</div>
				`;
			}
		}
	}
	
	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onClose(): void {
		const event = new CustomEvent("on-close", {});
		this.dispatchEvent(event);
	}

	private _onHeaderSlotChange(): void {
		console.log("%c ⚡ [PANDA NOTIFICATION] _onHeaderSlotChange()", "font-size: 24px; color: orange;");
		this._hasHeader = this._headerNodes.length > 0;
	}

	private _onFooterSlotChange(): void {
		this._hasFooter = this._footerNodes.length > 0;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-notification": PandaNotification;
	}
}
