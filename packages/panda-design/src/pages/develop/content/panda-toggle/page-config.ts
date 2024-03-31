// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Toggle",
	pageId: "panda-toggle",
	pageUri: "/develop?page=panda-toggle",
	category: PageCategory.DEVELOP,
	keywords: ["toggle", "switch"],
	description: ["Showcase of a panda-toggle element."],
	
	contextMenu: [		
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		{ name: "Theming", contextId: ContentSectionName.THEMING },
		{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-toggle-content-page></panda-toggle-content-page>`,
};
