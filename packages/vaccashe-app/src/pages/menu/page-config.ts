// types
import { Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageId: "menu",
	pageName: "Menu",
	pageUri: "/menu",
	icon: "menu",
	parent: true,
	category: PageCategory.MENU,
	keywords: ["menu", "food", "drinks", "dishes", "keto", "vegetarian", "vegan", "carnivore"],
	description: [`
		The Menu page of the Vaccashe app provides users with a comprehensive list of food and drink options available at the restaurant.
		Users can browse through different categories such as appetizers, main courses, desserts, and beverages. 
		Each menu item includes a description, price, and an image to help users make informed choices about their orders.
	`],
	
	contextMenu: [],
	template: html`<menu-page></menu-page>`
};
