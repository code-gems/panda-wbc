// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName, PageCategory } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-button";

// utils
import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";
import { ContentPageTemplate } from "../../../content-page-template";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";
import { bannerConfig2 } from "../../../../utils/particle-banner-presets";

@customElement("panda-button-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-button-content-page></panda-button-content-page>`
})
export class PandaButtonContentPage extends ContentPageTemplate {
	// css styles
	public customStyles: CSSResultGroup = styles;

	// page details
	pageId: string = pageId;

	private _componentProperties: ComponentPropertyDetails[] = [
		{ name: "disabled", type: "boolean", defaultValue: "false", description: "Sets a disabled state for the component." },
		{ name: "busy", type: "boolean", defaultValue: "false", description: "Sets busy state for the component." },
	];

	private _componentEvents: ComponentEventDetails[] = [
		{ name: "click", returnType: "Event", description: "" }
	];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		const bannerConfig: PandaParticleBannerConfig = {
			particleGroup: [{
				particleCount: 100,
				colors: ["black"],
				colorOpacityVariation: 50,
				walls: true,

				minSpeedX: -0.1,
				maxSpeedX: 0.1,
				minSpeedY: -0.1,
				maxSpeedY: 0.1,
				// deltaSpeedY: 0.01,
				// deltaSpeedX: -0.01,

				sizeMin: 2,
				sizeMax: 1,
				blur: true,
				blurMax: 1,
				connect: true,
				// connectionLineDash: [1, 1],
				// getConnectionLineColor: (distance) => {
				// 	const alphaMax = 128;
				// 	const alpha = alphaMax - Math.round((distance * alphaMax) / 100);
				// 	const hexColor = `#36174D${alpha.toString(16).padStart(2, '0')}`;
				// 	return hexColor.toUpperCase(); // Convert to uppercase for consistency
				// },
				connectionLineColor: "#ff4778",
				connectionDistance: 50,
				getConnectionLineOpacity: (distance) => {
					const alphaMax = 128;
					const alpha = alphaMax - Math.round((distance * alphaMax) / 100);
					return alpha;
				},
				shadowBlur: 1,
				shadowColor: "#ff4778",
			}],
			showFps: true,
			// smudge: true
		};
		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner
					.config="${bannerConfig2}"					
				>
					<div class="content">
						<h1>BUTTON</h1>
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
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						Buttons serve as triggers for performing actions within the application. 
						They can initiate processes like submitting forms, saving data, navigating between pages, or executing specific tasks.
					</p>
					<p>
						One of the key advantages of a combo box is its ability to handle both predefined options and user-generated input. 
						It offers a convenient way for users to select from a limited set of choices, 
						while still allowing them the flexibility to enter custom values when necessary.
					</p>
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
						This section will help you to get familiar with component's properties and events. 
						Purpose of this segment is to equip developers with knowledge necessary to streamline the development process and elevate your web projects.
					</p>
	
					<code-sample header="Implementation Example">
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
			<div class="section" data-content-section-name="properties">
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
			<div class="section" data-content-section-name="events">
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


}