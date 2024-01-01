// types
import { PandaNotification, PandaSubscription } from "../index";

// utils
import { generateUuid } from "@panda-wbc/panda-core";

const subscriptionList: Map<string, PandaSubscription> = new Map();

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

	public subscribe(subscription: PandaSubscription): string {
		const subscriptionId = generateUuid();
		subscriptionList.set(
			subscriptionId,
			{
				scope: [],
				...subscription,
			}
		);
		console.log("%c ⚡ [PANDA NOTIFICATION CENTER] 1. subscribe()", "font-size: 24px; color: red;", subscription);
		console.log("%c 2. subscriptionId:", "font-size: 24px; color: red;", subscriptionId);
		return subscriptionId;
	}

	public unsubscribe(subscriptionId: string): void {
		console.log("%c ⚡ [PANDA NOTIFICATION CENTER] unsubscribe()", "font-size: 24px; color: red;", subscriptionId);
		subscriptionList.delete(subscriptionId);
	}

	public addNotification(notification: PandaNotification): string {
		// generate notification id if not provided
		const notificationId = notification.id ?? generateUuid();
		console.log("%c ⚡ [PANDA NOTIFICATION CENTER] 1. notificationId", "font-size: 24px; color: red;", notificationId);
		console.log("%c ⚡ [PANDA NOTIFICATION CENTER] 2. addNotification()", "font-size: 24px; color: red;", notification);
		
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
		console.log("%c ⚡ [PANDA NOTIFICATION CENTER] closeNotification()", "font-size: 24px; color: red;", notificationId);
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
