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
 * @param panelList - list of panels
 * @returns - serialized list of panel metadata
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
 * @param panel - panel position metadata.
 * @param obstacleMetadata - existing panel to check interception against.
 * @returns {Boolean} false if there is no interception between both panels.
 */
export const isIntercepted = (panelMetadata: PanelMetadata, obstacleMetadata: PanelMetadata): boolean => {
	// console.log("%c (isIntercepted) OBSTACLE =========================", "font-size: 24px; color: lime;", obstacleMetadata, obstacleMetadata.top, obstacleMetadata.left);
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
		return false;
	}
	// panel is right of obstacle
	if (panelLeft >= obstacleRight) {
		// console.log("%c (isIntercepted) EXIT 2 panel is right of obstacle", "font-size: 24px; color: lime;");
		return false;
	}
	// panel is above obstacle
	if (panelBottom <= obstacleTop) {
		// console.log("%c (isIntercepted) EXIT 3 panel is above obstacle", "font-size: 24px; color: lime;");
		return false;
	}
	// panel is below obstacle
	if (panelTop >= obstacleBottom) {
		// console.log("%c (isIntercepted) EXIT 4 panel is below obstacle", "font-size: 24px; color: lime;");
		return false;
	}
	return true;
}

export const getMousePosition = (event: any): MousePosition => {
	// check if this is a touch event
	const touchEvent = event.touches &&	event.touches[0];
	if (touchEvent) {
		// return touch position
		return {
			x: event.touches[0].clientX,
			y: event.touches[0].clientY,
		};
	} else {
		// return mouse position
		return {
			x: event.clientX,
			y: event.clientY,
		};
	}
}

/**
 * Extract panel metadata for further processing. Metadata contain position and size of a panel aside with its index value.
 * 
 * @param panel - Panel element
 * @returns panel metadata
 */
export const getPanelMetadata = (panel: PandaGridPanel): PanelMetadata => {
	const _right = panel.left + panel.width;
	const _bottom = panel.top + panel.height;
	return {
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