// types
import { AppState } from "panda-design-typings";

export const DEFAULT_STORE: AppState = {
	selectedTheme: null,
	currentPageDetails: {
        pathname: "/",
        search: "",
        searchParams: {}	
    }
};