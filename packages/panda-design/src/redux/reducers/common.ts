// types
import {
	Reducer,
	AppState,
	GotoPageAction,
	ChangeThemeAction,
} from "panda-design-typings"

export const gotoPage: Reducer<AppState, GotoPageAction> = (state, { pathname, search, searchParams }): AppState => ({
	...state,
	currentPageDetails: {
		pathname,
		search,
		searchParams
	}
});

export const changeTheme: Reducer<AppState, ChangeThemeAction> = (state, { themeName }): AppState => ({
	...state,
	selectedTheme: themeName
});
