export const enum PanelMessageType {
	DRAG_START,
	DRAG_END,
	RESIZE_START,
	RESIZE_END,
}

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
	 * This property is used to regulate panel dragging sensitivity.
	 * It's the distance that panel needs to be dragged to initiate position change.
	 *  
	 * DEFAULT: 50 [px]
	 */
	dragDistance?: number;

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
	dragDistance: number;
}

export type PanelMetadata = {
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
