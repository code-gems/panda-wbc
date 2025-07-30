// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageId: "panda-flag",
	pageName: "Flag",
	pageUri: "/develop?page=panda-flag",
	category: PageCategory.DEVELOP,
	keywords: ["flags", "country"],
	description: ["Flag description"],

	native: true,
	updatedTimestamp: 1753769022292,
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Flag List", contextId: ContentSectionName.LIST },
	],

	template: html`<panda-flag-content-page></panda-flag-content-page>`
}
