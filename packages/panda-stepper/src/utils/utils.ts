// types
import { PandaStep } from "../../index";
import { SuperStep } from "panda-stepper-types";

// utils
import { generateUuid } from "@panda-wbc/panda-utils";

/**
 * Parses the steps to create SuperStep objects.
 * @param {Array<PandaStep>} steps - The steps to parse.
 * @returns {Array<SuperStep>} An array of SuperStep objects.
 */
export const parseSteps = (steps: PandaStep[]): SuperStep[] => {
	return steps.map((step): SuperStep => {
		const steps = step.steps ?? [];
		return {
			title: step.title,
			// extra props
			id: generateUuid(),
			icon: step.icon ?? "",
			description: step.description ?? "",
			tooltip: step.tooltip ?? "",
			// state props
			done: step.done ?? false,
			disabled: step.disabled ?? false,
			working: step.working ?? false,
			// sub-steps
			steps: steps.map((subStep): SuperStep => ({
				title: subStep.title,
				// extra props
				id: generateUuid(),
				icon: subStep.icon ?? "",
				description: subStep.description ?? "",
				tooltip: subStep.tooltip ?? "",
				// state props
				done: subStep.done ?? false,
				disabled: subStep.disabled ?? false,
				working: subStep.working ?? false,
				steps: [],
				origin: subStep // origin of the step
			})),
			origin: step // origin of the step
		};
	});
}