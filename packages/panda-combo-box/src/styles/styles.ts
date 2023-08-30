import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
	}

	.label {
		display: block;
		line-height: 1.6em;

		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-label-font-size, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		user-select: none;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		inset: 0;
		justify-content: center;
		align-items: center;

		border-radius: var(--panda-input-border-radius, 5px);
		background-color: var(--panda-input-background-color-disabled, hsl(0deg 0% 92%));
	}

	.combo-box {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		width: fit-content;
		height: var(--panda-input-height, 40px);

		transition: all 200ms ease-in-out;

		border: 1px solid var(--panda-input-border-color, hsl(0deg 0% 80%));
		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-input-background-color, hsl(0deg 0% 100%));
		box-shadow: 0px 0px 0px 1px transparent;
		box-sizing: border-box;
	}

	.combo-box .input-field {
		width: 100%;
		height: 100%;
		padding: var(--panda-input-padding, 0px 10px);
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
		box-shadow: 0px 0px 0px 2px var(--panda-input-outline-color, hsl(216deg 88% 60%));
	}

	:host([mandatory]) .combo-box  {
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-mandatory, hsl(35deg 91% 62%));
	}
`;
