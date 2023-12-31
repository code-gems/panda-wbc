// types
import { PandaNotification } from "../index";

// styles
import { styles } from "./styles/styles";

// components
import "./panda-notification";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { pandaNotificationCenter } from "./panda-notification-center";
import { generateUuid } from "@panda-wbc/panda-core";

@customElement("panda-notifications")
export class PandaNotifications extends LitElement {
	static get styles() {
		return styles;
	}

	@property({ type: String, attribute: true })
	scope: string[] = [];

	@property({ type: Array })
	notificationList: PandaNotification[] = [];

	@property({ type: Number, attribute: "max-notifications" })
	maxNotifications: number | null = null;

	@property({ type: Number, attribute: "notification-delay" })
	notificationDelay: number = 1000;

	// state props
	@state()
	private _subscriptionId!: string;

	@state()
	private _scheduleTimer!: number | null;
	
	@state()
	private _notificationsToShow: PandaNotification[] = [];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		// subscribe to notification center
		this._subscriptionId = pandaNotificationCenter.subscribe({
			scope: this.scope,
			callback: this.notify.bind(this)
		});
		console.log("%c ⚡ [PANDA NOTIFICATIONS] connectedCallback() -> subscribe", "font-size: 24px; color: blueviolet;", this._subscriptionId);
	}

	disconnectedCallback(): void {
		console.log("%c ⚡ [PANDA NOTIFICATIONS] disconnectedCallback()", "font-size: 24px; color: blueviolet;");
		super.disconnectedCallback();
		// unsubscribe from notification center
		pandaNotificationCenter.unsubscribe(this._subscriptionId);
		// clean up
		if (this._scheduleTimer) {
			clearInterval(this._scheduleTimer);
		}
	}

	/** Callback for new notifications */
	notify(notification: PandaNotification) {
		console.log("%c ⚡ [PANDA NOTIFICATIONS] notify()", "font-size: 24px; color: blueviolet;", notification);
		// add notification to the list
		this.notificationList.push({
			id: generateUuid(),
			...notification
		});
		this._showNotifications();
		console.log("%c ⚡ [PANDA NOTIFICATIONS] notificationList: ", "font-size: 24px; color: blueviolet;", this.notificationList);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		return html`
			<slot></slot>
			<div class="notifications-cont">
				<div class="notifications">
					${this._renderNotifications()}
				</div>
			</div>
		`;
	}

	private _renderNotifications() {
		return repeat(
			this._notificationsToShow,
			(notification) => notification.id,
			(notification) => {
				const {
					id,
					theme,
					header = null,
					body,
					footer = null,
				} = notification;

				let footerHtml: TemplateResult = html``;
				if (footer) {
					footerHtml = html`
						<div slot="footer">
							${footer}
						</div>
					`;
				}

				return html`
					<panda-notification
						.theme="${theme}"
						@on-close="${() => this._onCloseNotification(id as string)}"
						closable
					>
						${body}
						${footerHtml}
					</panda-notification>
				`;
			}
		);
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _showNotifications() {
		console.log("%c 📃 [PANDA NOTIFICATION] _showNotifications", "font-size: 24px; color: blueviolet;", !this._scheduleTimer);

		// create notification schedule
		if (!this._scheduleTimer) {
			this._scheduleTimer = setInterval(() => {

				if (this.notificationList.length) {

					const maxNotifications = this.maxNotifications ?? 2;
					if (this._notificationsToShow.length < maxNotifications) {
						const [notification] = this.notificationList;

						console.log("%c 📃 [PANDA NOTIFICATION] show notification", "font-size: 24px; color: blueviolet;", notification.body);

						// show notification
						this._notificationsToShow.unshift(notification);
						this.requestUpdate();
						// remove notification;
						this.notificationList.shift();
					}

					// cancel schedule if no more notifications
					if (!this.notificationList.length) {
						clearInterval(this._scheduleTimer as number);
						this._scheduleTimer = null;
						console.log("%c 📃 [PANDA NOTIFICATION] clearTimeout", "font-size: 24px; color: blueviolet;", this._scheduleTimer, typeof this._scheduleTimer);
					}
				}
			}, this.notificationDelay ?? 1000);
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _onCloseNotification(notificationId: string): void {
		// remove notification from the list
		this._notificationsToShow = this._notificationsToShow.filter((notification) => notification.id !== notificationId);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-notifications": PandaNotifications;
	}
}