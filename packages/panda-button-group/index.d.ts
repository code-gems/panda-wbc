export type PandaButtonGroupItem = {
	label: string;
	value: any;

	selected?: boolean;
	disabled?: boolean;
	working?: boolean;
	prefixIcon?: string;
	suffixIcon?: string;
	prefixBadge?: string;
	suffixBadge?: string;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export type PandaButtonGroupChangeEventDetails = {
	selectedValues: any[];
}

export interface PandaButtonGroupChangeEvent extends CustomEvent<PandaButtonGroupChangeEventDetails> {}