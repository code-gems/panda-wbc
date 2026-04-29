// types
import { RouterConfig } from "@panda-wbc/panda-router";

/**
 * Router config, page mapping
 */
export const getRouterConfig = (): RouterConfig => ({
	route: {
		"/": {
			template: `<home-page></home-page>`
		},
		"/home": {
			template: `<home-page></home-page>`
		},
		"/docs": {
			template: `<docs-page></docs-page>`
		},
		"/components": {
			template: `<components-page></components-page>`
		},
		"/themes": {
			template: `<themes-page></themes-page>`
		},
		"/core": {
			template: `<core-page></core-page>`
		},
		"/tutorials": {
			template: `<tutorials-page></tutorials-page>`
		},
	}
});
