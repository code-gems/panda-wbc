// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";


export const pageConfig: Page = {
	pageId: "panda-checkbox",
	pageName: "Checkbox",
	pageUri: "/develop?page=panda-checkbox",
	category: PageCategory.DEVELOP,
	keywords: ["checkbox", "tick", "options"],
	description: ["Showcase of a panda-checkbox component that allows the user to make a binary choice."],

	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		{ name: "Theming", contextId: ContentSectionName.THEMING },
		{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-checkbox-content-page></panda-checkbox-content-page>`,
};
