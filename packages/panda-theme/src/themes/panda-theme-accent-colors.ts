// types
import { PandaThemeAccentColor } from "../../index";

export const pandaAccentColors: PandaThemeAccentColor[] = [
	{
		id: "panda-theme-accent-blue",
		name: "Blue",
		theme: /*css*/ `
			:root {
				/* PRIMARY COLOR */
				--panda-primary-color: hsl(209deg 78% 46%);
				--panda-primary-text-color: hsl(0deg 0% 100%);
	
				--panda-primary-color-50: hsl(209deg 78% 76%);
				--panda-primary-color-100: hsl(209deg 78% 56%);
				--panda-primary-color-300: hsl(209deg 78% 51%);
				--panda-primary-color-500: hsl(209deg 78% 46%);
				--panda-primary-color-700: hsl(209deg 78% 41%);
				--panda-primary-color-900: hsl(209deg 78% 36%);
	
				--panda-primary-color-0opc: hsl(209deg 78% 46% / 0%);
				--panda-primary-color-10opc: hsl(209deg 78% 46% / 10%);
				--panda-primary-color-20opc: hsl(209deg 78% 46% / 20%);
				--panda-primary-color-30opc: hsl(209deg 78% 46% / 30%);
				--panda-primary-color-40opc: hsl(209deg 78% 46% / 40%);
				--panda-primary-color-50opc: hsl(209deg 78% 46% / 50%);
				--panda-primary-color-60opc: hsl(209deg 78% 46% / 60%);
				--panda-primary-color-70opc: hsl(209deg 78% 46% / 70%);
				--panda-primary-color-80opc: hsl(209deg 78% 46% / 80%);
				--panda-primary-color-90opc: hsl(209deg 78% 46% / 90%);
	
				/* SECONDARY */
				--panda-secondary-color: hsl(160deg 81% 43%);
				--panda-secondary-text-color: hsl(0deg 0% 100%);
	
				--panda-secondary-color-50: hsl(160deg 81% 63%);
				--panda-secondary-color-100: hsl(160deg 81% 53%);
				--panda-secondary-color-300: hsl(160deg 81% 48%);
				--panda-secondary-color-500: hsl(160deg 81% 43%);
				--panda-secondary-color-700: hsl(160deg 81% 38%);
				--panda-secondary-color-900: hsl(160deg 81% 33%);
	
				--panda-secondary-color-0opc: hsl(160deg 81% 43% / 0%);
				--panda-secondary-color-10opc: hsl(160deg 81% 43% / 10%);
				--panda-secondary-color-20opc: hsl(160deg 81% 43% / 20%);
				--panda-secondary-color-30opc: hsl(160deg 81% 43% / 30%);
				--panda-secondary-color-40opc: hsl(160deg 81% 43% / 40%);
				--panda-secondary-color-50opc: hsl(160deg 81% 43% / 50%);
				--panda-secondary-color-60opc: hsl(160deg 81% 43% / 60%);
				--panda-secondary-color-70opc: hsl(160deg 81% 43% / 70%);
				--panda-secondary-color-80opc: hsl(160deg 81% 43% / 80%);
				--panda-secondary-color-90opc: hsl(160deg 81% 43% / 90%);
			}
		`,
	},
	{
		id: "panda-theme-accent-green",
		name: "Green",
		theme: /*css*/ `
			:root {
				/* PRIMARY COLOR */
				--panda-primary-color: hsl(122deg 39% 49%);
				--panda-primary-text-color: hsl(0deg 0% 100%);
	
				--panda-primary-color-50: hsl(122deg 39% 69%);
				--panda-primary-color-100: hsl(122deg 39% 59%);
				--panda-primary-color-300: hsl(122deg 39% 54%);
				--panda-primary-color-500: hsl(122deg 39% 49%);
				--panda-primary-color-700: hsl(122deg 39% 44%);
				--panda-primary-color-900: hsl(122deg 39% 39%);
	
				--panda-primary-color-0opc: hsl(122deg 39% 49% / 0%);
				--panda-primary-color-10opc: hsl(122deg 39% 49% / 10%);
				--panda-primary-color-20opc: hsl(122deg 39% 49% / 20%);
				--panda-primary-color-30opc: hsl(122deg 39% 49% / 30%);
				--panda-primary-color-40opc: hsl(122deg 39% 49% / 40%);
				--panda-primary-color-50opc: hsl(122deg 39% 49% / 50%);
				--panda-primary-color-60opc: hsl(122deg 39% 49% / 60%);
				--panda-primary-color-70opc: hsl(122deg 39% 49% / 70%);
				--panda-primary-color-80opc: hsl(122deg 39% 49% / 80%);
				--panda-primary-color-90opc: hsl(122deg 39% 49% / 90%);

				/* SECONDARY */
				--panda-secondary-color: hsl(174deg 100% 29%);
				--panda-secondary-text-color: hsl(0deg 0% 100%);
	
				--panda-secondary-color-50: hsl(174deg 100% 49%);
				--panda-secondary-color-100: hsl(174deg 100% 39%);
				--panda-secondary-color-300: hsl(174deg 100% 34%);
				--panda-secondary-color-500: hsl(174deg 100% 29%);
				--panda-secondary-color-700: hsl(174deg 100% 25%);
				--panda-secondary-color-900: hsl(174deg 100% 21%);
	
				--panda-secondary-color-0opc: hsl(174deg 100% 29% / 0%);
				--panda-secondary-color-10opc: hsl(174deg 100% 29% / 10%);
				--panda-secondary-color-20opc: hsl(174deg 100% 29% / 20%);
				--panda-secondary-color-30opc: hsl(174deg 100% 29% / 30%);
				--panda-secondary-color-40opc: hsl(174deg 100% 29% / 40%);
				--panda-secondary-color-50opc: hsl(174deg 100% 29% / 50%);
				--panda-secondary-color-60opc: hsl(174deg 100% 29% / 60%);
				--panda-secondary-color-70opc: hsl(174deg 100% 29% / 70%);
				--panda-secondary-color-80opc: hsl(174deg 100% 29% / 80%);
				--panda-secondary-color-90opc: hsl(174deg 100% 29% / 90%);
			}
		`,
	}
];