// types
import { Store } from "panda-design-typings";
import { PandaThemeMode } from "@panda-wbc/panda-theme";

export const getDefaultStore = (): Store => ({
	showMobileMenu: false,
	selectedThemeGroupId: "vaccashe-theme",
	selectedThemeMode: PandaThemeMode.LIGHT,
	selectedAccentColorId: "orange",
	currentPageDetails: {
        pathname: "/",
        search: "",
        searchParams: {}	
    }
});