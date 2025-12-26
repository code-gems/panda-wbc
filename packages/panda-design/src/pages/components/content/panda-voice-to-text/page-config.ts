// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Voice to Text",
	pageId: "panda-voice-to-text",
	pageUri: `/components?page=panda-voice-to-text`,

	category: PageCategory.DEVELOP,
	keywords: ["voice-to-text", "audio", "voice recognition", "microphone", "voice to text"],
	description: ["Showcase of a panda-voice-to-text component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		// { name: "Installation", contextId: ContentSectionName.INSTALLATION },
		// { name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-voice-to-text-content-page></panda-voice-to-text-content-page>`,
};
