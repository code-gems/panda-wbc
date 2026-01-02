// types
import { PageCategory } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components & web parts

// utils
import { html, TemplateResult} from "lit";
import { customElement } from "lit/decorators.js";
import { ContentPageTemplate } from "../../../content-page-template";
import { page } from "../../../../utils/page-library";

// page config
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("base-colors-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.THEMES,
	keywords,
	description,
	contextMenu,
	template: html`<base-colors-content-page></base-colors-content-page>`
})
class BaseColorsContentPage extends ContentPageTemplate {
	// page details
	public pageId = pageId;
	public customStyles = styles;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

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
					<internal-link theme="h2">Overview</internal-link>
					<p>
						...
					</p>
				</div>
			</div>
		`;
	}
}