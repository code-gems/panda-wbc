// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Menu Bar",
	pageId: "panda-menu-bar",
	pageUri: `/develop?page=panda-menu-bar`,

	category: PageCategory.DEVELOP,
	keywords: ["menu-bar"],
	description: ["Showcase of a panda-menu-bar component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-menu-bar-content-page></panda-menu-bar-content-page>`,
};
