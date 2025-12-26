// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Grid Layout",
	pageId: "panda-grid-layout",
	pageUri: `/components?page=panda-grid-layout`,

	category: PageCategory.DEVELOP,
	keywords: ["grid-layout"],
	description: ["Showcase of a panda-grid-layout component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-grid-layout-content-page></panda-grid-layout-content-page>`,
};
