import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
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

	.stepper {
		display: flex;
		flex-flow: row nowrap;
	}

	.stepper > .step-cont {
		display: flex;
		flex-flow: column nowrap;
		flex-grow: 1;
	}

	.stepper > .step-cont > .step {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		flex-grow: 1;
		padding: var(--panda-padding-m, 10px);
		outline: none;

		border-radius: var(--panda-border-radius, 5px);
		box-sizing: border-box;
	}
	
	.stepper.clickable > .step-cont > .step:not(.disabled) {
		cursor: pointer;
	}

	.stepper.clickable > .step-cont > .step:not(.disabled):hover {
		background-color: var(--panda-background-color, hsl(0deg 0% 92%));
	}

	.stepper.clickable > .step-cont > .step:not(.disabled):active {
		background-color: var(--panda-action-color-done-10opc, hsl(0deg 0% 85%));
	}

	.stepper > .step-cont > .step > .content {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--panda-padding-m);
	}

	.stepper > .step-cont > .step-progress {
		display: flex;
		padding: var(--panda-padding-m);
	}

	.stepper > .step-cont > .step-progress > .progress-bar {
		display: flex;
		flex-grow: 1;
	}

	/* ===================================================================== */
	/* COMPONENT STATES ==================================================== */
	/* ===================================================================== */

	/* FOCUSED */
	.stepper > .step-cont > .step:focus-visible {
		box-shadow: var(--panda-component-outline, 0px 0px 0px 2px hsl(216deg 88% 60% / 40%));
	}


`;