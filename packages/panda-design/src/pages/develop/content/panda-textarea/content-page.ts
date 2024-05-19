// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-textarea";
import "@panda-wbc/panda-text-field";
import "@panda-wbc/panda-checkbox";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ContentPageTemplate } from "../../../content-page-template";
import { page } from "../../../../utils/page-library";
import { pageConfig } from "./page-config";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";

@customElement("panda-textarea-content-page")
@page(pageConfig)
export class ContentPage extends ContentPageTemplate {
// page details
public pageId: string = pageConfig.pageId;
public customStyles = styles;

// component props
private _componentProperties: ComponentPropertyDetails[] = [
	{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component." },
	{ name: "value", type: "String", defaultValue: "-", description: "Component input value." },
	{ name: "label", type: "String", defaultValue: "-", description: "Component label that appears above the component." },
	{ name: "rows", type: "Number", defaultValue: "-", description: "Specifies the visible height of a text area, in lines." },
	{ name: "cols", type: "Number", defaultValue: "-", description: "Specifies the visible width of a text area." },
	{ name: "placeholder", type: "String", defaultValue: "-", description: "Placeholder text shown in case no initial value is provided." },
	{ name: "disabled", type: "Boolean", defaultValue: "false", description: "Sets a disabled state for the component." },
	{ name: "busy", type: "Boolean", defaultValue: "false", description: "Sets busy state for the component." },
	{ name: "autofocus", type: "Boolean", defaultValue: "false", description: "Sets the focus to the component on page load." },
	{ name: "autoselect", type: "Boolean", defaultValue: "false", description: "Select component value when given focus." },
	{ name: "spellcheck", type: "Boolean", defaultValue: "false", description: "Enables spellcheck for the entered values." },
	{ name: "mandatory", type: "Boolean", defaultValue: "false", description: "Visually indicates required field if value is not set." },
	{ name: "spinnerType", type: "String", defaultValue: "dots", description: "Spinner animation type for busy state." },
	{ name: "maxLength", type: "Number", defaultValue: "-", description: "Indicate limit of entered characters for the field. Can be combined with hardLimit property." },
	{ name: "showLength", type: "Boolean", defaultValue: "false", description: "Show counter indicating entered characters. Can be combined with maxLength property." },
	{ name: "hardLimit", type: "Boolean", defaultValue: "false", description: "Prevent from entering more characters than defined as maxLength." },
];

private _componentEvents: ComponentEventDetails[] = [
	{ name: "@on-input", returnType: "PandaTextFieldOnInputEvent", description: "Triggered every time user inputs a new value." },
	{ name: "@change", returnType: "Event", description: "Triggered when component content changed." }
];

private _componentInterface: ComponentEventDetails[] = [
	{ name: "focus()", returnType: "void", description: "Set focus to the input field." },
	{ name: "clear()", returnType: "void", description: "Clears input value and triggers @on-input event." },
];

// demo props
@state()
private _autoselect = false;

@state()
private _spellcheck = false;

@state()
private _disabled = false;

@state()
private _busy = false;

// ================================================================================================================
// RENDERERS ======================================================================================================
// ================================================================================================================

_renderPageBanner(): TemplateResult {
	return html`
		<div class="banner small">
			<h1>TEXTAREA</h1>

			<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
		</div>
	`;
}

_renderPageContent(): TemplateResult {
	return html`
		${this._renderOverviewSection()}
		${this._renderInstallationSection()}
		${this._renderUsageSection()}
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
							
							<div class="col-half">
								<panda-text-field
									placeholder="Enter remarks..."
								>
								</panda-text-field>

								<panda-textarea
									theme="valid"
									label="Remarks:"
									placeholder="Enter remarks..."
									resize="vertical"
									.value="${`Initial value...`}"
									.autoselect="${this._autoselect}"
									.spellcheck="${this._spellcheck}"
									.rows="${2}"
									.cols="${50}"
									.disabled="${this._disabled}"
									.busy="${this._busy}"
									maxlength="50"
									mandatory
									autofocus
									show-length
									hard-limit
									@change="${this._onChange}"
									@on-input="${this._onInput}"
								>
								</panda-textarea>
							</div>

							<div class="col-half">
								<panda-checkbox-group
									@change="${this._onFeatureToggle}"
								>
									<panda-checkbox name="autoselect">Autoselect</panda-checkbox>
									<panda-checkbox name="spellcheck">Spellcheck</panda-checkbox>
									<panda-checkbox name="disabled">Disabled</panda-checkbox>
									<panda-checkbox name="busy">Busy</panda-checkbox>
								</panda-checkbox-group>
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
					Please refer below for instructions on utilizing our component. Experiment with the provided sample code to explore all the features of the component.
				</p>

				<code-sample header="Implementation">
					${implementationSnippet}
				</code-sample>

			</div>
			${this._renderComponentPropertiesSection()}
			${this._renderComponentEventsSection()}
			${this._renderComponentInterfaceSection()}
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
		<!-- COMPONENT EVENTS -->
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

// ================================================================================================================
// EVENTS =========================================================================================================
// ================================================================================================================

	private _onInput(event: any) {
		console.log("%c _onInput", "font-size: 24px; color: green;", event);
	}

	private _onChange(event: any) {
		console.log("%c _onChange", "font-size: 24px; color: green;", event);
	}
	
	private _onFeatureToggle(event: any) {
		console.log("%c _onFeatureToggle", "font-size: 24px; color: green;", event.detail);
		switch (event.detail.name) {
			case "autoselect":
				this._autoselect = event.detail.checked;
				break;
			case "spellcheck":
				this._spellcheck = event.detail.checked;
				break;
			case "disabled":
				this._disabled = event.detail.checked;
				break;
			case "busy":
				this._busy = event.detail.checked;
				break;
		}
		
	}
}