export const styles = /*css*/`
	:host {
		position: sticky;
		display: inline-block;
		height: var(--panda-button-height-size-m, 40px);
		user-select: none;
		outline: none;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		inset: 0px;
		justify-content: center;
		align-items: center;

		border-radius: var(--panda-button-border-radius-size-m, 10px);
		background-color: var(--panda-button-background-color-working, hsl(0deg 0% 100%));
		/* SPINNER STYLE */
		--panda-spinner-color: var(--panda-button-spinner-color, hsl(0deg 0% 100%));
		--panda-spinner-size: var(--panda-button-spinner-size-m, 20px);
	}

	.button {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		width: 100%;
		cursor: pointer;
		outline: none;
		padding: var(--panda-button-padding-size-m, 0px 16px);

		color: var(--panda-button-text-color, hsl(191deg 19% 23%));
		font-size: var(--panda-button-font-size-m, var(--panda-font-size-m, 16px));
		font-family: var(--panda-button-font-family-size-m, var(--panda-font-family, "Poppins"));
		font-weight: var(--panda-button-font-weight-size-m, 500);
		text-shadow: var(--panda-button-text-shadow, none);
		text-overflow: ellipsis;
		text-align: center;
		white-space: nowrap;
		transition: var(--panda-button-transition, all 0.3s ease-in-out);

		border-radius: var(--panda-button-border-radius-size-m, 10px);
		border-width: var(--panda-button-border-width, 1px);
		border-style: var(--panda-button-border-style, solid);
		border-color: var(--panda-button-border-color, hsl(207deg 1% 85%));
		background: var(--panda-button-background, hsl(0deg 0% 100%));
		background-clip: padding-box;
		box-shadow: var(--panda-button-elevation, none);
		box-sizing: border-box;
		/* ICON STYLES */
		--panda-icon-color: var(--panda-button-icon-color, hsl(191deg 19% 23%));
		--panda-icon-size: var(--panda-button-icon-size-m, 20px);
	}

	.button::before {
		position: absolute;
		content: "";
		inset: 0;
		margin: calc(-1 * var(--panda-button-border-width, 1px));

		transition: var(--panda-button-border-transition, all 0.3s ease-in-out);

		border-radius: inherit;
		background: var(--panda-button-border-gradient, transparent);
		z-index: -1;
	}

	.button.with-prefix {
		padding-left: var(--panda-button-slot-padding-size-m, 8px);
	}
	
	.button.with-prefix slot[name="prefix"] {
		margin-right: var(--panda-button-gap, 8px);
	}

	.button.with-suffix {
		padding-right: var(--panda-button-slot-padding-size-m, 8px);
	}

	.button.with-prefix slot[name="suffix"] {
		margin-left: var(--panda-button-gap, 8px);
	}

	slot {
		display: block;
		height: 100%;
		overflow: hidden;
		line-height: var(--panda-button-height-size-m, 40px);
		text-overflow: ellipsis;
	}

	slot[name="prefix"],
	slot[name="suffix"] {
		flex-shrink: 0;
		flex-grow: 0;
	}

	::slotted([slot="prefix"]),
	::slotted([slot="suffix"]) {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		user-select: none;
		/* ICON STYLES */
		--panda-icon-size: var(--panda-button-icon-size-m, 20px);
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

	.button:not(.disabled):hover::before {
		background: var(--panda-button-border-gradient-hover, transparent);
	}
	
	/* FOCUSED */
	.button:focus-visible,
	.button:focus-visible:hover {
		color: var(--panda-button-text-color-focused, hsl(191deg 19% 23%));
		text-shadow: var(--panda-button-text-shadow-focused, none);
		border-color: var(--panda-button-border-color-focused, hsl(207deg 1% 85%));
		background-color: var(--panda-button-background-color-focused, hsl(0deg 0% 100%));
		box-shadow: var(--panda-button-outline, var(--panda-component-outline, 0px 0px 0px 2px hsl(209deg 78% 46% / 40%)));
	}

	.button:focus-visible::before,
	.button:focus-visible:hover::before {
		background: var(--panda-button-border-gradient-focused, transparent);
	}

	/* ACTIVE */
	.button:not(.disabled):active {
		color: var(--panda-button-text-color-active, hsl(191deg 19% 23%));
		text-shadow: var(--panda-button-text-shadow-active, none);
		border-color: var(--panda-button-border-color-active, hsl(207deg 1% 85%));
		background-color: var(--panda-button-background-color-active, hsl(201deg 1% 97%));
		box-shadow: var(--panda-button-elevation-active, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}

	.button:not(.disabled):active::before {
		background: var(--panda-button-border-gradient-active, transparent);
	}

	/* WORKING */
	.button.working:not(.disabled) {
		cursor: not-allowed;
		border-color: var(--panda-button-border-color-working, hsl(212deg 1% 95%));
		background-color: var(--panda-button-background-color-working, hsl(0deg 0% 100%));
		box-shadow: var(--panda-button-elevation-working, none);
	}

	.button.working:not(.disabled)::before {
		background: var(--panda-button-border-gradient-working, transparent);
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
		--panda-icon-color: var(--panda-button-icon-color-disabled, hsl(188deg 5% 75%));
	}

	.button.disabled::before {
		background: var(--panda-button-border-gradient-disabled, transparent);
	}

	/* ============================================================================================================= */
	/* THEMES ====================================================================================================== */
	/* ============================================================================================================= */

	/* PRIMARY THEME =============================================================================================== */
	:host([theme~="primary"]) .button:not(.disabled) {
		color: var(--panda-button-primary-text-color, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-primary-text-shadow, none);
		border-color: var(--panda-button-primary-border-color, hsl(209deg 78% 42%));
		background-color: var(--panda-button-primary-background-color, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-primary-elevation, 0px 0px 5px hsl(0deg 0% 0% / 10%));
		/* ICON STYLES */
		--panda-icon-color: var(--panda-button-primary-icon-color, hsl(0deg 0% 100%));
		--panda-icon-size: var(--panda-button-primary-icon-size, 24px);
	}

	:host([theme~="primary"]) .button:not(.disabled)::before {
		background: var(--panda-button-primary-border-gradient, transparent);
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

	:host([theme~="primary"]) .button:not(.disabled):hover::before {
		background: var(--panda-button-primary-border-gradient-hover, transparent);
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
	
	:host([theme~="primary"]) .button:focus-visible::before,
	:host([theme~="primary"]) .button:focus-visible:hover::before {
		background: var(--panda-button-primary-border-gradient-focused, transparent);
	}

	/* PRIMARY - ACTIVE */
	:host([theme~="primary"]) .button:not(.disabled):active {
		color: var(--panda-button-primary-text-color-active, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-primary-text-shadow-active, none);
		border-color: var(--panda-button-primary-border-color-active, hsl(209deg 78% 42%));
		background-color: var(--panda-button-primary-background-color-active, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-primary-elevation-active, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}
	
	:host([theme~="primary"]) .button:not(.disabled):active::before {
		background: var(--panda-button-primary-border-gradient-active, transparent);
	}

	/* PRIMARY - DISABLED */
	:host([theme~="primary"]) .button.disabled {
		color: var(--panda-button-primary-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-button-primary-text-shadow-disabled, none);
		border-color: var(--panda-button-primary-border-color-disabled, hsl(209deg 78% 42%));
		background-color: var(--panda-button-primary-background-color-disabled, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-primary-elevation-disabled, none);
		--panda-icon-color: var(--panda-button-primary-icon-color-disabled, hsl(188deg 5% 75%));
	}
	
	:host([theme~="primary"]) .button.disabled::before {
		background: var(--panda-button-primary-border-gradient-disabled, transparent);
	}

	/* SECONDARY THEME ============================================================================================= */
	:host([theme~="secondary"]) .button:not(.disabled) {
		color: var(--panda-button-secondary-text-color, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-secondary-text-shadow, none);
		border-color: var(--panda-button-secondary-border-color, hsl(209deg 78% 42%));
		background-color: var(--panda-button-secondary-background-color, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-secondary-elevation, 0px 0px 5px hsl(0deg 0% 0% / 10%));
		/* ICON STYLES */
		--panda-icon-color: var(--panda-button-secondary-icon-color, hsl(0deg 0% 100%));
		--panda-icon-size: var(--panda-button-secondary-icon-size, 24px);
	}

	:host([theme~="secondary"]) .button:not(.disabled)::before {
		background: var(--panda-button-secondary-border-gradient, transparent);
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

	:host([theme~="secondary"]) .button:not(.disabled):hover::before {
		background: var(--panda-button-secondary-border-gradient-hover, transparent);
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

	:host([theme~="secondary"]) .button:focus-visible::before,
	:host([theme~="secondary"]) .button:focus-visible:hover::before {
		background: var(--panda-button-secondary-border-gradient-focused, transparent);
	}

	/* SECONDARY - ACTIVE */
	:host([theme~="secondary"]) .button:not(.disabled):active {
		color: var(--panda-button-secondary-text-color-active, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-secondary-text-shadow-active, none);
		border-color: var(--panda-button-secondary-border-color-active, hsl(209deg 78% 42%));
		background-color: var(--panda-button-secondary-background-color-active, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-secondary-elevation-active, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}

	:host([theme~="secondary"]) .button:not(.disabled):active::before {
		background: var(--panda-button-secondary-border-gradient-active, transparent);
	}
	
	/* SECONDARY - DISABLED */
	:host([theme~="secondary"]) .button.disabled {
		color: var(--panda-button-secondary-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-button-secondary-text-shadow-disabled, none);
		border-color: var(--panda-button-secondary-border-color-disabled, hsl(209deg 78% 42%));
		background-color: var(--panda-button-secondary-background-color-disabled, hsl(209deg 78% 46%));
		box-shadow: var(--panda-button-secondary-elevation-disabled, none);
		--panda-icon-color: var(--panda-button-secondary-icon-color-disabled, hsl(188deg 5% 75%));
	}

	:host([theme~="secondary"]) .button.disabled::before {
		background: var(--panda-button-secondary-border-gradient-disabled, transparent);
	}

	/* PLAIN THEME ================================================================================================= */
	:host([theme~="plain"]) .button:not(.disabled) {
		color: var(--panda-button-plain-text-color, hsl(191deg 19% 23%));
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

	:host([theme~="plain"]) .button:not(.disabled)::before {
		background: var(--panda-button-plain-border-gradient, transparent);
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

	:host([theme~="plain"]) .button:not(.disabled):hover::before {
		background: var(--panda-button-plain-border-gradient-hover, transparent);
	}
	
	/* PLAIN - FOCUSED */
	:host([theme~="plain"]) .button:focus-visible,
	:host([theme~="plain"]) .button:focus-visible:hover {
		color: var(--panda-button-plain-text-color-focused, hsl(191deg 19% 23%));
		text-shadow: var(--panda-button-plain-text-shadow-focused, none);
		border-color: var(--panda-button-plain-border-color-focused, transparent);
		background-color: var(--panda-button-plain-background-color-focused, transparent);
		box-shadow: var(--panda-button-plain-outline, 0px 0px 2px 2px hsl(160deg 81% 43%));
	}

	:host([theme~="plain"]) .button:focus-visible::before,
	:host([theme~="plain"]) .button:focus-visible:hover::before {
		background: var(--panda-button-plain-border-gradient-focused, transparent);
	}

	/* PLAIN - ACTIVE */
	:host([theme~="plain"]) .button:not(.disabled):active {
		color: var(--panda-button-plain-text-color-active, hsl(191deg 19% 18%));
		text-shadow: var(--panda-button-plain-text-shadow-active, none);
		border-color: var(--panda-button-plain-border-color-active, transparent);
		background-color: var(--panda-button-plain-background-color-active, hsl(0deg 0% 96%));
		box-shadow: var(--panda-button-plain-elevation-active, none);
	}

	:host([theme~="plain"]) .button:not(.disabled):active::before {
		background: var(--panda-button-plain-border-gradient-active, transparent);
	}
	
	/* PLAIN - DISABLED */
	:host([theme~="plain"]) .button.disabled {
		color: var(--panda-button-plain-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-button-plain-text-shadow-disabled, none);
		border-color: var(--panda-button-plain-border-color-disabled, transparent);
		background-color: var(--panda-button-plain-background-color-disabled, transparent);
		box-shadow: var(--panda-button-plain-elevation-disabled, none);
		--panda-icon-color: var(--panda-button-plain-icon-color-disabled, hsl(188deg 5% 75%));
	}

	:host([theme~="plain"]) .button.disabled::before {
		background: var(--panda-button-plain-border-gradient-disabled, transparent);
	}

	/* ACTION - INFO =============================================================================================== */
	:host([theme~="info"]) .button:not(.disabled) {
		color: var(--panda-button-action-info-text-color, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-info-text-shadow, none);
		border-color: var(--panda-button-action-info-border-color, hsl(261deg 66% 63%));
		background-color: var(--panda-button-action-info-background-color, hsl(261deg 66% 58%));
		box-shadow: var(--panda-button-action-info-elevation, 0px 0px 5px hsl(0deg 0% 0% / 10%));
		/* ICON STYLES */
		--panda-icon-color: var(--panda-button-action-info-icon-color, hsl(0deg 0% 100%));
		--panda-icon-size: var(--panda-button-action-info-icon-size, 24px);
	}

	:host([theme~="info"]) .button:not(.disabled)::before {
		background: var(--panda-button-action-info-border-gradient, transparent);
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

	:host([theme~="info"]) .button:not(.disabled):hover::before {
		background: var(--panda-button-action-info-border-gradient-hover, transparent);
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

	:host([theme~="info"]) .button:focus-visible::before,
	:host([theme~="info"]) .button:focus-visible:hover::before {
		background: var(--panda-button-action-info-border-gradient-focused, transparent);
	}
	
	/* ACTION - INFO - ACTIVE */
	:host([theme~="info"]) .button:not(.disabled):active {
		color: var(--panda-button-action-info-text-color-active, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-info-text-shadow-active, none);
		border-color: var(--panda-button-action-info-border-color-active, hsl(209deg 78% 42%));
		background-color: var(--panda-button-action-info-background-color-active, hsl(261deg 66% 58%));
		box-shadow: var(--panda-button-action-info-elevation-active, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}

	:host([theme~="info"]) .button:not(.disabled):active::before {
		background: var(--panda-button-action-info-border-gradient-active, transparent);
	}
	
	/* ACTION - INFO - DISABLED */
	:host([theme~="info"]) .button.disabled {
		color: var(--panda-button-action-info-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-button-action-info-text-shadow-disabled, none);
		border-color: var(--panda-button-action-info-border-color-disabled, hsl(189deg 3% 96%));
		background-color: var(--panda-button-action-info-background-color-disabled, hsl(189deg 3% 96%));
		box-shadow: var(--panda-button-action-info-elevation-disabled, none);
		--panda-icon-color: var(--panda-button-action-info-icon-color-disabled, hsl(188deg 5% 75%));
	}

	:host([theme~="info"]) .button.disabled::before {
		background: var(--panda-button-action-info-border-gradient-disabled, transparent);
	}

	/* ACTION - DONE =============================================================================================== */
	:host([theme~="done"]) .button:not(.disabled) {
		color: var(--panda-button-action-done-text-color, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-done-text-shadow, none);
		border-color: var(--panda-button-action-done-border-color, hsl(160deg 81% 43%));
		background-color: var(--panda-button-action-done-background-color, hsl(160deg 81% 43%));
		box-shadow: var(--panda-button-action-done-elevation, 0px 0px 5px hsl(0deg 0% 0% / 10%));
		/* ICON STYLES */
		--panda-icon-color: var(--panda-button-action-done-icon-color, hsl(0deg 0% 100%));
		--panda-icon-size: var(--panda-button-action-done-icon-size, 24px);
	}

	:host([theme~="done"]) .button:not(.disabled)::before {
		background: var(--panda-button-action-done-border-gradient, transparent);
	}

	:host([theme~="done"]) .spinner-cont {
		background-color: var(--panda-button-action-done-background-color, hsl(160deg 81% 43%));
		/* SPINNER STYLE */
		--panda-spinner-size: var(--panda-button-action-done-spinner-size, 24px);
		--panda-spinner-color: var(--panda-button-action-done-spinner-color, hsl(0deg 0% 100%));
	}

	/* ACTION - DONE - HOVER */
	:host([theme~="done"]) .button:not(.disabled):hover {
		color: var(--panda-button-action-done-text-color-hover, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-done-text-shadow-hover, none);
		border-color: var(--panda-button-action-done-border-color-hover, hsl(160deg 81% 43%));
		background-color: var(--panda-button-action-done-background-color-hover, hsl(160deg 81% 40%));
		box-shadow: var(--panda-button-action-done-elevation-hover, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}

	:host([theme~="done"]) .button:not(.disabled):hover::before {
		background: var(--panda-button-action-done-border-gradient-hover, transparent);
	}

	/* ACTION - DONE - FOCUSED */
	:host([theme~="done"]) .button:focus-visible,
	:host([theme~="done"]) .button:focus-visible:hover {
		color: var(--panda-button-action-done-text-color-focused, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-done-text-shadow-focused, none);
		border-color: var(--panda-button-action-done-border-color-focused, hsl(160deg 81% 43%));
		background-color: var(--panda-button-action-done-background-color-focused, hsl(160deg 81% 43%));
		box-shadow: var(--panda-button-action-done-outline, 0px 0px 2px 2px hsl(0deg 0% 0% / 10%));
	}

	:host([theme~="done"]) .button:focus-visible::before,
	:host([theme~="done"]) .button:focus-visible:hover::before {
		background: var(--panda-button-action-done-border-gradient-focused, transparent);
	}
	
	/* ACTION - DONE - ACTIVE */
	:host([theme~="done"]) .button:not(.disabled):active {
		color: var(--panda-button-action-done-text-color-active, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-done-text-shadow-active, none);
		border-color: var(--panda-button-action-done-border-color-active, hsl(160deg 81% 43%));
		background-color: var(--panda-button-action-done-background-color-active, hsl(160deg 81% 35%));
		box-shadow: var(--panda-button-action-done-elevation-active, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}

	:host([theme~="done"]) .button:not(.disabled):active::before {
		background: var(--panda-button-action-done-border-gradient-active, transparent);
	}
	
	/* ACTION - DONE - DISABLED */
	:host([theme~="done"]) .button.disabled {
		color: var(--panda-button-action-done-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-button-action-done-text-shadow-disabled, none);
		border-color: var(--panda-button-action-done-border-color-disabled, hsl(189deg 3% 96%));
		background-color: var(--panda-button-action-done-background-color-disabled, hsl(189deg 3% 96%));
		box-shadow: var(--panda-button-action-done-elevation-disabled, none);
		--panda-icon-color: var(--panda-button-action-done-icon-color-disabled, hsl(188deg 5% 75%));
	}

	:host([theme~="done"]) .button.disabled::before {
		background: var(--panda-button-action-done-border-gradient-disabled, transparent);
	}
	
	/* ACTION - WARN =============================================================================================== */
	:host([theme~="warn"]) .button:not(.disabled) {
		color: var(--panda-button-action-warn-text-color, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-warn-text-shadow, none);
		border-color: var(--panda-button-action-warn-border-color, hsl(35deg 91% 62%));
		background-color: var(--panda-button-action-warn-background-color, hsl(35deg 91% 62%));
		box-shadow: var(--panda-button-action-warn-elevation, 0px 0px 5px hsl(0deg 0% 0% / 10%));
		/* ICON STYLES */
		--panda-icon-color: var(--panda-button-action-warn-icon-color, hsl(0deg 0% 100%));
		--panda-icon-size: var(--panda-button-action-warn-icon-size, 24px);
	}

	:host([theme~="warn"]) .button:not(.disabled)::before {
		background: var(--panda-button-action-warn-border-gradient, transparent);
	}

	:host([theme~="warn"]) .spinner-cont {
		background-color: var(--panda-button-action-warn-background-color, hsl(35deg 91% 62%));
		/* SPINNER STYLE */
		--panda-spinner-size: var(--panda-button-action-warn-spinner-size, 24px);
		--panda-spinner-color: var(--panda-button-action-warn-spinner-color, hsl(0deg 0% 100%));
	}

	/* ACTION - WARN - HOVER */
	:host([theme~="warn"]) .button:not(.disabled):hover {
		color: var(--panda-button-action-warn-text-color-hover, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-warn-text-shadow-hover, none);
		border-color: var(--panda-button-action-warn-border-color-hover, hsl(35deg 91% 62%));
		background-color: var(--panda-button-action-warn-background-color-hover, hsl(35deg 91% 57%));
		box-shadow: var(--panda-button-action-warn-elevation-hover, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}

	:host([theme~="warn"]) .button:not(.disabled):hover::before {
		background: var(--panda-button-action-warn-border-gradient-hover, transparent);
	}

	/* ACTION - WARN - FOCUSED */
	:host([theme~="warn"]) .button:focus-visible,
	:host([theme~="warn"]) .button:focus-visible:hover {
		color: var(--panda-button-action-warn-text-color-focused, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-warn-text-shadow-focused, none);
		border-color: var(--panda-button-action-warn-border-color-focused, hsl(35deg 91% 62%));
		background-color: var(--panda-button-action-warn-background-color-focused, hsl(35deg 91% 62%));
		box-shadow: var(--panda-button-action-warn-outline, 0px 0px 2px 2px hsl(160deg 81% 43%));
	}

	:host([theme~="warn"]) .button:focus-visible::before,
	:host([theme~="warn"]) .button:focus-visible:hover::before {
		background: var(--panda-button-action-warn-border-gradient-focused, transparent);
	}
	
	/* ACTION - WARN - ACTIVE */
	:host([theme~="warn"]) .button:not(.disabled):active {
		color: var(--panda-button-action-warn-text-color-active, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-warn-text-shadow-active, none);
		border-color: var(--panda-button-action-warn-border-color-active, hsl(35deg 91% 62%));
		background-color: var(--panda-button-action-warn-background-color-active, hsl(35deg 91% 52%));
		box-shadow: var(--panda-button-action-warn-elevation-active, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}

	:host([theme~="warn"]) .button:not(.disabled):active::before {
		background: var(--panda-button-action-warn-border-gradient-active, transparent);
	}
	
	/* ACTION - WARN - DISABLED */
	:host([theme~="warn"]) .button.disabled {
		color: var(--panda-button-action-warn-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-button-action-warn-text-shadow-disabled, none);
		border-color: var(--panda-button-action-warn-border-color-disabled, hsl(189deg 3% 96%));
		background-color: var(--panda-button-action-warn-background-color-disabled, hsl(189deg 3% 96%));
		box-shadow: var(--panda-button-action-warn-elevation-disabled, none);
		--panda-icon-color: var(--panda-button-action-warn-icon-color-disabled, hsl(188deg 5% 75%));
	}

	:host([theme~="warn"]) .button.disabled::before {
		background: var(--panda-button-action-warn-border-gradient-disabled, transparent);
	}

	/* ACTION - ALERT ============================================================================================== */
	:host([theme~="alert"]) .button:not(.disabled) {
		color: var(--panda-button-action-alert-text-color, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-alert-text-shadow, none);
		border-color: var(--panda-button-action-alert-border-color, hsl(14deg 77% 62%));
		background-color: var(--panda-button-action-alert-background-color, hsl(14deg 77% 62%));
		box-shadow: var(--panda-button-action-alert-elevation, 0px 0px 5px hsl(0deg 0% 0% / 10%));
		/* ICON STYLES */
		--panda-icon-color: var(--panda-button-action-alert-icon-color, hsl(0deg 0% 100%));
		--panda-icon-size: var(--panda-button-action-alert-icon-size, 24px);
	}

	:host([theme~="alert"]) .button:not(.disabled)::before {
		background: var(--panda-button-action-alert-border-gradient, transparent);
	}

	:host([theme~="alert"]) .spinner-cont {
		background-color: var(--panda-button-action-alert-background-color, hsl(14deg 77% 62%));
		/* SPINNER STYLE */
		--panda-spinner-size: var(--panda-button-action-alert-spinner-size, 24px);
		--panda-spinner-color: var(--panda-button-action-alert-spinner-color, hsl(0deg 0% 100%));
	}

	/* ACTION - ALERT - HOVER */
	:host([theme~="alert"]) .button:not(.disabled):hover {
		color: var(--panda-button-action-alert-text-color-hover, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-alert-text-shadow-hover, none);
		border-color: var(--panda-button-action-alert-border-color-hover, hsl(14deg 77% 62%));
		background-color: var(--panda-button-action-alert-background-color-hover, hsl(14deg 77% 57%));
		box-shadow: var(--panda-button-action-alert-elevation-hover, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}

	:host([theme~="alert"]) .button:not(.disabled):hover::before {
		background: var(--panda-button-action-alert-border-gradient-hover, transparent);
	}

	/* ACTION - ALERT - FOCUSED */
	:host([theme~="alert"]) .button:focus-visible,
	:host([theme~="alert"]) .button:focus-visible:hover {
		color: var(--panda-button-action-alert-text-color-focused, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-alert-text-shadow-focused, none);
		border-color: var(--panda-button-action-alert-border-color-focused, hsl(14deg 77% 62%));
		background-color: var(--panda-button-action-alert-background-color-focused, hsl(14deg 77% 62%));
		box-shadow: var(--panda-button-action-alert-outline, 0px 0px 2px 2px hsl(160deg 81% 43%));
	}

	:host([theme~="alert"]) .button:focus-visible::before,
	:host([theme~="alert"]) .button:focus-visible:hover::before {
		background: var(--panda-button-action-alert-border-gradient-focused, transparent);
	}
	
	/* ACTION - ALERT - ACTIVE */
	:host([theme~="alert"]) .button:not(.disabled):active {
		color: var(--panda-button-action-alert-text-color-active, hsl(0deg 0% 100%));
		text-shadow: var(--panda-button-action-alert-text-shadow-active, none);
		border-color: var(--panda-button-action-alert-border-color-active, hsl(14deg 77% 62%));
		background-color: var(--panda-button-action-alert-background-color-active, hsl(14deg 77% 52%));
		box-shadow: var(--panda-button-action-alert-elevation-active, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}

	:host([theme~="alert"]) .button:not(.disabled):active::before {
		background: var(--panda-button-action-alert-border-gradient-active, transparent);
	}
	
	/* ACTION - ALERT - DISABLED */
	:host([theme~="alert"]) .button.disabled {
		color: var(--panda-button-action-alert-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-button-action-alert-text-shadow-disabled, none);
		border-color: var(--panda-button-action-alert-border-color-disabled, hsl(189deg 3% 96%));
		background-color: var(--panda-button-action-alert-background-color-disabled, hsl(189deg 3% 96%));
		box-shadow: var(--panda-button-action-alert-elevation-disabled, none);
		--panda-icon-color: var(--panda-button-action-alert-icon-color-disabled, hsl(188deg 5% 75%));
	}

	:host([theme~="alert"]) .button.disabled::before {
		background: var(--panda-button-action-alert-border-gradient-disabled, transparent);
	}

	/* ICON THEMES ================================================================================================= */

	:host([theme~="icon"]) {
		width: var(--panda-button-height-size-m, 40px);
	}

	:host([theme~="icon"]) .button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0px;
		--panda-icon-size: var(--panda-button-icon-size-m, 20px);
	}
	
	:host([theme~="icon"]) slot {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		line-height: unset;
		--panda-icon-size: var(--panda-button-icon-size-m, 20px);
	}

	/* ALIGN-LEFT ================================================================================================== */
	:host([theme~="align-left"]) slot[part="slot"] {
		flex-grow: 1;
		text-align: left;
	}

	/* ALIGN-RIGHT ================================================================================================= */
	:host([theme~="align-right"]) slot[part="slot"] {
		flex-grow: 1;
		text-align: right;
	}
	
	/* ============================================================================================================= */
	/* SIZE THEMES ================================================================================================= */
	/* ============================================================================================================= */

	/* SIZE-S ====================================================================================================== */
	:host([theme~="size-s"]) {
		height: var(--panda-button-height-size-s, 24px);
	}
	
	:host([theme~="size-s"][theme~="icon"]) {
		width: var(--panda-button-height-size-s, 24px);
		height: var(--panda-button-height-size-s, 24px);
	}

	:host([theme~="size-s"]) slot {
		line-height: var(--panda-button-height-size-s, 24px);
		--panda-icon-size: var(--panda-button-icon-size-s, 16px);
	}

	:host([theme~="size-s"]) ::slotted([slot="prefix"]),
	:host([theme~="size-s"]) ::slotted([slot="suffix"]) {
		--panda-icon-size: var(--panda-button-icon-size-s, 16px);
	}

	:host([theme~="size-s"]) .button {
		padding: var(--panda-button-padding-size-s, 0px 8px);
		font-size: var(--panda-button-font-size-s, 14px);
		font-family: var(--panda-button-font-family-size-s, "Poppins");
		font-weight: var(--panda-button-font-weight-size-s, 500);
		border-radius: var(--panda-button-border-radius-size-s, 5px);
		--panda-icon-size: var(--panda-button-icon-size-s, 16px);
	}

	:host([theme~="size-s"]) .button.with-prefix {
		padding-left: var(--panda-button-slot-padding-size-s, 6px);
	}

	:host([theme~="size-s"]) .button.with-suffix {
		padding-right: var(--panda-button-slot-padding-size-s, 6px);
	}

	:host([theme~="size-s"]) .spinner-cont {
		border-radius: var(--panda-button-border-radius-size-s, 5px);
		--panda-spinner-size: var(--panda-button-spinner-size-s, 16px);
	}

	/* SIZE-L ====================================================================================================== */
	:host([theme~="size-l"]) {
		height: var(--panda-button-height-size-l, 48px);
	}
	
	:host([theme~="size-l"][theme~="icon"]) {
		width: var(--panda-button-height-size-l, 48px);
		height: var(--panda-button-height-size-l, 48px);
	}

	:host([theme~="size-l"]) slot {
		line-height: var(--panda-button-height-size-l, 48px);
		--panda-icon-size: var(--panda-button-icon-size-l, 24px);
	}

	:host([theme~="size-l"]) ::slotted([slot="prefix"]),
	:host([theme~="size-l"]) ::slotted([slot="suffix"]) {
		--panda-icon-size: var(--panda-button-icon-size-l, 24px);
	}

	:host([theme~="size-l"]) .button {
		padding: var(--panda-button-padding-size-l, 0px 16px);
		font-size: var(--panda-button-font-size-l, 16px);
		font-family: var(--panda-button-font-family-size-l, "Poppins");
		font-weight: var(--panda-button-font-weight-size-l, 500);
		border-radius: var(--panda-button-border-radius-size-l, 10px);
		--panda-icon-size: var(--panda-button-icon-size-l, 24px);
	}

	:host([theme~="size-l"]) .button.with-prefix {
		padding-left: var(--panda-button-slot-padding-size-l, 12px);
	}

	:host([theme~="size-l"]) .button.with-suffix {
		padding-right: var(--panda-button-padding-suffix-size-l, 12px);
	}

	:host([theme~="size-l"]) .spinner-cont {
		border-radius: var(--panda-button-border-radius-size-l, 10px);
		--panda-spinner-size: var(--panda-button-spinner-size-l, 24px);
	}

	/* SIZE-XL ===================================================================================================== */
	:host([theme~="size-xl"]) {
		height: var(--panda-button-height-size-xl, 56px);
	}
	
	:host([theme~="size-xl"][theme~="icon"]) {
		width: var(--panda-button-height-size-xl, 56px);
		height: var(--panda-button-height-size-xl, 56px);
	}

	:host([theme~="size-xl"]) slot {
		line-height: var(--panda-button-height-size-xl, 56px);
		--panda-icon-size: var(--panda-button-icon-size-xl, 28px);
	}

	:host([theme~="size-xl"]) ::slotted([slot="prefix"]),
	:host([theme~="size-xl"]) ::slotted([slot="suffix"]) {
		--panda-icon-size: var(--panda-button-icon-size-xl, 32px);
	}

	:host([theme~="size-xl"]) .button {
		padding: var(--panda-button-padding-size-xl, 0px 16px);
		font-size: var(--panda-button-font-size-xl, 18px);
		font-family: var(--panda-button-font-family-size-xl, "Poppins");
		font-weight: var(--panda-button-font-weight-size-xl, 500);
		border-radius: var(--panda-button-border-radius-size-xl, 15px);
		--panda-icon-size: var(--panda-button-icon-size-xl, 32px);
	}

	:host([theme~="size-xl"]) .button.with-prefix {
		padding-left: var(--panda-button-slot-padding-size-xl, 16px);
	}

	:host([theme~="size-xl"]) .button.with-suffix {
		padding-right: var(--panda-button-padding-suffix-size-xl, 16px);
	}

	:host([theme~="size-xl"]) .spinner-cont { 
		border-radius: var(--panda-button-border-radius-size-xl, 15px);
		--panda-spinner-size: var(--panda-button-spinner-size-xl, 32px);
	}
`;