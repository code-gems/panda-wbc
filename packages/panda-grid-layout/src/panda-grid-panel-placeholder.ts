// types
import { GridMetadata } from "panda-grid-layout-types";

// styles
import { placeholderStyles } from "./styles/styles";

// utils
import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { valueBetween } from "./utils/utils";

@customElement("panda-grid-panel-placeholder")
export class PandaGridPanelPlaceholder extends LitElement {
	// css style
	static get styles() {
		return placeholderStyles;
	}

	@property({ type: Object })
	metadata!: GridMetadata;

	@property({ type: Number, reflect: true })
	width: number = 1;

	@property({ type: Number, reflect: true })
	height: number = 1;

	@property({ type: Number, reflect: true })
	top!: number;

	@property({ type: Number, reflect: true })
	left!: number;

	@property({ type: Boolean, attribute: "show", reflect: true })
	_show: boolean = false;

	// grid / panel metadata ==============================

	/** column size used to calculate coordinates */
	private _columnWidth: number = 0;

	/** max number of available columns */
	private _maxColumns: number = 1; // must be at least 1

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(_changedProps: PropertyValues): void {
		if (_changedProps.has("metadata") && this.metadata !== undefined) {
			// console.log("%c (updated) metadata:", "font-size: 16px; color: red;", this.metadata);
			this._parseGridMetadata();
			this._updatePanelStyle();
		}

		if (
			_changedProps.has("width") && this.width !== undefined ||
			_changedProps.has("height") && this.height !== undefined ||
			_changedProps.has("top") && this.top !== undefined ||
			_changedProps.has("left") && this.left !== undefined
		) {
			this._updatePanelStyle();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		return html`
			<div class="placeholder" part="placeholder">
				<slot></slot>
			</div>
		`;
	}

	/** Update panel size and position based on provided metadata */
	private _updatePanelStyle(): void {
		if (this.metadata) {
			// update width and height
			const _widthPx = valueBetween(
				this.width,
				1, // min
				this._maxColumns // max
			) * this._columnWidth;
			const _heightPx = this.height * this._columnWidth;
			// update width / height
			this.style.width = `${_widthPx}px`;
			this.style.height = `${_heightPx}px`;

			// console.log("%c 👆🏻 [PANEL] (_updatePanelStyle) width %s %s", "font-size: 16px; color: orange;", this.width, _widthPx);

			// update grid area props
			const _rowStart = this.top + 1;
			const _rowEnd = _rowStart + this.height;
			const _columnStart = this.left + 1;
			const _columnEnd = valueBetween(
				_columnStart + this.width + 1,
				1,
				this._maxColumns + 1
			);

			this.style.gridRowStart = String(_rowStart);
			this.style.gridColumnStart = String(_columnStart);
			this.style.gridRowEnd = String(_rowEnd);
			this.style.gridColumnEnd = String(_columnEnd);
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Parse grid metadata */
	private _parseGridMetadata(): void {
		const {
			columnWidth,
			maxColumns,
		} = this.metadata;
		this._columnWidth = columnWidth;
		this._maxColumns = maxColumns;
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public show(): void {
		this._show = true;
	}

	public hide(): void {
		this._show = false;
	}
	
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-grid-panel-placeholder": PandaGridPanelPlaceholder;
	}
}
