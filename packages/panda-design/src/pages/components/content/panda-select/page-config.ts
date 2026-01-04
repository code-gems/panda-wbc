// types
import { PageCategory, ContentSectionName, Page } from "panda-design-typings";

export const enum LocalPageSectionName {
	FEATURES = "features",
	FEATURES_SHOW_FILTER = "features-filter",
	FEATURES_CLEAR_BUTTON = "features-clear-button",
	FEATURES_MULTISELECT = "features-multiselect",
	FEATURES_ITEM_COUNT = "features-item-count",
	FEATURES_AUTO_EXPAND = "features-auto-expand",

	FEATURES_MANDATORY = "features-mandatory",
}

// design tokens
import { designTokens } from "./design-tokens";

// utils
import { html } from "lit"; 

export const pageConfig: Page = {
	pageId: "panda-select",
	pageName: "Select",
	pageUri: "/components?page=panda-select",
	category: PageCategory.DEVELOP,
	keywords: ["input", "multiple choice", "combo box", "form", "interface", "multiselect", "multi-select"],
	description: ["Showcase of a panda-select element. Select input."],
	
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

	designTokens,

	template: html`<panda-select-content-page></panda-select-content-page>`
}