// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Theme Controls",
	pageId: "panda-theme-controls",
	pageUri: `/develop?page=panda-theme-controls`,

	category: PageCategory.DEVELOP,
	keywords: ["native", "theme", "controls", "switcher", "accent colors", "theme mode"],
	description: ["Showcase of a panda-theme-controls component."],
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
