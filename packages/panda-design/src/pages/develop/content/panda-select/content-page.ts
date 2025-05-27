// types
import {
	ComponentCssVariableDetails,
	ComponentPropertyDetails,
	ComponentEventDetails,
	PageCategory,
} from "panda-design-typings";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../../../styles/styles";
import { scrollbar } from "@panda-wbc/panda-mixins";

// components
import "@panda-wbc/panda-select";

// utils
import { css, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import {
	pageId,
	pageName,
	pageUri,
	keywords,
	description,
	contextMenu
} from "./page-config";
import { installationSnippet } from "./snippets/snippets";

// static data
import { getCountryList } from "../../static-data";

@customElement("panda-select-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-select-content-page></panda-select-content-page>`
})
export class PandaSelectContentPage extends ContentPageTemplate {
	// css styles
	static get styles() {
		return [
			styles,
			scrollbar,
			uiComponents.banner,
			uiComponents.table,
			uiComponents.sample,
			uiComponents.form,
			uiComponents.appLayout,
			uiComponents.columnSystem,
			uiComponents.modifiers,
		];
	}

	// page details
	pageId: string = pageId;

	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "items", type: "PandaSelectItem[]", defaultValue: "[]", options: ["String[]", "Number[]"], description: "An array of items to display as available options" },
		{ name: "value", type: "String", defaultValue: "-", description: "Value to display that correlates to provided preset" },
		{ name: "label", type: "string", defaultValue: "-", description: "Component label that appears above the component" },
		{ name: "placeholder", type: "string", defaultValue: "-", description: "Text to show in case no value is selected" },
		{ name: "theme", type: "string", defaultValue: "-", description: "Apply one of the color themes to the component." },
		{ name: "spinnerType", type: "string", defaultValue: "dots", description: "Spinner animation type for working state" },
		{ name: "itemLabelPath", type: "string", defaultValue: "label", description: "Property path to the item's label" },
		{ name: "itemValuePath", type: "string", defaultValue: "value", description: "Property path to the item's value" },
		{ name: "disableAutoOpen", type: "boolean", defaultValue: "false", description: "Determines weather component options will be shown only upon clicking dropdown button. Incompatible with hideDropdownButton!" },
		{ name: "hideClearButton", type: "boolean", defaultValue: "false", description: "Hide clear value button from component's interface" },
		{ name: "hideDropdownButton", type: "boolean", defaultValue: "false", description: "Hide dropdown button from component's interface" },
		{ name: "disabled", type: "boolean", defaultValue: "false", description: "Sets a disabled status for the component" },
		{ name: "working", type: "boolean", defaultValue: "false", description: "Sets working status for the component" },
		{ name: "mandatory", type: "boolean", defaultValue: "false", description: "Visually indicates required field if value is not set" },
	];

	private readonly _componentEvents: ComponentEventDetails[] = [
		{ name: "change", returnType: "PandaButtonChangeEvent", description: "" }
	];

	// static data
	private _items = [
		{ label: "Item # 1", value: 1 },
		{ label: "Item # 2", value: 2, disabled: true },
		{ label: "Item # 3", value: 3 },
		{ label: "Item # 4", value: 4 },
	];

	private readonly _languageList = [
		{ label: "English (UK)", value: "uk", desc: "123123" },
		{ label: "English (USA)", value: "us", desc: "123123" },
		{ label: "Polish", value: "pl", desc: "123123" },
		{ label: "German", value: "de", desc: "123123", disabled: true },
		{ label: "Chinese", value: "cn", desc: "123123" },
	];

	private _countryList = getCountryList();

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>SELECT</h1>
				<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
		`;
		return html`
			${this._renderOverviewSection()}
			${this._renderInstallationSection()}
			${this._renderUsageSection()}
			${this._renderComponentStatesSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		const customStyle = css`
			.dropdown .item {
				padding: 5px !important;
			}

			.language {
				display: flex;
				flex-flow: row nowrap;
				gap: var(--panda-padding-m);
				height: 100%;
			}

			.icon {
				display: flex;
				justify-content: center;
				align-items: center;
				width: var(--panda-component-size);
				height: 100%;
			}

			.label {
				line-height: var(--panda-component-size-m);
			}
		`;

		const customRenderer: (params: any) => any = ({ label, value, active, selected, data }) => {
			return html`
				<div class="language">
					<div class="icon">
						<panda-flag flag="${value}"></panda-flag>
					</div>
					<div class="label">${label}</div>
				</div>
			`;
		};

		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="overview">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						Select component in web applications offers a flexible and versatile way to create dropdown menus that align with the application's design and functionality requirements. 
						Its ability to enhance styling, provide customization options, improve accessibility, and support various user interactions makes it a valuable component 
						for creating a more user-centric and engaging web experience.
					</p>
				</div>

				<!-- OVERVIEW -->
				<div class="sample-cont">
					<div class="sample">
						<panda-select
							.label="${`Option:`}"
							.placeholder="${`Select option...`}"
							.items="${this._languageList}"
							.value="${"pl"}"
							.customStyle="${customStyle}"
							.renderer="${customRenderer}"
						>
						</panda-select>
						<br />
						<br />
						<!--
						<panda-select
							.label="${`Option:`}"
							.placeholder="${`Select option...`}"
							.items="${this._countryList}"
							item-label-path="name"
							item-value-path="code"
						>
							<div class="prefix" slot="prefix">AUS</div>
						</panda-select>
						-->
					</div>
				</div>
			</div>
		`;
	}

	private _renderInstallationSection(): TemplateResult {
		return html`
			<!-- INSTALLATION -->
			<div class="content-section" data-content-section-name="installation">
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
			<div class="content-section" data-content-section-name="usage">
				<div class="section">
					<internal-link theme="h2">Usage</internal-link>
					<p>
						Please refer below for instructions on utilizing our component. Experiment with the provided sample code to explore all the features of the component.
					</p>
	
					<code-sample header="Installation">
						${installationSnippet}
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
			<!-- COMPONENT PROPERTIES -->
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
	
	private _renderComponentStatesSection(): TemplateResult {
		return html`
			<!-- COMPONENT STATES -->
			<div class="content-section" data-content-section-name="component-states">
				<div class="section">
					<internal-link theme="h2">Component States</internal-link>
					<p>
						Web components typically exhibit various states that mirror their behavior and appearance, adapting to user interactions or the logic of the application. 
						Provided below is a selection of commonly encountered states:
					</p>
					<ul>
						<li>default</li>
						<li>disabled</li>
						<li>working</li>
					</ul>
				</div>
			</div>
		`;
	}

}