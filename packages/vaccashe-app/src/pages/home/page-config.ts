// types
import { Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageId: "home",
	pageName: "Home",
	pageUri: "/home",
	icon: "home",
	parent: true,
	category: PageCategory.HOME,
	keywords: ["home", "root", "main"],
	description: [`
		This is the home page of the Vaccashe app. It serves as the main entry point for users to access 
		various features and functionalities of the application. The home page provides an overview of 
		the app's capabilities and allows users to navigate to different sections based on their needs.
	`],
	
	contextMenu: [],
	template: html`<home-page></home-page>`
};
