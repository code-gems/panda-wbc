// types
import { MousePosition, GridMetadata } from "../index";

// style
import { panelStyles } from "./styles/styles";

// components


// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-grid-panel")
export class PandaGridPanel extends LitElement {
	// css style
	static get styles() {
		return panelStyles;
	}

	@property({ type: Object })
	metadata!: GridMetadata;

	@property({ type: Boolean, reflect: true })
	resizable: boolean = false;

	@property({ type: Boolean, reflect: true })
	movable: boolean = false;
	
	@property({ type: Boolean, reflect: true })
	pinned: boolean = false;

	@property({ type: Number, attribute: "panel-size", reflect: true })
	panelSize!: number;

	@property({ type: Number, reflect: true })
	width: number = 1;

	@property({ type: Number, attribute: "min-width", reflect: true })
	minWidth: number = 1;

	@property({ type: Number, attribute: "max-width", reflect: true })
	maxWidth: number | null = null;

	@property({ type: Number, reflect: true })
	height: number = 1;

	@property({ type: Number, attribute: "min-height", reflect: true })
	minHeight: number = 1;

	@property({ type: Number, attribute: "max-height", reflect: true })
	maxHeight: number | null = null;

	@property({ type: Number, reflect: true })
	top: number = 0;

	@property({ type: Number, reflect: true })
	left: number = 0;

	@property({ type: Number, reflect: true })
	order!: number;

	/** For internal use only */
	@property({ type: Boolean, reflect: true })
	dragging: boolean = false;

	// state props

	private _columnWidth: number = 0;

	private _maxColumns: number = 1; // must be at least 1

	private _dragDistance: number = 50;

	private _mousePosition: MousePosition = {
		x: 0,
		y: 0,
	};

	// elements


	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(_changedProps: PropertyValues): void {
		if (_changedProps.has("metadata") && this.metadata !== undefined) {
			console.log("%c (updated) metadata:", "font-size: 24px; color: red;", this.metadata);
			this._parseGridMetadata();
			this._updatePanelStyle();
		}
		
		if (
			_changedProps.has("width") && this.width !== undefined ||
			_changedProps.has("height") && this.height !== undefined ||
			_changedProps.has("top") && this.top !== undefined ||
			_changedProps.has("left") && this.left !== undefined
		) {
			console.log("%c (updated) width:", "font-size: 24px; color: red;", this.width);
			this._updatePanelStyle();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<div class="panel" part="panel">
				<slot name="drag-handle" part="drag-handle"></slot>
				<slot></slot>
				<button
					@click="${this._onResize}"
				>
					RESIZE
				</button>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _parseGridMetadata(): void {
		const {
			columnWidth,
			maxColumns,
			dragDistance,
		} = this.metadata;
		this._columnWidth = columnWidth;
		this._maxColumns = maxColumns;
		this._dragDistance = dragDistance;
	}

	private _triggerMoveEvent() {
		const event = new CustomEvent("on-move", {
			detail: {
				top: 0,
				left: 0,
				width: this.width,
				height: this.height,
			}
		});
		this.dispatchEvent(event);
	}

	private _triggerResizeEvent() {
		const event = new CustomEvent("on-resize", {
			detail: {
				width: 0,
				height: 0,
			}
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Update panel size and position based on provided metadata */
	private _updatePanelStyle(): void {
		if (this.metadata) {
			console.log("%c (_updatePanelStyle) width:", "font-size: 24px; color: red;");
			// update width and height
			const _widthPx = this.width * this._columnWidth;
			const _heightPx = this.height * this._columnWidth;
			this.style.width = `${_widthPx}px`;
			this.style.height = `${_heightPx}px`;

			// update grid area props
			const _rowStart = this.top + 1;
			const _rowEnd = _rowStart + this.height;
			const _columnStart = this.left + 1;
			const _columnEnd = _columnStart + this.width;
			
			this.style.gridRowStart = String(_rowStart);
			this.style.gridColumnStart = String(_columnStart);
			this.style.gridRowEnd = String(_rowEnd);
			this.style.gridColumnEnd = String(_columnEnd);
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onResize(): void {
		this.width = 2;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-grid-panel": PandaGridPanel;
	}
}
