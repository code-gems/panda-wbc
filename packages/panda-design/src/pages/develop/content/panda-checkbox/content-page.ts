// types
import {
	ComponentPropertyDetails,
	ComponentEventDetails,
	PageCategory,
	ContentSectionName,
} from "panda-design-typings";
import { PandaCheckboxChangeEvent } from "@panda-wbc/panda-checkbox";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-checkbox";
import "@panda-wbc/panda-particle-banner";

// utils
import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import {
	pageId,
	pageName,
	pageUri,
	keywords,
	description,
	contextMenu
} from "./page-config";
import { implementationSnippet, installationSnippet } from "./snippets/snippets";

@customElement("panda-checkbox-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-checkbox-content-page></panda-checkbox-content-page>`,
})
export class PandaCheckboxContentPage extends ContentPageTemplate {
	// page details
	public customStyles: CSSResultGroup = styles;
	public pageId: string = pageId;

	private _componentProperties: ComponentPropertyDetails[] = [
		{ name: "checked", type: "Boolean", defaultValue: "-", description: "Initial component value." },
	];

	private _componentEvents: ComponentEventDetails[] = [
		{ name: "@change", returnType: "PandaSwitchChangeEvent", description: "Triggered every time component checked value is changed." }
	];

	private _componentInterface: ComponentEventDetails[] = [
		{ name: "toggle()", returnType: "void", description: "Toggle value of the component." },
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
						<h1>CHECKBOX</h1>
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
					<h2>Overview</h2>
					<p>
						Checkbox component is fundamental element in web applications, providing a simple yet effective way for users to make binary choices. 
						It is commonly employed in forms, allowing users to toggle options on or off. 
					</p>
					<p>
						Checkboxes are versatile, serving various purposes such as selecting multiple items from a list, 
						confirming actions, or agreeing to terms and conditions. 
						Their intuitive design enhances user experience by offering a visual representation of choices, 
						and they play a crucial role in user interaction and data submission. With their widespread adoption, 
						checkbox components contribute to creating responsive and user-friendly web interfaces.
					</p>
				</div>

				<!-- OVERVIEW -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="col-full">
								<panda-checkbox
									checked
									@change="${this._onChange}"
									strikethrough
								>
									Get milk
								</panda-checkbox>
							</div>

							<div class="col-full">
								<panda-checkbox
									@change="${this._onChange}"
								>
									Feed my cat
								</panda-checkbox>
							</div>
							
							<div class="col-full">
								<panda-checkbox
									@change="${this._onChange}"
								>
									Play with my pet
								</panda-checkbox>
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
					<h2>Installation</h2>
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
					<h2>Usage</h2>
					<p>
						Please refer below for instructions on utilizing our component. Experiment with the provided sample code to explore all the features of the component.
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
				<h3>Properties</h3>
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
				<h3>Events</h3>
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
				<h3>Interface</h3>
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
					<h2>Component States</h2>
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
		console.log("%c ⚡ [CHECKBOX DEMO PAGE] checked", "font-size: 24px; color: orange;", event.detail.checked);

	}
}