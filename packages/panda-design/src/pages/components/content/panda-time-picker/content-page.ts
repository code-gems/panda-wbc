// types
import { ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-time-picker";
import "@panda-wbc/panda-time-picker/lib/panda-time-input";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ContentPageTemplate } from "../../../content-page-template";
import { page } from "../../../../utils/page-library";
import { LocalContentSectionName, pageConfig } from "./page-config";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";
import { componentEvents, componentProperties } from "./component-data";

@page(pageConfig)
@customElement("panda-time-picker-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public contentPageConfig = pageConfig;
	public customStyles = styles;

	// demo data
	private readonly _selectItems = [
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" },
	];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
			${this._renderInstallationSection()}
			${this._renderUsageSection()}
			${this._renderFeaturesSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>

					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-select
										.items="${this._selectItems}"
									></panda-select>
								</div>

								<div class="col-3">

									<panda-time-picker
										label="Select time:"
										@change="${this._onInputChange}"
										time-format="24"
									>
										<div slot="prefix">Time</div>
										<div slot="suffix">UTC</div>
									</panda-time-picker>
									
								</div>
								
								<div class="col-3">

									<panda-time-picker
										label="Select time:"
										@change="${this._onInputChange}"
									>
										<div slot="prefix">Time</div>
									</panda-time-picker>

								</div>

								<div class="col-3">
									<panda-button>My Button</panda-button>
								</div>

							</div>
						</div>
					</div>
				</div>

			</div> <!-- END OF CONTENT SECTION -->
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
			</div>
		`;
	}

	private _renderComponentPropertiesSection(): TemplateResult {
		return html`
			<!-- COMPONENT PROPERTIES -->
			<div class="section" data-content-section-name="usage-properties">
				<internal-link theme="h3">Properties</internal-link>
				<p>
					Component properties play a crucial role in specifying the component's behavior, appearance, and functionality, 
					and they are frequently employed for data binding purposes. 
				</p>
				<p>
					Here is a compilation of the supported properties/attributes for this particular component:
				</p>
				
				${this._renderComponentPropertyTable(componentProperties)}
			</div>
		`;
	}

	private _renderComponentEventsSection(): TemplateResult {
		return html`
			<!-- COMPONENT EVENTS -->
			<div class="section" data-content-section-name="usage-events">
				<internal-link theme="h3">Events</internal-link>
				<p>
					Component events are instrumental in elevating the interactivity and adaptability of software applications. 
					These events serve as carefully designed triggers that facilitate communication between the component and the application, 
					frequently enabling the exchange of data and actions across diverse user interface elements.
				</p>
				<p>
					See list of events provided below:
				</p>
				
				${this._renderComponentEventsTable(componentEvents)}
			</div>
		`;
	}

	private _renderFeaturesSection(): TemplateResult {
		return html`
			<div class="content-section" data-content-section-name="${ContentSectionName.FEATURES}">
				<div class="section">
					<internal-link theme="h2">Features</internal-link>
					<p>
						
					</p>
				</div>
				${this._renderTimeFormatFeatureSection()}
			</div>
		`;
	}

	private _renderTimeFormatFeatureSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="${LocalContentSectionName.FEATURES_TIME_FORMAT}">
				<internal-link theme="h3">Time Format</internal-link>
				<p>
					The component provides the option to choose between a 12-hour or 24-hour clock format, allowing users to select their preferred time representation.
				</p>
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-3">
		
									<panda-time-picker
										label="This picker uses 24-hour format:"
										@change="${this._onInputChange}"
										time-format="24"
									></panda-time-picker>
									
								</div>
								<div class="col-3">
		
									<panda-time-picker
										label="This picker uses 12-hour format:"
										@change="${this._onInputChange}"
									></panda-time-picker>
									
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onInputChange(event: any): void {
		const inputValue = event.target.value;
		console.log("Input value changed:", inputValue);
	}

	private _onFocusNext(): void {
		console.log("Focus moved to next element");
	}

	private _onFocusPrev(): void {
		console.log("Focus moved to previous element");
	}
}