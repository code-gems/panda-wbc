/** These types are for internal use only! */
declare module "panda-search-types" {
	export const enum PostMessageType {
		CLOSE = "CLOSE",
		SELECT = "SELECT",
	}

	export type ElementDetails = {
		width: number;
		height: number;
		top: number;
		left: number;
		bottom: number;
		right: number;
	}

	export interface SearchItem {
		index: number;
		value: any;
		label: string;
		active: boolean;
		payload: any; /* it could be used to store original item object for further processing */
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	export type PostMessageEventDetails = {
		action: PostMessageType;
		selectedItem: PandaSearchItem | null;
	}

	export interface PostMessageEvent extends CustomEvent<PostMessageEventDetails> { }
}