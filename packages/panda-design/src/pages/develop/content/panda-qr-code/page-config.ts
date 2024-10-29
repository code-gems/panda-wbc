// types
import { Page, PageCategory, ContentSectionName } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageName: "QR Code",
	pageId: "panda-qr-code",
	pageUri: `/develop?page=panda-qr-code`,

	category: PageCategory.DEVELOP,
	keywords: ["qr-code", "generator"],
	description: ["Showcase of a panda-qr-code component."],
	
	contextMenu: [
		{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
		{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
		{ name: "Usage", contextId: ContentSectionName.USAGE },
		// { name: "Features", contextId: ContentSectionName.FEATURES },
		// { name: "Theming", contextId: ContentSectionName.THEMING },
		// { name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
	],

	template: html`<panda-qr-code-content-page></panda-qr-code-content-page>`,
};
