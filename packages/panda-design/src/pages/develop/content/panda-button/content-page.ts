// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-button";

// utils
import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { pageConfig } from "./page-config";
import { ContentPageTemplate } from "../../../content-page-template";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";
import { bannerConfig2 } from "../../../../utils/particle-banner-presets";

// code snippets
import {
	alertThemeSnippet,
	busyStateSnippet,
	defaultStateSnippet,
	disabledStateSnippet,
	doneThemeSnippet,
	implementationSnippet,
	infoThemeSnippet,
	installationSnippet,
	primaryThemeSnippet,
	warnThemeSnippet,
} from "./snippets/snippets";

@page(pageConfig)
@customElement("panda-button-content-page")
export class PandaButtonContentPage extends ContentPageTemplate {
	// page details
	public pageId: string = pageConfig.pageId;
	public customStyles: CSSResultGroup = styles;

	// demo props
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
			showFps: true,
			particleGroup: [{
				particleCount: 100,
				colors: ["black"],
				// colorOpacityVariation: 50,
				walls: true,

				minSpeedX: -0.1,
				maxSpeedX: 0.1,
				minSpeedY: -0.1,
				maxSpeedY: 0.1,
				// maxDeltaSpeedX: 0.01,
				// minDeltaSpeedX: 0.01,
				// maxDeltaSpeedY: 0.01,
				// minDeltaSpeedY: 0.01,
				// deltaSpeedLimitX: 2,
				// deltaSpeedLimitY: 2,

				sizeMin: 1,
				sizeMax: 3,
				// blur: true,
				// blurMax: 1,
				connect: true,
				// connectionLineDash: [1, 1],
				// getConnectionLineColor: (distance) => {
				// 	const alphaMax = 128;
				// 	const alpha = alphaMax - Math.round((distance * alphaMax) / 100);
				// 	const hexColor = `#36174D${alpha.toString(16).padStart(2, '0')}`;
				// 	return hexColor.toUpperCase(); // Convert to uppercase for consistency
				// },
				connectionLineColor: "lightgray",
				connectionDistance: 100,
				getConnectionLineOpacity: (distance) => {
					const alphaMax = 100;
					const alpha = alphaMax - Math.round((distance * alphaMax) / 100);

					return alpha;
				},
				// shadowBlur: 1,
				// shadowColor: "#ff4778",
			}],
			// smudge: true
		};
		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner
					.config="${bannerConfig}"					
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
			${this._renderComponentStatesSection()}
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

	private _renderComponentStatesSection(): TemplateResult {
		return html`
			<!-- COMPONENT STATES -->
			<div class="content-section" data-content-section-name="${ContentSectionName.COMPONENT_STATES}">
				<div class="section">
					<internal-link theme="h3">Component States</internal-link>
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
				${this._renderDisabledComponentStateSection()}
				${this._renderBusyComponentStateSection()}
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderDefaultComponentStateSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="component-states-default">
				<internal-link theme="h3">Default</internal-link>
				<p>
					The default state represents the initial appearance and behavior of the component when it is first rendered or loaded.
					It reflects the component's default settings and may display placeholder content or default styling.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<code-sample header="Default State Example">
					${defaultStateSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderDisabledComponentStateSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="component-states-disabled">
				<internal-link theme="h3">Disabled</internal-link>
				<p>
					When a component enters this state, it becomes non-interactive, signaling to users that its functionality is temporarily unavailable or restricted.
					Visually, disabled components often appear grayed out or faded to indicate their inactive status.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<code-sample header="Disabled State Example">
					${disabledStateSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderBusyComponentStateSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="component-states-busy">
				<internal-link theme="h3">Busy</internal-link>
				<p>
					The busy state of a component is instrumental in providing real-time feedback to users 
					during processes that require time to complete, such as data fetching, calculations, or file uploads. 
					When a component enters this state, it indicates to users that an operation is in progress, thereby 
					managing expectations and reducing confusion. 
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<code-sample header="Busy State Example">
					${busyStateSnippet}
				</code-sample>
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
						Theming a web component with four base themes provides developers with a versatile toolkit 
						for visually communicating different states and messages to users. 
						Each theme corresponds to a specific context: info for neutral information, success for 
						positive feedback, warning for cautionary alerts, and error for critical errors.
					</p>
				</div>

				${this._renderInfoThemeSection()}
				${this._renderDoneThemeSection()}
				${this._renderWarnThemeSection()}
				${this._renderAlertThemeSection()}

				${this._renderPrimaryThemeSection()}
				${this._renderSecondaryThemeSection()}
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderInfoThemeSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="theming-info">
				<internal-link theme="h3">Info Theme</internal-link>
				<p>
					Buttons with the <i class="code">info</i> theme could be used for actions that provide users with additional information or guidance without invoking any significant changes or consequences. 
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="info"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="info"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="info"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Info Theme Example">
					${infoThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderDoneThemeSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="theming-done">
				<internal-link theme="h3">Done Theme</internal-link>
				<p>
					Buttons with the <i class="code">done</i> theme are often used to confirm successful actions or completion of a task.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="done"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="done"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="done"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Done Theme Example">
					${doneThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderWarnThemeSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="theming-warn">
				<internal-link theme="h3">Warn Theme</internal-link>
				<p>
					Buttons with the <i class="code">warn</i> theme are typically used to signify actions that may have potentially risky or irreversible consequences.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="warn"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="warn"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="warn"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Warn Theme Example">
					${warnThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderAlertThemeSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="theming-alert">
				<internal-link theme="h3">Alert Theme</internal-link>
				<p>
					Buttons with the <i class="code">alert</i> theme are prominently displayed to prompt users to take corrective action when errors or validation issues occur. 
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="alert"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="alert"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="alert"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Alert Theme Example">
					${alertThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderPrimaryThemeSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="theming-primary">
				<internal-link theme="h3">Primary Theme</internal-link>
				<p>
					Buttons with the <i class="code">primary</i> theme are prominently displayed to encourage users to take the most essential actions within the interface.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Primary Theme Example">
					${primaryThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderSecondaryThemeSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="theming-secondary">
				<internal-link theme="h3">Secondary Theme</internal-link>
				<p>
					Buttons with the <i class="code">secondary</i> theme complement primary actions by offering additional, but less frequently used, functionality.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Primary Theme Example">
					${primaryThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onClick(): void {
		console.log("%c ⚡ [BUTTON DEMO PAGE] click", "font-size: 24px; color: orange;");

	}

}