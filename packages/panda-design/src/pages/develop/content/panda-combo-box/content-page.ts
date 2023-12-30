// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName, PageCategory } from "panda-design-typings";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../../../styles/styles";

// components
import "@panda-wbc/panda-combo-box";
import "../../../../web-parts/code-sample/code-sample";
import "../../../../web-parts/version-shield/version-shield";

// utils
import { html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";

// code snippets
import {
	installationSnippet, usageSnippet,
} from "./snippets/snippets";

// static demo data
import { getCcyPairs, getCountryList } from "../../static-data";

// page config
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-combo-box-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-combo-box-content-page></panda-combo-box-content-page>`,
})
export class PandaComboBoxContentPage extends ContentPageTemplate {
	// css styles
	static get styles() {
		return [
			styles,
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

	private _componentProperties: ComponentPropertyDetails[] = [
		{ name: "items", type: "PandaSelectItem[]", defaultValue: "[]", options: ["String[]", "Number[]"], description: "An array of items to display as available options" },
		{ name: "value", type: "String", defaultValue: "-", description: "Value to display that correlates to provided preset" },
		{ name: "label", type: "String", defaultValue: "-", description: "Component label that appears above the component." },
		{ name: "placeholder", type: "String", defaultValue: "-", description: "Text to show in case no value is selected." },
		{ name: "theme", type: "String", defaultValue: "-", description: "Color theme for a component." },
		{ name: "spinnerType", type: "String", defaultValue: "dots", description: "Spinner animation type for busy state." },
		{ name: "itemLabelPath", type: "String", defaultValue: "label", description: "Property path to the item's label." },
		{ name: "itemValuePath", type: "String", defaultValue: "value", description: "Property path to the item's value." },
		{ name: "disableAutoOpen", type: "Boolean", defaultValue: "false", description: "Determines weather component options will be shown only upon clicking dropdown button. Incompatible with hideDropdownButton!" },
		{ name: "disabled", type: "Boolean", defaultValue: "false", description: "Sets a disabled state for the component." },
		{ name: "busy", type: "Boolean", defaultValue: "false", description: "Sets busy state for the component." },
		{ name: "mandatory", type: "Boolean", defaultValue: "false", description: "Visually indicates required field if value is not set" },
		
		{ name: "autoselect", type: "Boolean", defaultValue: "false", description: "Select component value when given focus." },
		{ name: "allowCustomValue", type: "Boolean", defaultValue: "false", description: "Allow entering values which are not specified on within the preset." },
		{ name: "pattern", type: "String", defaultValue: "-", description: "A regular expression that the value is checked against. The pattern must match the entire value. If value entered by user do not match the pattern component will be marked as invalid." },
		{ name: "allowedCharPattern", type: "String", defaultValue: "-", description: "Regular expression that the key strokes are checked against. If the key pressed by user do not match the pattern combo box input will not be updated." },
		{ name: "filter", type: "Function", defaultValue: "[filters items that contain searched text]", description: "Custom filter logic to be used to filter dropdown items" },
	];

	private _componentEvents: ComponentEventDetails[] = [
		{ name: "@change", returnType: "PandaComboBoxChangeEvent", description: "Triggered when user changes component selected value." }
	];

	// view props
	@property({ type: String })
	private _value: string | null = "value 4";

	@property({ type: Array })
	private _items: any[] = [
		{ label: "Item #1", value: "value 1" },
		{ label: "Item #2", value: "value 2" },
		{ label: "Item #3", value: "value 3" },
		{ label: "Item #4", value: "value 4" },
		{ label: "Item #5", value: "value 5" },
		{ label: "Item #6", value: "value 6" },
	];

	@property({ type: Array })
	private _codes: any[] = [
		{ name: "Code #1", code: "code 01" },
		{ name: "Code #2", code: "code 02" },
		{ name: "Code #3", code: "code 03" },
		{ name: "Code #4", code: "code 04" },
		{ name: "Code #5", code: "code 05" },
		{ name: "Code #6", code: "code 06" },
	];

	private _ccyPairList = getCcyPairs();

	private _countryList = getCountryList();

	@property({ type: Boolean })
	private _disabled: boolean = false;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		const bannerConfig: PandaParticleBannerConfig = {
			particleGroup: [
				{
					particleCount: 10,
					sizeMin: 200,
					sizeMax: 100,
					
					colors: ["#ff4778" , "#6f36bc", "#36174D"],
					colorOpacityVariation: 70,
					colorHueVariation: 20,

					minSpeedX: -0.2,
					maxSpeedX: 0.2,
					minSpeedY: -0.2,
					maxSpeedY: 0.2,

					blur: true,
					blurMin: 5,
					blurMax: 15,
				},
				{
					particleCount: 50,
					sizeMin: 3,
					sizeMax: 5,

					colors: ["#ff4778" , "#6f36bc", "#36174D"],
					colorOpacityVariation: 70,

					minSpeedX: -0.3,
					maxSpeedX: 0.3,
					minSpeedY: -0.3,
					maxSpeedY: 0.3,

					blur: true,
				}
			]
		};
		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner
					.config="${bannerConfig}"					
				>
					<div class="content">
						<h1>COMBO BOX</h1>
					</div>
				</panda-particle-banner>
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

		const customFilter = (searchText: string, items: any[] = []): any[] => {
			const filteredItems: any[] = [];
			items.forEach((item) => {
				if ((item.name as string).toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase())) {
					filteredItems.push(item);
				}
			});
			return filteredItems;
		}

		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<h2>Overview</h2>
					<p>
						Combo boxes are widely used in various applications, such as forms, configuration panels, and settings menus. 
						They enhance the user experience by providing a compact and intuitive interface for selecting options, 
						reducing the need for manual data entry, and ensuring data consistency within the application.
					</p>
					<p>
						One of the key advantages of a combo box is its ability to handle both predefined options and user-generated input. 
						It offers a convenient way for users to select from a limited set of choices, 
						while still allowing them the flexibility to enter custom values when necessary.
					</p>
				</div>

				<!-- OVERVIEW -->
				<div class="sample-cont">
					<div class="sample">
						<div class="form">
							<div class="form-section">
								<div class="row">
									<div class="col-full">
										
										<panda-combo-box
											.label="${"Select Destination:"}"
											.value="${this._value}"
											.items="${this._items}"
											@change="${this._onChange}"
											mandatory
										>
										</panda-combo-box>
										<panda-combo-box
											.label="${"Select Destination:"}"
											.value="${2}"
											.items="${[1,2,3]}"
											@change="${this._onChange}"
										>
										</panda-combo-box>
										
										<panda-combo-box
											.label="${"Select Code:"}"
											.value="${"code 03"}"
											.items="${this._codes}"
											@change="${this._onChange}"
											item-label-path="name"
											item-value-path="code"
										>
										</panda-combo-box>
										<panda-combo-box
											.label="${"Select Country:"}"
											.value="${"PL"}"
											.items="${this._countryList}"
											.filter="${customFilter}"
											.disabled="${this._disabled}"
											@change="${this._onChangeAndDisable}"
											item-label-path="name"
											item-value-path="code"
											autoselect
										>
										</panda-combo-box>

										<panda-combo-box
											.label="${"Ccy Pair:"}"
											.value="${null}"
											.items="${this._ccyPairList}"
											@change="${this._onChange}"
											autoselect
										>
										</panda-combo-box>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	private _renderInstallationSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="installation">
				<div class="section">
					<h2>Installation</h2>
					<p>
						Begin by installing the npm library by running a command in the terminal or command prompt. 
						Use the npm package manager, specifying the library name and version.
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
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="usage">
				<div class="section">
					<h2>Usage</h2>
					<p>
						The following example showcase use of component:
					</p>

					<code-sample header="Usage">
						${usageSnippet}
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

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChange(event: any) {
		console.log("%c 🔥 [COMBO BOX DEMO PAGE] _onChange::value", "font-size: 24px; color: orange;", event.detail.value);
	}

	private _onChangeAndDisable(event: any) {
		console.log("%c 🔥 [COMBO BOX DEMO PAGE] _onChange::value", "font-size: 24px; color: orange;", event.detail.value);

		this._disabled = true;
		setTimeout(() => {
			this._disabled = false;
		}, 2000);
	}
}