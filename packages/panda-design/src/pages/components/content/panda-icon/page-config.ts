// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	version: "1.0.0",
	pageName: "Icons",
	pageId: "panda-icon",
	pageUri: "/components?page=panda-icon",
	category: PageCategory.DEVELOP,
	keywords: ["icon", "icons"],
	description: ["Showcase of a panda-icon element."],
	createdTimestamp: 1754202647857,
	
	contextMenu: [		
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Icon List", contextId: ContentSectionName.LIST },
	],

	template: html`<panda-icon-content-page></panda-icon-content-page>`,
};
	