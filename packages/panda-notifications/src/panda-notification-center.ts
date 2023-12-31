// types
import { PandaNotification, PandaSubscription } from "../index";

// utils
import { generateUuid } from "@panda-wbc/panda-core";

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

	private _notify(notification: PandaNotification): void {
		console.log("%c ⚡ [PANDA NOTIFICATION CENTER] _notify()", "font-size: 24px; color: red;", notification);
		
		subscriptionList.forEach((subscription) => {

			if (subscription.callback && typeof subscription.callback === "function") {
				subscription.callback(notification);
			} 
		});
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
		console.log("%c ⚡ [PANDA NOTIFICATION CENTER] subscribe()", "font-size: 24px; color: red;", subscription);
		console.log("%c subscriptionId:", "font-size: 24px; color: red;", subscriptionId);
		return subscriptionId;
	}

	public unsubscribe(subscriptionId: string): void {
		console.log("%c ⚡ [PANDA NOTIFICATION CENTER] unsubscribe()", "font-size: 24px; color: red;", subscriptionId);
		subscriptionList.delete(subscriptionId);
	}

	public addNotification(notification: PandaNotification): void {
		// add notification to the queue
		notificationList.push(notification);
		console.log("%c ⚡ [PANDA NOTIFICATION CENTER] addNotification()", "font-size: 24px; color: red;", notification);

		// notify subscribers
		this._notify(notification);
	}

	public removeNotification(notificationId: string): void {
		console.log("%c ⚡ [PANDA NOTIFICATION CENTER] removeNotification()", "font-size: 24px; color: red;", notificationId);
	}

	public getNotificationList(): PandaNotification[] {
		return notificationList;
	}

}
export const pandaNotificationCenter = new PandaNotificationCenter();
