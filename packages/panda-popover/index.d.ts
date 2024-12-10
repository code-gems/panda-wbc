export const enum PopoverPosition {
	TOP = "top",
	BOTTOM = "bottom",
	LEFT = "left",
	RIGHT = "right",
	TOP_LEFT = "top-left",
	TOP_RIGHT = "top-right",
	BOTTOM_LEFT = "bottom-left",
	BOTTOM_RIGHT = "bottom-right",
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export interface PandaVisibilityChangeEventDetails {
	visible: boolean;
}

export interface PandaVisibilityChangeEvent extends CustomEvent<PandaVisibilityChangeEventDetails> {}