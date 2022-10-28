// types
import { PageCategory } from "panda-design-typings";

// components


// utils & config
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { page } from "../../common/page-library";

@customElement("themes-page")
@page({
	pageId: "themes",
	pageName: "Themes",
	pageUri: "/themes",
	parent: true,
	category: PageCategory.THEMES,
	keywords: ["theme", "color", "colors", "css", "variables", "theming", "ux", "ui"],
	description: ["Themes description"],
	contextMenu: [],
	template: html`<themes-page></themes-page>`
})
export class ThemesPage extends LitElement {
	//css styles
	// static get styles() {
	// 	return styles;
	// }

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			THEMES
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...

}
