import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		position: relative;
		width: 100px;
		height: 100px;
	}

	.countdown-cont {
		overflow: hidden;
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}

	.counter {
		position: absolute;
		display: block;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		color: var(--panda-countdown-timer-text-color, hsl(0deg 0% 50%));
		font-size: var(--panda-font-size-l);
		font-family: var(--panda-font-family-bold);
		user-select: none;
	}

	svg {
		width: 100%;
		height: 100%;
	}

	svg circle {
		r: 50;
		cx: 50;
		cy: 50;
		transform-origin: center;
	}

	.progress {
		opacity: 1;
		fill: none;
		stroke: var(--panda-countdown-timer-color, hsl(0deg 0% 92%));
		stroke-width: 100;
		stroke-linecap: butt;

		transform: rotate(-90deg);

		transition-property: stroke-dasharray, opacity;
		transition-behavior: normal;
		transition-duration: 250ms, 500ms;
		transition-timing-function: ease-in-out;
		transition-delay: 0s;
	}

	.busy .progress,
	.paused .progress { opacity: 0; }

	.loader {
		opacity: 0;
		fill: none;
		stroke: var(--panda-countdown-timer-loader-color, hsl(0deg 0% 66%));
		stroke-width: var(--panda-countdown-timer-loader-size, 10);
		stroke-dashoffset: 250;
		stroke-dasharray: 314;
		stroke-linecap: round;
		transition: opacity 500ms ease;

		r: 45;
		animation: spin 1s infinite linear;
	}

	.busy .loader,
	.paused .loader { opacity: 1; }

	.scale {
		opacity: 0;
		fill: none;
		stroke: var(--panda-countdown-timer-donut-color, hsl(0deg 0% 92%));
		stroke-width: var(--panda-countdown-timer-donut-size, 10);
		stroke-width: var(--panda-circular-progress-bar-scale-stroke-width, 2);
		stroke-dasharray: var(--panda-circular-progress-bar-scale-stroke-dasharray, 2 5.65);

		r: 45;
	}

	.scale.show {
		opacity: 1;
		animation-name: rotateScale;
		animation-duration: 2s;
		animation-timing-function: ease-in-out;
	}

	/* THEMES */

	/* DONUT */
	:host([theme~="donut"]) .progress {
		stroke-width: var(--panda-countdown-timer-donut-size, 10);
		r: 45;
	}

	:host([theme~="donut"]) .counter {
		color: var(--panda-countdown-timer-donut-text-color, hsl(0deg 0% 15%));
	}

	@keyframes rotateScale {
		0% { transform: rotate(-90deg); opacity: 0; }
		100% { transform: rotate(0deg); opacity: 1; }
	}

	@keyframes spin {
		0% {  transform: rotate(0deg); }
		100% { transform: rotate(359deg); }
	}
`;