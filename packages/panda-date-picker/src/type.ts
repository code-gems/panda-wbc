export type DateValue = string | number | null;

export type ElementDetails = {
	width: number;
	height: number;
	top: number;
	left: number;
	bottom: number;
	right: number;
}

export const enum PostMessageEventType {
	Select = "SELECT",
	SelectToday = "SELECT_TODAY",
	Close = "CLOSE",
}

export type PostMessageEventDetail = {
	type: PostMessageEventType;
	value: string;
}

export interface PostMessageEvent extends CustomEvent<PostMessageEventDetail> {}