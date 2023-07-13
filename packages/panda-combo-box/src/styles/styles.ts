import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
	}

	.label {
		display: block;
		line-height: 1.6em;

		color: var(--panda-form-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-form-label-font-size, 12px);
		font-family: var(--panda-form-label-font-family, "Poppins");
		text-shadow: var(--panda-form-label-text-shadow, none);
		user-select: none;
	}

	.combo-box {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		width: fit-content;
		height: var(--panda-form-input-height, 40px);

		transition: all 200ms ease-in-out;

		border: 1px solid var(--panda-form-input-border-color, hsl(0deg 0% 80%));
		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-form-input-background-color, hsl(0deg 0% 100%));
		box-shadow: 0px 0px 0px 1px transparent;
		box-sizing: border-box;
	}

	.combo-box .input-field {
		width: 100%;
		height: 100%;
		padding: var(--panda-form-input-padding, 0px 10px);
		outline: none;
		flex-grow: 1;
		
		color: var(--panda-text-color, hsl(0deg 0% 29%));
		font-family: var(--panda-font-family, "Poppins");
		font-size: var(--panda-font-size-m, 14px);
		font-weight: bold;

		transition: all 200ms ease-in-out;

		border: none;
		background-color: transparent;
		box-sizing: border-box;
	}

	.combo-box .icon {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;

		cursor: pointer;
		transition: all 200ms ease-in-out;
	}

	/* COMPONENT STATES */

	:host([focused]) .combo-box  {
		box-shadow: 0px 0px 0px 2px var(--panda-form-input-outline-color, hsl(216deg 88% 60%));
	}

	:host([mandatory]) .combo-box  {
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-mandatory, hsl(35deg 91% 62%));
	}
`;
