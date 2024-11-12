export interface GridConfig {
	/**
	 * Min value for the panel size [px]. 
	 * It will be used to calculate column size 
	 * dynamically in case of responsive layout.
	 * 
	 * DEFAULT: 300 [px]
	 */
	panelSize: number;

	/**
	 * When layout is set to responsive, panel size
	 * will be dynamically calculated based on available space.
	 * It will be not less than the panelSize value.
	 * 
	 * [IMPORTANT] If you enable this feature through an attribute, attribute will take precedence over config setting.
	 * 
	 * DEFAULT: false
	 */
	responsive?: boolean;

	// Panel compaction setup
	compactTop?: boolean;
	compactLeft?: boolean;
}

/** Grid metadata shared with all panels for their use */
export type GridMetadata = {
	columnWidth: number;
	maxColumns: number;
}

export type PanelMetadata = {
	panelId?: string;
	width: number;
	height: number;
	top: number;
	tempTop: number | null;
	left: number;
	tempLeft: number | null;
	right: number;
	bottom: number;
	index: number;
}

export type MousePosition = {
	x: number;
	y: number;
}

export type DragInfo = {
	dragStart: number;
	distance: number;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export const enum PanelMessageType {
	DRAG_INIT, // used to notify grid about ongoing panel position change
	DRAG_START, // used to notify grid about ongoing panel position change
	DRAG_END, // used to notify grid about final position change
	DRAG_END_NO_CHANGE, // used to notify grid about drag end with no change in position
	RESIZE_START,
	RESIZE_END,
	SIZE_CHANGE, // used to notify panel size change from outside of the grid (programmatically) 
}

export type PandaGridLayoutPanelMessageEventDetail = {
	type: PanelMessageType,
	width: number | null;
	height: number | null;
	top: number | null;
	left: number | null;
	index: number | null;
}

export interface PandaGridLayoutPanelMessageEvent extends CustomEvent<PandaGridLayoutPanelMessageEventDetail> {}

export type PandaGridLayoutChangeEventDetail = {
	panelList: PanelMetadata[];
}

export interface PandaGridLayoutChangeEvent extends CustomEvent<PandaGridLayoutChangeEventDetail> {}