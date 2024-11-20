export interface PandaComboBoxItem {
	label?: string;
	value?: string | number | any;

	group?: string;
	[propertyName: string]: string | number | any;
}

export type PandaComboBoxRenderer = {
	value: any;
	label: string;
	active: boolean;
	selected: boolean;
	data: any;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export type PandaComboBoxChangeEventDetails = {
	value: string | number | null | any;
}

export interface PandaComboBoxChangeEvent extends CustomEvent<PandaComboBoxChangeEventDetails> { }
