// types
import { Store } from "panda-design-typings";

export const DEFAULT_STORE: Store = {
	devMode: false,
	selectedTheme: "panda-theme-dark",
	currentPageDetails: {
        pathname: "/",
        search: "",
        searchParams: {}	
    }
};