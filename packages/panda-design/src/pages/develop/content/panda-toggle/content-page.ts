// types
import {
	ComponentEventDetails,
	ComponentPropertyDetails,
	ContentSectionName,
} from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-toggle";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import { pageConfig } from "./page-config";
import { bannerConfig1 } from "../../../../utils/particle-banner-presets";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";

@page(pageConfig)
@customElement("panda-toggle-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public pageId: string = pageConfig.pageId;
	public customStyles = styles;

	// demo props
	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "autostart", type: "Boolean", defaultValue: "false", description: "Starts countdown timer immediately when time is set." },
		{ name: "busy", type: "Boolean", defaultValue: "false", description: "Sets busy state for the component and displays loading animation." },
		{ name: "clockwise", type: "Boolean", defaultValue: "false", description: "Changes default countdown direction to clockwise." },
		{ name: "format", type: "String", defaultValue: "MM:SS", description: "Sets the format of remaining time. Only works with 'showTime' feature." },
		{ name: "paused", type: "Boolean", defaultValue: "false", description: "Pause the countdown, and set the component into paused state." },
		{ name: "showScale", type: "Boolean", defaultValue: "false", description: "Shows the scale indicator for the countdown timer." },
		{ name: "showTime", type: "Boolean", defaultValue: "false", description: "Shows remaining countdown time." },
		{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component." },
		{ name: "time", type: "Number", defaultValue: "-", description: "Sets countdown time. [seconds]" },
	];	

	private readonly _componentEvents: ComponentEventDetails[] = [
		{ name: "countdown-tick", returnType: "Event", description: "Triggered every seconds during countdown." },
		{ name: "countdown-over", returnType: "Event", description: "Triggered when countdown is over." },
	];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner
					.config="${bannerConfig1}"					
				>
					<div class="content">
						<h1>TOGGLE</h1>
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
						Panda Circular Countdown Timer is a versatile component that can be used in web applications to visually display and track time intervals.
						This component enriches user experiences by offering a dynamic and intuitive representation of time, enhancing engagement and usability.
						Developers can leverage this component across various use cases, including countdowns for events, progress indicators for time-bound tasks.
					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
							
								<panda-toggle></panda-toggle>
								<panda-toggle selected></panda-toggle>
								<panda-toggle indeterminate></panda-toggle>
								
								<panda-toggle busy spinner="google"></panda-toggle>
								<panda-toggle disabled></panda-toggle>
								<panda-toggle selected disabled></panda-toggle>

							</div>
							<div class="row">
								<panda-toggle
									selected-icon="check"
									unselected-icon="close"
									indeterminate
								></panda-toggle>

								<panda-toggle
									theme="size-s"
									selected-icon="check"
									unselected-icon="close"
								></panda-toggle>

								<panda-toggle
									theme="size-xs"
									selected-icon="check"
									unselected-icon="close"
								></panda-toggle>

								<panda-toggle
									selected-icon="check"
									unselected-icon="close"
									disabled
								></panda-toggle>

								<panda-toggle
									theme="size-s"
									selected-icon="check"
									unselected-icon="close"
									disabled
								></panda-toggle>

								<panda-toggle
									theme="size-xs"
									selected-icon="check"
									unselected-icon="close"
									disabled
								></panda-toggle>
	
							</div>

							<div class="row">
								<panda-toggle theme="slim"></panda-toggle>
								<panda-toggle theme="slim" selected></panda-toggle>
								<panda-toggle theme="slim" disabled></panda-toggle>
								<panda-toggle theme="slim" indeterminate></panda-toggle>
								<panda-toggle theme="slim done" selected></panda-toggle>
								<panda-toggle theme="slim done" selected busy></panda-toggle>
							</div>

							<div class="row">
								<panda-toggle theme="info"></panda-toggle>
								<panda-toggle theme="info" selected></panda-toggle>
								<panda-toggle theme="info" busy></panda-toggle>
								<panda-toggle theme="info" disabled></panda-toggle>

							</div>

							<div class="row">
								<panda-toggle theme="done"></panda-toggle>
								<panda-toggle theme="done" selected></panda-toggle>
								<panda-toggle theme="done" busy></panda-toggle>
								<panda-toggle theme="done" disabled></panda-toggle>

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
			<div class="section" data-content-section-name="${ContentSectionName.PROPERTIES}">
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
			<div class="section" data-content-section-name="${ContentSectionName.EVENTS}">
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
}