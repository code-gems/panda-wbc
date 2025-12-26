// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Chips",
	pageId: "panda-chips",
	pageUri: `/components?page=panda-chips`,

	category: PageCategory.DEVELOP,
	keywords: ["chips", "filters", "suggestions", "actions"],
	description: ["Showcase of a panda-chips component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-chips-content-page></panda-chips-content-page>`,
};
