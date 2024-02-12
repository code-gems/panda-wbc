import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		height: var(--panda-component-size-m, 30px);

		color: var(--panda-radio-button-text-color, hsl(0deg 0% 15%));
		user-select: none;
	}

	.radio-button {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		height: var(--panda-component-size-m, 30px);
		gap: var(--panda-padding-m);
		outline: none;

		border-radius: var(--panda-border-radius-m);
	}

	.radio-button .checkmark {
		position: relative;
		display: block;
		width: var(--panda-radio-button-size, 20px);
		height: var(--panda-radio-button-size, 20px);

		transition: all 200ms ease-in-out;

		border-radius: 50%;
		border-width: var(--panda-radio-button-border-width);
		border-style: var(--panda-radio-button-border-style);
		border-color: var(--panda-radio-button-border-color);

		background-color: var(--panda-radio-button-background-color);
		box-sizing: border-box;
	}

	.radio-button .checkmark::after,
	.radio-button .checkmark::before {
		position: absolute;
		display: block;
		content: " ";
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		transition: all 200ms ease-in-out;
		border-radius: 50%;
		z-index: 1;
	}

	.radio-button .checkmark::before {
		width: var(--panda-radio-button-size, 20px);
		height: var(--panda-radio-button-size, 20px);
	}

	.radio-button .checkmark::after {
		width: 0px;
		height: 0px;
		background-color: var(--panda-radio-button-dot-color);
		z-index: 2;
	}

	.radio-button:not(.disabled):hover .checkmark {
		background-color: var(--panda-radio-button-background-color-hover);
	}

	/* FOCUSED STATE */
	:host([focused]) .radio-button .checkmark {
		box-shadow: 0px 0px 0px 2px var(--panda-radio-button-outline-color);
	}

	/* CLICKED STATE */
	.radio-button.clicked:not(.disabled) .checkmark {
		transform: scale(0.8);
		box-shadow: 0px 0px 0px 3px var(--panda-radio-button-focus-ring-color);
	}

	/* CHECKED STATE */
	:host([checked]) .radio-button .checkmark {
		background-color: var(--panda-radio-button-background-color-checked);
	}

	:host([checked]) .radio-button:not(.disabled) .checkmark {
		box-shadow: 0px 0px 3px var(--panda-radio-button-color);
	}

	:host([checked]) .radio-button .checkmark::before {
		box-shadow: 0px 0px 0px 3px var(--panda-radio-button-color) inset;
	}

	:host([checked]) .radio-button .checkmark::after {
		width: 8px;
		height: 8px;
	}

	/* DISABLED STATE */
	:host([disabled]) {
		color: var(--panda-text-color-disabled, hsl(0deg 0% 66%));
	}
	
	:host([disabled]) .checkmark {
		border-color: var(--panda-radio-button-border-color-disabled, transparent);
		background-color: var(--panda-radio-button-background-color-disabled, hsl(0deg 0% 66%));
	}

	:host([disabled][checked]) .checkmark::before {
		color: var(--panda-radio-button-text-color-disabled, hsl(0deg 0% 66%));
		box-shadow: 0px 0px 0px 3px var(--panda-radio-button-color-disabled) inset;
	}

	:host([disabled][checked]) .radio-button .checkmark::after {
		background-color: var(--panda-radio-button-dot-color-disabled);
	}
`;

export const radioGroupStyles = css`
	:host {
		display: flex;
		flex-flow: column;
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

	.radio-group {
		display: flex;
		flex-flow: column;
	}

	.radio-group.horizontal {
		display: flex;
		flex-flow: row;
		gap: var(--panda-padding-m, 10px);
	}
`;