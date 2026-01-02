// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-badge";

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

@page(pageConfig)
@customElement("panda-badge-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public contentPageConfig = pageConfig;
	public customStyles = styles;

	// demo props
	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component." },
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
						Panda Badge components is a lightweight, visually distinct element used to provide quick, 
						contextual information such as notification counts, status indicators, 
						or content categorization without cluttering the interface. 
						They often appear as numeric values, text labels, or icons positioned near related UI elements to highlight updates, statuses, or prompt user actions, thereby enhancing usability and engagement.
					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row underline">
								<div class="col-3">THEME</div>
								<div class="col-3">DEFAULT</div>
								<div class="col-3">OUTLINE</div>
								<div class="col-3">FLAT</div>
							</div>
							<div class="row">
								<div class="col-3">PRIMARY</div>
								<div class="col-3"><panda-badge theme="primary">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="primary outline">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="primary flat">My Badge</panda-badge></div>
							</div>
							<div class="row">
								<div class="col-3">SECONDARY</div>
								<div class="col-3"><panda-badge theme="secondary">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="secondary outline">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="secondary flat">My Badge</panda-badge></div>
							</div>
							<div class="row">
								<div class="col-3">TERTIARY</div>
								<div class="col-3"><panda-badge theme="tertiary">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="tertiary outline">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="tertiary flat">My Badge</panda-badge></div>
							</div>
							<div class="row underline">
								<div class="col-3">ACTION THEMES</div>
								<div class="col-3"></div>
								<div class="col-3"></div>
								<div class="col-3"></div>
							</div>
							<div class="row">
								<div class="col-3">INFO</div>
								<div class="col-3"><panda-badge theme="info">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="info outline">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="info flat">My Badge</panda-badge></div>
							</div>
							<div class="row">
								<div class="col-3">DONE</div>
								<div class="col-3"><panda-badge theme="done">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="done outline">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="done flat">My Badge</panda-badge></div>
							</div>
							<div class="row">
								<div class="col-3">WARNING</div>
								<div class="col-3"><panda-badge theme="warning">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="warning outline">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="warning flat">My Badge</panda-badge></div>
							</div>
							<div class="row">
								<div class="col-3">ALERT</div>
								<div class="col-3"><panda-badge theme="alert">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="alert outline">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="alert flat">My Badge</panda-badge></div>
							</div>
							<div class="row underline">
								<div class="col-3">SIZE THEMES</div>
								<div class="col-3"></div>
								<div class="col-3"></div>
								<div class="col-3"></div>
							</div>
							<div class="row">
								<div class="col-3">SIZE-S</div>
								<div class="col-3"><panda-badge theme="size-s">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="size-s outline">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="size-s flat">My Badge</panda-badge></div>
							</div>
							<div class="row">
								<div class="col-3">SIZE-L</div>
								<div class="col-3"><panda-badge theme="size-l">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="size-l outline">My Badge</panda-badge></div>
								<div class="col-3"><panda-badge theme="size-l flat">My Badge</panda-badge></div>
							</div>
							<div class="row underline">
								<div class="col-3">FLUID THEME</div>
								<div class="col-3"></div>
								<div class="col-3"></div>
								<div class="col-3"></div>
							</div>
							<div class="row">
								<div class="col-3"></div>
								<div class="col-3"><panda-badge theme="primary fluid">Very long badge label that just spans forever</panda-badge></div>
								<div class="col-3"><panda-badge theme="primary fluid outline">Very long badge label that just spans forever</panda-badge></div>
								<div class="col-3"><panda-badge theme="primary fluid flat">Very long badge label that just spans forever</panda-badge></div>
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
				
				${this._renderComponentPropertyTable(this._componentProperties)}
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}