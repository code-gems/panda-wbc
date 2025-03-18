import { TemplateResults } from "lit";

export const enum PandaNotificationsPosition {
	TOP_LEFT = "top-left",
	TOP_CENTER = "top-center",
	TOP_RIGHT = "top-right",
	BOTTOM_LEFT = "bottom-left",
	BOTTOM_CENTER = "bottom-center",
	BOTTOM_RIGHT = "bottom-right",
}

export interface PandaNotification {
	id?: string;
	scope?: string[];
	icon?: string;
	hideIcon?: boolean;
	theme?: string;
	header?: TemplateResults | any;
	headerPrefix?: TemplateResults | any;
	body: TemplateResults | any;
	footer?: TemplateResults | any;
	autoClose?: boolean;
	autoCloseInterval?: number;
	customStyle?: string;
}

export interface PandaSubscription {
	onNotify: (notification: PandaNotification) => void;
	onClose: (notificationId: string) => void;
	scope?: string[];
}

export type PandaNotificationsI18nConfig = {
	dismissAll: string;
}