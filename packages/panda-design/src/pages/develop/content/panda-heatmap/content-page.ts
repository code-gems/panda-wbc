// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";
import { PandaRadioGroupChangeEvent } from "@panda-wbc/panda-radio-group";
import { PandaHeatmapOrientation } from "@panda-wbc/panda-heatmap";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-heatmap";
import "@panda-wbc/panda-radio-group";
import "@panda-wbc/panda-theme-controls/lib/panda-theme-mode-switcher";

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

@page(pageConfig)
@customElement("panda-heatmap-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public pageId: string = pageConfig.pageId;
	public customStyles = styles;

	// demo props
	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component." },
		{ name: "icon", type: "String", defaultValue: "-", description: "Custom icon to be shown on the component." },
		{ name: "hideIcon", type: "Boolean", defaultValue: "false", description: "Hide callout icon." },
		{ name: "closable", type: "Boolean", defaultValue: "false", description: "Adds close button to the callout's header and makes it closable." },
		{ name: "spinnerType", type: "String", defaultValue: "dots", description: "Spinner animation type for busy state." },
	];

	private readonly _componentEvents: ComponentEventDetails[] = [
		{ name: "@on-close", returnType: "Event", description: "Triggered when user tries to close callout." }
	];

	private readonly _xAxisLabels: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	private readonly _yAxisLabels: string[] = ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM"];
	 
	private readonly _heatmapData: any[][] = [
		[null, 10, 15, 20, 25, 30, 35],
		[null, 15, 20, 25, 30, 35, 40],
		[15, 20, 25, 30, 35, 40, 45],
		[20, 25, 30, 35, 40, 45, 50],
		[25, 30, 35, 40, 45, 50, null],
	];

	@state()
	private _orientation: PandaHeatmapOrientation = PandaHeatmapOrientation.HORIZONTAL;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>Heatmap</h1>
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
		const cellRenderer = (value: number) => {
			let text = "";
			if (value > 25) {
				text = "high";
			} else {
				text = "low";
			}
			return text;
		}

		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						Heatmap is a web component that renders a visual grid where each cell's color encodes a numeric value, 
						enabling quick insight into patterns across two dimensions. 
						It's typically used to display data density, correlations, or activity intensity in a compact matrix format. 
						Users interact with it to identify hotspots, trends, or outliers at a glance without leaving the page.
						It is a UI component that  can be styled and integrated into larger dashboards or analytics views.
					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-half">
									<panda-theme-mode-switcher></panda-theme-mode-switcher>
								</div>
								<div class="col-half">
									<panda-radio-group
										orientation-horizontal
										label="Orientation"
										.value="${this._orientation}"
										@change="${this._onChangeOrientation}"
									>
										<panda-radio-button value="horizontal">Horizontal</panda-radio-button>
										<panda-radio-button value="vertical">Vertical</panda-radio-button>
									</panda-radio-group>
								</div>
							</div>

							<div class="row">
								<div class="col-full">

									<panda-heatmap
										.data="${this._heatmapData}"
										.xAxisLabels="${this._xAxisLabels}"
										.yAxisLabels="${this._yAxisLabels}"
										show-legend
										.orientation="${this._orientation}"
									></panda-heatmap>

								</div>
							</div>
							<div class="row">
								<div class="col-full">

									<panda-heatmap
										theme="done"
										.data="${this._heatmapData}"
										.xAxisLabels="${this._xAxisLabels}"
										.yAxisLabels="${this._yAxisLabels}"
										max-value="100"
										min-value="0"
										show-legend
										show-tooltip
										.cellRenderer="${cellRenderer}"
										.orientation="${this._orientation}"
									></panda-heatmap>

								</div>
							</div>
							<div class="row">
								<div class="col-full">

									<panda-heatmap
										theme="done"
										.xAxisLabels="${this._xAxisLabels}"
										.yAxisLabels="${this._yAxisLabels}"
										.orientation="${this._orientation}"
									></panda-heatmap>

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
				
				${this._renderComponentPropertyTable(this._componentProperties)}
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
				
				${this._renderComponentEventsTable(this._componentEvents)}
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChangeOrientation(event: PandaRadioGroupChangeEvent): void {
		this._orientation = event.detail.value;
	}
}