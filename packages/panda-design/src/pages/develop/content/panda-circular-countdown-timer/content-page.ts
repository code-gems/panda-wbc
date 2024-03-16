// types
import { ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-circular-countdown-timer";
import "@panda-wbc/panda-counter";
import "@panda-wbc/panda-button";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import { pageConfig } from "./page-config";
import { bannerConfig2 } from "../../../../utils/particle-banner-presets";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";

@page(pageConfig)
@customElement("panda-circular-countdown-timer-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public pageId: string = pageConfig.pageId;
	public customStyles = styles;

	// demo props
	private _componentProperties: ComponentPropertyDetails[] = [
		{ name: "theme", type: "String", defaultValue: "-", description: "Sets components color theme." },
		{ name: "value", type: "Number", defaultValue: "-", description: "Sets progress bar value between 0 - 100 [deg]." },
		{ name: "gradientAngle", type: "Number", defaultValue: "180", description: "Changes rotation angle of two progress bar gradient colors [deg]." },
		{ name: "thickness", type: "Number", defaultValue: "5", description: "Changes progress bar default thickness [px]." },
		{ name: "showScale", type: "Boolean", defaultValue: "false", description: "Shows progress bar scale / dashed circle." },
		{ name: "dashed", type: "Boolean", defaultValue: "false", description: "Changes progress bar style to dashed lines." },
		{ name: "counterclockwise", type: "Boolean", defaultValue: "false", description: "Changes progress bar default direction from clockwise to counterclockwise." },
		{ name: "busy", type: "boolean", defaultValue: "false", description: "Sets busy state for the component and displays loading animation." },
	];

	@state()
	private _busy: boolean = false;

	@state()
	private _paused: boolean = false;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner
					.config="${bannerConfig2()}"					
				>
					<div class="content">
						<h1>CIRCULAR COUNTDOWN TIMER</h1>
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

					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">

						<panda-circular-countdown-timer
							.time="${10}"
							autostart
							show-interval
							show-scale
							.paused="${this._paused}"
							.busy="${this._busy}"
							@countdown-over="${this._onCountdownOver}"
						>
						</panda-circular-countdown-timer>

						<panda-circular-countdown-timer
							theme="donut"
							.time="${10}"
							show-interval
							show-scale
							autostart
							.paused="${this._paused}"
							.busy="${this._busy}"
							@countdown-over="${this._onCountdownOver}"
						>
						</panda-circular-countdown-timer>

					</div>
				</div>

				<panda-button
					@click="${this._onTogglePause}"
				>
					TOGGLE PAUSED STATE
				</panda-button>
				<panda-button
					@click="${this._onToggleBusy}"
				>
					TOGGLE BUSY STATE
				</panda-button>

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
						Please refer below for instructions on utilizing our component. Experiment with the provided sample code to explore all the features of the component.
					</p>

					<code-sample header="Implementation">
						${implementationSnippet}
					</code-sample>

				</div>
				${this._renderComponentPropertiesSection()}
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

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onToggleBusy(): void {
		this._busy = !this._busy;
	}

	private _onTogglePause(): void {
		this._paused = !this._paused;
	}

	private _onCountdownOver(): void {
		console.log("%c 🚀 _onCountdownOver", "font-size: 24px; color: green;");
	}

}