// types
import { Store } from "panda-design-typings";
import { PandaThemeMode } from "@panda-wbc/panda-theme";

export const DEFAULT_STORE: Store = {
	devMode: false,
	selectedThemeGroupId: "panda-theme",
	selectedThemeMode: PandaThemeMode.LIGHT,
	selectedAccentColorId: "blue",
	currentPageDetails: {
        pathname: "/",
        search: "",
        searchParams: {}	
    }
};