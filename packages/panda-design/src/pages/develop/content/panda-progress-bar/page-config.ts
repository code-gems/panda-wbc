// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Progress Bar",
	pageId: "panda-progress-bar",
	pageUri: `/develop?page=panda-progress-bar`,

	category: PageCategory.DEVELOP,
	keywords: ["progress bar"],
	description: ["Showcase of a panda-progress-bar component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		{ name: "Theming", contextId: ContentSectionName.THEMING },
		{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-progress-bar-content-page></panda-progress-bar-content-page>`,
};
