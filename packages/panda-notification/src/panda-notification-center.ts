// types
import { PandaNotification, PandaSubscription } from "../index";

const notificationList: PandaNotification[] = [];
const subscriptionList: Map<string, PandaSubscription> = new Map();

export class PandaNotificationCenter {
	static instance: any;

	constructor() {
		if (!PandaNotificationCenter.instance) {
			PandaNotificationCenter.instance = this;
		}
		return PandaNotificationCenter.instance;
	}

	private _scheduleTimer!: number | null;

	private _showNotifications() {
		console.log("%c 🐷 [PANDA NOTIFICATION] _showNotifications", "font-size: 24px; color: green;", !this._scheduleTimer);

		// create notification schedule
		if (!this._scheduleTimer) {
			this._scheduleTimer = setInterval(() => {
				
				if (notificationList.length) {
					const [notification, ...notifications] = notificationList;

					// create notification element
					console.log("%c 🐷 [PANDA NOTIFICATION] notification", "font-size: 24px; color: red;", notification.body);

					// remove first notification;
					notificationList.pop();

					// cancel schedule if no more notifications
					if (!notifications.length) {
						clearInterval(this._scheduleTimer as number);
						this._scheduleTimer = null;
						console.log("%c 🐷 [PANDA NOTIFICATION] clearTimeout", "font-size: 24px; color: orange;", this._scheduleTimer, typeof this._scheduleTimer);
					}
				}
			}, 1000);
		}
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public subscribe(subscription: PandaSubscription) {
		console.log("%c ⚡ [PANDA NOTIFICATION CENTER] subscribe()", "font-size: 24px; color: red;", subscription);
		
		
		subscriptionList.set(, subscription);

	}

	public

	public addNotification(notification: PandaNotification) {
		// add notification to the queue
		notificationList.push(notification);
		// show notification
		this._showNotifications();
	}

	public getNotificationList(): PandaNotification[] {
		return notificationList;
	}

}
export const pandaNotificationCenter = new PandaNotificationCenter();
