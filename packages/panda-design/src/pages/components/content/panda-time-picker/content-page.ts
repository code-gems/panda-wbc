// types
import { ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-time-picker";
import "@panda-wbc/panda-time-picker/lib/panda-time-input";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement, state } from "lit/decorators.js";
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

	@state()
	private _timeFormat = "12";
	
	@state()
	private _value: string | null = null;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
			${this._renderInstallationSection()}
			${this._renderUsageSection()}
			${this._renderComponentStatesSection()}
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
										label="Select time:"

										help-text="This is a help text for the time picker."
										error-message="This is an error message for the time picker."
										.items="${this._selectItems}"
										show-clear-button
										multiselect
										mandatory
									>
										<div slot="prefix">Prefix</div>
										<div slot="suffix">Suffix</div>
									</panda-select>
								</div>

								<div class="col-4">
									<panda-text-field
										label="Select time:"
										.value="${`Text here`}"
										show-clear-button
										help-text="This is a help text for the time picker."
										error-message="This is an error message for the time picker."
										show-character-counter
										mandatory
									>
										<div slot="prefix">Prefix</div>
										<div slot="suffix">Suffix</div>
									</panda-text-field>
								</div>
								<div class="col-4">
									<p>12:30:45 PM</p>
									<panda-time-picker
										label="Select time:"
										.value="${this._value}"
										show-clear-button
										help-text="This is a help text for the time picker."
										error-message="This is an error message for the time picker."
										mandatory
										.views="${["hours", "minutes", "seconds"]}"
										.timeFormat="${this._timeFormat}"
										@change="${this._onChange}"
									>
										<div slot="prefix">Time</div>
										<div slot="suffix">UTC</div>
									</panda-time-picker>
									
								</div>
								
								<div class="col-3">

									<panda-time-picker
										label="Select time:"
										show-clear-button
										@change="${this._onChange}"
										mandatory
										.timeFormat="${this._timeFormat}"
									>
										<div slot="prefix">Time</div>
									</panda-time-picker>

								</div>

								<div class="col-3">
									<panda-button>My Button</panda-button>
								</div>

								<div class="col-3">
									<panda-button @click="${this._onSetValue}">
										SET VALUE
									</panda-button>
								</div>

								<div class="col-3">
									<panda-button @click="${this._onToggleTimeFormat}">
										TOGGLE TIME FORMAT (${this._timeFormat}h)
									</panda-button>
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

	private _renderComponentStatesSection(): TemplateResult {
		return html`
			<div class="content-section" data-content-section-name="${ContentSectionName.COMPONENT_STATES}">
				<div class="section">
					<internal-link theme="h2">Component States</internal-link>
					<p>
						Time Picker component supports various states that can be used to indicate different conditions or modes of the component.
						These states can be triggered based on user interactions or programmatically through component properties.
					</p>
					<ul>
						<li><strong>Default State:</strong> The normal state of the component when it is ready for user interaction.</li>
						<li><strong>Working State:</strong> This state indicates that the component is processing or performing an action, it's accompanied by a visual indicator such as a spinner.</li>
						<li><strong>Read-only State:</strong> In this state, the component is not editable, but it can still receive focus and display information.</li>
						<li><strong>Disabled State:</strong> In this state, the component is not interactive and typically has a dimmed appearance to indicate that it is inactive.</li>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-3">
									<panda-time-picker
										label="Read-only state:"
										readonly
										show-clear-button
										@change="${this._onChange}"
									></panda-time-picker>
								</div>
								<div class="col-3">
									<panda-time-picker
										label="Working state:"
										working
										show-clear-button
										@change="${this._onChange}"
									></panda-time-picker>
								</div>
								<div class="col-3">
									<panda-time-picker
										label="Disabled state:"
										disabled
										show-clear-button
										@change="${this._onChange}"
									></panda-time-picker>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		`;
	}

	private _renderFeaturesSection(): TemplateResult {
		return html`
			<div class="content-section" data-content-section-name="${ContentSectionName.FEATURES}">
				<div class="section">
					<internal-link theme="h2">Features</internal-link>
					<p>
						Explore the various features available in the panda-time-picker component.
					</p>
				</div>
				${this._renderLabelFeatureSection()}
				${this._renderHelpTextFeatureSection()}
				${this._renderErrorMessageFeatureSection()}
				${this._renderTimeFormatFeatureSection()}
				${this._renderViewsFeatureSection()}
				${this._renderMandatoryFeatureSection()}
			</div>
		`;
	}

	private _renderLabelFeatureSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="${LocalContentSectionName.FEATURES_LABEL}">
				<internal-link theme="h3">Label</internal-link>
				<p>
					The component provides a label feature that allows you to display a descriptive text above the time picker input field.
				</p>
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-3">
		
									<panda-time-picker
										label="This is a label for this time picker:"
										@change="${this._onChange}"
									></panda-time-picker>
									
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		`;
	}

	private _renderHelpTextFeatureSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="${LocalContentSectionName.FEATURES_HELP_TEXT}">
				<internal-link theme="h3">Help Text</internal-link>
				<p>
					The component provides a help text feature that allows you to display additional information or guidance below the time picker input field.
				</p>
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-3">
		
									<panda-time-picker
										help-text="This is a help text for this time picker."
										@change="${this._onChange}"
									></panda-time-picker>
									
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		`;
	}

	private _renderErrorMessageFeatureSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="${LocalContentSectionName.FEATURES_ERROR_MESSAGE}">
				<internal-link theme="h3">Error Message</internal-link>
				<p>
					The component provides an error message feature that allows you to display validation messages or errors below the time picker input field.

				</p>
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-3">
		
									<panda-time-picker
										error-message="This is an error message for this time picker."
										@change="${this._onChange}"
									></panda-time-picker>
									
								</div>
							</div>
						</div>
					</div>
				</div>
				
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
										@change="${this._onChange}"
										time-format="24"
									></panda-time-picker>
									
								</div>
								<div class="col-3">
		
									<panda-time-picker
										label="This picker uses 12-hour format:"
										@change="${this._onChange}"
									></panda-time-picker>
									
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		`;
	}

	private _renderViewsFeatureSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="${LocalContentSectionName.FEATURES_VIEWS}">
				<internal-link theme="h3">Views</internal-link>
				<p>
					The component allows you to customize the views displayed in the time picker, such as hours, minutes, and seconds.
					You can specify which views are visible by setting the <code>views</code> attribute or property.
				</p>
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-3">
		
									<panda-time-picker
										label="This picker shows hours, minutes, and seconds:"
										views="hours, minutes, seconds"
										@change="${this._onChange}"
									></panda-time-picker>
									
								</div>
								<div class="col-3">
		
									<panda-time-picker
										label="This picker shows only hours:"
										views="hours"
										@change="${this._onChange}"
									></panda-time-picker>
									
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		`;
	}

	private _renderMandatoryFeatureSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="${LocalContentSectionName.FEATURES_MANDATORY}">
				<internal-link theme="h3">Mandatory</internal-link>
				<p>
					The component allows you to specify whether the time picker is mandatory or not.
					You can set the <code>mandatory</code> attribute or property to enforce this requirement.
				</p>
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-3">
		
									<panda-time-picker
										label="This picker is mandatory:"
										mandatory
										@change="${this._onChange}"
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

	private _onChange(event: any): void {
		const inputValue = event.detail.value;
		console.log(
			`%c 🧪 [DEMO] (change event) New value: ${inputValue}`,
			"font-size: 24px; color: green; background: black; padding: 5px; border-radius: 10px;"
		);
	}

	private _onToggleTimeFormat(): void {
		this._timeFormat = this._timeFormat === "12" ? "24" : "12";
		console.log(
			`%c ⚡ [DEMO] (_onToggleTimeFormat) New value: ${this._timeFormat}`,
			"font-size: 24px; color: orange; background: black; padding: 5px; border-radius: 10px;"
		);
	}

	private _onSetValue(): void {
		this._value = "2:45 PM";
		console.log(
			`%c ⚡ [DEMO] (_onSetValue) New value: ${this._value}`,
			"font-size: 24px; color: orange; background: black; padding: 5px; border-radius: 10px;"
		);
	}
}