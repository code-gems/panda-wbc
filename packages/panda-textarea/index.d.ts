import { PandaTextarea } from "./src/panda-textarea";

export type PandaTextarea = typeof PandaTextarea;

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export type PandaTextareaOnInputDetail = {
	value: string;
}

export interface PandaTextareaOnInputEvent extends CustomEvent<PandaTextareaOnInputDetail> {}
export interface PandaTextareaChangeEvent extends CustomEvent<PandaTextareaOnInputDetail> {}
