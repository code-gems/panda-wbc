// types
import { MousePosition, GridMetadata } from "../index";

// style
import { panelStyles } from "./styles/styles";

// components


// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getMousePosition } from "./utils/utils";

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

	@property({ type: Number, reflect: true })
	order!: number;

	/**
	 * Property used to determine if panel was dragged far enough to count it as reposition attempt.
	 * For internal use only.
	 */
	@property({ type: Boolean, reflect: true })
	dragging: boolean = false;

	// state props

	// grid / panel metadata ==============================
	
	/** panel top position on the page used to calculate relative mouse position */
	private _panelTop: number = 0;
	
	/** panel left position on the page used to calculate relative mouse position */
	private _panelLeft: number = 0;
	
	/** column size used to calculate coordinates */
	private _columnWidth: number = 0;

	/** max number of available columns */
	private _maxColumns: number = 1; // must be at least 1

	/** prop used to determine if dragging of panel begun */
	private _dragStart: boolean = false;

	/** prop representing the start coordinates of drag, used to calculate drag distance */
	private _dragStartPosition: MousePosition | null = null;

	/** setting used to compare dragging distance */
	private _dragDistance: number = 50;

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

	private _triggerMoveStartEvent() {
		const event = new CustomEvent("on-move-start", {
			detail: {
				top: 0,
				left: 0,
				width: this.width,
				height: this.height,
			}
		});
		this.dispatchEvent(event);
	}

	private _triggerMoveEndEvent() {
		const event = new CustomEvent("on-move-end", {
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

		console.log("%c 👆🏻 (_onDragHandleSlotChange) assignedElements", "font-size: 24px; color: orange;", assignedElements);
	}

	// ================================================================================================================
	// EVENTS - DRAG HANDLE ===========================================================================================
	// ================================================================================================================

	private _onDragHandleMouseDown(event: MouseEvent): void {
		// event.stopPropagation();
		// event.preventDefault();
		if (!this.movable) {
			return;
		}

		const panelRect = this.getBoundingClientRect();
		this._panelTop = panelRect.top;
		this._panelLeft = panelRect.left;
		console.log("%c 🖱️ (_onDragHandleMouseDown) panelLeft:", "font-size: 24px; color: orange;", this._panelLeft);
		console.log("%c 🖱️ (_onDragHandleMouseDown) panelTop:", "font-size: 24px; color: orange;", this._panelTop);

		// get mouse position
		this._dragStartPosition = getMousePosition(event, this._panelLeft, this._panelTop);
		// start dragging
		this._dragStart = true;
		console.log("%c 🖱️ (_onDragHandleMouseDown) event", "font-size: 24px; color: orange;", this._dragStartPosition.x, this._dragStartPosition.y);
		
	}

	private _onDragHandleMouseMove(event: MouseEvent | TouchEvent): void {
		if (!this._dragStart) {
			return;
		}

		// get current mouse position
		this._mousePosition = getMousePosition(event, this._panelLeft, this._panelTop);

		console.log(
			"%c 🖱️ (_onDragHandleMouseMove) top, left", "font-size: 24px; color: orange;",
			this._panelTop,
			this._panelLeft
		);
		
		// calculate drag distance
		const distance: number = Math.sqrt(
			Math.pow(this._dragStartPosition!.x - this._mousePosition.x, 2) +
			Math.pow(this._dragStartPosition!.y - this._mousePosition.y, 2)
		);
		
		if (distance >= this._dragDistance) {
			this.dragging = true;
		}
		
		// update panel position
		
		console.log(
			"%c 🖱️ (_onDragHandleMouseMove) distance, x/y", "font-size: 24px; color: orange;",
			distance,
			this._mousePosition.x,
			this._mousePosition.y
		);
		// this.style.transform = `translate(${this._mousePosition.x}, ${this._mousePosition.y})`;
		this.style.marginTop = `${this._mousePosition.y}px`;
		this.style.marginLeft = `${this._mousePosition.x}px`;
		// event.stopPropagation();
		// event.preventDefault();
	}

	private _onDragHandleMouseUp(event: MouseEvent | TouchEvent): void {
		console.log("%c 🖱️ (_onDragHandleMouseUp) event", "font-size: 24px; color: orange;", event);
		if (!this._dragStart) {
			return;
		}
		// reset drag start coordinates
		this._dragStartPosition = null;
		// stop dragging
		this._dragStart = false;
		this.dragging = false;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-grid-panel": PandaGridPanel;
	}
}
