// types
import {
	Reducer,
	Store,
	GotoPageAction,
	ChangeThemeAction,
	ToggleDevModeAction,
} from "panda-design-typings"

export const gotoPage: Reducer<Store, GotoPageAction> = (state, { pathname, search, searchParams }): Store => ({
	...state,
	currentPageDetails: {
		pathname,
		search,
		searchParams
	}
});

export const changeTheme: Reducer<Store, ChangeThemeAction> = (state, { themeName }): Store => ({
	...state,
	selectedTheme: themeName
});

export const toggleDevMode: Reducer<Store, ToggleDevModeAction> = (state, { devMode }): Store => ({
	...state,
	devMode
});
