// types
import {
	ComponentPropertyDetails,
	ComponentEventDetails,
	ContentSectionName,
} from "panda-design-typings";
import { PandaSwitchChangeEvent } from "@panda-wbc/panda-switch";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-switch";

// utils
import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import { pageConfig } from "./page-config";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";

// static data
// ...

@page(pageConfig)
@customElement("panda-switch-content-page")
export class PandaSwitchContentPage extends ContentPageTemplate {
	// page details
	public customStyles = styles;
	public pageId = pageConfig.pageId;

	private _componentProperties: ComponentPropertyDetails[] = [
		{ name: "checked", type: "Boolean", defaultValue: "-", description: "Initial component value." },
	];

	private _componentEvents: ComponentEventDetails[] = [
		{ name: "@change", returnType: "PandaSwitchChangeEvent", description: "Triggered every time component checked value is changed." }
	];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		const primaryColor = getComputedStyle(this).getPropertyValue("--panda-primary-color");
		const bannerConfig: PandaParticleBannerConfig = {
			particleGroup: [{
				particleCount: 50,
				blur: true,
				blurMax: 5,
				blurMin: 2,
				colors: [primaryColor],
				colorOpacityVariation: 50,
				colorSaturationVariation: 10,
				maxSpeedX: 0.1,
				minSpeedX: -0.1,
				maxSpeedY: -0.5,
				minSpeedY: -0.1,
				sizeMax: 80,
				sizeMin: 40
			}]
		};
		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner
					.config="${bannerConfig}"
				>
					<div class="content">
						<h1>SWITCH</h1>
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
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						Select component in web applications offers a flexible and versatile way to create dropdown menus that align with the application's design and functionality requirements. 
						Its ability to enhance styling, provide customization options, improve accessibility, and support various user interactions makes it a valuable component 
						for creating a more user-centric and engaging web experience.
					</p>
				</div>

				<!-- OVERVIEW -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="col-full">
								<panda-text-field></panda-text-field>
							</div>

							<div class="col-full">
								<panda-switch
									label="User Active"
									@change="${this._onChange}"
								>
								</panda-select>
							</div>
							<div class="col-full">
								<panda-switch
									label="User Active"
									@change="${this._onChange}"
								>
								</panda-select>
							</div>
							
							<div class="col-full">
								<panda-text-field></panda-text-field>
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
						Please refer below for instructions on utilizing our component. Experiment with the provided sample code to explore all the features of the component.
					</p>
	
					<code-sample header="Implementation">
						${implementationSnippet}
					</code-sample>

				</div>
				${this._renderComponentPropertiesSection()}
				${this._renderComponentEventsSection()}
			</div>
		`;
	}

	private _renderComponentPropertiesSection(): TemplateResult {
		return html`
			<!-- COMPONENT PROPERTIES -->
			<div class="section" data-content-section-name="${ContentSectionName.PROPERTIES}">
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
			<!-- COMPONENT PROPERTIES -->
			<div class="section" data-content-section-name="${ContentSectionName.EVENTS}">
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
	
	private _renderComponentStatesSection(): TemplateResult {
		return html`
			<!-- COMPONENT STATES -->
			<div class="content-section" data-content-section-name="${ContentSectionName.COMPONENT_STATES}">
				<div class="section">
					<internal-link theme="h2">Component States</internal-link>
					<p>
						Web components typically exhibit various states that mirror their behavior and appearance, adapting to user interactions or the logic of the application. 
						Provided below is a selection of commonly encountered states:
					</p>
					<ul>
						<li>default</li>
						<li>disabled</li>
						<li>working</li>
					</ul>
				</div>

				${this._renderDefaultComponentStateSection()}
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderDefaultComponentStateSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="component-states-default">
				<h3>Default</h3>
				<p>
					The default state represents the initial appearance and behavior of the component when it is first rendered or loaded.
					It reflects the component's default settings and may display placeholder content or default styling.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<panda-switch
							@change="${this._onChange}"
						>
						</panda-switch>
					</div>
				</div>
			</div>
		`;
	}


	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChange(event: PandaSwitchChangeEvent) {
		console.log("%c _onChange", "font-size: 24px; color: green;", event.detail);
	}
}