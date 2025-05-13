export const enum PopoverPosition {
	TOP = "top",
	BOTTOM = "bottom",
	LEFT = "left",
	RIGHT = "right",
	CENTER = "center",
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export interface PandaVisibilityChangeEventDetails {
	visible: boolean;
}

export interface PandaVisibilityChangeEvent extends CustomEvent<PandaVisibilityChangeEventDetails> {}