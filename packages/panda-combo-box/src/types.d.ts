/** These types are for internal use only! */
declare module "panda-combo-box-types" {
	export const enum PostMessageType {
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

	export interface SuperComboBoxItem {
		index: number;
		value: any;
		label: string;
		active: boolean;
		selected: boolean;
		data: any; /* original item object */
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	export type PostMessageEventDetails = {
		action: PostMessageType;
		value: string | number | null | any;
		searchText: string | null;
	}

	export interface PostMessageEvent extends CustomEvent<PostMessageEventDetails> { }
}