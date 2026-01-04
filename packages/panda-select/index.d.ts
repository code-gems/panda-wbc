export type { PandaSelect } from "./src/panda-select";
export type { PandaSelectOverlay } from "./src/panda-select-overlay";

export interface PandaSelectI18nConfig {
	allItems: string;
	selectAll: string;
	selectedItems: string;
	reset: string;
	filterPlaceholder: string[];
	noDataFound: string;
}

export type PandaSelectItem = {
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