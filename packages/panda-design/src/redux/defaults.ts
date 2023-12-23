// types
import { AppState } from "panda-design-typings";

export const DEFAULT_STORE: AppState = {
	devMode: false,
	selectedTheme: "panda-theme-dark",
	currentPageDetails: {
        pathname: "/",
        search: "",
        searchParams: {}	
    }
};