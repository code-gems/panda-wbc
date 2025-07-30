// types
import { ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";
import { PandaComboBoxChangeEvent, PandaComboBoxItem } from "@panda-wbc/panda-combo-box";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-combo-box";

// utils & config
import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { pageConfig } from "./page-config";
import { ContentPageTemplate } from "../../../content-page-template";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";

@page(pageConfig)
@customElement("panda-spinner-content-page")
export class PandaSpinnerContentPage extends ContentPageTemplate {
	// page details
	public pageId = pageConfig.pageId;
	public customStyles = styles;

	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "spinner", type: "String", defaultValue: "-", description: "Spinner type to display." },
	];

	// demo props
	@state()
	private _selectedSpinnerType = "dots";

	private readonly _spinnerTypeList: PandaComboBoxItem[] = [
		{ label: "dots (default)", value: "dots" },
		{ label: "circle", value: "circle" },
		{ label: "google", value: "google" },
		{ label: "video", value: "video" },
	];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>SPINNER</h1>
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
						Spinner component provides an animated visual indicator, 
						commonly used to show loading status or ongoing processes to users. 
						It typically features smooth, customizable animations like spinning or growing effects, 
						helping to improve user experience by signaling that content or actions are being processed.
					</p>
				</div>

				<div class="form-cont">
					<div class="form">
						<div class="rows">

							<div class="row">
								<div class="col-half spinner-demo">
									<panda-spinner .spinner="${this._selectedSpinnerType}"></panda-spinner>
								</div>
								<div class="col-half">
									<panda-combo-box
										label="Spinner Type"
										placeholder="Select spinner type"
										.value="${this._selectedSpinnerType}"
										.items="${this._spinnerTypeList}"
										@change="${this._onSpinnerTypeChange}"
									></panda-combo-box>
								</div>
							</div><!-- row -->

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

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onSpinnerTypeChange(event: PandaComboBoxChangeEvent): void {
		this._selectedSpinnerType = event.detail.value;
	}
}