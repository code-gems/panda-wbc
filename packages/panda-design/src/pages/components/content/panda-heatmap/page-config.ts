// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Heatmap",
	pageId: "panda-heatmap",
	pageUri: `/components?page=panda-heatmap`,

	category: PageCategory.DEVELOP,
	keywords: ["native", "heatmap", "data visualization", "chart", "graph"],
	description: ["Showcase of a panda-heatmap component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-heatmap-content-page></panda-heatmap-content-page>`,
};
