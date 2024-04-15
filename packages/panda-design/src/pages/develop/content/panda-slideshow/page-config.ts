// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Slideshow",
	pageId: "panda-slideshow",
	pageUri: `/develop?page=panda-slideshow`,

	category: PageCategory.DEVELOP,
	keywords: ["slideshow", "presentation", "photos", "photo gallery", "slides", "carousel"],
	description: ["Showcase of a panda-slideshow component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-slideshow-content-page></panda-slideshow-content-page>`,
};
