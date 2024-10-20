import { PandaVoiceToText as PandaVoiceToTextClass } from "./src/panda-voice-to-text";
export type PandaVoiceToText = typeof PandaVoiceToTextClass;

export type PandaVoiceToTextSpeechEndEventDetails = {
	text: string;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export interface PandaVoiceToTextSpeechEndEvent extends CustomEvent<PandaVoiceToTextSpeechEndEventDetails> {}
