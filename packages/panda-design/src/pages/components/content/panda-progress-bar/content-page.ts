// types
import { ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-progress-bar";
import "@panda-wbc/panda-callout";

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

@customElement("panda-progress-bar-content-page")
@page(pageConfig)
class ContentPage extends ContentPageTemplate {
	// page details
	public contentPageConfig = pageConfig;
	public customStyles = styles;

	// demo props
	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component." },
		{ name: "value", type: "Number", defaultValue: "-", description: "Currently progress value." },
		{ name: "bufferValue", type: "Number", defaultValue: "0", description: "Currently buffered progress value." },
		{ name: "min", type: "Number", defaultValue: "0", description: "The minimal progress value." },
		{ name: "max", type: "Number", defaultValue: "100", description: "The maximal progress value." },
		{ name: "showProgressValue", type: "Boolean", defaultValue: "false", description: "Shows progress text above the component." },
		{ name: "indeterminate", type: "Boolean", defaultValue: "false", description: "Indeterminate state indicator." },
	];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

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
						A progress bar component is a visual element commonly used in web applications to indicate the status of a task or process that is in progress. 
						It provides users with a visual representation of the completion level of an ongoing operation.
					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<div class="rows width-20">
							<div class="row">
								<div class="col-full">

									<panda-progress-bar
										theme="candy"
										label="Downloading..."
										.value="${50}"
										.bufferValue="${60}"
										.indeterminate="${false}"
									>
									</panda-progress-bar>

								</div>
							</div>

							<div class="row">
								<div class="col-full">

									<panda-progress-bar
										label="Loading..."
										.value="${25}"
									>
									</panda-progress-bar>

								</div>
							</div>

							<div class="row">
								<div class="col-full">

									<panda-progress-bar
										theme="tertiary"
										label="Progress:"
										.min="${0}"
										.max="${134}"
										.value="${100}"
										show-progress-value
									>
									</panda-progress-bar>

								</div>
							</div>

							<div class="row">
								<div class="col-full">

									<panda-progress-bar
										label="Please wait..."
										.value="${40}"
										indeterminate
									>
									</panda-progress-bar>

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

				<panda-callout class="push-m" theme="info">
					<div>
						Boolean type properties can be applied using attribute syntax 
						eg. <i class="property">.showProgressValue="\${true}"</i> is the same as <i class="property">show-progress-value</i>.
					</div>
				</panda-callout>
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}