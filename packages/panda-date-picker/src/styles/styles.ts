import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		height: 40px;
	}

	.date-picker {
		position: relative;
		display: grid;
		grid-template-columns: 40px minmax(0, 1fr) auto;
		width: 100%;
		width: fit-content;
		height: 40px;

		transition: all 200ms ease-in-out;
		
		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-input-bg-color, hsl(0deg 0% 95%));
		box-shadow: 0px 0px 0px 2px transparent;
		box-sizing: border-box;
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
		background-color: var(--panda-primary, hsl(196deg 100% 47%));
	}
	
	:host([theme~="primary"][focused]) .date-picker {
		background-color: var(--panda-primary-hover, hsl(196deg 100% 51%));
		box-shadow: 0px 2px 4px var(--panda-primary-50opc, hsl(0deg 0% 0% / 50%));
	}

	:host([theme~="primary"]) .input-field {
		color: var(--panda-primary-color, hsl(0deg 0% 100%));
		text-shadow: 0px 1px 1px var(--panda-shadow-50opc, hsl(0deg 0% 0% / 50%));
	}

	:host([theme~="primary"]) .icon panda-icon {
		--panda-icon-fill-color: var(--panda-primary-color, hsl(0deg 0% 100%));
	}

	/* ACTION THEMES */

	:host([theme~="mandatory"]:not([disabled])) .date-picker {
		box-shadow: 0px 0px 0px 2px var(--panda-action-warn, hsl(35deg 91% 62%));
	}

	:host([theme~="invalid"]:not([disabled])) .date-picker,
	:host([invalid]:not([disabled])) .date-picker {
		box-shadow: 0px 0px 0px 2px var(--panda-action-fail, hsl(14deg 77% 62%));
	}

	:host([theme~="valid"]:not([disabled])) .date-picker,
	:host([valid]:not([disabled])) .date-picker {
		box-shadow: 0px 0px 0px 2px var(--panda-action-done, hsl(160deg 81% 43%));
	}

	:host([focused]) .date-picker {
		box-shadow: 0px 0px 0px 2px var(--panda-primary, hsl(196deg 100% 47%));
	}

`;

export const modifiers = css`
	.txt-color-label { color: var(--panda-label-color); }
	.hidden { visibility: hidden; }

	.scroll::-webkit-scrollbar { width: 5px; }
	.scroll::-webkit-scrollbar-track { background-color: var(--panda-bg-color, hsl(0deg 0% 100%)); }
	.scroll::-webkit-scrollbar-thumb { background-color: var(--panda-bg-color-100, hsl(0deg 0% 95%)); }
	.scroll::-webkit-scrollbar-thumb:hover { background-color: var(--panda-bg-color-200, hsl(0deg 0% 90%)); }
`;

export const callout = css`
	.callout-cont {
		display: block;
		padding: var(--panda-padding-s);
	}

	.callout {
		display: flex;
		flex-flow: row nowrap;
		padding: var(--panda-padding-s);

		border-radius: none;
		background-color: var(--panda-action-color-info, hsl(181deg 52% 53%));
	}

	.callout .icon {
		display: flex;
		width: var(--panda-button-size-m, 40px);
		height: var(--panda-button-size-m, 40px);
		justify-content: center;
		align-items: center;
		--panda-icon-width: var(--panda-icon-size-s, 18px);
		--panda-icon-height: var(--panda-icon-size-s, 18px);
		--panda-icon-color: var(--panda-action-info-color, hsl(0deg 0% 100%));
	}

	.callout .message {
		color: var(--panda-action-info-color, hsl(0deg 0% 100%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
		text-overflow: ellipsis;
		text-shadow: none;
		user-select: none;
	}
`;