// types
import { Page, ContentSectionName, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageId: "panda-dialog",
	pageName: "Dialog",
	pageUri: "/components?page=panda-dialog",
	keywords: ["native", "dialog", "popup", "modal"],
	description: ["Showcase of a panda-dialog component."],
	category: PageCategory.DEVELOP,
	native: true,

	createdTimestamp: 1697059200000,

	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
	],

	template: html`<panda-dialog-content-page></panda-dialog-content-page>`,
};