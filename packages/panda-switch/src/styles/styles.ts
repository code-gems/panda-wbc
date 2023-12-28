import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
	}

	.label {
		display: block;
		line-height: 1.6em;
		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-font-size-s, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		user-select: none;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		justify-content: center;
		align-items: center;

		border-radius: var(--panda-input-border-radius, 4px);
		background-color: var(--panda-input-background-color-disabled, hsl(0deg 0% 92%));
	}

	input {
		visibility: hidden;
		position: absolute;
	}

	.switch-cont {
		position: relative;
		display: block;
		width: 80px;
		height: var(--panda-input-height, 30px);
	}

	.switch {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;

		cursor: pointer;
		user-select: none;
		outline: none;

		transition: all 200ms ease-in-out;

		border: 1px solid var(--panda-input-border-color);
		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-background-color-900, hsl(0deg 0% 86%));
	} 

	.switch:not([disabled]):hover {
		border: 1px solid var(--panda-input-border-color-hover, hsl(0deg 0% 65%));
	}

	.slider {
		position: absolute;
		width: calc(var(--panda-input-height, 30px) - (2 * var(--panda-padding-s, 5px)));
		height: calc(var(--panda-input-height, 30px) - (2 * var(--panda-padding-s, 5px)));
		left: var(--panda-padding-s, 5px);
		top: var(--panda-padding-s, 5px);

		transition: all 200ms ease-in-out;

		border-radius: var(--panda-border-radius-m, 5px);
		background-color: #fff;
		box-shadow: 0px 1px 2px var(--panda-black-color-20opc);
		box-sizing: border-box;
	}

	input:checked + .slider {
		transform: translateX(var(--panda-input-height, 30px));
	}

	/* COMPONENT STATES */

	/* FOCUSED STATE */
	:host([focused]) .switch {
		border: 1px solid var(--panda-input-outline-color, hsl(216deg 88% 60%));
		box-shadow: 0px 0px 1px 1px var(--panda-input-outline-color, hsl(216deg 88% 60%));
	}

	/* CHECKED STATE */
	.switch:not(.disabled).checked {
		background-color: var(--panda-primary-color);
	}

`;