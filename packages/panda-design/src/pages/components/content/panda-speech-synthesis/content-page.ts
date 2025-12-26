// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";
import { PandaSpeechSynthesisConfig } from "@panda-wbc/panda-speech-synthesis";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-speech-synthesis";
import "@panda-wbc/panda-button";
import "@panda-wbc/panda-textarea";
import "@panda-wbc/panda-combo-box";
import "@panda-wbc/panda-flag";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { ContentPageTemplate } from "../../../content-page-template";
import { page } from "../../../../utils/page-library";
import { pageConfig } from "./page-config";

import PandaSpeechSynthesis from "@panda-wbc/panda-speech-synthesis/lib/panda-speech-synthesis";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";
import { PandaComboBoxChangeEvent, PandaComboBoxItem } from "@panda-wbc/panda-combo-box";

@page(pageConfig)
@customElement("panda-speech-synthesis-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public contentPageConfig = pageConfig;
	public customStyles = styles;

	// demo props
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

	@state()
	private _disabled: boolean = true;
	
	@state()
	private _voiceList: PandaComboBoxItem[] = [];

	@state()
	private _selectedVoice!: string;

	@query("#textarea")
	private readonly _textAreaEl!: any;

	private readonly _pandaSpeechSynthesisConfig: PandaSpeechSynthesisConfig = {
		voice: "Google UK English Male", // Default voice
		rate: 1, // Default speech rate
		pitch: 1.5, // Default pitch

		// callbacks
		onReady: this._onReady.bind(this),
		onStart: this._onStart.bind(this),
		onEnd: this._onEnd.bind(this),
		onPause: this._onPause.bind(this),
		onError: this._onError.bind(this),
		onResume: this._onResume.bind(this), // Uncomment if you want to handle resume event
	};

	private readonly _pandaSpeechSynthesis: PandaSpeechSynthesis = new PandaSpeechSynthesis(this._pandaSpeechSynthesisConfig);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>SPEECH SYNTHESIS</h1>
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

		console.log("%c 🚀 (_renderOverviewSection) _selectedVoice:", "font-size: 24px; color: red; background: black;", this._selectedVoice);
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
						<div class="rows">
							
							<div class="row">
								<div class="col-full">
									<panda-combo-box
										id="voice-select"
										label="Select Voice"
										placeholder="Choose a voice"
										.items="${this._voiceList}"
										.value="${this._selectedVoice}"
										?disabled="${this._disabled}"
										@change="${this._onVoiceChange}"
									>										
									</panda-combo-box>
								</div>
							</div>

							<div class="row">
								<div class="col-full">

									<panda-textarea
										id="textarea"
										placeholder="Type text to be spoken by the component"
										rows="5"
										cols="50"
										label="Text to speak"
										theme="primary"
										value="Beads paused on the leaves of grass, Began to scatter fully in sleep."
										@keydown="${this._onKeyDown}"
									>
									</panda-textarea>
									<panda-button
										theme="primary"
										@click="${this._onSpeak}"
									>
										Speak
									</panda-button>

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
						Please refer below for instructions on utilizing our component. 
						Experiment with the provided sample code to explore all the features of the component.
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
			<div class="section" data-content-section-name="usage-properties">
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
			<div class="section" data-content-section-name="usage-events">
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

	private _onKeyDown(event: KeyboardEvent): void {
		if (event.key === "Enter") {
			this._onSpeak();
		}
	}

	private _onSpeak(): void {
		const text = this._textAreaEl.value;
		this._pandaSpeechSynthesis.rate = 1; // Set speech rate
		this._pandaSpeechSynthesis.pitch = 0.8; // Set speech pitch
		this._pandaSpeechSynthesis.speak(text);
	}

	private _onVoiceChange(event: PandaComboBoxChangeEvent): void {
		this._selectedVoice = event.detail.value as string;
		console.log("%c 🚀 [DEMO PAGE] (_onVoiceChange)", "font-size: 24px; color: blueviolet; background: black;", this._selectedVoice);
		this._pandaSpeechSynthesis.voice = this._selectedVoice;
	}

	private _onReady( voices: SpeechSynthesisVoice[]): void {
		console.log(`%c 🚀 [DEMO PAGE] (_onReady callback) voice: ${this._pandaSpeechSynthesis.voice}`, "font-size: 24px; color: blueviolet; background: black;");
		// Populate the combo box with available voices
		this._voiceList = voices.map((voice) => ({
			label: `${voice.name} (${voice.lang})`,
			value: voice.name,
		}));
		// check if there are any voices available
		this._disabled = !this._voiceList.length;
		this._selectedVoice = this._pandaSpeechSynthesis.voice;
	}

	private _onStart(): void {
		console.log("%c 🚀 [DEMO PAGE] (_onStart callback)", "font-size: 24px; color: blueviolet; background: black;");
	}

	private _onEnd(): void {
		console.log("%c 🚀 [DEMO PAGE] (_onEnd callback)", "font-size: 24px; color: blueviolet; background: black;");
	}

	private _onPause(): void {
		console.log("%c 🚀 [DEMO PAGE] (_onPause callback)", "font-size: 24px; color: blueviolet; background: black;");
	}

	private _onResume(): void {
		console.log("%c 🚀 [DEMO PAGE] (_onResume callback)", "font-size: 24px; color: blueviolet; background: black;");
	}

	private _onError(error: Error): void {
		console.error("%c 🚀 [DEMO PAGE] (_onError callback)", "font-size: 24px; color: blueviolet; background: black;", error);
	}
}