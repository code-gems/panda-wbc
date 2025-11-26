export type { PandaTextField } from "./src/panda-text-field";

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export type PandaTextFieldOnInputDetail = {
	value: string;
}

export interface PandaTextFieldOnInputEvent extends CustomEvent<PandaTextFieldOnInputDetail> {}
export interface PandaTextFieldChangeEvent extends CustomEvent<PandaTextFieldOnInputDetail> {}