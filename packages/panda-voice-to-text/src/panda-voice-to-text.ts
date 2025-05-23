// type
import { PandaVoiceToTextSpeechEndEvent } from "../index";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement("panda-voice-to-text")
export class PandaVoiceToText extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: String, reflect: true })
	theme!: string;

	@property({ type: String, attribute: "no-icon", reflect: true })
	icon: string = "mic";

	@property({ type: String, attribute: "no-support-icon", reflect: true })
	noSupportIcon: string = "mic-off";

	@property({ type: String, reflect: true })
	lang: string = "en-US";

	@property({ type: Boolean, attribute: "no-interim-results", reflect: true })
	noInterimResults: boolean = false;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	// state props
	@state()
	private _browserSupport: boolean = false;

	@state()
	private _micPermission: boolean = false;

	@state()
	private _listening: boolean = false;

	private _speechRecognition!: any;

	private _finalTranscript: string = "";

	private _interimTranscript: string = "";

	// timers
	private _silenceTimer: number | null = null;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		// check browser support for speech recognition and initialize
		this._initialize();
		// check microphone permission
		this._checkMicrophonePermission();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		const _icon = this._browserSupport
			? this.icon
			: this.noSupportIcon;

		const _cssMod: string[] = [];
		if (this._listening) {
			_cssMod.push("active");
		}
		if (this.disabled || !this._micPermission) {
			_cssMod.push("disabled");
		}

		return html`
			<div
				class="toggle-btn ${_cssMod.join(" ")}"
				part="toggle-btn ${_cssMod.join(" ")}"
				@click="${this._onToggleListen}"
				tabindex="0"
			>
				<panda-icon
					class="${this._listening ? "active" : ""}"
					part="icon ${this._listening ? "on" : "off"}"
					icon="${_icon}"
				>
				</panda-icon>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _initialize(): void {
		const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
		const SpeechGrammarList = (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList;
		const SpeechRecognitionEvent = (window as any).SpeechRecognitionEvent || (window as any).webkitSpeechRecognitionEvent;

		if ("webkitSpeechRecognition" in window) {
			this._browserSupport = true;
			this._speechRecognition = new SpeechRecognition;
			this._speechRecognition.continuous = true;
			this._speechRecognition.interimResults = !this.noInterimResults;
			this._speechRecognition.lang = this.lang ?? "en-US";
			// clear previous transcript
			this._finalTranscript = "";

			// add events
			this._speechRecognition.onresult = (event: any): void => {
				this._resetSilenceTimer();
				this._interimTranscript = "";

				for (let i = event.resultIndex; i < event.results.length; i++) {
					const transcript = event.results[i][0].transcript;

					if (event.results[i].isFinal) {
						this._finalTranscript += transcript + " ";
						console.log("%c [FINAL]:", "font-size: 24px; color: orange;", transcript);
						this._triggerSpeechEndEvent();
					} else {
						this._interimTranscript += transcript;
						console.log("%c [INTERIM]:", "font-size: 24px; color: green;", transcript);
					}
				}
			};

			this._speechRecognition.onerror = (event: any): void => {
				console.log("%c Speech recognition error:", "font-size: 16px; color: red;", event.error);
				if (event.error === "not-allowed") {
					console.warn("%c [PANDA-VOICE-TO-TEXT] Microphone permission has been denied!", "font-size: 16px;");
					this._micPermission = false;
					this._triggerPermissionDeniedEvent();
				} else if (event.error === "no-speech") {
					this._triggerNoSpeechEvent();
				} else {
					this._micPermission = true;
				}
				this._onStop();
			};

			this._speechRecognition.onspeechstart = (): void => {
				console.log("%c onspeechstart", "font-size: 24px; color: green;");
				this._finalTranscript = "";
			}

			this._speechRecognition.onspeechend = (): void => {
				console.log("%c onspeechend", "font-size: 24px; color: green;");
				console.log("%c onspeechend final:", "font-size: 24px; color: green;", this._finalTranscript, this._finalTranscript === "");
				console.log("%c onspeechend interim:", "font-size: 24px; color: green;", this._interimTranscript);
				this._onStop();

				if (this._finalTranscript === "" && this._interimTranscript !== "") {
					this._finalTranscript = this._interimTranscript;
					this._triggerSpeechEndEvent();
				}
			};
		} else {
			this._browserSupport = false;
			console.warn("%c [PANDA-VOICE-TO-TEXT] Speech recognition not supported!", "font-size: 16px;");
		}
	}

	private _triggerSpeechStartEvent(): void {
		const event = new CustomEvent("speech-start", {});
		this.dispatchEvent(event);
	}

	private _triggerSpeechEndEvent(): void {
		const event: PandaVoiceToTextSpeechEndEvent = new CustomEvent("speech-end", {
			detail: {
				text: this._finalTranscript,
			}
		});
		this.dispatchEvent(event);
	}

	private _triggerNoSpeechEvent(): void {
		const event = new CustomEvent("on-no-speech", {});
		this.dispatchEvent(event);
	}

	private _triggerPermissionDeniedEvent(): void {
		const event = new CustomEvent("on-permission-denied", {});
		this.dispatchEvent(event);
	}

	private _resetSilenceTimer(): void {
		clearTimeout(this._silenceTimer as number);
		this._silenceTimer = setTimeout(() => {
			// auto stop
			this._onStop();
		}, 2000);
	}

	async _checkMicrophonePermission(): Promise<void> {
		try {
			const permissionStatus = await (navigator.permissions as any).query({ name: "microphone" });
			if (permissionStatus.state === "denied") {
				console.warn("%c [PANDA-VOICE-TO-TEXT] Microphone permission has been denied!", "font-size: 16px;");
				this._micPermission = false;
				this._triggerPermissionDeniedEvent();
			} else {
				this._micPermission = true;
			}
		} catch (error) {
			this._micPermission = false;
		}
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onStart(): void {
		if (!this._listening) {
			this._speechRecognition.start();
			this._listening = true;
			this._triggerSpeechStartEvent();
		}
	}

	private _onStop(): void {
		if (this._listening) {
			this._speechRecognition.stop();
			this._listening = false;
		}
	}

	private _onToggleListen(): void {
		if (this._listening) {
			this._onStop();
		} else {
			this._onStart();
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-voice-to-text": PandaVoiceToText;
	}
}
