// types
import { PandaCountdownTimerTickEvent } from "../index";

// style
import { styles } from "./styles/styles";

import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";

@customElement("panda-circular-countdown-timer")
class PandaCircularCountdownTimer extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: Number })
	time: number = 0;

	@property({ type: Boolean, reflect: true })
	autostart: boolean = false;

	@property({ type: Boolean, attribute: "show-interval", reflect: true })
	showInterval: boolean = false;

	@property({ type: String })
	format: string = "MM:SS";

	@property({ type: Boolean, attribute: "show-scale", reflect: true })
	showScale: boolean = false;

	@property({ type: Boolean, reflect: true })
	paused: boolean = false;

	@property({ type: Boolean, reflect: true })
	busy: boolean = false;

	@property({ type: String })
	theme!: string;

	// state props
	@state()
	private _time: number = 0;

	@state()
	private _totalLength: number = 0;

	@state()
	private _counter: string = "";

	// elements
	@query("#progress")
	private _circleEl!: SVGCircleElement;

	// timer
	private _countdownTimer: number | null = null;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		this._totalLength = this._circleEl.getTotalLength();
		this._circleEl.style.strokeDasharray = `0 ${this._totalLength}`; // set progress indication to 0 
	}

	updated(_changedProps: PropertyValues): void {
		if (_changedProps.has("time") && this.time !== undefined && this.autostart) {
			this._startCountdown();
		}
		// check if autostart flag is enabled
		if (_changedProps.has("autostart") && this.autostart) {
			this._startCountdown();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// clear timer;
		if (this._countdownTimer) {
			clearInterval(this._countdownTimer);
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		return html`
			<div
				class="countdown-cont ${this.busy ? "busy" : ""} ${this.paused ? "paused" : ""}"
				part="countdown-cont"
			>
				<svg viewBox="0 0 100 100">
					<circle
						class="scale ${this.showScale ? "show" : ""}"
						part="scale"
					>
					</circle>
					<circle
						id="progress"
						class="progress"
						part="progress"
					>
					</circle>
					<circle
						class="loader"
						part="loader"
					/>
				</svg>
				${this._renderCounter()}
			</div>
		`;
	}

	private _renderCounter(): TemplateResult | void {
		if (!this.busy) {
			return html`
				<div
					class="counter"
					part="counter"
				>
					${this._counter}
					<slot></slot>
				</div>
			`;
		}
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public start(): void {
		this._startCountdown();
	}

	public pause(): void {
		this.paused = !this.paused;
	}

	public stop(): void {
		this._time = 0;
		this._updateTimer();
		if (this._countdownTimer) {
			clearInterval(this._countdownTimer);
			this._countdownTimer = null;
		}
	}

	public restart(): void {
		this._time = 0;
		this._startCountdown();
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _startCountdown(): void {
		if (this._countdownTimer === null) {
			this._updateTimer();
			this._countdownTimer = setInterval(() => {
				this._timerTick();
			}, 1000);
		}
	}

	private _timerTick(): void {
		if (!this.busy && !this.paused) {
			this._time++;
			this._updateTimer();

			// trigger countdown event
			this._triggerTickEvent();

			// check if countdown is over
			if (this._time >= this.time) {
				this._time = 0;
				clearInterval(this._countdownTimer as number);
				this._triggerCountdownOverEvent();
			}
		}
	}

	private _updateTimer(): void {
		// round up to avoid gaps
		const _progress: number = Math.ceil((this._totalLength * this._time) / this.time);
		this._circleEl.style.strokeDasharray = `${_progress} ${this._totalLength}`;

		// calculate counter if enabled
		if (this.showInterval && !this.busy) {
			this._counter = this._formatTime(Math.round(this.time - this._time), this.format);
		} else {
			this._counter = "";
		}
	}

	private _formatTime(seconds: number, format: string = "MM:SS"): string {
		if (isNaN(seconds) || seconds < 0) {
			return format.replace(/HH|MM|SS/g, '00');
		}

		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		// formatting
		const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

		// check if format string contains HH (hours)
		if (
			!format.includes("HH") &&
			format.includes("MM") &&
			format.includes("SS")
		) {
			// add hours to minutes
			const totalMinutes = hours * 60 + minutes;
			// format: MM:SS
			return format
				.replace("MM", totalMinutes.toString().padStart(2, "0"))
				.replace("SS", formattedSeconds);
		} else if (
			!format.includes("HH") &&
			!format.includes("MM") &&
			format.includes("SS")
		) {
			// format: SS
			return format.replace("SS", seconds.toString().padStart(2, '0'));
		} else {
			// formatting
			const formattedHours = hours.toString().padStart(2, '0');
			const formattedMinutes = minutes.toString().padStart(2, '0');
			// format: HH:MM:SS
			return format
				.replace("HH", formattedHours)
				.replace("MM", formattedMinutes)
				.replace("SS", formattedSeconds);
		}
	}

	private _triggerCountdownOverEvent(): void {
		const event = new CustomEvent("countdown-over");
		this.dispatchEvent(event);
	}

	private _triggerTickEvent(): void {
		const event: PandaCountdownTimerTickEvent = new CustomEvent("countdown-tick", {
			detail: {
				interval: Math.round(this.time - this._time),
			}
		});
		this.dispatchEvent(event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-circular-countdown-timer": PandaCircularCountdownTimer;
	}
}