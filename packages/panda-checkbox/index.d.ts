import { PandaCheckbox } from "./src/panda-checkbox";

export type PandaCheckbox = typeof PandaCheckbox;

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export interface PandaCheckboxChange {
	checked: boolean;
}

export interface PandaCheckboxChangeEvent extends CustomEvent<PandaCheckboxChange> {}
