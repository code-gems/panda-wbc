export const enum PandaSearchIconPosition {
	LEFT = "left",
	RIGHT = "right",
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
