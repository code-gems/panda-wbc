import { css } from "lit";

export const pandaThemeDark = css`
	:root {
		/* DARK THEME */
		/* ========================================================================================================= */
		/* BASE COLORS ============================================================================================= */
		/* ========================================================================================================= */

		/* BLACK COLOR */
		--panda-black-color: hsl(0deg 0% 0%);

		--panda-black-color-0opc: hsl(0deg 0% 0% / 0%);
		--panda-black-color-10opc: hsl(0deg 0% 0% / 10%);
		--panda-black-color-20opc: hsl(0deg 0% 0% / 20%);
		--panda-black-color-30opc: hsl(0deg 0% 0% / 30%);
		--panda-black-color-40opc: hsl(0deg 0% 0% / 40%);
		--panda-black-color-50opc: hsl(0deg 0% 0% / 50%);
		--panda-black-color-60opc: hsl(0deg 0% 0% / 60%);
		--panda-black-color-70opc: hsl(0deg 0% 0% / 70%);
		--panda-black-color-80opc: hsl(0deg 0% 0% / 80%);
		--panda-black-color-90opc: hsl(0deg 0% 0% / 90%);

		/* WHITE COLOR */
		--panda-white-color: hsl(0deg 0% 100%);

		--panda-white-color-0opc: hsl(0deg 0% 100% / 0%);
		--panda-white-color-10opc: hsl(0deg 0% 100% / 10%);
		--panda-white-color-20opc: hsl(0deg 0% 100% / 20%);
		--panda-white-color-30opc: hsl(0deg 0% 100% / 30%);
		--panda-white-color-40opc: hsl(0deg 0% 100% / 40%);
		--panda-white-color-50opc: hsl(0deg 0% 100% / 50%);
		--panda-white-color-60opc: hsl(0deg 0% 100% / 60%);
		--panda-white-color-70opc: hsl(0deg 0% 100% / 70%);
		--panda-white-color-80opc: hsl(0deg 0% 100% / 80%);
		--panda-white-color-90opc: hsl(0deg 0% 100% / 90%);
		
		/* ========================================================================================================= */
		/* ACTION COLORS =========================================================================================== */
		/* ========================================================================================================= */
		
		/* DONE COLOR */
		--panda-action-color-done: hsl(164deg 67% 45%);
		--panda-action-text-color-done: hsl(0deg 0% 100%);

		--panda-action-color-done-50: hsl(164deg 67% 75%);
		--panda-action-color-done-100: hsl(164deg 67% 55%);
		--panda-action-color-done-300: hsl(164deg 67% 50%);
		--panda-action-color-done-500: hsl(164deg 67% 45%);
		--panda-action-color-done-700: hsl(164deg 67% 40%);
		--panda-action-color-done-900: hsl(164deg 67% 35%);

		--panda-action-color-done-0opc: hsl(164deg 67% 45% / 0%);
		--panda-action-color-done-10opc: hsl(164deg 67% 45% / 10%);
		--panda-action-color-done-20opc: hsl(164deg 67% 45% / 20%);
		--panda-action-color-done-30opc: hsl(164deg 67% 45% / 30%);
		--panda-action-color-done-40opc: hsl(164deg 67% 45% / 40%);
		--panda-action-color-done-50opc: hsl(164deg 67% 45% / 50%);
		--panda-action-color-done-60opc: hsl(164deg 67% 45% / 60%);
		--panda-action-color-done-70opc: hsl(164deg 67% 45% / 70%);
		--panda-action-color-done-80opc: hsl(164deg 67% 45% / 80%);
		--panda-action-color-done-90opc: hsl(164deg 67% 45% / 90%);

		/* WARN COLOR */
		--panda-action-warn: hsl(35deg 91% 62%);
		--panda-action-text-color-warn: hsl(0deg 0% 100%);

		--panda-action-color-warn-50: hsl(35deg 91% 85%);
		--panda-action-color-warn-100: hsl(35deg 91% 72%);
		--panda-action-color-warn-300: hsl(35deg 91% 67%);
		--panda-action-color-warn-500: hsl(35deg 91% 62%);
		--panda-action-color-warn-700: hsl(35deg 91% 57%);
		--panda-action-color-warn-900: hsl(35deg 91% 52%);

		--panda-action-color-warn-0opc: hsl(35deg 91% 62% / 0%);
		--panda-action-color-warn-10opc: hsl(35deg 91% 62% / 10%);
		--panda-action-color-warn-20opc: hsl(35deg 91% 62% / 20%);
		--panda-action-color-warn-30opc: hsl(35deg 91% 62% / 30%);
		--panda-action-color-warn-40opc: hsl(35deg 91% 62% / 40%);
		--panda-action-color-warn-50opc: hsl(35deg 91% 62% / 50%);
		--panda-action-color-warn-60opc: hsl(35deg 91% 62% / 60%);
		--panda-action-color-warn-70opc: hsl(35deg 91% 62% / 70%);
		--panda-action-color-warn-80opc: hsl(35deg 91% 62% / 80%);
		--panda-action-color-warn-90opc: hsl(35deg 91% 62% / 90%);

		/* ALERT COLOR */
		--panda-action-color-alert: hsl(14deg 77% 62%);
		--panda-action-text-color-alert: hsl(0deg 0% 100%);

		--panda-action-color-alert-50: hsl(14deg 77% 86%);
		--panda-action-color-alert-100: hsl(14deg 77% 72%);
		--panda-action-color-alert-300: hsl(14deg 77% 67%);
		--panda-action-color-alert-500: hsl(14deg 77% 62%);
		--panda-action-color-alert-700: hsl(14deg 77% 57%);
		--panda-action-color-alert-900: hsl(14deg 77% 52%);

		--panda-action-color-alert-0opc: hsl(14deg 77% 62% / 0%);
		--panda-action-color-alert-10opc: hsl(14deg 77% 62% / 10%);
		--panda-action-color-alert-20opc: hsl(14deg 77% 62% / 20%);
		--panda-action-color-alert-30opc: hsl(14deg 77% 62% / 30%);
		--panda-action-color-alert-40opc: hsl(14deg 77% 62% / 40%);
		--panda-action-color-alert-50opc: hsl(14deg 77% 62% / 50%);
		--panda-action-color-alert-60opc: hsl(14deg 77% 62% / 60%);
		--panda-action-color-alert-70opc: hsl(14deg 77% 62% / 70%);
		--panda-action-color-alert-80opc: hsl(14deg 77% 62% / 80%);
		--panda-action-color-alert-90opc: hsl(14deg 77% 62% / 90%);

		/* INFO COLOR */
		--panda-action-color-info: hsl(181deg 52% 53%);
		--panda-action-text-color-info: hsl(0deg 0% 100%);

		--panda-action-color-info-50: hsl(181deg 52% 75%);
		--panda-action-color-info-100: hsl(181deg 52% 63%);
		--panda-action-color-info-300: hsl(181deg 52% 58%);
		--panda-action-color-info-500: hsl(181deg 52% 53%);
		--panda-action-color-info-700: hsl(181deg 52% 48%);
		--panda-action-color-info-900: hsl(181deg 52% 43%);

		--panda-action-color-info-0opc: hsl(181deg 52% 53% / 0%);
		--panda-action-color-info-10opc: hsl(181deg 52% 53% / 10%);
		--panda-action-color-info-20opc: hsl(181deg 52% 53% / 20%);
		--panda-action-color-info-30opc: hsl(181deg 52% 53% / 30%);
		--panda-action-color-info-40opc: hsl(181deg 52% 53% / 40%);
		--panda-action-color-info-50opc: hsl(181deg 52% 53% / 50%);
		--panda-action-color-info-60opc: hsl(181deg 52% 53% / 60%);
		--panda-action-color-info-70opc: hsl(181deg 52% 53% / 70%);
		--panda-action-color-info-80opc: hsl(181deg 52% 53% / 80%);
		--panda-action-color-info-90opc: hsl(181deg 52% 53% / 90%);
		
		/* ========================================================================================================= */
		/* FRAMEWORK COLORS ======================================================================================== */
		/* ========================================================================================================= */

		/* BACKGROUND COLOR */
		--panda-background-color: hsl(218deg 26% 19%);

		--panda-background-color-50: hsl(218deg 26% 36%);
		--panda-background-color-100: hsl(218deg 26% 27%);
		--panda-background-color-300: hsl(218deg 26% 23%);
		--panda-background-color-500: hsl(218deg 26% 19%);
		--panda-background-color-700: hsl(218deg 26% 15%);
		--panda-background-color-900: hsl(218deg 26% 11%);

		--panda-background-color-0opc: hsl(218deg 26% 19% / 0%);
		--panda-background-color-10opc: hsl(218deg 26% 19% / 10%);
		--panda-background-color-20opc: hsl(218deg 26% 19% / 20%);
		--panda-background-color-30opc: hsl(218deg 26% 19% / 30%);
		--panda-background-color-40opc: hsl(218deg 26% 19% / 40%);
		--panda-background-color-50opc: hsl(218deg 26% 19% / 50%);
		--panda-background-color-60opc: hsl(218deg 26% 19% / 60%);
		--panda-background-color-70opc: hsl(218deg 26% 19% / 70%);
		--panda-background-color-80opc: hsl(218deg 26% 19% / 80%);
		--panda-background-color-90opc: hsl(218deg 26% 19% / 90%);

		/* PANDA ICON */
		--panda-icon-color: var(--panda-text-color);

		/* ========================================================================================================= */
		/* TYPOGRAPHY ============================================================================================== */
		/* ========================================================================================================= */
		
		/* FONT */		
		--panda-font-size-xs: 10px;
		--panda-font-size-s: 12px;
		--panda-font-size-m: 14px;
		--panda-font-size-l: 16px;
		--panda-font-size-xl: 20px;
		--panda-font-size-hero: 36px;

		--panda-font-family: "Poppins";
		--panda-font-family-light: "Poppins-Light";
		--panda-font-family-bold: "Poppins-Bold";

		/* TEXT COLOR */
		--panda-text-color: hsl(0deg 0% 80%);
		--panda-text-shadow: none;


		/* DRAGON LOGO */
		--dragon-logo-color-100: hsl(359deg 72% 50%);
		--dragon-logo-color-500: hsl(358deg 75% 45%);
		--dragon-logo-color-900: hsl(358deg 70% 32%);
		
		/* CODE */
		--panda-code-text-color: hsl(271deg 95% 73%);
	}

	body {
		color: var(--panda-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family);
	}

`;
