// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	version: "1.0.0",
	pageName: "Theme Controls",
	pageId: "panda-theme-controls",
	pageUri: `/components?page=panda-theme-controls`,

	category: PageCategory.DEVELOP,
	keywords: ["theme", "controls", "switcher", "accent colors", "theme mode"],
	description: ["Showcase of a panda-theme-controls component."],
	createdTimestamp: 1757053855785,

	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-theme-controls-content-page></panda-theme-controls-content-page>`,
};
