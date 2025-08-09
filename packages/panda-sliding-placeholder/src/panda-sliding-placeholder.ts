// types

const enum PlaceholderState {
	HIDE = "hide",
	SHOW = "show",
	SLIDE_IN = "slide-in",
	SLIDE_OUT = "slide-out",
}

type PlaceholderMetadata = {
	index: number;
	status: string;
	placeholder: string;
}

// style
import { styles } from "./styles/styles";

// constants
const DEFAULT_SLIDE_INTERVAL = 4000;

export class PandaSlidingPlaceholder extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
	static readonly observedAttributes = [
		"placeholders",
		"hide",
		"slide-interval",
	];
	
	// placeholders ===================================================================================================
	private _placeholders!: string[];
	
	get placeholders(): string[] {
		return this._placeholders;
	}

	set placeholders(value: string[]) {
		if (this._placeholders !== value) {
			this._placeholders = value;
			// reset component and animation
			this._reset();
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
			console.log(`%c (property changed) hide: `, "font-size: 24px; color: crimson; background: black;", value);
			this._hide = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("hide", "");
				// clear animation timer
				this._clearTimer();
			} else {
				this.removeAttribute("hide");
				// start animation timer
				this._reset();
			}
		}
	}

	// slideInterval ==================================================================================================
	private _slideInterval!: number;
		
	get slideInterval(): number {
		return this._slideInterval;
	}

	set slideInterval(value: number) {
		console.log(`%c ⚡ set slideInterval`, "font-size: 24px; color: orange; background: black;", value);
		if (this._slideInterval !== value) {
			this._slideInterval = this._parseNumberAttribute(value, DEFAULT_SLIDE_INTERVAL) as number;
			// reflect to attribute
			this.setAttribute("slide-interval", this._slideInterval + "");
		}
	}

	// view properties ================================================================================================

	private _placeholderMetadataList!: PlaceholderMetadata[];

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
		this._placeholders = [];
		this._placeholderMetadataList = [];
		this._currentIndex = 0;
		this._slideInterval = DEFAULT_SLIDE_INTERVAL;
		this._hide = false;
		// start animation timer
		this._reset();
		// render component
		this._render();
	}

	disconnectedCallback() {
		// clear timer
		this._clearTimer();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "placeholders") {
			this._placeholders = _newValue;
		}
		if (_name === "hide") {
			console.log(`%c (attr changed) hide: `, "font-size: 24px; color: crimson; background: black;", this._parseBooleanAttribute(_newValue));
			this._hide = this._parseBooleanAttribute(_newValue);
		}
		if (_name === "slide-interval") {
			this._slideInterval = this._parseNumberAttribute(_newValue, DEFAULT_SLIDE_INTERVAL) as number;
		}
		this._render();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	private _render() {
		if (this.shadowRoot) {
			// render component template
			this.shadowRoot.innerHTML = /*html*/`
				<div class="placeholder-cont" part="placeholder-cont">
					${this._renderPlaceholders()}
				</div>
			`;
		}
	}

	private _renderPlaceholders(): string {
		if (this._hide) {
			return "";
		} else {
			const placeholderList: string[] = [];

			this._placeholderMetadataList.forEach((metadata) => {
				placeholderList.push(`
					<div
						class="placeholder ${metadata.status}"
						part="placeholder ${metadata.status}"
					>
						${metadata.placeholder}
					</div>
				`);
			});
			return placeholderList.join("");
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

	private _initPlaceholderMetadata(): void {
		this._currentIndex = 0;
		this._placeholderMetadataList = [];
		this._placeholders.forEach((placeholder, index) => {
			this._placeholderMetadataList.push({
				index,
				status: index !== 0 ? PlaceholderState.HIDE : PlaceholderState.SHOW,
				placeholder,
			});
		});
	}

	private _updatePlaceholderStatus(index: number, state: PlaceholderState): void {
		// update old "slide-out" statuses tp "hide"
		// there only can be one "slide-out" status"
		if (state === PlaceholderState.SLIDE_OUT) {
			this._placeholderMetadataList.forEach((metadata) => {
				if (metadata.status === PlaceholderState.SLIDE_OUT) {
					metadata.status = PlaceholderState.HIDE;
				}
			});
		}
		this._placeholderMetadataList[index].status = state;
	}

	private _startTimer(): void {
		this._sliderTimer = setInterval(() => {
			console.log(`%c start timer: ${this._currentIndex}`, "font-size: 24px; color: green; background: black;");
			// set "slide-out" status on old placeholder
			this._updatePlaceholderStatus(this._currentIndex, PlaceholderState.SLIDE_OUT);
			this._currentIndex++;
			if (this._currentIndex >= this._placeholders.length) {
				this._currentIndex = 0;
			}
			// set "slide-in" status on new placeholder
			this._updatePlaceholderStatus(this._currentIndex, PlaceholderState.SLIDE_IN);
			// render component
			this._render();
		}, this._slideInterval);
	}

	private _clearTimer(): void {
		// clear timer
		clearInterval(this._sliderTimer);
	}

	private _reset(): void {
		if (this._placeholders.length >= 1) {
			// re-initialize placeholder metadata list
			this._initPlaceholderMetadata();
			// rerender component with new placeholder metadata after reset
			this._render();
			// clear timer
			this._clearTimer();
			// check if there are more than 1 placeholders to slide through
			if (this._placeholders.length > 1) {
				// start timer
				this._startTimer();
			}
		}
	}
}

// Register the custom element
if (!customElements.get("panda-sliding-placeholder")) {
	customElements.define("panda-sliding-placeholder", PandaSlidingPlaceholder);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-sliding-placeholder": PandaSlidingPlaceholder;
	}
}
