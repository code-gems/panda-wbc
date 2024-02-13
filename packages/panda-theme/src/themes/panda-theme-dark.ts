import { css } from "lit";

export const pandaThemeDark = css`
	:root {
		/* DARK THEME */
		/* ========================================================================================================= */
		/* BASE COLORS ============================================================================================= */
		/* ========================================================================================================= */

		/* BACKGROUND COLOR */
		--panda-background-color: hsl(274deg 30% 15%);

		--panda-background-color-50: hsl(274deg 30% 35%);
		--panda-background-color-100: hsl(274deg 30% 25%);
		--panda-background-color-300: hsl(274deg 30% 20%);
		--panda-background-color-500: hsl(274deg 30% 15%);
		--panda-background-color-700: hsl(274deg 30% 10%);
		--panda-background-color-900: hsl(274deg 30% 7%);

		--panda-background-color-0opc: hsl(274deg 30% 20% / 0%);
		--panda-background-color-10opc: hsl(274deg 30% 20% / 10%);
		--panda-background-color-20opc: hsl(274deg 30% 20% / 20%);
		--panda-background-color-30opc: hsl(274deg 30% 20% / 30%);
		--panda-background-color-40opc: hsl(274deg 30% 20% / 40%);
		--panda-background-color-50opc: hsl(274deg 30% 20% / 50%);
		--panda-background-color-60opc: hsl(274deg 30% 20% / 60%);
		--panda-background-color-70opc: hsl(274deg 30% 20% / 70%);
		--panda-background-color-80opc: hsl(274deg 30% 20% / 80%);
		--panda-background-color-90opc: hsl(274deg 30% 20% / 90%);

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
		--panda-tertiary-color: hsl(274deg 54% 20%);
		--panda-tertiary-text-color: hsl(0deg 0% 100%);

		--panda-tertiary-color-50: hsl(274deg 54% 40%);
		--panda-tertiary-color-100: hsl(274deg 54% 30%);
		--panda-tertiary-color-300: hsl(274deg 54% 25%);
		--panda-tertiary-color-500: hsl(274deg 54% 20%);
		--panda-tertiary-color-700: hsl(274deg 54% 15%);
		--panda-tertiary-color-900: hsl(274deg 54% 10%);

		--panda-tertiary-color-0opc: hsl(274deg 54% 20% / 0%);
		--panda-tertiary-color-10opc: hsl(274deg 54% 20% / 10%);
		--panda-tertiary-color-20opc: hsl(274deg 54% 20% / 20%);
		--panda-tertiary-color-30opc: hsl(274deg 54% 20% / 30%);
		--panda-tertiary-color-40opc: hsl(274deg 54% 20% / 40%);
		--panda-tertiary-color-50opc: hsl(274deg 54% 20% / 50%);
		--panda-tertiary-color-60opc: hsl(274deg 54% 20% / 60%);
		--panda-tertiary-color-70opc: hsl(274deg 54% 20% / 70%);
		--panda-tertiary-color-80opc: hsl(274deg 54% 20% / 80%);
		--panda-tertiary-color-90opc: hsl(274deg 54% 20% / 90%);

		/* ========================================================================================================= */
		/* ACTION COLORS =========================================================================================== */
		/* ========================================================================================================= */
		
		/* INFO COLOR */
		--panda-action-color-info: hsl(261deg 66% 58%);
		--panda-action-text-color-info: hsl(0deg 0% 100%);

		--panda-action-color-info-50: hsl(261deg 66% 78%);
		--panda-action-color-info-100: hsl(261deg 66% 68%);
		--panda-action-color-info-300: hsl(261deg 66% 63%);
		--panda-action-color-info-500: hsl(261deg 66% 58%);
		--panda-action-color-info-700: hsl(261deg 66% 43%);
		--panda-action-color-info-900: hsl(261deg 66% 38%);

		--panda-action-color-info-0opc: hsl(261deg 66% 58% / 0%);
		--panda-action-color-info-10opc: hsl(261deg 66% 58% / 10%);
		--panda-action-color-info-20opc: hsl(261deg 66% 58% / 20%);
		--panda-action-color-info-30opc: hsl(261deg 66% 58% / 30%);
		--panda-action-color-info-40opc: hsl(261deg 66% 58% / 40%);
		--panda-action-color-info-50opc: hsl(261deg 66% 58% / 50%);
		--panda-action-color-info-60opc: hsl(261deg 66% 58% / 60%);
		--panda-action-color-info-70opc: hsl(261deg 66% 58% / 70%);
		--panda-action-color-info-80opc: hsl(261deg 66% 58% / 80%);
		--panda-action-color-info-90opc: hsl(261deg 66% 58% / 90%);

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

		--panda-text-color: hsl(274deg 21% 87%);
		--panda-text-color-hover: hsl(0deg 0% 20%);
		--panda-text-color-disabled: hsl(273deg 20% 40%);
		--panda-text-shadow: none;
		--panda-text-line-height: 1.6em;

		--panda-header-text-color: hsl(344deg 100% 64%);
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

		--panda-component-size-s: 24px;
		--panda-component-size-m: 30px;
		--panda-component-size-l: 36px;
		--panda-component-size-xl: 42px;

		--panda-outline-color: var(--panda-primary-color);
		--panda-form-border-color: hsl(0deg 0% 66%);

		/* FORM VALIDATION */
		--panda-form-validation-mandatory: var(--panda-action-color-warn);
		--panda-form-validation-valid: var(--panda-action-color-done);
		--panda-form-validation-invalid: var(--panda-action-color-alert);

		/* LABEL */
		--panda-label-color: hsl(273deg 20% 65%);
		--panda-label-text-shadow: none;
		--panda-label-font-size: var(--panda-font-size-s);
		--panda-label-font-family: var(--panda-font-family);
		
		/* INPUT */
		--panda-input-height: var(--panda-component-size-m);
		--panda-input-padding: 0px 10px;
		--panda-input-outline-color: var(--panda-outline-color);
		--panda-input-text-color: var(--panda-text-color);
		--panda-input-text-color-disabled: var(--panda-text-color-disabled);
		--panda-input-background-color: hsl(0deg 0% 100%);
		--panda-input-background-color-disabled: var(--panda-background-color);
		--panda-input-font-size: var(--panda-font-size-m);
		--panda-input-font-family: var(--panda-font-family);

		--panda-input-border-color: hsl(0deg 0% 80%);
		--panda-input-border-color-disabled: hsl(0deg 0% 80%);
		--panda-input-border-color-hover: hsl(0deg 0% 65%);
		--panda-input-border-radius: 5px;
		--panda-input-icon-color: var(--panda-icon-color);
		--panda-input-icon-background-color: var(--panda-background-color);
		
		--panda-input-placeholder-color: hsl(0deg 0% 80%);
		--panda-input-placeholder-font-size: var(--panda-font-size-m);
		--panda-input-placeholder-font-family: var(--panda-font-family);
		
		/* BUTTON */
		--panda-button-text-shadow: none;

		--panda-button-text-color: var(--panda-text-color);
		--panda-button-border-color: #fff;
		--panda-button-background-color: #fff;
		
		--panda-button-text-color-hover: var(--panda-text-color-hover);
		--panda-button-border-color-hover: #fff;
		--panda-button-background-color-hover: #fff;

		--panda-button-text-color-disabled: var(--panda-text-color-disabled);
		--panda-button-border-color-disabled: #fff;
		--panda-button-background-color-disabled: #fff;
		
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
		/* RADIO BUTTON ============================================================================================ */
		/* ========================================================================================================= */

		--panda-radio-button-size: 20px;
		--panda-radio-button-color: var(--panda-primary-color);
		--panda-radio-button-color-disabled: var(--panda-text-color-disabled);
		--panda-radio-button-dot-color: var(--panda-primary-color);
		--panda-radio-button-dot-color-disabled: var(--panda-text-color-disabled);
		--panda-radio-button-focus-ring-color: var(--panda-primary-color-50opc);
		--panda-radio-button-outline-color: var(--panda-primary-color-40opc);
		--panda-radio-button-outline-color-disabled: var(--panda-primary-color-20opc);

		--panda-radio-button-text-color: var(--panda-text-color);
		--panda-radio-button-text-color-disabled: var(--panda-text-color-disabled);

		--panda-radio-button-border-width: 1px;
		--panda-radio-button-border-style: solid;
		--panda-radio-button-border-color: transparent;
		--panda-radio-button-border-color-disabled: transparent;
		
		--panda-radio-button-background-color: hsl(273deg 30% 40%);
		--panda-radio-button-background-color-hover: hsl(273deg 30% 50%);
		--panda-radio-button-background-color-checked: hsl(273deg 30% 20%);
		--panda-radio-button-background-color-disabled: hsl(273deg 30% 25%);

		/* ========================================================================================================= */
		/* PANDA NOTIFICATION ====================================================================================== */
		/* ========================================================================================================= */

		--panda-notification-header-text-color: var(--panda-header-text-color);
		--panda-notification-header-text-shadow: "none";
		--panda-notification-header-font-size: var(--panda-font-size-l);
		--panda-notification-header-font-family: var(--panda-font-family-bold);
		--panda-notification-text-color: var(--panda-text-color);
		--panda-notification-text-shadow: "none";
		--panda-notification-font-size: var(--panda-font-size-m);
		--panda-notification-font-family: var(--panda-font-family);
				
		--panda-notification-border-color: hsl(278deg 46% 17%);
		--panda-notification-background-color: hsl(278deg 46% 7%);

		--panda-notification-button-background-color: transparent;
		--panda-notification-button-background-color-hover: var(--panda-white-color-10opc);

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

		/* LOGO */
		--panda-logo-color-100: #268ac8;
		--panda-logo-color-500: #1a7aac;
		--panda-logo-color-900: #19638c;

		/* CODE */
		--panda-code-text-color: hsl(122deg 39% 49%);
	}

	body {
		color: var(--panda-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family);
	}
`;
