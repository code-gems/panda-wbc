import { css } from "lit";

export const styles = css`
	:host {
		position: absolute;
		pointer-events: auto;
		width: 1px;
		height: 1px;
		top: 0px;
		left: 0px;
		z-index: 9999;
	}

	.tooltip {
		position: fixed;
		display: flex;
		flex-flow: column;
		opacity: 0;
		padding: var(--panda-tooltip-padding, 10px);

		color: var(--panda-tooltip-text-color, #fff);
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
		transition: opacity 400ms ease-in-out;

		border-radius: var(--panda-tooltip-border-radius, 10px);
		background-color: var(--panda-tooltip-background-color, #000);
		box-shadow: var(--panda-tooltip-box-shadow, 0px 5px 10px hsl(0deg 0% 0% / 20%));
	}

	.tooltip:before {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
		content: " ";
		bottom: -7px;
		left: 50%;
		transform: translateX(-50%);
		pointer-events: none;

		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 8px solid var(--panda-tooltip-background-color, #000);
	}

	.tooltip.show {
		opacity: 1;
	}

	/* ========================================================================= */
	/* POSITION ================================================================ */
	/* ========================================================================= */

	/* TOP */
	/* TOP-LEFT */
	/* TOP-RIGHT */
	.tooltip.top-left:before {
		left: calc(var(--panda-tooltip-border-radius, 10px) + var(--panda-tooltip-padding, 10px));
	}

	.tooltip.top-right:before {
		left: calc(100% - var(--panda-tooltip-border-radius, 10px) - var(--panda-tooltip-padding, 10px));
	}

	/* BOTTOM */
	/* BOTTOM-LEFT */
	/* BOTTOM-RIGHT */
	.tooltip.bottom:before,
	.tooltip.bottom-left:before,
	.tooltip.bottom-right:before {
		top: -7px;
		border-top: none;
		border-bottom: 8px solid var(--panda-tooltip-background-color, #000);
	}

	.tooltip.bottom-left:before {
		left: calc(var(--panda-tooltip-border-radius, 10px) + var(--panda-tooltip-padding, 10px));
	}

	.tooltip.bottom-right:before {
		left: calc(100% - var(--panda-tooltip-border-radius, 10px) - var(--panda-tooltip-padding, 10px));
	}

	/* LEFT */
	.tooltip.left:before {
		top: 50%;
		left: 100%;
		transform: translateY(-50%);

		border-top: 8px solid transparent;
		border-bottom: 8px solid transparent;
		border-left: 8px solid var(--panda-tooltip-background-color, #000);
		border-right: none;
	}

	/* RIGHT */
	.tooltip.right:before {
		top: 50%;
		left: -7px;
		transform: translate(0%, -50%);

		border-top: 8px solid transparent;
		border-bottom: 8px solid transparent;
		border-right:8px solid var(--panda-tooltip-background-color, #000);
		border-left: none;
	}

`;
