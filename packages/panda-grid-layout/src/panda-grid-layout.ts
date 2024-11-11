// types
import { GridConfig, PanelMessageType, PanelMetadata } from "../index";
import { PandaGridPanel } from "./panda-grid-panel";

// style
import { styles } from "./styles/styles";

// components
import "./panda-grid-panel";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query, queryAssignedElements, state } from "lit/decorators.js";
import { debounce, isEmpty } from "@panda-wbc/panda-utils";
import {
	getPanelMetadata,
	isColliding,
	isIntercepted,
	isProtruding,
	minValue,
	repositionPanel,
	serializePanelMetadata,
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

	// GRID METADATA ======================================

	/** Grid element width used for column calculation */
	private _gridWidth: number = 0;

	private _panelSize: number = 0;

	/** This property is used to hold the final evaluation of the responsive setting */
	private _responsive: boolean = false;

	private _maxColumns: number = 1; // must be at least 1

	private _columnWidth: number = 300;

	private _resizeObserver!: ResizeObserver;

	/** This property is used to ignore initial resize observer invocation */
	private _initializeResizeObserver: boolean = false;

	/** This property is used to ignore grid resize event while in the middle of dragging panel to new location */
	private _ignoreGridResize: boolean = false;

	// events =============================================

	private _panelMessageEvent = this._onPanelMessage.bind(this);

	// timers =============================================

	private _sizeChangeTimer!: ReturnType<typeof setTimeout>;

	// debouncers =========================================

	private _gridResizeDebouncer = debounce(this._onGridResize.bind(this), 500);

	// elements ===========================================

	@query("#grid-layout")
	private _gridEl!: HTMLDivElement;

	@query("#placeholder")
	private _placeholderEl!: HTMLDivElement;

	@queryAssignedElements()
	private _slottedPanels!: LitElement[];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		// register resize observer
		const resizeObserver = new ResizeObserver(this._gridResizeDebouncer);
		resizeObserver.observe(this);
	}

	protected firstUpdated(): void {
		this._initializeGrid();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// cancel timers
		clearTimeout(this._sizeChangeTimer);
		// disconnect resize observer
		this._resizeObserver.disconnect();

		// cancel debouncer
		this._gridResizeDebouncer.cancel();
	}

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
		// console.log("%c ⚡ [GRID] (_initializeGrid)", "font-size: 16px; color: blueviolet;");
		// deconstruct provided grid config first
		this._parseGridConfig();
		this._updateGridMetadata();
		this._updateGridLayoutStyles();
	}

	/** Map grid config settings and set default values */
	private _parseGridConfig(): void {
		// console.log("%c ⚡ [GRID] (_parseGridConfig)", "font-size: 16px; color: blueviolet;");
		const {
			panelSize = 300,
			responsive = false,
		} = this.gridConfig;

		this._panelSize = panelSize;
		this._responsive = responsive || this.responsive;
	}

	/** Update grid metadata based on available space and grid config */
	private _updateGridMetadata(): void {
		// console.log("%c ⚡ [GRID] (_updateGridMetadata)", "font-size: 16px; color: blueviolet;");
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
			this._columnWidth = minValue(this._gridWidth / this._maxColumns, this._panelSize);
		}

		// console.log("%c panel size:", "font-size: 16px; color: blueviolet;", this._panelSize);
		// console.log("%c grid width:", "font-size: 16px; color: blueviolet;", this._gridWidth);
		// console.log("%c max columns:", "font-size: 16px; color: blueviolet;", this._maxColumns);
		// console.log("%c column width:", "font-size: 16px; color: blueviolet;", this._columnWidth);
	}

	/** Update grid style based on grid metadata */
	private _updateGridLayoutStyles(): void {
		this._gridEl.style.gridTemplateColumns = `repeat(${this._maxColumns}, ${this._columnWidth}px)`;
		this._gridEl.style.gridAutoRows = `${this._columnWidth}px`;
	}

	/** Check if panel is protruding outside the grid available space */
	private _isProtruding(panelMetadata: PanelMetadata): boolean {
		return panelMetadata.right > this._maxColumns;
	}

	/**
	 * Parse slotted grid elements and return list of grid panels.
	 * Any other element will be ignored. 
	 * @param {Array<HTMLElement>} elements - list of all slotted grid elements
	 * @returns {Array<GridPanel>} list of grid panels
	 */
	private _parseGridPanels(elements: LitElement[]): void {
		// console.log("%c [GRID] 🧑🏻‍💻 (_parseGridPanels) elements", "font-size: 16px; color: red;", elements);
		if (elements?.length) {
			Array
				.from(elements)
				.forEach((element, index) => {
					// console.log("%c (parseGridPanels) element", "font-size: 16px; color: red;", element, element.tagName);
					if (element.tagName.toLocaleLowerCase() === "panda-grid-panel") {
						// console.log("%c (parseGridPanels) ADD ELEMENT", "font-size: 16px; color: red;", element);
						// set panel index property
						(element as PandaGridPanel).index = index;
						// set grid metadata onto panel element
						(element as PandaGridPanel).metadata = {
							columnWidth: this._columnWidth,
							maxColumns: this._maxColumns,
						};
						// reset temp position
						(element as PandaGridPanel).resetTempPosition();
						// find suitable position for all slotted panels
						this._initializePanelPosition(element as PandaGridPanel);
						// add events to panel
						element.addEventListener("on-message", this._panelMessageEvent);
						// add panels to the list
						this._panelList.push(element as PandaGridPanel);
					}
				});
			// sort panels
			this._sortPanels();
		}
	}

	/**
	 * Find suitable position for panel unless it has top/left attributes already
	 * @param {PandaGridPanel} panel - grid panel element handle 
	 */
	private _initializePanelPosition(panel: PandaGridPanel): void {
		// console.log("%c 🚀 (_initializePanelPosition)", "font-size: 16px; color: orange;", panel, isEmpty(panel?.top), isEmpty(panel?.left));
		const serializedPanelList = serializePanelMetadata(this._panelList);

		if (!isEmpty(panel?.top) && !isEmpty(panel?.left)) {
			// check protrusion and collision with existing panels
			const panelMetadata = getPanelMetadata(panel);
			if (
				isProtruding(panelMetadata, this._maxColumns) || // check if panels protrudes outside of grid available space
				isColliding(panelMetadata, serializedPanelList) // check if panel collides with other panels
			) {
				// console.log("%c 🚀 (_initializePanelPosition) REPOSITION PANEL ============================", "font-size: 16px; color: red;", panel.index);
				// find better position
				repositionPanel(panel, serializedPanelList, this._maxColumns);
			}
		} else {
			// find better position
			repositionPanel(panel, serializedPanelList, this._maxColumns);
		}
	}

	/**
	 * THIS IS A PROTOTYPE
	 * Check if provided panel metadata is colliding with other grd panels and resolve collision.
	 * @param {PanelMetadata} panelMetadata - metadata of a panel
	 */
	private _detectCollision2(panelMetadata: PanelMetadata, draggedPanelIndex: number | null = null): void {
		console.log("%c 0. START panel index:", "font-size: 16px; color: red;", panelMetadata.index);
		console.log("%c 0. draggedPanelIndex:", "font-size: 16px; color: red;", draggedPanelIndex);

		this._panelList.forEach((obstacle) => {
			// skip panel that initiated collision
			console.log("%c 1. obstacle index:", "font-size: 16px; color: red;", obstacle.index);
			console.log("%c 1. draggedPanelIndex:", "font-size: 16px; color: red;", draggedPanelIndex);
			console.log("%c 1. panel index:", "font-size: 16px; color: red;", panelMetadata.index);

			if (obstacle.index !== panelMetadata.index && obstacle.index !== draggedPanelIndex) {
				// get obstacle metadata
				const obstacleMetadata = getPanelMetadata(obstacle);
				// check if obstacle is colliding
				if (isIntercepted(panelMetadata, obstacleMetadata)) {
					console.log("%c 2.1 COLLISION:", "font-size: 16px; color: red;", panelMetadata.index, "with", obstacle.index);
					if (draggedPanelIndex === null) {
						// resolve collision
						obstacle.tempLeft = panelMetadata.right;
						console.log("%c 2.1 change obstacle temp left to:", "font-size: 16px; color: red;", obstacle.tempLeft);
						console.log("%c 2.1 detect collision for obstacle", "font-size: 16px; color: red;");

						this._detectCollision2(
							getPanelMetadata(obstacle),
							panelMetadata.index
						);
					} else if (draggedPanelIndex !== null && panelMetadata.tempLeft) {
						// resolve collision
						obstacle.tempLeft = obstacle.left + panelMetadata.tempLeft - panelMetadata.left;
						console.log("%c 2.2 COLLISION:", "font-size: 16px; color: red;", panelMetadata.index, "with", obstacle.index);
						console.log("%c 2.2 change obstacle temp left to:", "font-size: 16px; color: red;", obstacle.tempLeft);
						console.log("%c 2.2 detect collision for obstacle", "font-size: 16px; color: red;");

						this._detectCollision2(
							getPanelMetadata(obstacle),
							draggedPanelIndex
						);
					}
				} else {
					console.log("%c 2. NO COLLISION:", "font-size: 16px; color: red;", obstacle.index);
					console.log("%c panelMetadata", "font-size: 16px; color: red;", panelMetadata);
					console.log("%c obstacleMetadata", "font-size: 16px; color: red;", obstacleMetadata);
					// reset temporary position if not colliding
					obstacle.resetTempPosition();
				}
			} else {
				console.log("%c [GRID] ⚡ (_detectCollision) SKIP INDEX:", "font-size: 16px; color: red;", panelMetadata.index, "draggedPanelIndex", draggedPanelIndex);
				console.log("%c draggedPanelIndex:", "font-size: 16px; color: red;", draggedPanelIndex);
				console.log("%c obstacle.index:", "font-size: 16px; color: red;", obstacle.index);
			}
		});
	}

	private _detectCollision(panelMetadata: PanelMetadata): void {
		// console.log("%c ⚡ (_detectCollision2) FOR PANEL %s", "font-size: 16px; color: red;", panelMetadata.index);
		// go through all panels and check for collisions
		this._panelList.forEach((obstacle) => {
			// skip panel itself
			if (panelMetadata.index !== obstacle.index) {
				// check if panel collides with others
				this._fixCollision(panelMetadata, obstacle);
			}
		});
	}

	/**
	 * Resolve panel collision
	 * @param panelMetadata - initiator panel, one that bas been moved to the new position by user
	 * @param obstacle - panel that needs new position in response to user changing layout
	 */
	private _fixCollision(panelMetadata: PanelMetadata, obstacle: PandaGridPanel): void {
		// console.log("%c ⚡ (START) 0. FIX COLLISION FOR:", "font-size: 16px; color: orange;", obstacle.index);

		let found: boolean = false;
		let top: number = 0;
		let left: number = 0;

		while (!found) {
			let right = left + obstacle.width;
			if (right > this._maxColumns) {
				left = 0;
				top++;
				// console.log("%c ⚡ 0. MOVE DOWN:", "font-size: 16px; color: orange;");
				// console.log("%c ⚡ 0. RIGHT:", "font-size: 16px; color: orange;", right);
				// console.log("%c ⚡ 0. MAX COLUMNS:", "font-size: 16px; color: orange;", this._maxColumns);
			}
			// update value of right
			right = valueBetween(
				left + obstacle.width,
				obstacle.minWidth,
				this._maxColumns
			);

			const bottom = top + obstacle.height;
			const obstacleMetadata: PanelMetadata = {
				...getPanelMetadata(obstacle),
				top,
				left,
				right,
				bottom,
			};

			// console.log("%c ⚡ 1. NEW POSITION:", "font-size: 16px; color: orange;", obstacleMetadata.top, obstacleMetadata.left);

			// console.log("%c ⚡ 2. CHECK INTERCEPTION AGAINST OTHER PANELS:", "font-size: 16px; color: orange;");

			let collide = false;
			// validate new obstacle position against all panels
			for (const panel of this._panelList) {

				// skip yourself
				if (panel.index === obstacle.index) {
					continue;
				}

				// console.log("%c (LOOP) >>> 2.1 CHECK OBSTACLE AGAINST PANEL: %s", "font-size: 16px; color: red;", panel.index);
				// console.log("%c CHECK IF OBSTACLE: %s %s %s", "font-size: 16px; color: orange;", obstacle.index, "COLLIDES WITH PANEL:", panel.index);

				// check certain panels for collision
				// 1. initiator panel moved by user
				// 2. panels with lower index
				if (
					panel.index === panelMetadata.index ||
					panel.index < obstacle.index
				) {
					// get current panel metadata
					let currentPanelMetadata = getPanelMetadata(panel);
					// check if current panel is the panel moved by user
					if (panel.index === panelMetadata.index) {
						// update its metadata with offset that came from event
						currentPanelMetadata = { ...panelMetadata };
					}

					// check if obstacle after updating its position still collides with other panels
					if (isIntercepted(currentPanelMetadata, obstacleMetadata)) {
						// console.log("%c [COLLISION!!!] ⚡ 2.1.a NEW POSITION COLLIDES AGAINST PANEL %s", "font-size: 16px; color: orange;", panel.index);
						// console.log("%c [COLLISION] PANEL", "font-size: 16px; color: orange;", currentPanelMetadata);
						// console.log("%c [COLLISION] OBSTACLE", "font-size: 16px; color: orange;", obstacleMetadata);
						const _top = currentPanelMetadata.tempTop ?? currentPanelMetadata.top;
						const _left = currentPanelMetadata.tempLeft ?? currentPanelMetadata.left;
						// console.log("%c PANEL INDEX %s %s %s %s", "font-size: 16px; color: orange;", panel.index, " pos:", _top, _left);

						collide = true;
						break;
					} else {
						// console.log("%c ⚡ 2.1.b NEW POSITION IS FINE FOR PANEL %s", "font-size: 16px; color: green;", obstacleMetadata.index);
						// console.log("%c NEW POSITION FOR PANEL INDEX %s %s %s %s", "font-size: 16px; color: green;", obstacleMetadata.index, "pos:", obstacleMetadata.top, obstacleMetadata.left);

						const _top = currentPanelMetadata.tempTop ?? currentPanelMetadata.top;
						const _left = currentPanelMetadata.tempLeft ?? currentPanelMetadata.left;
						// console.log("%c CURRENT PANEL INDEX %s %s %s %s", "font-size: 16px; color: orange;", currentPanelMetadata.index, " pos:", _top, _left);
					}

					// } else {
					// 	console.log("%c ⚡ 2.2 SKIP PANEL:", "font-size: 16px; color: orange;", panel.index);
					// 	console.log("%c ⚡ REASON 1 (skip, its not initiator panel):", "font-size: 16px; color: orange;", panel.index !== panelMetadata.index);
					// 	console.log("%c ⚡ REASON 2 (skip, panel index is higher than obstacle index):", "font-size: 16px; color: orange;", panel.index > obstacle.index);
				}

			} // end of - for

			// check if we succeeded in finding position that does not collide with other panels
			if (!collide) {
				found = true; // exit loop
				// set temporary position
				obstacle.setTempPosition(obstacleMetadata.top, obstacleMetadata.left);
				// console.log("%c ⚡ 3. (END) APPLY NEW TEMP POSITION:", "font-size: 16px; color: green;", obstacleMetadata.index, " new pos: ", obstacleMetadata.top, obstacleMetadata.left);
			}

			left++;
			if (collide) {
				// console.log("%c ⚡ 3. MOVE LEFT:", "font-size: 16px; color: orange;");
			}
		} // end of - while
	}

	private _sortPanels(): void {
		// console.log("%c ⚡ (_sortPanels)", "font-size: 16px; color: orange;");
		this._panelList
			.sort((panelA, panelB) => {
				return panelA.left - panelB.left;
			})
			.sort((panelA, panelB) => {
				return panelA.top - panelB.top;
			});
		// set correct indexes
		this._panelList.forEach((panel, index) => panel.index = index);
		// console.log("%c ⚡ PANEL LIST:", "font-size: 16px; color: orange;", this._panelList);
	}

	/** Apply all indicative positions to panels and reset their temp positions */
	private _applyTemporaryPosition(): void {
		this._panelList.forEach((panel) => {
			panel.applyTempPosition();
		});
		// sort panels according to the new position 
		this._sortPanels();
	}

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

	/** Notify implementation layer about layout change */
	private _triggerLayoutChangeEvent(): void {
		const event = new CustomEvent("on-layout-change", {
			detail: {
				panelList: serializePanelMetadata(this._panelList)
			}
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onSlotChange(event: Event): void {
		const slotEl: any = event.target;
		const assignedElements: LitElement[] = slotEl.assignedElements();
		// console.log("%c ⚡ [GRID] (_onSlotChange) assignedElements", "font-size: 16px; color: orange;", assignedElements.length, assignedElements);
		// parse slotted elements and create list of grid panels
		this._panelList = [];
		this._parseGridPanels(assignedElements);
	}

	private _onPanelMessage(event: any): void {
		// console.log("%c ⚡ [GRID] (_onPanelMessage) event target:", "font-size: 16px; color: blueviolet;", event.detail);
		const { type, top, left, width, height, index } = event.detail;
		const thisPanel = this._getPanelByIndex(index);
		// check if panel is on the list
		if (thisPanel) {
			let panelMetadata = getPanelMetadata(thisPanel);

			// check message type
			switch (type) {
				case PanelMessageType.DRAG_START:
					// ignore grid resize events triggered by moving placeholder
					this._ignoreGridResize = true;

					this._showPlaceholder(top, left, width, height);
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

					this._panelList.forEach((obstacle) => {
						obstacle.resetTempPosition();
					});

					this._detectCollision(panelMetadata);
					break;

				case PanelMessageType.DRAG_END_NO_CHANGE:
					// console.log("%c ⚡ [GRID] (_onPanelMessage) DRAG END NO CHANGE", "font-size: 16px; color: blueviolet;");
					this._panelList.forEach((obstacle) => {
						obstacle.resetTempPosition();
					});
					this._hidePlaceholder();
					break;

				case PanelMessageType.DRAG_END:
					// console.log("%c ⚡ [GRID] (_onPanelMessage) DRAG END !!!", "font-size: 16px; color: blueviolet;");
					this._hidePlaceholder();
					this._applyTemporaryPosition();
					// trigger layout change event
					this._triggerLayoutChangeEvent();
					break;

				case PanelMessageType.SIZE_CHANGE:
					// console.log("%c ⚡ [GRID] (_onPanelMessage) PANEL SIZE CHANGE !!!", "font-size: 16px; color: blueviolet;");
					panelMetadata = {
						...panelMetadata,
						top,
						left,
						width,
						height,
						right: left + width,
						bottom: top + height,
					};
					this._detectCollision(panelMetadata);
					this._sizeChangeTimer = setTimeout(() => {
						this._applyTemporaryPosition();
					}, 300);
					break;
			}
		}
	}

	/** Handle grid resize */
	private _onGridResize() {
		// ignore initial resize observer invocation
		if (!this._initializeResizeObserver) {
			this._initializeResizeObserver = true;
			return;
		}
		// ignore resize event while in the middle of dragging panel to new location
		if (this._ignoreGridResize) {
			this._ignoreGridResize = false;
			return;
		}
		// console.log("%c ⚡ [GRID] (_onGridResize) event", "font-size: 16px; color: blueviolet;", this._slottedPanels);
		// recalculate grid metadata based on new size
		this._updateGridMetadata();
		this._updateGridLayoutStyles();
		// reinitialize all panels
		this._panelList = [];
		this._parseGridPanels(this._slottedPanels);

		// trigger layout change event
		this._triggerLayoutChangeEvent();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-grid-layout": PandaGridLayout;
	}
}
