// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Text Scroller",
	pageId: "panda-text-scroller",
	pageUri: `/components?page=panda-text-scroller`,

	category: PageCategory.DEVELOP,
	keywords: ["native", "text", "label", "marquee", "scroller", "effect"],
	description: [
		`Text Scroller is a native web component that displays a single line of text and automatically scrolls it horizontally if the text is too long to fit within its container.`
	],
	native: true,

	createdTimestamp: 1755142837955,
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-text-scroller-content-page></panda-text-scroller-content-page>`,
};
