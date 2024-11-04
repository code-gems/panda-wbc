// types
import { MousePosition, GridMetadata, PanelMessageType } from "../index";

// style
import { panelStyles } from "./styles/styles";

// components


// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getMousePosition, minValue, valueBetween } from "./utils/utils";

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
	top!: number;

	@property({ type: Number, reflect: true })
	left!: number;

	/** Panels order on the grid */
	@property({ type: Number, reflect: true })
	order!: number;

	/** Property used to determine if panel is being dragged */
	@property({ type: Boolean, reflect: true })
	dragging: boolean = false;

	// state props

	// grid / panel metadata ==============================

	/** column size used to calculate coordinates */
	private _columnWidth: number = 0;

	/** max number of available columns */
	private _maxColumns: number = 1; // must be at least 1

	/** prop used to determine if dragging of panel begun */
	// private _dragStart: boolean = false;

	/** prop representing the start coordinates of drag, used to calculate drag distance */
	private _dragStartPosition: MousePosition | null = null;

	/** Setting used to compare dragging distance */
	private _dragDistance: number = 50;

	/** Used to store x position offset calculated based on dragged distance and column width */
	@state()
	private _positionOffsetX: number = 0;
	
	/** Used to store y position offset calculated based on dragged distance and column width */
	@state()
	private _positionOffsetY: number = 0;

	private _mousePosition: MousePosition = {
		x: 0,
		y: 0,
	};

	// mouse events for drag handle
	private readonly _dragHandleMouseDownEvent = this._onDragHandleMouseDown.bind(this);
	private readonly _dragHandleMouseMoveEvent = this._onDragHandleMouseMove.bind(this);
	private readonly _dragHandleMouseUpEvent = this._onDragHandleMouseUp.bind(this);

	// elements
	private _dragHandleEl!: HTMLDivElement;

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
		// check for new temporary position
		if (
			_changedProps.has("_positionOffsetX") && this._positionOffsetX !== undefined ||
			_changedProps.has("_positionOffsetY") && this._positionOffsetY !== undefined
		) {
			this._calculateNewPosition();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove event listener
		this._dragHandleEl.removeEventListener("mousedown", this._dragHandleMouseDownEvent);
		document.removeEventListener("mousemove", this._dragHandleMouseMoveEvent);
		document.removeEventListener("mouseup", this._dragHandleMouseUpEvent);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<div class="panel" part="panel">
				<slot
					name="drag-handle"
					class="drag-handle"
					part="drag-handle"
					@slotchange="${this._onDragHandleSlotChange}"
				></slot>
				<slot></slot>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Parse grid metadata */
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

	/** Update panel size and position based on provided metadata */
	private _updatePanelStyle(): void {
		if (this.metadata) {
			console.log("%c [PANEL] (_updatePanelStyle)", "font-size: 24px; color: green;");
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

	private _triggerMessageEvent(
		type: PanelMessageType,
		top: number | null = null,
		left: number | null = null,
		width: number | null = null,
		height: number | null = null
	): void {
		const event = new CustomEvent("on-message", {
			detail: {
				type,
				top,
				left,
				width,
				height,
				order: this.order,
			}
		});
		this.dispatchEvent(event);
	}

	/** Convert drag offset to new panel position */
	private _calculateNewPosition(): void {
		const newTop = minValue(this.top + this._positionOffsetY, 0);
		const newLeft = valueBetween(
			this.left + this._positionOffsetX,
			0, // min value
			this._maxColumns - this.width // max value
		);
		console.log("%c ⚡ (_calculateNewPosition) top/left:", "font-size: 24px; color: red;", newTop, newLeft);
		// notify grid about drag position
		this._triggerMessageEvent(
			PanelMessageType.DRAG_START,
			newTop,
			newLeft,
			this.width,
			this.height,
		);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onDragHandleSlotChange(event: Event): void {
		const slotEl: any = event.target;
		const assignedElements = slotEl.assignedElements();

		// get drag handle element
		this._dragHandleEl = assignedElements[0];
		// add event listeners
		this._dragHandleEl.addEventListener("mousedown", this._dragHandleMouseDownEvent);
		document.addEventListener("mousemove", this._dragHandleMouseMoveEvent);
		document.addEventListener("mouseup", this._dragHandleMouseUpEvent);
		// document.addEventListener("touchmove", this._dragHandleMouseMoveEvent);
		// document.addEventListener("touchend", this._dragHandleMouseUpEvent);

		console.log("%c 👆🏻 [PANEL] (_onDragHandleSlotChange) assignedElements:", "font-size: 24px; color: orange;", assignedElements);
	}

	// ================================================================================================================
	// EVENTS - DRAG HANDLE ===========================================================================================
	// ================================================================================================================

	private _onDragHandleMouseDown(event: MouseEvent): void {
		if (!this.movable) {
			return;
		}
		// get mouse position
		this._dragStartPosition = getMousePosition(event);
		// start dragging
		this.dragging = true;
		console.log("%c 🖱️ (_onDragHandleMouseDown) event", "font-size: 24px; color: orange;", this._dragStartPosition.x, this._dragStartPosition.y);
	}

	private _onDragHandleMouseMove(event: MouseEvent | TouchEvent): void {
		if (!this.dragging) {
			return;
		}
		// get current mouse position
		this._mousePosition = getMousePosition(event);
		// calculate drag distance
		const distanceX: number = this._mousePosition.x - this._dragStartPosition!.x;
		const distanceY: number = this._mousePosition.y - this._dragStartPosition!.y;
		// Offset properties are being observed and each time they change,
		// panel will recalculate its temporary position and notify grid
		this._positionOffsetX = Math.round(distanceX / this._columnWidth);
		this._positionOffsetY = Math.round(distanceY / this._columnWidth);

		console.log("%c 🖱️ (_onDragHandleMouseMove) offset", "font-size: 24px; color: orange;", this._positionOffsetX + 0, this._positionOffsetY + 0);

		// update panel position
		this.style.marginTop = `${this._mousePosition.y - this._dragStartPosition!.y}px`;
		this.style.marginLeft = `${this._mousePosition.x - this._dragStartPosition!.x}px`;
	}

	private _onDragHandleMouseUp(event: MouseEvent | TouchEvent): void {
		console.log("%c 🖱️ (_onDragHandleMouseUp) event", "font-size: 24px; color: orange;", event);
		if (!this.dragging) {
			return;
		}
		// reset drag start coordinates
		this._dragStartPosition = null;
		
		// stop dragging
		this.dragging = false;
		
		// clear position offset
		this.style.marginTop = "0px";
		this.style.marginLeft = "0px";

		// notify grid about drag end
		this._triggerMessageEvent(PanelMessageType.DRAG_END);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-grid-panel": PandaGridPanel;
	}
}
