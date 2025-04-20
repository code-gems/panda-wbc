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
			this._parsedSteps = parseSteps(this.steps);
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

		
		this._parsedSteps.forEach((step) => {
			console.log("%c step", "font-size: 24px; color: crimson; background: black;", step);
			const {
				title,
				icon, // added icon to destructure
				description, // added description to destructure
				tooltip, // added tooltip to destructure
				steps,
			} = step;
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

			stepsHtml.push(html`
				<div
					id=""
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
							value="5"
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

	}

	public previous(): void {

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