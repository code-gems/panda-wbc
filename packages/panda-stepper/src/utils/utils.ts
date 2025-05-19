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
export const parseSteps = (steps: PandaStep[], activeStepId: string | null = null): SuperStep[] => {
	const superSteps: SuperStep[] = [];
	let index = 0;
	
	
	for (const step of steps) {
		let active = activeStepId !== null
			? activeStepId === step.id
			: index === 0;
		
		const superStep: SuperStep = {
			id: step.id ?? generateUuid(),
			title: step.title,
			// extra props
			index,
			icon: step.icon ?? "",
			description: step.description ?? "",
			tooltip: step.tooltip ?? "",
			// state props
			done: step.done ?? false,
			disabled: step.disabled ?? false,
			working: step.working ?? false,
			active,
			steps: [],
			// origin
			origin: step // origin of the step
		};

		if (step.steps) {
			for (const subStep of step.steps) {
				index++;
				

			}
		} else {
			index++;
			// add to the list
			superSteps.push(superStep);
		}
	}
}