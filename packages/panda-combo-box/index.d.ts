
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
	value: string | number | null | any;
}

export type PandaComboBoxOverlayChangeEventDetails = {
	value: string | number | null | any;
	searchText: string | null;
}

export type PandaComboBoxOverlayUpdateInputFieldEventDetails = {
	value: any;
}

export interface PandaComboBoxChangeEvent extends CustomEvent<PandaComboBoxChangeEventDetails> {}

export interface PandaComboBoxOverlayChangeEvent extends CustomEvent<PandaComboBoxOverlayChangeEventDetails> {}

export interface PandaComboBoxOverlayUpdateInputFieldEvent extends CustomEvent<PandaComboBoxOverlayUpdateInputFieldEventDetails> {}
