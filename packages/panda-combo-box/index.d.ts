export const enum PostMessageAction {
	CLOSE_AND_UPDATE = "CLOSE_AND_UPDATE",
	CLOSE_AND_CANCEL = "CLOSE_AND_CANCEL",
	CHANGE = "CHANGE",
	UPDATE_INPUT = "UPDATE_INPUT",
}

export type ElementDetails = {
	width: number;
	height: number;
	top: number;
	left: number;
	bottom: number;
	right: number;
}

export interface PandaComboBoxItem {
	label?: string;
	value?: string | number | any;

	group?: string;
	[propertyName: string]: string | number | any;
}

export interface SuperComboBoxItem {
	index: number;
	value: any;
	label: string;
	active: boolean;
	selected: boolean;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export type PandaComboBoxChangeEventDetails = {
	value: string | number | null | any;
}

export type PostMessageEventDetails = {
	action: PostMessageAction;
	value: string | number | null | any;
	searchText: string | null;
}

export interface PostMessageEvent extends CustomEvent<PostMessageEventDetails> {}

export interface PandaComboBoxChangeEvent extends CustomEvent<PandaComboBoxChangeEventDetails> {}
