export const enum PandaSearchIconPosition {
	LEFT = "left",
	RIGHT = "right",
}

export const enum PostMessageAction {
	CLOSE = "CLOSE",
	CLOSE_AND_CANCEL = "CLOSE_AND_CANCEL",
	CHANGE = "CHANGE",
}

export type ElementDetails = {
	width: number;
	height: number;
	top: number;
	left: number;
	bottom: number;
	right: number;
}

export type PandaSearchOnInputEventDetails = {
	value: string;
}

export type PandaSearchItem = {
	label: string;
	value: string;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export interface PandaSearchOnInputEvent extends CustomEvent<PandaSearchOnInputEventDetails> {}
