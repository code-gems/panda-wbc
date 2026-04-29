// types
import { Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageId: "about",
	pageName: "About",
	pageUri: "/about",
	icon: "info",
	parent: true,
	category: PageCategory.ABOUT,
	keywords: ["about", "info", "mission", "vision"],
	description: [`
		The About page of the Vaccashe app provides users with information about the application, 
		its purpose, and the team behind it.
	`],
	
	contextMenu: [],
	template: html`<about-page></about-page>`
};
