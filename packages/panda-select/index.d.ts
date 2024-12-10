export interface PandaSelectItem {
	label?: string;
	value?: string | number | any;
	disabled?: boolean;

	group?: string;
	[propertyName: string]: string | number | any;
}

export type PandaSelectRenderer = {
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

export type PandaSelectChangeEventDetail = {
	value: string | number | any;
}

export interface PandaSelectChangeEvent extends CustomEvent<PandaSelectChangeEventDetail> {}