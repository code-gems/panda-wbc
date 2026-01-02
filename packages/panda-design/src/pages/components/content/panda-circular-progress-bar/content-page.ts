// types
import { ComponentPropertyDetails, ContentSectionName, Store } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-circular-progress-bar";
import "@panda-wbc/panda-counter";
import "@panda-wbc/panda-button";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ContentPageTemplate } from "../../../content-page-template";
import { reduxify } from "../../../../redux/store";
import { page } from "../../../../utils/page-library";
import { pageConfig } from "./page-config";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";

@customElement("panda-circular-progress-bar-content-page")
@page(pageConfig)
@reduxify()
export class ContentPage extends ContentPageTemplate {
	// page details
	public contentPageConfig = pageConfig;
	public customStyles = styles;

	// demo props
	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component." },
		{ name: "value", type: "Number", defaultValue: "-", description: "Sets progress bar value between 0 - 100 [deg]." },
		{ name: "gradientAngle", type: "Number", defaultValue: "180", description: "Changes rotation angle of two progress bar gradient colors [deg]." },
		{ name: "thickness", type: "Number", defaultValue: "5", description: "Changes progress bar default thickness [px]." },
		{ name: "showScale", type: "Boolean", defaultValue: "false", description: "Shows progress bar scale / dashed circle." },
		{ name: "dashed", type: "Boolean", defaultValue: "false", description: "Changes progress bar style to dashed lines." },
		{ name: "counterclockwise", type: "Boolean", defaultValue: "false", description: "Changes progress bar default direction from clockwise to counterclockwise." },
		{ name: "busy", type: "boolean", defaultValue: "false", description: "Sets busy state for the component and displays loading animation." },
	];

	@state()
	private _busy: boolean = false;

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

					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">

									<panda-circular-progress-bar
										.value="${100}"
										.thickness="${15}"
										dashed
										show-scale
										.busy="${this._busy}"
									>
										<div class="details">
											<label>SALES</label>
											<div class="progress">66%</div>
										</div>
									</panda-circular-progress-bar>

								</div>

								<div class="col-4">

									<panda-circular-progress-bar
										.value="${75}"
										.thickness="${7}"
										.busy="${this._busy}"
										show-scale
									>
										<panda-circular-progress-bar style="width: 80px; height: 80px;"
											class="custom"
											.value="${85}"
											.thickness="${10}"
											.busy="${this._busy}"
											show-scale
										>
											<div class="details">
												<label>SALES</label>
												<panda-counter
													class="progress"
													.value="${62}"
												>
													<div slot="suffix">%</div>											
												</panda-counter>
											</div>

										</panda-circular-progress-bar>
									</panda-circular-progress-bar>

								</div>

								<div class="col-4">

									<panda-circular-progress-bar
										.value="${50}"
										.thickness="${3}"
										show-scale
										.busy="${this._busy}"
										counterclockwise
									>
										50%
									</panda-circular-progress-bar>


									<panda-button
										@click="${this._onToggleBusy}"
									>
										TOGGLE BUSY STATE
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
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onToggleBusy(): void {
		this._busy = !this._busy;
	}

}