// types
import {
	GridMetadata,
	MousePosition,
	PanelMessageType,
	PanelMetadata,	
} from "../index";

// style
import { panelStyles } from "./styles/styles";

// components
// import "@panda-wbc/panda-icon";

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
	
	@property({ type: Number, attribute: "temp-top", reflect: true })
	tempTop: number | null = null;

	@property({ type: Number, reflect: true })
	left!: number;
	
	@property({ type: Number, attribute: "temp-left", reflect: true })
	tempLeft: number | null = null;

	/** Panels index in the grid layout */
	@property({ type: Number, reflect: true })
	index!: number;

	/** Property used to determine if panel is being dragged */
	@property({ type: Boolean, reflect: true })
	dragging: boolean = false;

	/** Property used to determine if panel is being dragged */
	@property({ type: Boolean, attribute: "temporary-position", reflect: true })
	temporaryPosition: boolean = false;

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
			console.log("%c (updated) _positionOffsetX / _positionOffsetY:", "font-size: 24px; color: red;", this._positionOffsetX, this._positionOffsetY);
			this._setTemporaryPosition();
		}
		// check for indicative position change
		// if (
		// 	_changedProps.has("tempTop") && this.tempTop !== undefined ||
		// 	_changedProps.has("tempLeft") && this.tempLeft !== undefined
		// ) {
		// }
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
		let absolute = "";
		if (this.temporaryPosition) {
			absolute = "absolute";
		}
		return html`
			<div
				class="panel ${absolute}"
				part="panel"
			>
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

	/** Update panel styling to reflect temporary position */
	private _updatePanelTemporaryPosition(): void {
		if (this.temporaryPosition) {

			const _tempTop = this.tempTop ?? 0;
			const _tempLeft = this.tempLeft ?? 0;
			// update panel indicative position
			const _top = (_tempTop - this.top) * this._columnWidth;
			const _left = (_tempLeft - this.left) * this._columnWidth;
			this.style.transform = `translate(${_left}px, ${_top}px)`;
		} else {
			this.style.transform = `translate(0px, 0px)`;
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
				index: this.index,
			}
		});
		this.dispatchEvent(event);
	}

	/** Get panel position/size metadata with applied offset */
	private _getPanelMetadataWithOffset(): PanelMetadata {
		// get top from offset
		const top = minValue(this.top + this._positionOffsetY, 0);
		// get left form offset
		let left = valueBetween(
			this.left + this._positionOffsetX,
			0, // min value
			this._maxColumns - this.width // max value
		);
		let width = this.width;
		
		// check if panel can be resized
		if (this.resizable) {
			left = valueBetween(
				this.left + this._positionOffsetX,
				0, // min value
				this._maxColumns - this.minWidth // max value
			);
			// check if width has to be adjusted
			if (this._maxColumns - left < this.width) {
				// resize panels width
				width = this._maxColumns - left;
			}
		}
		const right = left + width;
		const bottom = top + this.height;

		return {
			width,
			height: this.height,
			top,
			tempTop: this.tempTop,
			left,
			tempLeft: this.tempLeft,
			bottom,
			right,
			index: this.index
		};
	}

	/** Convert drag offset to new temporary panel position and inform grid */
	private _setTemporaryPosition(): void {
		// cancel if not dragging
		if (!this.dragging) {
			return;
		}

		// get temporary panel position with applied offset
		const {
			top,
			left,
			width,
			height,
		} = this._getPanelMetadataWithOffset();
		
		console.log("%c ⚡ (_setTemporaryPosition) TEMP POSITION t/l:", "font-size: 24px; color: red;", top, left);
		// notify grid about drag position
		this._triggerMessageEvent(
			PanelMessageType.DRAG_START,
			top,
			left,
			width,
			height,
		);
	}

	/** Convert drag offset to final panel position and notify grid */
	private _setFinalPosition(): void {
		// get temporary panel position with applied offset
		const {
			top,
			left,
			width,
		} = this._getPanelMetadataWithOffset();

		// check if position changed
		if (this.top !== top || this.left !== left || this.width !== width) {
			console.log("%c ⚡ (_setFinalPosition) FINAL POSITION t/l:", "font-size: 24px; color: red;", this.top, this.left);
			// set new position
			this.top = top;
			this.left = left;
			this.width = width;
			// notify grid about drag position
			this._triggerMessageEvent(
				PanelMessageType.DRAG_END,
				this.top,
				this.left,
				this.width,
				this.height,
			);
			// reset offset
			this._positionOffsetX = 0;
			this._positionOffsetY = 0;
		}
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public setTempPosition(top: number, left: number): void {
		console.log("%c >>>>>>>>>>>>>> (setTempPosition) PANEL %s %s %s", "font-size: 24px; color: red;", this.index, top, left);
		this.tempTop = top;
		this.tempLeft = left;
		this.temporaryPosition = true;
		this._updatePanelTemporaryPosition();
	}

	public resetTempPosition(): void {
		this.tempTop = null;
		this.tempLeft = null;
		this.temporaryPosition = false;
		this._updatePanelTemporaryPosition();
	}

	public applyTempPosition(): void {
		this.top = this.tempTop ?? this.top;
		this.left = this.tempLeft ?? this.left;
		this.tempTop = null;
		this.tempLeft = null;
		this.temporaryPosition = false;
		this._updatePanelTemporaryPosition();
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
		// console.log("%c 🖱️ (_onDragHandleMouseDown) event", "font-size: 24px; color: orange;", this._dragStartPosition.x, this._dragStartPosition.y);
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
		this._positionOffsetX = Math.round(distanceX / this._columnWidth) + 0;
		this._positionOffsetY = Math.round(distanceY / this._columnWidth) + 0;

		// console.log("%c 🖱️ (_onDragHandleMouseMove) offset", "font-size: 24px; color: orange;", this._positionOffsetX + 0, this._positionOffsetY + 0);

		// update panel position
		this.style.marginTop = `${this._mousePosition.y - this._dragStartPosition!.y}px`;
		this.style.marginLeft = `${this._mousePosition.x - this._dragStartPosition!.x}px`;
	}

	private _onDragHandleMouseUp(event: MouseEvent | TouchEvent): void {
		// console.log("%c 🖱️ (_onDragHandleMouseUp) event", "font-size: 24px; color: orange;", event);
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

		// set final position and notify grid about drag end
		this._setFinalPosition();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-grid-panel": PandaGridPanel;
	}
}
