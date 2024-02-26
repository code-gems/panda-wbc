import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: var(--dragon-circular-progress-bar-size, 100px);
		height: var(--dragon-circular-progress-bar-size, 100px);
		--panda-gradient-color-1: var(--panda-primary-color, hsl(209deg 78% 46%));
		--panda-gradient-color-2: var(--panda-secondary-color, hsl(160deg 81% 43%));
	}

	.progress-bar-cont {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.progress-bar {
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
		border-radius: 50%;

		background-color: var(--panda-circular-progress-bar-background-color, transparent);
		box-shadow: var(--panda-circular-progress-bar-box-shadow, none);
	}

	.scale {
		opacity: 0;
		transform-origin: center;
		stroke: var(--panda-form-border-color);
		stroke-width: var(--panda-circular-progress-bar-scale-stroke-width, 2);
		stroke-dasharray: var(--panda-circular-progress-bar-scale-stroke-dasharray, 2 5.65);
	}

	.scale.show {
		opacity: 1;
		animation-name: rotateScale;
		animation-duration: 2s;
		animation-timing-function: ease-in-out;
	}

	.content {
		position: absolute;
		font-size: var(--panda-font-size-xl);
		font-family: var(--panda-font-family-bold);
		user-select: none;
	}

	svg .progress {
		fill: none;
		stroke: url(#gradient);
		stroke-linecap: var(--panda-circular-progress-bar-linecap, round);

		transition-property: stroke-dashoffset;
		transition-behavior: normal;
		transition-duration: 2s;
		transition-timing-function: ease-in-out;
		transition-delay: 0s;
	}

	svg .progress.dashed {
		clip-path: url(#clipPath);
		stroke-linecap: butt !important;
	}

	@keyframes rotateScale {
		0% { transform: rotate(-90deg); opacity: 0; }
		100% { transform: rotate(0deg); opacity: 1; }
	}
`;