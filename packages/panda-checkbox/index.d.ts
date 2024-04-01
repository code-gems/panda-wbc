import { PandaCheckbox } from "./src/panda-checkbox";

export type PandaCheckbox = typeof PandaCheckbox;

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

type PandaCheckboxChange = {
	name: string;
	checked: boolean;
}

export interface PandaCheckboxChangeEvent extends CustomEvent<PandaCheckboxChange> {}
