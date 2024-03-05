import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: var(--panda-circular-progress-bar-size, 100px);
		height: var(--panda-circular-progress-bar-size, 100px);
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
		stroke: var(--panda-circular-progress-bar-scale-color, hsl(0deg 0% 50%));
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
		font-size: var(--panda-font-size-xl, 18px);
		font-family: var(--panda-font-family-bold, "Poppins-Bold");
		user-select: none;
	}

	svg .progress {
		fill: none;
		stroke: url(#gradient);
		stroke-linecap: var(--panda-circular-progress-bar-linecap, round);
		opacity: 1;

		transition-property: stroke-dashoffset, stroke, opacity;
		transition-behavior: normal;
		transition-duration: 1s, 1s, 500ms;
		transition-timing-function: ease-in-out;
		transition-delay: 0s;
	}

	.dashed svg .progress {
		clip-path: url(#clipPath);
		stroke-linecap: butt !important;
	}

	.busy .progress { opacity: 0; }

	svg .loader {
		opacity: 0;
		fill: none;
		stroke: var(--panda-circular-progress-bar-loader-color, hsl(0deg 0% 50%));
		stroke-linecap: var(--panda-circular-progress-bar-linecap, round);
		stroke-dashoffset: 250;
		transition: opacity 500ms ease;
		transform-origin: center;
		
		animation-fill-mode: forwards;
		animation: spin 1s infinite linear;
	}

	.busy svg .loader { opacity: 1; }

	svg .clip-path {
		transform-origin: center;
	}
	
	svg .clip-path.animate {
		animation-name: scaleClipPath;
		animation-duration: 1s;
		animation-timing-function: ease-in-out;
	}

	@keyframes rotateScale {
		0% { transform: rotate(-90deg); opacity: 0; }
		100% { transform: rotate(0deg); opacity: 1; }
	}

	@keyframes scaleClipPath {
		0% { transform: scale(0); }
		100% { transform: scale(1); }
	}
	
	@keyframes spin {
		0% {  transform: rotate(0deg); }
		100% { transform: rotate(359deg); }
	}

	/* THEMES =============================================================== */
	/* ACTION INFO */
	:host([theme~="info"]) svg .progress {
		stroke: var(--panda-action-color-info, hsl(261deg 66% 58%));
	}
	/* ACTION DONE */
	:host([theme~="done"]) svg .progress {
		stroke: var(--panda-action-color-done, hsl(160deg 81% 43%));
	}
	/* ACTION WARN */
	:host([theme~="warn"]) svg .progress {
		stroke: var(--panda-action-color-warn, hsl(35deg 91% 62%));
	}
	/* ACTION ERROR */
	:host([theme~="error"]) svg .progress {
		stroke: var(--panda-action-color-alert, hsl(14deg 77% 62%));
	}
	/* PRIMARY */
	:host([theme~="primary"]) svg .progress {
		stroke: var(--panda-primary-color, hsl(209deg 78% 46%));
	}
	/* SECONDARY */
	:host([theme~="secondary"]) svg .progress {
		stroke: var(--panda-secondary-color, hsl(160deg 81% 43%));
	}
`;