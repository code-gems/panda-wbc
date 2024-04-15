// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-pips-pager";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ContentPageTemplate } from "../../../content-page-template";
import { page } from "../../../../utils/page-library";
import { pageConfig } from "./page-config";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";

@customElement("panda-pips-pager-content-page")
@page(pageConfig)
export class ContentPage extends ContentPageTemplate {
// page details
public pageId: string = pageConfig.pageId;
public customStyles = styles;

// demo props
private _componentProperties: ComponentPropertyDetails[] = [
	{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component." },
	{ name: "icon", type: "String", defaultValue: "-", description: "Custom icon to be shown on the component." },
	{ name: "hideIcon", type: "Boolean", defaultValue: "false", description: "Hide callout icon." },
	{ name: "closable", type: "Boolean", defaultValue: "false", description: "Adds close button to the callout's header and makes it closable." },
	{ name: "spinnerType", type: "String", defaultValue: "dots", description: "Spinner animation type for busy state." },
];

private _componentEvents: ComponentEventDetails[] = [
	{ name: "@on-close", returnType: "Event", description: "Triggered when user tries to close callout." }
];

// ================================================================================================================
// RENDERERS ======================================================================================================
// ================================================================================================================

_renderPageBanner(): TemplateResult {
	return html`
		<div class="banner small">
			<h1>PIPS PAGER</h1>

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
					
					<panda-pips-pager
					
					>
					</panda-pips-pager>

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
		</div>
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

// ================================================================================================================
// EVENTS =========================================================================================================
// ================================================================================================================

// ...
}