export const enum MessageType {
	CLOSE = "CLOSE",
	DESELECT = "DESELECT",
	RESET = "RESET",
	SELECT_ALL = "SELECT_ALL",
	UPDATE = "UPDATE",
	UPDATE_AND_CLOSE = "UPDATE_AND_CLOSE",
}

export const enum DropdownPosition {
	TOP = "top",
	BOTTOM = "bottom",
}

export type ElementDetails = {
	width: number;
	height: number;
	top: number;
	left: number;
	bottom: number;
	right: number;
}

/** Superset type for items */
export type SuperItem = {
	index: number;
	group: string;
	label: string;
	value: any;
	selected: boolean;
	disabled: boolean;
	active: boolean;
} 

export type PostMessageEventDetails = {
	messageType: MessageType;
	items: SuperItem[];
}

export interface PostMessageEvent extends CustomEvent<PostMessageEventDetails> { }
