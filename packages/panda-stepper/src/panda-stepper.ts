// types
import { PandaStep } from "../index";
import { SuperStep } from "panda-stepper-types";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-tooltip"; 
import "@panda-wbc/panda-progress-bar";

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, PropertyValues, TemplateResult, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { parseSteps } from "./utils/utils";

@customElement("panda-stepper")
class PandaStepper extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: String, reflect: true })
	theme!: string;

	@property({ type: String, reflect: true })
	label!: string;
	
	@property({ type: Array })
	steps!: PandaStep[];
	
	@property({ type: Boolean, reflect: true })
	clickable: boolean = false;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, reflect: true })
	busy: boolean = false;

	// state props
	@state()
	private _parsedSteps: SuperStep[] = [];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	updated(_changedProps: PropertyValues): void {
		if (_changedProps.has("steps") && this.steps) {
			// this._parsedSteps = parseSteps(this.steps);
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render() {
		let labelHtml: TemplateResult = html``;

		if (this.label) {
			labelHtml = html`<div class="label">${this.label}</div>`;
		}

		return html`
			${labelHtml}
			<div
				class="stepper"
				part="stepper"
			>
				${this._renderSteps()}
			</div>
		`;
	}

	private _renderSteps(): TemplateResult[] {
		const stepsHtml: TemplateResult[] = [];

		
		this._parsedSteps.forEach((step, index) => {
			const {
				title,
				done,
				icon, // added icon to destructure
				description, // added description to destructure
				tooltip, // added tooltip to destructure
				steps,
			} = step;
			
			let progress = 0;
			// check if step has sub-steps
			if (steps.length) {
				// count the number of done steps
				const doneSteps = steps.filter((step) => step.done).length;
				console.log("%c 1.1", "font-size: 24px; color: crimson; background: black;", doneSteps, steps);
				// calculate the progress
				progress = (doneSteps / steps.length) * 100;
				console.log("%c 1.2", "font-size: 24px; color: crimson; background: black;", progress, doneSteps, steps.length);
			} else {
				// check if step is done
				progress = step.done ? 100 : 0;
				console.log("%c 2.", "font-size: 24px; color: crimson; background: black;", progress);
			}
			// check if step is the first one and not done
			if (index === 0 && !done) {
				// set progress to 5% if step is not done
				progress = 5;
				console.log("%c 2.", "font-size: 24px; color: crimson; background: black;", progress);
			}
			
			// check if step has icon
			const iconHtml: TemplateResult = icon
				? html`
					<div class="icon" part="icon">
						<panda-icon icon="${icon}"></panda-icon>
					</div>
				`
				: html``;
			
			// check if tooltip is defined and not empty
			const tooltipHtml: TemplateResult = tooltip
				? html`
					<panda-tooltip placement="top">
						<template>${tooltip}</template>
					</panda-tooltip>
				`
				: html``;
				
			console.log("%c final", "font-size: 24px; color: crimson; background: black;", step, index, done, progress);
			stepsHtml.push(html`
				<div
					id="${step.id}"
					title="${step.id}"
					class="step-cont"
					part="step-cont"
				>
					<div
						class="step"
						part="step"
						@click="${() => this._onStepClick(step)}"
						?disabled="${this.disabled}"
						tabindex="${this.clickable ? "0" : "-1"}"
					>
						<div class="content" part="content">
							${iconHtml}
							<div class="body" part="body">
								<div class="step-title">${title}</div>
								<div class="step-description">${description}</div>
							</div>
						</div>
						${tooltipHtml}
					</div>
					<div class="step-progress" part="step-progress">
						<panda-progress-bar
							theme="${this.theme ?? ""}"
							class="progress-bar"
							part="progress-bar"
							.value="${progress}"
						>
						</panda-progress-bar>
					</div>
					${tooltipHtml}
				</div>
			`);
		});

		return stepsHtml;
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public next(): void {
		const currentStep = this._parsedSteps.find((step) => !step.done);
		console.log("%c (next)", "font-size: 24px; color: crimson; background: black;", currentStep);
		if (currentStep) {
			// check if step has sub-steps
			if (currentStep.steps.length) {
				for (const step of currentStep.steps) {
					if (!step.done) {
						step.done = true; // mark each sub-step as done
						// exit for loop after first sub-step is done
						this.dispatchEvent(new CustomEvent("on-step-change", {
							detail: {
								step: step.origin,
								done: step.done,
							}
						}));
						break;
					}
				}
			} else {
				// check if step is done
				currentStep.done = true;
			}
			// check if all steps are done
			const allStepsDone = currentStep.steps.every((step) => step.done);
			if (allStepsDone) {
				console.log("%c All steps are done", "font-size: 24px; color: green; background: black;");
				currentStep.done = true; // mark current step as done
				this.dispatchEvent(new CustomEvent("on-step-change", {
					detail: {
						step: currentStep.origin,
						done: currentStep.done,
					}
				}));
			} else {
				console.log("%c Not all steps are done", "font-size: 24px; color: orange; background: black;");
			}
		}
		this.requestUpdate();
	}

	public previous(): void {
		console.log("%c (previous)", "font-size: 24px; color: crimson; background: black;");
		const currentStep = this._parsedSteps.find((step) => step.done);
		if (currentStep) {
			// check if step has sub-steps
			if (currentStep.steps.length) {
				for (const step of currentStep.steps) {
					if (step.done) {
						step.done = false; // mark each sub-step as not done
						this.dispatchEvent(new CustomEvent("on-step-change", {
							detail: {
								step: step.origin,
								done: step.done,
							}
						}));
						break;
					}
				}
			} else {
				// check if step is done
				currentStep.done = false;
			}
			// check if all steps are not done
			const allStepsNotDone = this._parsedSteps.every((step) => !step.done);
			if (allStepsNotDone) {
				console.log("%c All steps are not done", "font-size: 24px; color: orange; background: black;");
				currentStep.done = false; // mark current step as not done
				this.dispatchEvent(new CustomEvent("on-step-change", {
					detail: {
						step: currentStep.origin,
						done: currentStep.done,
					}
				}));
			}
			this.requestUpdate();
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onStepClick(step: SuperStep): void {
		console.log("%c step clicked", "font-size: 24px; color: crimson; background: black;", step);
		this.dispatchEvent(new CustomEvent("on-step-click", {
			detail: {
				step: step.origin,
				done: step.done,
			}
		}));
		
	}

}

declare global {
	interface HTMLElementTagNameMap {
		"panda-stepper": PandaStepper;
	}
}
export type { PandaStepper };