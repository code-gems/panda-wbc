
export type ElementDetails = {
	width: number;
	height: number;
	top: number;
	left: number;
	bottom: number;
	right: number;
}

export interface PandaComboBoxItem {
	label?: string;
	value?: string | number | any;

	group?: string;
	[propertyName: string]: string | number | any;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export type PandaComboBoxChangeEventDetails = {
	value: string | number | any;
}

export interface PandaComboBoxChangeEvent extends CustomEvent<PandaComboBoxChange> {}
