// types
import { PanelPosition } from "../../index";
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
	return value > maxValue
		? maxValue
		: value < minValue
			? minValue
			: value;
}

/**
 * Check if panel position intercepts obstacle.
 * @param panel - panel position metadata.
 * @param obstacle - existing panel to check interception against.
 * @returns {Boolean} false if there is no interception between both panels.
 */
export const isIntercepted = (position: PanelPosition, obstacle: PandaGridPanel): boolean => {
	console.log("%c (isIntercepted) OBSTACLE =========================", "font-size: 24px; color: lime;", obstacle, obstacle.top, obstacle.left);
	// panel is left of obstacle
	if (position.right <= obstacle.left) {
		console.log("%c (isIntercepted) EXIT 1", "font-size: 24px; color: lime;");
		return false;
	}
	// panel is right of obstacle
	if (position.left >= obstacle.left + obstacle.width) {
		console.log("%c (isIntercepted) EXIT 2", "font-size: 24px; color: lime;");
		return false;
	}
	// panel is above obstacle
	if (position.bottom <= obstacle.top) {
		console.log("%c (isIntercepted) EXIT 3", "font-size: 24px; color: lime;");
		return false;
	}
	// panel is below obstacle
	if (position.top >= obstacle.top + obstacle.height) {
		console.log("%c (isIntercepted) EXIT 4", "font-size: 24px; color: lime;");
		return false;
	}
	return true;
}