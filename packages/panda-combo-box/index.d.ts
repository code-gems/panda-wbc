export interface PandaComboBoxItem {
	label?: string;
	value?: string | number | any;
	disabled?: boolean;

	group?: string;
	[propertyName: string]: string | number | any;
}

export type PandaComboBoxRenderer = {
	value: any;
	label: string;
	active: boolean;
	selected: boolean;
	disabled: boolean;
	data: any;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export type PandaComboBoxChangeEventDetails = {
	value: string | number | null | any;
	data?: any;
}

export interface PandaComboBoxChangeEvent extends CustomEvent<PandaComboBoxChangeEventDetails> { }
