
// [IMPORTANT] these types are for internal usage only. do not import them!
declare module "panda-grid-layout-types" {
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
		protrudes: boolean;
	}

	export type MousePosition = {
		x: number;
		y: number;
	}

	export type PanelInventory = {
		missingPanels: any[];
		newPanels: any[];
	}

	// ====================================================================================================================
	// EVENTS =============================================================================================================
	// ====================================================================================================================

	export const enum PanelMessageType {
		DRAG_INIT, // used to notify grid about position change initialization
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
}
