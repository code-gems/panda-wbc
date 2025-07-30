// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Spinner",
	pageId: "panda-spinner",
	pageUri: "/develop?page=panda-spinner",
	category: PageCategory.DEVELOP,
	keywords: ["spinner", "ui component", "progress", "animation", "status", "loading", "native"],
	description: ["Showcase of a panda-spinner element."],
	native: true,
	updatedTimestamp: 1752884534684, // 2024-05-17T12:15:34.684Z

	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
	],

	template: html`<panda-spinner-content-page></panda-spinner-content-page>`,
};
	