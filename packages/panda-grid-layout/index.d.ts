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
	/**
	 * In case we need to identify specific panel by id,
	 * this property will be returned with each grid layout change for every panel
	 * [OPTIONAL]
	 */
	panelId?: string;

	width: number;
	minWidth?: number;
	maxWidth?: number;
	height: number;
	minHeight?: number;
	maxHeight?: number;

	top?: number;
	left?: number;

	resizable?: boolean;
	movable?: boolean;
}

export type PandaGridPanelDetails = {
	panelId?: string;
	top: number;
	left: number;
	width: number;
	height: number;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export type PandaGridLayoutChangeEventDetail = {
	panelList: PandaGridPanelDetails[];
}

export interface PandaGridLayoutChangeEvent extends CustomEvent<PandaGridLayoutChangeEventDetail> {}