// types
import { PandaMultiSelectComboBoxItem } from "../../index";

/**
 * Get value of an item object
 * @returns {String} value associated with an item
 */
export const getItemValue = (
	item: PandaMultiSelectComboBoxItem | string | number,
	itemValuePath: string | null
): string | number | null => {
	if (typeof item === "object") {
		// check if item value patch are defined
		if (itemValuePath == null) {
			return item.value ?? "[no value defined]";
		} else {
			return (item as Record<string, any>)[itemValuePath];
		}
	} else {
		return item;
	}
}

/**
 * Get label of selected item
 * @returns {String} label associated with selected value
 */
export const getItemLabel = (
	item: PandaMultiSelectComboBoxItem | string | number,
	itemLabelPath: string | null
): string => {
	if (typeof item === "object") {
		// check if item value patch are defined
		if (itemLabelPath == null) {
			return item.label ?? "[no label defined]";
		} else {
			return (item as Record<string, any>)[itemLabelPath];
		}
	} else {
		return String(item);
	}
}

/**
 * Get disabled flag of an item object
 * @param {PandaMultiSelectComboBoxItem | string | number} item item object or primitive value
 * @returns {Boolean} disabled flag associated with an item
 */
export const getItemDisabledFlag = (item: PandaMultiSelectComboBoxItem | string | number): boolean => {
	if (typeof item === "object") {
		return item.disabled ?? false;
	} else {
		return false;
	}
}

/**
 * Check if array includes a value
 * @param arr array to check
 * @param value value to find
 * @returns boolean indicating if value is in array
 */
export const includes = (arr: any[], value: any): boolean => {
	return arr.indexOf(value) !== -1;
}