/** These types are for internal use only! */
declare module "panda-select-types" {
	export type ElementDetails = {
		width: number;
		height: number;
		top: number;
		left: number;
		bottom: number;
		right: number;
	}

	export interface SuperSelectItem {
		index: number;
		value: any;
		label: string;
		selected: boolean;
		active: boolean;
		disabled: boolean;
		data: any; /* original item object */
	}
}