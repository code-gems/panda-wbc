// types
import { AppState, ReducerList } from "panda-design-typings";
import { Action } from "redux";

// actions
import { ACTION_TYPE } from "../actions/common";

// reducers
import {
	gotoPage,
	changeTheme,
	toggleDevMode,
} from "./common";

const reducerList: ReducerList = {
	[ACTION_TYPE.GOTO_PAGE]: gotoPage,
	[ACTION_TYPE.CHANGE_THEME]: changeTheme,
	[ACTION_TYPE.TOGGLE_DEV_MODE]: toggleDevMode,
};

const reducers = (state: AppState, action: Action<string>): AppState => {
	// check if reducer exists on the list
	if (reducerList[action.type]) {
		// apply reducer
		const newState = reducerList[action.type](state, action);

		return {
			...state,
			...newState,
		};
	}
	return state;
};

export default reducers;