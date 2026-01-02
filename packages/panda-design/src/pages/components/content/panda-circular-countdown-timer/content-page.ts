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

// samples
import "./samples/action-themes-sample";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";

@page(pageConfig)
@customElement("panda-circular-countdown-timer-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public contentPageConfig = pageConfig;
	public customStyles = styles;

	// demo props
	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "autostart", type: "Boolean", defaultValue: "false", description: "Starts countdown timer immediately when time is set." },
		{ name: "busy", type: "Boolean", defaultValue: "false", description: "Sets busy state for the component and displays loading animation." },
		{ name: "backward", type: "Boolean", defaultValue: "false", description: "Changes default countdown style to backward." },
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

	private _componentInterface: ComponentInterfaceDetails[] = [
		{ method: "start", returnType: "void", description: "Starts/Resumes countdown timer." },
		{ method: "pause", returnType: "void", description: "Pauses/Resumes countdown timer." },
		{ method: "stop", returnType: "void", description: "Stops countdown timer and resets timer to the initial value." },
		{ method: "restart", returnType: "void", description: "Restarts countdown timer from the initial value." },
	];

	@state()
	private _busy: boolean = false;

	@query("#timer")
	private _timer!: any;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
			${this._renderInstallationSection()}
			${this._renderUsageSection()}
			${this._renderThemingSection()}
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
								<div class="col-half content-center">

									<panda-circular-countdown-timer
										id="timer"
										theme="info"
										.time="${60}"
										.format="${"SSs"}"
										autostart
										show-time
										show-scale
										clockwise
										.busy="${this._busy}"
										@countdown-over="${this._onCountdownOver}"
										@countdown-tick="${this._onCountdownTick}"
									>
										Quick
									</panda-circular-countdown-timer>
									
								</div>

								<div class="col-half">

									<panda-button @click="${this._onStart}">START</panda-button>
									<panda-button @click="${this._onTogglePause}">PAUSE</panda-button>
									<panda-button @click="${this._onStop}">STOP</panda-button>
									<panda-button @click="${this._onRestart}">RESTART</panda-button>
									<panda-button @click="${this._onToggleBusy}">TOGGLE BUSY STATE</panda-button>

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

	private _renderThemingSection(): TemplateResult {
		return html`
			<!-- THEMING -->
			<div class="content-section" data-content-section-name="${ContentSectionName.THEMING}">
				<div class="section">
					<internal-link theme="h2">Theming</internal-link>
					<p>
						Theming enables developers to change the default appearance of components by providing themes.
						Component offers built-in themes, allowing developers to choose from pre-defined styles.
						Some themes can be used in combination with the other themes enabling developers with even more options.
					</p>
					<p>
						See the list of available themes below:
					</p>
					${this._renderActionColorsThemingSection()}
				</div>
			</div>
		`;
	}

	private _renderActionColorsThemingSection(): TemplateResult {
		return html`
			<div class="content-section" data-content-section-name="theming-action-colors">
				<div class="section">
					<internal-link theme="h3">Action Colors</internal-link>
					<p>
						Countdown timer comes with predefined action color themes: 
					</p>
				</div>

				<panda-circular-countdown-timer-action-colors-themes>
				</panda-circular-countdown-timer-action-colors-themes>
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
		this._timer.pause();
	}

	private _onStart(): void {
		this._timer.start();
	}

	private _onStop(): void {
		this._timer.stop();
	}

	private _onRestart(): void {
		this._timer.restart();
	}

	private _onCountdownOver(): void {
		console.log("%c 🚀 _onCountdownOver", "font-size: 24px; color: green;");
	}

	private _onCountdownTick(event: any): void {
		console.log("%c 🚀 _onCountdownTick", "font-size: 24px; color: green;", event.detail);
	}
}