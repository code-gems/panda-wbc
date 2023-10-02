import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		height: fit-content;
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

	.select {
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

	.select .input-field {
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

	.select .input-field::placeholder {
		color: var(--panda-input-placeholder-color, hsl(0deg 0% 80%));
	}

	.select .icon {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-input-height, 40px);
		height: var(--panda-input-height, 40px);

		transition: all 200ms ease-in-out;
	}

	.select:not(.disabled) .icon { cursor: pointer; }

	.rotate {
		transform: rotate(180deg);
	}

	/* COMPONENT STATES =========================================== */
	/* DISABLED */
	:hover([disabled]) .select {
		border: 1px solid var(--dragon-input-border-color-disabled, hsl(0deg 0% 44%));
		background-color: var(--dragon-input-background-color-disabled, hsl(0deg 0% 92%));
	}
	
	:hover([disabled]) .select .input-field {
		color: var(--dragon-input-text-color-disabled, hsl(0deg 0% 44%));
	}

	:hover([disabled]) .select .icon {
		--dragon-icon-color: var(--dragon-icon-color-disabled, hsl(205deg 8% 64%));
	}

	/* FOCUSED */
	:host([focused]) .select {
		box-shadow: 0px 0px 0px 2px var(--panda-input-outline-color, hsl(216deg 88% 60%));
	}

	/* MANDATORY */
	:host([mandatory]) .select {
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-mandatory, hsl(35deg 91% 62%));
	}

	/* THEMES ===================================================== */
	/* VALID */
	.select[theme~="valid"]:not([disabled]) {
		border: 1px solid var(--panda-form-validation-valid, hsl(164deg 67% 45%));
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-valid, hsl(164deg 67% 45%));
	}

	/* INVALID */
	.select[theme~="invalid"]:not([disabled]) {
		border: 1px solid var(--panda-form-validation-invalid, hsl(14deg 77% 62%));
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-invalid, hsl(14deg 77% 62%));
	}
`;