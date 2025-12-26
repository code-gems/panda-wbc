// types
import { Page, ContentSectionName, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageId: "panda-date-picker",
	pageName: "Date Picker",
	pageUri: "/components?page=panda-date-picker",
	keywords: ["date", "picker", "month", "calendar", "component", "form", "time", "date range"],
	description: ["Date Picker description"],
	category: PageCategory.DEVELOP,

	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
	],

	template: html`<panda-date-picker-content-page></panda-date-picker-content-page>`,
};
