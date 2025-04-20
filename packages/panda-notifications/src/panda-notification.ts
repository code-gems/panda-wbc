// types
// ...

// styles
import { notificationStyles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, queryAssignedElements, state } from "lit/decorators.js";
import { DEFAULT_AUTO_CLOSE_INTERVAL } from "./constants";

@customElement("panda-notification")
export class PandaNotification extends LitElement {
	// css styles
	static get styles() {
		return notificationStyles;
	}

	@property({ type: String, reflect: true })
	theme!: string;

	@property({ type: String, reflect: true })
	icon!: string;

	@property({ type: Boolean, attribute: "hide-icon", reflect: true })
	hideIcon: boolean = false;

	@property({ type: Boolean, reflect: true })
	closable: boolean = false;

	@property({ type: Boolean, attribute: "auto-close", reflect: true })
	autoClose: boolean = false;
	
	@property({ type: Number, attribute: "auto-close-interval", reflect: true })
	autoCloseInterval!: number;

	@property({ type: String })
	customStyle!: string;
	
	@queryAssignedElements({ slot: "header", flatten: false })
	private readonly _headerNodes!: HTMLElement[];

	@state()
	private _hasHeader: boolean = false;

	@queryAssignedElements({ slot: "footer", flatten: false })
	private readonly _footerNodes!: HTMLElement[];

	@state()
	private _hasFooter: boolean = false;
	
	@state()
	private _closing: boolean = false;
	
	@state()
	private _containerHeight: number | null = null;

	// timers
	private _autoCloseTimer: number | null = null;
	private _closeAnimationTimer: number | null = null;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		if (this.autoClose) {
			// validate autoCloseInterval to be at least 1 second
			let autoCloseInterval = (this.autoCloseInterval ?? DEFAULT_AUTO_CLOSE_INTERVAL) <= 1000
				? 1400
				: Number(this.autoCloseInterval) + 400; // add 400ms for the show animation
			// check if provided autoCloseInterval is a number
			if (isNaN(autoCloseInterval)) {
				autoCloseInterval = 3400;
				console.warn("%c [PANDA NOTIFICATION] autoCloseInterval must be at least 1000ms", "font-size: 16px;");
			}
			// create auto close timer
			this._autoCloseTimer = setTimeout(() => {
				// auto close notification
				this._onClose();
			}, autoCloseInterval);
		}
		console.log("%c [PANDA NOTIFICATION] firstUpdated()", "font-size: 16px; color: red;", this.getBoundingClientRect());
		const notificationDOMRect = this.getBoundingClientRect();
		this._containerHeight = notificationDOMRect.height - 10;
	}

	updated(_changedProps: PropertyValues): void {
		// check if custom style is defined
		if (_changedProps.has("customStyle") && this.customStyle !== undefined) {
			this._applyCustomStyle();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove timers
		if (this._autoCloseTimer) {
			clearTimeout(this._autoCloseTimer);
			this._autoCloseTimer = null;
		}
		if (this._closeAnimationTimer) {
			clearTimeout(this._closeAnimationTimer);
			this._closeAnimationTimer = null;
		}
	}

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
				class="notification-cont ${this._closing ? "closing" : ""}"
				part="notification-cont  ${cssMods.join(" ")} ${this._closing ? "closing" : ""}"
			>
				<div class="notification-wrap" part="notification-wrap ${cssMods.join(" ")}">

					<div
						class="notification ${cssMods.join(" ")}"
						part="notification ${cssMods.join(" ")}"
					>
						<div
							class="body"
							part="body ${cssMods.join(" ")}"
						>
							<!-- icon -->
							${this._renderIcon()}

							<div class="message" part="message">
								<div class="header">
									<slot class="header-prefix" name="header-prefix"></slot>
									<slot class="header-text" name="header" @slotchange="${this._onHeaderSlotChange}"></slot>
								</div>
								<!-- message slot -->
								<slot></slot>
							</div>

							<!-- close button -->
							${this._renderCloseButton()}
						</div>
						<div class="footer" part="footer">
							<slot name="footer" @slotchange="${this._onFooterSlotChange}"></slot>					
						</div>
					</div><!-- notification -->
				
				</div><!-- notification-wrap -->
			</div><!-- notification-cont -->
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
				<div class="icon" part="icon">
					<panda-icon .icon="${icon}"></panda-icon>
				</div>
			`;
		}
	}
	
	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================
	
	/** Apply user defined custom style to overlay container */
	private _applyCustomStyle(): void {
		if (this.customStyle) {
			const customStyle = document.createElement("style");
			customStyle.innerHTML = this.customStyle;
			customStyle.setAttribute("scope", "custom-style");
			this.appendChild(customStyle);
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _triggerCloseEvent(): void {
		const event = new CustomEvent("on-close", {});
		this.dispatchEvent(event);
	}

	private _onClose(): void {
		// trigger close event after closing animation
		this._closing = true;
		this._closeAnimationTimer = setTimeout(() => {
			this._triggerCloseEvent();
		}, 400);
	}

	private _onHeaderSlotChange(): void {
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
