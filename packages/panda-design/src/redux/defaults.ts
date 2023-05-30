// types
import { AppState } from "panda-design-typings";

export const DEFAULT_STORE: AppState = {
	selectedTheme: "panda-theme-light",
	currentPageDetails: {
        pathname: "/",
        search: "",
        searchParams: {}	
    }
};