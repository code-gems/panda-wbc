export type PandaButtonGroupItem = {
	label: string;
	value: any;

	selected?: boolean;
	disabled?: boolean;
	working?: boolean;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export type PandaButtonGroupChangeEventDetails = {
	selectedValues: any[];
}

export interface PandaButtonGroupChangeEvent extends CustomEvent<PandaButtonGroupChangeEventDetails> {}