declare module "panda-button-group-types" {
	export type SuperItem = {
		id: string;
		label: string;
		value: any;
		selected: boolean;
		disabled: boolean;
		working: boolean;
		prefixIcon?: string;
		suffixIcon?: string;
		prefixBadge?: string;
		suffixBadge?: string;
	}
}