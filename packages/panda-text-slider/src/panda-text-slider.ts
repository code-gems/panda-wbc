// types
const enum SlideState {
	HIDE = "hide",
	SHOW = "show",
	SLIDE_IN = "slide-in",
	SLIDE_OUT = "slide-out",
}

type SlideMetadata = {
	index: number;
	status: string;
	text: string;
}

// style
import { styles } from "./styles/styles";

// constants
const DEFAULT_SLIDER_INTERVAL = 4000;

class PandaTextSlider extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
	static readonly observedAttributes = [
		"slides",
		"hide",
		"slider-interval",
	];
	
	// slides =========================================================================================================
	private _slides!: string[];
	
	get slides(): string[] {
		return this._slides;
	}

	set slides(value: string[]) {
		console.log(
			`%c ⚡ [PANDA-TEXT-SLIDER] 1. set slides`,
			"font-size: 24px; color: crimson; background: black;",
			this._slides,
			value,
		);

		if (this._slidesChanged(value, this._slides)) {
			this._slides = value;
			console.log(
				`%c ⚡ [PANDA-TEXT-SLIDER] 2. set slides (changed)`,
				"font-size: 24px; color: crimson; background: black;",
			);
			// reset component and animation
			this.reset();
			// rerender template
			this._render();
		}
	}

	// hide ===========================================================================================================
	private _hide!: boolean;
	
	get hide(): boolean {
		return this._hide;
	}

	set hide(value: boolean) {
		if (this._hide !== value) {
			this._hide = this._parseBooleanAttribute(value);
			// reflect to attribute
			if (value) {
				this.setAttribute("hide", "");
				// clear animation timer
				console.log(
					`%c ⚠️ [PANDA-TEXT-SLIDER] (set hide => _clearTimer)`,
					"font-size: 24px; color: red; background: black;",
					this._slides,
				);

				this._clearTimer();
			} else {
				this.removeAttribute("hide");
				// start animation timer
				this.reset();
			}
		}
	}

	// sliderInterval =================================================================================================
	private _sliderInterval!: number | null;
		
	get sliderInterval(): number | null {
		return this._sliderInterval;
	}

	set sliderInterval(value: number | null) {
		if (this._sliderInterval !== value) {
			this._sliderInterval = this._parseNumberAttribute(value, DEFAULT_SLIDER_INTERVAL) as number;
			// reflect to attribute
			if (this._sliderInterval) {
				this.setAttribute("slider-interval", this._sliderInterval + "");
			} else {
				this.removeAttribute("slider-interval");
			}
		}
	}

	// view properties ================================================================================================

	private _slideMetadataList!: SlideMetadata[];

	private _currentIndex!: number;

	// timer
	private _sliderTimer!: ReturnType<typeof setInterval>;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// apply component styles
		this._applyStyles();
		// initialize class properties
		this._slides = [];
		this._slideMetadataList = [];
		this._currentIndex = 0;
		this._sliderInterval = DEFAULT_SLIDER_INTERVAL;
		this._hide = false;
		// start animation timer
		this.reset();
		// render component
		this._render();
	}

	disconnectedCallback() {
		console.log(
			`%c ⚡ [PANDA-TEXT-SLIDER] (disconnectedCallback)`,
			"font-size: 24px; color: red; background: black;",
		);
		// clear timer
		this._clearTimer();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "slides") {
			this._slides = _newValue;
			this._render();
		}
		if (_name === "hide") {
			this._hide = this._parseBooleanAttribute(_newValue);
			this._render();
		}
		if (_name === "slider-interval") {
			this._sliderInterval = this._parseNumberAttribute(_newValue, DEFAULT_SLIDER_INTERVAL) as number;
			this._render();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	private _render() {
		if (this.shadowRoot) {
			// render component template
			this.shadowRoot.innerHTML = /*html*/`
				<div class="slider-cont" part="slider-cont">
					${this._renderSlides()}
				</div>
			`;
		}
	}

	private _renderSlides(): string {
		if (this._hide) {
			return "";
		} else {
			const slideList: string[] = [];

			this._slideMetadataList.forEach((metadata) => {
				slideList.push(`
					<div
						class="slide ${metadata.status}"
						part="slide ${metadata.status}"
					>
						${metadata.text}
					</div>
				`);
			});
			return slideList.join("");
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
	 * Parses an attribute value to boolean.
	 * @param value value to parse
	 * @description Parses a value to boolean. If the value is "true" or true, it returns true, otherwise false.
	 * @returns {Boolean}
	 */
	private _parseBooleanAttribute(value: unknown): boolean {
		return value === "true" || value === true || value === "";
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

	private _initSlideMetadata(): void {
		this._currentIndex = 0;
		this._slideMetadataList = [];
		this._slides.forEach((text, index) => {
			this._slideMetadataList.push({
				index,
				status: index !== 0 ? SlideState.HIDE : SlideState.SHOW,
				text,
			});
		});
	}

	private _updateSlideStatus(index: number, state: SlideState): void {
		// update old "slide-out" statuses tp "hide"
		// there only can be one "slide-out" status"
		if (state === SlideState.SLIDE_OUT) {
			this._slideMetadataList.forEach((metadata) => {
				if (metadata.status === SlideState.SLIDE_OUT) {
					metadata.status = SlideState.HIDE;
				}
			});
		}
		this._slideMetadataList[index].status = state;
	}

	private _startTimer(): void {
		console.log(
			`%c ⚠️ [PANDA-TEXT-SLIDER] (_startTimer)`,
			"font-size: 24px; color: pink; background: black;",
			this._slides
		);
		this._sliderTimer = setInterval(() => {
			console.log(`%c ⚠️ [PANDA-TEXT-SLIDER] (tick)`, "font-size: 24px; color: green; background: black;");
			// set "slide-out" status on old placeholder
			this._updateSlideStatus(this._currentIndex, SlideState.SLIDE_OUT);
			this._currentIndex++;
			if (this._currentIndex >= this._slides.length) {
				this._currentIndex = 0;
			}
			// set "slide-in" status on new placeholder
			this._updateSlideStatus(this._currentIndex, SlideState.SLIDE_IN);
			// render component
			this._render();
		}, this._sliderInterval ?? DEFAULT_SLIDER_INTERVAL);
	}

	private _clearTimer(): void {
		// clear timer
		console.log(
			`%c ⚠️ [PANDA-TEXT-SLIDER] (_clearTimer)`,
			"font-size: 24px; color: red; background: black;",
		);
		clearInterval(this._sliderTimer);
	}

	/**
	 * Check if slides have changed by comparing old and new array of slides.
	 * This is to reduce the amount of slider resets when slides are provided inside loops.
	 * @param {Array} newSlides new slides
	 * @param {Array} oldSlides old slides
	 * @returns {Boolean} true if slides have changes
	 */
	private _slidesChanged(newSlides: string[] = [], oldSlides: string[] = []): boolean {
		if (newSlides.length !== oldSlides.length) {
			return true;
		}
		for (let i = 0; i < newSlides.length; i++) {
			if (newSlides[i] !== oldSlides[i]) {
				return true;
			}
		}
		return false; 
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	/** Reset component state and re-initialize slides */
	public reset(): void {
		if (this._slides.length >= 1) {
			console.log(
				`%c ⚠️ [PANDA-TEXT-SLIDER] (reset)`,
				"font-size: 24px; color: crimson; background: black;",
				this._slides
			);
			// re-initialize placeholder metadata list
			this._initSlideMetadata();
			// rerender component with new placeholder metadata after reset
			this._render();
			// clear timer
			this._clearTimer();
			// check if there are more than 1 placeholders to slide through
			if (this._slides.length > 1) {
				// start timer
				this._startTimer();
			}
		} else {
			console.log(
				`%c ⚠️ [PANDA-TEXT-SLIDER] No animation! Not enough slides!`,
				"font-size: 24px; color: crimson; background: black;",
				this._slides,
				typeof this._slides
			);
		}
	}

	/** stop slider animation and reset to first slide */
	public stop(): void {
		console.log(`%c ⚠️ [PANDA-TEXT-SLIDER] (stop)`, "font-size: 24px; color: crimson; background: black;");
		// re-initialize placeholder metadata list
		this._initSlideMetadata();
		// rerender component with new placeholder metadata after reset
		this._render();
		// clear timer
		this._clearTimer();
	}
}

// Register the custom element
if (!customElements.get("panda-text-slider")) {
	customElements.define("panda-text-slider", PandaTextSlider);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-text-slider": PandaTextSlider;
	}
}

// export type
export { type PandaTextSlider };