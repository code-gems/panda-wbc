import { css } from "lit"

export const styles = css`
	:host {
		position: relative;
		display: block;
		width: 100%;
	}
	
	.notifications-cont {
		position: fixed;
		display: flex;
		flex-flow: column;
		z-index: 9999;
	}
	
	.notifications-cont.local {
		position: absolute;
		height: 100%;
	}

	.notifications {
		display: flex;
		flex-flow: column;
		padding: var(--panda-padding-m, 10px);
	}
	
	.common-actions {
		display: none;
		flex-flow: row nowrap;
		justify-content: flex-end;
		gap: var(--panda-padding-m, 10px);
		width: fit-content;
		padding: var(--panda-padding-m, 10px);
		padding-bottom: 0px;
	}

	.common-actions.show {
		display: flex;
	}

	/* NOTIFICATION POSITION */
	.notifications-cont.top-center {
		transform: translateX(-50%);
	}
	.notifications-cont.top-center,
	.notifications-cont.top-center .notifications {
		align-items: center;
		top: 0%;
		left: 50%;
	}

	.notifications-cont.top-left,
	.notifications-cont.top-left .notifications {
		top: 0%;
		left: 0%;
	}

	.notifications-cont.top-right,
	.notifications-cont.top-right .notifications {
		align-items: flex-end;
		top: 0%;
		right: 0%;
	}

	.notifications-cont.bottom-right,
	.notifications-cont.bottom-right .notifications {
		flex-flow: column-reverse;
		align-items: flex-end;
		bottom: 0%;
		right: 0%;
	}
	
	.notifications-cont.bottom-left,
	.notifications-cont.bottom-left .notifications {
		flex-flow: column-reverse;
		bottom: 0%;
		left: 0%;
		padding-bottom: 0px;
	}

	.notifications-cont.bottom-center {
		transform: translateX(-50%);
	}
	.notifications-cont.bottom-center,
	.notifications-cont.bottom-center .notifications {
		flex-flow: column-reverse;
		align-items: center;
		bottom: 0%;
		left: 50%;
		padding-bottom: 0px;
	}
	
	.notifications-cont.bottom-left .common-actions,
	.notifications-cont.bottom-right .common-actions {
		padding-top: 0px;
		padding-bottom: var(--panda-padding-m, 10px);
	}

	.notifications-cont.top-left .common-actions,
	.notifications-cont.bottom-right .common-actions {
		justify-content: start;
	}
`;

export const notificationStyles = css`
	:host {
		display: block;
		min-width: 20dvw;
		user-select: none;
	}

	.notification-cont {
		transition: all 400ms ease;
	}

	.notification-wrap {
		/* overflow: hidden; */
	}
	
	.notification {
		position: relative;
		display: flex;
		flex-flow: column;
		max-width: 20dvw;
		padding: var(--panda-padding-m, 10px);
		margin-bottom: var(--panda-padding-m, 10px);
		overflow: hidden;

		animation-name: show-right;
		animation-duration: 400ms;
		animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

		border-radius: var(--panda-border-radius-m, 5px);
		border: 1px solid var(--panda-notification-border-color, hsl(210deg 25% 35%));
		background-color: var(--panda-notification-background-color, hsl(209deg 26% 20%));
		box-shadow: 0px 1px 2px var(--panda-black-color-20opc, hsl(0deg 0% 0% / 20%));
	}

	.notification-cont.closing .notification {
		animation-name: hide-right;
		animation-fill-mode: forwards;
	}

	.notification-cont.top-left .notification,
	.notification-cont.bottom-left .notification {
		animation-name: show-left;
	}
	
	.notification-cont.top-left.closing .notification,
	.notification-cont.bottom-left.closing .notification {
		animation-name: hide-left;
	}

	.notification-cont.top-center .notification {
		animation-name: show-top;
	}
	
	.notification-cont.top-center.closing .notification {
		animation-name: hide-top;
	}

	.notification-cont.bottom-center .notification {
		animation-name: show-bottom;
	}
	
	.notification-cont.bottom-center.closing .notification {
		animation-name: hide-bottom;
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
			var(--panda-secondary-color, hsl(160deg 81% 43%)) 100%
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

	/* =========================================================== */
	/* THEMES ==================================================== */
	/* =========================================================== */
	
	/* PRIMARY */
	:host([theme~="primary"]) .notification::before {
		background: none;
		background-color: var(--panda-primary-color, hsl(209deg 78% 46%));
	}

	/* SECONDARY */
	:host([theme~="secondary"]) .notification::before {
		background: none;
		background-color: var(--panda-secondary-color, hsl(160deg 81% 43%));
	}

	/* TERTIARY */
	:host([theme~="tertiary"]) .notification::before {
		background: none;
		background-color: var(--panda-tertiary-color, hsl(160deg 81% 43%));
	}

	/* INFO */	
	:host([theme~="info"]) .notification::before {
		background: none;
		background-color: var(--panda-action-color-info, hsl(181deg 52% 53%));
	}

	/* DONE */
	:host([theme~="done"]) .notification::before {
		background: none;
		background-color: var(--panda-action-color-done, hsl(160deg 81% 43%));
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

	@keyframes show-top {
		from { opacity: 0; top: -50px; }
		to { opacity: 1; top: 0px; }
	}

	@keyframes hide-top {
		from { opacity: 1; top: 0px; }
		to { opacity: 0; top: -50px; }
	}

	@keyframes show-bottom {
		from { opacity: 0; bottom: -50px; }
		to { opacity: 1; bottom: 0px; }
	}

	@keyframes hide-bottom {
		from { opacity: 1; bottom: 0px; }
		to { opacity: 0; bottom: -50px; }
	}

	@keyframes show-right {
		from { opacity: 0; right: -50px; }
		to { opacity: 1; right: 0px; }
	}

	@keyframes hide-right {
		from { opacity: 1; right: 0px; }
		to { opacity: 0; right: -50px; }
	}

	@keyframes show-left {
		from { opacity: 0; left: -50px; }
		to { opacity: 1; left: 0px; }
	}

	@keyframes hide-left {
		from { opacity: 1; left: 0px; }
		to { opacity: 0; left: -50px; }
	}

	@media all and (max-width: 1280px) {
		.notification { max-width: 30dvw; }
	}

	@media all and (max-width: 1024px) {
		.notification { max-width: 50dvw; }
	}

	@media all and (max-width: 768px) {
		.notification { max-width: 100dvw; }
	}
`;
