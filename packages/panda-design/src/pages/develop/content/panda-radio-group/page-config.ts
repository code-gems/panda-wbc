// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Radio Button",
	pageId: "panda-radio-button",
	pageUri: `/develop?page=panda-radio-button`,

	category: PageCategory.DEVELOP,
	keywords: ["radio button", "radio", "options", "choice"],
	description: ["Showcase of a panda-radio-button component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		{ name: "Theming", contextId: ContentSectionName.THEMING },
		{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-radio-button-content-page></panda-radio-button-content-page>`,
};
