// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";
import { PandaButtonGroupItem } from "@panda-wbc/panda-button-group";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-button-group";

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
@customElement("panda-button-group-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public contentPageConfig = pageConfig;
	public customStyles = styles;

	// demo props
	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of predefined themes to the component." },
		{ name: "label", type: "String", defaultValue: "-", description: "Shows a label above the component." },
		{ name: "items", type: "PandaButtonGroupItem[]", defaultValue: "-", description: "Items to display as available options." },
		{ name: "selected", type: "Array<Any>", defaultValue: "-", description: "List of values to be selected. Values must be unique and correspond with provided items." },
		{ name: "multiselect", type: "Boolean", defaultValue: "false", description: "Allow selecting multiple items." },
		{ name: "customStyle", type: "String", defaultValue: "-", description: "Applies custom style to the component." },
		{ name: "working", type: "Boolean", defaultValue: "false", description: "Sets working state on entire component." },
		{ name: "spinnerType", type: "String", defaultValue: "dots", description: "Changes default spinner type." },
	];

	private readonly _itemComponentProperties: ComponentPropertyDetails[] = [
		{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of predefined themes to the component." },
		{ name: "label", type: "String", defaultValue: "-", description: "Text shown inside the button element." },
		{ name: "value", type: "Any", defaultValue: "-", description: "Values associated with this item. Must be unique." },
		{ name: "selected", type: "Boolean", defaultValue: "-", description: "Preselects item if set." },
		{ name: "disabled", type: "String", defaultValue: "-", description: "Sets element in the disabled state." },
		{ name: "working", type: "Boolean", defaultValue: "false", description: "Sets working state on entire component." },
		{ name: "spinnerType", type: "String", defaultValue: "dots", description: "Changes default spinner type." },
	];

	private readonly _componentEvents: ComponentEventDetails[] = [
		{ name: "@change", returnType: "Event", description: "Triggered when button selection changes." }
	];

	@state()
	private readonly _items: PandaButtonGroupItem[] = [
		{ label: "ALL (selected)", value: "all", selected: true, suffixBadge: "8" },
		{ label: "BUTTON 1", value: "option 1" },
		{ label: "BUTTON 2", value: "option 2" },
		{ label: "BUTTON 3 (disabled)", value: "option 3", disabled: true },
		{ label: "BUTTON 4 (working)", value: "option 4", working: true },
		{ label: "BUTTON 5 (working)(disabled)", value: "option 5", working: true, disabled: true },
	];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>Button Group</h1>
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
						Button groups in web applications are used to organize related actions or options into a cohesive unit, improving user interface clarity and efficiency. 
						They are particularly useful for presenting multiple choices, such as filtering options, view toggles, or related actions, 
						allowing users to quickly access and switch between different functionalities within a compact and visually appealing component.
					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-full">

									<panda-button-group
										.items="${this._items}"
										@change="${this._onSelectionChange}"
										multiselect
										.working="${false}"
										.disabled="${false}"
										.selected="${["option 2"]}"
									>
									</panda-button-group>

								</div>
							</div>
							<div class="row push-m">
								<div class="col-full">

									<panda-button-group
										label="Select:"
										@change="${this._onSelectionChange}"
										.working="${false}"
										.disabled="${true}"
									>

										<panda-button-group-item
											theme="primary flat"
											value="all"
											selected
										>
											<div slot="prefix-icon">
												<panda-icon icon="calendar"></panda-icon>
											</div>
											ALL (selected)
										</panda-button-group-item>
										<panda-button-group-item
											value="1"
										>
											BUTTON 1
										</panda-button-group-item>
										<panda-button-group-item
											value="2"
										>
											<div slot="prefix-badge">1</div>
											BUTTON 2
											<div slot="suffix-badge">88</div>
										</panda-button-group-item>
										<panda-button-group-item
											value="3"
											disabled
										>
											BUTTON 3 (disabled)
										</panda-button-group-item>
										<panda-button-group-item
											working
										>
											BUTTON 4 (working)
										</panda-button-group-item>
										<panda-button-group-item
											working
											disabled
										>
											BUTTON 5 (working)(disabled)
										</panda-button-group-item>
									</panda-button-group>

								</div>
							</div>

							<div class="row push-m">
								<div class="col-full">
									<panda-button>
										MY BUTTON
									</panda-button>
									<panda-button disabled>
										MY BUTTON (disabled)
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

				<p>
					In case implementation uses template approach, 
					below are the properties of a <i class="property">panda-button-group-item</i> element.
				</p>
				${this._renderComponentPropertyTable(this._itemComponentProperties)}
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

	private _onSelectionChange(event: any): void {
		console.log("%c ⚡ [DEMO] (_onSelectionChange)", "font-size: 24px; color: blue;", event.detail);
	}
}