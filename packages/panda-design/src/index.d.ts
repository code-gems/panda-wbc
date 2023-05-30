declare module "panda-design-typings" {
	import { TemplateResult } from "lit";
	import { Action } from "redux";
	import { SearchParams } from "@panda-wbc/panda-router";

	export const enum PageCategory {
		HOME = "HOME",
		DEVELOP = "DEVELOP",
		THEMES = "THEMES",
		CORE = "CORE",
		ABOUT = "ABOUT",
	}

	export interface ContextMenuItem {
		name: string;
		contextId: string;
	}

	export interface Page {
		pageId: string;
		pageName: string;
		icon?: string;
		pageUri: string;
		parent?: boolean;
		category: string;
		template: TemplateResult;
		keywords?: string[];
		description?: string[];
		contextMenu?: ContextMenuItem[];
		order?:number;

		subpageList?: Page[];
	}

	export interface Store {
		// design your store here
	}

	export interface ThunkDispatch<S, E, A extends Action> {
		(action: A): Action;
		<R, T extends Action>(asyncAction: ThunkAction<R, S, E, T>): R;
	}

	export type ThunkAction<R, S, E, A extends Action> = (
		dispatch: ThunkDispatch<S, E, A>,
		getState: () => S,
		extraArgument: E
	) => R;

	export type ActionCreator<P, A extends Action> = (param: P) => A;

	export type AsyncActionCreator<P, A extends Action> = (param?: P) => ThunkAction<Promise<void> | void, Store, void, A>;

	export type Reducer<S, A extends Action> = (state: S, action: A) => S;

	export interface ReducerList {
		[reducerName: string]: Reducer<AppState, any>;
	}

	export interface AppState {
		selectedTheme: string | null;
		currentPageDetails: {
			pathname: string;
			search: string;
			searchParams: SearchParams;	
		};
	}

	// ================================================================================================================
	// ACTIONS ========================================================================================================
	// ================================================================================================================

	export interface GotoPageAction extends Action {
		pathname: string;
		search: string;
		searchParams: SearchParams;	
	}

	export interface ChangeThemeAction extends Action {
		themeName: string;
	}
}