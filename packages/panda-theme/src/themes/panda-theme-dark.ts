import { css } from "lit";

export const pandaThemeDark = css`
	body {

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
		
		--panda-action-warn-50: hsl(35deg 91% 85%);
		--panda-action-warn-100: hsl(35deg 91% 72%);
		--panda-action-warn-300: hsl(35deg 91% 67%);
		--panda-action-warn-500: hsl(35deg 91% 62%);
		--panda-action-warn-700: hsl(35deg 91% 57%);
		--panda-action-warn-900: hsl(35deg 91% 52%);

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
		

		/* PRIMARY */

		--panda-primary: hsl(196deg 100% 47%);
		--panda-primary-0opc: hsl(196deg 100% 47% / 0%);
		--panda-primary-10opc: hsl(196deg 100% 47% / 10%);
		--panda-primary-20opc: hsl(196deg 100% 47% / 20%);
		--panda-primary-30opc: hsl(196deg 100% 47% / 30%);
		--panda-primary-40opc: hsl(196deg 100% 47% / 40%);
		--panda-primary-50opc: hsl(196deg 100% 47% / 50%);
		--panda-primary-60opc: hsl(196deg 100% 47% / 60%);
		--panda-primary-70opc: hsl(196deg 100% 47% / 70%);
		--panda-primary-80opc: hsl(196deg 100% 47% / 80%);
		--panda-primary-90opc: hsl(196deg 100% 47% / 90%);
		
		--panda-primary-light-100: hsl(196deg 100% 52%);
		--panda-primary-light-200: hsl(196deg 100% 57%);
		--panda-primary-light-300: hsl(196deg 100% 62%);
		--panda-primary-light-400: hsl(196deg 100% 67%);
		--panda-primary-light-500: hsl(196deg 100% 72%);
		--panda-primary-light-600: hsl(196deg 100% 77%);
		--panda-primary-light-700: hsl(196deg 100% 82%);
		
		--panda-primary-dark-100: hsl(196deg 100% 42%);
		--panda-primary-dark-200: hsl(196deg 100% 37%);
		--panda-primary-dark-300: hsl(196deg 100% 32%);
		--panda-primary-dark-400: hsl(196deg 100% 27%);
		--panda-primary-dark-500: hsl(196deg 100% 22%);
		--panda-primary-dark-600: hsl(196deg 100% 17%);
		--panda-primary-dark-700: hsl(196deg 100% 12%);
				
		--panda-primary-color: hsl(0deg 0% 100%);
		--panda-primary-background: var(--panda-primary);
		
		--panda-primary-color-hover: hsl(0deg 0% 100%);
		--panda-primary-background-hover: hsl(196deg 100% 51%);
		
		--panda-primary-color-disabled: hsl(0deg 0% 100%);
		--panda-primary-background-disabled: hsl(196deg 88% 73%);
		
		/* SECONDARY */

		--panda-secondary-color: hsl(0deg 0% 29%);
		--panda-secondary-background: hsl(196deg 30% 85%);
		
		--panda-secondary-color-hover: hsl(0deg 0% 29%);
		--panda-secondary-background-hover: hsl(196deg 30% 89%);
		
		--panda-secondary-color-disabled: hsl(0deg 0% 64%);
		--panda-secondary-background-disabled: hsl(196deg 28% 92%);

		--panda-secondary-0opc: hsl(196deg 30% 85% / 0%);
		--panda-secondary-10opc: hsl(196deg 30% 85% / 10%);
		--panda-secondary-20opc: hsl(196deg 30% 85% / 20%);
		--panda-secondary-30opc: hsl(196deg 30% 85% / 30%);
		--panda-secondary-40opc: hsl(196deg 30% 85% / 40%);
		--panda-secondary-50opc: hsl(196deg 30% 85% / 50%);
		--panda-secondary-60opc: hsl(196deg 30% 85% / 60%);
		--panda-secondary-70opc: hsl(196deg 30% 85% / 70%);
		--panda-secondary-80opc: hsl(196deg 30% 85% / 80%);
		--panda-secondary-90opc: hsl(196deg 30% 85% / 90%);
		
		
		/* TEXT, FONTS & SIZES */

		--panda-txt-color: hsl(0deg 0% 29%);

		--panda-bg-color: hsl(0deg 0% 100%);
		--panda-bg-color-100: hsl(0deg 0% 95%);
		--panda-bg-color-200: hsl(0deg 0% 90%);
		--panda-bg-color-300: hsl(0deg 0% 85%);
		--panda-bg-color-400: hsl(0deg 0% 80%);
		--panda-bg-color-500: hsl(0deg 0% 75%);
		--panda-bg-color-600: hsl(0deg 0% 70%);
		--panda-bg-color-700: hsl(0deg 0% 65%);

		--panda-bg-color-0opc: hsl(0deg 0% 100% / 0%);
		--panda-bg-color-10opc: hsl(0deg 0% 100% / 10%);
		--panda-bg-color-20opc: hsl(0deg 0% 100% / 20%);
		--panda-bg-color-30opc: hsl(0deg 0% 100% / 30%);
		--panda-bg-color-40opc: hsl(0deg 0% 100% / 40%);
		--panda-bg-color-50opc: hsl(0deg 0% 100% / 50%);
		--panda-bg-color-60opc: hsl(0deg 0% 100% / 60%);
		--panda-bg-color-70opc: hsl(0deg 0% 100% / 70%);
		--panda-bg-color-80opc: hsl(0deg 0% 100% / 80%);
		--panda-bg-color-90opc: hsl(0deg 0% 100% / 90%);

		--panda-font-size-xs: 10px;
		--panda-font-size-s: 12px;
		--panda-font-size-m: 14px;
		--panda-font-size-l: 16px;
		--panda-font-size-xl: 20px;
		--panda-font-size-hero: 36px;

		--panda-font-family: "Poppins";
		--panda-font-family-light: "Poppins-Light";
		--panda-font-family-medium: "Poppins";
		--panda-font-family-bold: "Poppins-Bold";

		/* FORM, INPUT ELEMENT COLORS & SIZES, BORDER & PADDING */

		--panda-label-color: #ccc;

		--panda-element-default-hight: 40px;

		/* FORM INPUT / TEXT FIELD */

		--panda-input-txt-color: var(--panda-txt-color);
		--panda-input-bg-color: hsl(0deg 0% 95%);

		--panda-input-border-color: hsl(0deg 0% 90%);
		--panda-input-border-size: 1px;
		--panda-input-border-style: solid;
		
		--panda-input-placeholder-color: hsl(0deg 0% 70%);

		--panda-input-txt-color-disabled: hsl(0deg 0% 70%);
		--panda-input-bg-color-disabled: hsl(0deg 0% 90%);

		--panda-padding-xs: 2px;
		--panda-padding-s: 5px;
		--panda-padding-m: 10px;
		--panda-padding-l: 15px;
		--panda-padding-xl: 30px;
		--panda-padding-hero: 60px;


		/* BORDER RADIUS SIZES */
		
		--panda-border-radius-s: 2px;
		--panda-border-radius-m: 5px;
		--panda-border-radius-l: 10px;
		--panda-border-radius-xl: 20px;
		--panda-border-radius-hero: 30px;

		/* LIGHTS & SHADOWS */

		--panda-light-color: hsl(0deg 0% 100%);
		--panda-light-color-0opc: hsl(0deg 0% 100% / 0%);
		--panda-light-color-10opc: hsl(0deg 0% 100% / 10%);
		--panda-light-color-20opc: hsl(0deg 0% 100% / 20%);
		--panda-light-color-30opc: hsl(0deg 0% 100% / 30%);
		--panda-light-color-40opc: hsl(0deg 0% 100% / 40%);
		--panda-light-color-50opc: hsl(0deg 0% 100% / 50%);
		--panda-light-color-60opc: hsl(0deg 0% 100% / 60%);
		--panda-light-color-70opc: hsl(0deg 0% 100% / 70%);
		--panda-light-color-80opc: hsl(0deg 0% 100% / 80%);
		--panda-light-color-90opc: hsl(0deg 0% 100% / 90%);

		--panda-shadow-color: hsl(0deg 0% 0%);
		--panda-shadow-color-0opc: hsl(0deg 0% 0% / 0%);
		--panda-shadow-color-10opc: hsl(0deg 0% 0% / 10%);
		--panda-shadow-color-20opc: hsl(0deg 0% 0% / 20%);
		--panda-shadow-color-30opc: hsl(0deg 0% 0% / 30%);
		--panda-shadow-color-40opc: hsl(0deg 0% 0% / 40%);
		--panda-shadow-color-50opc: hsl(0deg 0% 0% / 50%);
		--panda-shadow-color-60opc: hsl(0deg 0% 0% / 60%);
		--panda-shadow-color-70opc: hsl(0deg 0% 0% / 70%);
		--panda-shadow-color-80opc: hsl(0deg 0% 0% / 80%);
		--panda-shadow-color-90opc: hsl(0deg 0% 0% / 90%);

		/* NOTIFICATION COLORS */

		--panda-notification-color: #fff;
		--panda-notification-background: hsl(340deg 82% 59%);

		--panda-notification-color-hover: #fff;
		--panda-notification-background-hover: #000;

		--panda-notification-color-disabled: #fff;
		--panda-notification-background-disabled: #000;

		--panda-notification-0opc: #000;
		
		/* ICONS */

		--panda-icon-size-xs: 12px;
		--panda-icon-size-s: 18px;
		--panda-icon-size-m: 24px;
		--panda-icon-size-l: 32px;
		--panda-icon-size-xl: 38px;

		--panda-icon-fill-color: var(--panda-txt-color);
		
		/* BUTTONS */

		--panda-button-size-xs: 26px;
		--panda-button-size-s: 32px;
		--panda-button-size-m: 40px;
		--panda-button-size-l: 48px;
		--panda-button-size-xl: 56px;

		--panda-button-font-size: var(--panda-font-size-m);
		--panda-button-font-family: var(--panda-font-family-bold);
		--panda-button-text-shadow: 0px 1px 1px var(--panda-shadow-color);

		--panda-button-border-radius: 0px;
		--panda-button-border: 1px solid var(--panda-bg-color-100);

		--panda-button-color: var(--panda-txt-color);
		--panda-button-background: hsl(0deg 0% 100%);

		--panda-button-color-hover: var(--panda-txt-color);
		--panda-button-background-hover: hsl(0deg 0% 95%);

		--panda-button-color-disabled: var(--panda-txt-color);
		--panda-button-background-disabled: hsl(0deg 0% 95%);

		/* SCROLLBARS */

		--panda-scrollbar-width: 5px;
		--panda-scrollbar-track-color: red;

		color: var(--panda-txt-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family);
		background-color: var(--panda-bg-color);
	}
`;
