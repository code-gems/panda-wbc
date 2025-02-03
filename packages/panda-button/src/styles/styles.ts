import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		height: var(--panda-component-size-m, 30px);
		user-select: none;
	}

	button {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 100%;

		color: var(--panda-text-color, hsl(210deg 5% 25%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family-bold, "Poppins");
		text-shadow: var(--panda-button-text-shadow-color, "none");
		transition: all 200ms ease-in-out;
		cursor: pointer;
		outline: none;

		border: none;
		border-radius: var(--panda-button-border-radius, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-button-background-color, hsl(196deg 100% 47%));
		box-shadow: 0px 1px 2px var(--panda-black-color-20opc, hsl(0deg 0% 0% / 20%));
	}

	.content {
		padding: 0px 15px;
		overflow: hidden;
		
		line-height: var(--panda-component-height-m, 30px);
		text-overflow: ellipsis;
		text-align: center;
		user-select: none;
		white-space: nowrap;
		flex-grow: 1;
	}

	::slotted([slot="prefix"]),
	::slotted([slot="suffix"]) {
		display: flex;
		height: var(--panda-component-height-m, 30px);
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
		background: var(--panda-primary, hsl(196deg 100% 47%));
	}

	.spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-primary-color, hsl(0deg 0% 100%));
	}

	/* COMPONENT STATE ===================================================== */
	
	/* FOCUSED */
	button:focus-visible {
		box-shadow: var(--panda-component-outline, 0px 0px 0px 2px hsl(216deg 88% 60% / 40%));
	}

	/* HOVER */
	button:hover {
		color: var(--panda-button-text-color-hover, hsl(0deg 0% 100%));
		background: var(--panda-button-background-color-hover, hsl(196deg 100% 51%));
	}

	/* ACTIVE */
	button.active:not(.disabled) {
		background-color: var(--panda-button-background-color-active);
	}

	/* DISABLED */
	:host([disabled]) { pointer-events: none; }

	:host([disabled]) button {
		color: var(--panda-primary-color-disabled, hsl(0deg 0% 100%));
		text-shadow: none;
		background: var(--panda-primary-background-disabled, hsl(196deg 88% 73%));
		box-shadow: none;
	}
	
	/* BUSY */
	:host([busy]) { pointer-events: none; }
	:host([busy]) .content,
	:host([busy]) slot { visibility: hidden; }

	/* THEMES ============================================================== */

	/* PRIMARY - OUTLINE */

	:host([theme~="outline"]) button {
		color: var(--panda-primary, hsl(196deg 100% 47%));
		text-shadow: none;
		border: 2px solid var(--panda-primary, hsl(196deg 100% 47%));
		background: var(--panda-primary-10opc, hsl(196deg 100% 47% / 10%));
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
		border: 2px solid var(--panda-secondary-color, hsl(261deg 66% 58%));
		background: var(--panda-secondary-color-10opc, hsl(261deg 66% 58% / 10%));
		box-shadow: none;
	}

	:host([theme~="secondary"][theme~="outline"]) button:hover {
		border: 2px solid var(--panda-secondary-color-hover, hsl(164deg 69% 50%));
		background: var(--panda-secondary-color-20opc, hsl(261deg 66% 58% / 20%));
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
		background: var(--panda-action-color-done, hsl(261deg 66% 58%));
		box-shadow: 0px 2px 4px var(--panda-action-color-done-50opc, hsl(261deg 66% 58% / 50%));
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
		background: var(--panda-action-color-done, hsl(261deg 66% 58%));
	}

	:host([theme~="done"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-done-txt, hsl(0deg 0% 100%));
	}

	/* DONE - OUTLINE */

	:host([theme~="done"][theme~="outline"]) button {
		color: var(--panda-action-color-done, hsl(261deg 66% 58%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-done, hsl(261deg 66% 58%));
		background: var(--panda-action-color-done-10opc, hsl(261deg 66% 58% / 10%));
		box-shadow: none;
	}

	:host([theme~="done"][theme~="outline"]) button:hover {
		border: 2px solid var(--panda-action-color-done-hover, hsl(164deg 69% 50%));
		background: var(--panda-action-color-done-20opc, hsl(261deg 66% 58% / 20%));
	}

	:host([theme~="done"][theme~="outline"][disabled]) button {
		color: var(--panda-action-color-done-disabled, hsl(164deg 54% 72%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-done-disabled, hsl(164deg 54% 80%));
		background: var(--panda-action-color-done-10opc, hsl(261deg 66% 58% / 10%));
		box-shadow: none;
	}

	:host([theme~="done"][theme~="outline"][busy]) .spinner-cont {
		background: var(--panda-action-color-done-10opc, hsl(261deg 66% 58% / 10%));
	}

	:host([theme~="done"][theme~="outline"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-done, hsl(261deg 66% 58%));
	}

	/* WARN */
	
	:host([theme~="warn"]) button {
		color: var(--panda-action-color-warn-txt, hsl(0deg 0% 100%));
		text-shadow: 0px 1px 1px var(--panda-shadow-color-50opc, hsl(0deg 0% 0% / 50%));
		background: var(--panda-action-color-warn, hsl(261deg 66% 58%));
		box-shadow: 0px 2px 4px var(--panda-action-color-warn-50opc, hsl(261deg 66% 58% / 50%));
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
		background: var(--panda-action-color-warn, hsl(261deg 66% 58%));
	}

	:host([theme~="warn"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-warn-txt, hsl(0deg 0% 100%));
	}

	/* WARN - OUTLINE */

	:host([theme~="warn"][theme~="outline"]) button {
		color: var(--panda-action-color-warn, hsl(261deg 66% 58%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-warn, hsl(261deg 66% 58%));
		background: var(--panda-action-color-warn-10opc, hsl(261deg 66% 58% / 10%));
		box-shadow: none;
	}

	:host([theme~="warn"][theme~="outline"]) button:hover {
		border: 2px solid var(--panda-action-color-warn-hover, hsl(164deg 69% 50%));
		background: var(--panda-action-color-warn-20opc, hsl(261deg 66% 58% / 20%));
	}

	:host([theme~="warn"][theme~="outline"][disabled]) button {
		color: var(--panda-action-color-warn-disabled, hsl(164deg 54% 72%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-warn-disabled, hsl(164deg 54% 80%));
		background: var(--panda-action-color-warn-10opc, hsl(261deg 66% 58% / 10%));
		box-shadow: none;
	}

	:host([theme~="warn"][theme~="outline"][busy]) .spinner-cont {
		background: var(--panda-action-color-warn-10opc, hsl(261deg 66% 58% / 10%));
	}

	:host([theme~="warn"][theme~="outline"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-warn, hsl(261deg 66% 58%));
	}
	
	/* alert */
	
	:host([theme~="alert"]) button {
		color: var(--panda-action-color-alert-txt, hsl(0deg 0% 100%));
		text-shadow: 0px 1px 1px var(--panda-shadow-color-50opc, hsl(0deg 0% 0% / 50%));
		background: var(--panda-action-color-alert, hsl(261deg 66% 58%));
		box-shadow: 0px 2px 4px var(--panda-action-color-alert-50opc, hsl(261deg 66% 58% / 50%));
	}

	:host([theme~="alert"]) button:hover {
		color: var(--panda-action-color-alert-txt-hover, hsl(0deg 0% 100%));
		background: var(--panda-action-color-alert-hover, hsl(14deg 100% 68%));
	}

	:host([theme~="alert"][disabled]) button {
		color: var(--panda-action-color-alert-txt-disabled, hsl(0deg 0% 100%));
		text-shadow: none;
		background: var(--panda-action-color-alert-disabled, hsl(14deg 79% 83%));
		box-shadow: none;
	}

	:host([theme~="alert"][busy]) .spinner-cont {
		background: var(--panda-action-color-alert, hsl(14deg 77% 62%));
	}

	:host([theme~="alert"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-alert-txt, hsl(0deg 0% 100%));
	}

	/* ALERT - OUTLINE */

	:host([theme~="alert"][theme~="outline"]) button {
		color: var(--panda-action-color-alert, hsl(261deg 66% 58%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-alert, hsl(261deg 66% 58%));
		background: var(--panda-action-color-alert-10opc, hsl(261deg 66% 58% / 10%));
		box-shadow: none;
	}

	:host([theme~="alert"][theme~="outline"]) button:hover {
		border: 2px solid var(--panda-action-color-alert-hover, hsl(164deg 69% 50%));
		background: var(--panda-action-color-alert-20opc, hsl(261deg 66% 58% / 20%));
	}

	:host([theme~="alert"][theme~="outline"][disabled]) button {
		color: var(--panda-action-color-alert-disabled, hsl(164deg 54% 72%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-alert-disabled, hsl(164deg 54% 80%));
		background: var(--panda-action-color-alert-10opc, hsl(261deg 66% 58% / 10%));
		box-shadow: none;
	}

	:host([theme~="alert"][theme~="outline"][busy]) .spinner-cont {
		background: var(--panda-action-color-alert-10opc, hsl(261deg 66% 58% / 10%));
	}

	:host([theme~="alert"][theme~="outline"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-alert, hsl(261deg 66% 58%));
	}

	/* INFO */

	:host([theme~="info"]) button {
		color: var(--panda-action-color-text-info, hsl(0deg 0% 100%));
		text-shadow: 0px 1px 1px var(--panda-black-color-50opc, hsl(0deg 0% 0% / 50%));
		background: var(--panda-action-color-info, hsl(261deg 66% 58%));
		box-shadow: 0px 2px 4px var(--panda-action-color-info-50opc, hsl(261deg 66% 58% / 50%));
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
		color: var(--panda-action-color-info, hsl(261deg 66% 58%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-info, hsl(261deg 66% 58%));
		background: var(--panda-action-color-info-10opc, hsl(261deg 66% 58% / 10%));
		box-shadow: none;
	}

	:host([theme~="info"][theme~="outline"]) button:hover {
		border: 2px solid var(--panda-action-color-info-hover, hsl(164deg 69% 50%));
		background: var(--panda-action-color-info-20opc, hsl(261deg 66% 58% / 20%));
	}

	:host([theme~="info"][theme~="outline"][disabled]) button {
		color: var(--panda-action-color-info-disabled, hsl(164deg 54% 72%));
		text-shadow: none;
		border: 2px solid var(--panda-action-color-info-disabled, hsl(164deg 54% 80%));
		background: var(--panda-action-color-info-10opc, hsl(261deg 66% 58% / 10%));
		box-shadow: none;
	}

	:host([theme~="info"][theme~="outline"][busy]) .spinner-cont {
		background: var(--panda-action-color-info-10opc, hsl(261deg 66% 58% / 10%));
	}

	:host([theme~="info"][theme~="outline"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-action-color-info, hsl(261deg 66% 58%));
	}

`; 