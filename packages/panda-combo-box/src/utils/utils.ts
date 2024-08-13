// types
import { PandaComboBoxItem } from "../../index";

export const minValue = (value: number, min: number): number => value < min ? min : value;

/**
 * Get value of an item object
 * @returns {String} value associated with an item
 */
export const getItemValue = (
	item: PandaComboBoxItem,
	itemValuePath: string | null
): string | number | null => {
	if (typeof item === "object") {
		// check if item value patch are defined
		if (itemValuePath) {
			return item[itemValuePath];
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
	item: PandaComboBoxItem,
	itemLabelPath: string | null
): string => {
	if (typeof item === "object") {
		// check if item value patch are defined
		if (itemLabelPath) {
			return item[itemLabelPath];
		} else {
			return item.label as string;
		}
	} else {
		return item;
	}
}

/**
 * Get label of selected item
 * @returns {String} label associated with selected value
 */
export const getLabelFromItems = (
	items: PandaComboBoxItem[] | any[] | null,
	value: string | number | null,
	itemValuePath: string | null,
	itemLabelPath: string | null,
	allowCustomValue: boolean = false
): string => {
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
			if (allowCustomValue) {
				return String(value);
			} else {
				console.warn("[combo-box] No item match found for value:", value);
				return "";
			}
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

export const findItemByLabel = (
	item: PandaComboBoxItem | string | number,
	itemLabelPath: string | null,
	searchText: string
): PandaComboBoxItem | string | number | null => {
	let _label: string;

	// check if item is not a primitive
	if (typeof item === "object") {
		// check if item label path is defined
		if (itemLabelPath) {
			_label = item[itemLabelPath] ?? "";
		} else {
			_label = item.label ?? "";
		}
	} else {
		_label = String(item);
	}

	if (_label.toLocaleLowerCase() === searchText.toLocaleLowerCase()) {
		return item;
	} else {
		return null;
	}
}

export const getItemByLabel = (
	items: PandaComboBoxItem[] | any[] | null,
	label: any,
	itemLabelPath: string | null,
): PandaComboBoxItem | string | number | null => {
	if (items) {
		// check if item is not a primitive
		if (typeof items[0] === "object") {
			return items.find((item) => {
				const _itemLabel = itemLabelPath
					? item[itemLabelPath] ?? null
					: item?.value;
				// check what type of data are we comparing
				if (typeof _itemLabel === "string") {
					return _itemLabel.toLocaleLowerCase() === label.toLocaleLowerCase();
				} else {
					return _itemLabel === label;
				}
			});
		} else if (typeof items[0] === "string") {
			return items.find((item) => item.toLocaleLowerCase() === label.toLocaleLowerCase());
		} else {
			return items.find((item) => item === label);
		}
	} else {
		return null;
	}
}

export const isValueSet = (value: any): boolean => {
	return value !== null && value !== undefined && value !== "";
}