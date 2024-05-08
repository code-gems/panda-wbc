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
		text-align: center;
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
		stroke: var(--panda-countdown-timer-scale-color, hsl(0deg 0% 92%));
		stroke-width: var(--panda-countdown-timer-scale-stroke-width, 2);
		stroke-dasharray: var(--panda-countdown-timer-scale-stroke-dasharray, 2 5.65);

		r: 45;
	}

	.scale.show {
		opacity: 1;
		animation-name: rotateScale;
		animation-duration: 2s;
		animation-timing-function: ease-in-out;
	}

	:host([clockwise]) .progress {
		transform: scaleX(-1) rotate(270deg);
	}

	/* THEMES */

	/* PRIMARY */
	:host([theme~="primary"]) .progress {
		stroke: var(--panda-action-color-primary, hsl(209deg 78% 46%));
	}

	:host([theme~="primary"]) .counter {
		color: var(--panda-action-text-color-primary, hsl(0deg 0% 100%));
	}

	/* SECONDARY */
	:host([theme~="secondary"]) .progress {
		stroke: var(--panda-action-color-secondary, hsl(160deg 81% 43%));
	}

	:host([theme~="secondary"]) .counter {
		color: var(--panda-action-text-color-secondary, hsl(0deg 0% 100%));
	}

	/* TERTIARY */
	:host([theme~="tertiary"]) .progress {
		stroke: var(--panda-action-color-tertiary, hsl(160deg 81% 43%));
	}

	:host([theme~="tertiary"]) .counter {
		color: var(--panda-action-text-color-tertiary, hsl(0deg 0% 100%));
	}

	/* INFO */
	:host([theme~="info"]) .progress {
		stroke: var(--panda-action-color-info, hsl(261deg 66% 58%));
	}

	:host([theme~="info"]) .counter {
		color: var(--panda-action-text-color-info, hsl(0deg 0% 100%));
	}

	/* DONE */
	:host([theme~="done"]) .progress {
		stroke: var(--panda-action-color-done, hsl(160deg 81% 43%));
	}

	:host([theme~="done"]) .counter {
		color: var(--panda-action-text-color-done, hsl(0deg 0% 100%));
	}

	/* WARN */
	:host([theme~="warn"]) .progress {
		stroke: var(--panda-action-color-warn, hsl(35deg 91% 62%));
	}

	:host([theme~="warn"]) .counter {
		color: var(--panda-action-text-color-warn, hsl(0deg 0% 100%));
	}

	/* ALERT */
	:host([theme~="alert"]) .progress {
		stroke: var(--panda-action-color-alert, hsl(14deg 77% 62%));
	}

	:host([theme~="alert"]) .counter {
		color: var(--panda-action-text-color-alert, hsl(0deg 0% 100%));
	}

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