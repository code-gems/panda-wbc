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

const DEFAULT_MAX_NOTIFICATIONS: number = 100;
const DEFAULT_NOTIFICATION_DELAY_TIME: number = 400; // [ms]
const DEFAULT_AUTO_CLOSE_INTERVAL: number = 3000; // [ms]

@customElement("panda-notifications")
export class PandaNotifications extends LitElement {
	static get styles() {
		return styles;
	}

	@property({ type: String, attribute: true })
	scope: string[] = [];

	@property({ type: Number, attribute: "max-notifications" })
	maxNotifications: number | null = null;

	@property({ type: Number, attribute: "notification-delay" })
	notificationDelay: number = DEFAULT_NOTIFICATION_DELAY_TIME;

	@property({ type: Boolean, attribute: "local-container" })
	localContainer: boolean = false;

	@property({ type: Boolean, attribute: "auto-close" })
	autoClose: boolean = false;
	
	@property({ type: Number, attribute: "auto-close-interval" })
	autoCloseInterval: number = DEFAULT_AUTO_CLOSE_INTERVAL;

	// state props
	@state()
	private _subscriptionId!: string;

	@state()
	private _scheduleTimer!: number | null;

	@state()
	private _notificationQueue: PandaNotification[] = [];
	
	@state()
	private _activeNotifications: PandaNotification[] = [];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		// subscribe to notification center
		this._subscriptionId = pandaNotificationCenter.subscribe({
			scope: this.scope,
			onNotify: this.notify.bind(this),
			onClose: this.close.bind(this),
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// unsubscribe from notification center
		pandaNotificationCenter.unsubscribe(this._subscriptionId);
		// clean up
		if (this._scheduleTimer) {
			clearInterval(this._scheduleTimer);
		}
	}

	/** Callback for new notifications */
	notify(notification: PandaNotification): void {
		// check if notification is scoped
		// case 1: notification is scoped but notification board has no scope defined
		// case 2: notification has no scope but notification board has scope
		if (
			notification?.scope?.length && !this.scope?.length || 
			!notification?.scope?.length && this.scope?.length
		) {
			return;
		}
		// case 3: notification and notification board have scope provided
		if (notification?.scope?.length && this.scope?.length) {
			let inScope: boolean = false;
			this.scope.forEach((scope) => {
				if (notification?.scope?.includes(scope)) {
					inScope = true;
				}
			});

			if (!inScope) {
				return;
			}
		}
		
		// check if notification id exists on both lists
		const isQueued = this._notificationQueue.find((note) => note.id === notification.id);
		const isActive = this._activeNotifications.find((note) => note.id === notification.id);
		
		// check if notification is active/shown
		if (isActive) {
			// update active/shown notifications
			this._activeNotifications = this._activeNotifications.reduce(
				// update existing notification
				(allNotes, currentNote) => {
					if (currentNote.id === notification.id) {
						allNotes.push(notification);
					} else {
						allNotes.push(currentNote);
					}
					return allNotes;
				}, [] as PandaNotification[]
			);
			// re-render the view
			this.requestUpdate();

		} else if (isQueued) {
			// update notification queue
			this._notificationQueue = this._notificationQueue.reduce(
				// update existing notification
				(allNotes, currentNote) => {
					if (currentNote.id === notification.id) {
						allNotes.push(notification);
					} else {
						allNotes.push(currentNote);
					}
					return allNotes;
				}, [] as PandaNotification[]
			);
			
		} else {
			// add notification to the queue
			this._notificationQueue.push(notification);
			// display notification
			this._showNotifications();
		}
	}

	close(notificationId: string): void {
		// remove notification from the queue
		this._notificationQueue = this._notificationQueue.filter((note) => note.id !== notificationId);
		// remove notification from the queue
		this._activeNotifications = this._activeNotifications.filter((note) => note.id !== notificationId);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		return html`
			<slot></slot>
			<div class="notifications-cont ${this.localContainer ? "local": ""}">
				<div class="notifications">
					${this._renderNotifications()}
				</div>
			</div>
		`;
	}

	private _renderNotifications() {
		return repeat(
			this._activeNotifications,
			(notification) => notification.id,
			(notification) => {
				const {
					id,
					theme,
					hideIcon = false,
					header = null,
					headerPrefix = null,
					body,
					footer = null,
					autoClose = false,
					autoCloseInterval = DEFAULT_AUTO_CLOSE_INTERVAL,
				} = notification;
				// generate header slot
				let headerPrefixHtml: TemplateResult = html``;
				if (headerPrefix) {
					headerPrefixHtml = html`<div slot="header-prefix">${headerPrefix}</div>`;
				}
				// generate header slot
				let headerHtml: TemplateResult = html``;
				if (header) {
					headerHtml = html`<div slot="header">${header}</div>`;
				}
				// generate footer slot
				let footerHtml: TemplateResult = html``;
				if (footer) {
					footerHtml = html`<div slot="footer">${footer}</div>`;
				}

				return html`
					<panda-notification
						.theme="${theme}"
						.hideIcon="${hideIcon}"
						.autoClose="${autoClose}"
						.autoCloseInterval="${autoCloseInterval}"
						@on-close="${() => this._onCloseNotification(id as string)}"
						closable
					>
						${headerPrefixHtml}
						${headerHtml}
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

	private _showNotifications(): void {
		// create notification schedule
		if (!this._scheduleTimer) {
			this._scheduleTimer = setInterval(() => {
				if (this._notificationQueue.length) {
					const maxNotifications = this.maxNotifications ?? DEFAULT_MAX_NOTIFICATIONS;

					if (this._activeNotifications.length < maxNotifications) {
						const [notification] = this._notificationQueue;
						// show notification
						this._activeNotifications.unshift(notification);
						this.requestUpdate();
						// remove notification;
						this._notificationQueue.shift();
					}

				} else {
					// cancel schedule if no more notifications
					clearInterval(this._scheduleTimer as number);
					this._scheduleTimer = null;
				}
			}, this.notificationDelay ?? DEFAULT_NOTIFICATION_DELAY_TIME);
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _onCloseNotification(notificationId: string): void {
		// remove notification from the queue
		this._activeNotifications = this._activeNotifications.filter((notification) => notification.id !== notificationId);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-notifications": PandaNotifications;
	}
}