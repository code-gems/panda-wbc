// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, PropertyValueMap, TemplateResult, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement("panda-progress-bar")
export class PandaProgressBar extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: String })
	label!: string;

	@property({ type: Number })
	value: number = 0;

	@property({ type: Number })
	bufferValue: number = 0;

	@property({ type: Number })
	min: number = 0;

	@property({ type: Number })
	max: number = 100;

	@property({ type: Boolean, attribute: "show-progress-value", reflect: true })
	showProgressValue: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	indeterminate: boolean = false;

	// state props
	@state()
	private _progress: number = 0;
	private _bufferProgress: number = 0;

	// elements
	@query("#progress")
	private _progressEl!: HTMLDivElement;

	@query("#buffer-progress")
	private _bufferProgressEl!: HTMLDivElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		// update progress bar
		if (
			_changedProperties.has("value") && this.value !== undefined ||
			_changedProperties.has("bufferValue") && this.bufferValue !== undefined
		) {
			this._calculateProgress();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		let labelHtml: TemplateResult = html``;
		let progressValueHtml: TemplateResult = html``;

		if (this.label) {
			labelHtml = html`<div class="label" part="label">${this.label}</div>`;
		}

		if (this.showProgressValue) {
			progressValueHtml = html`
				<div
					class="progress-value"
					part="progress-value"
				>
					${this._progress}%
				</div>
			`;
		}

		return html`
			${labelHtml}
			<div class="progress-bar-cont" part="progress-bar-cont">
				${progressValueHtml}
				<div class="progress-bar" part="progress-bar">
					<div
						id="progress"
						class="progress"
						part="progress"
					></div>
					<div
						id="buffer-progress"
						class="buffer-progress"
						part="buffer-progress"
					></div>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _calculateProgress(): void {
		this._progress = Math.round(((this.value - this.min) / (this.max - this.min)) * 100);
		this._bufferProgress = Math.round(((this.bufferValue - this.min) / (this.max - this.min)) * 100);
		this._updateProgressWidth();
	}

	/** Update progress element width */
	private _updateProgressWidth(): void {
		this._progressEl.style.width = `${this._progress}%`;
		this._bufferProgressEl.style.width = `${this._bufferProgress}%`;
	}
	
	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	
	// ...
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-progress-bar": PandaProgressBar;
	}
}