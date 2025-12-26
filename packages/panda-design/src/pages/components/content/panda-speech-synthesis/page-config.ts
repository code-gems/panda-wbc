// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Speech Synthesis",
	pageId: "panda-speech-synthesis",
	pageUri: `/components?page=panda-speech-synthesis`,

	category: PageCategory.DEVELOP,
	keywords: ["speech synthesis"],
	description: ["Showcase of a panda-speech-synthesis component."],

	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-speech-synthesis-content-page></panda-speech-synthesis-content-page>`,
};
