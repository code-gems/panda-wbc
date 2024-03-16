// types
import { ComponentPropertyDetails, ContentSectionName, PageCategory } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-flag";
import "../../../../web-parts/code-sample/code-sample";
import "../../../../web-parts/version-shield/version-shield";

// utils & config
import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";

// page config
import {
	pageId,
	pageName,
	pageUri,
	keywords,
	description,
	contextMenu
} from "./page-config";

@customElement("panda-flag-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-flag-content-page></panda-flag-content-page>`
})
export class PandaFlagContentPage extends ContentPageTemplate {
	// css styles
	public customStyles: CSSResultGroup = styles;

	// page details
	pageId: string = pageId;
	
	
	private _componentProperties: ComponentPropertyDetails[] = [
		{ name: "flag", type: "String", defaultValue: "-", description: "Country code or other country id compliant with ISO 3166 international standard." },
		{ name: "square", type: "Boolean", defaultValue: "false", description: "Show flag as a square box." },
	];

	// view props

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
				<h1>FLAGS</h1>
				<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
			${this._renderFlagListSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						Panda Flag is a versatile and dynamic solution designed to effortlessly incorporate national flags into your user interface. 
						This intuitive component serves as a visual gateway to represent countries, fostering a rich and engaging user experience.
					</p>
					<p>
						Component offers an aesthetically pleasing display of flags based on specified country codes compliant with ISO 3166 international standard. 
						With a focus on simplicity and flexibility, this component offers two size formats to fit your preference. 
					</p>
				</div>
			</div>
			${this._renderComponentPropertiesSection()}
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

	private _renderFlagListSection(): TemplateResult {
		return html`
			<div>
			
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

}