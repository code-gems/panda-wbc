import { TemplateResults } from "lit";

export interface PandaNotification {
	id?: string;
	scope?: string[];

	theme?: string;
	header?: TemplateResults | any;
	body: TemplateResults | any;
	footer?: TemplateResults | any;
}

export interface PandaSubscription {
	callback: (notification: PandaNotification) => void;
	scope?: string[];
}
