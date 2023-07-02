import { css } from "lit";

export const styles = css`
	:host {
		pointer-events: auto;
	}

	.overlay-cont {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		inset: 0px;
		z-index: 9999;
	}

	.overlay {
		position: absolute;
		display: flex;
		flex-flow: column;
		opacity: 0;

		transition: opacity 200ms ease-in-out;

		border: 1px solid var(--panda-bg-color-100);
		background-color: var(--panda-background-color-50opc, hsl(0deg 0% 94% / 50%));
		box-shadow: 0px 2px 4px var(--panda-shadow-color-20opc);
		box-sizing: border-box;
	}

	.overlay.show {
		opacity: 1;
	}

	.overlay-footer {
		display: flex;
		flex-flow: row nowrap;
	}
`;