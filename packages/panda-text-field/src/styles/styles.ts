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
	}

	.text-field {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		height: var(--panda-input-height, 30px);

		transition: all 200ms ease-in-out;

		border: 1px solid var(--panda-input-border-color, hsl(0deg 0% 80%));
		border-radius: var(--panda-input-border-radius, 4px);
		background-color: var(--panda-input-background-color, hsl(0deg 0% 100%));
		box-sizing: border-box;
	}

	.input {
		width: 100%;
		height: 100%;
		padding: var(--panda-input-padding, 0px 10px);

		color: var(--panda-input-text-color, hsl(0deg 0% 15%));
		font-size: var(--panda-font-size-s, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		outline: none;

		transition: all 200ms ease-in-out;

		border: none;
		border-radius: var(--panda-input-border-radius, 5px);
		background-color: transparent;
	}

	.input::placeholder {
		color: var(--panda-input-placeholder-color, hsl(0deg 0% 80%));
	}

	.text-field:not(.disabled):hover {
		border: 1px solid var(--panda-input-border-color-hover, hsl(0deg 0% 65%));
	}

	/* COMPONENT STATES */

	:host([disabled]) .text-field {
		border: 1px solid var(--panda-input-border-color-disabled, hsl(0deg 0% 80%));
		background-color: var(--panda-input-background-color-disabled, hsl(0deg 0% 92%));
	}

	:host([disabled]) .text-field .input {
		color: var(--panda-input-text-color-disabled, hsl(0deg 0% 68%));
	}

	.text-field.mandatory,
	.text-field.mandatory:hover {
		border: 1px solid var(--panda-form-validation-mandatory, hsl(29deg 100% 59%));
		box-shadow: 0px 0px 1px 1px var(--panda-form-validation-mandatory, hsl(29deg 100% 59%));
	}

	/* VALIDATION */

	.text-field[theme="valid"]:not([disabled]) {
		border: 1px solid var(--panda-form-validation-valid, hsl(151deg 74% 43%));
		box-shadow: 0px 0px 1px 1px var(--panda-form-validation-valid, hsl(151deg 74% 43%));
	}

	.text-field[theme="invalid"]:not([disabled]) {
		border: 1px solid var(--panda-form-validation-invalid, hsl(352deg 70% 45%));
		box-shadow: 0px 0px 1px 1px var(--panda-form-validation-invalid, hsl(352deg 70% 45%));
	}

	/* FOCUSED STATE */
	:host([focused]) .text-field {
		border: 1px solid var(--panda-input-outline-color, hsl(216deg 88% 60%));
		box-shadow: 0px 0px 1px 1px var(--panda-input-outline-color, hsl(216deg 88% 60%));
	}

	/* PREFIX / SUFFIX ICONS */

	::slotted([name="prefix"])
	::slotted([name="suffix"]) {
		background-color: var(--panda-input-background-color, hsl(0deg 0% 92%));
	}

	::slotted(.prefix),
	::slotted(.suffix) {
		display: flex;
		align-items: center;
		height: 100%;
		padding: var(--panda-input-padding, 0px 10px);

		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-font-size-s, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		user-select: none;

		background-color: var(--panda-background-color-700, hsl(0deg 0% 94% / 70%));
		box-sizing: border-box;
	}

	::slotted(.prefix) {
		border-radius: var(--panda-input-border-radius, 5px) 0px 0px var(--panda-input-border-radius, 5px);
		border-right: 1px solid var(--panda-input-border-color, hsl(0deg 0% 80%));
	}
	
	::slotted(.suffix) {
		border-left: 1px solid var(--panda-input-border-color, hsl(0deg 0% 80%));
		border-radius: 0px var(--panda-input-border-radius, 5px) var(--panda-input-border-radius, 5px) 0px;
	}

	::slotted(.prefix-icon),
	::slotted(.suffix-icon) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-input-height, 40px);
		height: 100%;
		flex-shrink: 0;

		--panda-icon-color: var(--panda-input-text-color, hsl(0deg 0% 15%));
		--panda-icon-width: var(--panda-icon-size-s, 18px);
		--panda-icon-height: var(--panda-icon-size-s, 18px);
	}

	::slotted(.prefix-icon) {
		margin-right: calc(var(--panda-padding-m, 10px) * -1);
	}

	::slotted(.suffix-icon) {
		margin-left: calc(var(--panda-padding-m, 10px) * -1);
	}
`; 