// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Full Page",
	pageId: "panda-full-page",
	pageUri: `/develop?page=panda-full-page`,

	category: PageCategory.DEVELOP,
	keywords: ["carousel", "banner", "slideshow"],
	description: ["Showcase of a panda-full-page component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-full-page-content-page></panda-full-page-content-page>`,
};
