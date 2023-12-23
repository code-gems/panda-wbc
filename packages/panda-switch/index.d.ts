import { PandaSwitch } from "./src/panda-switch";

export type PandaSwitch = typeof PandaSwitch;

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export interface PandaSwitchChangeEventDetails {
	checked: boolean;
}

export interface PandaSwitchChangeEvent extends CustomEvent<PandaSwitchChangeEventDetails> {}