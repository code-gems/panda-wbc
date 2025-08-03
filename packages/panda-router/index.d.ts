import { TemplateResult } from "lit";

export type SearchParams = {
	[paramName: string]: any;
}

export interface PandaRouterNavigateEventDetail {
	pathname: string;
	search: string;
	searchParams: SearchParam;
}

export interface RouterConfig {
	route: {
		[patchName: string | number]: TemplateResult;
	};
}

export interface PandaRouterNavigateEvent extends CustomEvent<PandaRouterNavigateEventDetail> {}