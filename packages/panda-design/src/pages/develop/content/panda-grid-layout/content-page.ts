// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-grid-layout";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { ContentPageTemplate } from "../../../content-page-template";
import { page } from "../../../../utils/page-library";
import { pageConfig } from "./page-config";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";
import { PandaGridPanel } from "@panda-wbc/panda-grid-layout/lib/panda-grid-panel";

@page(pageConfig)
@customElement("panda-grid-layout-content-page")
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

	@state()
	private _addElement: boolean = false;

	private _gridConfig = {
		panelSize: 150,
		responsive: false,
	};

	private _panelList = [
		{ id: "panel-0", width: 1, height: 1 },
		{ id: "panel-1", width: 1, height: 1 },
		// { id: "panel-2", width: 1, height: 1 },
		// { id: "panel-3", width: 1, height: 2 },
		// { id: "panel-4", width: 1, height: 1 },
		// { id: "panel-5", width: 1, height: 1 },
		// { id: "panel-6", width: 1, height: 1 },
		// { id: "panel-7", width: 10, height: 1, minWidth: 3, minHeight: 2 },
		// { id: "panel-8", width: 1, height: 1 },
		// { id: "panel-9", width: 1, height: 1 },
		// { id: "panel-10", width: 1, height: 1 },
	]

	@query("#panel-0")
	private _firstPanelEl!: PandaGridPanel;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>GRID LAYOUT</h1>
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
		let _elementHtml = html``;
		if (this._addElement) {
			_elementHtml = html`
				<panda-grid-panel
					width="1"
					height="1"
					min-width="1"
					movable
					resizable
				>
					<div class="drag-handle" slot="drag-handle">DRAG HANDLE</div>
					New Panel
				</panda-grid-panel>
			`;
		}

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
								<div class="col-3">
									<button @click="${this._onAddPanel}">ADD ELEMENT</button>
								</div>
								<div class="col-3">
									<button @click="${this._onMovePanel}">RESIZE PANEL</button>
								</div>
								<div class="col-full">

									<panda-grid-layout
										.gridConfig="${this._gridConfig}"
										responsive
										style="width: 100%;"
										@on-layout-change="${this._onLayoutChange}"
									>
										${this._renderGridPanels()}							

										${_elementHtml}
									</panda-grid-layout>

								</div>
							</div>
						</div>
					</div>
				</div>

			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderGridPanels(): TemplateResult[] {
		const panelsHtml: TemplateResult[] = [];
	
		this._panelList.forEach((panel, index) => {
			const {
				id,
				width,
				minWidth = undefined,
				height,
				minHeight = undefined,
			} = panel as any;
			panelsHtml.push(html`
				<panda-grid-panel
					id="${id}"
					.width="${width}"
					.minWidth="${minWidth}"
					.height="${height}"
					.minHeight="${minHeight}"
					movable
					resizable
				>
					<div class="drag-handle" slot="drag-handle">DRAG HANDLE</div>
					Panel #${index}
				</panda-grid-panel>
				
			`);
		});


		return panelsHtml;
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

	private _onAddPanel(): void {
		this._addElement = !this._addElement;
	}

	private _onMovePanel(): void {
		this._firstPanelEl.width = 2;
		this._firstPanelEl.height = 2;
	}

	private _onLayoutChange(event: any): void {
		console.log("%c [DEMO] (_onLayoutChange) event", "font-size: 24px; color: green;", event.detail);
	}

	
}