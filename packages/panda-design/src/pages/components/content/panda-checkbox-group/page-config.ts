// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";


export const pageConfig: Page = {
	pageId: "panda-checkbox-group",
	pageName: "Checkbox Group",
	pageUri: "/components?page=panda-checkbox-group",
	category: PageCategory.DEVELOP,
	keywords: ["checkbox group", "tick", "options"],
	description: ["Showcase of a panda-checkbox-group component that allows the user to make a binary choice."],
	native: true,

	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		{ name: "Theming", contextId: ContentSectionName.THEMING },
		{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-checkbox-group-content-page></panda-checkbox-group-content-page>`,
};
