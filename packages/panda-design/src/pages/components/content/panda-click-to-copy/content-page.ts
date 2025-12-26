// types
import { ComponentEventDetails, ComponentInterfaceDetails, ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-click-to-copy";

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

@customElement("panda-click-to-copy-content-page")
@page(pageConfig)
export class ContentPage extends ContentPageTemplate {
// page details
public contentPageConfig = pageConfig;
public customStyles = styles;

// demo props
private readonly _componentProperties: ComponentPropertyDetails[] = [
	{ name: "content", type: "String", defaultValue: "-", description: "Content to be copied to clipboard instead of slotted content." },
	{ name: "copyAsHtml", type: "String", defaultValue: "-", description: "Copy content as HTML and preserves new line and tab characters." },
];

private readonly _componentEvents: ComponentEventDetails[] = [
	{ name: "@on-copy", returnType: "PandaClickToCopyEvent", description: "Triggered after user copied component content." }
];

private _componentInterface: ComponentInterfaceDetails[] = [
	{ method: "copyToClipboard", returnType: "void", description: "Copy component's content to clipboard." }
];

@state()
private _showContent: boolean = false;

// ================================================================================================================
// RENDERERS ======================================================================================================
// ================================================================================================================

_renderPageBanner(): TemplateResult {
	return html`
		<div class="banner small">
			<h1>CLICK TO COPY</h1>

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
	let content = html``;
	if (this._showContent) {
		content = html`<div>additional content</div>`
	}
	return html`
		<!-- OVERVIEW -->
		<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
			<div class="section">
				<internal-link theme="h2">Overview</internal-link>
				<p>
					Panda Click to Copy component allows users to instantly copy text or HTML content by simply clicking on it, 
					eliminating the need for manual selection and copy commands. 
					This user-friendly UI element streamlines the copying process, 
					making it more efficient and intuitive for scenarios where users need to copy information like code snippets, 
					addresses, phone numbers or URLs.
				</p>
			</div>

			<button @click="${this._onUpdateSlot}">
				UPDATE SLOT
			</button>

			<div class="sample-cont">
				<div class="sample">

					<panda-click-to-copy
						@on-copy="${this._onCopyContent}"
						copy-as-html
					>
						<h1>Header</h1>
						<div>
							<p>Something to 
								copy</p>
							<br />
							<hr />
							and something else too
						</div>
						${content}
					</panda-click-to-copy>
					<panda-click-to-copy
						position="top"
						@on-copy="${this._onCopyContent}"
						copy-caption="Copy email content"
					>
						<h1>Header</h1>
						<div>
							<p>Something to 
								copy</p>
							<br />
							and something else too
						</div>
						${content}
					</panda-click-to-copy>

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
			${this._renderComponentApiSection()}
		</div>
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

private _renderComponentApiSection(): TemplateResult {
	return html`
		<!-- COMPONENT API -->
		<div class="section">
			<internal-link theme="h3">API</internal-link>
			<p>
				The API enables developers to interact with the component seamlessly from their codebase. 
				It provides a straightforward interface to access the component's methods. 
			</p>
			<p>
				See list of APIs provided below:
			</p>
			
			${this._renderComponentInterfaceTable(this._componentInterface)}
		</div>
	`;
}

private _renderFeaturesSection(): TemplateResult {
	return html`
		<!-- FEATURES -->
		<div class="content-section" data-content-section-name="${ContentSectionName.FEATURES}">
			<div class="section">
				<internal-link theme="h2">Features</internal-link>
				<p>
					The component feature section provides a comprehensive overview of the available features and capabilities of the component. 
					This section serves as a valuable resource for developers, enabling them to understand the full potential of the component and how it can be effectively utilized within their projects. 
				</p>
				<p>
					See list of all supported features below:
				</p>

			</div>
		</div>
	`;
}




// ================================================================================================================
// EVENTS =========================================================================================================
// ================================================================================================================

	private _onCopyContent(event: any): void {
		console.log("%c _onCopyContent", "font-size: 24px; color: green;", event.detail);
	}

	private _onUpdateSlot() {
		this._showContent = !this._showContent;
	}
}