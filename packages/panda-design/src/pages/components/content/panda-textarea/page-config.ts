// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Textarea",
	pageId: "panda-textarea",
	pageUri: `/components?page=panda-textarea`,

	category: PageCategory.DEVELOP,
	keywords: ["textarea", "text box", "text", "article"],
	description: ["Showcase of a panda-textarea component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-textarea-content-page></panda-textarea-content-page>`,
};
