// types
import { PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig = {
	pageId: "develop",
	pageName: "Develop",
	pageUri: "/develop",
	icon: "code-sample",
	parent: true,
	category: PageCategory.DEVELOP,
	keywords: ["components", "custom", "elements", "documentation", "code", "snippets", "examples"],
	description: ["Develop description"],
	contextMenu: [],
	template: html`<develop-page></develop-page>`,
};