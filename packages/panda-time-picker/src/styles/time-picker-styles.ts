export const styles = /*css*/`
	:host {
		display: inline-block;
		width: var(--panda-time-picker-width, 100%);
		outline: none;
		-webkit-font-smoothing: antialiased;
	}

	.label {
		display: block;
		overflow: hidden;
		line-height: var(--panda-time-picker-label-line-height, 1.5rem);
		color: var(--panda-time-picker-label-color, var(--panda-label-color, hsl(0deg 0% 50%)));
		font-size: var(--panda-time-picker-label-font-size, var(--panda-label-font-size, 12px));
		font-family: var(--panda-time-picker-label-font-family, var(--panda-label-font-family, "Poppins"));
		text-shadow: var(--panda-time-picker-label-text-shadow, var(--panda-label-text-shadow, none));
		text-overflow: ellipsis;
		white-space: nowrap;
		user-select: none;
	}

	.label.invalid {
		color: var(--panda-time-picker-label-color-invalid, var(--panda-action-color-alert, hsl(14deg 77% 62%)));
	}

	.help-text {
		line-height: var(--panda-time-picker-help-text-line-height, 1.5rem);
		color: var(--panda-time-picker-help-text-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-time-picker-help-text-font-size, var(--panda-font-size-m, 16px));
		font-family: var(--panda-time-picker-help-text-font-family, var(--panda-font-family, "Poppins"));
		text-shadow: var(--panda-time-picker-help-text-text-shadow, var(--panda-text-shadow, none));
		user-select: none;
	}

	.error-message {
		line-height: var(--panda-time-picker-error-message-line-height, 1.5rem);
		color: var(--panda-time-picker-error-message-color, var(--panda-action-color-alert, hsl(14deg 77% 62%)));
		font-size: var(--panda-time-picker-error-message-font-size, var(--panda-font-size-m, 16px));
		font-family: var(--panda-time-picker-error-message-font-family, var(--panda-font-family, "Poppins"));
		text-shadow: var(--panda-time-picker-error-message-text-shadow, var(--panda-text-shadow, none));
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
		cursor: not-allowed;

		border-radius: var(--panda-time-picker-border-radius-size-m, var(--panda-border-radius-m, 10px));
		background-color: var(--panda-time-picker-background-color-working, var(--panda-input-background-color-working, hsl(0deg 0% 100%)));
		z-index: 2;

		/* SPINNER STYLE */
		--panda-spinner-color: var(--panda-time-picker-spinner-color, var(--panda-input-icon-color-working, hsl(191deg 19% 23%)));
		--panda-spinner-size: var(--panda-time-picker-spinner-size-m, var(--panda-icon-size-m, 20px));
	}

	.time-picker {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		padding-block: var(--panda-time-picker-padding-block-m, 0);
		padding-left: var(--panda-time-picker-padding-left-m, var(--panda-gap-m, 10px));
		padding-right: var(--panda-time-picker-padding-right-m, 0px);
		height: var(--panda-time-picker-height-m, var(--panda-input-height-m, 40px));
		overflow: hidden;
		outline: none;

		transition: var(--panda-time-picker-transition, all 0.3s ease-in-out);
		cursor: text;

		border-radius: var(--panda-time-picker-border-radius-m, var(--panda-border-radius-m, 5px));
		border-width: var(--panda-time-picker-border-width, var(--panda-input-border-width, 1px));
		border-style: var(--panda-time-picker-border-style, var(--panda-input-border-style, solid));
		border-color: var(--panda-time-picker-border-color, var(--panda-input-border-color, hsl(207deg 1% 85%)));
		background-color: var(--panda-time-picker-background-color, var(--panda-input-background-color, hsl(0deg 0% 100%)));
		box-shadow: var(--panda-time-picker-elevation, var(--panda-input-elevation, none));
		box-sizing: border-box;
		/* ICON STYLE */
		--panda-icon-color: var(--panda-time-picker-icon-color, var(--panda-input-icon-color, hsl(191deg 19% 23%)));
		--panda-icon-size: var(--panda-time-picker-icon-size-m, var(--panda-input-icon-size-m, var(--panda-icon-size-m, 20px)));
	}

	.time-picker.with-prefix {
		padding-left: var(--panda-time-picker-slot-gap-m, var(--panda-input-slot-gap-m, 0px));
	}

	.time-picker.with-picker-button	{
		padding-right: var(--panda-time-picker-button-gap-m, 0px);
	}

	.time-picker .input-field {
		display: flex;
		flex-flow: row nowrap;
		flex-grow: 1;
		align-items: center;
		gap: var(--panda-time-picker-input-gap, 0px);
		color: var(--panda-time-picker-text-color, var(--panda-input-text-color, hsl(191deg 19% 23%)));
		font-size: var(--panda-time-picker-font-size-m, var(--panda-input-font-size-m, 14px));
		font-family: var(--panda-time-picker-font-family, var(--panda-input-font-family, "Poppins"));
		text-shadow: var(--panda-time-picker-text-shadow, var(--panda-input-text-shadow, none));
		line-height: var(--panda-time-picker-line-height-m, var(--panda-input-line-height-m, normal));
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
	}

	.time-picker .time-input {
		color: var(--panda-time-picker-text-color, var(--panda-input-text-color, hsl(210deg 5% 25%)));
		text-transform: var(--panda-time-picker-text-transform, uppercase);
	}

	/* PLACEHOLDER */
	.time-picker .time-input[empty] {
		color: var(--panda-time-picker-placeholder-color, var(--panda-input-placeholder-color, hsl(191deg 19% 23%)));
	}

	/* PERIOD INPUT SPECIFIC STYLES */
	.time-picker .period-input {
		margin-left: var(--panda-time-picker-period-input-gap-m, 0.25rem);
	}

	/* SLOTS */
	slot[name="prefix"],
	slot[name="suffix"] {
		flex-shrink: 0;
		flex-grow: 0;
	}

	::slotted([slot="prefix"]),
	::slotted([slot="suffix"]) {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		height: 100%;
		padding: var(--panda-input-slot-padding, 0px 10px);
		color: var(--panda-input-slot-text-color, hsl(191deg 19% 23%));
		background-color: var(--panda-input-slot-background-color, transparent);
	}

	::slotted([slot="prefix"]) {
		border-top-left-radius: var(--panda-input-border-radius-size-m, 10px);
		border-bottom-left-radius: var(--panda-input-border-radius-size-m, 10px);
	}

	::slotted([slot="suffix"]) {
		border-top-right-radius: var(--panda-input-border-radius-size-m, 10px);
		border-bottom-right-radius: var(--panda-input-border-radius-size-m, 10px);
	}

	::slotted(.icon) {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: var(--panda-time-picker-height-m, var(--panda-input-height-size-m, 40px));
		height: 100%;
		padding: 0px;
		flex-shrink: 0;
	}

	.hidden {
		visibility: hidden;
		pointer-events: none;
	}

	/* ===================================================================== */
	/* COMPONENT STATES ==================================================== */
	/* ===================================================================== */

	/* FOCUS STATE */
	.time-picker:not(.disabled):not(.invalid):not(.valid):focus-within,
	.time-picker:not(.disabled):not(.invalid):not(.valid):focus-visible,
	.time-picker:not(.disabled):not(.invalid):not(.valid):focus-visible:hover,
	:host([focus]).time-picker {
		border-color: var(--panda-time-picker-border-color-focused, var(--panda-input-border-color-focused, hsl(207deg 1% 85%)));
		box-shadow: var(--panda-time-picker-outline, var(--panda-input-outline, 0px 0px 0px 2px hsl(209deg 78% 46% / 40%)));
	}
	
	/* MANDATORY */
	.time-picker.mandatory:not(.disabled):not(.readonly):not(.working) {
		border-width: var(--panda-time-picker-border-width-mandatory, 1px);
		border-style: var(--panda-time-picker-border-style-mandatory, solid);
		border-color: var(--panda-time-picker-border-color-mandatory, var(--panda-input-border-color-mandatory, hsl(29deg 100% 59%)));
		background-color: var(--panda-time-picker-background-color-mandatory, var(--panda-input-background-color-mandatory, hsl(0deg 0% 100%)));
		box-shadow: var(--panda-time-picker-outline-mandatory, var(--panda-input-outline-mandatory, 0px 0px 1px 1px hsl(29deg 100% 59%)));
		/* ICON STYLE */
		--panda-icon-color: var(--panda-time-picker-icon-color-mandatory, var(--panda-input-icon-color-mandatory, hsl(29deg 100% 59%)));
	}

	/* READONLY STATE */
	.time-picker.readonly {
		cursor: default;
		border-color: var(--panda-time-picker-border-color-readonly, var(--panda-input-border-color-readonly, hsl(189deg 3% 96%)));
		background-color: var(--panda-time-picker-background-color-readonly, var(--panda-input-background-color-readonly, hsl(189deg 3% 96%)));
		box-shadow: var(--panda-time-picker-elevation-readonly, var(--panda-input-elevation-readonly, none));
		/* ICON STYLE */
		--panda-icon-color: var(--panda-time-picker-icon-color-readonly, var(--panda-input-icon-color-readonly, hsl(191deg 19% 23%)));
	}

	.time-picker.readonly .time-input {
		color: var(--panda-time-picker-text-color-readonly, var(--panda-input-text-color-readonly, hsl(191deg 19% 23%)));
		text-shadow: var(--panda-time-picker-text-shadow-readonly, var(--panda-input-text-shadow-readonly, none));
	}

	.time-picker.readonly  .input-field > span {
		color: var(--panda-time-picker-text-color-readonly, var(--panda-input-text-color-readonly, hsl(191deg 19% 23%)));
	}

	.time-picker.readonly ::slotted([slot="prefix"]),
	.time-picker.readonly ::slotted([slot="suffix"]) {
		color: var(--panda-time-picker-text-color-readonly, var(--panda-input-text-color-readonly, hsl(191deg 19% 23%)));
		text-shadow: var(--panda-time-picker-text-shadow-readonly, var(--panda-input-text-shadow-readonly, none));
		background-color: var(--panda-time-picker-slot-background-color-readonly, var(--panda-input-slot-background-color-readonly, transparent));
	}

	/* DISABLED STATE */
	.time-picker.disabled {
		cursor: not-allowed;
		border-color: var(--panda-time-picker-border-color-disabled, var(--panda-input-border-color-disabled, hsl(189deg 3% 96%)));
		background-color: var(--panda-time-picker-background-color-disabled, var(--panda-input-background-color-disabled, hsl(189deg 3% 96%)));
		box-shadow: var(--panda-time-picker-elevation-disabled, var(--panda-input-elevation-disabled, none));
		/* ICON STYLE */
		--panda-icon-color: var(--panda-time-picker-icon-color-disabled, var(--panda-input-icon-color-disabled, hsl(188deg 5% 75%)));
	}

	.time-picker.disabled .time-input {
		color: var(--panda-time-picker-text-color-disabled, var(--panda-input-text-color-disabled, hsl(188deg 5% 75%)));
		text-shadow: var(--panda-time-picker-text-shadow-disabled, var(--panda-input-text-shadow-disabled, none));
	}

	.time-picker.disabled  .input-field > span {
		color: var(--panda-time-picker-text-color-disabled, var(--panda-input-text-color-disabled, hsl(188deg 5% 75%)));
	}

	.time-picker.disabled ::slotted([slot="prefix"]),
	.time-picker.disabled ::slotted([slot="suffix"]) {
		color: var(--panda-time-picker-text-color-disabled, var(--panda-input-text-color-disabled, hsl(188deg 5% 75%)));
		text-shadow: var(--panda-time-picker-text-shadow-disabled, var(--panda-input-text-shadow-disabled, none));
		background-color: var(--panda-time-picker-slot-background-color-disabled, var(--panda-input-slot-background-color-disabled, transparent));
	}

	/* ===================================================================== */
	/* VALIDATION THEMES =================================================== */
	/* ===================================================================== */

	/* VALID STATE */
	.time-picker.valid,
	:host([theme~="valid"]) .time-picker {
		color: var(--panda-time-picker-color-valid, var(--panda-input-color-valid, hsl(210deg 5% 25%)));
		border-width: var(--panda-time-picker-border-width-valid, var(--panda-input-border-width-valid, 1px));
		border-style: var(--panda-time-picker-border-style-valid, var(--panda-input-border-style-valid, solid));
		border-color: var(--panda-time-picker-border-color-valid, var(--panda-input-border-color-valid, hsl(160deg 81% 43%)));
		background-color: var(--panda-time-picker-background-color-valid, var(--panda-input-background-color-valid, hsl(0deg 0% 100%)));
		box-shadow: var(--panda-time-picker-outline-valid, var(--panda-input-outline-valid, 0px 0px 1px 1px hsl(160deg 81% 43%)));
	}

	/* INVALID STATE */
	.time-picker.invalid,
	:host([theme~="invalid"]) .time-picker {
		color: var(--panda-time-picker-color-invalid, var(--panda-input-color-invalid, hsl(210deg 5% 25%)));
		border-width: var(--panda-time-picker-border-width-invalid, var(--panda-input-border-width-invalid, 1px));
		border-style: var(--panda-time-picker-border-style-invalid, var(--panda-input-border-style-invalid, solid));
		border-color: var(--panda-time-picker-border-color-invalid, var(--panda-input-border-color-invalid, hsl(14deg 77% 62%)));
		background-color: var(--panda-time-picker-background-color-invalid, var(--panda-input-background-color-invalid, hsl(0deg 0% 100%)));
		box-shadow: var(--panda-time-picker-outline-invalid, var(--panda-input-outline-invalid, 0px 0px 1px 1px hsl(14deg 77% 62%)));
	}

`;

export const pickerButtonStylers = /*css*/`
	.picker-button-cont {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-time-picker-input-height-m, var(--panda-input-height-m, 40px));
		height: 100%;
	}

	.picker-button-cont .picker-button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panda-time-picker-button-padding-m, 0px);
		width: var(--panda-time-picker-button-size-m, var(--panda-input-button-size-m, 30px));
		height: var(--panda-time-picker-button-size-m, var(--panda-input-button-size-m, 30px));
		outline: none;
		
		transition: var(--panda-time-picker-transition, all 0.3s ease-in-out);
		will-change: background-color, box-shadow;
		cursor: pointer;

		border-radius: var(--panda-time-picker-button-border-radius, var(--panda-border-radius-m, 10px));
		background-color: var(--panda-time-picker-button-background-color, transparent);
		box-sizing: border-box;

		/* ICON STYLES */
		--panda-icon-color: var(--panda-time-picker-button-icon-color, var(--panda-input-icon-color, hsl(191deg 19% 23%)));
		--panda-icon-size: var(--panda-time-picker-button-icon-size-m, var(--panda-input-icon-size-m, 20px));
	}

	/* HOVER STATE */
	.picker-button-cont:not(.disabled) .picker-button:hover {
		background-color: var(--panda-time-picker-button-background-color-hover, var(--panda-input-button-background-color-hover, hsl(210deg 5% 90%)));
		box-shadow: var(--panda-time-picker-button-elevation-hover, var(--panda-input-button-elevation-hover, none));
		--panda-icon-color: var(--panda-time-picker-button-icon-color-hover, var(--panda-input-button-icon-color-hover, hsl(191deg 19% 23%)));
	}

	/* FOCUSED STATE */
	.picker-button-cont:not(.disabled) .picker-button:focus-visible,
	.picker-button-cont:not(.disabled) .picker-button:hover:focus-visible {
		background-color: var(--panda-time-picker-button-background-color-focus, var(--panda-input-button-background-color-focus, hsl(210deg 5% 90%)));
		box-shadow: var(--panda-time-picker-button-outline, var(--panda-input-button-outline, 0px 0px 2px 2px hsl(209deg 78% 46%)));
		--panda-icon-color: var(--panda-time-picker-button-icon-color-focus, var(--panda-input-button-icon-color-focus, hsl(191deg 19% 23%)));
	}

	/* WORKING STATE */
	.picker-button-cont:not(.disabled).working .picker-button {
		display: none;
	}

	/* READ-ONLY STATE */
	.picker-button-cont:not(.disabled).readonly .picker-button {
		cursor: not-allowed;
		background-color: var(--panda-time-picker-button-background-color-readonly, var(--panda-input-button-background-color-readonly, transparent));
		box-shadow: var(--panda-time-picker-button-elevation-readonly, var(--panda-input-button-elevation-readonly, none));
		--panda-icon-color: var(--panda-time-picker-button-icon-color-readonly, var(--panda-input-button-icon-color-readonly, hsl(188deg 5% 75%)));
	}

	/* DISABLED STATE */
	.picker-button-cont.disabled .picker-button {
		cursor: not-allowed;
		background-color: var(--panda-time-picker-button-background-color-disabled, var(--panda-input-button-background-color-disabled, transparent));
		box-shadow: var(--panda-time-picker-button-elevation-disabled, var(--panda-input-button-elevation-disabled, none));
		--panda-icon-color: var(--panda-time-picker-button-icon-color-disabled, var(--panda-input-button-icon-color-disabled, hsl(188deg 5% 75%)));
	}
`;

export const clearButtonStylers = /*css*/`
	.clear-button-cont {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		min-width: var(--panda-time-picker-button-size-m, var(--panda-input-button-size-m, 30px));
		height: 100%;
	}

	.clear-button-cont.without-picker-button {
		width: var(--panda-time-picker-input-height-m, var(--panda-input-height-m, 40px));
		min-width: unset;
	}
	
	.clear-button-cont .clear-button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panda-time-picker-button-padding-m, 0px);
		width: var(--panda-time-picker-button-size-m, var(--panda-input-button-size-m, 30px));
		height: var(--panda-time-picker-button-size-m, var(--panda-input-button-size-m, 30px));
		outline: none;
		
		transition: var(--panda-time-picker-transition, all 0.3s ease-in-out);
		will-change: background-color, box-shadow;
		cursor: pointer;

		border-radius: var(--panda-time-picker-button-icon-border-radius, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-time-picker-button-background-color, transparent);
		box-sizing: border-box;

		/* ICON STYLES */
		--panda-icon-color: var(--panda-time-picker-button-icon-color, var(--panda-input-button-icon-color, hsl(191deg 19% 23%)));
		--panda-icon-size: var(--panda-time-picker-button-icon-size-m, var(--panda-input-button-icon-size-m, 20px));
	}

	/* HOVER STATE */
	.clear-button-cont:hover .clear-button {
		background-color: var(--panda-time-picker-button-background-color-hover, var(--panda-input-button-background-color-hover, hsl(210deg 5% 90%)));
		box-shadow: var(--panda-time-picker-button-elevation-hover, var(--panda-input-button-elevation-hover, none));
		--panda-icon-color: var(--panda-time-picker-button-icon-color-hover, var(--panda-input-button-icon-color-hover, hsl(191deg 19% 23%)));
	}

	/* FOCUSED STATE */
	.clear-button-cont .clear-button:focus-visible,
	.clear-button-cont .clear-button:hover:focus-visible {
		background-color: var(--panda-time-picker-button-background-color-focus, var(--panda-input-button-background-color-focus, hsl(210deg 5% 90%)));
		box-shadow: var(--panda-time-picker-button-outline, var(--panda-input-button-outline, 0px 0px 2px 2px hsl(209deg 78% 46%)));
		--panda-icon-color: var(--panda-time-picker-button-icon-color-focus, var(--panda-input-button-icon-color-focus, hsl(191deg 19% 23%)));
	}
`;