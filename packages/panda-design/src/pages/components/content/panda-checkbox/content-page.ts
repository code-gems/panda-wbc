// types
import { ComponentPropertyDetails, ComponentEventDetails, ContentSectionName, Page } from "panda-design-typings";
import { PandaCheckboxChangeEvent } from "@panda-wbc/panda-checkbox";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-checkbox";
import "@panda-wbc/panda-checkbox-group";
import "@panda-wbc/panda-particle-banner";

// utils
import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import { pageConfig } from "./page-config";

// code snippets
import {
	implementationSnippet,
	installationSnippet
} from "./snippets/snippets";

@page(pageConfig)
@customElement("panda-checkbox-content-page")
export class PandaCheckboxContentPage extends ContentPageTemplate {
	// page details
	public contentPageConfig = pageConfig;
	public customStyles = styles;

	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component." },
		{ name: "name", type: "String", defaultValue: "-", description: "Name used to identify component. Used to assign value when used with checkbox group." },
		{ name: "checked", type: "Boolean", defaultValue: "false", description: "Initial component value." },
		{ name: "indeterminate", type: "Boolean", defaultValue: "false", description: "Sets indeterminate state of the component." },
		{ name: "strikethrough", type: "Boolean", defaultValue: "false", description: "Applies strikethrough style to the component label." },
		{ name: "disabled", type: "boolean", defaultValue: "false", description: "Sets a disabled state for the component." },
		{ name: "alignRight", type: "boolean", defaultValue: "false", description: "Aligns checkbox to the right side." },
	];

	private readonly _componentEvents: ComponentEventDetails[] = [
		{ name: "@change", returnType: "PandaSwitchChangeEvent", description: "Triggered every time component checked value is changed." }
	];

	private _componentInterface: ComponentEventDetails[] = [
		{ name: "toggle()", returnType: "void", description: "Toggle value of the component." },
	];

	// demo props
	@state()
	private _showOption4 = false;
	
	@state()
	private _checked = false;

	@state()
	private _disabled = false;

	@state()
	private _indeterminate = false;
	
	@state()
	private _strikethrough = false;
	
	@state()
	private _alignRight = false;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		const bannerConfig: PandaParticleBannerConfig = {
			particleGroup: [{
				particleCount: 50,
				blur: true,
				blurMax: 5,
				blurMin: 2,
				// lava lamp
				colors: ["hsl(17 88% 49%)", "hsl(42 88% 50%)"],
				colorOpacityVariation: 50,
				colorSaturationVariation: 30,
				maxSpeedX: 0.1,
				minSpeedX: -0.1,
				maxSpeedY: -0.2,
				minSpeedY: -0.1,
				sizeMax: 80,
				sizeMin: 20
			}]
		};
		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner
					.config="${bannerConfig}"
				>
					<div class="content">
						<h1>CHECKBOX</h1>
					</div>
					<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
				</panda-particle-banner>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
			${this._renderInstallationSection()}
			${this._renderUsageSection()}
			${this._renderComponentStatesSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		let option4html: TemplateResult = html``;

		if (this._showOption4) {
			option4html = html`
				<panda-checkbox
					name="option-4"
				>
					Study
				</panda-checkbox>
			`;
		}

		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						Checkbox component is fundamental element in web applications, providing a simple yet effective way for users to make binary choices. 
						It is commonly employed in forms, allowing users to toggle options on or off. 
					</p>
					<p>
						Checkboxes are versatile, serving various purposes such as selecting multiple items from a list, 
						confirming actions, or agreeing to terms and conditions. 
						Their intuitive design enhances user experience by offering a visual representation of choices, 
						and they play a crucial role in user interaction and data submission. With their widespread adoption, 
						checkbox components contribute to creating responsive and user-friendly web interfaces.
					</p>
				</div>

				<!-- OVERVIEW -->
				<div class="sample-cont">
					<div class="sample">
						<div class="row">
							<div class="col-half">
								<panda-checkbox
									@change="${this._onChange}"
									?checked="${this._checked}"
									?disabled="${this._disabled}"
									?indeterminate="${this._indeterminate}"
									?strikethrough="${this._strikethrough}"
									?alignRight="${this._alignRight}"
									help-text="I agree to the terms and conditions."
								>
									Accept Terms and Conditions
								</panda-checkbox>
							</div>
						</div>

						<div class="row">
							<div class="col-half">
								<panda-button
									@click="${this._onToggleChecked}"
								>
									TOGGLE CHECKED (${this._checked ? "ON" : "OFF"})
								</panda-button>
							</div>
						</div>
						<div class="row">
							<div class="col-half">
								<panda-button
									@click="${this._onToggleDisabled}"
								>
									TOGGLE DISABLED (${this._disabled ? "ON" : "OFF"})
								</panda-button>
							</div>
						</div>
						<div class="row">
							<div class="col-half">
								<panda-button
									@click="${this._onToggleIndeterminate}"
								>
									TOGGLE INDETERMINATE (${this._indeterminate ? "ON" : "OFF"})
								</panda-button>
							</div>
						</div>
						<div class="row">
							<div class="col-half">
								<panda-button
									@click="${this._onToggleStrikethrough}"
								>
									TOGGLE STRIKETHROUGH (${this._strikethrough ? "ON" : "OFF"})
								</panda-button>
							</div>
						</div>
						<div class="row">
							<div class="col-half">
								<panda-button
									@click="${this._onToggleAlignRight}"
								>
									TOGGLE ALIGN RIGHT (${this._alignRight ? "ON" : "OFF"})
								</panda-button>
							</div>
						</div>

					</div>
				</div>

				<div class="sample-cont">
					<div class="sample">

						<panda-checkbox-group
							label="Select your options:"
							horizontal
							@change="${this._onChange}"
						>
							<panda-checkbox name="option-1" checked>
								Get milk
							</panda-checkbox>
							<panda-checkbox name="option-2">
								Feed my cat
							</panda-checkbox>
							<panda-checkbox name="option-3">
								Play with my pet
							</panda-checkbox>
							${option4html}
						</panda-checkbox-group>

						<panda-button @click="${this._onToggleOption}">
							TOGGLE OPTION 4
						</panda-button>
					</div>
				</div>
			</div>
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
				${this._renderComponentInterfaceSection()}
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderComponentPropertiesSection(): TemplateResult {
		return html`
			<!-- COMPONENT PROPERTIES -->
			<div class="section">
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
			<div class="section">
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

	private _renderComponentInterfaceSection(): TemplateResult {
		return html`
			<!-- COMPONENT INTERFACE -->
			<div class="section">
				<internal-link theme="h3">Interface</internal-link>
				<p>
					Component interface allow developers to interact with and manipulate component from the code level.
					These APIs provide the means to access and control various aspects and functionalities of the element dynamically.
				</p>
				<p>
					See list of available APIs below:
				</p>
				
				${this._renderComponentEventsTable(this._componentInterface)}
			</div>
		`;
	}

	private _renderComponentStatesSection(): TemplateResult {
		return html`
			<!-- COMPONENT STATES -->
			<div class="content-section" data-content-section-name="${ContentSectionName.COMPONENT_STATES}">
				<div class="section">
					<internal-link theme="h2">Component States</internal-link>
					<p>
						Web components typically have different states that reflect their behavior and appearance based on user interaction or application logic.
						Below is the list of few states that are typical to this component:
					</p>
					<ul>
						<li>Default</li>
						<li>Disabled</li>
						<li>Busy</li>
					</ul>
				</div>

				${this._renderDefaultComponentStateSection()}
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderDefaultComponentStateSection(): TemplateResult {
		return html`
			<div class="section">
				<h3>Default</h3>
				<p>
					The default state represents the initial appearance and behavior of the component when it is first rendered or loaded.
					It reflects the component's default settings and may display placeholder content or default styling.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<panda-checkbox
							@change="${this._onChange}"
						>
							Remember Me!
						</panda-checkbox>
					</div>
				</div>
			</div>
		`;
	}


	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChange(event: PandaCheckboxChangeEvent): void {
		console.log("%c ⚡ [CHECKBOX DEMO PAGE] checked", "font-size: 24px; color: orange;", event.detail);

	}

	private _onToggleOption(): void {
		this._showOption4 = !this._showOption4;
	}

	private _onToggleChecked(): void {
		this._checked = !this._checked;
	}

	private _onToggleDisabled(): void {
		this._disabled = !this._disabled;
	}

	private _onToggleIndeterminate(): void {
		this._indeterminate = !this._indeterminate;
	}

	private _onToggleStrikethrough(): void {
		this._strikethrough = !this._strikethrough;
	}

	private _onToggleAlignRight(): void {
		this._alignRight = !this._alignRight;
	}

}