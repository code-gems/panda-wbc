// types
import {
	Reducer,
	AppState,
	GotoPageAction,
	ChangeThemeAction,
	ToggleDevModeAction,
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

export const toggleDevMode: Reducer<AppState, ToggleDevModeAction> = (state, { devMode }): AppState => ({
	...state,
	devMode
});
