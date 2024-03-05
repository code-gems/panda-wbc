// types
import { PageCategory } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// web parts
import "../../web-parts/main-nav/main-nav";

// load demo pages
import "./loader";

// utils & config
import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../utils/page-library";
import { ParentPageTemplate } from "../parent-page-template";

// page config
import { pageId, pageName, pageUri, keywords, description } from "./page-config";

@customElement("themes-page")
@page({
	pageId,
	pageName,
	pageUri,
	icon: "theme",
	parent: true,
	category: PageCategory.THEMES,
	keywords,
	description,
	contextMenu: [],
	template: html`<themes-page></themes-page>`
})
export class ThemesPage extends ParentPageTemplate {
	// page details
	public pageCategory = PageCategory.THEMES;
	public customStyles = styles;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderBanner(): TemplateResult {
		return html`
			<div class="banner">
				<h1>THEMES</h1>
				<p>
					...
				</p>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			<p>THEMES MAIN PAGE CONTENT</p>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...

}
