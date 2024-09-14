// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageId: "panda-flag",
	pageName: "Flag",
	pageUri: "/develop?page=panda-flag",
	category: PageCategory.DEVELOP,
	keywords: ["flags", "country"],
	description: ["Flag description"],
	
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

	template: html`<panda-flag-content-page></panda-flag-content-page>`
}
