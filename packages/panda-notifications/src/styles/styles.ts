import { css } from "lit"

export const styles = css`
	:host {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
	}

	.notifications-cont {
		position: fixed;
		right: 0%;
		bottom: 0%;
		z-index: 9999;
	}

	.notifications-cont.local {
		position: absolute;
	}

	.notifications {
		position: absolute;
		display: flex;
		flex-flow: column;
		gap: var(--panda-padding-m, 10px);
		right: 0%;
		bottom: 0%;
		padding: var(--panda-padding-m, 10px);
	}
`;

export const notificationStyles = css`
	:host {
		display: block;
		min-width: 20vw;
		user-select: none;
	}

	.notification-cont {
		display: grid;
		grid-template-rows: 1fr;
		opacity: 1;
		transition: all 1s ease;
	}

	.notification-cont.closing {
		grid-template-rows: 0fr;
		opacity: 0;
	}

	.notification-wrap {
		overflow: hidden;
	}
	
	.notification {
		position: relative;
		display: flex;
		flex-flow: column;
		padding: var(--panda-padding-l, 15px);

		animation: show;
		animation-duration: 400ms;
		animation-fill-mode: forwards;
		transition: all 400ms ease-in-out;

		border-radius: var(--panda-border-radius-m, 5px);
		border: 1px solid var(--panda-notification-border-color, hsl(210deg 25% 35%));
		background-color: var(--panda-notification-background-color, hsl(209deg 26% 20%));
		box-shadow: 0px 1px 2px var(--panda-black-color-20opc, hsl(0deg 0% 0% / 20%));
	}

	.notification.no-icon {
		padding-left: calc(var(--panda-padding-l, 15px) + 5px);
	}

	.notification::before {
		position: absolute;
		display: block;
		content: " ";
		width: 4px;
		inset: 4px;

		transition: all 400ms ease-in-out;

		border-radius: 4px;
		background-color: var(--panda-primary-color, hsl(209deg 78% 46%));
		background: linear-gradient(
			180deg,
			var(--panda-primary-color, hsl(209deg 78% 46%)) 0%,
			var(--panda-secondary-color, hsl(164deg 67% 45%)) 100%
		);
	}

	.notification.with-footer {
		gap: var(--panda-padding-m, 10px);
	}

	.notification .header {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--panda-padding-m, 10px);
	}
	
	.notification .header .header-text {
		flex-grow: 1;
		line-height: var(--panda-component-size-m, 30px);
		color: var(--panda-notification-header-text-color, hsl(0deg 0% 100%));
		text-shadow: var(--panda-notification-header-text-shadow, "none");
		font-size: var(--panda-notification-header-font-size, 16px);
		font-family: var(--panda-notification-header-font-family, "Poppins-Bold");
		user-select: none;
	}

	.notification .body {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--panda-padding-m, 10px);
	}

	.notification .body .icon,
	.notification .body .btn-close {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-component-size-m, 30px);
		height: var(--panda-component-size-m, 30px);

		transition: all 200ms ease-in-out;
		border-radius: var(--panda-border-radius-m, 5px);

		--panda-icon-color: var(--panda-notification-text-color, hsl(0deg 0% 92%));
		--panda-icon-width: var(--panda-icon-size-m, 20px);
		--panda-icon-height: var(--panda-icon-size-m, 20px);
	}

	.notification .body .btn-close {
		cursor: pointer;
		--panda-icon-width: var(--panda-icon-size-m, 20px);
		--panda-icon-height: var(--panda-icon-size-m, 20px);
	}

	.notification .body .btn-close:hover {
		background-color: var(--panda-notification-button-background-color-hover, hsl(0deg 0% 100% / 10%));
	}

	.notification .body .message {
		flex-grow: 1;
		display: flex;
		flex-flow: column;
		justify-content: center;

		color: var(--panda-notification-text-color, hsl(0deg 0% 92%));
		text-shadow: var(--panda-notification-text-shadow, "none");
		font-size: var(--panda-notification-font-size, 14px);
		font-family: var(--panda-notification-font-family, "Poppins");
		user-select: none;
	}

	.notification.with-header .body .message {
		gap: var(--panda-padding-s, 5px);
	}

	.notification .footer {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
	}

	slot[name="footer"]::slotted(*) {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--panda-padding-m, 10px);
	}

	/* THEMES ==================================================== */
	
	/* PRIMARY */
	:host([theme~="primary"]) .notification::before {
		background: none;
		background-color: var(--panda-primary-color, hsl(209deg 78% 46%));
	}

	/* SECONDARY */
	:host([theme~="secondary"]) .notification::before {
		background: none;
		background-color: var(--panda-secondary-color, hsl(164deg 67% 45%));
	}

	/* TERTIARY */
	:host([theme~="tertiary"]) .notification::before {
		background: none;
		background-color: var(--panda-tertiary-color, hsl(164deg 67% 45%));
	}

	/* INFO */	
	:host([theme~="info"]) .notification::before {
		background: none;
		background-color: var(--panda-action-color-info, hsl(181deg 52% 53%));
	}

	/* DONE */
	:host([theme~="done"]) .notification::before {
		background: none;
		background-color: var(--panda-action-color-done, hsl(164deg 67% 45%));
	}

	/* WARN */
	:host([theme~="warn"]) .notification::before {
		background: none;
		background-color: var(--panda-action-color-warn, hsl(35deg 91% 62%));
	}

	/* ALERT */
	:host([theme~="alert"]) .notification::before {
		background: none;
		background-color: var(--panda-action-color-alert, hsl(14deg 77% 62%));
	}

	/* INLINE */
	:host([theme~="center-icons"]) .icon,
	:host([theme~="center-icons"]) .btn-close {
		height: auto;
	}

	@keyframes show {
		from {
			opacity: 0;
			margin-top: 10px;
		}
		to {
			opacity: 1;
			margin-top: 0px;
		}
	}
`;
