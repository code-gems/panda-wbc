// types
import { PandaThemeAccentColor } from "@panda-wbc/panda-theme";

export const lightAccentColors: PandaThemeAccentColor[] = [
	{
		id: "orange",
		name: "Orange",
		theme: /*css*/ `
			:root {
				/* PRIMARY COLOR */
				--panda-primary-color: hsl(24deg 100% 50%);
				--panda-primary-text-color: hsl(0deg 0% 100%);
	
				--panda-primary-color-50: hsl(24deg 100% 70%);
				--panda-primary-color-100: hsl(24deg 100% 60%);
				--panda-primary-color-300: hsl(24deg 100% 55%);
				--panda-primary-color-500: hsl(24deg 100% 50%);
				--panda-primary-color-700: hsl(24deg 100% 45%);
				--panda-primary-color-900: hsl(24deg 100% 40%);
	
				--panda-primary-color-0opc: hsl(24deg 100% 50% / 0%);
				--panda-primary-color-10opc: hsl(24deg 100% 50% / 10%);
				--panda-primary-color-20opc: hsl(24deg 100% 50% / 20%);
				--panda-primary-color-30opc: hsl(24deg 100% 50% / 30%);
				--panda-primary-color-40opc: hsl(24deg 100% 50% / 40%);
				--panda-primary-color-50opc: hsl(24deg 100% 50% / 50%);
				--panda-primary-color-60opc: hsl(24deg 100% 50% / 60%);
				--panda-primary-color-70opc: hsl(24deg 100% 50% / 70%);
				--panda-primary-color-80opc: hsl(24deg 100% 50% / 80%);
				--panda-primary-color-90opc: hsl(24deg 100% 50% / 90%);
	
				/* SECONDARY */
				--panda-secondary-color: hsl(20deg 100% 49%);
				--panda-secondary-text-color: hsl(0deg 0% 100%);
	
				--panda-secondary-color-50: hsl(20deg 100% 69%);
				--panda-secondary-color-100: hsl(20deg 100% 59%);
				--panda-secondary-color-300: hsl(20deg 100% 54%);
				--panda-secondary-color-500: hsl(20deg 100% 49%);
				--panda-secondary-color-700: hsl(20deg 100% 44%);
				--panda-secondary-color-900: hsl(20deg 100% 39%);
	
				--panda-secondary-color-0opc: hsl(20deg 100% 49% / 0%);
				--panda-secondary-color-10opc: hsl(20deg 100% 49% / 10%);
				--panda-secondary-color-20opc: hsl(20deg 100% 49% / 20%);
				--panda-secondary-color-30opc: hsl(20deg 100% 49% / 30%);
				--panda-secondary-color-40opc: hsl(20deg 100% 49% / 40%);
				--panda-secondary-color-50opc: hsl(20deg 100% 49% / 50%);
				--panda-secondary-color-60opc: hsl(20deg 100% 49% / 60%);
				--panda-secondary-color-70opc: hsl(20deg 100% 49% / 70%);
				--panda-secondary-color-80opc: hsl(20deg 100% 49% / 80%);
				--panda-secondary-color-90opc: hsl(20deg 100% 49% / 90%);

				/* TERTIARY */
				--panda-tertiary-color: hsl(26deg 23% 7%);
				--panda-tertiary-text-color: hsl(36deg 6% 68%);

				--panda-tertiary-color-50: hsl(26deg 23% 15%);
				--panda-tertiary-color-100: hsl(26deg 23% 12%);
				--panda-tertiary-color-300: hsl(26deg 23% 10%);
				--panda-tertiary-color-500: hsl(26deg 23% 7%);
				--panda-tertiary-color-700: hsl(26deg 23% 5%);
				--panda-tertiary-color-900: hsl(26deg 23% 3%);

				--panda-tertiary-color-0opc: hsl(26deg 23% 7% / 0%);
				--panda-tertiary-color-10opc: hsl(26deg 23% 7% / 10%);
				--panda-tertiary-color-20opc: hsl(26deg 23% 7% / 20%);
				--panda-tertiary-color-30opc: hsl(26deg 23% 7% / 30%);
				--panda-tertiary-color-40opc: hsl(26deg 23% 7% / 40%);
				--panda-tertiary-color-50opc: hsl(26deg 23% 7% / 50%);
				--panda-tertiary-color-60opc: hsl(26deg 23% 7% / 60%);
				--panda-tertiary-color-70opc: hsl(26deg 23% 7% / 70%);
				--panda-tertiary-color-80opc: hsl(26deg 23% 7% / 80%);
				--panda-tertiary-color-90opc: hsl(26deg 23% 7% / 90%);
			}
		`,
	},
];