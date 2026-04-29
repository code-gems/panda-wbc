// types
import { Page, PageCategory } from "panda-design-typings";

// utils
import { html } from "lit";

export const pageConfig: Page = {
	pageId: "contact",
	pageName: "Contact",
	pageUri: "/contact",
	icon: "contact",
	parent: true,
	category: PageCategory.HOME,
	keywords: ["contact", "whatsapp", "email", "message", "call", "location", "visit"],
	description: [`
		The Contact page of the Vaccashe app provides users with various options to get in touch with the restaurant.
		Users can find the restaurant's contact information, including phone number, email address, and physical location.
	`],
	
	contextMenu: [],
	template: html`<contact-page></contact-page>`
};
