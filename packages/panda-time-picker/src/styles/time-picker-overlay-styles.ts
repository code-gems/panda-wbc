export const styles = /*css*/`
	:host {
		pointer-events: auto;
	}

	.overlay {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100dvw;
		height: 100dvh;
		inset: 0px;
		z-index: 9998;

		background-color: var(--panda-time-picker-overlay-backdrop-color, hsl(0deg 0% 92% / 50%));
	}

	.form {
		position: relative;
		display: flex;
		flex-flow: column;
		gap: var(--panda-time-picker-overlay-form-gap, var(--panda-gap-m, 10px));
		padding: var(--panda-time-picker-overlay-form-padding, var(--panda-gap-m, 10px));

		border-width: var(--panda-time-picker-overlay-form-border-width, var(--panda-border-width, 1px));
		border-color: var(--panda-time-picker-overlay-form-border-color, var(--panda-border-color, hsl(207deg 1% 85%)));
		border-style: var(--panda-time-picker-overlay-form-border-style, solid);
		border-radius: var(--panda-time-picker-overlay-form-border-radius, var(--panda-border-radius-m, 10px));
		
		background-color: var(--panda-time-picker-overlay-form-background-color, var(--panda-form-background-color, hsl(0deg 0% 100%)));
		box-shadow: var(--panda-time-picker-overlay-form-elevation, var(--panda-elevation-m, 0px 2px 4px hsl(0deg 0% 0% / 20%)));
		box-sizing: border-box;
		z-index: 9999;
	}

	.form .header {
		flex-shrink: 0;
	}

	.form .body {
		flex-grow: 1;
	}

	.form .footer {
		display: flex;
		flex-shrink: 0;
		justify-content: flex-end;
		gap: var(--panda-time-picker-overlay-footer-gap, var(--panda-gap-m, 10px));
	}
`;