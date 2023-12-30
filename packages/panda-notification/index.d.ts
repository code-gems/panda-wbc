import { TemplateResults } from "lit";

export interface PandaNotification {
	header?: TemplateResults | any;
	body: TemplateResults | any;
	footer?: TemplateResults | any;
	
}

export interface PandaSubscription {
	callback: (notification: PandaNotification) => void;
	scope?: string;
}