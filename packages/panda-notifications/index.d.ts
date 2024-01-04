import { TemplateResults } from "lit";

export interface PandaNotification {
	id?: string;
	scope?: string[];
	hideIcon?: boolean;
	theme?: string;
	header?: TemplateResults | any;
	headerPrefix?: TemplateResults | any;
	body: TemplateResults | any;
	footer?: TemplateResults | any;
	autoClose?: boolean;
	autoCloseInterval?: number;
}

export interface PandaSubscription {
	onNotify: (notification: PandaNotification) => void;
	onClose: (notificationId: string) => void;
	scope?: string[];
}
