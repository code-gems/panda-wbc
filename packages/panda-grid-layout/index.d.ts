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
	 * DEFAULT: false
	 */
	responsive?: boolean;

	// Panel compaction setup
	compactTop?: boolean;
	compactLeft?: boolean;
}