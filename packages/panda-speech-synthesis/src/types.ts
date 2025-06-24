export type PandaSpeechSynthesisConfig = {
	voice?: string; // Default voice
	rate?: number; // Default speech rate
	pitch?: number; // Default pitch
	language?: string; // Language for speech synthesis	
	volume?: number; // Volume level (0 to 1)

	onReady?: (voices: SpeechSynthesisVoice[]) => void; // Callback for when the synthesis is ready
	onStart?: () => void; // Callback for start event
	onPause?: () => void; // Callback for pause event
	onResume?: () => void; // Callback for resume event
	onEnd?: () => void; // Callback for end event
	onError?: (error: Error) => void; // Callback for error event
};

// ====================================================================================================================
// EVENT TYPES ========================================================================================================
// ====================================================================================================================

export type PandaSpeechSynthesisReadyEventDetail = {
	voices: SpeechSynthesisVoice[];
}

export interface PandaSpeechSynthesisReadyEvent extends CustomEvent<PandaSpeechSynthesisReadyEventDetail> {}
