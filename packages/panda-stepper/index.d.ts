export type PandaStep = {
	title: string;
	// extra props
	icon?: string; // optional icon property
	description?: string; // optional description property
	tooltip?: string; // optional tooltip property
	// state props
	done?: boolean; // optional done property
	disabled?: boolean; // optional disabled property
	working?: boolean; // optional working property
	// sub-steps
	steps?: PandaStep[]; // steps property to hold sub-steps
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================
