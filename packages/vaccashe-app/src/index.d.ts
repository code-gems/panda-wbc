declare module "panda-design-typings" {
	import { TemplateResult } from "lit";
	import { Action } from "redux";
	import { SearchParams } from "@panda-wbc/panda-router";
	import { PandaThemeMode } from "@panda-wbc/panda-theme";

	export const enum PageCategory {
		HOME = "HOME",
		MENU = "MENU",
		ABOUT = "ABOUT",
		CONTACT = "CONTACT",
		// add more categories as needed
	}

	export type ContextMenuItem = {
		name: string;
		contextId: string;
		// Supports hierarchical context menus by allowing items to define nested submenu entries.
		children: ContextMenuItem[];
	}

	export type Page = {
		pageId: string;
		pageName: string;
		pageUri: string;
		description: string[];
		category: PageCategory;
		
		icon?: string;
		parent?: boolean;
		keywords?: string[];
		order?: number;
		createdTimestamp?: number;
		updatedTimestamp?: number;
		
		contextMenu?: ContextMenuItem[];
		template: TemplateResult;
	}

	export type ThunkDispatch<S, E, A extends Action> = {
		(action: A): Action;
		<R, T extends Action>(asyncAction: ThunkAction<R, S, E, T>): R;
	}

	export type ThunkAction<R, S, E, A extends Action> = (
		dispatch: ThunkDispatch<S, E, A>,
		getState: () => S,
		extraArgument: E
	) => R;

	export type ActionCreator<P, A extends Action> = (param: P) => A;

	export type AsyncActionCreator<P, A extends Action> = (param: P) => ThunkAction<Promise<void> | void, Store, void, A>;

	export type Reducer<S, A extends Action> = (state: S, action: A) => S;

	export type ReducerList = {
		[reducerName: string]: Reducer<Store, any>;
	}

	export type Store = {
		showMobileMenu: boolean;
		// theme
		selectedThemeGroupId: string | null;
		selectedThemeMode: PandaThemeMode;
		selectedAccentColorId: string | null;
		// router/navigation
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

	export interface ToggleMobileMenuAction extends Action {
		show: boolean;
	}
}