export const enum PandaSearchIconPosition {
	LEFT = "left",
	RIGHT = "right",
}

export type PandaSearchItem = {
	label: string;
	value: string;
	payload?: any; /* can be used to store more data for custom rendering */
}

export type PandaSearchRendererParams = {
	value: any;
	label: string;
	active: boolean;
	payload?: any;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

type PandaSearchOnInputEventDetails = {
	value: string;
}

type PandaSearchOnSelectEventDetails = {
	selectedItem: PandaSearchItem;
}

export interface PandaSearchOnInputEvent extends CustomEvent<PandaSearchOnInputEventDetails> {}

export interface PandaSearchOnSelectEvent extends CustomEvent<PandaSearchOnSelectEventDetails> {}
