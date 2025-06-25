// types
import { PandaSpeechSynthesisConfig, PandaSpeechSynthesisReadyEvent } from "./types";

// constants
const LOG_STYLE = "font-size: 16px; color: limegreen; background: black;";
const LOG_STYLE_WARN = "font-size: 16px; color: orange; background: black;";

export default class PandaSpeechSynthesis {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// language =======================================================================================================
	public get language(): string {
		return this._defaultConfig.language as string;
	}

	public set language(value: string) {
		if (value && typeof value === "string") {
			this._defaultConfig.language = value;
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid language code provided. Using default language.`, LOG_STYLE_WARN);
			this._defaultConfig.language = this._defaultLanguage;
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
	private _voice!: SpeechSynthesisVoice | null;

	public get voice(): string {
		console.log(`%c 🧪 [PANDA SPEECH SYNTHESIS] (get voice): ${this._voice?.name}.`, LOG_STYLE);
		return this._voice?.name ?? "";
	}

	public set voice(value: string) {
		if (typeof value === "string" && value.trim() !== "") {
			this._voice = this._getVoiceByName(value) ?? this.getDefaultVoice();
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid voice provided. Using default voice.`, LOG_STYLE_WARN);
			this._voice = this.getDefaultVoice();
		}
	}

	// rate ===========================================================================================================
	public get rate(): number {
		return this._defaultConfig.rate as number;
	}

	public set rate(value: number) {
		if (typeof value === "number" && value >= 0.1 && value <= 10) {
			this._defaultConfig.rate = value;
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid rate provided. Using default rate.`, LOG_STYLE_WARN);
			this._defaultConfig.rate = this._defaultRate;
		}
	}

	// pitch ==========================================================================================================
	public get pitch(): number {
		return this._defaultConfig.pitch as number;
	}

	public set pitch(value: number) {
		if (typeof value === "number" && value >= 0 && value <= 2) {
			this._defaultConfig.pitch = value;
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid pitch provided. Using default pitch.`, LOG_STYLE_WARN);
			this._defaultConfig.pitch = this._defaultPitch;
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

	// config =========================================================================================================
	private readonly _defaultConfig!: PandaSpeechSynthesisConfig;

	// event target for custom events =================================================================================
	private readonly _eventTarget!: EventTarget;
	
	// private properties =============================================================================================
	private static instance: PandaSpeechSynthesis;
	private readonly _synth!: SpeechSynthesis;
	private readonly _utterance!: SpeechSynthesisUtterance;
	private _ready: boolean = false;

	// ================================================================================================================
	// CONSTRUCTOR ====================================================================================================
	// ================================================================================================================

	constructor(_config: PandaSpeechSynthesisConfig = {}) {
		// Check if Speech Synthesis API is supported
		if (!window.speechSynthesis) {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Speech Synthesis API is not supported in this browser.`, LOG_STYLE_WARN);
		} else {
			// initialize class properties
			this._synth = window.speechSynthesis;
			this._synth.getVoices(); // preload voices
			this._utterance = new SpeechSynthesisUtterance();
			this._defaultLanguage = "en-US";
			this._defaultRate = 1;
			this._defaultPitch = 1;
			
			// set default config
			this._defaultConfig = {
				rate: _config.rate ?? this._defaultRate,
				pitch: _config.pitch ?? this._defaultPitch,
				language: _config.language ?? this._defaultLanguage,
				..._config // spread operator to merge with provided config
			};
			this._voices = [];

			// add events
			this._eventTarget = new EventTarget();
			this._synth.onvoiceschanged = this._onReady.bind(this);
			// this._synth.onstart = this._onStartSpeaking.bind(this);
			// this._synth.onend = this._onEndSpeaking.bind(this);
			// this._synth.onerror = this._onError.bind(this);
			// this._synth.onpause = this._onPause.bind(this);
			// this._synth.onresume = this._onResume.bind(this);

		}
	}

	/**
	 * Get the singleton instance of PandaSpeechSynthesis
	 * @returns Singleton instance of PandaSpeechSynthesis
	 */
	public static getInstance(): PandaSpeechSynthesis {
		if (!PandaSpeechSynthesis.instance) {
			PandaSpeechSynthesis.instance = new PandaSpeechSynthesis();
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
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid text provided. Please provide a valid string.`, LOG_STYLE_WARN);
			return false;
		}
		if (text.trim() === "") {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] No text provided to speak.`, LOG_STYLE_WARN);
			return false;
		}
		return true;
	}

	/**
	 * Check if the provided voice exists in the available voices
	 * @param {String} name The name of the voice to check
	 * @returns {Boolean} True if the voice exists, false otherwise
	 */
	private _getVoiceByName(name: string): SpeechSynthesisVoice | undefined {
		if (!name || typeof name !== "string") {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Invalid voice name provided.`, LOG_STYLE_WARN);
			return undefined;
		}
		const voice = this._voices.find((voice) => voice.name === name);
		if (!voice) {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] No voice found with name: ${name}.`, LOG_STYLE_WARN);
			return undefined;
		}
		return voice;
	}

	/**
	 * Load available voices from the Speech Synthesis API
	 * This method is called during initialization and can be called again to refresh the voices list.
	*/
	private async _getVoices(): Promise<SpeechSynthesisVoice[]> {
		return new Promise((resolve) => {
			this._voices = this._synth.getVoices();
			if (this._voices.length === 0) {
				this._synth.onvoiceschanged = () => {
						this._voices = this._synth.getVoices();
						console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] (onvoiceschanged) getVoices:`, LOG_STYLE_WARN, this._voices);
						resolve(this._voices);
					};
				} else {
					console.log(`%c ⚡ [PANDA SPEECH SYNTHESIS] Voices loaded successfully.`, LOG_STYLE, this._voices);
					resolve(this._voices);
			}
		});
	}
	
	// ================================================================================================================
	// CALLBACKS ======================================================================================================
	// ================================================================================================================

	private readonly _onReady = (): void => {
		console.log(`%c 🗣️ [PANDA SPEECH SYNTHESIS] Ready to speak.`, LOG_STYLE);
		this._voices = this._synth.getVoices();

		// check if voice is set in the config and if it exists in the available voices
		if (this._defaultConfig.voice && typeof this._defaultConfig.voice === "string") {
			const voice = this._getVoiceByName(this._defaultConfig.voice);
			if (!voice) {
				console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Voice ${this._defaultConfig.voice} not found. Using default voice.`, LOG_STYLE_WARN);
				this._voice = this.getDefaultVoice();
			} else {
				console.log(`%c 🗣️ [PANDA SPEECH SYNTHESIS] Using voice: ${voice.name}.`, LOG_STYLE);
				this._voice = voice;
			}
		}
		
		// dispatch ready event
		const customEvent: PandaSpeechSynthesisReadyEvent = new CustomEvent("on-ready", {
			detail: {
				voices: this._voices,
			},
		});
		this._eventTarget.dispatchEvent(customEvent);

		// check if onReady callback is provided in the config
		if (this._defaultConfig.onReady && typeof this._defaultConfig.onReady === "function") {
			// call the onReady callback with the available voices
			this._defaultConfig.onReady(this._voices);
		}
		// set ready state to true
		this._ready = true;
	}

	private readonly _onStartSpeaking = (event: SpeechSynthesisEvent): void => {
		console.log(`%c 🗣️ [PANDA SPEECH SYNTHESIS] Speaking started:`, LOG_STYLE, event);
	}

	private readonly _onEndSpeaking = (event: SpeechSynthesisEvent): void => {
		console.log(`%c 🗣️ [PANDA SPEECH SYNTHESIS] Speaking ended:`, LOG_STYLE, event);
	}

	private readonly _onError = (event: SpeechSynthesisErrorEvent): void => {
		console.error(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Error occurred:`, LOG_STYLE_WARN, event);
	}

	private readonly _onPause = (event: SpeechSynthesisEvent): void => {
		console.log(`%c ⏸️ [PANDA SPEECH SYNTHESIS] Speaking paused:`, LOG_STYLE, event);
	}

	private readonly _onResume = (event: SpeechSynthesisEvent): void => {
		console.log(`%c ▶️ [PANDA SPEECH SYNTHESIS] Speaking resumed:`, LOG_STYLE, event);
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	/** Get selected voice object */
	public getSelectedVoice(): SpeechSynthesisVoice | undefined {
		if (this._voice) {
			return this._voice;
		}
		return undefined;
	}

	/**
	 * Speak the provided text using the Speech Synthesis API
	 * @param {String} text The text to be spoken
	 */
	public async speak(text: string): Promise<void> {
		// Load voices if not loaded yet
		if (this._voices.length === 0) {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] (speak) no voices loaded. Loading voices...`, LOG_STYLE);
			await this._getVoices();
			// check if class was not ready
			if (!this._ready) {
				console.log(`%c [PANDA SPEECH SYNTHESIS] (speak) call ready callback`, LOG_STYLE);
				this._onReady();
			}
		}
		if (!this._synth) {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Speech Synthesis API is not supported in this browser.`, LOG_STYLE);
			return;
		}
		// Validate the text before speaking
		if (!this._validateText(text)) {
			return;
		}
		this._utterance.text = text;
		// get voice based on provided config
		const voice = this._getVoice();
		if (voice) {
			this._utterance.voice = voice;
			this._utterance.rate = this._defaultConfig.rate as number;
			this._utterance.pitch = this._defaultConfig.pitch as number;
			// cancel any ongoing speech
			this._synth.cancel();
			this._synth.speak(this._utterance);
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] No voice selected. Cannot speak.`, LOG_STYLE);
		}
	}

	private _getVoice() {
		// check if voice is set
		if (this._voice) {
			return this._voice;
		}
		// if no voice is set and voice name is provided in the config, try to find it
		if (this._defaultConfig.voice && typeof this._defaultConfig.voice === "string") {
			const voice = this._getVoiceByName(this._defaultConfig.voice);
			if (voice) {
				console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Using voice name: ${this._defaultConfig.voice}.`, LOG_STYLE);
				return voice;
			}
		}
		// check if language was provided in the config and try to find a voice for that language
		if (this._defaultConfig.language && typeof this._defaultConfig.language === "string") {
			const voice = this._voices.find((voice) => voice.lang === this._defaultConfig.language);
			if (voice) {
				console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] Using voice for language: ${this._defaultConfig.language}.`, LOG_STYLE);
				return voice;
			}
		}
		// if no voice is set and no voice name is provided in the config, use the default voice
		console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] No voice selected. Using default voice.`, LOG_STYLE);
		return this.getDefaultVoice();
	}

	/**
	 * Get the default voice from the available voices
	 * If no default voice is found, it returns the first available voice
	 * @returns {String} The name of the default voice
	 */
	public getDefaultVoice(): SpeechSynthesisVoice | null {
		if (this._ready) {
			if (this._voices.length > 0) {
				const defaultVoice = this._voices.find((voice) => voice.default);
				if (defaultVoice) {
					return defaultVoice;
				} else {
					// If no default voice is found, return the first available voice
					console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] No default voice found. Using first available voice.`, LOG_STYLE);
					return this._voices[0];
				}
			}
			return null;
		} else {
			console.log(`%c ⚠️ [PANDA SPEECH SYNTHESIS] (getDefaultVoice) Class is not ready yet. Please wait for voices to load.`, LOG_STYLE);
			return null;
		}
	}

	// ================================================================================================================
	// CUSTOM EVENTS ==================================================================================================
	// ================================================================================================================

	/**
	 * Add an event listener for custom events
	 * @param {String} type The type of the event to listen for
	 * @param {EventListener} listener The listener function to be called when the event is dispatched
	 */
	public addEventListener(type: string, listener: EventListener) {
		this._eventTarget.addEventListener(type, listener);
	}

	/**
	 * Dispatch a custom event
	 * @param {Event} event The event to be dispatched
	 * @returns {Boolean} True if the event was successfully dispatched, false otherwise
	 */
	public dispatchEvent(event: CustomEvent<any>): boolean {
		return this._eventTarget.dispatchEvent(event);
	}
}
