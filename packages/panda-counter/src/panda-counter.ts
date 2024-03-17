// types
import { PandaCounterAnimation, PandaCounterStyle } from "../index";

// style
import { styles } from "./styles/styles";

// components
import "./panda-counter-panel";

// utils
import { LitElement, html, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { debounce } from "@panda-wbc/panda-core";

@customElement("panda-counter")
export class PandaCounter extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: String, attribute: true, reflect: true })
	theme: string = "";

	@property({ type: String, attribute: true })
	label: string | null = null;
	
	@property({ type: String })
	value!: unknown;

	@property({ type: Number, attribute: "counter-style" })
	counterStyle: PandaCounterStyle = PandaCounterStyle.DECIMAL;

	@property({ type: Number, attribute: "minimum-fraction-digits" })
	minimumFractionDigits: number = 0;

	@property({ type: Number, attribute: "maximum-fraction-digits" })
	maximumFractionDigits: number = 2;

	@property({ type: String })
	charSet!: string[];

	@property({ type: String })
	animation: PandaCounterAnimation = PandaCounterAnimation.EASE;

	@property({ type: Boolean })
	debounce: boolean = false;

	// state props
	@state()
	private _charSet: string[] = [];
	
	@state()
	private _charList: string[] = [];

	@state()
	private _textHeight!: number;

	// elements
	@query("#text-metrics")
	private _textMetricsEl!: Element;

	// timers
	private _initTimer!: number;

	// debouncer
	private _parseValueDebounce: any = debounce(this._parseValue.bind(this), 500, 2000);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated() {
		// parse provided value on first render
		this._parseValue();
		this._initTimer = setTimeout(() => {
			this._getTextHeight();
		}, 100);
	}

	protected updated(changedProps: PropertyValues): void {
		// check if value changed
		if (changedProps.has("value") && this.value !== undefined) {
			if (this.debounce) {
				this._parseValueDebounce();
			} else {
				this._parseValue();
			}
		}
		// check counter style and apply proper char set
		if (changedProps.has("counterStyle") && this.counterStyle !== undefined) {
			switch(this.counterStyle) {
				case (PandaCounterStyle.ALPHANUMERIC):
					this._charSet = [
						"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
						"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
						"~", "!", "?", "\"", "'", "/", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]", "{", "}", "<", ">", ":", ";", "_", "=", "`", "\\", "|",
						"-", "+", ",", ".", " ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " "
					];
					break;
				// PandaCounterStyle.DECIMAL
				// PandaCounterStyle.CURRENCY
				default:
					this._charSet = ["-", "+", ",", ".", " ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " "];
					break;
			}
		}
		// check if we have custom char set
		if (changedProps.has("charSet") && this.charSet !== undefined) {
			this._charSet = [...this.charSet];
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// clean up
		if (this._initTimer) {
			clearTimeout(this._initTimer);
		}
		// cancel debouncer
		this._parseValueDebounce.cancel();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		let labelHtml: TemplateResult = html``;

		// generate label if defined
		if (this.label) {
			labelHtml = html`
				<div class="label" part="label">
					${this.label}
				</div>
			`;
		}

		return html`
			${labelHtml}
			<div class="counter" part="counter">
				<div id="text-metrics" class="text-metrics">${this._charSet.join("")}</div>
				<slot name="prefix"></slot>
				${this._renderPanels()}
				<slot name="suffix"></slot>
			</div>
		`;
	}

	private _renderPanels(): TemplateResult[] {
		return this._charList.map((char, index) => {
			return html`
				<panda-counter-panel
					.theme="${this.theme}"
					.animation="${this.animation}"
					.index="${index}"
					.char="${char}"
					.charSet="${this._charSet}"
					.textHeight="${this._textHeight}"
				>
				</panda-counter-panel>
			`;
		});
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Parse value to string and break it to individual characters */
	private _parseValue(): void {
		if (this.value !== null && this.value !== undefined) {
			this._charList = [];
			let value: string | number = String(this.value) || "";
			// check counter style		
			if (this.counterStyle === PandaCounterStyle.CURRENCY) {
				value = parseFloat(value);
				if (isNaN(value)) {
					value = 0;
				}
				value = value.toLocaleString("en-US", {
					style: "decimal",
					minimumFractionDigits: this.minimumFractionDigits,
					maximumFractionDigits: this.maximumFractionDigits,
				});
			}
			this._charList = value.split("");
		}
	}

	private _getTextHeight(): void {
		const _textMetricsRect = this._textMetricsEl.getBoundingClientRect();
		this._textHeight = _textMetricsRect.height;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-counter": PandaCounter;
	}
}
