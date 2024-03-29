// types
import { PandaSelectItem } from "../../index";

export const minValue = (value: number, min: number): number => value < min ? min : value;

/**
 * Get value of an item object
 * @returns {String} value associated with an item
 */
export const getItemValue = (
	item: PandaSelectItem,
	itemValuePath: string | null
): string | number | null => {
	if (typeof item === "object") {
		// check if item value patch are defined
		if (itemValuePath) {
			return item[itemValuePath as string];
		} else {
			return item.value;
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
	items: PandaSelectItem[] | any[] | null | undefined,
	value: string | number | null,
	itemValuePath: string | null,
	itemLabelPath: string | null
): string =>  {
	if (items && value !== null) {
		const _selectedItem = items.find((item) => {
			// check if item is an object or primitive
			if (typeof item === "object") {
				let _value: any;
				// check if item value patch is defined
				if (itemValuePath) {
					_value = item[itemValuePath];
				} else {
					_value = item.value;
				}
				return _value === value;
			} else {
				return item === value;
			}
		});

		// check if selected label is an object or primitive
		if (_selectedItem === undefined) {
			console.warn("[select] No item match found for value:", value);				
			return "";
		} else if (typeof _selectedItem === "object") {
			// check if item label patch are defined
			let _label: any;
			if (itemLabelPath) {
				_label = _selectedItem[itemLabelPath];
			} else {
				_label = _selectedItem?.label;
			}
			return _label ?? "";
		} else {
			return String(_selectedItem);
		}
	} else {
		return "";
	}
}