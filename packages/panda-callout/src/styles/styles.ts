import { css } from "lit"

export const styles = css`
	:host {
		display: block;
		user-select: none;
	}

	.callout {
		display: flex;
		flex-flow: column;
		padding: var(--panda-padding-l, 15px);

		border-radius: var(--panda-border-radius-m, 5px);
		border: 1px solid;
		border-left: 4px solid;
		border-color: var(--panda-text-color, hsl(0deg 0% 15%));
		background-color: var(--panda-background-color-100, hsl(0deg 0% 97%));
		box-shadow: 0px 1px 2px var(--panda-black-color-20opc, hsl(0deg 0% 0% / 20%));
	}

	.with-footer .callout {
		gap: var(--panda-padding-m, 10px);
	}

	.callout .header {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--panda-padding-s, 5px);
	}
	
	.callout .header .header-text {
		flex-grow: 1;
		line-height: var(--panda-component-size-m, 30px);
		color: var(--panda-input-text-color, hsl(0deg 0% 16%));
		font-size: var(--panda-font-size-l, 14px);
		font-family: var(--panda-font-family-bold, "Poppins-Bold");
		text-shadow: var(--panda-header-text-shadow, "none");
		user-select: none;
	}

	.callout .body {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: var(--panda-padding-s, 5px);
	}

	.callout .body .icon,
	.callout .body .btn-close {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-component-size-m, 30px);
		height: var(--panda-component-size-m, 30px);

		transition: all 200ms ease-in-out;
		border-radius: var(--panda-border-radius-m, 5px);

		--panda-icon-color: var(--panda-text-color, hsl(0deg 0% 15%));
		--panda-icon-width: var(--panda-icon-size-m, 20px);
		--panda-icon-height: var(--panda-icon-size-m, 20px);
	}

	.callout .body .btn-close {
		cursor: pointer;
		--panda-icon-width: var(--panda-icon-size-m, 20px);
		--panda-icon-height: var(--panda-icon-size-m, 20px);
	}

	.callout .body .btn-close:hover {
		background-color: var(--panda-button-background-color-hover, #fff);
	}

	.callout .body .message {
		flex-grow: 1;
		display: flex;
		flex-flow: column;

		color: var(--panda-input-text-color, hsl(0deg 0% 15%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
		text-shadow: var(--panda-text-shadow, "none");
		user-select: none;
	}

	.with-header .callout .body .message {
		gap: var(--panda-padding-s, 5px);
	}

	.callout .footer {
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
	:host([theme~="primary"]) .callout {
		border-color: var(--panda-primary-color, hsl(209deg 78% 46%));
		background-color: var(--panda-primary-color-10opc, hsl(209deg 78% 46% / 10%));
	}

	/* SECONDARY */
	:host([theme~="secondary"]) .callout {
		border-color: var(--panda-secondary-color, hsl(160deg 81% 43%));
		background-color: var(--panda-secondary-color-10opc, hsl(160deg 81% 43% / 10%));
	}

	/* TERTIARY */
	:host([theme~="tertiary"]) .callout {
		border-color: var(--panda-tertiary-color, hsl(160deg 81% 43%));
		background-color: var(--panda-tertiary-color-10opc, hsl(160deg 81% 43% / 10%));
	}

	/* INFO */	
	:host([theme~="info"]) .callout {
		border-color: var(--panda-action-color-info, hsl(181deg 52% 53%));
		background-color: var(--panda-action-color-info-10opc, hsl(181deg 52% 53% / 10%));
	}

	/* DONE */
	:host([theme~="done"]) .callout {
		border-color: var(--panda-action-color-done, hsl(160deg 81% 43%));
		background-color: var(--panda-action-color-done-10opc, hsl(160deg 81% 43% / 10%));
	}

	/* WARN */
	:host([theme~="warn"]) .callout {
		border-color: var(--panda-action-color-warn, hsl(35deg 91% 62%));
		background-color: var(--panda-action-color-warn-10opc, hsl(35deg 91% 62% / 10%));
	}

	/* ALERT */
	:host([theme~="alert"]) .callout {
		border-color: var(--panda-action-color-alert, hsl(14deg 77% 62%));
		background-color: var(--panda-action-color-alert-10opc, hsl(14deg 77% 62% / 10%));
	}

	/* INLINE */
	:host([theme~="center-icons"]) .icon,
	:host([theme~="center-icons"]) .btn-close {
		height: auto;
	}
`;
