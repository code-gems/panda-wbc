export type PandaChip = {
	label: boolean;
	value: any;
	// optional
	icon?: string;
	checked?: boolean;
	removable?: boolean;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

type PandaCheckboxChange = {
	name: string;
	checked: boolean;
}

export interface PandaCheckboxChangeEvent extends CustomEvent<PandaCheckboxChange> {}
