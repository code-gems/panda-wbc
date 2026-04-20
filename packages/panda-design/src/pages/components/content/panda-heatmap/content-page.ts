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
	public contentPageConfig = pageConfig;
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
	private readonly _xAxisLabelsShort: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	private readonly _yAxisLabels: string[] = ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM"];
	 
	private readonly _heatmapData: any[][] = [
		[null, 10, 15, 20, 25, 30, 35],
		[null, 15, 20, 25, 30, 35, 40],
		[15, 20, 25, 30, 35, 40, 45],
		[20, 25, 30, 35, 40, 45, 50],
		[25, 30, 35, 40, 45, 50, null],
	];
	 
	private readonly _heatmapData2: any[][] = [
		[null, { id: "Item 1", value: 10 }, { id: "Item 2", value: 15 }, { id: "Item 3", value: 20 }, { id: "Item 4", value: 25 }, { id: "Item 5", value: 30 }, { id: "Item 6", value: 35 }],
		[null, { id: "Item 7", value: 15 }, { id: "Item 8", value: 20 }, { id: "Item 9", value: 25 }, { id: "Item 10", value: 30 }, { id: "Item 11", value: 35 }, { id: "Item 12", value: 40 }],
		[{ id: "Item 13", value: 15 }, { id: "Item 14", value: 20 }, { id: "Item 15", value: 25 }, { id: "Item 16", value: 30 }, { id: "Item 17", value: 35 }, { id: "Item 18", value: 40 }, { id: "Item 19", value: 45 }],
		[{ id: "Item 20", value: 20 }, { id: "Item 21", value: 25 }, { id: "Item 22", value: 30 }, { id: "Item 23", value: 35 }, { id: "Item 24", value: 40 }, { id: "Item 25", value: 45 }, { id: "Item 26", value: 50 }],
		[{ id: "Item 27", value: 25 }, { id: "Item 28", value: 30 }, { id: "Item 29", value: 35 }, { id: "Item 30", value: 40 }, { id: "Item 31", value: 45 }, { id: "Item 32", value: 50 }, null],
	];

	@state()
	private _working = false;

	@state()
	private _orientation: PandaHeatmapOrientation = PandaHeatmapOrientation.HORIZONTAL;

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
		const cellRenderer = (value: number | null, column: number, row: number) => {
			if (value == null) {
				return "none";
			}

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
									<style>
										panda-heatmap {
											--panda-heatmap-cell-background-color-empty: var(--panda-background-color);
											--panda-heatmap-cell-transform-hover: scale(1.15);
											--panda-heatmap-cell-elevation-hover: var(--panda-elevation-s, 0px 1px 2px hsl(0deg 0% 0% / 20%));
										}
									</style>
									<panda-heatmap
										.data="${[]}"
										.xAxisLabels="${this._xAxisLabelsShort}"
										.yAxisLabels="${this._yAxisLabels}"
										.orientation="${this._orientation}"
										show-legend
										show-values
										x-axis-label-position="bottom"
										y-axis-label-position="right"
										@select="${this._onSelect}"
										@hover="${this._onMouseOver}"
										@leave="${this._onMouseOut}"
										?working="${this._working}"
									></panda-heatmap>

								</div>

								<div class="col-half">

									<panda-heatmap
										class="large-heatmap"
										theme="alert"
										max-value="50"
										min-value="0"
										show-values
										show-legend
										show-tooltip
										min-color="hsl(191deg 19% 23% / 1%)"
										max-color="hsl(330deg 70% 50% / 50%)"
										.data="${this._heatmapData}"
										.xAxisLabels="${this._xAxisLabels}"
										.yAxisLabels="${this._yAxisLabels}"
										.orientation="${this._orientation}"
										.cellRenderer="${cellRenderer}"
										.tooltipRenderer="${(value: number) => `Value: ${value}`}"
										@select="${this._onSelect}"
										@hover="${this._onMouseOver}"
										@leave="${this._onMouseOut}"
									></panda-heatmap>

								</div>
							</div>

							<div class="row">
								<div class="col-3">
									<panda-button @click="${this._onToggleWorkingState}">
										Toggle working state
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

	private _onSelect(event: CustomEvent): void {
		const { column, row, value, data } = event.detail;
		console.log(`%c ⚡ Cell Selected`, "font-size: 24px; color: green; background: black;", column, row, value, data);
	}

	private _onMouseOver(event: CustomEvent): void {
		const { column, row, value, data } = event.detail;
		console.log(`%c 👀 Cell Mouse Over event`, "font-size: 24px; color: orange; background: black;", event);
		console.log(`%c 👀 Cell Mouse Over`, "font-size: 24px; color: orange; background: black;", column, row, value, data);
	}

	private _onMouseOut(event: CustomEvent): void {
		const { column, row, value, data } = event.detail;
		console.log(`%c 👀 Cell Mouse Out`, "font-size: 24px; color: orange; background: black;", column, row, value, data);
	}

	// toggle working state for demo purposes
	private _onToggleWorkingState(): void {
		this._working = !this._working;
	}
}