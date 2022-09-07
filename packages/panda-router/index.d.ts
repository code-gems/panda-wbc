import { TemplateResult } from "lit";

export type SearchParam = {
	name: string;
	value: string | null;
}

export interface PandaRouterNavigateEvent {
	pathname: string;
	search: string;
	searchParams: SearchParam[];
}

export interface RouterConfig {
	route: {
		[patchName: string | number]: TemplateResult;
	};
}