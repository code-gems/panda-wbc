// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName, PageCategory } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-text-field";
import "@panda-wbc/panda-particle-banner";

// utils
import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
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
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// code snippets
import {
	busyStateSnippet,
	disabledStateSnippet,
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";
import { PandaTextFieldOnInputEvent } from "@panda-wbc/panda-text-field";

@customElement("panda-text-field-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-text-field-content-page></panda-text-field-content-page>`
})
export class PandaTextFieldContentPage extends ContentPageTemplate {
	// page details
	public pageId: string = pageId;
	public customStyles: CSSResultGroup = styles;

	private _componentProperties: ComponentPropertyDetails[] = [
		{ name: "value", type: "String", defaultValue: "-", description: "Component input value." },
		{ name: "label", type: "String", defaultValue: "-", description: "Component label that appears above the component." },
		{ name: "placeholder", type: "String", defaultValue: "-", description: "Text to show in case no value is selected." },
		{ name: "disabled", type: "Boolean", defaultValue: "false", description: "Sets a disabled state for the component." },
		{ name: "busy", type: "Boolean", defaultValue: "false", description: "Sets busy state for the component." },
		{ name: "autofocus", type: "Boolean", defaultValue: "false", description: "Sets the focus to the component on page load." },
		{ name: "autoselect", type: "Boolean", defaultValue: "false", description: "Select component value when given focus." },
		{ name: "spellcheck", type: "Boolean", defaultValue: "false", description: "Enables spellcheck for the entered values." },
		{ name: "mandatory", type: "Boolean", defaultValue: "false", description: "Visually indicates required field if value is not set." },
		{ name: "theme", type: "String", defaultValue: "-", description: "Color theme for a component." },
		{ name: "spinnerType", type: "String", defaultValue: "dots", description: "Spinner animation type for busy state." },
	];

	private _componentEvents: ComponentEventDetails[] = [
		{ name: "@on-input", returnType: "PandaTextFieldOnInputEvent", description: "Triggered every time user inputs a new value." },
		{ name: "@change", returnType: "PandaTextFieldOnInputEvent", description: "Triggered every time component's value changes." },
	];

	private _componentInterface: ComponentEventDetails[] = [
		{ name: "focus()", returnType: "void", description: "Set focus to the input field." },
		{ name: "clear()", returnType: "void", description: "Clears input value and triggers @on-input event." },
	];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		const primaryColor = getComputedStyle(this).getPropertyValue("--panda-primary-color");
		const secondaryColor = getComputedStyle(this).getPropertyValue("--panda-secondary-color");
		const tertiaryColor = getComputedStyle(this).getPropertyValue("--panda-tertiary-color");

		const bannerConfig: PandaParticleBannerConfig = {
			particleGroup: [{
				particleCount: 50,
				blur: true,
				colors: [primaryColor, secondaryColor, tertiaryColor]
			}]
		};
		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner
					.config="${bannerConfig}"					
				>
					<div class="content">
						<h1>TEXT FIELD</h1>
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
						Text fields are often used to collect user information, such as names, addresses, email addresses, and other personal details.
						They provide a straightforward and familiar interface for users to input data, facilitating the registration or account creation process. 
					</p>
					<p>
						Text fields play a crucial role in form submissions, where users provide specific information or answer questions.
						For example, they can be used to gather feedback, complete surveys, submit contents, or enter search queries.
						Text fields allow users to communicate their thoughts or provide specific input to the application.
					</p>
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
				${this._renderDisabledComponentStatesSection()}
				${this._renderBusyComponentStatesSection()}
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
						<div class="form">
							<div class="form-section">
								<div class="row">
									<div class="col-full">
										<panda-text-field
											.label="${"First Name:"}"
											.placeholder="${"Enter..."}"
											@on-input="${this._onInput}"
										>
										</panda-text-field>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	private _renderDisabledComponentStatesSection() {
		return html`
			<div class="section">
				<h3>Disabled</h3>
				<p>
					Components can enter a disabled state when they are not editable or interactable.
					Component is then visually presented as disabled, providing clarity to user that they cannot be modified.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="form">
							<div class="form-section">
								<div class="row">
									<div class="col-full">
										<panda-text-field
											.label="${"First Name:"}"
											.placeholder="${"Enter..."}"
											.value="${"James"}"
											@on-input="${this._onInput}"
											disabled
										>
										</panda-text-field>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<code-sample header="Disabled State Example">
					${disabledStateSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderBusyComponentStatesSection() {
		return html`
			<div class="section">
				<h3>Busy</h3>
				<p>
					Components can enter a disabled state when they are not editable or interactable.
					Component is then visually presented as disabled, providing clarity to user that they cannot be modified.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="form">
							<div class="form-section">
								<div class="row">
									<div class="col-full">
										<panda-text-field
											.label="${"First Name:"}"
											.placeholder="${"Enter.."}"
											.value="${"James"}"
											@on-input="${this._onInput}"
											busy
										>
										</panda-text-field>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<code-sample header="Busy State Example">
					${busyStateSnippet}
				</code-sample>
			</div>
		`;
	}



	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onInput(event: PandaTextFieldOnInputEvent) {
		console.log("%c 🔥 [TEXT FIELD DEMO PAGE] _onInput::value", "font-size: 24px; color: orange;", event.detail.value);
	}
}