// types
import {
	ComponentPropertyDetails,
	ComponentEventDetails,
	ContentSectionName,
} from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-callout";
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-icon/lib/food-icon-pack";

// utils
import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import { pageConfig } from "./page-config";
import { implementationSnippet, installationSnippet } from "./snippets/snippets";

// static data
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

@customElement("panda-callout-content-page")
@page(pageConfig)
export class PandaCalloutContentPage extends ContentPageTemplate {
	// page details
	public customStyles: CSSResultGroup = styles;
	public pageId: string = pageConfig.pageId;

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

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		const primaryColor = getComputedStyle(this).getPropertyValue("--panda-primary-color");
		const secondaryColor = getComputedStyle(this).getPropertyValue("--panda-secondary-color");
		const bannerConfig: PandaParticleBannerConfig = {
			particleGroup: [{
				particleCount: 50,
				blur: true,
				blurMax: 5,
				blurMin: 2,
				colors: [primaryColor, secondaryColor],
				colorOpacityVariation: 50,
				colorSaturationVariation: 30,
				maxSpeedX: 0.1,
				minSpeedX: -0.1,
				maxSpeedY: -0.5,
				minSpeedY: -0.1,
				sizeMax: 80,
				sizeMin: 40,
			}],
			showFps: true
		};
		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner
					.config="${bannerConfig}"
				>
					<div class="content">
						<h1>CALLOUT</h1>
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
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						Callout component is valuable element in web applications designed to draw attention to specific information or actions. 
						These components often feature visually distinct styles, such as borders, background colors, or icons, making them stand out within a user interface.
					</p>
				</div>

				<!-- OVERVIEW -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="col-full">
								<panda-callout
									theme="info"
									icon="cookie"
									@on-close="${this._onCloseCallout}"
									closable
								>
									<div slot="header-prefix">prefix</div>
									<div slot="header">Cookies Usage</div>

									This website uses cookies to enhance your browsing experience. By continuing to use this site, you agree to the use of cookies. 
									Cookies are small text files stored on your device that help us analyze website traffic, personalize content, and provide targeted advertisements.
									
									<div slot="footer">
										<panda-button>
											Exit
										</panda-button>
										<panda-button theme="warn">
											Accept
										</panda-button>
									</div>
								</panda-callout>
							</div>
							
							<div class="col-full">
								<panda-callout
									theme="warn"
									@on-close="${this._onCloseCallout}"
									closable
								>
									This website uses cookies to enhance your browsing experience. By continuing to use this site, you agree to the use of cookies. 
									Cookies are small text files stored on your device that help us analyze website traffic, personalize content, and provide targeted advertisements.
								</panda-callout>
							</div>
							
							<div class="col-full">
								<panda-callout
									theme="done center-icons"
									@on-close="${this._onCloseCallout}"
									closable
								>
									This website uses cookies to enhance your browsing experience. By continuing to use this site, you agree to the use of cookies. 
									Cookies are small text files stored on your device that help us analyze website traffic, personalize content, and provide targeted advertisements.
								</panda-callout>
							</div>

							<div class="col-full">
								<panda-callout
									theme="alert"
								>
									This website uses cookies to enhance your browsing experience. By continuing to use this site, you agree to the use of cookies. 
									Cookies are small text files stored on your device that help us analyze website traffic, personalize content, and provide targeted advertisements.
								</panda-callout>
							</div>

							<div class="col-full">
								<panda-callout
									theme="info spinner center-icons"
								>
									This website uses cookies to enhance your browsing experience. By continuing to use this site, you agree to the use of cookies. 
									Cookies are small text files stored on your device that help us analyze website traffic, personalize content, and provide targeted advertisements.
								</panda-callout>
							</div>

							<div class="col-full">
								<panda-callout
									theme="spinner center-icons"
								>
									This website uses cookies to enhance your browsing experience. By continuing to use this site, you agree to the use of cookies. 
									Cookies are small text files stored on your device that help us analyze website traffic, personalize content, and provide targeted advertisements.
								</panda-callout>
							</div>

							<div class="col-full">
								<panda-callout
									theme="primary"
								>
									This website uses cookies to enhance your browsing experience. By continuing to use this site, you agree to the use of cookies. 
									Cookies are small text files stored on your device that help us analyze website traffic, personalize content, and provide targeted advertisements.
								</panda-callout>
							</div>

							<div class="col-full">
								<panda-callout
									theme="secondary"
								>
									This website uses cookies to enhance your browsing experience. By continuing to use this site, you agree to the use of cookies. 
									Cookies are small text files stored on your device that help us analyze website traffic, personalize content, and provide targeted advertisements.
								</panda-callout>
							</div>

							<div class="col-full">
								<panda-callout
									theme="tertiary"
								>
									This website uses cookies to enhance your browsing experience. By continuing to use this site, you agree to the use of cookies. 
									Cookies are small text files stored on your device that help us analyze website traffic, personalize content, and provide targeted advertisements.
								</panda-callout>
							</div>
						</div>
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
						Please refer below for instructions on utilizing our component. Experiment with the provided sample code to explore all the features of the component.
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
			<div class="content-section" data-content-section-name="${ContentSectionName.COMPONENT_STATES}">
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
						<panda-callout>
							This information is very important.
						</panda-callout>
					</div>
				</div>
			</div>
		`;
	}


	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onCloseCallout() {
		console.log("%c _onCloseCallout", "font-size: 24px; color: green;");
	}
}