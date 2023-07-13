export type PandaComboBoxChange = {
	value: string | number | any;
}

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

export interface PandaComboBoxChangeEvent {
	detail: PandaComboBoxChange;
}
