export const styles = /*css*/`
	:host {
		display: inline-block;
		height: var(--panda-button-height, 40px);
		user-select: none;
		outline: none;
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

		border-radius: var(--panda-button-border-radius, 10px);
		background-color: var(--panda-button-background-color-working, hsl(0deg 0% 100%));
		/* SPINNER STYLE */
		--panda-spinner-color: var(--panda-button-spinner-color, hsl(0deg 0% 100%));
		--panda-spinner-size: var(--panda-button-spinner-size, 20px);
	}

	.button {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		gap: var(--panda-button-gap, 8px);
		height: 100%;
		width: 100%;
		cursor: pointer;
		outline: none;
		overflow: hidden;
		padding: var(--panda-button-padding, 0px 16px);

		color: var(--panda-button-text-color, hsl(191deg 19% 23%));
		font-size: var(--panda-button-font-size, 16px);
		font-family: var(--panda-button-font-family, "Poppins");
		font-weight: var(--panda-button-font-weight, 500);
		text-shadow: var(--panda-button-text-shadow, "none");
		text-overflow: ellipsis;
		text-align: center;
		white-space: nowrap;
		transition: all 300ms ease-in-out;

		border-radius: var(--panda-button-border-radius, 10px);
		border-width: var(--panda-button-border-width, 1px);
		border-style: var(--panda-button-border-style, solid);
		border-color: var(--panda-button-border-color, hsl(207deg 1% 85%));
		background-color: var(--panda-button-background-color, hsl(0deg 0% 100%));
		box-shadow: var(--panda-button-elevation, none);
		box-sizing: border-box;
		/* ICON STYLES */
		--panda-icon-color: var(--panda-button-icon-color, hsl(191deg 19% 23%));
		--panda-icon-size: var(--panda-button-icon-size, 24px);
	}

	.button.has-prefix {
		padding-left: var(--panda-button-padding-prefix, 8px);
	}

	.button.has-suffix {
		padding-right: var(--panda-button-padding-suffix, 8px);
	}

	slot {
		display: block;
		height: 100%;
		overflow: hidden;
		line-height: var(--panda-button-height, 40px);
		text-overflow: ellipsis;
	}

	::slotted([slot="prefix"]),
	::slotted([slot="suffix"]) {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		user-select: none;
	}
	
	/* COMPONENT STATE */
	/* HOVER */
	.button:not(.disabled):hover {
		color: var(--panda-button-text-color-hover, hsl(191deg 19% 23%));
		text-shadow: var(--panda-button-text-shadow-hover, none);
		border-color: var(--panda-button-border-color-hover, hsl(207deg 1% 85%));
		background-color: var(--panda-button-background-color-hover, hsl(0deg 0% 100%));
		box-shadow: var(--panda-button-elevation-hover, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}
	
	/* FOCUSED */
	.button:focus-visible,
	.button:focus-visible:hover {
		color: var(--panda-button-text-color-focused, hsl(191deg 19% 23%));
		text-shadow: var(--panda-button-text-shadow-focused, none);
		border-color: var(--panda-button-border-color-focused, hsl(207deg 1% 85%));
		background-color: var(--panda-button-background-color-focused, hsl(0deg 0% 100%));
		box-shadow: var(--panda-button-outline, 0px 0px 4px 2px hsl(203deg 67% 85%));
	}

	/* ACTIVE */
	.button:not(.disabled):active {
		color: var(--panda-button-text-color-active, hsl(191deg 19% 23%));
		text-shadow: var(--panda-button-text-shadow-active, none);
		border-color: var(--panda-button-border-color-active, hsl(207deg 1% 85%));
		background-color: var(--panda-button-background-color-active, hsl(201deg 1% 97%));
		box-shadow: var(--panda-button-elevation-active, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}
	
	/* WORKING */
	.button.working:not(.disabled) {
		cursor: not-allowed;
		border-color: var(--panda-button-border-color-working, hsl(212deg 1% 95%));
		background-color: var(--panda-button-background-color-working, hsl(0deg 0% 100%));
		box-shadow: var(--panda-button-elevation-working, none);
	}

	.button.working slot { visibility: hidden; }

	/* DISABLED */
	.button.disabled {
		cursor: not-allowed;
		color: var(--panda-button-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-button-text-shadow-disabled, none);
		border-color: var(--panda-button-border-color-disabled, hsl(189deg 3% 96%));
		background-color: var(--panda-button-background-color-disabled, hsl(189deg 3% 96%));
		box-shadow: var(--panda-button-elevation-disabled, none);
		--panda-icon-color: hsl(188deg 5% 75%);
	}

	/* ============================================================================================================= */
	/* THEMES ====================================================================================================== */
	/* ============================================================================================================= */

	/* PRIMARY THEME =============================================================================================== */
	:host([theme~="primary"]) .button:not(.disabled) {
		color: var(--panda-button-primary-text-color, hsl(0deg 0% 100%));
		font-size: var(--panda-button-primary-font-size, 16px);
		font-family: var(--panda-button-primary-font-family, "Poppins");
		font-weight: var(--panda-button-primary-font-weight, 500);
		text-shadow: var(--panda-button-primary-text-shadow, none);
		border-color: var(--panda-button-primary-border-color, hsl(209deg 78% 42%));
		background-color: var(--panda-button-primary-background-color, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-primary-elevation, 0px 0px 5px hsl(0deg 0% 0% / 10%));
		/* ICON STYLES */
		--panda-icon-color: var(--panda-button-primary-icon-color, hsl(0deg 0% 100%));
		--panda-icon-size: var(--panda-button-primary-icon-size, 24px);
	}

	:host([theme~="primary"]) .spinner-cont {
		background-color: var(--panda-button-primary-background-color, hsl(209deg 78% 46%));
		/* SPINNER STYLE */
		--panda-spinner-size: var(--panda-button-primary-spinner-size, 24px);
		--panda-spinner-color: var(--panda-button-primary-spinner-color, hsl(0deg 0% 100%));
	}

	/* PRIMARY - HOVER */
	:host([theme~="primary"]) .button:not(.disabled):hover {
		color: var(--panda-button-primary-text-color-hover, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-primary-text-shadow-hover, none);
		border-color: var(--panda-button-primary-border-color-hover, hsl(209deg 78% 42%));
		background-color: var(--panda-button-primary-background-color-hover, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-primary-elevation-hover, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}

	/* PRIMARY - FOCUSED */
	:host([theme~="primary"]) .button:focus-visible,
	:host([theme~="primary"]) .button:focus-visible:hover {
		color: var(--panda-button-primary-text-color-focused, hsl(191deg 19% 23%));
		text-shadow: var(--panda-button-primary-text-shadow-focused, none);
		border-color: var(--panda-button-primary-border-color-focused, hsl(207deg 1% 85%));
		background-color: var(--panda-button-primary-background-color-focused, hsl(0deg 0% 100%));
		box-shadow: var(--panda-button-primary-outline, 0px 0px 4px 2px hsl(203deg 67% 85%));
	}
	
	/* PRIMARY - ACTIVE */
	:host([theme~="primary"]) .button:not(.disabled):active {
		color: var(--panda-button-primary-text-color-active, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-primary-text-shadow-active, none);
		border-color: var(--panda-button-primary-border-color-active, hsl(209deg 78% 42%));
		background-color: var(--panda-button-primary-background-color-active, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-primary-elevation-active, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}
	
	/* PRIMARY - DISABLED */
	:host([theme~="primary"]) .button.disabled {
		color: var(--panda-button-primary-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-button-primary-text-shadow-disabled, none);
		font-size: var(--panda-button-primary-font-size, 16px);
		border-color: var(--panda-button-primary-border-color-disabled, hsl(209deg 78% 42%));
		background-color: var(--panda-button-primary-background-color-disabled, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-primary-elevation-disabled, none);
		--panda-icon-color: hsl(188deg 5% 75%);
	}

	/* SECONDARY THEME ============================================================================================= */
	:host([theme~="secondary"]) .button:not(.disabled) {
		color: var(--panda-button-secondary-text-color, hsl(0deg 0% 100%));
		font-size: var(--panda-button-secondary-font-size, 16px);
		font-family: var(--panda-button-secondary-font-family, "Poppins");
		font-weight: var(--panda-button-secondary-font-weight, 500);
		text-shadow: var(--panda-button-secondary-text-shadow, none);
		border-color: var(--panda-button-secondary-border-color, hsl(209deg 78% 42%));
		background-color: var(--panda-button-secondary-background-color, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-secondary-elevation, 0px 0px 5px hsl(0deg 0% 0% / 10%));
		/* ICON STYLES */
		--panda-icon-color: var(--panda-button-secondary-icon-color, hsl(0deg 0% 100%));
		--panda-icon-size: var(--panda-button-secondary-icon-size, 24px);
	}

	:host([theme~="secondary"]) .spinner-cont {
		background-color: var(--panda-button-secondary-background-color, hsl(209deg 78% 46%));
		/* SPINNER STYLE */
		--panda-spinner-size: var(--panda-button-secondary-spinner-size, 24px);
		--panda-spinner-color: var(--panda-button-secondary-spinner-color, hsl(0deg 0% 100%));
	}

	/* SECONDARY - HOVER */
	:host([theme~="secondary"]) .button:not(.disabled):hover {
		color: var(--panda-button-secondary-text-color-hover, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-secondary-text-shadow-hover, none);
		border-color: var(--panda-button-secondary-border-color-hover, hsl(209deg 78% 42%));
		background-color: var(--panda-button-secondary-background-color-hover, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-secondary-elevation-hover, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}
	
	/* SECONDARY - FOCUSED */
	:host([theme~="secondary"]) .button:focus-visible,
	:host([theme~="secondary"]) .button:focus-visible:hover {
		color: var(--panda-button-secondary-text-color-focused, hsl(191deg 19% 23%));
		text-shadow: var(--panda-button-secondary-text-shadow-focused, none);
		border-color: var(--panda-button-secondary-border-color-focused, hsl(207deg 1% 85%));
		background-color: var(--panda-button-secondary-background-color-focused, hsl(0deg 0% 100%));
		box-shadow: var(--panda-button-secondary-outline, 0px 0px 2px 2px hsl(160deg 81% 43%));
	}

	/* SECONDARY - ACTIVE */
	:host([theme~="secondary"]) .button:not(.disabled):active {
		color: var(--panda-button-secondary-text-color-active, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-secondary-text-shadow-active, none);
		border-color: var(--panda-button-secondary-border-color-active, hsl(209deg 78% 42%));
		background-color: var(--panda-button-secondary-background-color-active, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-secondary-elevation-active, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}
	
	/* SECONDARY - DISABLED */
	:host([theme~="secondary"]) .button.disabled {
		color: var(--panda-button-secondary-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-button-secondary-text-shadow-disabled, none);
		font-size: var(--panda-button-secondary-font-size, 16px);
		border-color: var(--panda-button-secondary-border-color-disabled, hsl(209deg 78% 42%));
		background-color: var(--panda-button-secondary-background-color-disabled, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-secondary-elevation-disabled, none);
		--panda-icon-color: hsl(188deg 5% 75%);
	}

	/* PLAIN THEME ================================================================================================= */
	:host([theme~="plain"]) .button:not(.disabled) {
		color: var(--panda-button-plain-text-color, hsl(191deg 19% 23%));
		font-size: var(--panda-button-plain-font-size, 16px);
		font-family: var(--panda-button-plain-font-family, "Poppins");
		font-weight: var(--panda-button-plain-font-weight, 500);
		text-shadow: var(--panda-button-plain-text-shadow, none);
		border-width: var(--panda-button-plain-border-width, 1px);
		border-style: var(--panda-button-plain-border-style, solid);
		border-color: var(--panda-button-plain-border-color, transparent);
		background-color: var(--panda-button-plain-background-color, transparent);
		box-shadow: var(--panda-button-plain-elevation, none);
		/* ICON STYLES */
		--panda-icon-color: var(--panda-button-plain-icon-color, hsl(191deg 19% 23%));
		--panda-icon-size: var(--panda-button-plain-icon-size, 24px);
	}

	:host([theme~="plain"]) .spinner-cont {
		background-color: var(--panda-button-plain-background-color, transparent);
		/* SPINNER STYLE */
		--panda-spinner-size: var(--panda-button-plain-spinner-size, 24px);
		--panda-spinner-color: var(--panda-button-plain-spinner-color, hsl(191deg 19% 23%));
	}

	/* PLAIN - HOVER */
	:host([theme~="plain"]) .button:not(.disabled):not(.working):hover {
		color: var(--panda-button-plain-text-color-hover, hsl(191deg 19% 18%));
		text-shadow: var(--panda-button-plain-text-shadow-hover, none);
		border-color: var(--panda-button-plain-border-color-hover, transparent);
		background-color: var(--panda-button-plain-background-color-hover, hsl(0deg 0% 95%));
		box-shadow: var(--panda-button-plain-elevation-hover, none);
	}
	
	/* PLAIN - FOCUSED */
	:host([theme~="plain"]) .button:focus-visible {
		color: var(--panda-button-plain-text-color-focused, hsl(191deg 19% 23%));
		text-shadow: var(--panda-button-plain-text-shadow-focused, none);
		border-color: var(--panda-button-plain-border-color-focused, transparent);
		background-color: var(--panda-button-plain-background-color-focused, transparent);
		box-shadow: var(--panda-button-plain-outline, 0px 0px 2px 2px hsl(160deg 81% 43%));
	}

	/* PLAIN - ACTIVE */
	:host([theme~="plain"]) .button:not(.disabled):active {
		color: var(--panda-button-plain-text-color-active, hsl(191deg 19% 18%));
		text-shadow: var(--panda-button-plain-text-shadow-active, none);
		border-color: var(--panda-button-plain-border-color-active, transparent);
		background-color: var(--panda-button-plain-background-color-active, hsl(0deg 0% 96%));
		box-shadow: var(--panda-button-plain-elevation-active, none);
	}
	
	/* PLAIN - DISABLED */
	:host([theme~="plain"]) .button.disabled {
		color: var(--panda-button-plain-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-button-plain-text-shadow-disabled, none);
		font-size: var(--panda-button-plain-font-size, 16px);
		border-color: var(--panda-button-plain-border-color-disabled, transparent);
		background-color: var(--panda-button-plain-background-color-disabled, transparent);
		box-shadow: var(--panda-button-plain-elevation-disabled, none);
		--panda-icon-color: hsl(188deg 5% 75%);
	}

	/* ACTION COLOR THEMES ========================================================================================= */
	
	/* ACTION - INFO */
	:host([theme~="info"]) .button:not(.disabled) {
		color: var(--panda-button-action-info-text-color, hsl(0deg 0% 100%));
		font-size: var(--panda-button-action-info-font-size, 16px);
		font-family: var(--panda-button-action-info-font-family, "Poppins");
		font-weight: var(--panda-button-action-info-font-weight, 500);
		text-shadow: var(--panda-button-action-info-text-shadow, none);
		border-color: var(--panda-button-action-info-border-color, hsl(261deg 66% 63%));
		background-color: var(--panda-button-action-info-background-color, hsl(261deg 66% 58%));
		box-shadow: var(--panda-button-action-info-elevation, 0px 0px 5px hsl(0deg 0% 0% / 10%));
		/* ICON STYLES */
		--panda-icon-color: var(--panda-button-action-info-icon-color, hsl(0deg 0% 100%));
		--panda-icon-size: var(--panda-button-action-info-icon-size, 24px);
	}

	:host([theme~="info"]) .spinner-cont {
		background-color: var(--panda-button-action-info-background-color, hsl(261deg 66% 58%));
		/* SPINNER STYLE */
		--panda-spinner-size: var(--panda-button-action-info-spinner-size, 24px);
		--panda-spinner-color: var(--panda-button-action-info-spinner-color, hsl(0deg 0% 100%));
	}

	/* ACTION - INFO - HOVER */
	:host([theme~="info"]) .button:not(.disabled):hover {
		color: var(--panda-button-action-info-text-color-hover, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-info-text-shadow-hover, none);
		border-color: var(--panda-button-action-info-border-color-hover, hsl(209deg 78% 42%));
		background-color: var(--panda-button-action-info-background-color-hover, hsl(261deg 66% 58%));
		box-shadow: var(--panda-button-action-info-elevation-hover, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}

	/* ACTION - INFO - FOCUSED */
	:host([theme~="info"]) .button:focus-visible,
	:host([theme~="info"]) .button:focus-visible:hover {
		color: var(--panda-button-action-info-text-color-focused, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-info-text-shadow-focused, none);
		border-color: var(--panda-button-action-info-border-color-focused, hsl(207deg 1% 85%));
		background-color: var(--panda-button-action-info-background-color-focused, hsl(261deg 66% 58%));
		box-shadow: var(--panda-button-action-info-outline, 0px 0px 2px 2px hsl(160deg 81% 43%));
	}
	
	/* ACTION - INFO - ACTIVE */
	:host([theme~="info"]) .button:not(.disabled):active {
		color: var(--panda-button-action-info-text-color-active, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-info-text-shadow-active, none);
		border-color: var(--panda-button-action-info-border-color-active, hsl(209deg 78% 42%));
		background-color: var(--panda-button-action-info-background-color-active, hsl(261deg 66% 58%));
		box-shadow: var(--panda-button-action-info-elevation-active, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}
	
	/* ACTION - INFO - DISABLED */
	:host([theme~="info"]) .button.disabled {
		color: var(--panda-button-action-info-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-button-action-info-text-shadow-disabled, none);
		font-size: var(--panda-button-action-info-font-size, 16px);
		border-color: var(--panda-button-action-info-border-color-disabled, hsl(189deg 3% 96%));
		background-color: var(--panda-button-action-info-background-color-disabled, hsl(189deg 3% 96%));
		box-shadow: var(--panda-button-action-info-elevation-disabled, none);
		--panda-icon-color: hsl(188deg 5% 75%);
	}

	/* ACTION - DONE */
	/* ACTION - WARN */
	/* ACTION - ERROR */

	/* ICON THEMES ================================================================================================= */

	:host([theme~="icon"]) {
		width: var(--panda-button-height, 40px);
	}

	:host([theme~="icon"]) .button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0px;
		--panda-icon-size: 20px;
	}

	:host([theme~="icon"]) slot {
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: unset;
	}

	/* SIZE THEMES ================================================================================================= */

	/* SIZE-S */
	:host([theme~="size-s"]) {
		height: var(--panda-button-height-size-s, 24px);
	}

	:host([theme~="size-s"][theme~="icon"]) {
		width: var(--panda-button-height-size-s, 24px);
	}

	:host([theme~="size-s"]) slot {
		line-height: var(--panda-button-height-size-s, 24px);
	}

	:host([theme~="size-s"]) .button {
		font-size: var(--panda-button-font-size-s, 14px);
		font-family: var(--panda-button-font-family-size-s, "Poppins");
		font-weight: var(--panda-button-font-weight-size-s, 500);
		border-radius: var(--panda-button-border-radius-size-s, 5px);
		--panda-icon-size: var(--panda-button-icon-size-xl, 16px);
	}

	:host([theme~="size-s"]) .spinner-cont {
		--panda-spinner-size: var(--panda-button-spinner-size-s, 16px);
	}

	/* SIZE-L */
	:host([theme~="size-l"]) {
		height: var(--panda-button-height-size-l, 48px);
	}

	:host([theme~="size-l"][theme~="icon"]) {
		width: var(--panda-button-height-size-l, 48px);
	}

	:host([theme~="size-l"]) slot {
		line-height: var(--panda-button-height-size-l, 48px);
	}

	:host([theme~="size-l"]) .button {
		font-size: var(--panda-button-font-size-l, 16px);
		font-family: var(--panda-button-font-family-size-l, "Poppins");
		font-weight: var(--panda-button-font-weight-size-l, 500);
		border-radius: var(--panda-button-border-radius-size-l, 10px);
		--panda-icon-size: var(--panda-button-icon-size-l, 24px);
	}

	:host([theme~="size-l"]) .spinner-cont {
		--panda-spinner-size: var(--panda-button-spinner-size-l, 24px);
	}

	/* SIZE-XL */
	:host([theme~="size-xl"]) {
		height: var(--panda-button-height-size-xl, 56px);
	}

	:host([theme~="size-xl"][theme~="icon"]) {
		width: var(--panda-button-height-size-xl, 56px);
	}

	:host([theme~="size-xl"]) slot {
		line-height: var(--panda-button-height-size-xl, 56px);
	}

	:host([theme~="size-xl"]) .button {
		font-size: var(--panda-button-font-size-xl, 18px);
		font-family: var(--panda-button-font-family-size-xl, "Poppins");
		font-weight: var(--panda-button-font-weight-size-xl, 500);
		border-radius: var(--panda-button-border-radius-size-xl, 15px);
		--panda-icon-size: var(--panda-button-icon-size-xl, 32px);
	}

	:host([theme~="size-xl"]) .spinner-cont {
		--panda-spinner-size: var(--panda-button-spinner-size-xl, 32px);
	}
`;