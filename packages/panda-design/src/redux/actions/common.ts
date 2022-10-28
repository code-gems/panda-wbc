// types
import { ActionCreator, GotoPageAction } from "panda-design-typings";
import { SearchParams } from "@panda-wbc/panda-router";

// const
export const ACTION_TYPE = {
	GOTO_PAGE: "APP::GOTO_PAGE",
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
