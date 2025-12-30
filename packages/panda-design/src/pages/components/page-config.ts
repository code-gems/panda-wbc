// types
import { PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig = {
	pageId: "components",
	pageName: "Components",
	pageUri: "/components",
	icon: "code-sample",
	parent: true,
	category: PageCategory.DEVELOP,
	keywords: ["components", "custom", "elements", "documentation", "code", "snippets", "examples"],
	description: ["Components page description"],
	contextMenu: [],
	template: html`<develop-page></develop-page>`,
};