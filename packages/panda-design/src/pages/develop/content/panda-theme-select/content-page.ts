// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";
import { PandaThemeSelectChangeEvent, PandaThemeSelectI18nConfig } from "@panda-wbc/panda-theme-select";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-theme-select";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ContentPageTemplate } from "../../../content-page-template";
import { page } from "../../../../utils/page-library";
import { pageConfig } from "./page-config";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";
import { toastCenter } from "../../../../utils/toast-center";

@page(pageConfig)
@customElement("panda-theme-select-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public pageId: string = pageConfig.pageId;
	public customStyles = styles;

	// demo props
	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "theme", type: "String", defaultValue: "-", description: "Initial value" },
	];

	private readonly _componentEvents: ComponentEventDetails[] = [
		{ name: "@change", returnType: "PandaThemeSelectChangeEvent", description: "Triggered when user changes the theme." }
	];

	@state()
	private _selectedTheme: string = "";

	@state()
	private _i18n: PandaThemeSelectI18nConfig | null = null;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>THEME SELECT</h1>
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
						<div class="rows">
							<div class="row">
								<div class="col-full">

									<panda-theme-select
										.value="${this._selectedTheme}"
										.i18n="${this._i18n}"
										@change="${this._onThemeChange}"
									>
									</panda-theme-select>

								</div>
							</div>

							<div class="row">
								<div class="col-3">

									<panda-button
										@click="${this._onChangeI18nConfigToChinese}"
									>
										Change i18n to Chinese
									</panda-button>

								</div>
								<div class="col-3">

									<panda-button
										@click="${this._onChangeI18nConfigToEnglish}"
									>
										Change i18n to English
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

	private _onThemeChange(event: PandaThemeSelectChangeEvent) {
		console.log(`%c (_onThemeChange)`, "font-size: 24px; color: crimson; background: black;", event);
		this._selectedTheme = event.detail.theme;
		toastCenter.createToast({
			message: `Theme changed to ${this._selectedTheme}`,
			theme: "done",
			icon: "check-circle",
		});
	}

	private _onChangeI18nConfigToChinese(): void {
		this._i18n = {
			light: "亮色",
			dark: "暗色",
			system: "系统偏好设置",
		};
	}

	private _onChangeI18nConfigToEnglish(): void {
		this._i18n = {
			light: "Light",
			dark: "Dark",
			system: "System Preference",
		};
	}
}