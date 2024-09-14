import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
	}

	.label {
		display: block;
		line-height: 1.6em;

		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-label-font-size, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		user-select: none;
	}

	.progress-bar-cont {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		height: var(--panda-component-size-m, 30px);
	}

	.progress-bar-cont .progress-value {
		color: var(--panda-text-color, hsl(210deg 5% 25%));
		font-size: var(--panda-font-size-s, 12px);
		font-family: var(--panda-font-family, "Poppins");
		user-select: none;
	}

	.progress-bar {
		position: relative;
		display: block;
		width: 100%;
		height: var(--panda-progress-bar-size, 10px);
		overflow: hidden;

		border-width: 1px;
		border-color: var(--panda-progress-bar-border-color, hsl(0deg 0% 66%));
		border-style: var(--panda-progress-bar-border-style, solid);
		border-radius: var(--panda-progress-bar-border-radius, 5px);

		background-color: var(--panda-progress-bar-background-color, hsl(0deg 0% 92%));
		box-sizing: border-box;
	}

	.progress-bar .progress {
		position: absolute;
		display: block;
		height: 100%;
		top: 0px;
		left: 0px;

		border-radius: var(--panda-progress-bar-border-radius, 5px);
		background-color: var(--panda-primary-color, hsl(209deg 78% 46%));
		z-index: 2;
	}

	.progress-bar .buffer-progress {
		position: absolute;
		display: block;
		height: 100%;
		top: 0px;
		left: 0px;

		border-radius: var(--panda-progress-bar-border-radius, 5px);
		background-color: var(--panda-primary-color-30opc, hsl(209deg 78% 46% / 30%));
		z-index: 1;
	}

	/* COMPONENT STATES ==================================================== */

	:host([indeterminate]) .progress {
		animation: indeterminate 2s infinite ease;
	}

	:host([indeterminate]) .buffer-progress {
		animation: indeterminate 3s infinite ease 500ms;
	}

	/* THEMES ============================================================== */

	/* 3D */
	:host([theme~="3d"]) .progress {
		box-shadow: 0px -2px 4px var(--panda-black-color-50opc, hsl(0deg 0% 0% / 50%)) inset,
					0px 2px 4px var(--panda-white-color-50opc, hsl(0deg 0% 100% / 50%)) inset;
	}

	/* CANDY */
	:host([theme~="candy"]) .progress,
	:host([theme~="candy"]) .buffer-progress {
		background-size: 20px 20px;
		background-image: linear-gradient(
			45deg,
			var(--panda-white-color-20opc, hsl(0deg 0% 100% / 20%)) 25%,
			transparent 25%,
			transparent 50%,
			var(--panda-white-color-20opc, hsl(0deg 0% 100% / 20%)) 50%,
			var(--panda-white-color-20opc, hsl(0deg 0% 100% / 20%)) 75%,
			transparent 75%,
			transparent
		);
		animation: candy 2s infinite linear;
	}
	
	/* CANDY + INDETERMINATE STATE */
	:host([theme~="candy"][indeterminate]) .progress {
		animation: candy 2s infinite linear, indeterminate 2s infinite ease;
	}

	:host([theme~="candy"][indeterminate]) .buffer-progress {
		animation: candy 2s infinite linear, indeterminate 3s infinite ease 500ms;
	}

	/* SECONDARY */
	:host([theme~="secondary"]) .progress {
		background-color: var(--panda-secondary-color, hsl(160deg 81% 43%));
	}
	:host([theme~="secondary"]) .buffer-progress {
		background-color: var(--panda-secondary-color-30opc, hsl(160deg 81% 43%));
	}

	/* TERTIARY */
	:host([theme~="tertiary"]) .progress {
		background-color: var(--panda-tertiary-color, hsl(160deg 81% 43%));
	}

	/* INFO */
	:host([theme~="info"]) .progress {
		background-color: var(--panda-action-color-info, hsl(160deg 81% 43%));
	}

	/* DONE */
	:host([theme~="done"]) .progress {
		background-color: var(--panda-action-color-done, hsl(160deg 81% 43%));
	}

	/* WARN  */
	:host([theme~="warn"]) .progress {
		background-color: var(--panda-action-color-warn, hsl(160deg 81% 43%));
	}

	/* ALERT  */
	:host([theme~="alert"]) .progress {
		background-color: var(--panda-action-color-alert, hsl(160deg 81% 43%));
	}


	@keyframes candy {
		0% { background-position: 0px 100%; }
		100% { background-position: 20px 100%; }
	}

	@keyframes indeterminate {
		0% { left: -10%; width: 0%; }
		30% { width: 50%; }
		100% { left: 110%; width: 100%; }
	}
`;