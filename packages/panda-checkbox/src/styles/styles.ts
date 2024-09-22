import { css } from "lit"

export const styles = css`
	:host {
		display: inline-block;
		height: var(--panda-component-size-m, 30px);
	}

	:host slot {
		display: block;
		user-select: none;
	}

	.checkbox {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		outline: none;

		color: var(--panda-text-color, hsl(210deg 5% 25%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
		text-shadow: var(--panda-text-shadow, none);
		cursor: pointer;

		border-radius: var(--panda-border-radius-m, 5px);
	}

	.checkbox:not(.disabled):focus-visible {
		box-shadow: 0px 0px 0px 3px var(--panda-outline-color, hsl(209deg 78% 46% / 40%));
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-input-height, 30px);
		height: var(--panda-input-height, 30px);

		--panda-icon-color: var(--panda-text-color, hsl(210deg 5% 25%));
		--panda-icon-width: var(--panda-icon-size-m, 20px);
		--panda-icon-height: var(--panda-icon-size-m, 20px);
	}

	.checkbox.checked .icon {
		--panda-icon-color: var(--panda-primary-color, hsl(209deg 78% 46%));
	}

	.checkbox.align-right {
		flex-direction: row-reverse;
	}

	/* ===================================================================== */
	/* COMPONENT STATES ==================================================== */
	/* ===================================================================== */

	/* DISABLED */
	:host([disabled]) .checkbox {
		cursor: not-allowed;
	}

	:host([disabled]) .icon {
		--panda-icon-color: var(--panda-text-color-disabled, hsl(210deg 5% 35%));
	}

	:host([disabled]) slot {
		color: var(--panda-text-color-disabled, hsl(210deg 5% 35%));
	}

	/* ===================================================================== */
	/* THEMES ============================================================== */
	/* ===================================================================== */
	
	/* STRIKETHROUGH */
	:host([strikethrough]) slot {
		text-decoration: line-through;
	}

	/* SECONDARY */
	:host([theme~="secondary"]) {
		--panda-icon-color: var(--panda-secondary-color, hsl(160deg 81% 43%));
	}

	/* INFO */
	:host([theme~="info"]) {
		--panda-icon-color: var(--panda-action-color-info, hsl(181deg 52% 53%));
	}

	/* DONE */
	:host([theme~="done"]) {
		--panda-icon-color: var(--panda-action-color-done, hsl(181deg 52% 53%));
	}

	/* WARN */
	:host([theme~="warn"]) {
		--panda-icon-color: var(--panda-action-color-warn, hsl(181deg 52% 53%));
	}

	/* ALERT */
	:host([theme~="alert"]) {
		--panda-icon-color: var(--panda-action-color-alert, hsl(181deg 52% 53%));
	}
`;

export const groupStyles = css`
	.label {
		display: block;
		line-height: 1.6em;

		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-label-font-size, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		user-select: none;
	}

	slot {
		display: flex;
		flex-flow: column;
	}

	slot.horizontal {
		flex-flow: row;
		gap: var(--panda-padding-m, 10px);
	}
`;