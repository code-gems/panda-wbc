import { css } from "lit";

export const styles = css`
	:host {
		display: inline;
	}

	.label {
		display: block;
		line-height: 1.6em;
		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-font-size-s, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		user-select: none;
	}

	.counter {
		display: flex;
		flex-flow: row nowrap;
		overflow: hidden;

		color: var(--panda-text-color, hsl(274 21% 87%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
		text-shadow: var(--panda-text-shadow, "none");
	}

	.text-metrics {
		position: fixed;
		top: -9999px;
		left: -9999px;
		visibility: hidden;
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
	}

	/* THEMES */

	:host([theme~="big-display"]) .text-metrics {
		height: 60px;
		font-size: var(--panda-font-size-hero, 24px);
	}

	:host([theme~="big-display"]) .counter {
		border-radius: 5px;
		background-color: black;
		background: linear-gradient(
			180deg,
			rgba(0,0,0,1) 0%,
			rgba(20,20,20,1) 50%,
			rgba(0,0,0,1) 100%
		);
		box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.1) inset;
	}
`;

export const panelStyles = css`
	:host {
		display: inline;

		color: var(--panda-text-color, hsl(274 21% 87%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
		text-shadow: var(--panda-text-shadow, "none");
	}

	.panel-cont {
		position: relative;
		display: block;
		height: var(--panda-counter-panel-height, 21px);
		overflow: hidden;
	}

	.panel {
		transition-property: margin-top;
		transition-duration: var(--panda-counter-transition-duration, 1000ms);
		transition-timing-function: ease;
	}

	.panel.animation-linear { transition-timing-function: linear; }
	.panel.animation-ease-in { transition-timing-function: ease-in; }
	.panel.animation-ease-out { transition-timing-function: ease-out; }
	.panel.animation-ease-in-out { transition-timing-function: ease-in-out; }
	.panel.animation-ease-in-back { transition-timing-function: cubic-bezier(0.600, -0.280, 0.735, 0.045); }
	.panel.animation-ease-out-back { transition-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1.275); }
	.panel.animation-ease-in-out-back { transition-timing-function: cubic-bezier(0.680, -0.550, 0.265, 1.550); }
	.panel.animation-bounce {
		transition-timing-function: linear(
			/* Start to 1st bounce */
			0, 0.004, 0.016, 0.035, 0.063 9.1%, 0.141, 0.25, 0.391, 0.563, 0.765, 1,
			/* 1st to 2nd bounce */
			0.891, 0.813 45.5%, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785, 0.813 63.6%, 0.891, 1 72.7%,
			/* 2nd to 3rd bounce */
			0.973, 0.953, 0.941, 0.938, 0.941, 0.953, 0.973, 1,
			/* 3rd bounce to end */
			0.988, 0.984, 0.988, 1
		);
	}

	.panel-item {
		display: flex;
		justify-content: center;
		height: var(--panda-counter-panel-height, 21px);
		user-select: none;
	}

	/* THEMES */

	:host([theme~="big-display"]) .panel-cont::before {
		position: absolute;
		display: block;
		content: " ";
		width: 1px;
		height: 80%;
		right: 0;
		top: 50%;

		transform: translateY(-50%);

		background: linear-gradient(
			180deg,
			rgba(0,0,0,1) 0%,
			rgba(130,130,130,1) 50%,
			rgba(0,0,0,1) 100%
		);
	}

	:host([theme~="big-display"]) .panel-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 60px;

		color: #ffffff;
		font-size: var(--panda-font-size-hero, 24px);
		box-sizing: border-box;
	}
`;