// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Click to Copy",
	pageId: "panda-click-to-copy",
	pageUri: `/develop?page=panda-click-to-copy`,

	category: PageCategory.DEVELOP,
	keywords: ["clipboard", "copy", "content", "html"],
	description: ["Showcase of a panda-click-to-copy component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-click-to-copy-content-page></panda-click-to-copy-content-page>`,
};
