import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		height: var(--panda-button-height-m, 40px);
	}

	button {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		min-width: var(--panda-button-height-m, 40px);
		height: var(--panda-button-height-m, 40px);

		color: var(--panda-primary-txt-color, #ffffff);
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
		font-weight: bold;
		text-shadow: 0px 1px 1px var(--panda-shadow-color-50opc, hsl(0deg 0% 0% / 50%));
		transition: all 200ms ease-in-out;
		cursor: pointer;

		border-radius: var(--panda-border-radius-m, 5px);
		border: none;
		background: var(--panda-primary-color, hsl(196deg 100% 47%));
		box-shadow: 0px 2px 4px var(--panda-primary-color-50opc, hsl(0deg 0% 0% / 50%));
	}

	.content {
		padding: 0px 15px;
		overflow: hidden;
		
		line-height: var(--panda-button-height-m, 40px);
		text-overflow: ellipsis;
		text-align: center;
		user-select: none;
		white-space: nowrap;
		flex-grow: 1;
	}

	::slotted([slot="prefix"]),
	::slotted([slot="suffix"]) {
		display: flex;
		height: var(--panda-button-height-m, 40px);
		padding: 0px 5px;
		justify-content: center;
		align-items: center;
		user-select: none;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		left: 0px;
		top: 0px;

		border-radius: var(--panda-border-radius-m, 5px);
		background: var(--panda-primary-color, hsl(196deg 100% 47%));
	}

	.spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-primary-color-txt, hsl(0deg 0% 100%));
	}

	/* HOVER STATE */
	
	button:hover {
		color: var(--panda-primary-color-txt-hover, hsl(0deg 0% 100%));
		background: var(--panda-primary-color-hover, hsl(196deg 100% 51%));
	}
	
	/* DISABLED STATE */

	:host([disabled]) { pointer-events: none; }
	
	:host([disabled]) button {
		color: var(--panda-primary-color-txt-disabled, hsl(0deg 0% 100%));
		text-shadow: none;
		background: var(--panda-primary-color-disabled, hsl(196deg 88% 73%));
		box-shadow: none;
	}
	
	/* BUSY STATE */

	:host([busy]) { pointer-events: none; }
	:host([busy]) .content,
	:host([busy]) slot { visibility: hidden; }

	/* === THEMES === */
	
	/* PRIMARY - OUTLINE */

	:host([theme~="outline"]) button {
		color: var(--panda-primary-color, hsl(196deg 100% 47%));
		text-shadow: none;
		border: 2px solid var(--panda-primary-color, hsl(196deg 100% 47%));
		background: var(--panda-primary-color-10opc, hsl(196deg 100% 47% / 10%));
		box-shadow: none;
	}

	:host([theme~="outline"]) button:hover {
		border: 2px solid var(--panda-primary-color-hover, hsl(196deg 100% 51%));
		background: var(--panda-primary-color-20opc, hsl(196deg 100% 47% / 20%));
	}

	:host([theme~="outline"][disabled]) button {
		color: var(--panda-primary-color-disabled, hsl(164deg 54% 72%));
		text-shadow: none;
		border: 2px solid var(--panda-primary-color-disabled, hsl(196deg 28% 92%));
		background: var(--panda-primary-color-10opc, hsl(196deg 30% 85% / 10%));
		box-shadow: none;
	}

	:host([theme~="outline"][busy]) .spinner-cont {
		background: var(--panda-secondary-color-10opc, hsl(196deg 30% 85% / 10%));
	}

	:host([theme~="outline"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-primary-color, hsl(0deg 0% 29%));
	}

	/* SECONDARY */

	:host([theme~="secondary"]) button {
		color: var(--panda-secondary-txt-color, hsl(0deg 0% 29%));
		text-shadow: 0px 1px 1px var(--panda-light-color, hsl(0deg 0% 100%));
		background: var(--panda-secondary-color, hsl(196deg 30% 85%));
		box-shadow: 0px 1px 2px var(--panda-shadow-color-50opc, hsl(0deg 0% 0% / 50%));
	}

	:host([theme~="secondary"]) button:hover {
		color: var(--panda-secondary-color-txt-hover, hsl(0deg 0% 29%));
		background: var(--panda-secondary-color-hover, hsl(196deg 30% 90%));
	}

	:host([theme~="secondary"][disabled]) button {
		color: var(--panda-secondary-color-txt-disabled, hsl(0deg 0% 64%));
		text-shadow: none;
		background: var(--panda-secondary-color-disabled, hsl(196deg 28% 92%));
		box-shadow: none;
	}

	:host([theme~="secondary"][busy]) .spinner-cont {
		background: var(--panda-secondary-color, hsl(196deg 30% 85%));
	}

	:host([theme~="secondary"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-secondary-color-txt, hsl(0deg 0% 29%));
	}

	/* SECONDARY - OUTLINE */

	:host([theme~="secondary"][theme~="outline"]) button {
		color: var(--panda-secondary-color-txt, hsl(0deg 0% 29%));
		text-shadow: none;
		border: 2px solid var(--panda-secondary-color, hsl(164deg 67% 45%));
		background: var(--panda-secondary-color-10opc, hsl(164deg 67% 45% / 10%));
		box-shadow: none;
	}

	:host([theme~="secondary"][theme~="outline"]) button:hover {
		border: 2px solid var(--panda-secondary-color-hover, hsl(164deg 69% 50%));
		background: var(--panda-secondary-color-20opc, hsl(164deg 67% 45% / 20%));
	}

	:host([theme~="secondary"][theme~="outline"][disabled]) button {
		color: var(--panda-secondary-color-disabled, hsl(164deg 54% 72%));
		text-shadow: none;
		border: 2px solid var(--panda-secondary-color-disabled, hsl(196deg 28% 92%));
		background: var(--panda-secondary-color-10opc, hsl(196deg 30% 85% / 10%));
		box-shadow: none;
	}

	:host([theme~="secondary"][theme~="outline"][busy]) .spinner-cont {
		background: var(--panda-secondary-color-10opc, hsl(196deg 30% 85% / 10%));
	}

	:host([theme~="secondary"][theme~="outline"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-secondary-color-txt, hsl(0deg 0% 29%));
	}

	/* DONE */

	:host([theme~="done"]) button {
		color: var(--panda-action-color-done-txt, hsl(0deg 0% 100%));
		text-shadow: 0px 1px 1px var(--panda-shadow-color-50opc, hsl(0deg 0% 0% / 50%));
		background: var(--panda-action-color-done, hsl(164deg 67% 45%));
		box-shadow: 0px 2px 4px var(--panda-action-color-done-50opc, hsl(164deg 67% 45% / 50%));
	}

	:host([theme~="done"]) button:hover {
		color: var(--panda-action-color-done-txt-hover, hsl(0deg 0% 100%));
		background: var(--panda-action-color-done-hover, hsl(164deg 69% 50%));
	}

	:host([theme~="done"][disabled]) button {
		color: var(--panda-action-color-done-txt-disabled, hsl(0deg 0% 100%));
		text-shadow: none;
		background: var(--panda-action-color-done-disabled, hsl(164deg 54% 72%));
		box-shadow: none;
	}

	:host([theme~="done"][busy]) .spinner-cont {
		background: var(--panda-action-color-done, hsl(164deg 67% 45%));
	}

	:host([theme~="done"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-done-txt, hsl(0deg 0% 100%));
	}

	/* DONE - OUTLINE */

	:host([theme~="done"][theme~="outline"]) button {
		color: var(--panda-action-color-done, hsl(164deg 67% 45%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-done, hsl(164deg 67% 45%));
		background: var(--panda-action-color-done-10opc, hsl(164deg 67% 45% / 10%));
		box-shadow: none;
	}

	:host([theme~="done"][theme~="outline"]) button:hover {
		border: 2px solid var(--panda-action-color-done-hover, hsl(164deg 69% 50%));
		background: var(--panda-action-color-done-20opc, hsl(164deg 67% 45% / 20%));
	}

	:host([theme~="done"][theme~="outline"][disabled]) button {
		color: var(--panda-action-color-done-disabled, hsl(164deg 54% 72%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-done-disabled, hsl(164deg 54% 80%));
		background: var(--panda-action-color-done-10opc, hsl(164deg 67% 45% / 10%));
		box-shadow: none;
	}

	:host([theme~="done"][theme~="outline"][busy]) .spinner-cont {
		background: var(--panda-action-color-done-10opc, hsl(164deg 67% 45% / 10%));
	}

	:host([theme~="done"][theme~="outline"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-done, hsl(164deg 67% 45%));
	}

	/* WARN */
	
	:host([theme~="warn"]) button {
		color: var(--panda-action-color-warn-txt, hsl(0deg 0% 100%));
		text-shadow: 0px 1px 1px var(--panda-shadow-color-50opc, hsl(0deg 0% 0% / 50%));
		background: var(--panda-action-color-warn, hsl(164deg 67% 45%));
		box-shadow: 0px 2px 4px var(--panda-action-color-warn-50opc, hsl(164deg 67% 45% / 50%));
	}

	:host([theme~="warn"]) button:hover {
		color: var(--panda-action-color-warn-txt-hover, hsl(0deg 0% 100%));
		background: var(--panda-action-color-warn-hover, hsl(164deg 69% 50%));
	}

	:host([theme~="warn"][disabled]) button {
		color: var(--panda-action-color-warn-txt-disabled, hsl(0deg 0% 100%));
		text-shadow: none;
		background: var(--panda-action-color-warn-disabled, hsl(164deg 54% 72%));
		box-shadow: none;
	}

	:host([theme~="warn"][busy]) .spinner-cont {
		background: var(--panda-action-color-warn, hsl(164deg 67% 45%));
	}

	:host([theme~="warn"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-warn-txt, hsl(0deg 0% 100%));
	}

	/* WARN - OUTLINE */

	:host([theme~="warn"][theme~="outline"]) button {
		color: var(--panda-action-color-warn, hsl(164deg 67% 45%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-warn, hsl(164deg 67% 45%));
		background: var(--panda-action-color-warn-10opc, hsl(164deg 67% 45% / 10%));
		box-shadow: none;
	}

	:host([theme~="warn"][theme~="outline"]) button:hover {
		border: 2px solid var(--panda-action-color-warn-hover, hsl(164deg 69% 50%));
		background: var(--panda-action-color-warn-20opc, hsl(164deg 67% 45% / 20%));
	}

	:host([theme~="warn"][theme~="outline"][disabled]) button {
		color: var(--panda-action-color-warn-disabled, hsl(164deg 54% 72%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-warn-disabled, hsl(164deg 54% 80%));
		background: var(--panda-action-color-warn-10opc, hsl(164deg 67% 45% / 10%));
		box-shadow: none;
	}

	:host([theme~="warn"][theme~="outline"][busy]) .spinner-cont {
		background: var(--panda-action-color-warn-10opc, hsl(164deg 67% 45% / 10%));
	}

	:host([theme~="warn"][theme~="outline"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-warn, hsl(164deg 67% 45%));
	}
	
	/* FAIL */
	
	:host([theme~="fail"]) button {
		color: var(--panda-action-color-fail-txt, hsl(0deg 0% 100%));
		text-shadow: 0px 1px 1px var(--panda-shadow-color-50opc, hsl(0deg 0% 0% / 50%));
		background: var(--panda-action-color-fail, hsl(164deg 67% 45%));
		box-shadow: 0px 2px 4px var(--panda-action-color-fail-50opc, hsl(164deg 67% 45% / 50%));
	}

	:host([theme~="fail"]) button:hover {
		color: var(--panda-action-color-fail-txt-hover, hsl(0deg 0% 100%));
		background: var(--panda-action-color-fail-hover, hsl(14deg 100% 68%));
	}

	:host([theme~="fail"][disabled]) button {
		color: var(--panda-action-color-fail-txt-disabled, hsl(0deg 0% 100%));
		text-shadow: none;
		background: var(--panda-action-color-fail-disabled, hsl(14deg 79% 83%));
		box-shadow: none;
	}

	:host([theme~="fail"][busy]) .spinner-cont {
		background: var(--panda-action-color-fail, hsl(14deg 77% 62%));
	}

	:host([theme~="fail"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-fail-txt, hsl(0deg 0% 100%));
	}

	/* FAIL - OUTLINE */

	:host([theme~="fail"][theme~="outline"]) button {
		color: var(--panda-action-color-fail, hsl(164deg 67% 45%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-fail, hsl(164deg 67% 45%));
		background: var(--panda-action-color-fail-10opc, hsl(164deg 67% 45% / 10%));
		box-shadow: none;
	}

	:host([theme~="fail"][theme~="outline"]) button:hover {
		border: 2px solid var(--panda-action-color-fail-hover, hsl(164deg 69% 50%));
		background: var(--panda-action-color-fail-20opc, hsl(164deg 67% 45% / 20%));
	}

	:host([theme~="fail"][theme~="outline"][disabled]) button {
		color: var(--panda-action-color-fail-disabled, hsl(164deg 54% 72%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-fail-disabled, hsl(164deg 54% 80%));
		background: var(--panda-action-color-fail-10opc, hsl(164deg 67% 45% / 10%));
		box-shadow: none;
	}

	:host([theme~="fail"][theme~="outline"][busy]) .spinner-cont {
		background: var(--panda-action-color-fail-10opc, hsl(164deg 67% 45% / 10%));
	}

	:host([theme~="fail"][theme~="outline"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-fail, hsl(164deg 67% 45%));
	}

	/* INFO */

	:host([theme~="info"]) button {
		color: var(--panda-action-color-info-txt, hsl(0deg 0% 100%));
		text-shadow: 0px 1px 1px var(--panda-shadow-color-50opc, hsl(0deg 0% 0% / 50%));
		background: var(--panda-action-color-info, hsl(164deg 67% 45%));
		box-shadow: 0px 2px 4px var(--panda-action-color-info-50opc, hsl(164deg 67% 45% / 50%));
	}

	:host([theme~="info"]) button:hover {
		color: var(--panda-action-color-info-txt-hover, hsl(0deg 0% 100%));
		background: var(--panda-action-color-info-hover, hsl(14deg 100% 68%));
	}

	:host([theme~="info"][disabled]) button {
		color: var(--panda-action-color-info-txt-disabled, hsl(0deg 0% 100%));
		text-shadow: none;
		background: var(--panda-action-color-info-disabled, hsl(14deg 79% 83%));
		box-shadow: none;
	}

	:host([theme~="info"][busy]) .spinner-cont {
		background: var(--panda-action-color-info, hsl(14deg 77% 62%));
	}

	:host([theme~="info"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-info-txt, hsl(0deg 0% 100%));
	}

	/* INFO - OUTLINE */

	:host([theme~="info"][theme~="outline"]) button {
		color: var(--panda-action-color-info, hsl(164deg 67% 45%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-info, hsl(164deg 67% 45%));
		background: var(--panda-action-color-info-10opc, hsl(164deg 67% 45% / 10%));
		box-shadow: none;
	}

	:host([theme~="info"][theme~="outline"]) button:hover {
		border: 2px solid var(--panda-action-color-info-hover, hsl(164deg 69% 50%));
		background: var(--panda-action-color-info-20opc, hsl(164deg 67% 45% / 20%));
	}

	:host([theme~="info"][theme~="outline"][disabled]) button {
		color: var(--panda-action-color-info-disabled, hsl(164deg 54% 72%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-info-disabled, hsl(164deg 54% 80%));
		background: var(--panda-action-color-info-10opc, hsl(164deg 67% 45% / 10%));
		box-shadow: none;
	}

	:host([theme~="info"][theme~="outline"][busy]) .spinner-cont {
		background: var(--panda-action-color-info-10opc, hsl(164deg 67% 45% / 10%));
	}

	:host([theme~="info"][theme~="outline"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-info, hsl(164deg 67% 45%));
	}

`; 