import { PandaTextField } from "./src/panda-text-field";

export type PandaTextField = typeof PandaTextField;

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export type PandaTextFieldOnInputDetail = {
	value: string;
}

export interface PandaTextFieldOnInputEvent extends CustomEvent<PandaTextFieldOnInputDetail> {}