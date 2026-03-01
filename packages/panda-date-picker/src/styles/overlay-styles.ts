export const styles = /*css*/`
	:host {
		pointer-events: auto;
	}

	.dialog-overlay {
		position: fixed;
		display: block;
		width: 100%;
		height: 100%;
		inset: 0px;
		z-index: 9999;
	}

	.dialog-overlay > .dialog {
		position: absolute;
		display: flex;
		flex-flow: column;
		opacity: 0;
		padding: var(--panda-date-picker-dialog-padding, var(--panda-dialog-padding, 10px));

		transition: var(--panda-date-picker-dialog-transition, var(--panda-dialog-transition, opacity 200ms ease-in-out));

		border-width: var(--panda-date-picker-dialog-border-width, var(--panda-dialog-border-width, 1px));
		border-style: var(--panda-date-picker-dialog-border-style, var(--panda-dialog-border-style, solid));
		border-color: var(--panda-date-picker-dialog-border-color, var(--panda-dialog-border-color, hsl(0deg 0% 0% / 20%)));
		border-radius: var(--panda-date-picker-dialog-border-radius, var(--panda-dialog-border-radius, 15px));
		background-color: var(--panda-date-picker-dialog-background-color, var(--panda-dialog-background-color, hsl(0deg 0% 100% / 100%)));
		box-shadow: var(--panda-date-picker-dialog-box-shadow, var(--panda-dialog-box-shadow, 0px 2px 4px hsl(0deg 0% 0% / 20%)));
		box-sizing: border-box;
	}

	.dialog-overlay > .dialog.show {
		opacity: 1;
	}

	.dialog-overlay > .dialog > .footer {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--panda-date-picker-dialog-footer-gap, var(--panda-dialog-footer-gap, 10px));
	}
`;