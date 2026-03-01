export const styles = /*css*/`
	:host {
		display: inline-block;
		width: 100%;
		outline: none;
		-webkit-font-smoothing: antialiased;
	}

	.label {
		display: block;
		overflow: hidden;
		line-height: var(--panda-label-line-height, 1.5rem);
		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-font-size-s, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		text-overflow: ellipsis;
		white-space: nowrap;
		user-select: none;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		inset: 0px;
		justify-content: center;
		align-items: center;

		border-radius: var(--panda-date-picker-border-radius-m, var(--panda-input-border-radius-size-m, 10px));
		background-color: var(--panda-date-picker-background-color, var(--panda-input-background-color-working, hsl(0deg 0% 100%)));
		z-index: 2;

		/* SPINNER STYLE */
		--panda-spinner-color: var(--panda-date-picker-spinner-color, var(--panda-input-spinner-color, hsl(191deg 19% 23%)));
		--panda-spinner-size: var(--panda-date-picker-spinner-size-m, var(--panda-input-spinner-size-m, 20px));
	}

	.help-text {
		flex-grow: 1;
		line-height: var(--panda-date-picker-help-text-line-height, var(--panda-input-help-text-line-height, 1.2rem));
		color: var(--panda-date-picker-help-text-color, var(--panda-input-help-text-color, hsl(191deg 19% 23%)));
		font-size: var(--panda-date-picker-help-text-font-size, var(--panda-input-help-text-font-size, 14px));
		font-family: var(--panda-date-picker-help-text-font-family, var(--panda-input-help-text-font-family, "Poppins"));
		text-shadow: var(--panda-date-picker-help-text-text-shadow, var(--panda-input-help-text-text-shadow, none));
	}

	.error-message {
		flex-grow: 1;
		line-height: var(--panda-date-picker-error-message-line-height, var(--panda-input-error-message-line-height, 1.2rem));
		color: var(--panda-date-picker-error-message-color, var(--panda-input-error-message-color, hsl(14deg 77% 62%)));
		font-size: var(--panda-date-picker-error-message-font-size, var(--panda-input-error-message-font-size, 14px));
		font-family: var(--panda-date-picker-error-message-font-family, var(--panda-input-error-message-font-family, "Poppins"));
		text-shadow: var(--panda-date-picker-error-message-text-shadow, var(--panda-input-error-message-text-shadow, none));
	}

	.date-picker {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		height: var(--panda-input-height-size-m, var(--panda-component-size-m, 40px));
		outline: none;

		transition: all 0.3s ease-in-out;

		border-radius: var(--panda-date-picker-border-radius-m, var(--panda-input-border-radius-size-m, var(--panda-border-radius-m, 5px)));
		border-width: var(--panda-date-picker-border-width, var(--panda-input-border-width, 1px));
		border-style: var(--panda-date-picker-border-style, var(--panda-input-border-style, solid));
		border-color: var(--panda-date-picker-border-color, var(--panda-input-border-color, hsl(207deg 1% 85%)));
		background-color: var(--panda-date-picker-background-color, var(--panda-input-background-color, hsl(0deg 0% 100%)));
		box-shadow: var(--panda-date-picker-elevation, var(--panda-input-elevation, none));
		box-sizing: border-box;

		/* ICON STYLES */
		--panda-icon-color: var(--panda-date-picker-icon-color, var(--panda-input-icon-color, hsl(191deg 19% 23%)));
		--panda-icon-size: var(--panda-date-picker-icon-size-m, var(--panda-input-slot-icon-size-m, 20px));
	}

	.input-wrap {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		flex-grow: 1;
	}

	.input-wrap.reverse {
		flex-flow: row-reverse nowrap;
	}

	.input-cont {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		flex-grow: 1;
	}

	.input {
		position: relative;
		width: 100%;
		height: 100%;
		padding: var(--panda-date-picker-input-padding, var(--panda-input-padding, 0px 10px));
		outline: none;

		color: var(--panda-date-picker-input-text-color, var(--panda-input-text-color, hsl(191deg 19% 23%)));
		font-size: var(--panda-date-picker-input-font-size-m, var(--panda-input-font-size-m, 14px));
		font-family: var(--panda-date-picker-input-font-family-size-m, var(--panda-input-font-family-size-m, "Poppins"));
		font-weight: var(--panda-date-picker-input-font-weight-size-m, var(--panda-input-font-weight-size-m, 500));
		text-shadow: var(--panda-date-picker-input-text-shadow-size-m, var(--panda-input-text-shadow-size-m, none));

		transition: all 300ms ease-in-out, visibility 0ms linear;

		border: none;
		background-color: transparent;
		box-sizing: border-box;
		z-index: 1;
	}
	/* input padding adjustments */
	.input.icon-left { padding-left: 0px; }
	.input.icon-right { padding-right: 0px; }
	.input.clear-button-visible { padding-right: 0px; }

	.icon-cont {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-date-picker-icon-size-m, var(--panda-component-size-m, 40px));
		height: 100%;

		transition: all 0.3s ease-in-out;
		cursor: pointer;
	}
	
	.icon-cont > .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		/* ICON STYLE */
		--panda-icon-color: var(--panda-date-picker-icon-color, var(--panda-input-icon-color, hsl(191deg 19% 23%)));
		--panda-icon-size: var(--panda-date-picker-icon-size-m, var(--panda-input-icon-size-m, 20px));
	}

	.clear-button {
		display: none;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-date-picker-clear-button-size-m, var(--panda-input-clear-button-size-m, 40px));
		height: 100%;
		margin-right: var(--panda-date-picker-clear-button-margin-right, -10px);
		z-index: 1;
	}

	.icon-left .clear-button {
		margin-right: 0px;
	}

	.clear-button.show {
		display: flex;
	}
	
	.clear-button > .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panda-date-picker-clear-button-icon-padding-m, var(--panda-input-clear-button-icon-padding-m, 0px));
		
		transition: var(--panda-date-picker-clear-button-icon-transition, var(--panda-input-clear-button-icon-transition, all 0.3s ease-in-out));
		cursor: pointer;

		border-radius: var(--panda-date-picker-clear-button-icon-border-radius, var(--panda-input-clear-button-icon-border-radius, 5px));
		background-color: var(--panda-date-picker-clear-button-icon-background-color, var(--panda-input-clear-button-icon-background-color, transparent));
		box-sizing: border-box;
		/* ICON STYLES */
		--panda-icon-color: var(--panda-date-picker-clear-button-icon-color, var(--panda-input-clear-button-icon-color, hsl(191deg 19% 23%)));
		--panda-icon-size: var(--panda-date-picker-clear-button-icon-size-m, var(--panda-input-clear-button-icon-size-m, 20px));
	}

	.clear-button:hover > .icon {
		background-color: var(--panda-date-picker-clear-button-icon-background-color-hover, var(--panda-input-clear-button-icon-background-color-hover, hsl(0deg 0% 95%)));
		/* ICON STYLES */
		--panda-icon-color: var(--panda-date-picker-clear-button-icon-color-hover, var(--panda-input-clear-button-icon-color-hover, hsl(191deg 19% 23%)));
	}

	/* PLACEHOLDER STYLES */
	.placeholder {
		position: absolute;
		inset: 0;

		color: var(--panda-date-picker-placeholder-color, var(--panda-placeholder-color, hsl(188deg 5% 75%)));
		font-size: var(--panda-date-picker-placeholder-font-size-m, var(--panda-placeholder-font-size, 14px));
		font-family: var(--panda-date-picker-placeholder-font-family-size-m, var(--panda-placeholder-font-family, "Poppins"));
		font-weight: var(--panda-date-picker-placeholder-font-weight-size-m, var(--panda-placeholder-font-weight, 500));
		text-shadow: var(--panda-date-picker-placeholder-text-shadow-size-m, var(--panda-placeholder-text-shadow, none));
		z-index: 0;
	}
	/* placeholder padding adjustments */
	.placeholder.icon-left {
		--panda-text-slider-padding-left: 0px;
	}
	.placeholder.icon-right {
		--panda-text-slider-padding-right: 0px;
	}

	.footer {
		display: flex;
		flex-flow: column;
		flex-shrink: 0;
		gap: var(--panda-date-picker-footer-gap, var(--panda-input-footer-gap, 5px));
		padding: var(--panda-date-picker-footer-padding, var(--panda-input-footer-padding, 5px));
		box-sizing: border-box;
	}

	::slotted([slot="prefix"]),
	::slotted([slot="suffix"]) {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
	}

	::slotted([slot="prefix"]) {
		background-color: var(--panda-date-picker-prefix-background-color, transparent);
	}

	::slotted([slot="suffix"]) {
		background-color: var(--panda-date-picker-suffix-background-color, transparent);
	}

	::slotted(.icon) {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: var(--panda-date-picker-height-size-m, var(--panda-component-size-m, 40px));
		height: 100%;
		padding: 0px;
	}

	/* ============================================================================================================= */
	/* COMPONENT STATE ============================================================================================= */
	/* ============================================================================================================= */

	/* HOVER */
	.date-picker:not(.disabled):hover {
		border-color: var(--panda-input-border-color-hover, hsl(207deg 1% 85%));
		background-color: var(--panda-input-background-color-hover, hsl(0deg 0% 100%));
		box-shadow: var(--panda-input-elevation-hover, 0px 0px 5px hsl(0deg 0% 0% / 10%));
		--panda-icon-color: var(--panda-input-icon-color-hover, hsl(188deg 5% 75%));
	}

	.date-picker:not(.disabled):hover .input {
		color: var(--panda-input-text-color-hover, hsl(191deg 19% 23%));
		text-shadow: var(--panda-input-text-shadow-hover, none);
	}

	.date-picker:not(.disabled):hover ::slotted([slot="prefix"]),
	.date-picker:not(.disabled):hover ::slotted([slot="suffix"]) {
		background-color: var(--panda-input-slot-background-color-hover, transparent);
	}

	/* READONLY */
	.date-picker.readonly:not(.disabled) {
		border-width: var(--panda-input-border-width-readonly, 1px);
		border-style: var(--panda-input-border-style-readonly, dashed);
		border-color: var(--panda-input-border-color-readonly, hsl(207deg 1% 85%));
		background-color: var(--panda-input-background-color-readonly, hsl(0deg 0% 100%));
		box-shadow: var(--panda-input-elevation-readonly, none);
		--panda-icon-color: var(--panda-input-icon-color-readonly, hsl(191deg 19% 23%));
	}

	.date-picker.readonly:not(.disabled) .input {
		color: var(--panda-input-text-color-readonly, hsl(191deg 19% 23%));
		text-shadow: var(--panda-input-text-shadow-readonly, none);
	}

	.date-picker.readonly:not(.disabled) ::slotted([slot="prefix"]),
	.date-picker.readonly:not(.disabled) ::slotted([slot="suffix"]) {
		color: var(--panda-input-text-color-readonly, hsl(191deg 19% 23%));
		text-shadow: var(--panda-input-text-shadow-readonly, none);
		background-color: var(--panda-input-slot-background-color-readonly, transparent);
	}

	/* FOCUSED */
	.date-picker.focused:not(.disabled):not(.readonly),
	.date-picker.focused:not(.disabled):not(.readonly):hover {
		border-color: var(--panda-input-border-color-focused, hsl(207deg 1% 85%));
		background-color: var(--panda-input-background-color-focused, hsl(0deg 0% 100%));
		box-shadow: var(--panda-input-outline, 0px 0px 4px 2px hsl(203deg 67% 85%));
		--panda-icon-color: var(--panda-input-icon-color-focused, hsl(188deg 5% 75%));
	}

	.date-picker.focused:not(.disabled) {
		box-shadow: var(--panda-input-outline, 0px 0px 4px 2px hsl(203deg 67% 85%));
	}

	.date-picker.focused:not(.disabled):not(.readonly) .input,
	.date-picker.focused:not(.disabled):not(.readonly):hover .input {
		color: var(--panda-input-text-color-focused, hsl(191deg 19% 23%));
		text-shadow: var(--panda-input-text-shadow-focused, none);
	}

	.date-picker.focused:not(.disabled):not(.readonly) ::slotted([slot="prefix"]),
	.date-picker.focused:not(.disabled):not(.readonly) ::slotted([slot="suffix"]) {
		color: var(--panda-input-text-color-focused, hsl(191deg 19% 23%));
		text-shadow: var(--panda-input-text-shadow-focused, none);
		background-color: var(--panda-input-slot-background-color-focused, transparent);
	}

	/* MANDATORY */
	.date-picker.mandatory:not(.disabled):not(.readonly) {
		border-width: var(--panda-input-border-width-mandatory, 1px);
		border-style: var(--panda-input-border-style-mandatory, solid);
		border-color: var(--panda-input-border-color-mandatory, hsl(29deg 100% 59%));
		background-color: var(--panda-input-background-color-mandatory, hsl(29deg 100% 59% / 10%));
		box-shadow: var(--panda-input-outline-mandatory, 0px 0px 2px 2px hsl(29deg 100% 59%));
		--panda-icon-color: var(--panda-input-icon-color-mandatory, hsl(29deg 100% 59%));
	}

	.date-picker.mandatory:not(.disabled):not(.readonly) ::slotted([slot="prefix"]),
	.date-picker.mandatory:not(.disabled):not(.readonly) ::slotted([slot="suffix"]) {
		background-color: var(--panda-input-slot-background-color-mandatory, transparent);
	}

	/* WORKING */
	.date-picker.working:not(.disabled) {
		cursor: not-allowed;
		border-color: var(--panda-input-border-color-working, hsl(212deg 1% 95%));
		background-color: var(--panda-input-background-color-working, hsl(0deg 0% 100%));
		box-shadow: var(--panda-input-elevation-working, none);
	}

	.date-picker.working:not(.disabled) slot { visibility: hidden; }
	.date-picker.working:not(.disabled) .input-wrap { visibility: hidden; }

	/* DISABLED */
	.date-picker.disabled {
		cursor: not-allowed;
		border-color: var(--panda-input-border-color-disabled, hsl(189deg 3% 96%));
		background-color: var(--panda-input-background-color-disabled, hsl(189deg 3% 96%));
		box-shadow: var(--panda-input-elevation-disabled, none);
		--panda-icon-color: var(--panda-input-icon-color-disabled, hsl(188deg 5% 75%));
	}

	.date-picker.disabled .input {
		color: var(--panda-input-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-input-text-shadow-disabled, none);
	}

	.date-picker.disabled .icon-cont .icon {
		cursor: not-allowed;
		--panda-icon-color: var(--panda-date-picker-icon-color-disabled, var(--panda-input-icon-color-disabled, hsl(188deg 5% 75%)));
	}

	.date-picker.disabled ::slotted([slot="prefix"]),
	.date-picker.disabled ::slotted([slot="suffix"]) {
		color: var(--panda-input-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-input-text-shadow-disabled, none);
		background-color: var(--panda-input-slot-background-color-disabled, transparent);
	}

`;