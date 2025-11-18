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
		line-height: var(--panda-select-label-line-height, var(--panda-label-line-height, 1.6em));
		color: var(--panda-select-label-color, var(--panda-label-color, hsl(0deg 0% 50%)));
		font-size: var(--panda-select-label-font-size, var(--panda-label-font-size, 12px));
		font-family: var(--panda-select-label-font-family, var(--panda-label-font-family, "Poppins"));
		text-shadow: var(--panda-select-label-text-shadow, var(--panda-label-text-shadow, none));
		text-overflow: ellipsis;
		white-space: nowrap;
		user-select: none;
	}

	.help-text {
		line-height: var(--panda-select-help-text-line-height, var(--panda-text-line-height, 1.6em));
		color: var(--panda-select-help-text-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-select-help-text-font-size, var(--panda-font-size-m, 14px));
		font-family: var(--panda-select-help-text-font-family, var(--panda-font-family, "Poppins"));
		text-shadow: var(--panda-select-help-text-text-shadow, var(--panda-text-shadow, none));
		user-select: none;
	}

	.error-message {
		line-height: var(--panda-select-error-message-line-height, var(--panda-text-line-height, 1.6em));
		color: var(--panda-select-error-message-color, var(--panda-action-color-alert, hsl(14deg 77% 62%)));
		font-size: var(--panda-select-error-message-font-size, var(--panda-font-size-m, 14px));
		font-family: var(--panda-select-error-message-font-family, var(--panda-font-family, "Poppins"));
		text-shadow: var(--panda-select-error-message-text-shadow, var(--panda-text-shadow, none));
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

		border-radius: var(--panda-multi-select-border-radius-size-m, 10px);
		background-color: var(--panda-multi-select-background-color-working, hsl(0deg 0% 100%));
		z-index: 2;

		/* SPINNER STYLE */
		--panda-spinner-color: var(--panda-multi-select-spinner-color, hsl(0deg 0% 100%));
		--panda-spinner-size: var(--panda-multi-select-spinner-size-m, 20px);
	}

	.select {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		height: var(--panda-multi-select-height-size-m, 40px);
		outline: none;

		transition: all 300ms ease-in-out;

		border-radius: var(--panda-multi-select-border-radius-size-m, 10px);
		border-width: var(--panda-multi-select-border-width, 1px);
		border-style: var(--panda-multi-select-border-style, solid);
		border-color: var(--panda-multi-select-border-color, hsl(207deg 1% 85%));
		background-color: var(--panda-multi-select-background-color, hsl(0deg 0% 100%));
		box-shadow: var(--panda-multi-select-elevation, none);
		box-sizing: border-box;
		--panda-icon-color: var(--panda-multi-select-icon-color, hsl(191deg 19% 23%));
		--panda-icon-size: var(--panda-multi-select-slot-icon-size-m, 20px);
	}

	.select .items-cont {
		flex-grow: 1;
	}

	::slotted([slot="prefix"]),
	::slotted([slot="suffix"]) {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	::slotted([slot="prefix"]) {
		background-color: var(--panda-multi-select-prefix-background-color, transparent);
	}

	::slotted([slot="suffix"]) {
		background-color: var(--panda-multi-select-suffix-background-color, transparent);
	}
`;
