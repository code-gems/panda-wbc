// types
import { PandaThemeAccentColor } from "@panda-wbc/panda-theme";

export const lightAccentColors: PandaThemeAccentColor[] = [
	{
		id: "red",
		name: "Red",
		theme: /*css*/ `
			:root {
				/* PRIMARY COLOR */
				--panda-primary-color: hsl(344deg 100% 64%);
				--panda-primary-text-color: hsl(0deg 0% 100%);

				--panda-primary-color-50: hsl(344deg 100% 84%);
				--panda-primary-color-100: hsl(344deg 100% 74%);
				--panda-primary-color-300: hsl(344deg 100% 69%);
				--panda-primary-color-500: hsl(344deg 100% 64%);
				--panda-primary-color-700: hsl(344deg 100% 39%);
				--panda-primary-color-900: hsl(344deg 100% 34%);

				--panda-primary-color-0opc: hsl(344deg 100% 64% / 0%);
				--panda-primary-color-10opc: hsl(344deg 100% 64% / 10%);
				--panda-primary-color-20opc: hsl(344deg 100% 64% / 20%);
				--panda-primary-color-30opc: hsl(344deg 100% 64% / 30%);
				--panda-primary-color-40opc: hsl(344deg 100% 64% / 40%);
				--panda-primary-color-50opc: hsl(344deg 100% 64% / 50%);
				--panda-primary-color-60opc: hsl(344deg 100% 64% / 60%);
				--panda-primary-color-70opc: hsl(344deg 100% 64% / 70%);
				--panda-primary-color-80opc: hsl(344deg 100% 64% / 80%);
				--panda-primary-color-90opc: hsl(344deg 100% 64% / 90%);

				/* SECONDARY */
				--panda-secondary-color: hsl(266deg 55% 47%);
				--panda-secondary-text-color: hsl(0deg 0% 100%);

				--panda-secondary-color-50: hsl(266deg 55% 67%);
				--panda-secondary-color-100: hsl(266deg 55% 57%);
				--panda-secondary-color-300: hsl(266deg 55% 52%);
				--panda-secondary-color-500: hsl(266deg 55% 47%);
				--panda-secondary-color-700: hsl(266deg 55% 42%);
				--panda-secondary-color-900: hsl(266deg 55% 37%);

				--panda-secondary-color-0opc: hsl(266deg 55% 47% / 0%);
				--panda-secondary-color-10opc: hsl(266deg 55% 47% / 10%);
				--panda-secondary-color-20opc: hsl(266deg 55% 47% / 20%);
				--panda-secondary-color-30opc: hsl(266deg 55% 47% / 30%);
				--panda-secondary-color-40opc: hsl(266deg 55% 47% / 40%);
				--panda-secondary-color-50opc: hsl(266deg 55% 47% / 50%);
				--panda-secondary-color-60opc: hsl(266deg 55% 47% / 60%);
				--panda-secondary-color-70opc: hsl(266deg 55% 47% / 70%);
				--panda-secondary-color-80opc: hsl(266deg 55% 47% / 80%);
				--panda-secondary-color-90opc: hsl(266deg 55% 47% / 90%);

				/* TERTIARY */
				--panda-tertiary-color: hsl(274deg 53% 30%);
				--panda-tertiary-text-color: hsl(0deg 0% 100%);

				--panda-tertiary-color-50: hsl(274deg 53% 40%);
				--panda-tertiary-color-100: hsl(274deg 53% 30%);
				--panda-tertiary-color-300: hsl(274deg 53% 25%);
				--panda-tertiary-color-500: hsl(274deg 53% 20%);
				--panda-tertiary-color-700: hsl(274deg 53% 15%);
				--panda-tertiary-color-900: hsl(274deg 53% 10%);

				--panda-tertiary-color-0opc: hsl(274deg 53% 30% / 0%);
				--panda-tertiary-color-10opc: hsl(274deg 53% 30% / 10%);
				--panda-tertiary-color-20opc: hsl(274deg 53% 30% / 20%);
				--panda-tertiary-color-30opc: hsl(274deg 53% 30% / 30%);
				--panda-tertiary-color-40opc: hsl(274deg 53% 30% / 40%);
				--panda-tertiary-color-50opc: hsl(274deg 53% 30% / 50%);
				--panda-tertiary-color-60opc: hsl(274deg 53% 30% / 60%);
				--panda-tertiary-color-70opc: hsl(274deg 53% 30% / 70%);
				--panda-tertiary-color-80opc: hsl(274deg 53% 30% / 80%);
				--panda-tertiary-color-90opc: hsl(274deg 53% 30% / 90%);
			}
		`,
	},
];