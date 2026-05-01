// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	version: "1.0.0",
	pageName: "Spinner",
	pageId: "panda-spinner",
	pageUri: "/components?page=panda-spinner",
	category: PageCategory.DEVELOP,
	keywords: ["spinner", "ui component", "progress", "animation", "status", "loading"],
	description: ["Showcase of a panda-spinner element."],
	createdTimestamp: 1754202647857,

	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
	],

	template: html`<panda-spinner-content-page></panda-spinner-content-page>`,
};
	