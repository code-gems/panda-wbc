import {
	Reducer,
	AppState,
	GotoPageAction
} from "panda-design-typings"

export const gotoPage: Reducer<AppState, GotoPageAction> = (state, { pathname, search, searchParams }): AppState => {
	return {
		...state,
		currentPageDetails: {
			pathname,
			search,
			searchParams
		}
	};
};
