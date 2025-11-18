export type { PandaMultiSelectComboBox } from "./src/panda-multi-select-combo-box";
export type { PandaMultiSelectComboBoxOverlay } from "./src/panda-multi-select-combo-box-overlay";

export type PandaMultiSelectComboBoxItem = {
	label: string;
	value: any;
	// extras
	group?: string;
	disabled?: boolean;
}