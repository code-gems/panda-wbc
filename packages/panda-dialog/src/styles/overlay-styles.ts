import { css } from "lit";

export const styles = css`
	:host {
		display: block;
	}

	.dialog-overlay {
		position: fixed;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100dvw;
		height: 100dvh;
		inset: 0;
		pointer-events: auto;

		background-color: var(--panda-dialog-overlay-background-color, hsl(0deg 0% 94% / 50%));
		z-index: 100;
	}

	.content {
		display: block;
		
		color: var(--panda-text-color, hsl(0deg 0% 29%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");

		border: var(--panda-dialog-border, 1px solid hsl(0deg 0% 85%));
		border-radius: var(--panda-dialog-border-radius, 5px);
		background-color: var(--panda-dialog-background-color, hsl(0deg 0% 100%));
		box-shadow: var(--panda-dialog-box-shadow, 0px 2px 4px hsl(0deg 0% 0% / 20%));
		box-sizing: border-box;
	}
`;
