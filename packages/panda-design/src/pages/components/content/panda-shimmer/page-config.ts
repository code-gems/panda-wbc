// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Shimmer",
	pageId: "panda-shimmer",
	pageUri: `/components?page=panda-shimmer`,

	category: PageCategory.DEVELOP,
	keywords: ["shimmer", "loading effect", "skeleton"],
	description: ["Showcase of a panda-shimmer component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-shimmer-content-page></panda-shimmer-content-page>`,
};
