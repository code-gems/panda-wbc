import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		width: 100%;
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

	.input-cont {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		height: var(--panda-input-height, 30px);

		transition: all 200ms ease-in-out;

		border: 1px solid var(--panda-input-border-color, hsl(0deg 0% 80%));
		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-input-background-color, hsl(0deg 0% 100%));
		box-sizing: border-box;
	}

	.input-cont:not([disabled]):hover {
		border: 1px solid var(--panda-input-border-color-hover, hsl(0deg 0% 65%));
	}

	.input-cont .input-wrap {
		position: relative;
		flex-grow: 1;
	}

	.input-cont .input-field {
		position: relative;
		width: 100%;
		height: 100%;
		padding: var(--panda-input-padding, 0px 10px);
		outline: none;
		
		color: var(--panda-text-color, hsl(210deg 5% 25%));
		font-family: var(--panda-font-family, "Poppins");
		font-size: var(--panda-font-size-m, 14px);

		transition: all 200ms ease-in-out;

		border: none;
		background-color: transparent;
		box-sizing: border-box;
		z-index: 1;
	}

	/* PLACEHOLDER STYLES */
	panda-sliding-placeholder {
		position: absolute;
		inset: 0;
		z-index: 0;
	}
	
	panda-sliding-placeholder,
	.input-cont .input-field::placeholder {
		color: var(--panda-input-placeholder-color, hsl(0deg 0% 80%));
		font-family: var(--panda-font-family, "Poppins");
		font-size: var(--panda-font-size-m, 14px);
	}

	.input-cont .input-field.no-padding-left {
		padding-left: 0px;
	}

	.input-cont .icon {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-input-height, 30px);
		height: 100%;
		outline: none;
		
		transition: all 200ms ease-in-out;
		border-radius: var(--panda-border-radius-m, 5px);
	}

	.input-cont .icon:focus-visible {
		box-shadow: var(--panda-component-outline, 0px 0px 0px 2px hsl(216deg 88% 60% / 40%));
	}

	.input-cont:not(.disabled) .icon { cursor: pointer; }

	.rotate {
		transform: rotate(180deg);
	}

	/* COMPONENT STATES =========================================== */
	/* DISABLED */
	:hover([disabled]) .input-cont {
		border: 1px solid var(--panda-input-border-color-disabled, hsl(0deg 0% 44%));
		background-color: var(--panda-input-background-color-disabled, hsl(0deg 0% 92%));
	}
	
	:hover([disabled]) .input-cont .input-field {
		color: var(--panda-input-text-color-disabled, hsl(0deg 0% 36%));
	}

	:hover([disabled]) .input-cont .icon {
		--panda-icon-color: var(--panda-icon-color-disabled, hsl(210deg 5% 55%));
	}

	/* FOCUSED */
	:host([focused]) .input-cont  {
		box-shadow: var(--panda-component-outline, 0px 0px 0px 2px hsl(216deg 88% 60% / 40%));
	}

	/* MANDATORY */
	:host([mandatory]) .input-cont  {
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-mandatory, hsl(35deg 91% 62%));
	}

	/* THEMES ===================================================== */
	/* VALID */
	.input-cont[theme~="valid"]:not([disabled]) {
		border: 1px solid var(--panda-form-validation-valid, hsl(160deg 81% 43%));
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-valid, hsl(160deg 81% 43%));
	}

	/* INVALID */
	.input-cont[theme~="invalid"]:not([disabled]) {
		border: 1px solid var(--panda-form-validation-invalid, hsl(14deg 77% 62%));
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-invalid, hsl(14deg 77% 62%));
	}

	.input-cont.invalid:not(.disabled) {
		border: 1px solid var(--panda-form-validation-invalid, hsl(14deg 77% 62%));
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-invalid, hsl(14deg 77% 62%));
	}
`;
