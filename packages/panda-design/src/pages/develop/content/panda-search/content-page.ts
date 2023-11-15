// types
import { PageCategory } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../../../styles/styles";

// components
import "@panda-wbc/panda-search";
import "@panda-wbc/panda-particle-banner";

// utils
import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import {
	pageId,
	pageName,
	pageUri,
	pageTemplate,
	keywords,
	description,
	contextMenu
} from "./page-config";

@customElement("panda-search-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: pageTemplate, // html`<panda-search-content-page></panda-search-content-page>`
})
export class PandaSearchContentPage extends ContentPageTemplate {
	// css styles
	static get styles() {
		return [
			styles,
			uiComponents.banner,
			uiComponents.sample,
			uiComponents.form,
			uiComponents.appLayout,
			uiComponents.columnSystem,
			uiComponents.modifiers,
		];
	}

	// page details
	pageId: string = pageId;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		// const bannerConfig = 
		return html`
			<div class="banner small">
				<panda-particle-banner>
					<div>
						<h1>SEARCH</h1>
						<p>
						</p>
						<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
					</div>
				</panda-particle-banner>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
		`;
	}


	private _renderOverviewSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="overview">
				<div class="section">
					<h2>Overview</h2>
					<p>
						
					</p>
				</div>

				<!-- OVERVIEW -->
				<div class="sample-cont">
					<div class="sample">
						<panda-search
							label="Search:"
							placeholder="Find..."
						>
						</panda-search>
					</div>
				</div>
			</div>
		`;
	}
}