export const styles = `
	:host {
		display: inline;
		width: 100%;
		height: 100%;
	}

	.shimmer {
		display: block;
		width: 100%;
		height: 100%;
		
		border-radius: var(--panda-border-radius-m, 5px);
		background: linear-gradient(
			var(--panda-shimmer-angle, -45deg),
			var(--panda-background-color-900, hsl(0deg 0% 86%)) 40%,
			var(--panda-background-color-100, hsl(0deg 0% 97%)) 50%,
			var(--panda-background-color-900, hsl(0deg 0% 86%)) 60%
		);
		background-size: 300% 100%;

		animation-name: shimmer;
		animation-duration: var(--panda-shimmer-animation-duration, 2s);
		animation-timing-function: var(--panda-shimmer-animation-timing-function, ease-in-out);
		animation-iteration-count: var(--panda-shimmer-animation-iteration-count, infinite);
	}

	/* ===================================================================== */
	/* THEMES ============================================================== */
	/* ===================================================================== */

	.shimmer.circle {
		border-radius: 50%;
	}

	.shimmer.header {
		height: var(--panda-font-size-l, 16px);
	}

	.shimmer.text {
		height: var(--panda-font-size-m, 14px);
	}

	.shimmer.label {
		height: var(--panda-label-font-size, 12px);
	}

	/* SIZE S */

	.shimmer.size-s {
		height: var(--panda-component-size-s, 24px);
	}

	/* SIZE L */

	.shimmer.size-l {
		height: var(--panda-component-size-l, 40px);
	}

	/* SIZE XL */

	.shimmer.size-xl {
		height: var(--panda-component-size-xl, 48px);
	}

	/* ===================================================================== */
	/* ANIMATION============================================================ */
	/* ===================================================================== */

	@keyframes shimmer {
		0% {
			background-position-x: 100%;
		}
		100% {
			background-position-x: 0%;
		}
	}
`;