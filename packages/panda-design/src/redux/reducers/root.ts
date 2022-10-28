// types
import { AppState, ReducerList } from "panda-design-typings";
import { Action } from "redux";

// actions
import { ACTION_TYPE } from "../actions/common";

// reducers
import { gotoPage } from "./common";

const reducerList: ReducerList = {
	[ACTION_TYPE.GOTO_PAGE]: gotoPage,
};

const reducers = (state: AppState, action: Action<string>): AppState => {
	console.log("%c ROOT", "font-size: 24px; color: green;", action);

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