// types
import { GridConfig, PanelMessageType, PanelMetadata } from "../index";
import { PandaGridPanel } from "./panda-grid-panel";

// style
import { styles } from "./styles/styles";

// components
import "./panda-grid-panel";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { isEmpty } from "@panda-wbc/panda-utils";
import {
	getPanelMetadata,
	isIntercepted,
	minValue,
	valueBetween,
} from "./utils/utils";

@customElement("panda-grid-layout")
export class PandaGridLayout extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: Object })
	gridConfig: GridConfig = {
		panelSize: 300,
		responsive: false,
	};

	/**
	 * When layout is set to responsive, panel size
	 * will be dynamically calculated based on available space.
	 * It will be not less than the panelSize value.
	 * 
	 * DEFAULT: false
	 */
	@property({ type: Boolean, reflect: true })
	responsive: boolean = false;

	// state props

	@state()
	private _panelList: PandaGridPanel[] = [];

	@state()
	private _panelListTemp: PandaGridPanel[] = [];


	// GRID METADATA ======================================

	/** Grid top position on the screen used for relative mouse position calculation */
	// private _gridTop: number = 0;
	
	/** Grid left position on the screen used for relative mouse position calculation */
	// private _gridLeft: number = 0;

	/** Grid element width used for column calculation */
	private _gridWidth: number = 0;

	private _panelSize: number = 0;

	/** This property is used to hold the final evaluation of the responsive setting */
	private _responsive: boolean = false;

	private _maxColumns: number = 1; // must be at least 1

	private _columnWidth: number = 300;

	private _dragDistance: number = 50;

	// events =============================================

	private _panelMessageEvent = this._onPanelMessage.bind(this);

	// elements ===========================================

	@query("#grid-layout")
	private _gridEl!: HTMLDivElement;
	
	@query("#placeholder")
	private _placeholderEl!: HTMLDivElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		// 	console.log("%c ⚡ (firstUpdated) _slottedPanels", "font-size: 24px; color: orange;", this._slottedElements);
		// 	this._panelList = parseGridPanels(this._slottedElements);

		this._initializeGrid();
	}

	// updated(_changedProps: PropertyValues): void {
	// 	console.log("%c ⚡ (updated) _changedProps", "font-size: 24px; color: red;", _changedProps);
	// 	console.log("%c ⚡ (updated) _slottedPanels", "font-size: 24px; color: red;", this._slottedElements);
	// }

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<div
				class="grid-layout-cont"
				part="grid-layout-cont"
			>
				<div
					id="grid-layout"
					class="grid-layout"
					part="grid-layout"
				>
					<div
						id="placeholder"
						class="placeholder"
						part="placeholder"
					>
					</div>
					<slot @slotchange="${this._onSlotChange}"></slot>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Calculate grid metadata */
	private _initializeGrid(): void {
		console.log("%c ⚡ [GRID] (_initializeGrid)", "font-size: 24px; color: blueviolet;");
		// deconstruct provided grid config first
		this._parseGridConfig();
		this._updateGridMetadata();
		this._updateGridLayoutStyles();
	}

	/** Map grid config settings and set default values */
	private _parseGridConfig(): void {
		console.log("%c ⚡ [GRID] (_parseGridConfig)", "font-size: 24px; color: blueviolet;");
		const {
			panelSize = 300,
			responsive = false,
			dragDistance = 50,
		} = this.gridConfig;

		this._panelSize = panelSize;
		this._dragDistance = dragDistance;
		this._responsive = responsive || this.responsive;
	}

	/** Update grid metadata based on available space and grid config */
	private _updateGridMetadata(): void {
		console.log("%c ⚡ [GRID] (_updateGridMetadata)", "font-size: 24px; color: blueviolet;");
		// get grid width
		const _gridRect: DOMRect = this._gridEl.getBoundingClientRect();
		this._gridWidth = _gridRect.width;
		// calculate max number of columns
		this._maxColumns = Math.floor(minValue(this._gridWidth / this._panelSize, 1));
		// calculate column width
		this._columnWidth = this._panelSize;
		if (this._responsive) {
			// for responsive grid, calculate column size dynamically
			// column width can't be less than panel size
			this._columnWidth = minValue(Math.round(this._gridWidth / this._maxColumns), this._panelSize);
		}

		console.log("%c panel size:", "font-size: 24px; color: blueviolet;", this._panelSize);
		console.log("%c grid width:", "font-size: 24px; color: blueviolet;", this._gridWidth);
		console.log("%c max columns:", "font-size: 24px; color: blueviolet;", this._maxColumns);
		console.log("%c column width:", "font-size: 24px; color: blueviolet;", this._columnWidth);
	}

	private _updateGridLayoutStyles(): void {
		this._gridEl.style.gridTemplateColumns = `repeat(${this._maxColumns}, ${this._columnWidth}px)`;
		this._gridEl.style.gridAutoRows = `${this._columnWidth}px`;
	}

	/**
	 * Parse slotted grid elements and return list of grid panels.
	 * Any other element will be ignored. 
	 * @param {Array<HTMLElement>} elements - list of all slotted grid elements
	 * @returns {Array<GridPanel>} list of grid panels
	 */
	private _parseGridPanels(elements: LitElement[]): void {
		console.log("%c [GRID] 🧑🏻‍💻 (_parseGridPanels) elements", "font-size: 24px; color: red;", elements);
		if (elements?.length) {
			Array.from(elements).forEach((element, index) => {
				// console.log("%c (parseGridPanels) element", "font-size: 24px; color: red;", element, element.tagName);
				if (element.tagName.toLocaleLowerCase() === "panda-grid-panel") {
					// console.log("%c (parseGridPanels) ADD ELEMENT", "font-size: 24px; color: red;", element);
					// set panel index property
					(element as PandaGridPanel).index = index;
					// set grid metadata onto panel element
					(element as PandaGridPanel).metadata = {
						columnWidth: this._columnWidth,
						maxColumns: this._maxColumns,
						dragDistance: this._dragDistance,
					};
					// find suitable position for all slotted panels
					this._initializePanelPosition(element as PandaGridPanel);
					// add events to panel
					element.addEventListener("on-message", this._panelMessageEvent);
					// add panels to the list
					this._panelList.push(element as PandaGridPanel);
				}
			});
		}
	}

	/**
	 * Find suitable position for panel unless it has top/left attributes already
	 * @param {PandaGridPanel} panel - grid panel element handle 
	 */
	private _initializePanelPosition(panel: PandaGridPanel): void {
		console.log("%c 🚀 (_initializePanelPosition)", "font-size: 24px; color: orange;", panel, isEmpty(panel?.top), isEmpty(panel?.left));
		if (!isEmpty(panel?.top) && !isEmpty(panel?.left)) {
			console.log("%c 🚀 (_initializePanelPosition) PANEL ALREADY HAS POSITION ASSIGNED ============================", "font-size: 24px; color: pink;", panel, panel.top, panel.left);

		} else {
			let found: boolean = false;
			let top: number = 0;
			let left: number = 0;
			console.log("%c 🚀 (_initializePanelPosition) START ============================", "font-size: 24px; color: red;");

			// fine empty space for panel to fit in
			while (!found) {
				let right = left + panel.width;

				console.log("%c right:", "font-size: 24px; color: red;", right);
				console.log("%c left + panel.width:", "font-size: 24px; color: red;", left + panel.width);
				console.log("%c panel.minWidth:", "font-size: 24px; color: red;", panel.minWidth);
				console.log("%c max columns:", "font-size: 24px; color: red;", this._maxColumns);

				// check if panel is too long and protrudes outside of the available space
				if (right > this._maxColumns) {
					left = 0;
					top++;
					console.log("%c 🚀 (_initializePanelPosition) MOVE TO THE NEXT ROW =======", "font-size: 24px; color: red;");
				}

				// make sure panel won't be sized less then minWidth
				right = valueBetween(
					left + panel.width,
					panel.minWidth,
					this._maxColumns
				);

				const bottom = top + panel.height;
				const panelMetadata: PanelMetadata = {
					...getPanelMetadata(panel),
					top,
					left,
					right,
					bottom,
				};

				let collide = false;
				for (const obstacle of this._panelList) {
					console.log("%c 🚀 (_initializePanelPosition) OBSTACLE LOOP =========================", "font-size: 24px; color: red;");
					const obstacleMetadata = getPanelMetadata(obstacle);
					if (isIntercepted(panelMetadata, obstacleMetadata)) {
						collide = true;
						break;
					}
				}

				if (!collide) {
					found = true; // exit loop
					panel.top = panelMetadata.top;
					panel.left = panelMetadata.left;

					console.log("%c 🚀 (_initializePanelPosition) set position:", "font-size: 24px; color: red;", panelMetadata);
				}
				// move left and try again
				left++;
				if (collide) {
					console.log("%c 🚀 (_initializePanelPosition) MOVE LEFT ============================", "font-size: 24px; color: red;");
				}
			} // end of loop
		}
	}

	/**
	 * Check if provided panel metadata is colliding with other grd panels and resolve collision.
	 * @param {PanelMetadata} panelMetadata - metadata of a panel
	 */
	private _detectCollision(panelMetadata: PanelMetadata): void {
		this._panelList.forEach((obstacle) => {
			// skip panel that initiated collision
			if (obstacle.index !== panelMetadata.index) {
				// get obstacle metadata
				const obstacleMetadata = getPanelMetadata(obstacle);
				// check if obstacle is colliding
				if (isIntercepted(panelMetadata, obstacleMetadata)) {
					console.log("%c [GRID] ⚡ (_detectCollision) COLLISION:", "font-size: 24px; color: red;", obstacle.index);
					obstacle.tempLeft = panelMetadata.left + panelMetadata.width - obstacle.left;
					console.log("%c [GRID] ⚡ (_detectCollision) TEMP LEFT:", "font-size: 24px; color: red;", obstacle.tempLeft);
				} else {
					console.log("%c [GRID] ⚡ (_detectCollision) NO COLLISION:", "font-size: 24px; color: red;", obstacle.index);
					obstacle.tempLeft = 0;
				}
			} else {
				console.log("%c [GRID] ⚡ (_detectCollision) SKIP INDEX:", "font-size: 24px; color: red;", panelMetadata.index);
			}
		});
	}


	// private _fixCollision(panelMetadata: PanelMetadata, obstacleMetadata: PanelMetadata): PanelMetadata {
	// 	if (panelMetadata.index > obstacleMetadata.index) {
	// 		return obstacleMetadata;
	// 	} else {

	// 	}
	// 	newMetadata: PanelMetadata = 
	// 	return {

	// 	};
	// }

	/**
	 * Find panel element by index and return its handle.
	 * @param {Number} index - panel index
	 * @returns {PandaGridPanel} panel handle that matches provided index or [undefined]
	 */
	private _getPanelByIndex(index: number): PandaGridPanel | undefined {
		return this._panelList.find((panel) => panel.index === index);
	}

	private _showPlaceholder(top: number, left: number, width: number, height: number): void {
		// update grid area props
		const _rowStart = top + 1;
		const _rowEnd = _rowStart + height;
		const _columnStart = left + 1;
		const _columnEnd = _columnStart + width;
		
		this._placeholderEl.style.gridRowStart = String(_rowStart);
		this._placeholderEl.style.gridColumnStart = String(_columnStart);
		this._placeholderEl.style.gridRowEnd = String(_rowEnd);
		this._placeholderEl.style.gridColumnEnd = String(_columnEnd);
		this._placeholderEl.classList.add("show");
	}
	
	private _hidePlaceholder(): void {  
		this._placeholderEl.classList.remove("show");
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onSlotChange(event: Event): void {
		const slotEl: any = event.target;
		const assignedElements = slotEl.assignedElements();
		console.log("%c ⚡ [GRID] (_onSlotChange) assignedElements", "font-size: 24px; color: orange;", assignedElements.length, assignedElements);
		// parse slotted elements and create list of grid panels
		this._panelList = [];
		this._parseGridPanels(assignedElements);
	}

	private _onPanelMessage(event: any): void {
		console.log("%c ⚡ [GRID] (_onPanelMessage) event target:", "font-size: 24px; color: blueviolet;", event.detail);
		const { type, top, left, width, height, index } = event.detail;
		
		// check message type
		switch (type) {
			case PanelMessageType.DRAG_START:
				this._showPlaceholder(top, left, width, height);
				const thisPanel = this._getPanelByIndex(index);
				console.log("%c ⚡ [GRID] (_onPanelMessage) 1. thisPanel:", "font-size: 24px; color: blueviolet;", thisPanel);
				if (thisPanel) {
					let panelMetadata = getPanelMetadata(thisPanel);
					// apply temporary new position
					panelMetadata = {
						...panelMetadata,
						top,
						left,
						width,
						height,
						right: left + width,
						bottom: top + height,
					};
					console.log("%c ⚡ [GRID] (_onPanelMessage) 2. panelMetadata:", "font-size: 24px; color: blueviolet;", panelMetadata);
					this._detectCollision(panelMetadata);
				}
				break;
			case PanelMessageType.DRAG_END:
				this._hidePlaceholder();
				break;
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-grid-layout": PandaGridLayout;
	}
}
