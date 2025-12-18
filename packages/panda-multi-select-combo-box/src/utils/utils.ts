// types
import { PandaMultiSelectComboBoxItem, PandaSelectI18nConfig } from "../../index";
import { SuperItem } from "../types";

/**
 * Get default internationalization config for component labels and placeholders
 * @returns {PandaSelectI18nConfig} default i18n config
 */
export const getI18nConfig = (): PandaSelectI18nConfig => {
	return {
		allItems: "All",
		selectAll: "Select All",
		selectedItems: "Selected items",
		reset: "Reset",
		filterPlaceholder: ["Find..."],
		noDataFound: "No data found",
	};
}

/**
 * Get value of an item object
 * @param {PandaMultiSelectComboBoxItem|String|Number} item item object or primitive value
 * @param {String|Null} itemValuePath path to value property in item object
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
 * @param {PandaMultiSelectComboBoxItem|String|Number} item item object or primitive value
 * @param {String|Null} itemLabelPath path to label property in item object
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
 * @param {Array<any>} arr array to check
 * @param {any} value value to find
 * @returns {Boolean} boolean indicating if value is in array
 */
export const includes = (arr: any[], value: any): boolean => {
	return arr.indexOf(value) !== -1;
}

/**
 * Get the count of selectable items (items that are not disabled)
 * @param {Array<SuperItem>} items array of items to check
 * @returns {Number} number of selectable items
 */
export const getSelectableItemsCount = (items: SuperItem[]): number => {
	let count = 0;
	for (const item of items) {
		if (
			!item.disabled || // count not disabled items
			(item.disabled && item.selected) // count selected disabled items as selectable
		) {
			count++;
		}
	}
	return count;
}
