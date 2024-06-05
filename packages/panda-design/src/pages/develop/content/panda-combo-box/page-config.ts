// types
import { ContentSectionName, PageCategory, Page } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageId: "panda-combo-box",
	pageName: "Combo-box",
	pageUri: "/develop?page=panda-combo-box",
	keywords: ["combo-box", "drop down", "list", "choice"],
	description: ["Showcase of a panda-combo-box component."],
	category: PageCategory.DEVELOP,

	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		{ name: "Validation", contextId: ContentSectionName.VALIDATION },
		{ name: "Theming", contextId: ContentSectionName.THEMING },
		{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],
	template: html`<panda-combo-box-content-page></panda-combo-box-content-page>`,
};