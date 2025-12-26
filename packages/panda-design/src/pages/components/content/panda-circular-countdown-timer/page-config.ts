// types
import { ContentSectionName, Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "Circular Countdown Timer",
	pageId: "panda-circular-countdown-timer",
	pageUri: "/components?page=panda-circular-countdown-timer",
	category: PageCategory.DEVELOP,
	keywords: ["circular", "countdown", "timer"],
	description: ["Showcase of a panda-circular-countdown-timer element."],
	
	contextMenu: [		
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
		{ name: "Features", contextId: ContentSectionName.FEATURES },
		{ name: "Theming", contextId: ContentSectionName.THEMING },
		{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-circular-countdown-timer-content-page></panda-circular-countdown-timer-content-page>`,
};
