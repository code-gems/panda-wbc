// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Badge",
	pageId: "panda-badge",
	pageUri: `/develop?page=panda-badge`,

	category: PageCategory.DEVELOP,
	keywords: ["badge"],
	description: ["Showcase of a panda-badge component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
	],

	template: html`<panda-badge-content-page></panda-badge-content-page>`,
};
