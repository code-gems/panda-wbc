import { css } from "lit";

export const pandaThemeLight = css`
	:root {
		/* LIGHT THEME */
		/* ========================================================================================================= */
		/* BASE COLORS ============================================================================================= */
		/* ========================================================================================================= */

		/* BACKGROUND COLOR */
		--panda-background-color: hsl(0deg 0% 92%);

		--panda-background-color-50: hsl(0deg 0% 100%);
		--panda-background-color-100: hsl(0deg 0% 97%);
		--panda-background-color-300: hsl(0deg 0% 95%);
		--panda-background-color-500: hsl(0deg 0% 92%);
		--panda-background-color-700: hsl(0deg 0% 89%);
		--panda-background-color-900: hsl(0deg 0% 86%);

		--panda-background-color-0opc: hsl(0deg 0% 94% / 0%);
		--panda-background-color-10opc: hsl(0deg 0% 94% / 10%);
		--panda-background-color-20opc: hsl(0deg 0% 94% / 20%);
		--panda-background-color-30opc: hsl(0deg 0% 94% / 30%);
		--panda-background-color-40opc: hsl(0deg 0% 94% / 40%);
		--panda-background-color-50opc: hsl(0deg 0% 94% / 50%);
		--panda-background-color-60opc: hsl(0deg 0% 94% / 60%);
		--panda-background-color-70opc: hsl(0deg 0% 94% / 70%);
		--panda-background-color-80opc: hsl(0deg 0% 94% / 80%);
		--panda-background-color-90opc: hsl(0deg 0% 94% / 90%);

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
		/* ACCENT & BRAND COLORS =================================================================================== */
		/* ========================================================================================================= */

		/* PRIMARY COLOR */
		--panda-primary-color: hsl(164deg 67% 45%);
		--panda-primary-text-color: hsl(0deg 0% 100%);

		--panda-primary-color-50: hsl(164deg 67% 75%);
		--panda-primary-color-100: hsl(164deg 67% 55%);
		--panda-primary-color-300: hsl(164deg 67% 50%);
		--panda-primary-color-500: hsl(164deg 67% 45%);
		--panda-primary-color-700: hsl(164deg 67% 40%);
		--panda-primary-color-900: hsl(164deg 67% 35%);

		--panda-primary-color-0opc: hsl(164deg 67% 45% / 0%);
		--panda-primary-color-10opc: hsl(164deg 67% 45% / 10%);
		--panda-primary-color-20opc: hsl(164deg 67% 45% / 20%);
		--panda-primary-color-30opc: hsl(164deg 67% 45% / 30%);
		--panda-primary-color-40opc: hsl(164deg 67% 45% / 40%);
		--panda-primary-color-50opc: hsl(164deg 67% 45% / 50%);
		--panda-primary-color-60opc: hsl(164deg 67% 45% / 60%);
		--panda-primary-color-70opc: hsl(164deg 67% 45% / 70%);
		--panda-primary-color-80opc: hsl(164deg 67% 45% / 80%);
		--panda-primary-color-90opc: hsl(164deg 67% 45% / 90%);

		/* SECONDARY */
		--panda-secondary-color: hsl(164deg 67% 45%);
		--panda-secondary-text-color: hsl(0deg 0% 100%);

		--panda-secondary-color-50: hsl(164deg 67% 75%);
		--panda-secondary-color-100: hsl(164deg 67% 55%);
		--panda-secondary-color-300: hsl(164deg 67% 50%);
		--panda-secondary-color-500: hsl(164deg 67% 45%);
		--panda-secondary-color-700: hsl(164deg 67% 40%);
		--panda-secondary-color-900: hsl(164deg 67% 35%);

		--panda-secondary-color-0opc: hsl(164deg 67% 45% / 0%);
		--panda-secondary-color-10opc: hsl(164deg 67% 45% / 10%);
		--panda-secondary-color-20opc: hsl(164deg 67% 45% / 20%);
		--panda-secondary-color-30opc: hsl(164deg 67% 45% / 30%);
		--panda-secondary-color-40opc: hsl(164deg 67% 45% / 40%);
		--panda-secondary-color-50opc: hsl(164deg 67% 45% / 50%);
		--panda-secondary-color-60opc: hsl(164deg 67% 45% / 60%);
		--panda-secondary-color-70opc: hsl(164deg 67% 45% / 70%);
		--panda-secondary-color-80opc: hsl(164deg 67% 45% / 80%);
		--panda-secondary-color-90opc: hsl(164deg 67% 45% / 90%);

		/* TERTIARY */
		--panda-tertiary-color: hsl(164deg 67% 45%);
		--panda-tertiary-text-color: hsl(0deg 0% 100%);

		--panda-tertiary-color-50: hsl(164deg 67% 75%);
		--panda-tertiary-color-100: hsl(164deg 67% 55%);
		--panda-tertiary-color-300: hsl(164deg 67% 50%);
		--panda-tertiary-color-500: hsl(164deg 67% 45%);
		--panda-tertiary-color-700: hsl(164deg 67% 40%);
		--panda-tertiary-color-900: hsl(164deg 67% 35%);

		--panda-tertiary-color-0opc: hsl(164deg 67% 45% / 0%);
		--panda-tertiary-color-10opc: hsl(164deg 67% 45% / 10%);
		--panda-tertiary-color-20opc: hsl(164deg 67% 45% / 20%);
		--panda-tertiary-color-30opc: hsl(164deg 67% 45% / 30%);
		--panda-tertiary-color-40opc: hsl(164deg 67% 45% / 40%);
		--panda-tertiary-color-50opc: hsl(164deg 67% 45% / 50%);
		--panda-tertiary-color-60opc: hsl(164deg 67% 45% / 60%);
		--panda-tertiary-color-70opc: hsl(164deg 67% 45% / 70%);
		--panda-tertiary-color-80opc: hsl(164deg 67% 45% / 80%);
		--panda-tertiary-color-90opc: hsl(164deg 67% 45% / 90%);

		/* ========================================================================================================= */
		/* ACTION COLORS =========================================================================================== */
		/* ========================================================================================================= */
		
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

		/* ========================================================================================================= */
		/* TYPOGRAPHY & SIZE ======================================================================================= */
		/* ========================================================================================================= */

		--panda-text-color: hsl(0deg 0% 15%);
		--panda-text-color-disabled: hsl(0deg 0% 44%);
		--panda-text-shadow: none;
		--panda-text-line-height: 1.6em;

		--panda-header-text-color: hsl(0deg 0% 15%);
		--panda-header-text-color-hover: hsl(0deg 0% 20%);
		--panda-header-text-color-disabled: hsl(0deg 0% 80%);
		--panda-header-text-shadow: none;

		--panda-font-size-xs: 10px;
		--panda-font-size-s: 12px;
		--panda-font-size-m: 14px;
		--panda-font-size-l: 16px;
		--panda-font-size-xl: 18px;
		--panda-font-size-hero: 24px;

		--panda-font-family: "Poppins";
		--panda-font-family-light: "Poppins-Light";
		--panda-font-family-bold: "Poppins-Bold";

		/* LINK COLOR */
		--panda-link-color: hsl(216deg 86% 51%);
		--panda-link-color-hover: hsl(216deg 86% 56%);
		--panda-link-color-visited: hsl(271deg 100% 50%);
		--panda-link-color-active: hsl(271deg 100% 60%);

		--panda-padding-xs: 2px;
		--panda-padding-s: 5px;
		--panda-padding-m: 10px;
		--panda-padding-l: 15px;
		--panda-padding-xl: 30px;
		--panda-padding-hero: 60px;

		--panda-border-radius-xs: 2px;
		--panda-border-radius-s: 3px;
		--panda-border-radius-m: 5px;
		--panda-border-radius-l: 10px;
		--panda-border-radius-xl: 15px;
		--panda-border-radius-hero: 30px;

		/* ========================================================================================================= */
		/* FORMS & COMPONENTS ====================================================================================== */
		/* ========================================================================================================= */

		--panda-outline-color: var(--panda-primary-color);
		--panda-form-border-color: hsl(0deg 0% 66%);

		/* FORM VALIDATION */
		--panda-form-validation-mandatory: var(--panda-action-color-warn);
		--panda-form-validation-valid: var(--panda-action-color-done);
		--panda-form-validation-invalid: var(--panda-action-color-alert);

		/* LABEL */
		--panda-label-color: hsl(0deg 0% 50%);
		--panda-label-text-shadow: none;
		--panda-label-font-size: var(--panda-font-size-s);
		--panda-label-font-family: var(--panda-font-family);
		
		/* INPUT */
		--panda-input-height: 40px;
		--panda-input-padding: 0px 10px;
		--panda-input-outline-color: var(--panda-outline-color);
		--panda-input-text-color: var(--panda-text-color);
		--panda-input-text-color-disabled: var(--panda-text-color-disabled);
		--panda-input-background-color: hsl(0deg 0% 100%);
		--panda-input-background-color-disabled: hsl(0deg 0% 92%);
		--panda-input-font-size: var(--panda-font-size-m);
		--panda-input-font-family: var(--panda-font-family);

		--panda-input-border-color: hsl(0deg 0% 80%);
		--panda-input-border-color-disabled: hsl(0deg 0% 80%);
		--panda-input-border-color-hover: hsl(0deg 0% 65%);
		--panda-input-border-radius: 5px;
		--panda-input-icon-color: var(--panda-icon-color);
		--panda-input-icon-background-color: hsl(0deg 0% 92%);
		
		--panda-input-placeholder-color: hsl(0deg 0% 80%);
		--panda-input-placeholder-font-size: var(--panda-font-size-m);
		--panda-input-placeholder-font-family: var(--panda-font-family);
		
		/* BUTTON */
		
		/* DROPDOWN */
		--panda-dropdown-border-radius: 5px;
		--panda-dropdown-border-color: hsl(0deg 0% 80%);
		--panda-dropdown-background-color: hsl(0deg 0% 100%);
		
		--panda-dropdown-item-padding: 10px 5px;
		--panda-dropdown-item-border-radius: 5px;
		--panda-dropdown-item-border-color: var(--panda-background-color-500);

		--panda-dropdown-item-font-size: var(--panda-font-size-m);
		--panda-dropdown-item-font-family: var(--panda-font-family);
		--panda-dropdown-item-text-shadow: none;
		
		--panda-dropdown-item-text-color: var(--panda-text-color);
		--panda-dropdown-item-background-color: transparent;
		--panda-dropdown-item-text-color-hover: var(--panda-primary-color);
		--panda-dropdown-item-background-color-hover: var(--panda-background-color-100);
		--panda-dropdown-item-text-color-active: var(--panda-primary-text-color);
		--panda-dropdown-item-background-color-active: var(--panda-primary-color);

		/* ICON */
		--panda-icon-color: var(--panda-text-color);
		--panda-icon-color-disabled: var(--panda-text-color-disabled);

		--panda-icon-size-xs: 16px;
		--panda-icon-size-s: 18px;
		--panda-icon-size-m: 20px;
		--panda-icon-size-l: 24px;
		--panda-icon-size-xl: 30px;
		--panda-icon-size-hero: 46px;

		/* ========================================================================================================= */
		/* PANDA DIALOG ============================================================================================ */
		/* ========================================================================================================= */

		--panda-dialog-border: 1px solid var(--panda-form-border-color);
		--panda-dialog-border-radius: ;
		--panda-dialog-background-color: ;
		--panda-dialog-box-shadow: ;
		--panda-dialog-overlay-background-color: ;

		/* ========================================================================================================= */
		/* SCROLLBAR =============================================================================================== */
		/* ========================================================================================================= */

		--panda-scrollbar-size: 6px;
		--panda-scrollbar-size-s: 4px;
		--panda-scrollbar-thumb-background-color: hsl(0deg 0% 80%);
		--panda-scrollbar-thumb-background-color-hover: hsl(0deg 0% 65%);
		--panda-scrollbar-thumb-border-radius: 3px;
		--panda-scrollbar-track-background-color: var(--panda-background-color-100);
		--panda-scrollbar-track-border-radius: 3px;

		/* ========================================================================================================= */
		/* FRAMEWORK COLORS ======================================================================================== */
		/* ========================================================================================================= */

		/* DRAGON LOGO */
		--dragon-logo-color-100: #268ac8;
		--dragon-logo-color-500: #1a7aac;
		--dragon-logo-color-900: #19638c;

		/* CODE */
		--panda-code-text-color: hsl(122deg 39% 49%);
	}

	body {
		color: var(--panda-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family);
	}
`;
