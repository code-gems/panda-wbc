// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Details Dialog",
	pageId: "panda-details-dialog",
	pageUri: `/components?page=panda-details-dialog`,

	category: PageCategory.DEVELOP,
	keywords: ["dialog", "details", "popup"],
	description: ["Showcase of a panda-details-dialog component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-details-dialog-content-page></panda-details-dialog-content-page>`,
};
