// types
import { RouterConfig } from "@panda-wbc/panda-router";

// utils
import { html } from "lit";

/**
 * Router config, page mapping
 */
export const getRouterConfig = (): RouterConfig => ({
	route: {
		404: html`(CUSTOM) #404 - Page not found`,
		"/": html`<home-page></home-page>`,
		"/home": html`<home-page></home-page>`,
		"/get-started": html`<get-started-page></get-started-page>`,
		"/develop": html`<develop-page></develop-page>`,
		"/themes": html`<themes-page></themes-page>`,
		"/core": html`<core-page></core-page>`,
		"/tutorials": html`<tutorials-page></tutorials-page>`,
	}
});
