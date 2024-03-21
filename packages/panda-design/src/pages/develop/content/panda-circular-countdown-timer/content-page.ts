// types
import {
	ComponentEventDetails,
	ComponentInterfaceDetails,
	ComponentPropertyDetails,
	ContentSectionName,
} from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-countdown-timer";
import "@panda-wbc/panda-counter";
import "@panda-wbc/panda-button";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement, state, query } from "lit/decorators.js";
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
		{ name: "autostart", type: "Boolean", defaultValue: "false", description: "Starts countdown timer immediately when time is set." },
		{ name: "busy", type: "Boolean", defaultValue: "false", description: "Sets busy state for the component and displays loading animation." },
		{ name: "clockwise", type: "Boolean", defaultValue: "false", description: "Changes default countdown direction to clockwise." },
		{ name: "format", type: "String", defaultValue: "MM:SS", description: "Sets the format of remaining time. Only works with 'showTime' feature." },
		{ name: "paused", type: "Boolean", defaultValue: "false", description: "Pause the countdown, and set the component into paused state." },
		{ name: "showScale", type: "Boolean", defaultValue: "false", description: "Shows the scale indicator for the countdown timer." },
		{ name: "showTime", type: "Boolean", defaultValue: "false", description: "Shows remaining countdown time." },
		{ name: "theme", type: "String", defaultValue: "-", description: "Sets components color theme." },
		{ name: "time", type: "Number", defaultValue: "-", description: "Sets countdown time. [seconds]" },
	];	

	private _componentEvents: ComponentEventDetails[] = [
		{ name: "countdown-tick", returnType: "Event", description: "Triggered every seconds during countdown." },
		{ name: "countdown-over", returnType: "Event", description: "Triggered when countdown is over." },
	];

	private _componentInterface: ComponentInterfaceDetails[] = [
		{ name: "start", returnType: "void", description: "Starts/Resumes countdown timer." },
		{ name: "pause", returnType: "void", description: "Pauses/Resumes countdown timer." },
		{ name: "stop", returnType: "void", description: "Stops countdown timer and resets timer to the initial value." },
		{ name: "restart", returnType: "void", description: "Restarts countdown timer from the initial value." },
	];

	@state()
	private _busy: boolean = false;

	@state()
	private _paused: boolean = false;

	@query("#timer")
	private _timer!: any;

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
						Panda Circular Countdown Timer is a versatile component that can be used in web applications to visually display and track time intervals.
						This component enriches user experiences by offering a dynamic and intuitive representation of time, enhancing engagement and usability.
						Developers can leverage this component across various use cases, including countdowns for events, progress indicators for time-bound tasks.
					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">

						<panda-circular-countdown-timer
							id="timer"
							.time="${10}"
							.format="${"SSs"}"
							autostart
							show-time
							show-scale
							clockwise
							.paused="${this._paused}"
							.busy="${this._busy}"
							@countdown-over="${this._onCountdownOver}"
							@countdown-tick="${this._onCountdownTick}"
						>
							Quick
						</panda-circular-countdown-timer>

						<panda-circular-countdown-timer
							theme="donut"
							.time="${90}"
							.format="${"MMm SSs"}"
							show-time
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
					@click="${this._onStart}"
				>
					START
				</panda-button>
				<panda-button
					@click="${this._onTogglePause}"
				>
					PAUSE
				</panda-button>
				<panda-button
					@click="${this._onStop}"
				>
					STOP
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
				${this._renderComponentEventsSection()}
				${this._renderComponentInterfaceSection()}
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

	private _renderComponentInterfaceSection(): TemplateResult {
		return html`
			<!-- COMPONENT INTERFACE -->
			<div class="section" data-content-section-name="${ContentSectionName.INTERFACE}">
				<internal-link theme="h3">Interface</internal-link>
				<p>
					The component interface serves as the bridge between the component's functionality and the implementation layer, enabling seamless integration and interaction with component. 
				</p>
				<p>
					See the list of available functionalities:
				</p>
				
				${this._renderComponentInterfaceTable(this._componentInterface)}
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

	private _onStart(): void {
		this._timer.start();
	}

	private _onStop(): void {
		this._timer.stop();
	}

	private _onCountdownOver(): void {
		console.log("%c 🚀 _onCountdownOver", "font-size: 24px; color: green;");
	}

	private _onCountdownTick(event: any): void {
		console.log("%c 🚀 _onCountdownTick", "font-size: 24px; color: green;", event.detail);
	}
}