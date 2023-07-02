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
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		pointer-events: auto;

		background-color: var(--panda-background-color-50opc, hsl(0deg 0% 94% / 50%));
		z-index: 100;
	}

	.content {
		display: block;
		width: 60vw;
		height: 60vh;

		color: var(--panda-txt-color, hsl(0deg 0% 29%););
		background-color: var(--panda-bg-color, hsl(0deg 0% 100%));
	}
`;
