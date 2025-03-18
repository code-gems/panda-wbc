// types
import {
	ComponentPropertyDetails,
	ComponentEventDetails,
	PageCategory,
	ContentSectionName,
} from "panda-design-typings";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-notifications";
import { pandaNotificationCenter } from "@panda-wbc/panda-notifications/lib/panda-notification-center";

// utils
import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import {
	pageId,
	pageName,
	pageUri,
	keywords,
	description,
	contextMenu
} from "./page-config";

// code snippets
import { implementationSnippet, installationSnippet } from "./snippets/snippets";

// static data
// ...

@customElement("panda-notifications-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-notifications-content-page></panda-notifications-content-page>`
})
export class PandaNotificationsContentPage extends ContentPageTemplate {
	// page details
	public customStyles: CSSResultGroup = styles;
	public pageId: string = pageId;

	private _componentProperties: ComponentPropertyDetails[] = [
		{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component." },
		{ name: "icon", type: "String", defaultValue: "-", description: "Custom icon to be shown on the component." },
		{ name: "hideIcon", type: "Boolean", defaultValue: "false", description: "Hide callout icon." },
		{ name: "closable", type: "Boolean", defaultValue: "false", description: "Adds close button to the callout's header and makes it closable." },
		{ name: "spinnerType", type: "String", defaultValue: "dots", description: "Spinner animation type for busy state." },
	];

	private _componentEvents: ComponentEventDetails[] = [
		{ name: "@on-close", returnType: "Event", description: "Triggered when user tries to close callout." }
	];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html``;
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
				colorSaturationVariation: 10,
				maxSpeedX: 0.1,
				minSpeedX: -0.1,
				maxSpeedY: -0.5,
				minSpeedY: -0.1,
				sizeMax: 80,
				sizeMin: 40
			}]
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

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row" style="height: 600px;">
								<div class="col-half">
									<panda-button
										theme="primary"
										@click="${this._onAddNotification}"
									>
										Create Notification
									</panda-button>
								</div>
								<div class="col-half">
									<panda-button
										theme="secondary"
										@click="${this._onUpdateNotification}"
									>
										Update Notification
									</panda-button>
								</div>
								<div class="col-full">
									<panda-notifications
										.scope="${["local"]}"
										local-container
										show-dismiss-all-button
									>
									</panda-notifications>
								</div>
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

	private _onAddNotification() {
		pandaNotificationCenter.addNotification({
			scope: ["local"],
			body: html`Notification #1`,
			// autoClose: true,
		});

		// const noteId1 = pandaNotificationCenter.addNotification({
		// 	theme: "warn",
		// 	header: html`WARNING`,
		// 	body: html`
		// 		In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate 
		// 		the visual form of a document or a typeface without relying on meaningful content. 
		// 		Lorem ipsum may be used as a placeholder before final copy is available.
		// 	`,
		// 	footer: html`
		// 		<panda-button
		// 			@click="${() => this._onCloseNotification(noteId1)}"
		// 		>
		// 			Close
		// 		</panda-button>
		// 	`,
		// 	autoClose: true,
		// 	autoCloseInterval: 10000,
		// });

		// pandaNotificationCenter.addNotification({
		// 	theme: "alert",
		// 	body: html`Notification #2`,
		// 	autoClose: true,
		// });

		// const noteId2 = pandaNotificationCenter.addNotification({
		// 	theme: "done",
		// 	header: html`SUCCESS`,
		// 	body: html`
		// 		In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate 
		// 		the visual form of a document or a typeface without relying on meaningful content. 
		// 		Lorem ipsum may be used as a placeholder before final copy is available.
		// 	`,
		// 	footer: html`
		// 		<panda-button
		// 			@click="${() => this._onCloseNotification(noteId2)}"
		// 		>
		// 			Close
		// 		</panda-button>
		// 	`,
		// });

		// pandaNotificationCenter.addNotification({
		// 	theme: "primary",
		// 	body: html`Notification #4`
		// });		
		
		// pandaNotificationCenter.addNotification({
		// 	id: "1234",
		// 	scope: ["local"],
		// 	hideIcon: true,
		// 	headerPrefix: html`NEW`,
		// 	header: html`Cookie Usage`,
		// 	body: html`
		// 		This website uses cookies to enhance your browsing experience. 
		// 		By continuing to use this site, you agree to the use of cookies. 
		// 		Cookies are small text files stored on your device that help us analyze website traffic, 
		// 		personalize content, and provide targeted advertisements.
		// 	`,
		// 	footer: html`
		// 		<panda-button
		// 			@click="${() => this._onCloseNotification("1234")}"
		// 		>
		// 			Exit
		// 		</panda-button>
		// 		<panda-button>
		// 			Accept All
		// 		</panda-button>
		// 	`,
		// });
	}

	private _onCloseNotification(notificationId: string) {
		pandaNotificationCenter.closeNotification(notificationId);
	}

	private _onUpdateNotification() {
		pandaNotificationCenter.addNotification({
			id: "1234",
			scope: ["local"],
			hideIcon: true,
			headerPrefix: html`OLD`,
			header: html`Cookie Usage`,
			body: html`
				This website uses cookies to enhance your browsing experience. 
				By continuing to use this site, you agree to the use of cookies. 
				Cookies are small text files stored on your device that help us analyze website traffic, 
				personalize content, and provide targeted advertisements.
			`,
			footer: html`
				<panda-button @click="${() => this._onCloseNotification("1234")}">
					Exit Page
				</panda-button>
				<panda-button>
					Accept All
				</panda-button>
			`,
		});

	}
	

}