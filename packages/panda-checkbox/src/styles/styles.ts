import { css } from "lit"

export const styles = css`
	:host {
		display: inline-block;
		height: var(--panda-button-height-m, 40px);
	}

	:host slot {
		display: block;
		user-select: none;
	}

	input {
		display: none;
	}

	.checkbox-cont {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;

		color: var(--panda-text-color, hsl(0deg 0% 15%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
		text-shadow: var(--panda-text-shadow, none);
		cursor: pointer;
	}

	input:checked ~ .icon {
		--panda-icon-color: var(--panda-primary-color, hsl(209deg 78% 46%));
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-input-height, 30px);
		height: var(--panda-input-height, 30px);

		--panda-icon-color: var(--panda-text-color, hsl(0deg 0% 15%));
		--panda-icon-width: var(--panda-icon-size-m, 20px);
		--panda-icon-height: var(--panda-icon-size-m, 20px);
	}

	/* COMPONENT STATE =========================================== */

	/* DISABLED */
	:host([disabled]) .checkbox-cont {
		cursor: not-allowed;
		pointer-events: none;
	}

	:host([disabled]) .icon {
		--panda-icon-color: var(--panda-text-color-disabled, hsl(0deg 0% 66%));
	}

	:host([disabled]) slot {
		color: var(--panda-text-color-disabled, hsl(0deg 0% 66%));
	}


	/* THEMES ==================================================== */
	
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
	

`;
