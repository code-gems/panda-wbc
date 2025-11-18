export const enum PostMessageType {
	CLOSE = "CLOSE",
	SELECT = "SELECT",
	DESELECT = "DESELECT",
}

export type ElementDetails = {
	width: number;
	height: number;
	top: number;
	left: number;
	bottom: number;
	right: number;
}

export type SuperItem = {
	label: string;
	value: any;
	selected: boolean;
	disabled: boolean;
	active: boolean;
} 

export type PostMessageEventDetails = {
	action: PostMessageType;
	value: any;
}

export interface PostMessageEvent extends CustomEvent<PostMessageEventDetails> { }
