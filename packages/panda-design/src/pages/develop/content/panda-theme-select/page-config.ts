// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Theme Select",
	pageId: "panda-theme-select",
	pageUri: `/develop?page=panda-theme-select`,

	category: PageCategory.DEVELOP,
	keywords: ["native", "theme", "select"],
	description: ["Showcase of a panda-theme-select component."],
	native: true,
	createdTimestamp: 1757053855785,

	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-theme-select-content-page></panda-theme-select-content-page>`,
};
