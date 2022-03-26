export const pandaThemeLight = `
	body {
		/* === BRAND COLORS === */

		/* PRIMARY */
		
		--panda-primary-color-txt: hsl(0deg 0% 100%);
		--panda-primary-color: hsl(196deg 100% 47%);
		
		--panda-primary-color-txt-hover: hsl(0deg 0% 100%);
		--panda-primary-color-hover: hsl(196deg 100% 51%);
		
		--panda-primary-color-txt-disabled: hsl(0deg 0% 100%);
		--panda-primary-color-disabled: hsl(196deg 88% 73%);

		--panda-primary-color-0opc: hsl(196deg 100% 47% / 0%);
		--panda-primary-color-10opc: hsl(196deg 100% 47% / 10%);
		--panda-primary-color-20opc: hsl(196deg 100% 47% / 20%);
		--panda-primary-color-30opc: hsl(196deg 100% 47% / 30%);
		--panda-primary-color-40opc: hsl(196deg 100% 47% / 40%);
		--panda-primary-color-50opc: hsl(196deg 100% 47% / 50%);
		--panda-primary-color-60opc: hsl(196deg 100% 47% / 60%);
		--panda-primary-color-70opc: hsl(196deg 100% 47% / 70%);
		--panda-primary-color-80opc: hsl(196deg 100% 47% / 80%);
		--panda-primary-color-90opc: hsl(196deg 100% 47% / 90%);
		
		/* SECONDARY */

		--panda-secondary-color-txt: hsl(0deg 0% 29%);
		--panda-secondary-color: hsl(196deg 30% 85%);
		
		--panda-secondary-color-txt-hover: hsl(0deg 0% 29%);
		--panda-secondary-color-hover: hsl(196deg 30% 89%);
		
		--panda-secondary-color-txt-disabled: hsl(0deg 0% 64%);
		--panda-secondary-color-disabled: hsl(196deg 28% 92%);

		--panda-secondary-color-0opc: hsl(196deg 30% 85% / 0%);
		--panda-secondary-color-10opc: hsl(196deg 30% 85% / 10%);
		--panda-secondary-color-20opc: hsl(196deg 30% 85% / 20%);
		--panda-secondary-color-30opc: hsl(196deg 30% 85% / 30%);
		--panda-secondary-color-40opc: hsl(196deg 30% 85% / 40%);
		--panda-secondary-color-50opc: hsl(196deg 30% 85% / 50%);
		--panda-secondary-color-60opc: hsl(196deg 30% 85% / 60%);
		--panda-secondary-color-70opc: hsl(196deg 30% 85% / 70%);
		--panda-secondary-color-80opc: hsl(196deg 30% 85% / 80%);
		--panda-secondary-color-90opc: hsl(196deg 30% 85% / 90%);
		
		
		/* TEXT, FONTS & SIZES */

		--panda-txt-color: hsl(0deg 0% 29%);
		--panda-bg-color: hsl(0deg 0% 100%);

		--panda-font-size-s: 12px;
		--panda-font-size-m: 14px;
		--panda-font-size-l: 16px;
		--panda-font-size-xl: 20px;
		--panda-font-size-hero: 36px;

		--panda-font-family: "Poppins";
		--panda-font-family-light: "Poppins-Light";
		--panda-font-family-medium: "Poppins";
		--panda-font-family-bold: "Poppins";

		--panda-input-txt-color: var(--panda-txt-color);
		--panda-input-bg-color: hsl(0deg 0% 95%);

		--panda-input-txt-color-disabled: hsl(0deg 0% 70%);
		--panda-input-bg-color-disabled: hsl(0deg 0% 90%);
		
		--panda-border-radius-s: 2px;
		--panda-border-radius-m: 5px;
		--panda-border-radius-l: 10px;

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

		/* ACTION COLORS */
		
		--panda-action-color-done: hsl(164deg 67% 45%);
		--panda-action-color-done-txt: hsl(0deg 0% 100%);
		
		--panda-action-color-done-hover: hsl(164deg 69% 50%);
		--panda-action-color-done-txt-hover: hsl(0deg 0% 100%);

		--panda-action-color-done-disabled: hsl(164deg 54% 80%);
		--panda-action-color-done-txt-disabled: hsl(0deg 0% 100%);

		--panda-action-color-done-100: hsl(164deg 67% 50%);
		--panda-action-color-done-200: hsl(164deg 67% 55%);
		--panda-action-color-done-300: hsl(164deg 67% 60%);
		--panda-action-color-done-400: hsl(164deg 67% 65%);
		--panda-action-color-done-txt: hsl(0deg 0% 100%);
		
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

		--panda-action-color-warn: hsl(35deg 91% 62%);
		--panda-action-color-warn-txt: hsl(0deg 0% 100%);
		
		--panda-action-color-warn-hover: hsl(35deg 100% 68%);
		--panda-action-color-warn-txt-hover: hsl(0deg 0% 100%);
		
		--panda-action-color-warn-disabled: hsl(36deg 90% 81%);
		--panda-action-color-warn-txt-disabled: hsl(0deg 0% 100%);

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

		--panda-action-color-fail: hsl(14deg 77% 62%);
		--panda-action-color-fail-txt: hsl(0deg 0% 100%);
		
		--panda-action-color-fail-hover: hsl(14deg 100% 68%);
		--panda-action-color-fail-txt-hover: hsl(0deg 0% 100%);
		
		--panda-action-color-fail-disabled: hsl(14deg 79% 83%);
		--panda-action-color-fail-txt-disabled: hsl(0deg 0% 100%);

		--panda-action-color-fail-0opc: hsl(14deg 77% 62% / 0%);
		--panda-action-color-fail-10opc: hsl(14deg 77% 62% / 10%);
		--panda-action-color-fail-20opc: hsl(14deg 77% 62% / 20%);
		--panda-action-color-fail-30opc: hsl(14deg 77% 62% / 30%);
		--panda-action-color-fail-40opc: hsl(14deg 77% 62% / 40%);
		--panda-action-color-fail-50opc: hsl(14deg 77% 62% / 50%);
		--panda-action-color-fail-60opc: hsl(14deg 77% 62% / 60%);
		--panda-action-color-fail-70opc: hsl(14deg 77% 62% / 70%);
		--panda-action-color-fail-80opc: hsl(14deg 77% 62% / 80%);
		--panda-action-color-fail-90opc: hsl(14deg 77% 62% / 90%);

		--panda-action-color-info: hsl(181deg 52% 53%);
		--panda-action-color-info-txt: hsl(0deg 0% 100%);

		--panda-action-color-info-hover: hsl(181deg 59% 56%);
		--panda-action-color-info-txt-hover: hsl(0deg 0% 100%);

		--panda-action-color-info-disabled: hsl(182deg 52% 76%);
		--panda-action-color-info-txt-disabled: hsl(0deg 0% 100%);

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
		
		/* ICONS */

		--panda-icon-size-xs: 12px;
		--panda-icon-size-s: 18px;
		--panda-icon-size-m: 24px;
		--panda-icon-size-l: 32px;
		--panda-icon-size-xl: 38px;

		--panda-icon-fill-color: var(--panda-txt-color);
		
		/* BUTTONS */

		--panda-button-height-xs: 26px;
		--panda-button-height-s: 32px;
		--panda-button-height-m: 40px;
		--panda-button-height-l: 48px;
		--panda-button-height-xl: 56px;


		color: var(--panda-txt-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family);
		background-color: var(--panda-bg-color);
	}
`;
