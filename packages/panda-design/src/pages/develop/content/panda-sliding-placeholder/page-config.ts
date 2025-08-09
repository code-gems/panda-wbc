// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Sliding Placeholder",
	pageId: "panda-sliding-placeholder",
	pageUri: `/develop?page=panda-sliding-placeholder`,

	category: PageCategory.DEVELOP,
	keywords: ["native", "sliding", "placeholder", "effect"],
	description: ["Showcase of a panda-sliding-placeholder component."],
	native: true,
	createdTimestamp: 1754713898708,
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-sliding-placeholder-content-page></panda-sliding-placeholder-content-page>`,
};
