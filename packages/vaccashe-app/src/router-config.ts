// types
import { RouterConfig } from "@panda-wbc/panda-router";

/**
 * Router config, page mapping
 */
export const getRouterConfig = (): RouterConfig => ({
	route: {
		404: {
			template: `(CUSTOM) #404 - Page not found`,
		},
		"/": {
			title: () => `Healthy Food Canggu | High Protein Meals Bali | No Seed Oil Cafe | Vaccashe Superfood`,
			template: `<home-page></home-page>`,
		},
		"/home": {
			title: () => `Healthy Food Canggu | High Protein Meals Bali | No Seed Oil Cafe | Vaccashe Superfood`,
			template: `<home-page></home-page>`,
		},
		"/about": {
			title: () => `About Us | Vaccashe Superfood`,
			template: `<about-page></about-page>`,
		},
		"/menu": {
			title: () => `Menu | Vaccashe Superfood`,
			template: `<menu-page></menu-page>`,
		},
		"/contact": {
			title: () => `Contact Us | Vaccashe Superfood`,
			template: `<contact-page></contact-page>`,
		}
	}
});
