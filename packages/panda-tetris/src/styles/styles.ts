import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 300px;
		height: 600px;
		font-size: 12px;
		font-family: monospace;
	}

	.menu-cont {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.menu-cont .menu {
		position: absolute;
		display: flex;
		flex-flow: column;
		width: 90%;
		top: 50%;
		left: 50%;
		padding: var(--panda-padding-xl);
		gap: var(--panda-padding-m);

		transform: translate(-50%, -50%);

		border-radius: var(--panda-border-radius-m);
		background-color: var(--panda-background-color-50);
		box-shadow: var(--panda-elevation-hero);
		box-sizing: border-box;
	}

	.header {
		text-align: center;
	}

	canvas {
		border: 1px solid var(--panda-border-color);
	}

	panda-button {
		width: 100%;
	}
`;