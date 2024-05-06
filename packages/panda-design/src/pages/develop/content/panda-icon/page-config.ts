// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Icons",
	pageId: "panda-icon",
	pageUri: "/develop?page=panda-icon",
	category: PageCategory.DEVELOP,
	keywords: ["icon"],
	description: ["Showcase of a panda-icon element."],
	
	contextMenu: [		
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Icon List", contextId: ContentSectionName.LIST },
	],

	template: html`<panda-icon-content-page></panda-icon-content-page>`,
};
	