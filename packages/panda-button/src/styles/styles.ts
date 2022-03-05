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
		text-overflow: ellipsis;
		text-shadow: 0px 1px 1px var(--panda-shadow-color-50opc, hsl(0deg 0% 0% / 50%));
		transition: all 200ms ease-in-out;
		cursor: pointer;

		border-radius: var(--panda-button-border-radius, 5px);
		border: none;
		background: var(--panda-primary-color, hsl(196deg 100% 47%));
		box-shadow: 0px 2px 4px var(--panda-primary-color-50opc, hsl(0deg 0% 0% / 50%));
	}

	.content {
		padding: 0px 15px;
		overflow: hidden;
		
		line-height: var(--panda-button-height-m, 40px);
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

		border-radius: var(--panda-button-border-radius, 5px);
		background: var(--panda-primary-color, hsl(196deg 100% 47%));
	}

	.spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-primary-color-txt, hsl(0deg 0% 100%));
	}

	/* HOVER STATE */
	
	button:hover {
		color: var(--panda-primary-color-txt-hover, hsl(0deg 0% 100%));
		background-color: var(--panda-primary-color-hover, hsl(196deg 100% 51%));
	}
	
	/* DISABLED STATE */

	:host([disabled]) {
		pointer-events: none;
	}
	
	:host([disabled]) button {
		color: var(--panda-primary-color-txt-disabled, hsl(0deg 0% 100%));
		text-shadow: none;
		background-color: var(--panda-primary-color-disabled, hsl(196deg 88% 73%));
		box-shadow: none;
	}
	
	/* BUSY STATE */

	:host([busy]) {
		pointer-events: none;
	}

	/* === THEMES === */
	
	/* SECONDARY */

	:host([theme="secondary"]) button {
		color: var(--panda-secondary-txt-color, hsl(0deg 0% 29%));
		text-shadow: 0px 1px 1px var(--panda-light-color, hsl(0deg 0% 100%));
		background: var(--panda-secondary-color, hsl(196deg 30% 85%));
		box-shadow: 0px 1px 2px var(--panda-shadow-color-50opc, hsl(0deg 0% 0% / 50%));
	}

	:host([theme="secondary"]) button:hover {
		color: var(--panda-secondary-color-txt-hover, hsl(0deg 0% 29%));
		background: var(--panda-secondary-color-hover, hsl(196deg 30% 90%));
	}

	:host([theme="secondary"][disabled]) button {
		color: var(--panda-secondary-color-txt-disabled, hsl(0deg 0% 64%));
		text-shadow: none;
		background-color: var(--panda-secondary-color-disabled, hsl(196deg 28% 92%));
		box-shadow: none;
	}

	:host([theme="secondary"][busy]) .spinner-cont {
		background: var(--panda-secondary-color, hsl(196deg 30% 85%));
	}

	:host([theme="secondary"][busy]) .spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-secondary-txt-color, hsl(0deg 0% 29%));
	}

`; 