// types
import { PageCategory, ContentSectionName, Page } from "panda-design-typings";

export const enum LocalPageSectionName {
	FEATURES_SHOW_FILTER = "features-filter",
	FEATURES_CLEAR_BUTTON = "features-clear-button",
	FEATURES_MULTISELECT = "features-multiselect",
	FEATURES_ITEM_COUNT = "features-item-count",
	FEATURES_AUTO_EXPAND = "features-auto-expand",

	FEATURES_MANDATORY = "features-mandatory",
}

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
		{
			name: "Features",
			contextId: ContentSectionName.FEATURES,
			children: [
				{ name: "Overview", contextId: LocalPageSectionName.FEATURES_CLEAR_BUTTON },
			]
		},
	],

	template: html`<panda-multi-select-combo-box-content-page></panda-multi-select-combo-box-content-page>`
}