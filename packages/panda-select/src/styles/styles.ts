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

		--panda-spinner-width: var(--panda-icon-size-m, 20px);
		--panda-spinner-height: var(--panda-icon-size-m, 20px);
	}

	.select {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		height: var(--panda-input-height, 30px);

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
		
		color: var(--panda-text-color, hsl(210deg 5% 25%));
		font-family: var(--panda-font-family, "Poppins");
		font-size: var(--panda-font-size-m, 14px);

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
		width: var(--panda-input-height, 30px);
		height: var(--panda-input-height, 30px);

		transition: all 200ms ease-in-out;

		--panda-icon-width: var(--panda-icon-size-m, 20px);
		--panda-icon-height: var(--panda-icon-size-m, 20px);
	}

	.select:not(.disabled) .icon { cursor: pointer; }

	.rotate {
		transform: rotate(180deg);
	}

	/* COMPONENT STATES =========================================== */
	/* DISABLED */
	:host([disabled]) .select {
		border: 1px solid var(--panda-input-border-color-disabled, hsl(0deg 0% 44%));
		background-color: var(--panda-input-background-color-disabled, hsl(0deg 0% 92%));
	}
	
	:host([disabled]) .select .input-field {
		color: var(--panda-input-text-color-disabled, hsl(0deg 0% 36%));
	}

	:host([disabled]) .select .icon {
		--panda-icon-color: var(--panda-icon-color-disabled, hsl(210deg 5% 55%));
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
		border: 1px solid var(--panda-form-validation-valid, hsl(160deg 81% 43%));
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-valid, hsl(160deg 81% 43%));
	}

	/* INVALID */
	.select[theme~="invalid"]:not([disabled]) {
		border: 1px solid var(--panda-form-validation-invalid, hsl(14deg 77% 62%));
		box-shadow: 0px 0px 0px 2px var(--panda-form-validation-invalid, hsl(14deg 77% 62%));
	}

	/* PREFIX / SUFFIX */

	::slotted([name="prefix"]),
	::slotted([name="suffix"]) {
		background-color: var(--panda-input-icon-background-color, hsl(0deg 0% 92%));
	}

	::slotted(.prefix),
	::slotted(.suffix) {
		display: flex;
		align-items: center;
		height: 100%;
		padding: var(--panda-input-padding, 0px 10px);

		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-label-font-size, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		user-select: none;

		background-color: var(--panda-background-color-700, hsl(0deg 0% 89%));
		box-sizing: border-box;
	}

	::slotted(.prefix) {
		border-radius: var(--panda-input-border-radius, 5px) 0px 0px var(--panda-input-border-radius, 5px);
		border-right: 1px solid var(--panda-input-border-color, hsl(0deg 0% 80%));
	}
	
	::slotted(.suffix) {
		border-radius: 0px var(--panda-input-border-radius, 5px) var(--panda-input-border-radius, 5px) 0px;
		border-left: 1px solid var(--panda-input-border-color, hsl(0deg 0% 80%));
	}

	::slotted(.prefix-icon),
	::slotted(.suffix-icon) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-input-height, 30px);
		height: 100%;
		flex-shrink: 0;

		--panda-icon-color: var(--panda-input-text-color, hsl(210deg 5% 25%));
		--panda-icon--width: var(--panda-icon-size-s, 18px);
		--panda-icon--height: var(--panda-icon-size-s, 18px);
	}

	::slotted(.prefix-icon) {
		margin-right: -10px;
	}
	
	::slotted(.suffix-icon) {
		margin-left: -10px;
	}
`;