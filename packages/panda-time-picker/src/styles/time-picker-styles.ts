export const styles = /*css*/`
	:host {
		display: inline-block;
		width: fit-content;
		outline: none;
		-webkit-font-smoothing: antialiased;
	}

	.label {
		display: block;
		overflow: hidden;
		line-height: var(--panda-time-picker-label-line-height, var(--panda-label-line-height, 1.6em));
		color: var(--panda-time-picker-label-color, var(--panda-label-color, hsl(0deg 0% 50%)));
		font-size: var(--panda-time-picker-label-font-size, var(--panda-label-font-size, 12px));
		font-family: var(--panda-time-picker-label-font-family, var(--panda-label-font-family, "Poppins"));
		text-shadow: var(--panda-time-picker-label-text-shadow, var(--panda-label-text-shadow, none));
		text-overflow: ellipsis;
		white-space: nowrap;
		user-select: none;
	}

	.help-text {
		line-height: var(--panda-time-picker-help-text-line-height, var(--panda-text-line-height, 1.6em));
		color: var(--panda-time-picker-help-text-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-time-picker-help-text-font-size, var(--panda-font-size-m, 16px));
		font-family: var(--panda-time-picker-help-text-font-family, var(--panda-font-family, "Poppins"));
		text-shadow: var(--panda-time-picker-help-text-text-shadow, var(--panda-text-shadow, none));
		user-select: none;
	}

	.error-message {
		line-height: var(--panda-time-picker-error-message-line-height, var(--panda-text-line-height, 1.6em));
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

		border-radius: var(--panda-time-picker-border-radius-size-m, 10px);
		background-color: var(--panda-time-picker-background-color-working, hsl(0deg 0% 100%));
		z-index: 2;

		/* SPINNER STYLE */
		--panda-spinner-color: var(--panda-time-picker-spinner-color, hsl(191deg 19% 23%));
		--panda-spinner-size: var(--panda-time-picker-spinner-size-m, var(--panda-icon-size-m, 20px));
	}

	.time-picker {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		padding-block: var(--panda-time-picker-padding-block-m, 0);
		padding-left: var(--panda-time-picker-padding-left-m, var(--panda-gap-m, 10px));
		padding-right: var(--panda-time-picker-padding-right-m, 0px);
		height: var(--panda-time-picker-height-size-m, var(--panda-component-size-m, 40px));
		outline: none;

		transition: var(--panda-time-picker-transition, all 0.3s ease-in-out);
		cursor: text;

		border-radius: var(--panda-time-picker-border-radius-size-m, var(--panda-border-radius-m, 5px));
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
		align-items: center;
		gap: var(--panda-time-picker-input-gap, 0.125rem);
		color: var(--panda-time-picker-text-color, var(--panda-input-text-color, hsl(191deg 19% 23%)));
		font-size: var(--panda-time-picker-font-size-m, var(--panda-input-font-size-m, 14px));
		font-family: var(--panda-time-picker-font-family, var(--panda-input-font-family, "Poppins"));
		text-shadow: var(--panda-time-picker-text-shadow, var(--panda-input-text-shadow, none));
		line-height: var(--panda-time-picker-line-height-m, var(--panda-input-line-height-m, normal));
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
	}

	.time-picker .input-field > span {
		user-select: none;
	}

	.time-picker .time-input {
		color: var(--panda-time-picker-text-color, var(--panda-input-text-color, hsl(210deg 5% 25%)));
	}

	/* PLACEHOLDER */
	.time-picker .time-input[empty] {
		color: var(--panda-time-picker-placeholder-color, var(--panda-input-placeholder-color, hsl(191deg 19% 23%)));
	}

	/* PERIOD INPUT SPECIFIC STYLES */
	.time-picker .period-input {
		margin-left: var(--panda-time-picker-period-input-gap-m, 0.25rem);
	}

	/* CLEAR BUTTON */
	.clear-button {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-time-picker-clear-button-size-m, var(--panda-component-size-m, 40px));
		height: 100%;
	}
	
	.clear-button .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panda-time-picker-clear-button-icon-padding-m, 0px);
		
		transition: var(--panda-time-picker-transition, all 0.3s ease-in-out);
		cursor: pointer;

		border-radius: var(--panda-time-picker-clear-button-icon-border-radius, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-time-picker-clear-button-background-color, transparent);
		box-sizing: border-box;

		/* ICON STYLES */
		--panda-icon-color: var(--panda-time-picker-clear-button-icon-color, var(--panda-time-picker-icon-color, hsl(191deg 19% 23%)));
		--panda-icon-size: var(--panda-time-picker-clear-button-icon-size-m, var(--panda-time-picker-icon-size-m, 20px));
	}

	.clear-button:hover .icon {
		background-color: var(--panda-time-picker-clear-button-background-color-hover, hsl(210deg 5% 90%));
		--panda-icon-color: var(--panda-time-picker-clear-button-icon-color-hover, var(--panda-input-icon-color-hover, hsl(188deg 5% 75%)));
	}

	/* PICKER BUTTON */
	.picker-button {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-time-picker-button-size-m, var(--panda-component-size-m, 40px));
		height: 100%;
	}

	.picker-button .picker-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panda-time-picker-button-icon-padding-m, 0px);
		
		transition: var(--panda-time-picker-transition, all 0.3s ease-in-out);
		cursor: pointer;

		border-radius: var(--panda-time-picker-button-icon-border-radius, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-time-picker-button-background-color, transparent);
		box-sizing: border-box;

		/* ICON STYLES */
		--panda-icon-color: var(--panda-time-picker-button-icon-color, var(--panda-time-picker-icon-color, hsl(191deg 19% 23%)));
		--panda-icon-size: var(--panda-time-picker-button-icon-size-m, var(--panda-time-picker-icon-size-m, 20px));
	}

	.picker-button:hover .picker-icon {
		background-color: var(--panda-time-picker-button-background-color-hover, hsl(210deg 5% 90%));
		--panda-icon-color: var(--panda-time-picker-button-icon-color-hover, var(--panda-input-icon-color-hover, hsl(188deg 5% 75%)));
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
		min-width: var(--panda-input-height-size-m, 40px);
		height: 100%;
		padding: 0px;
		flex-shrink: 0;
	}

	/* ===================================================================== */
	/* COMPONENT STATES ==================================================== */
	/* ===================================================================== */

	
`;