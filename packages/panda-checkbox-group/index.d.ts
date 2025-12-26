import type { PandaCheckboxGroup } from "./src/panda-checkbox-group";

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

type PandaCheckboxChangeEventDetails = {
	name?: string;
	checked: boolean;
}

export interface PandaCheckboxChangeEvent extends CustomEvent<PandaCheckboxChangeEventDetails> {}
