// types
import { PageCategory, ContentSectionName, Page } from "panda-design-typings";

// utils
import { html } from "lit"; 

export const pageConfig: Page = {
	pageId: "panda-password-field",
	pageName: "Password Field",
	pageUri: "/components?page=panda-password-field",
	category: PageCategory.DEVELOP,
	keywords: ["password", "secret"],
	description: ["Showcase of a panda-password-field element."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		{ name: "Theming", contextId: ContentSectionName.THEMING },
		{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-password-field-content-page></panda-password-field-content-page>`
};
