// types
// ...

// utils
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { DEFAULT_STORE } from "./defaults";

// reducers
import reducersAppHeader from "./reducers/root";

// combine all reducers
const app = (state: any, action: any): any => {
	// list all root reducers here
	state = reducersAppHeader(state, action);
	return state;
};

const tryCatchMiddleware = (stateApi: any) => (next: any) => async (action: any) => {
	console.log("%c [appMiddleware] state API", "font-size: 24px; color: green;", stateApi);
	console.log("%c [appMiddleware] action", "font-size: 24px; color: green;", action);
	try {
		const actionResult = next(action);
		if (actionResult instanceof Promise) {
			return await actionResult;
		} else {
			return actionResult;
		}
	} catch (error) {
		console.warn("ERROR", error);
	}
};

// redux dev tools extension
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const appStore = createStore(
	app,
	DEFAULT_STORE,
	composeEnhancers(applyMiddleware(tryCatchMiddleware, thunk))
);

export default appStore;

/**
 * Decorator that helps you to subscribe to a app store. Adds [stateChanged] method to your class
 */
export const reduxify = () => {
	return (target: any): typeof target => {
		return class extends target {
			connectedCallback() {
				this.__safeInvoke(super.connectedCallback);
				// define store change callback
				const onStateChange = () => {
					const state = appStore.getState();
					this.__safeInvoke(super.stateChanged, state);
				}
				// subscribe to app store
				console.log("%c SUBSCRIBE", "font-size: 24px; color: blue;");
				this.__storeUnsubscribe = appStore.subscribe(onStateChange);
				onStateChange();
			}

			disconnectedCallback() {
				console.log("%c UNSUBSCRIBE", "font-size: 24px; color: blue;");
				this.__safeInvoke(this.__storeUnsubscribe);
				this.__safeInvoke(super.disconnectedCallback);
			}

			__safeInvoke(f: any, ...args: any[]) {
				if (f) {
					f.bind(this)(...args);
				}
			}
		}
	}
}