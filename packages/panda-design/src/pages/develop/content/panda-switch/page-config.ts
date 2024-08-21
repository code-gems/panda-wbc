// types
import { PageCategory, ContentSectionName, Page } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageId: "panda-switch",
	pageName: "Switch",
	pageUri: "/develop?page=panda-switch",
	category: PageCategory.DEVELOP,
	keywords: ["switch", "toggle", "control", "button"],
	description: ["Showcase of a panda-switch element."],

	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		{ name: "Theming", contextId: ContentSectionName.THEMING },
		{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-switch-content-page></panda-switch-content-page>`
};
