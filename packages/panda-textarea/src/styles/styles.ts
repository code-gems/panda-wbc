import { css } from "lit";

export const styles = css`
	:host {
		display: flex;
		flex-flow: column;
		width: 100%;
		user-select: none;
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

		border-radius: var(--panda-input-border-radius, 5px);
		background-color: var(--panda-input-background-color-disabled, hsl(0deg 0% 92%));

		--panda-spinner-color: var(--panda-input-text-color-disabled, hsl(0deg 0% 68%));
	}

	.textarea-cont {
		position: relative;
		display: flex;
		flex-flow: column;
		align-items: end;
		width: 100%;
		height: 100%;
		padding: var(--panda-padding-m, 10px); 

		transition: all 200ms ease-in-out;

		border: 1px solid var(--panda-input-border-color, hsl(0deg 0% 80%));
		border-radius: var(--panda-input-border-radius, 5px);
		background-color: var(--panda-input-background-color, hsl(0deg 0% 100%));
		box-sizing: border-box;
	}

	.textarea-cont.invalid {
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-invalid, hsl(14deg 77% 62%));
	}

	.textarea {
		width: 100%;
		height: 100%;

		color: var(--panda-input-text-color, hsl(0deg 0% 15%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-label-font-family, "Poppins");
		outline: none;
		resize: none;

		transition: all 200ms ease-in-out;

		border: none;
		border-radius: var(--panda-input-border-radius, 5px);
		background-color: transparent;
		box-sizing: border-box;
	}

	.textarea::placeholder {
		color: var(--panda-input-placeholder-color, hsl(0deg 0% 80%));
	}

	.counter {
		display: block;
		line-height: 1.6rem;
		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-font-size-s, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		text-align: right;
		user-select: none;
	}

	.counter.invalid {
		color: var(--panda-form-validation-invalid, hsl(14deg 77% 62%));
	}

	/* COMPONENT STATES ============================================================================================ */

	.textarea-cont.mandatory:not(.disabled):not(.busy),
	.textarea-cont.mandatory:not(.disabled):not(.busy):hover {
		border: 1px solid var(--panda-form-validation-mandatory, hsl(29deg 100% 59%));
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-mandatory, hsl(29deg 100% 59%));
	}

	:host([disabled]) .textarea-cont {
		border: 1px solid var(--panda-input-border-color-disabled, hsl(0deg 0% 80%));
		background-color: var(--panda-input-background-color-disabled, hsl(0deg 0% 92%));
	}

	:host([disabled]) .textarea-cont .textarea {
		color: var(--panda-input-text-color-disabled, hsl(0deg 0% 68%));
	}

	/* THEMES ====================================================================================================== */

	/* VALID */
	:host[theme~="valid"]:not([disabled]) .textarea-cont {
		border: 1px solid var(--panda-form-validation-valid, hsl(160deg 81% 43%));
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-valid, hsl(160deg 81% 43%));
	}

	/* MANDATORY */
	:host[theme~="mandatory"]:not([disabled]) .textarea-cont {
		border: 1px solid var(--panda-form-validation-mandatory, hsl(29deg 100% 59%));
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-mandatory, hsl(29deg 100% 59%));
	}

	/* INVALID */
	:host[theme~="invalid"]:not([disabled]) .textarea-cont {
		border: 1px solid var(--panda-form-validation-invalid, hsl(14deg 77% 62%));
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-invalid, hsl(14deg 77% 62%));
	}

	/* FOCUSED STATE */
	:host([focused]) .textarea-cont {
		box-shadow: var(--panda-outline, 0px 0px 0px 2px hsl(216deg 88% 60% / 40%));
	}

`;