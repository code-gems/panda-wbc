// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Pips Pager",
	pageId: "panda-pips-pager",
	pageUri: `/develop?page=panda-pips-pager`,

	category: PageCategory.DEVELOP,
	keywords: ["pagination", "pips", "pager", "slideshow"],
	description: ["Showcase of a panda-pips-pager component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-pips-pager-content-page></panda-pips-pager-content-page>`,
};
