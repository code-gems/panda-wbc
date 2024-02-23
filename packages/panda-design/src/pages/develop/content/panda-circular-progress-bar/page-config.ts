// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Circular Progress Bar",
	pageId: "panda-circular-progress-bar",
	pageUri: `/develop?page=panda-circular-progress-bar`,

	category: PageCategory.DEVELOP,
	keywords: ["circular", "progress bar", "loader"],
	description: ["Showcase of a panda-circular-progress-bar component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-circular-progress-bar-content-page></panda-circular-progress-bar-content-page>`,
};
