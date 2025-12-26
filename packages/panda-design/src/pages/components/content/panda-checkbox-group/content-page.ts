// types
import { ComponentPropertyDetails, ComponentEventDetails, ContentSectionName } from "panda-design-typings";
import { PandaCheckboxChangeEvent } from "@panda-wbc/panda-checkbox";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-checkbox";
import "@panda-wbc/panda-checkbox-group";
import "@panda-wbc/panda-particle-banner";

// utils
import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import { pageConfig } from "./page-config";

// code snippets
import {
	implementationSnippet,
	installationSnippet
} from "./snippets/snippets";

@page(pageConfig)
@customElement("panda-checkbox-group-content-page")
export class PandaCheckboxGroupContentPage extends ContentPageTemplate {
	// page details
	public contentPageConfig = pageConfig;
	public customStyles = styles;

	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component." },
		{ name: "label", type: "String", defaultValue: "-", description: "Set the label for the checkbox group." },
		{ name: "disabled", type: "boolean", defaultValue: "false", description: "Sets a disabled state for the component." },
		{ name: "alignRight", type: "boolean", defaultValue: "false", description: "Aligns checkbox to the right side." },
	];

	private readonly _componentEvents: ComponentEventDetails[] = [
		{ name: "@change", returnType: "PandaCheckboxChangeEvent", description: "Triggered every time group changed its selection." }
	];

	private _componentInterface: ComponentEventDetails[] = [
		{ name: "toggle()", returnType: "void", description: "Toggle value of the component." },
	];

	// demo props
	@state()
	private _showOption4 = false;
	
	@state()
	private _disabled = false;

	@state()
	private _alignRight = false;

	@state()
	private _horizontal = false;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		const bannerConfig: PandaParticleBannerConfig = {
			particleGroup: [{
				particleCount: 50,
				blur: true,
				blurMax: 5,
				blurMin: 2,
				// lava lamp
				colors: ["hsl(17 88% 49%)", "hsl(42 88% 50%)"],
				colorOpacityVariation: 50,
				colorSaturationVariation: 30,
				maxSpeedX: 0.1,
				minSpeedX: -0.1,
				maxSpeedY: -0.2,
				minSpeedY: -0.1,
				sizeMax: 80,
				sizeMin: 20
			}]
		};
		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner
					.config="${bannerConfig}"
				>
					<div class="content">
						<h1>CHECKBOX GROUP</h1>
					</div>
					<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
				</panda-particle-banner>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
			${this._renderInstallationSection()}
			${this._renderUsageSection()}
			${this._renderComponentStatesSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		let option4html: TemplateResult = html``;

		if (this._showOption4) {
			option4html = html`
				<panda-checkbox
					name="option-4"
				>
					Study
				</panda-checkbox>
			`;
		}

		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						TBD
					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">

						<div class="row">
							<div class="col-3">
								<panda-button @click="${this._onToggleOption}">
									TOGGLE OPTION 4
								</panda-button>
							</div>
							<div class="col-3">
								<panda-button @click="${this._onToggleDisabled}">
									TOGGLE DISABLED (${this._disabled ? "ON" : "OFF"})
								</panda-button>
							</div>
							<div class="col-3">
								<panda-button @click="${this._onToggleAlignRight}">
									TOGGLE ALIGN RIGHT (${this._alignRight ? "ON" : "OFF"})
								</panda-button>
							</div>
							<div class="col-3">
								<panda-button @click="${this._onToggleHorizontal}">
									TOGGLE HORIZONTAL (${this._horizontal ? "ON" : "OFF"})
								</panda-button>
							</div>
						</div>
						
						<div class="row">
							<div class="col-full">
								<panda-checkbox-group
									label="Select your options:"
									.horizontal="${this._horizontal}"
									.alignRight="${this._alignRight}"
									.disabled="${this._disabled}"
									@change="${this._onChange}"
								>
									<panda-checkbox name="option-1" checked>
										Get milk
									</panda-checkbox>
									<panda-checkbox name="option-2">
										Feed my cat
									</panda-checkbox>
									<panda-checkbox name="option-3">
										Play with my pet
									</panda-checkbox>
									${option4html}
								</panda-checkbox-group>
							</div>
						</div>

					</div>
				</div>
			</div>
		`;
	}

	private _renderInstallationSection(): TemplateResult {
		return html`
			<!-- INSTALLATION -->
			<div class="content-section" data-content-section-name="${ContentSectionName.INSTALLATION}">
				<div class="section">
					<internal-link theme="h2">Installation</internal-link>
					<p>
						Start by initiating the installation of the npm library through a command executed in either the terminal or command prompt.
						Utilize the package manager, indicating both the library name and its version for installation.
					</p>
	
					<code-sample header="Installation">
						${installationSnippet}
					</code-sample>
				</div>
			</div>
		`;
	}

	private _renderUsageSection(): TemplateResult {
		return html`
			<!-- USAGE -->
			<div class="content-section" data-content-section-name="${ContentSectionName.USAGE}">
				<div class="section">
					<internal-link theme="h2">Usage</internal-link>
					<p>
						Please refer below for instructions on utilizing our component. 
						Experiment with the provided sample code to explore all the features of the component.
					</p>
	
					<code-sample header="Implementation">
						${implementationSnippet}
					</code-sample>
				</div>

				${this._renderComponentPropertiesSection()}
				${this._renderComponentEventsSection()}
				${this._renderComponentInterfaceSection()}
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderComponentPropertiesSection(): TemplateResult {
		return html`
			<!-- COMPONENT PROPERTIES -->
			<div class="section">
				<internal-link theme="h3">Properties</internal-link>
				<p>
					Component properties play a crucial role in specifying the component's behavior, appearance, and functionality, 
					and they are frequently employed for data binding purposes. 
				</p>
				<p>
					Here is a compilation of the supported properties/attributes for this particular component:
				</p>
				
				${this._renderComponentPropertyTable(this._componentProperties)}
			</div>
		`;
	}

	private _renderComponentEventsSection(): TemplateResult {
		return html`
			<!-- COMPONENT EVENTS -->
			<div class="section">
				<internal-link theme="h3">Events</internal-link>
				<p>
					Component events are instrumental in elevating the interactivity and adaptability of software applications. 
					These events serve as carefully designed triggers that facilitate communication between the component and the application, 
					frequently enabling the exchange of data and actions across diverse user interface elements.
				</p>
				<p>
					See list of events provided below:
				</p>
				
				${this._renderComponentEventsTable(this._componentEvents)}
			</div>
		`;
	}

	private _renderComponentInterfaceSection(): TemplateResult {
		return html`
			<!-- COMPONENT INTERFACE -->
			<div class="section">
				<internal-link theme="h3">Interface</internal-link>
				<p>
					Component interface allow developers to interact with and manipulate component from the code level.
					These APIs provide the means to access and control various aspects and functionalities of the element dynamically.
				</p>
				<p>
					See list of available APIs below:
				</p>
				
				${this._renderComponentEventsTable(this._componentInterface)}
			</div>
		`;
	}

	private _renderComponentStatesSection(): TemplateResult {
		return html`
			<!-- COMPONENT STATES -->
			<div class="content-section" data-content-section-name="${ContentSectionName.COMPONENT_STATES}">
				<div class="section">
					<internal-link theme="h2">Component States</internal-link>
					<p>
						Web components typically have different states that reflect their behavior and appearance based on user interaction or application logic.
						Below is the list of few states that are typical to this component:
					</p>
					<ul>
						<li>Default</li>
						<li>Disabled</li>
						<li>Busy</li>
					</ul>
				</div>

				${this._renderDefaultComponentStateSection()}
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderDefaultComponentStateSection(): TemplateResult {
		return html`
			<div class="section">
				<h3>Default</h3>
				<p>
					The default state represents the initial appearance and behavior of the component when it is first rendered or loaded.
					It reflects the component's default settings and may display placeholder content or default styling.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<panda-checkbox
							@change="${this._onChange}"
						>
							Remember Me!
						</panda-checkbox>
					</div>
				</div>
			</div>
		`;
	}


	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChange(event: PandaCheckboxChangeEvent): void {
		console.log("%c ⚡ [CHECKBOX DEMO PAGE] checked", "font-size: 24px; color: orange;", event.detail);

	}

	private _onToggleOption(): void {
		this._showOption4 = !this._showOption4;
	}

	private _onToggleDisabled(): void {
		this._disabled = !this._disabled;
	}

	private _onToggleAlignRight(): void {
		this._alignRight = !this._alignRight;
	}

	private _onToggleHorizontal(): void {
		this._horizontal = !this._horizontal;
	}
}