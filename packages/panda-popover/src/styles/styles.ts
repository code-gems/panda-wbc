export const styles = /* css */`
	:host {
		display: none;
	}
`;

export const overlayStyles = /* css */`
	:host {
		position: fixed;
		display: block;
		width: 100dvw;
		height: 100dvh;
		inset: 0;
		pointer-events: auto;
		z-index: 100;
	}

	.popover {
		position: fixed;
		display: flex;
		flex-flow: column;
		max-width: var(--panda-popover-max-width, 250px);
		padding: var(--panda-tooltip-padding, 10px);
		opacity: 0;

		color: var(--panda-text-color, hsl(210deg 5% 25%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
		transition: opacity 400ms ease-in-out;

		border: var(--panda-dialog-border, 1px solid hsl(0deg 0% 85%));
		border-radius: var(--panda-dialog-border-radius, 5px);
		background-color: var(--panda-popover-background-color, hsl(0deg 0% 100%));
		box-shadow: var(--panda-elevation-m, 0px 2px 4px hsl(0deg 0% 0% / 20%));
		box-sizing: border-box;
	}

	.popover.show {
		animation-name: showAnimation;
		animation-duration: 200ms;
		animation-timing-function: cubic-bezier(0.6, -0.28, 0.735, 0.045);
		animation-fill-mode: forwards;
	}

	/* ===================================================================== */
	/* POSITION ============================================================ */
	/* ===================================================================== */

	/* scale animation frames */
	@keyframes showAnimation {
		0% {
			opacity: 0;
			transform: scale(0.7);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
`;