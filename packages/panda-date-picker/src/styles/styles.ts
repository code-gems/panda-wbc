import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		height: 40px;
	}

	.date-picker {
		position: relative;
		display: grid;
		grid-template-columns: 40px minmax(0, 1fr) auto 40px;
		width: 100%;
		width: fit-content;
		height: 40px;

		transition: all 200ms ease-in-out;
		
		border: 2px solid var(--panda-input-bg-color, hsl(0deg 0% 95%));
		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-input-bg-color, hsl(0deg 0% 95%));
		box-sizing: border-box;
	}
	:host([focused]) .date-picker {
		border: 2px solid var(--panda-primary-color, hsl(196deg 100% 47%));
	}

	.date-input { flex-grow: 1; }

	.date-input .input-field {
		width: 100%;
		height: 100%;
		padding-left: 10px;
		outline: none;

		color: var(--panda-txt-color, hsl(0deg 0% 29%));
		font-family: var(--panda-font-family, "Poppins");
		font-size: var(--panda-font-size-m, 14px);
		font-weight: bold;

		border: none;
		background-color: transparent;
		box-sizing: border-box;
	}

	.icon {
		display: flex;
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		justify-content: center;
		align-items: center;
		opacity: 0.8;
		cursor: pointer;
		transition: all 200ms ease-in-out;
	}
	:host([focused]) .icon { opacity: 1; }
	
	.spinner-cont {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		left: 0px;
		top: 0px;

		border-radius: var(--panda-border-radius-m, 5px);
		background: var(--panda-input-bg-color, hsl(0deg 0% 95%));
	}
	.spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-txt-color, hsl(0deg 0% 29%));
	}

	/* === STATE === */
	
	/* DISABLED */

	:host([disabled]) .date-picker {
		border: 2px solid var(--panda-input-bg-color-disabled, hsl(0deg 0% 90%));
		background-color: var(--panda-input-bg-color-disabled, hsl(0deg 0% 90%));
	}

	:host([disabled]) .date-input .input-field {
		color: var(--panda-input-txt-color-disabled, hsl(0deg 0% 70%));
	}

	:host([disabled]) .icon {
		pointer-events: none;
		cursor: default;
	}

	:host([disabled]) .icon panda-icon {
		--panda-icon-fill-color: var(--panda-input-txt-color-disabled, hsl(0deg 0% 70%));
	}

	/* === THEMES === */
	
	/* PRIMARY */

	:host([theme~="primary"]) .date-picker {
		border: 2px solid var(--panda-primary-color, hsl(196deg 100% 47%));
		background-color: var(--panda-primary-color, hsl(196deg 100% 47%));
		box-shadow: 0px 2px 4px var(--panda-primary-color-50opc, hsl(0deg 0% 0% / 50%));
	}
	
	:host([theme~="primary"][focused]) .date-picker {
		border: 2px solid var(--panda-primary-color-hover, hsl(196deg 100% 51%));
		background-color: var(--panda-primary-color-hover, hsl(196deg 100% 51%));
	}

	:host([theme~="primary"]) .input-field {
		color: var(--panda-primary-color-txt, hsl(0deg 0% 100%));
		text-shadow: 0px 1px 1px var(--panda-shadow-color-50opc, hsl(0deg 0% 0% / 50%));
	}

	:host([theme~="primary"]) .icon panda-icon {
		--panda-icon-fill-color: var(--panda-primary-color-txt, hsl(0deg 0% 100%));
	}

`;

export const modifiers = css`
	.txt-color-label { color: var(--panda-label-color); }
`;