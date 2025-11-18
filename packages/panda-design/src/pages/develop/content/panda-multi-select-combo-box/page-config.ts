// types
import { PageCategory, ContentSectionName, Page } from "panda-design-typings";

// utils
import { html } from "lit"; 

export const pageConfig: Page = {
	pageId: "panda-multi-select-combo-box",
	pageName: "Multi-Select Combo Box",
	pageUri: "/develop?page=panda-multi-select-combo-box",
	category: PageCategory.DEVELOP,
	keywords: ["input", "multiple choice", "combo box", "form", "interface", "multiselect", "multi-select"],
	description: ["Showcase of a panda-multi-select-combo-box element. Multi choice combo box."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
	],

	template: html`<panda-multi-select-combo-box-content-page></panda-multi-select-combo-box-content-page>`
}