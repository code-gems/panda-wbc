// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Callout",
	pageId: "panda-callout",
	pageUri: "/components?page=panda-callout",
	category: PageCategory.DEVELOP,
	keywords: ["callout", "call-out", "notification", "message", "information"],
	description: ["Showcase of a panda-callout element."],
	
	contextMenu: [		
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		{ name: "Theming", contextId: ContentSectionName.THEMING },
		{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-callout-content-page></panda-callout-content-page>`,
};
