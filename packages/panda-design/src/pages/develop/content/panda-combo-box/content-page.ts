// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

type Log = {
	message: string;
	timestamp: number;
}

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-combo-box";
import "@panda-wbc/panda-time-ago";
import "@panda-wbc/panda-flag";

// utils
import { css, html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";

// code snippets
import {
	installationSnippet,
	rendererFeatureSnippet,
	usageSnippet,
} from "./snippets/snippets";

// static demo data
import { getCcyPairs, getCountryList, getStateList } from "../../static-data";

// page config
import { pageConfig } from "./page-config";

@page(pageConfig)
@customElement("panda-combo-box-content-page")
export class PandaComboBoxContentPage extends ContentPageTemplate {
	// page details
	pageId: string = pageConfig.pageId;
	public customStyles = styles;

	private _componentProperties: ComponentPropertyDetails[] = [
		{ name: "items", type: "PandaSelectItem[]", defaultValue: "[]", options: ["String[]", "Number[]"], description: "An array of items to display as available options" },
		{ name: "value", type: "String", defaultValue: "-", description: "Value to display that correlates to provided preset" },
		{ name: "label", type: "String", defaultValue: "-", description: "Component label that appears above the component." },
		{ name: "placeholder", type: "String", defaultValue: "-", description: "Text to show in case no value is selected." },
		{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component.." },
		{ name: "spinnerType", type: "String", defaultValue: "dots", description: "Spinner animation type for busy state." },
		{ name: "itemLabelPath", type: "String", defaultValue: "label", description: "Property path to the item's label." },
		{ name: "itemValuePath", type: "String", defaultValue: "value", description: "Property path to the item's value." },
		{ name: "disableAutoOpen", type: "Boolean", defaultValue: "false", description: "Determines weather component options will be shown only upon clicking dropdown button. Incompatible with hideDropdownButton!" },
		{ name: "disabled", type: "Boolean", defaultValue: "false", description: "Sets a disabled state for the component." },
		{ name: "busy", type: "Boolean", defaultValue: "false", description: "Sets busy state for the component." },
		{ name: "mandatory", type: "Boolean", defaultValue: "false", description: "Visually indicates required field if value is not set" },
		{ name: "icon", type: "String", defaultValue: "dropdown", description: "Customize dropdown icon." },
		{ name: "hideIcon", type: "Boolean", defaultValue: "false", description: "Hide dropdown icon." },
		{ name: "dropdownWidth", type: "String", defaultValue: "-", description: "Customize dropdown list width. eg. '250px'" },

		{ name: "autoselect", type: "Boolean", defaultValue: "false", description: "Select component value when given focus." },
		{ name: "allowCustomValue", type: "Boolean", defaultValue: "false", description: "Allow entering values which are not specified on within the preset." },
		{ name: "pattern", type: "String", defaultValue: "-", description: "A regular expression that the value is checked against. The pattern must match the entire value. If value entered by user do not match the pattern component will be marked as invalid." },
		{ name: "allowedCharPattern", type: "String", defaultValue: "-", description: "Regular expression that the key strokes are checked against. If the key pressed by user do not match the pattern combo box input will not be updated." },
		{ name: "filter", type: "Function", defaultValue: "[filters items that contain searched text]", description: "Custom filter logic to be used to filter dropdown items" },
		{ name: "renderer", type: "Function", defaultValue: "-", description: "Customize dropdown list look and feel." },
	];

	private _componentEvents: ComponentEventDetails[] = [
		{ name: "@change", returnType: "PandaComboBoxChangeEvent", description: "Triggered when user changes component selected value." }
	];

	// view props
	@state()
	private _value: string | null = "value 4";

	@state()
	private _stateList: any[] = getStateList();

	@state()
	private _items: any[] = [
		{ label: "Item #1", value: "value 1" },
		{ label: "Item #2", value: "value 2" },
		{ label: "Item #3", value: "value 3" },
		{ label: "Item #4", value: "value 4" },
		{ label: "Item #5", value: "value 5" },
		{ label: "Item #6", value: "value 6" },
	];

	@state()
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

	@state()
	private _disabled: boolean = false;

	@state()
	private _allowCustomValue: boolean = false;

	@state()
	private _disableAutoOpen: boolean = false;

	@state()
	private _selectedValue: string = "";

	@state()
	private _log: Log[] = [];

	private readonly _languageList = [
		{ label: "English (UK)", value: "uk", desc: "123123" },
		{ label: "English (USA)", value: "us", desc: "123123" },
		{ label: "Polish", value: "pl", desc: "123123" },
		{ label: "German", value: "de", desc: "123123" },
		{ label: "Chinese", value: "cn", desc: "123123" },
	];

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

					colors: ["#ff4778", "#6f36bc", "#36174D"],
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

					colors: ["#ff4778", "#6f36bc", "#36174D"],
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
			<!--	
				<panda-particle-banner .config="${bannerConfig}">
					<div class="content">
						<h1>COMBO BOX</h1>
					</div>
				</panda-particle-banner>
			-->
				<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
			${this._renderInstallationSection()}
			${this._renderUsageSection()}
			${this._renderFeaturesSection()}
		`;

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
			<panda-combo-box
				label="Select Language:"
				placeholder="Select..."
				.items="${this._languageList}"
				.renderer="${customRenderer}"
				.customStyle="${customStyle}"
				@change="${this._onChange}"
			>
			</panda-combo-box>
		`;
		return html`
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<panda-combo-box
						label="Select Destination:"
						.value="${this._selectedValue}"
						.items="${this._stateList}"
						.allowCustomValue="${this._allowCustomValue}"
						.disableAutoOpen="${this._disableAutoOpen}"
						@change="${this._onChange}"
					>
					</panda-combo-box>
					<br />
					${this._selectedValue}
					<hr />
					<panda-checkbox
						.checked="${this._allowCustomValue}"
						@change="${this._onToggleAllowCustomValue}"
					>
						allow-custom-value
					</panda-checkbox>
					<br />

					<panda-checkbox
						.checked="${this._disableAutoOpen}"
						@change="${this._onToggleDisableAutoOpen}"
					>
						disable-auto-open
					</panda-checkbox>
					
					<hr />
					${this._renderLogs()}
					
					<hr />
					<panda-combo-box
						label="Select Destination:"
						.value="${undefined}"
						.items="${[1, 2, 3, 4]}"
						.allowCustomValue="${this._allowCustomValue}"
						.disableAutoOpen="${this._disableAutoOpen}"
						@change="${this._onChange}"
					>
					</panda-combo-box>

				</div>
			</div>
		`;
		// return html`
		// 	${this._renderOverviewSection()}
		// 	${this._renderInstallationSection()}
		// 	${this._renderUsageSection()}
		// `;
	}

	private _renderLogs(): TemplateResult {
		return html`
			<div class="console-log">
				${this._log.map(
			({ message, timestamp }) => html`
							<div class="log">
								<div class="message">${message}</div>
								<div class="timestamp">
									<panda-time-ago .time="${timestamp}"></panda-time-ago>
								</div>
							</div>
						`
		)
			}
			</div>
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
					<internal-link theme="h2">Overview</internal-link>
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
											.items="${[1, 2, 3]}"
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
					<internal-link theme="h2">Installation</internal-link>
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
					<internal-link theme="h2">Usage</internal-link>
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

	private _renderFeaturesSection(): TemplateResult {
		return html`
			<!-- FEATURES SECTION -->
			<div class="content-section" data-content-section-name="${ContentSectionName.FEATURES}">
				<div class="section">
					<internal-link theme="h2">Features</internal-link>
					<p>
						Panda Combo Box component comes with few useful features. 
					</p>
					<p>
						See the list of supported features below:
					</p>
				</div>

				${this._renderRendererFeatureSection()}
			</div>
		`;
	}

	private _renderRendererFeatureSection(): TemplateResult {
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
			<!-- FEATURE - RENDERER -->
			<div class="section">
				<internal-link theme="h32">Renderer</internal-link>
				<p>
					Custom renderers in custom elements provide developers with fine-grained control over how items are displayed in dropdown lists. 
					By implementing custom rendering functions, developers can tailor the appearance and behavior of dropdown items to match their specific design requirements and enhance the user experience.
				</p>

				<div class="sample-cont">
					<div class="sample">
						<panda-combo-box
							label="Select Language:"
							placeholder="Select..."
							.items="${this._languageList}"
							.renderer="${customRenderer}"
							.customStyle="${customStyle}"
							@change="${this._onChange}"
						>
						</panda-combo-box>
					</div>
				</div>

				
				<code-sample header="Custom Renderer Example">
					${rendererFeatureSnippet}
				</code-sample>
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChange(event: any) {
		console.log("%c 🔥 [COMBO BOX DEMO PAGE] _onChange::value", "font-size: 24px; color: blueviolet;", event.detail.value);
		this._selectedValue = event.detail.value;
		// add logs
		this._log.unshift({
			message: `Selected item: "${event.detail.value}"`,
			timestamp: new Date().getTime()
		});
		this.requestUpdate();
	}

	private _onChangeAndDisable(event: any) {
		console.log("%c 🔥 [COMBO BOX DEMO PAGE] _onChange::value", "font-size: 24px; color: blueviolet;", event.detail.value);

		this._disabled = true;
		setTimeout(() => {
			this._disabled = false;
		}, 2000);
	}

	private _onToggleAllowCustomValue(): void {
		this._allowCustomValue = !this._allowCustomValue;
	}

	private _onToggleDisableAutoOpen(): void {
		this._disableAutoOpen = !this._disableAutoOpen;
	}
}