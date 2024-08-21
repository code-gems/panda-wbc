// types
import { PageCategory, ContentSectionName, Page } from "panda-design-typings";

// utils
import { html } from "lit"; 

export const pageConfig: Page = {
	pageId: "panda-text-field",
	pageName: "Text Field",
	pageUri: "/develop?page=panda-text-field",
	category: PageCategory.DEVELOP,
	keywords: ["text", "text box", "text field", "input"],
	description: ["Showcase of a panda-text-field element."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		{ name: "Theming", contextId: ContentSectionName.THEMING },
		{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-text-field-content-page></panda-text-field-content-page>`
};
