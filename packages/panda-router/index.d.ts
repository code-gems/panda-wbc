export type SearchParams = {
	[paramName: string]: unknown;
}

export type PandaRouterNavigateEventDetail = {
	pathname: string;
	search: string;
	searchParams: SearchParams;
}

export type PageDetails = {
	title?: (params: { pathname: string, search: string, searchParams: SearchParams }) => string;
	template: string;
}

export type RouterConfig = {
	defaultPageTitle?: string;
	route: {
		[patchName: string | number]: PageDetails;
	};
}

export interface PandaRouterNavigateEvent extends CustomEvent<PandaRouterNavigateEventDetail> {}