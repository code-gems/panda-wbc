// types
import { MousePosition, PanelMetadata } from "../../index";
import { PandaGridPanel } from "../panda-grid-panel";

/**
 * Validate value against minValue are correct it if needed.  
 * If value is less than minValue it will return minValue.
 * 
 * @param {Number} value - number to validate.
 * @param {Number} minValue - min value.
 * @returns {Number} value that is more than minValue.
 */
export const minValue = (value: number, minValue: number): number => {
	return value < minValue ? minValue : value;
}

/**
 * Validate value against maxValue are correct it if needed.  
 * If value is more than maxValue it will return maxValue.
 * 
 * @param {Number} value - number to validate.
 * @param {Number} maxValue - max value.
 * @returns {Number} value that is more than minValue.
 */
export const maxValue = (value: number, maxValue: number): number => {
	return value > maxValue ? maxValue : value;
}

/**
 * Return serializable metadata of panel list. 
 * @param {Array<PandaGridPanel>} panelList - list of panels
 * @returns {Array<PanelMetadata>} - serialized list of panel metadata
 */
export const serializePanelMetadata = (panelList: PandaGridPanel[]): PanelMetadata[] => {
	return panelList.map((panel) => getPanelMetadata(panel));
}

/**
 * Return a number between min and max values provided for evaluation.
 * If number provided is between min/max values, it will be returned as is.
 * If value is less than minValue it will return minValue.
 * If number is more than maxValues, it will return maxValue.
 * 
 * @param {Number} value - number to validate
 * @param {Number} minValue - min value
 * @param {Number} maxValue - max value
 * @returns {Number} value between min and max limit
 */
export const valueBetween = (value: number, minValue: number, maxValue: number): number => {
	if (value > maxValue) {
		return maxValue;
	} else if (value < minValue) {
		return minValue;
	} else {
		return value;
	}
}

/**
 * Check if panel position intercepts obstacle.
 * 
 * @param {PanelMetadata} panelMetadata - panel position metadata.
 * @param {Array<PanelMetadata>} obstacleMetadataList - existing panel to check interception against.
 * @returns {Boolean} true if there is interception between provided panels.
 */
export const isIntercepted = (panelMetadata: PanelMetadata, obstacleMetadataList: PanelMetadata[]): boolean => {
	let intercepted = false;

	for (const obstacleMetadata of obstacleMetadataList) {
		// skip yourself in collision check
		if (panelMetadata.index === obstacleMetadata.index) {
			break;
		}
		// panel is left of obstacle
		const panelTop = panelMetadata.tempTop ?? panelMetadata.top;
		const panelLeft = panelMetadata.tempLeft ?? panelMetadata.left;
		const panelRight = panelLeft + panelMetadata.width;
		const panelBottom = panelTop + panelMetadata.height;
	
		const obstacleTop = obstacleMetadata.tempTop ?? obstacleMetadata.top;
		const obstacleLeft = obstacleMetadata.tempLeft ?? obstacleMetadata.left;
		const obstacleRight = obstacleLeft + obstacleMetadata.width;
		const obstacleBottom = obstacleTop + obstacleMetadata.height;
	
		if (panelRight <= obstacleLeft) {
			// console.log("%c (isIntercepted) EXIT 1 panel is left of obstacle", "font-size: 24px; color: lime;");
			intercepted = false;
			continue;
		}
		// panel is right of obstacle
		if (panelLeft >= obstacleRight) {
			// console.log("%c (isIntercepted) EXIT 2 panel is right of obstacle", "font-size: 24px; color: lime;");
			intercepted = false;
			continue;
		}
		// panel is above obstacle
		if (panelBottom <= obstacleTop) {
			// console.log("%c (isIntercepted) EXIT 3 panel is above obstacle", "font-size: 24px; color: lime;");
			intercepted = false;
			continue;
		}
		// panel is below obstacle
		if (panelTop >= obstacleBottom) {
			// console.log("%c (isIntercepted) EXIT 4 panel is below obstacle", "font-size: 24px; color: lime;");
			intercepted = false;
			continue;
		}
		intercepted = true;
		break;
	}
	return intercepted;
}

/**
 * Get mouse / touch details from the event object.
 * 
 * @param {MouseEvent|TouchEvent} event - mouse or touch event
 * @returns {MousePosition} mouse position details
 */
export const getMousePosition = (event: MouseEvent | TouchEvent): MousePosition => {
	// check if this is a touch event
	const touchEvent = (event as TouchEvent).touches && (event as TouchEvent).touches[0];
	if (touchEvent) {
		// return touch position
		return {
			x: (event as TouchEvent).touches[0].clientX,
			y: (event as TouchEvent).touches[0].clientY,
		};
	} else {
		// return mouse position
		return {
			x: (event as MouseEvent).clientX,
			y: (event as MouseEvent).clientY,
		};
	}
}

/**
 * Extract panel metadata for further processing. 
 * Metadata contain position and size of a panel aside with its index value.
 * 
 * @param {PandaGridPanel} panel - Panel element
 * @returns {PanelMetadata} panel metadata
 */
export const getPanelMetadata = (panel: PandaGridPanel): PanelMetadata => {
	const _right = panel.left + panel.width;
	const _bottom = panel.top + panel.height;
	return {
		panelId: panel.panelId,
		width: panel.width,
		height: panel.height,
		top: panel.top,
		left: panel.left,
		tempLeft: panel.tempLeft,
		tempTop: panel.tempTop,
		index: panel.index,
		// extras
		right: _right,
		bottom: _bottom,
	};
}

/**
 * Check if panel is protruding outside the grid available space.
 * 
 * @param {PanelMetadata} panelMetadata - panel position metadata
 * @param {Number} maxColumns - max columns that grid can show
 * @returns {Boolean} true if outside of available space 
 */
export const isProtruding = (panelMetadata: PanelMetadata, maxColumns: number): boolean => {
	return panelMetadata.right > maxColumns;
}

/**
 * Check panel position metadata against panel list for collisions.
 * 
 * @param {PanelMetadata} panelMetadata - panel position/size metadata to verify
 * @param {Array<PanelMetadata>} obstacleMetadataList - list of existing panels to check against
 * @returns {Boolean} true if colliding with any other panel from the list
 */
export const isColliding = (panelMetadata: PanelMetadata, obstacleMetadataList: PanelMetadata[]): boolean => {
	let colliding = false;
	// check if panel list is not empty
	if (obstacleMetadataList?.length) {
		// check for collisions
		for (const obstacleMetadata of obstacleMetadataList) {
			if (
				obstacleMetadata.index !== panelMetadata.index && // don't validate interception against itself
				isIntercepted(panelMetadata, [obstacleMetadata]) // check for interception
			) {
				colliding = true;
				break;
			}
		}
	}
	return colliding;
}

/**
 * Find an empty slot sufficient for the panel and update its position.
 * [IMPORTANT] This is not a pure function and it will modify position of provided panel.
 * 
 * @param {PandaGridPanel} panel - panel to be repositioned
 * @param {Array<PanelMetadata>} obstacleMetadataList - list of all existing panels metadata 
 * @param {Number} maxColumns - max allowed columns 
 */
export const repositionPanel = (panel: PandaGridPanel, obstacleMetadataList: PanelMetadata[], maxColumns: number): void => {
	let found: boolean = false;
	let top: number = 0;
	let left: number = 0;

	// fine empty space for panel to fit in
	while (!found) {
		let right = left + panel.width;
		// check if panel is too long and protrudes outside of the available space
		if (right > maxColumns) {
			left = 0;
			top++;
		}

		// make sure panel won't be sized less then minWidth
		right = valueBetween(
			left + panel.width,
			panel.minWidth,
			maxColumns
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
		for (const obstacleMetadata of obstacleMetadataList) {
			if (
				obstacleMetadata.index !== panel.index &&
				isIntercepted(panelMetadata, [obstacleMetadata])
			) {
				collide = true;
				break;
			}
		}

		if (!collide) {
			found = true; // exit loop
			panel.top = panelMetadata.top;
			panel.left = panelMetadata.left;
		}
		// move left and try again
		left++;
	} // end of loop
}

/**
 * Find better location for panel. Try to move it up and to the left. 
 * If after compaction there are no collisions, take that metadata and return it.
 * 
 * @param {PanelMetadata} panelMetadata - panel metadata to compact 
 * @param {Array<PanelMetadata>} obstacleMetadataList - all other panels
 * @returns {PanelMetadata} panel metadata that is compacted
 */
export const compactPanelMetadata = (panelMetadata: PanelMetadata, obstacleMetadataList: PanelMetadata[]): PanelMetadata => {
	const compact = (panelMetadata: PanelMetadata): PanelMetadata => {
		let collideX: boolean = false;
		let collideY: boolean = false;
		let top = panelMetadata.top;
		let left = panelMetadata.left;

		const compactedMetadata: PanelMetadata = { ...panelMetadata };
		// move up
		compactedMetadata.top--;
		// check if we reached the top
		if (top < 0) {
			collideY = true;
		} else {
			// check for collisions after position change
			if (isIntercepted(compactedMetadata, obstacleMetadataList)) {
				collideY = true;
			}
		}
		// check if panel collides after position change
		if (collideY) {
			//  revert position change
			compactedMetadata.top++;
		}

		// move left
		compactedMetadata.left--;
		if ( left < 0) {
			collideX = true;
		} else {
			// check for collisions after position change
			if (isIntercepted(compactedMetadata, obstacleMetadataList)) {
				collideX = true;
			}
		}
		// check if panel collides after position change
		if (collideX) {
			//  revert position change
			compactedMetadata.left++;
		}

		// check if we are stuck
		if (collideX && collideY) {
			return compactedMetadata;
		} else {
			// compact further
			return compact(compactedMetadata);
		}
	}
	return {
		...panelMetadata,
		top: 0,
		bottom: panelMetadata.height
	}
	// compact provided panel metadata
	return compact(panelMetadata);
}