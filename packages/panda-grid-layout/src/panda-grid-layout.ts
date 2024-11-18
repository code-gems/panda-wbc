// types
import { PanelMessageType, PanelMetadata } from "panda-grid-layout-types";
import { GridConfig, PandaGridLayoutChangeEvent } from "../index";
import { PandaGridPanel } from "./panda-grid-panel";

// style
import { styles } from "./styles/styles";
import { scrollbar } from "@panda-wbc/panda-theme/lib/mixins";

// components
import "./panda-grid-panel";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { debounce, isEmpty } from "@panda-wbc/panda-utils";
import {
	compactPanelMetadata,
	getPanelMetadata,
	getPanelsFromElements,
	isColliding,
	isIntercepted,
	isProtruding,
	minValue,
	repositionPanel,
	serializePanelMetadata,
	valueBetween,
	comparePanelLists,
} from "./utils/utils";
import { Debouncer } from "@panda-wbc/panda-utils/types";

@customElement("panda-grid-layout")
export class PandaGridLayout extends LitElement {
	// css style
	static get styles() {
		return [styles, scrollbar];
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

	// events =============================================

	private readonly _panelMessageEvent = this._onPanelMessage.bind(this);

	// timers =============================================

	private _sizeChangeTimer!: ReturnType<typeof setTimeout>;

	// debouncers =========================================

	private readonly _gridResizeDebouncer: Debouncer = debounce(this._onGridResize.bind(this), 500);

	// elements ===========================================

	@query("#grid-layout")
	private readonly _gridEl!: HTMLDivElement;

	@query("#placeholder")
	private readonly _placeholderEl!: HTMLDivElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		// register resize observer
		this._resizeObserver = new ResizeObserver(this._gridResizeDebouncer);
		this._resizeObserver.observe(this);
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
				class="grid-layout-cont scrollbar"
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

	/**
	 * Parse slotted grid elements and initialize grid panels.
	 * All grid panels will get their position set. 
	 * This happens only once at the beginning.
	 * 
	 * @param {Array<HTMLElement>} elements - list of all slotted grid elements
	 */
	private _initializeGridPanels(elements: LitElement[]): void {
		// console.log("%c [GRID] 🧑🏻‍💻 (_parseGridPanels) elements", "font-size: 16px; color: red;", elements);
		const newPanelList = getPanelsFromElements(elements);
		// initialize and aggregate all panels 
		newPanelList.forEach((panel, index) => {
			// set panel index property
			this._initializePanel(panel, index);
			// add panels to the list
			this._panelList.push(panel);
		});
		// sort panels
		this._sortPanels();
	}

	/**
	 * Initialize single panel.
	 * @param {PandaGridPanel} panel - grid panel element 
	 * @param {Number} index - number representing sequence the panel is added into panel list
	 */
	private _initializePanel(panel: PandaGridPanel, index: number): void {
		panel.index = index;
		// set grid metadata
		panel.metadata = {
			columnWidth: this._columnWidth,
			maxColumns: this._maxColumns,
		};
		// reset temp position
		panel.resetTempPosition();
		// find suitable position for panel
		this._updatePanelPosition(panel);
		// add events to panel
		panel.addEventListener("on-message", this._panelMessageEvent);
	}

	/**
	 * Find suitable position for panel unless it has top/left attributes already
	 * @param {PandaGridPanel} panel - grid panel element 
	 */
	private _updatePanelPosition(panel: PandaGridPanel): void {
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
				if (isIntercepted(panelMetadata, [obstacleMetadata])) {
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

	/** Reposition all panels without changing their sequence */
	private _rearrangePanels(): void {
		// set "protrudes" flag on all panels so that they will be ignored during collision resolution
		for (const panel of this._panelList) {
			panel.protrudes = true;
		}
		// reposition all panels
		for (const panel of this._panelList) {
			// get panel list metadata, it has to be updated each time we update panel
			const serializedPanelList = serializePanelMetadata(this._panelList);
			repositionPanel(panel, serializedPanelList, this._maxColumns);
			panel.protrudes = false;
			// update grid metadata for panel
			panel.metadata = {
				columnWidth: this._columnWidth,
				maxColumns: this._maxColumns,
			};
		}
		// sort panels in case they changed position
		this._sortPanels();
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
					if (isIntercepted(currentPanelMetadata, [obstacleMetadata])) {
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
			// if (collide) {
			// console.log("%c ⚡ 3. MOVE LEFT:", "font-size: 16px; color: orange;");
			// }
		} // end of - while
	}

	private _sortPanels(): void {
		this._panelList
			.sort((panelA, panelB) => {
				return panelA.left - panelB.left;
			})
			.sort((panelA, panelB) => {
				return panelA.top - panelB.top;
			});
		// set correct indexes
		this._panelList.forEach((panel, index) => panel.index = index);
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

	private _showPlaceholder(panelMetadata: PanelMetadata): void {
		// compact indicative position
		panelMetadata = compactPanelMetadata(panelMetadata, serializePanelMetadata(this._panelList));
		const { top, left, width, height } = panelMetadata;
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
		const event: PandaGridLayoutChangeEvent = new CustomEvent("on-layout-change", {
			detail: {
				panelList: this._panelList.map(
					({ panelId, top, left, width, height }) => {
						return {
							panelId,
							top,
							left,
							width,
							height,
						};
					}
				),
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
		// check if there are already panels initialized
		if (this._panelList.length) {
			// check what happened with panels
			const newPanelList = getPanelsFromElements(assignedElements);
			const {
				newPanels,// panels added
				missingPanels, // panels removed
			} = comparePanelLists(this._panelList, newPanelList);
			// check if panels were removed
			// remove panels from main list first
			if (missingPanels.length) {
				// remove missing panels from the panel list
				this._panelList = this._panelList.filter((panel) => !missingPanels.includes(panel));
				// update indexes
				this._panelList.forEach((panel, index) => panel.index = index);
			}
			// check if panels were added
			if (newPanels.length) {
				// initialize new panels
				newPanels.forEach((newPanel) => {
					this._initializePanel(newPanel, this._panelList.length);
					this._panelList.push(newPanel);
				});
			}
			// reposition panels to fill up empty gaps
			this._rearrangePanels();
			// notify about layout change
			if (missingPanels.length || newPanels.length) {
				this._triggerLayoutChangeEvent();
			}
		} else {
			// initialize all slotted panels only once
			// parse slotted elements and create list of grid panels
			this._initializeGridPanels(assignedElements);
		}
	}

	private _onPanelMessage(event: any): void {
		// console.log("%c ⚡ [GRID] (_onPanelMessage) event target:", "font-size: 16px; color: blueviolet;", event.detail);
		const { type, top, left, width, height, index } = event.detail;
		const thisPanel = this._getPanelByIndex(index);
		// check if panel is on the list
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
			// check message type
			switch (type) {
				case PanelMessageType.DRAG_INIT:
					this._showPlaceholder(panelMetadata);
					break;

				case PanelMessageType.DRAG_START:
					// reset indicative position for all panels
					this._panelList.forEach((obstacle) => {
						obstacle.resetTempPosition();
					});
					// resolve collisions
					this._detectCollision(panelMetadata);
					// show placeholder after collision resolution
					this._showPlaceholder(panelMetadata);
					break;

				case PanelMessageType.DRAG_END_NO_CHANGE:
					// console.log("%c ⚡ [GRID] (_onPanelMessage) DRAG END NO CHANGE", "font-size: 16px; color: blueviolet;");
					this._panelList.forEach((obstacle) => {
						obstacle.resetTempPosition();
					});
					this._hidePlaceholder();
					break;

				case PanelMessageType.DRAG_END:
					console.log("%c ⚡ [GRID] (_onPanelMessage) DRAG END !!! PANEL INDEX %s", "font-size: 16px; color: blueviolet;", thisPanel.index);
					console.log("%c ⚡ [GRID] (_onPanelMessage) t/l %s %s", "font-size: 16px; color: blueviolet;", top, left);
					this._hidePlaceholder();
					// compact indicative position
					panelMetadata = compactPanelMetadata(panelMetadata, serializePanelMetadata(this._panelList));
					// apply compacted position to the panel
					thisPanel.top = panelMetadata.top;
					thisPanel.left = panelMetadata.left;
					thisPanel.width = panelMetadata.width;
					// apply indicative position to all panels
					this._applyTemporaryPosition();
					// reposition panels
					this._rearrangePanels();
					// trigger layout change event
					this._triggerLayoutChangeEvent();
					break;

				case PanelMessageType.SIZE_CHANGE:
					// console.log("%c ⚡ [GRID] (_onPanelMessage) PANEL SIZE CHANGE !!!", "font-size: 16px; color: blueviolet;");
					// resolve collisions
					this._detectCollision(panelMetadata);
					// apply changes after small delay for animation to end
					this._sizeChangeTimer = setTimeout(() => {
						this._applyTemporaryPosition();
					}, 300);
					break;
			}
		}
	}

	/** Handle grid resize */
	private _onGridResize() {
		// console.log("%c ⚡ [GRID] (_onGridResize)", "font-size: 24px; color: gold; background: black;", this._slottedPanels);
		// ignore initial resize observer invocation
		if (!this._initializeResizeObserver) {
			this._initializeResizeObserver = true;
			return;
		}
		// recalculate grid metadata based on new size
		this._updateGridMetadata();
		this._updateGridLayoutStyles();
		// reposition all panels but preserve their sequence
		this._rearrangePanels();

		// trigger layout change event
		this._triggerLayoutChangeEvent();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-grid-layout": PandaGridLayout;
	}
}
