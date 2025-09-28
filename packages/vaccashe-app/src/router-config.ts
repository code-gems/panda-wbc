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
	}
});
