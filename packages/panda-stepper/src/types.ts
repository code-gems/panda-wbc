declare module "panda-stepper-types" {
	export type SuperStep = {
		title: string;
		// extra props
		id: string;
		index: number;
		icon: string;
		description: string;
		tooltip: string;
		// state props
		done: boolean;
		disabled: boolean;
		working: boolean;
		active: boolean;
		// sub-steps
		steps: Omit<SuperStep, "steps">[];

		origin: any; // origin of the step
	}
}