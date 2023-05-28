// types
import {
	ActionCreator,
	ChangeThemeAction,
	GotoPageAction,
} from "panda-design-typings";
import { SearchParams } from "@panda-wbc/panda-router";

// const
export const ACTION_TYPE = {
	GOTO_PAGE: "APP::GOTO_PAGE",
	CHANGE_THEME: "APP::CHANGE_THEME",
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

export const changeTheme: ActionCreator<{
	themeName: string;
}, ChangeThemeAction> = ({ themeName }) => ({
	type: ACTION_TYPE.CHANGE_THEME,
	themeName
});
