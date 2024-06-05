import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
	}

	.content {
	    position: relative;
		display: block;
		cursor: pointer;
	}

	.content.show-tooltip .tooltip,
	.content:hover .tooltip {
		opacity: 1;
	}

	.tooltip {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panda-padding-s);
		top: 0px;
		left: 100%;
		opacity: 0;
		
		transition: opacity 300ms ease-in-out;
		pointer-events: none;
		user-select: none;

		border-radius: var(--panda-border-radius-m);
		background-color: var(--panda-button-background-color);
		box-shadow: var(--panda-elevation-m, 0px 5px 10px hsl(0deg 0% 0% / 10%));
		z-index: 1;
	}

	.tooltip .icon {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-component-size-m);
		height: var(--panda-component-size-m);

		--panda-icon-color: var(--panda-text-color);
		--panda-icon-width: var(--panda-icon-size-m);
		--panda-icon-height: var(--panda-icon-size-m);
	}
	
	.tooltip .caption {
		display: flex;
		align-items: center;
		min-height: var(--panda-component-size-m);
		padding: 0px var(--panda-padding-s);

		line-height: 1.2rem;
		color: var(--panda-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family);
	}

	/* COMPONENT STATE ========================================================================= */

	.tooltip.done {
		opacity: 1;
		color: var(--panda-action-text-color-done, hsl(0deg 0% 100%));
		background-color: var(--panda-action-color-done, hsl(160deg 81% 43%));
		--panda-icon-color: var(--panda-action-text-color-done, hsl(0deg 0% 100%));
	}

	.tooltip.done .icon {
		--panda-icon-color: var(--panda-action-text-color-success, hsl(0deg 0% 100%));
	}
	
	.tooltip.done .caption {
		color: var(--panda-action-text-color-success, hsl(0deg 0% 100%));
	}

	/* TOOLTIP POSITION ======================================================================== */

	.tooltip.top {
		top: unset;
		left: 50%;
		bottom: 100%;
		transform: translateX(-50%);
	}

	.tooltip.right {
		left: 100%;
		right: unset;
	}

	.tooltip.bottom {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip.left {
		right: 100%;
		left: unset;
	}
`;
