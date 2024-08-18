// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Toast",
	pageId: "panda-toast",
	pageUri: "/develop?page=panda-toast",

	category: PageCategory.DEVELOP,
	keywords: ["toast", "notification", "system message", "alert", "note"],
	description: ["Showcase of a panda-toast component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-toast-content-page></panda-toast-content-page>`,
};
