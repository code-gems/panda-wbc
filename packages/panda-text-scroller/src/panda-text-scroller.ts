// types
export const enum ScrollSpeed {
	SLOWER = 0.25,
	SLOW = 0.5,
	MEDIUM = 1,
	FAST = 1.5,
	FASTER = 2,
}

// style
import { styles } from "./styles/styles";

// constants
const DEFAULT_SCROLLER_SPEED = ScrollSpeed.MEDIUM;
const DEFAULT_SCROLLER_DELAY = 2000;

export class PandaTextScroller extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
	static readonly observedAttributes = [
		"speed",
		"scroller-delay",
	];

	// speed ==========================================================================================================
	private _speed!: number;
	
	get speed(): number {
		return this._speed;
	}
	
	set speed(value: number) {
		if (this._speed !== value) {
			this._speed = this._parseNumberAttribute(value, DEFAULT_SCROLLER_SPEED) as number;
			// reflect to attribute
			this.setAttribute("speed", this._speed + "");
		}
	}
	
	// scrollerDelay ==================================================================================================
	private _scrollerDelay!: number;

	get scrollerDelay(): number {
		return this._scrollerDelay;
	}
	
	set scrollerDelay(value: number) {
		if (this._scrollerDelay !== value) {
			this._scrollerDelay = this._parseNumberAttribute(value, DEFAULT_SCROLLER_DELAY) as number;
			// reflect to attribute
			this.setAttribute("scroller-delay", this._scrollerDelay + "");
		}
	}

	// view properties ================================================================================================

	/** Indicates if scroll animation is ongoing */
	private _animating!: boolean;
	private _animationFrameId!: number;
	private _componentWidth!: number;
	private _textWidth!: number;
	
	// timers
	private _sizeCheckTimer!: ReturnType<typeof setTimeout>;
	private _animationTimer!: ReturnType<typeof setTimeout>;

	// elements
	private readonly _trackEl!: HTMLDivElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// apply component styles
		this._applyStyles();
		// initialize class properties
		this._animating = false;
		this._animationFrameId = -1;
		this._componentWidth = 0;
		this._textWidth = 0;
		this._speed = ScrollSpeed.MEDIUM;
		this._scrollerDelay = DEFAULT_SCROLLER_DELAY;
		// render component
		this._render();
		// get element handle
		this._trackEl = this.shadowRoot!.querySelector(".track") as HTMLDivElement;
	}

	connectedCallback() {
		// delay loop for DOM to settle
		this._sizeCheckTimer = setInterval(() => {
			this._checkSizeChange();
		}, 2000);
	}

	disconnectedCallback() {
		this._stopScrolling();
		// clear timers
		clearTimeout(this._sizeCheckTimer);
		clearTimeout(this._animationTimer);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "speed") {
			this._speed = this._parseNumberAttribute(_newValue, DEFAULT_SCROLLER_SPEED) as number;
		}
		if (_name === "scroller-delay") {
			this._scrollerDelay = this._parseNumberAttribute(_newValue, DEFAULT_SCROLLER_DELAY) as number;
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================
	
	private _render() {
		if (this.shadowRoot) {
			// render component template
			this.shadowRoot.innerHTML = /*html*/`
				<div class="track">
					<slot></slot>
				</div>
			`;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _applyStyles(): void {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	/**
	 * Parses an attribute value to a number
	 * @param value value to parse
	 * @param {Number} fallbackValue fallback value if provided value is invalid
	 * @returns {Number}
	 */
	private _parseNumberAttribute(value: unknown, fallbackValue: number | null = null): number | null {
		// check for null and undefined
		if (value == null) {
			return fallbackValue;
		}
		// check if already a number and if it's valid
		if (typeof value === "number") {
			return isNaN(value) || !isFinite(value)
				? fallbackValue
				: value;
		}
		// Try to parse as number
		const parsedValue = Number(value);
		// return fallback if parsing resulted in NaN or infinity
		return isNaN(parsedValue) || !isFinite(parsedValue)
			? fallbackValue
			: parsedValue;
	}

	private _animate(): void {
		console.log(`%c ⚡ (_animate)`, "font-size: 16px; color: orange; background: black;");
		let distance = this._trackEl.offsetWidth - this.offsetWidth;
		let left = -distance;
		let positionX = 0; // 0 -> left
		let direction = -1; // -1 = leftward
		let animationFrameRequested = false;

		const go = (): void => {
			console.log(`%c ⚡ (_animate -> go) loop`, "font-size: 16px; color: pink; background: black;");
			if (!this._animating) {
				console.log(`%c ⚡ (_animate -> go) exit loop`, "font-size: 16px; color: pink; background: black;");
				return;
			}
			if (!animationFrameRequested) {
				animationFrameRequested = true;
				// request animation frame
				this._animationFrameId = requestAnimationFrame(() => {
					positionX += direction * this._speed;
					if (this._animating) {
						this._trackEl.style.transform = `translateX(${positionX}px)`;
					}
					animationFrameRequested = false;

					// Reached right edge?
					if (positionX <= left && direction === -1) {
						direction = 1; // turn around
						positionX = left; // correct position
						this._animationTimer = setTimeout(go, this._scrollerDelay); // 2 s pause
						console.log(`%c 🔥 Reached right edge!`, "font-size: 16px; color: crimson; background: black;");
						console.log(`%c distance:`, "font-size: 14px; color: crimson; background: black;", distance);
						console.log(`%c textWidth:`, "font-size: 14px; color: crimson; background: black;", this._textWidth);
						console.log(`%c containerWidth:`, "font-size: 14px; color: crimson; background: black;", this._componentWidth);
						return;
					}
					// Reached left edge?
					if (positionX >= 0 && direction === 1) {
						direction = -1;
						positionX = 0; // correct position
						this._animationTimer = setTimeout(go, this._scrollerDelay); // 2 s pause
						console.log(`%c 🔥 Reached left edge!`, "font-size: 16px; color: crimson; background: black;");
						console.log(`%c distance:`, "font-size: 14px; color: crimson; background: black;", distance);
						console.log(`%c textWidth:`, "font-size: 14px; color: crimson; background: black;", this._textWidth);
						console.log(`%c containerWidth:`, "font-size: 14px; color: crimson; background: black;", this._componentWidth);
						return;
					}
					go();
				});
			}
		};
		go();
	}

	private _startScrolling(): void {
		console.log(`%c ⚡ (_startScrolling)`, "font-size: 16px; color: orange; background: black;");
		this._animating = true;
		this._animate();
	}
	
	private _stopScrolling(): void {
		console.log(`%c ⚡ (_stopScrolling)`, "font-size: 16px; color: orange; background: black;");
		this._animating = false; // stop animation loop
		this._trackEl.style.transform = "";
		// clear timer
		clearTimeout(this._animationTimer);
		// cancel animation frame
		cancelAnimationFrame(this._animationFrameId);
	}

	private _checkSizeChange(): void {
		if (
			this._trackEl.offsetWidth !== this._textWidth ||
			this.offsetWidth !== this._componentWidth
		) {
			console.log(`%c ⚡ (_checkSizeChange) 1. Size changed!`, "font-size: 16px; color: green; background: black;");
			this._textWidth = this._trackEl.offsetWidth;
			this._componentWidth = this.offsetWidth;
			
			// check if text is too long
			if (this._componentWidth < this._textWidth) {
				console.log(`%c ⚡ (_checkSizeChange) 2.A Text is too long -> animate`, "font-size: 16px; color: green; background: black;");
				this._stopScrolling();
				this._startScrolling();
			} else {
				console.log(`%c ⚡ (_checkSizeChange) 2.B Text is short -> don't animate`, "font-size: 16px; color: green; background: black;");
				this._stopScrolling();
			}
		}
	}
}

// Register the custom element
if (!customElements.get("panda-text-scroller")) {
	customElements.define("panda-text-scroller", PandaTextScroller);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-text-scroller": PandaTextScroller;
	}
}