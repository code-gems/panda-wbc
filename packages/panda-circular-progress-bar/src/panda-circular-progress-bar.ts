// types
// ...

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, svg, TemplateResult, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("panda-circular-progress-bar")
export class PandaCircularProgressBar extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: Number })
	value!: number;

	@property({ type: Number, attribute: "gradient-angle" })
	gradientAngle: number = 180;

	@property({ type: Number, attribute: true })
	thickness: number = 5;

	@property({ type: Boolean, attribute: "show-scale", reflect: true })
	showScale: boolean = false;
	
	@property({ type: Boolean, attribute: true, reflect: true })
	dashed: boolean = false;
	
	@property({ type: Boolean, attribute: true, reflect: true })
	busy: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	counterclockwise: boolean = false;

	// state props
	@state()
	private _progress: number = 0;

	@state()
	private _value: number = 0;

	@state()
	private _radius: number = 0;

	@state()
	private _dashArray: number = 0;

	// timers
	private _animationTimer!: number;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	public connectedCallback(): void {
		super.connectedCallback();
		this._radius = 50 - (this.thickness / 2);
		this._dashArray = 2 * Math.PI * this._radius;
		this._progress = this._dashArray; // set progress to 0
	}

	updated(_changedProps: PropertyValues): void {
		if (_changedProps.has("value") && this.value !== undefined) {
			this._updateProgress();
		}
		// animate progress after getting back from busy state
		if (_changedProps.has("busy") && this.busy !== undefined) {
			if (this.busy) {
				this._progress = this._dashArray;
			} else {
				this._updateProgress();
			}
		}
	}

	public disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove timeout
		clearTimeout(this._animationTimer);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<div class="progress-bar-cont" part="progress-bar-cont">
				<div
					class="progress-bar ${this.busy ? "busy" : ""} ${this.dashed ? "dashed" : ""}"
					part="progress-bar"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						version="1.1"
						width="100%"
						height="100%"
						x="0"
						y="0"
						viewBox="0 0 100 100"
					>
						<defs>
							<linearGradient
								id="gradient"
								gradientTransform="rotate(${this.gradientAngle} 0.5 0.5)"
							>
								<stop
									offset="0%"
									stop-color="var(--panda-circular-progress-bar-gradient-color-start, hsl(209deg 78% 46%))"
									stop-opacity="1"
								/>
								<stop
									offset="100%"
									stop-color="var(--panda-circular-progress-bar-gradient-color-end, hsl(160deg 81% 43%))"
									stop-opacity="1"
								/>
							</linearGradient>
							<clipPath
								id="clipPath"
								class="clip-path ${this.dashed ? "animate" : ""}"
								part="clip-path"	
							>
								${this._renderClipPath()}
							</clipPath>
						</defs>
						<circle
							class="scale ${this.showScale ? "show" : ""}"
							part="scale"
							cx="50"
							cy="50"
							r="${this._radius}"
							fill="none"
							stroke="var(--panda-border-color)"
							stroke-linecap="butt"
						/>
						<circle
							class="progress"
							part="progress"
							cx="50"
							cy="50"
							r="${this._radius}"
							stroke-width="${this.thickness}"
							stroke-dasharray="${this._dashArray}"
							stroke-dashoffset="${this._progress}"
						/>
						<circle
							class="loader"
							part="loader"
							cx="50"
							cy="50"
							r="${this._radius}"
							stroke-width="${this.thickness}"
							stroke-dasharray="${this._dashArray}"
						/>
					</svg>
				</div>
				<div class="content">
					<slot></slot>
				</div>
			</div>
		`;
	}

	private _renderClipPath() {
		if (this.dashed) {
			const clipPathSvg = [];
			for (let i = 0; i < 50; i++) {
				const angle = 90 + (i * 7.2);
				clipPathSvg.push(svg`<polygon points="50 0 52 0 50 50 50 0" transform="rotate(${angle} 50 50)" />`);
			}
			return clipPathSvg;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _updateProgress() {
		this._animationTimer = setTimeout(() => {
			this._value = this._parseValue();
			this._progress = this._dashArray - (this._value * this._dashArray) / 100;
		}, 0);
	}

	private _parseValue(): number {
		let _value: number = this.value;
		if (_value >= 100) {
			_value = 100;
		} else if (_value < 0) {
			_value = 0;
		}

		if (this.counterclockwise) {
			_value = _value * -1;
		}

		return _value;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-circular-progress-bar": PandaCircularProgressBar;
	}
}