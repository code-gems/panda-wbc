// types
import { PandaThemeMode } from "@panda-wbc/panda-theme";

// import panda system theme
import { vaccasheThemeLight } from "./vaccashe-theme-light";
import { vaccasheThemeDark } from "./vaccashe-theme-dark";
import { lightAccentColors } from "./vaccashe-theme-accent-colors-light";
import { darkAccentColors } from "./vaccashe-theme-accent-colors-dark";
import { customCss } from "./custom-css";

// import theme controller
import { pandaThemeController } from "@panda-wbc/panda-theme/lib/panda-theme-controller";

// register panda system theme
pandaThemeController.registerThemeGroup({
	id: "vaccashe-theme",
	name: "Vaccashe Theme",
	description: "The default Vaccashe Theme with light and dark modes.",
	light: {
		id: "vaccashe-theme-light",
		name: "Light Theme",
		theme: vaccasheThemeLight,
		accentColors: lightAccentColors,
	},
	dark: {
		id: "vaccashe-theme-dark",
		name: "Dark Theme",
		theme: vaccasheThemeDark,
		accentColors: darkAccentColors,
	},
}, true);

// register custom css for the theme light and dark modes
pandaThemeController.registerCustomCss("vaccashe-theme", PandaThemeMode.LIGHT, customCss);
pandaThemeController.registerCustomCss("vaccashe-theme", PandaThemeMode.DARK, customCss);
