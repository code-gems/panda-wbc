
export const styles = /*css*/`
	:host {
		display: inline-flex;
		width: fit-content;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		inset: 0px;
		justify-content: center;
		align-items: center;

		border-radius: var(--panda-chip-border-radius-size-m, var(--panda-border-radius-m, 10px));
		background: var(--panda-chip-background-working, hsl(0deg 0% 100%));
		z-index: 2;

		/* SPINNER STYLE */
		--panda-spinner-color: var(--panda-chip-spinner-color, hsl(191deg 19% 23%));
		--panda-spinner-size: var(--panda-chip-spinner-size-m, var(--panda-icon-size-m, 20px));
	}

	.chip {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: var(--panda-chip-gap-m, 0px);
		height: var(--panda-chip-size-m, var(--panda-component-size-m, 40px));
		width: var(--panda-chip-width, 100%);
		padding-block: var(--panda-chip-padding-block-m, 0px);
		padding-inline: var(--panda-chip-padding-inline-m, 1rem);
		outline: none;

		color: var(--panda-chip-text-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-chip-font-size-m, var(--panda-font-size-m, 1rem));
		font-family: var(--panda-chip-font-family-m, var(--panda-font-family, "Poppins"));
		font-weight: var(--panda-chip-font-weight-m, var(--panda-font-weight-medium, 500));

		border-width: var(--panda-chip-border-width, 1px);
		border-style: var(--panda-chip-border-style, solid);
		border-color: var(--panda-chip-border-color, var(--panda-border-color, hsl(0deg 0% 80%)));

		border-radius: var(--panda-chip-border-radius-m, var(--panda-border-radius-m, 1rem));
		background: var(--panda-chip-background, hsl(0deg 0% 100%));
		box-sizing: border-box;
	}

	.chip.closable {
		padding-right: var(--panda-chip-padding-inline-m, .25rem);
		gap: var(--panda-chip-gap-m, var(--panda-gap-m, .5rem));
	}

	.chip.with-icon {
		padding-left: var(--panda-chip-padding-inline-m, .25rem);
		gap: var(--panda-chip-gap-m, var(--panda-gap-m, .5rem));
	}

	slot {
		user-select: none;
	}

	/* ===================================================================== */
	/* CHIP ICON =========================================================== */
	/* ===================================================================== */

	.icon-cont {
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--panda-chip-icon-size-m, var(--panda-input-button-size-m, 30px));
		height: 100%;
	}

	.icon-cont .icon {
		display: flex;
		align-items: center;
		justify-content: center;
		--panda-icon-color: var(--panda-chip-icon-color, var(--panda-icon-color, hsl(210deg 5% 30%)));
		--panda-icon-size: var(--panda-chip-icon-size-m, var(--panda-icon-size-m, 20px));
	}

	/* ===================================================================== */
	/* CLOSE BUTTON ======================================================== */
	/* ===================================================================== */

	.close-button-cont {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		min-width: var(--panda-chip-button-size-m, var(--panda-input-button-size-m, 30px));
		height: 100%;
	}

	.close-button-cont .close-button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panda-chip-button-padding-m, 0px);
		width: var(--panda-chip-button-size-m, var(--panda-input-button-size-m, 30px));
		height: var(--panda-chip-button-size-m, var(--panda-input-button-size-m, 30px));
		outline: none;
		
		transition: var(--panda-chip-button-transition, all 0.3s ease-in-out);
		cursor: pointer;

		border-radius: var(--panda-chip-button-border-radius-m, var(--panda-border-radius-m, 10px));
		background: var(--panda-chip-button-background, var(--panda-input-button-background, transparent));
		box-sizing: border-box;

		/* ICON STYLES */
		--panda-icon-color: var(--panda-chip-button-icon-color, var(--panda-input-button-icon-color, hsl(191deg 19% 23%)));
		--panda-icon-size: var(--panda-chip-button-icon-size-m, var(--panda-input-button-icon-size-m, 20px));
	}

	/* CLOSE BUTTON - HOVER STATE ========================================== */
	.close-button-cont .close-button:hover {
		background: var(--panda-chip-button-background-hover, var(--panda-input-button-background-hover, hsl(210deg 5% 90%)));
		/* ICON STYLES HOVER */
		--panda-icon-color: var(--panda-chip-button-icon-color-hover, var(--panda-input-button-icon-color-hover, hsl(191deg 19% 23%)));
	}

	/* CLOSE BUTTON - FOCUS STATE ========================================== */
	.close-button-cont .close-button:focus-visible {
		box-shadow: var(--panda-chip-button-outline, var(--panda-input-button-outline, 0px 0px 0px 2px hsl(209deg 78% 46%)));
	}

	/* ============================================================================================================= */
	/* COMPONENT STATE ============================================================================================= */
	/* ============================================================================================================= */

	/* HOVER */
	.chip:not(.disabled):hover {
		border-color: var(--panda-chip-border-color-hover, var(--panda-border-color-hover, hsl(207deg 1% 80%)));
		background: var(--panda-chip-background-hover, hsl(0deg 0% 100%));
		box-shadow: var(--panda-chip-elevation-hover, none);
	}

	/* FOCUSED */
	.chip:not(.disabled):focus-visible,
	.chip:not(.disabled):focus-visible:hover {
		color: var(--panda-chip-text-color-focused, var(--panda-text-color, hsl(191deg 19% 23%)));
		text-shadow: var(--panda-chip-text-shadow-focused, none);
		border-color: var(--panda-chip-border-color-focused, var(--panda-border-color-focused, hsl(278deg 25% 30%)));
		background: var(--panda-chip-background-focused, hsl(0deg 0% 100%));
		box-shadow: var(--panda-chip-outline, var(--panda-component-outline, 0px 0px 0px 2px hsl(209deg 78% 46%)));
	}

	/* READONLY */
	.chip.readonly:not(.disabled) {
		cursor: auto;
		border-width: var(--panda-chip-border-width-readonly, 1px);
		border-style: var(--panda-chip-border-style-readonly, solid);
		border-color: var(--panda-chip-border-color-readonly, var(--panda-border-color-readonly, hsl(207deg 1% 85%)));
		background: var(--panda-chip-background-readonly, hsl(0deg 0% 100%));
		box-shadow: var(--panda-chip-elevation-readonly, none);
	}

	.chip.readonly:not(.disabled) .icon {
		--panda-icon-color: var(--panda-chip-icon-color-readonly, var(--panda-icon-color-readonly, hsl(188deg 5% 75%)));
	}

	/* DISABLED */
	.chip.disabled {
		cursor: not-allowed;
		color: var(--panda-chip-text-color-disabled, var(--panda-text-color-disabled, hsl(189deg 3% 50%)));
		border-color: var(--panda-chip-border-color-disabled, var(--panda-border-color-disabled, hsl(189deg 3% 96%)));
		background: var(--panda-chip-background-disabled, var(--panda-input-background-disabled, hsl(189deg 3% 96%)));
		box-shadow: var(--panda-chip-elevation-disabled, var(--panda-elevation-disabled, none));
	}

	.chip.disabled .icon {
		--panda-icon-color: var(--panda-chip-icon-color-disabled, var(--panda-icon-color-disabled, hsl(189deg 3% 50%)));
	}

	/* ============================================================================================================= */
	/* THEMES ====================================================================================================== */
	/* ============================================================================================================= */

	/* SIZE S */
	:host([theme~="size-s"]) .chip {
		gap: var(--panda-chip-gap-s, 0px);
		height: var(--panda-chip-size-s, var(--panda-component-size-s, 30px));
		padding-block: var(--panda-chip-padding-block-s, 0px);
		padding-inline: var(--panda-chip-padding-inline-s, .5rem);

		font-size: var(--panda-chip-font-size-s, var(--panda-font-size-s, 1rem));
		font-family: var(--panda-chip-font-family-s, var(--panda-font-family, "Poppins"));
		font-weight: var(--panda-chip-font-weight-s, var(--panda-font-weight-medium, 500));

		border-radius: var(--panda-chip-border-radius-s, var(--panda-border-radius-s, 1rem));
	}
	
	:host([theme~="size-s"]) .chip.closable {
		padding-right: var(--panda-chip-padding-inline-s, .125rem);
		gap: var(--panda-chip-gap-s, var(--panda-gap-s, .25rem));
	}

	:host([theme~="size-s"]) .chip.with-icon {
		padding-left: var(--panda-chip-padding-inline-s, .125rem);
		gap: var(--panda-chip-gap-s, var(--panda-gap-s, .25rem));
	}

	:host([theme~="size-s"]) .icon-cont {
		width: var(--panda-chip-icon-size-s, var(--panda-input-button-size-s, 25px));
	}
	
	:host([theme~="size-s"]) .icon-cont .icon {
		--panda-icon-size: var(--panda-chip-icon-size-s, var(--panda-icon-size-s, 18px));
	}
	
	:host([theme~="size-s"]) .close-button-cont {
		min-width: var(--panda-chip-button-size-s, var(--panda-input-button-size-s, 25px));
	}

	:host([theme~="size-s"]) .close-button-cont .close-button {
		padding: var(--panda-chip-button-padding-s, 0px);
		width: var(--panda-chip-button-size-s, var(--panda-input-button-size-s, 25px));
		height: var(--panda-chip-button-size-s, var(--panda-input-button-size-s, 25px));
		border-radius: var(--panda-chip-button-border-radius-s, var(--panda-border-radius-s, 5px));
		/* ICON STYLES */
		--panda-icon-size: var(--panda-chip-button-icon-size-s, var(--panda-input-button-icon-size-s, 18px));
	}

	/* SIZE L */
	:host([theme~="size-l"]) .chip {
		gap: var(--panda-chip-gap-l, 0px);
		height: var(--panda-chip-size-l, var(--panda-component-size-l, 50px));
		padding-block: var(--panda-chip-padding-block-l, 0px);
		padding-inline: var(--panda-chip-padding-inline-l, 1.5rem);

		font-size: var(--panda-chip-font-size-l, var(--panda-font-size-l, 1rem));
		font-family: var(--panda-chip-font-family-l, var(--panda-font-family, "Poppins"));
		font-weight: var(--panda-chip-font-weight-l, var(--panda-font-weight-medium, 500));

		border-radius: var(--panda-chip-border-radius-l, var(--panda-border-radius-l, 1rem));
	}

	:host([theme~="size-l"]) .chip.closable {
		padding-right: var(--panda-chip-padding-inline-l, .25rem);
		gap: var(--panda-chip-gap-l, var(--panda-gap-l, .5rem));
	}

	:host([theme~="size-l"]) .chip.with-icon {
		padding-left: var(--panda-chip-padding-inline-l, .25rem);
		gap: var(--panda-chip-gap-l, var(--panda-gap-l, .5rem));
	}

	:host([theme~="size-l"]) .icon-cont {
		width: var(--panda-chip-icon-size-l, var(--panda-input-button-size-l, 35px));
	}

	:host([theme~="size-l"]) .icon-cont .icon {
		--panda-icon-size: var(--panda-chip-icon-size-l, var(--panda-icon-size-l, 25px));
	}

	:host([theme~="size-l"]) .close-button-cont {
		min-width: var(--panda-chip-button-size-l, var(--panda-input-button-size-l, 35px));
	}

	:host([theme~="size-l"]) .close-button-cont .close-button {
		padding: var(--panda-chip-button-padding-l, 0px);
		width: var(--panda-chip-button-size-l, var(--panda-input-button-size-l, 35px));
		height: var(--panda-chip-button-size-l, var(--panda-input-button-size-l, 35px));
		border-radius: var(--panda-chip-button-border-radius-l, var(--panda-border-radius-l, 5px));
		/* ICON STYLES */
		--panda-icon-size: var(--panda-chip-button-icon-size-l, var(--panda-input-button-icon-size-l, 25px));
	}

	/* SIZE XL */
	:host([theme~="size-xl"]) .chip {
		gap: var(--panda-chip-gap-xl, 0px);
		height: var(--panda-chip-size-xl, var(--panda-component-size-xl, 60px));
		padding-block: var(--panda-chip-padding-block-xl, 0px);
		padding-inline: var(--panda-chip-padding-inline-xl, 2rem);

		font-size: var(--panda-chip-font-size-xl, var(--panda-font-size-xl, 1rem));
		font-family: var(--panda-chip-font-family-xl, var(--panda-font-family, "Poppins"));
		font-weight: var(--panda-chip-font-weight-xl, var(--panda-font-weight-medium, 500));

		border-radius: var(--panda-chip-border-radius-xl, var(--panda-border-radius-xl, 1rem));
	}

	:host([theme~="size-xl"]) .chip.closable {
		padding-right: var(--panda-chip-padding-inline-xl, .25rem);
		gap: var(--panda-chip-gap-xl, var(--panda-gap-xl, .5rem));
	}

	:host([theme~="size-xl"]) .chip.with-icon {
		padding-left: var(--panda-chip-padding-inline-xl, .25rem);
		gap: var(--panda-chip-gap-xl, var(--panda-gap-xl, .5rem));
	}

	:host([theme~="size-xl"]) .icon-cont {
		width: var(--panda-chip-icon-size-xl, var(--panda-input-button-size-xl, 40px));
	}

	:host([theme~="size-xl"]) .icon-cont .icon {
		--panda-icon-size: var(--panda-chip-icon-size-xl, var(--panda-icon-size-xl, 30px));
	}

	:host([theme~="size-xl"]) .close-button-cont {
		min-width: var(--panda-chip-button-size-xl, var(--panda-input-button-size-xl, 40px));
	}

	:host([theme~="size-xl"]) .close-button-cont .close-button {
		padding: var(--panda-chip-button-padding-xl, 0px);
		width: var(--panda-chip-button-size-xl, var(--panda-input-button-size-xl, 40px));
		height: var(--panda-chip-button-size-xl, var(--panda-input-button-size-xl, 40px));
		border-radius: var(--panda-chip-button-border-radius-xl, var(--panda-border-radius-xl, 5px));
		/* ICON STYLES */
		--panda-icon-size: var(--panda-chip-button-icon-size-xl, var(--panda-input-button-icon-size-xl, 30px));
	}

`;