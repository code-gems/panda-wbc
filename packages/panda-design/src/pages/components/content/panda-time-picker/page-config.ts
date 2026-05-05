// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

export const enum LocalContentSectionName {
	FEATURES_LABEL = "features-label",
	FEATURES_HELP_TEXT = "features-help-text",
	FEATURES_ERROR_MESSAGE = "features-error-message",
	FEATURES_FORMAT = "features-format",
	FEATURES_TIME_FORMAT = "features-time-format",
	FEATURES_VIEWS = "features-views",
	FEATURES_SPINNER_TYPE = "features-spinner-type",
	FEATURES_INTERNATIONALIZATION = "features-internationalization",
	FEATURES_MANDATORY = "features-mandatory",
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
		{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
		{
			name: "Features",
			contextId: ContentSectionName.FEATURES,
			children: [
				{ name: "Label", contextId: LocalContentSectionName.FEATURES_LABEL },
				{ name: "Help Text", contextId: LocalContentSectionName.FEATURES_HELP_TEXT },
				{ name: "Error Message", contextId: LocalContentSectionName.FEATURES_ERROR_MESSAGE },
				{ name: "Format", contextId: LocalContentSectionName.FEATURES_FORMAT },
				{ name: "Time Format", contextId: LocalContentSectionName.FEATURES_TIME_FORMAT },
				{ name: "Views", contextId: LocalContentSectionName.FEATURES_VIEWS },
				{ name: "Spinner Type", contextId: LocalContentSectionName.FEATURES_SPINNER_TYPE },
				{ name: "Internationalization", contextId: LocalContentSectionName.FEATURES_INTERNATIONALIZATION },
			],
		},
		{ name: "Theming", contextId: ContentSectionName.THEMING },
	],

	template: html`<panda-time-picker-content-page></panda-time-picker-content-page>`,
};
