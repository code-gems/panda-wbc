// utils
import { css } from "lit";

export const styles = css`
	:host {
		/* position: fixed; */
		display: block;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9999;
	}

	.toast {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		width: fit-content;
		max-width: 15dvw;
		padding: var(--panda-padding-l, 15px);
		gap: var(--panda-padding-m, 10px);
		opacity: 0;
		top: -20px;

		transition: all 200ms ease-in-out;

		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-toast-background-color, hsl(209deg 26% 20%));
		box-shadow: var(--panda-toast-elevation, 0px 2px 4px hsl(0deg 0% 0% / 20%));
	}

	.toast.show {
		opacity: 1;
		top: 0px;
	}
	
	.toast .icon {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-component-size-m, 30px);
		height: var(--panda-component-size-m, 30px);

		--dragon-icon-width: var(--panda-icon-size-m, 20px);
		--dragon-icon-height: var(--panda-icon-size-m, 20px);
	}

	.toast .content {
		display: flex;
		flex-flow: column;
		flex-grow: 1;
		justify-content: center;
	}

	.toast .title {
		color: var(--panda-toast-header-text-color, hsl(0deg 0% 100%));
		font-size: var(--panda-toast-header-font-size, 16px);
		font-family: var(--panda-toast-header-font-family, "Poppins-Bold");
		user-select: none;
	}

	.toast .message {
		color: var(--pand-toast-text-color, hsl(0deg 0% 92%));
		font-size: var(--panda-toast-font-size, 14px);
		font-family: var(--panda-toast-font-family, "Poppins");
		user-select: none;
	}

	.toast .btn-close {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-component-size-s, 24px);
		height: var(--panda-component-size-s, 24px);

		transition: all 200ms ease-in-out;
		cursor: pointer;

		border-radius: var(--panda-border-radius-m, 10px);
		background-color: var(--panda-toast-button-background-color, transparent);

		--panda-icon-width: var(--panda-icon-size-s);
		--panda-icon-height: var(--panda-icon-size-s);
	}

	.toast .btn-close:hover {
		background-color: var(--panda-toast-button-background-color-hover, hsl(0deg 0% 100% / 10%));
	}

	/* ===================================================================== */
	/* TOAST POSITION ====================================================== */
	/* ===================================================================== */

	:host(.top-center) {
		top: 10px;
		bottom: unset;
	}

	:host(.top-left) {
		top: 10px;
		bottom: unset;
		left: 10px;
		transform: unset;
	}

	:host(.top-right) {
		top: 10px;
		bottom: unset;
		left: unset;
		right: 10px;
		transform: unset;
	}

	:host(.bottom-left) {
		left: 10px;
		transform: unset;
	}

	:host(.bottom-right) {
		left: unset;
		right: 10px;
		transform: unset;
	}

	/* ===================================================================== */
	/* THEMES ============================================================== */
	/* ===================================================================== */

	/* INFO */

	:host([theme~="info"]) .toast {
		background-color: var(--panda-action-color-info);
	}

	:host([theme~="info"]) .toast .title,
	:host([theme~="info"]) .toast .message {
		color: var(--panda-action-text-color-info, hsl(0deg 0% 100%));
	}

	:host([theme~="info"]) .toast .icon,
	:host([theme~="info"]) .toast .btn-close {
		--panda-icon-color: var(--panda-action-text-color-info, hsl(0deg 0% 100%));
	}

	/* DONE */

	:host([theme~="done"]) .toast {
		background-color: var(--panda-action-color-done);
	}

	:host([theme~="done"]) .toast .title,
	:host([theme~="done"]) .toast .message {
		color: var(--panda-action-text-color-done, hsl(0deg 0% 100%));
	}

	:host([theme~="done"]) .toast .icon,
	:host([theme~="done"]) .toast .btn-close {
		--panda-icon-color: var(--panda-action-text-color-done, hsl(0deg 0% 100%));
	}

	/* WARN */

	:host([theme~="warn"]) .toast {
		background-color: var(--panda-action-color-warn);
	}

	:host([theme~="warn"]) .toast .title,
	:host([theme~="warn"]) .toast .message {
		color: var(--panda-action-text-color-warn, hsl(0deg 0% 100%));
	}

	:host([theme~="warn"]) .toast .icon,
	:host([theme~="warn"]) .toast .btn-close {
		--panda-icon-color: var(--panda-action-text-color-warn, hsl(0deg 0% 100%));
	}

	/* ALERT */

	:host([theme~="alert"]) .toast {
		background-color: var(--panda-action-color-alert);
	}

	:host([theme~="alert"]) .toast .title,
	:host([theme~="alert"]) .toast .message {
		color: var(--panda-action-text-color-alert, hsl(0deg 0% 100%));
	}

	:host([theme~="alert"]) .toast .icon,
	:host([theme~="alert"]) .toast .btn-close {
		--panda-icon-color: var(--panda-action-text-color-alert, hsl(0deg 0% 100%));
	}

	/* PRIMARY */

	:host([theme~="primary"]) .toast {
		background-color: var(--panda-primary-color, hsl(209deg 78% 46%));
	}

	:host([theme~="primary"]) .toast .title,
	:host([theme~="primary"]) .toast .message {
		color: var(--panda-primary-text-color, hsl(0deg 0% 100%));
	}

	:host([theme~="primary"]) .toast .icon,
	:host([theme~="primary"]) .toast .btn-close {
		--panda-icon-color: var(--panda-primary-text-color, hsl(0deg 0% 100%));
	}

	/* SECONDARY */

	:host([theme~="secondary"]) .toast {
		background-color: var(--panda-secondary-color, hsl(160deg 81% 43%));
	}

	:host([theme~="secondary"]) .toast .title,
	:host([theme~="secondary"]) .toast .message {
		color: var(--panda-secondary-text-color, hsl(0deg 0% 100%));
	}

	:host([theme~="secondary"]) .toast .icon,
	:host([theme~="secondary"]) .toast .btn-close {
		--panda-icon-color: var(--panda-secondary-text-color, hsl(0deg 0% 100%));
	}

	/* TERTIARY */

	:host([theme~="tertiary"]) .toast {
		background-color: var(--panda-tertiary-color, hsl(209deg 24% 47%);
	}

	:host([theme~="tertiary"]) .toast .title,
	:host([theme~="tertiary"]) .toast .message {
		color: var(--panda-tertiary-text-color, hsl(0deg 0% 100%));
	}

	:host([theme~="tertiary"]) .toast .icon,
	:host([theme~="tertiary"]) .toast .btn-close {
		--panda-icon-color: var(--panda-tertiary-text-color, hsl(0deg 0% 100%));
	}
`;