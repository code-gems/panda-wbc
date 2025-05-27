// constants
const LOG_STYLE = "font-size: 16px; color: orange; background: black;";


export class PandaSpeechSynthesis {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// language =======================================================================================================
	private _language!: string;

	public get language(): string {
		return this._language;
	}

	public set language(value: string) {
		if (value && typeof value === "string") {
			this._language = value;
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid language code provided. Using default language.`, LOG_STYLE);
			this._language = this._defaultLanguage;
		}
	}

	// voices =========================================================================================================
	private _voices!: SpeechSynthesisVoice[];

	public get voices(): SpeechSynthesisVoice[] {
		return this._voices;
	}

	public set voices(value: SpeechSynthesisVoice[]) {
		if (Array.isArray(value)) {
			this._voices = value;
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid voices array provided. Using default voices.`, LOG_STYLE);
		}
	}

	// voice ==========================================================================================================
	private _voice!: SpeechSynthesisVoice;

	public get voice(): SpeechSynthesisVoice {
		return this._voice;
	}

	public set voice(value: string) {
		if (typeof value === "string" && value.trim() !== "") {
			this._voice = this._getVoiceByName(value) ?? this._getDefaultVoice();
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid voice provided. Using default voice.`, LOG_STYLE);
			this._voice = this._getDefaultVoice();
		}
	}

	// rate ===========================================================================================================
	private _rate!: number;

	public get rate(): number {
		return this._rate;
	}

	public set rate(value: number) {
		if (typeof value === "number" && value >= 0.1 && value <= 10) {
			this._rate = value;
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid rate provided. Using default rate.`, LOG_STYLE);
			this._rate = this._defaultRate;
		}
	}

	// pitch ==========================================================================================================
	private _pitch!: number;

	public get pitch(): number {
		return this._pitch;
	}

	public set pitch(value: number) {
		if (typeof value === "number" && value >= 0 && value <= 2) {
			this._pitch = value;
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid pitch provided. Using default pitch.`, LOG_STYLE);
			this._pitch = this._defaultPitch;
		}
	}

	// default language ===============================================================================================
	private readonly _defaultLanguage!: string;

	public get defaultLanguage(): string {
		return this._defaultLanguage;
	}

	// default rate ===================================================================================================
	private readonly _defaultRate!: number;

	public get defaultRate(): number {
		return this._defaultRate;
	}

	// default pitch ==================================================================================================
	private readonly _defaultPitch!: number;

	public get defaultPitch(): number {
		return this._defaultPitch;
	}

	// private properties =============================================================================================
	private static instance: PandaSpeechSynthesis;
	private readonly _synth!: SpeechSynthesis;

	// ================================================================================================================
	// CONSTRUCTOR ====================================================================================================
	// ================================================================================================================

	constructor() {
		// Check if Speech Synthesis API is supported
		if (!window.speechSynthesis) {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Speech Synthesis API is not supported in this browser.`, LOG_STYLE);
		} else {
			// initialize class properties
			this._synth = window.speechSynthesis;
			this._defaultLanguage = "en-US";
			this._defaultRate = 1;
			this._defaultPitch = 1;
			this._rate = this._defaultRate;
			this._pitch = this._defaultPitch;
			this._language = this._defaultLanguage;
			this._voices = [];
		}
	}

	/**
	 * Get the singleton instance of PandaSpeechSynthesis
	 * @returns Singleton instance of PandaSpeechSynthesis
	 */
	public static getInstance(): PandaSpeechSynthesis {
		if (!PandaSpeechSynthesis.instance) {
			PandaSpeechSynthesis.instance = new PandaSpeechSynthesis();
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] (getInstance) Instance already exists`, LOG_STYLE, PandaSpeechSynthesis.instance);
		}
		return PandaSpeechSynthesis.instance;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/**
	 * Validate the provided text before speaking
	 * @param {String} text The text to be validated
	 * @returns {Boolean} True if the text is valid, false otherwise
	 */
	private _validateText(text: string): boolean {
		if (!text || typeof text !== "string") {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid text provided. Please provide a valid string.`, LOG_STYLE);
			return false;
		}
		if (text.trim() === "") {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] No text provided to speak.`, LOG_STYLE);
			return false;
		}
		return true;
	}

	/**
	 * Get the default voice from the available voices
	 * If no default voice is found, it returns the first available voice
	 * @returns {String} The name of the default voice
	 */
	private _getDefaultVoice(): SpeechSynthesisVoice {
		if (this._voices.length > 0) {
			const defaultVoice = this._voices.find((voice) => voice.default);
			if (defaultVoice) {
				return defaultVoice;
			}
		}
		console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] No default voice found. Using first available voice.`, LOG_STYLE);
		return this._voices[0];
	}

	/**
	 * Check if the provided voice exists in the available voices
	 * @param {String} name The name of the voice to check
	 * @returns {Boolean} True if the voice exists, false otherwise
	 */
	private _getVoiceByName(name: string): SpeechSynthesisVoice | undefined {
		if (!name || typeof name !== "string") {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid voice name provided.`, LOG_STYLE);
			return undefined;
		}
		const voice = this._voices.find((v) => v.name === name);
		if (!voice) {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] No voice found with name: ${name}.`, LOG_STYLE);
			return undefined;
		}
		return voice;
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	/**
	 * Load available voices from the Speech Synthesis API
	 * This method is called during initialization and can be called again to refresh the voices list.
	 */
	public async getVoices(): Promise<SpeechSynthesisVoice[]> {
		return new Promise((resolve) => {
			this._voices = this._synth.getVoices();
			if (this._voices.length === 0) {
				this._synth.onvoiceschanged = () => {
					this._voices = this._synth.getVoices();
					console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] (onvoiceschanged) getVoices`, LOG_STYLE, this._voices);
					resolve(this._voices);
				};
			} else {
				console.log(`%c ⚡ [PANDA SPEECH SYNTHESIS] Voices loaded successfully.`, LOG_STYLE, this._voices);
				resolve(this._voices);
			}
		});
	}

	/**
	 * Speak the provided text using the Speech Synthesis API
	 * @param {String} text The text to be spoken
	 */
	public async speak(text: string): Promise<void> {
		// Load voices if not loaded yet
		if (this._voices.length === 0) {
			await this.getVoices();
		}
		if (!this._synth) {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Speech Synthesis API is not supported in this browser.`, LOG_STYLE);
			return;
		}
		// Validate the text before speaking
		if (!this._validateText(text)) {
			return;
		}
		const utterance = new SpeechSynthesisUtterance(text);
		// find voice for the specified language
		const voice = this._voice ?? this._voices.find((voice) => voice.lang === this._language);
		console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] All voices:`, LOG_STYLE, this._voices);
		if (voice) {
			utterance.voice = voice;
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] No voice found for language: ${this._language}. Using default voice.`, LOG_STYLE);
			// fallback to default voice if no voice found for the specified language
			const defaultVoice = this._voices.find((voice) => voice.default);
			if (defaultVoice) {
				utterance.voice = defaultVoice;
			}
		}
		utterance.rate = this._rate;
		utterance.pitch = this._pitch;
		// cancel any ongoing speech
		this._synth.cancel();
		this._synth.speak(utterance);
	}
}
