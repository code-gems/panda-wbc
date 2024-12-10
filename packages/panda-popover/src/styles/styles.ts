import { css } from "lit";

export const styles = css`
	:host {
		display: none;
	}
`;

export const overlayStyles = css`
	:host {
		position: absolute;
		pointer-events: auto;
		width: 1px;
		height: 1px;
		top: 0px;
		left: 0px;
		z-index: 9999;
	}

	.popover {
		position: fixed;
		display: flex;
		flex-flow: column;
		opacity: 0;
		padding: var(--panda-popover-padding, 10px);

		color: var(--panda-popover-text-color, hsl(210deg 5% 25%));

		border-radius: var(--panda-popover-border-radius, 10px);
		background-color: var(--panda-popover-background-color, #fff);
		box-shadow: var(--panda-popover-box-shadow, 0px 5px 10px hsl(0deg 0% 0% / 20%));
	}

	.popover:before {
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
		border-top: 8px solid var(--panda-popover-background-color, #fff);
	}

	.popover.show { opacity: 1; }

	/* ========================================================================= */
	/* POSITION ================================================================ */
	/* ========================================================================= */

	/* TOP */
	/* TOP-LEFT */
	/* TOP-RIGHT */
	.popover.top-left:before {
		left: calc(var(--panda-popover-border-radius, 10px) + var(--panda-popover-padding, 10px));
	}

	.popover.top-right:before {
		left: calc(100% - var(--panda-popover-border-radius, 10px) - var(--panda-popover-padding, 10px));
	}

	/* BOTTOM */
	/* BOTTOM-LEFT */
	/* BOTTOM-RIGHT */
	.popover.bottom:before,
	.popover.bottom-left:before,
	.popover.bottom-right:before {
		top: -7px;
		border-top: none;
		border-bottom: 8px solid var(--panda-popover-background-color, #fff);
	}

	.popover.bottom-left:before {
		left: calc(var(--panda-popover-border-radius, 10px) + var(--panda-popover-padding, 10px));
	}

	.popover.bottom-right:before {
		left: calc(100% - var(--panda-popover-border-radius, 10px) - var(--panda-popover-padding, 10px));
	}

	/* LEFT */
	.popover.left:before {
		top: 50%;
		left: 100%;
		transform: translateY(-50%);

		border-top: 8px solid transparent;
		border-bottom: 8px solid transparent;
		border-left: 8px solid var(--panda-popover-background-color, #fff);
		border-right: none;
	}

	/* RIGHT */
	.popover.right:before {
		top: 50%;
		left: -7px;
		transform: translate(0%, -50%);

		border-top: 8px solid transparent;
		border-bottom: 8px solid transparent;
		border-right: 8px solid var(--panda-popover-background-color, #fff);
		border-left: none;
	}
`;