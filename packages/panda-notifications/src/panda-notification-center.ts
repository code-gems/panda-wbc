// types
import { PandaNotification, PandaNotificationsSubscription } from "../index";

// utils
import { generateUuid } from "@panda-wbc/panda-utils";

const subscriptionList: Map<string, PandaNotificationsSubscription> = new Map();

export class PandaNotificationCenter {
	static instance: any;

	constructor() {
		if (!PandaNotificationCenter.instance) {
			PandaNotificationCenter.instance = this;
		}
		return PandaNotificationCenter.instance;
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public subscribe(subscription: PandaNotificationsSubscription): string {
		const subscriptionId = generateUuid();
		subscriptionList.set(
			subscriptionId,
			{
				scope: [],
				...subscription,
			}
		);
		return subscriptionId;
	}

	public unsubscribe(subscriptionId: string): void {
		subscriptionList.delete(subscriptionId);
	}

	public createNotification(notification: PandaNotification): string {
		// generate notification id if not provided
		const notificationId = notification.id ?? generateUuid();
		// notify subscribers
		subscriptionList.forEach((subscription) => {
			// invoke callback function
			if (subscription.onNotify && typeof subscription.onNotify === "function") {
				subscription.onNotify({
					id: notificationId,
					...notification
				});
			}
		});
		// return notification id
		return notificationId;
	}

	public closeNotification(notificationId: string): void {
		// notify subscribers
		subscriptionList.forEach((subscription) => {
			// invoke callback function
			if (subscription.onClose && typeof subscription.onClose === "function") {
				subscription.onClose(notificationId);
			}
		});
	}
}
export const pandaNotificationCenter = new PandaNotificationCenter();
