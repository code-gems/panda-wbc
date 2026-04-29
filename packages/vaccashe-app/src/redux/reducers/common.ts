// types
import {
	Reducer,
	Store,
	GotoPageAction,
	ChangeThemeAction,
	ToggleMobileMenuAction,
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
	// selectedTheme: themeName
});

export const toggleMobileMenu: Reducer<Store, ToggleMobileMenuAction> = (state, { show }): Store => ({
	...state,
	showMobileMenu: show
});
