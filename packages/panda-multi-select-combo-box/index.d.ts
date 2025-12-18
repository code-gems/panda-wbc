export type { PandaMultiSelectComboBox } from "./src/panda-multi-select-combo-box";
export type { PandaMultiSelectComboBoxOverlay } from "./src/panda-multi-select-combo-box-overlay";

export interface PandaSelectI18nConfig {
	allItems: string;
	selectAll: string;
	selectedItems: string;
	reset: string;
	filterPlaceholder: string[];
	noDataFound: string;
}

export type PandaMultiSelectComboBoxItem = {
	label: string;
	value: any;
	// extras
	group?: string;
	disabled?: boolean;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export interface PandaSelectChangeEventDetails {
	value: any | any[];
}

export interface PandaSelectChangeEvent extends CustomEvent<PandaSelectChangeEventDetails> { }
