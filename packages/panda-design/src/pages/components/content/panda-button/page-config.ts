// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Button",
	pageId: "panda-button",
	pageUri: "/components?page=panda-button",
	category: PageCategory.DEVELOP,
	keywords: ["native", "button", "cta", "action", "interface", "form"],
	description: ["Showcase of a panda-button element."],
	native: true,
	createdTimestamp: 1754202647857,
	
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
	