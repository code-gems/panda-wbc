export type PandaSelectChange = {
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

export interface PandaSelectItem {
	label?: string;
	value?: string | number | any;

	group?: string;
	[propertyName: string]: string | number | any;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export interface PandaSelectChangeEvent {
	detail: PandaSelectChange;
}