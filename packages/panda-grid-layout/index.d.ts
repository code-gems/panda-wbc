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

export type PandaGridPanelMetadata = {
	width: number;
	minWidth?: number;
	maxinWidth?: number;
	
	height: number;
	minHeight?: number;
	maxHeight?: number;

	top?: number;
	left?: number;

	resizable?: boolean;
	movable?: boolean;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export type PandaGridLayoutChangeEventDetail = {
	panelList: PanelMetadata[];
}

export interface PandaGridLayoutChangeEvent extends CustomEvent<PandaGridLayoutChangeEventDetail> {}