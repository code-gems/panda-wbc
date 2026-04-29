// types
import {
	ActionCreator,
	AsyncActionCreator,
	ChangeThemeAction,
	GotoPageAction,
	ToggleMobileMenuAction,
} from "panda-design-typings";
import { SearchParams } from "@panda-wbc/panda-router";

// const
export const ACTION_TYPE = {
	GOTO_PAGE: "APP::GOTO_PAGE",
	CHANGE_THEME: "APP::CHANGE_THEME",
	TOGGLE_MOBILE_MENU: "APP::TOGGLE_MOBILE_MENU",
};

export const gotoPage: ActionCreator<{
	pathname: string;
	search: string;
	searchParams: SearchParams;
}, GotoPageAction> = ({ pathname, search, searchParams }) => ({
	type: ACTION_TYPE.GOTO_PAGE,
	pathname,
	search,
	searchParams
});

export const changeTheme: AsyncActionCreator<{
	themeName: string;
}, ChangeThemeAction> = ({ themeName }) => (dispatch) => {
	// store selected theme
	localStorage.setItem("theme", themeName);
	
	dispatch({
		type: ACTION_TYPE.CHANGE_THEME,
		themeName
	});
}

export const toggleMobileMenu: ActionCreator<{ show: boolean; }, ToggleMobileMenuAction> = ({ show }) => ({
	type: ACTION_TYPE.TOGGLE_MOBILE_MENU,
	show
});
