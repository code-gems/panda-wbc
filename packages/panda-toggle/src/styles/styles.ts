import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		position: relative;
		width: calc(var(--panda-component-size-m) * 2);
		height: var(--panda-component-size-m);
		user-select: none;
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

	.spinner-cont {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		inset: 0;
		justify-content: center;
		align-items: center;

		border-radius: calc(var(--panda-component-size-m) / 2);
		background-color: var(--panda-toggle-track-color);
		--panda-spinner-color: var(--panda-toggle-handle-color);
	}

	.toggle {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		outline: none;
		cursor: pointer;
		border-radius: calc(var(--panda-component-size-m) / 2);
	}

	.toggle:not(.disabled):focus {
		box-shadow: 0px 0px 0px 3px var(--panda-outline-color);
	}

	.toggle-track {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;

		transform: translate(-50%, -50%);
		transition: all 400ms ease-in-out;

		border-radius: calc(var(--panda-component-size-m) / 2);
		background-color: var(--panda-toggle-track-color);
	}

	.toggle-handle {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;

		width: calc(var(--panda-component-size-m) - calc(var(--panda-toggle-handle-gap) * 2));
		height: calc(var(--panda-component-size-m) - calc(var(--panda-toggle-handle-gap) * 2));
		top: var(--panda-toggle-handle-gap);
		
		transform: translateX(var(--panda-toggle-handle-gap));
		transition: transform 400ms ease-in-out;

		border-radius: 50%;
		background-color: var(--panda-toggle-handle-color);
		box-shadow: 0px 1px 2px var(--panda-black-color-50opc);
	}

	.toggle.selected .toggle-track {
		background-color: var(--panda-primary-color);
	}

	.toggle.selected .toggle-handle {
		transform: translateX(calc(var(--panda-component-size-m) + var(--panda-toggle-handle-gap)));
	}

	.icon {
		position: absolute;
		opacity: 0;
		transition: opacity 400ms ease-in-out;
		--panda-icon-color: var(--panda-toggle-track-color);
		--panda-icon-width: var(--panda-icon-size-s);
		--panda-icon-height: var(--panda-icon-size-s);
	}
	
	.icon-selected { opacity: 0; }
	.icon-unselected { opacity: 1; }
	.selected .icon-selected { opacity: 1; }
	.selected .icon-unselected { opacity: 0; }

	/* ===================================================================== */
	/* COMPONENT STATES ==================================================== */
	/* ===================================================================== */

	/* INDETERMINATE */
	:host([indeterminate]) .toggle-handle {
		height: 4px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 2px;
	}

	/* DISABLED */
	:host([disabled]) .toggle {
		cursor: not-allowed;
	}

	:host([disabled]) .toggle-track {
		background-color: var(--panda-toggle-track-color-disabled);
	}

	:host([disabled]) .toggle-handle {
		background-color: var(--panda-toggle-handle-color-disabled);
		box-shadow: none;
	}

	:host([disabled]) .icon {
		--panda-icon-color: var(--panda-toggle-track-color-disabled);
	}

	/* ===================================================================== */
	/* THEMES ============================================================== */
	/* ===================================================================== */

	/* SLIM */
	:host([theme~="slim"]) .toggle-track  {
		width: 90%;
		height: 6px;
	}

	/* SIZE-S */
	:host([theme~="size-s"]) {
		width: calc(var(--panda-component-size-s) * 2);
		height: var(--panda-component-size-s);
	}

	:host([theme~="size-s"]) .toggle-handle {
		width: calc(var(--panda-component-size-s) - calc(var(--panda-toggle-handle-gap) * 2));
		height: calc(var(--panda-component-size-s) - calc(var(--panda-toggle-handle-gap) * 2));
	}

	:host([theme~="size-s"]) .toggle.selected .toggle-handle {
		transform: translateX(calc(var(--panda-component-size-s) + var(--panda-toggle-handle-gap)));
	}

	:host([theme~="size-s"]) .icon {
		--panda-icon-width: var(--panda-icon-size-xs);
		--panda-icon-height: var(--panda-icon-size-xs);
	}

	/* SIZE-XS */
	:host([theme~="size-xs"]) {
		width: calc(var(--panda-component-size-xs) * 2);
		height: var(--panda-component-size-xs);
	}

	:host([theme~="size-xs"]) .toggle-handle {
		width: calc(var(--panda-component-size-xs) - calc(var(--panda-toggle-handle-gap) * 2));
		height: calc(var(--panda-component-size-xs) - calc(var(--panda-toggle-handle-gap) * 2));
	}

	:host([theme~="size-xs"]) .toggle.selected .toggle-handle {
		transform: translateX(calc(var(--panda-component-size-xs) + var(--panda-toggle-handle-gap)));
	}

	:host([theme~="size-xs"]) .icon {
		--panda-icon-width: var(--panda-icon-size-xxs);
		--panda-icon-height: var(--panda-icon-size-xxs);
	}

	/* INFO */
	:host([theme~="info"]) .toggle.selected .toggle-track  {
		background-color: var(--panda-action-color-info);
	}

	/* DONE */
	:host([theme~="done"]) .toggle.selected .toggle-track  {
		background-color: var(--panda-action-color-done);
	}

	/* WARN */
	:host([theme~="warn"]) .toggle.selected .toggle-track  {
		background-color: var(--panda-action-color-warn);
	}

	/* ALERT */
	:host([theme~="alert"]) .toggle.selected .toggle-track  {
		background-color: var(--panda-action-color-alert);
	}

`; 