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
		padding: var(--panda-padding-l);
		gap: var(--panda-padding-m);
		opacity: 0;
		top: -20px;

		transition: all 200ms ease-in-out;

		border-radius: var(--panda-border-radius-m);
		background-color: #fff;
		box-shadow: var(--panda-elevation-m);
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
		width: var(--panda-component-size-m);
		height: var(--panda-component-size-m);

		--dragon-icon-width: var(--panda-icon-size-m);
		--dragon-icon-height: var(--panda-icon-size-m);
	}

	.toast .content {
		display: flex;
		flex-flow: column;
		flex-grow: 1;
		justify-content: center;
	}

	.toast .title {
		color: var(--panda-header-text-color);
		font-size: var(--panda-font-size-l);
		font-family: var(--panda-font-family-bold);
		user-select: none;
	}

	.toast .message {
		color: var(--panda-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family);
		user-select: none;
	}

	.toast .btn-close {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-component-size-s);
		height: var(--panda-component-size-s);

		transition: all 300ms ease-in-out;
		cursor: pointer;
		border-radius: var(--panda-border-radius-m);

		--panda-icon-width: var(--panda-icon-size-s);
		--panda-icon-height: var(--panda-icon-size-s);
	}

	.toast .btn-close:hover {
		background-color: var(--panda-button-background-color-hover);
	}

	/* ===================================================================== */
	/* TOAST POSITION ====================================================== */
	/* ===================================================================== */

	:host(.top-center) {
		top: 10px;
		bottom: unset;
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
		color: var(--panda-action-text-color-info);
	}

	:host([theme~="info"]) .toast .icon,
	:host([theme~="info"]) .toast .btn-close {
		--panda-icon-color: var(--panda-action-text-color-info);
	}

	/* DONE */

	:host([theme~="done"]) .toast {
		background-color: var(--panda-action-color-done);
	}

	:host([theme~="done"]) .toast .title,
	:host([theme~="done"]) .toast .message {
		color: var(--panda-action-text-color-done);
	}

	:host([theme~="done"]) .toast .icon,
	:host([theme~="done"]) .toast .btn-close {
		--panda-icon-color: var(--panda-action-text-color-done);
	}

	/* WARN */

	:host([theme~="warn"]) .toast {
		background-color: var(--panda-action-color-warn);
	}

	:host([theme~="warn"]) .toast .title,
	:host([theme~="warn"]) .toast .message {
		color: var(--panda-action-text-color-warn);
	}

	:host([theme~="warn"]) .toast .icon,
	:host([theme~="warn"]) .toast .btn-close {
		--panda-icon-color: var(--panda-action-text-color-warn);
	}

	/* ALERT */

	:host([theme~="alert"]) .toast {
		background-color: var(--panda-action-color-alert);
	}

	:host([theme~="alert"]) .toast .title,
	:host([theme~="alert"]) .toast .message {
		color: var(--panda-action-text-color-alert);
	}

	:host([theme~="alert"]) .toast .icon,
	:host([theme~="alert"]) .toast .btn-close {
		--panda-icon-color: var(--panda-action-text-color-alert);
	}

	/* PRIMARY */

	:host([theme~="primary"]) .toast {
		background-color: var(--panda-primary-color);
	}

	:host([theme~="primary"]) .toast .title,
	:host([theme~="primary"]) .toast .message {
		color: var(--panda-primary-text-color);
	}

	:host([theme~="primary"]) .toast .icon,
	:host([theme~="primary"]) .toast .btn-close {
		--panda-icon-color: var(--panda-primary-text-color);
	}

	/* SECONDARY */

	:host([theme~="secondary"]) .toast {
		background-color: var(--panda-secondary-color);
	}

	:host([theme~="secondary"]) .toast .title,
	:host([theme~="secondary"]) .toast .message {
		color: var(--panda-secondary-text-color);
	}

	:host([theme~="secondary"]) .toast .icon,
	:host([theme~="secondary"]) .toast .btn-close {
		--panda-icon-color: var(--panda-secondary-text-color);
	}
`;