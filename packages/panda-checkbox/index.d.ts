export type { PandaCheckbox } from "./src/panda-checkbox";

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

type PandaCheckboxChangeEventDetails = {
	name?: string;
	checked: boolean;
}

export interface PandaCheckboxChangeEvent extends CustomEvent<PandaCheckboxChangeEventDetails> {}
