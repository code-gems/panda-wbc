// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

export const enum LocalContentSectionName {
	FEATURES_FORMAT = "features-format",
	FEATURES_TIME_FORMAT = "features-time-format",

}

// utils
import { html } from "lit";

export const pageConfig: Page = {
	version: "1.0.0",
	pageName: "Time Picker",
	pageId: "panda-time-picker",
	pageUri: `/components?page=panda-time-picker`,

	category: PageCategory.DEVELOP,
	keywords: ["time picker", "clock", "time input", "time selection", "time component"],
	description: ["Showcase of a panda-time-picker component."],
	createdTimestamp: 1777637277628,
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{
			name: "Usage",
			contextId: ContentSectionName.USAGE,
			children: [
				{ name: "Properties", contextId: ContentSectionName.PROPERTIES },
				{ name: "Events", contextId: ContentSectionName.EVENTS },
			],
		},
		{
			name: "Features",
			contextId: ContentSectionName.FEATURES,
			children: [
				{ name: "Format", contextId: LocalContentSectionName.FEATURES_FORMAT },
				{ name: "Time Format", contextId: LocalContentSectionName.FEATURES_TIME_FORMAT },
			],
		},
		{ name: "Theming", contextId: ContentSectionName.THEMING },
	],

	template: html`<panda-time-picker-content-page></panda-time-picker-content-page>`,
};
