// import panda system theme
import { pandaThemeLight } from "./res/panda-theme-light";
import { pandaThemeDark } from "./res/panda-theme-dark";
import { lightAccentColors } from "./res/panda-theme-light-accent-colors";
import { darkAccentColors } from "./res/panda-theme-dark-accent-colors";

// import theme controller
import { pandaThemeController } from "../panda-theme-controller";

// register panda system theme
pandaThemeController.registerThemeGroup({
	id: "panda-theme",
	name: "Panda Theme",
	description: "The default Panda System Theme with light and dark modes.",
	light: {
		id: "panda-theme-light",
		name: "Light Theme",
		theme: pandaThemeLight,
		accentColors: lightAccentColors,
	},
	dark: {
		id: "panda-theme-dark",
		name: "Dark Theme",
		theme: pandaThemeDark,
		accentColors: darkAccentColors,
	},
});
pandaThemeController.setThemeGroupId("panda-theme");
console.log(`%c ✅ PANDA SYSTEM THEME REGISTERED`, "font-size: 16px; color: limegreen; background: black;");
