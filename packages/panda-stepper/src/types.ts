declare module "panda-stepper-types" {
	export type SuperStep = {
		title: string;
		// extra props
		id: string;
		icon: string;
		description: string;
		tooltip: string;
		// state props
		done: boolean;
		disabled: boolean;
		working: boolean;
		// sub-steps
		steps: SuperStep[];

		origin: any; // origin of the step
	}
}