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
import "@panda-wbc/panda-sortable-list";

// utils
import { CSSResultGroup, html, TemplateResult, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
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

@customElement("panda-sortable-list-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-sortable-list-content-page></panda-sortable-list-content-page>`
})
export class PandaNotificationsContentPage extends ContentPageTemplate {
	// page details
	public customStyles: CSSResultGroup = styles;
	public pageId: string = pageId;

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

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
			${this._renderInstallationSection()}
			${this._renderUsageSection()}
			${this._renderComponentStatesSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		const list = [
			{id: "1", template: "Item 1"},
			{id: "2", template: "Item 2"},
			{id: "3", template: "Item 3"},
			{id: "4", template: "Item 4"},
		]
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
							<div class="row">
								<div class="col-full">
									<panda-sortable-list
										.items="${list}"
									>
									</panda-sortable-list>

									<counter-element>
									</counter-element>
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

	

}


class CounterElement extends LitElement {
	static styles = css`
	  :host {
		display: block;
		font-size: 24px;
		font-family: Arial, sans-serif;
	  }
  
	  .counter {
		display: inline-block;
		overflow: hidden;
	  }
  
	  .count {
		display: inline-block;
		animation: slide-up 0.5s ease-in-out;
	  }
  
	  @keyframes slide-up {
		from {
		  transform: translateY(100%);
		}
		to {
		  transform: translateY(0);
		}
	  }
	`;
  
	@property({ type: Number })
	counterValue: number = this.offsetHeight;
  
	updated(changedProperties: any) {
	  super.updated(changedProperties);
	  if (changedProperties.has('counterValue')) {
		this.requestUpdate(); // Trigger LitElement to re-render and apply the animation
	  }
	}
  
	render() {
	  return html`
		<div class="counter">
		  <span class="count">${this.counterValue}</span>
		</div>
		<button @click=${this.incrementCounter}>Increment</button>
	  `;
	}
  
	incrementCounter() {
	  this.counterValue += 1;
	}
  }
  
  customElements.define('counter-element', CounterElement);
