// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Button",
	pageId: "panda-button",
	pageUri: "/develop?page=panda-button",
	category: PageCategory.DEVELOP,
	keywords: ["button", "cta", "action", "interface", "form"],
	description: ["Showcase of a panda-button element."],
	
	contextMenu: [		
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		{ name: "Theming", contextId: ContentSectionName.THEMING },
		{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-button-content-page></panda-button-content-page>`,
};
	