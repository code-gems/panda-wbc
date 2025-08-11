// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Text Slider",
	pageId: "panda-text-slider",
	pageUri: `/develop?page=panda-text-slider`,

	category: PageCategory.DEVELOP,
	keywords: ["native", "sliding", "placeholder", "effect"],
	description: ["Showcase of a panda-text-slider component."],
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

	template: html`<panda-text-slider-content-page></panda-text-slider-content-page>`,
};
