export const styles = `
	:host {
		display: inline;
	}

	.badge {
		display: block;
		padding: 0px var(--panda-padding-m, 10px);
		height: var(--panda-component-size-m, 32px);
		line-height: var(--panda-component-size-m, 32px);
		overflow: hidden;

		color: var(--panda-text-color, hsl(0deg 0% 50%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
		text-shadow: 0px 0px 2px var(--panda-black-color-50opc, hsl(0deg 0% 0% / 50%));
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		vertical-align: middle;
		user-select: none;

		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-background-color-900, hsl(0deg 0% 86%));
		box-sizing: border-box;
	}

	.badge.fluid {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panda-padding-s, 5px) var(--panda-padding-m, 10px);
		height: unset;
		min-height: var(--panda-component-size-m, 32px);
		line-height: unset;
		overflow: unset;
		text-overflow: unset;
		white-space: unset;
	}

	.badge.outline {
		text-shadow: 0px 0px 2px var(--panda-background-color-900, hsl(0deg 0% 86%));
		border: 1px solid var(--panda-background-color-900, hsl(0deg 0% 86%));
		background-color: var(--panda-background-color-40opc, hsl(0deg 0% 92% / 40%));
	}

	.badge.flat {
		color: var(--panda-background-color-50, hsl(0deg 0% 100%));
		text-shadow: none;
		background-color: var(--panda-background-color-40opc, hsl(0deg 0% 92% / 40%));
	}

	/* ===================================================================== */
	/* THEMES ============================================================== */
	/* ===================================================================== */

	/* PRIMARY */

	.badge.primary {
		color: var(--panda-primary-text-color, hsl(0deg 0% 100%));
		background-color: var(--panda-primary-color, hsl(209deg 78% 46%));
	}
	
	.badge.primary.outline {
		text-shadow: 0px 0px 2px var(--panda-primary-color, hsl(209deg 78% 46%));
		border: 1px solid var(--panda-primary-color, hsl(209deg 78% 46%));
		background-color: var(--panda-primary-color-40opc, hsl(209deg 78% 46% / 40%));
	}

	.badge.primary.flat {
		color: var(--panda-primary-color, hsl(209deg 78% 46%));
		text-shadow: none;
		background-color: var(--panda-primary-color-40opc, hsl(209deg 78% 46% / 40%));
	}

	/* SECONDARY */

	.badge.secondary {
		color: var(--panda-secondary-text-color, hsl(0deg 0% 100%));
		background-color: var(--panda-secondary-color, hsl(160deg 81% 43%));
	}

	.badge.secondary.outline {
		text-shadow: 0px 0px 2px var(--panda-secondary-color, hsl(160deg 81% 43%));
		border: 1px solid var(--panda-secondary-color, hsl(160deg 81% 43%));
		background-color: var(--panda-secondary-color-40opc, hsl(160deg 81% 43% / 40%));
	}

	.badge.secondary.flat {
		color: var(--panda-secondary-color, hsl(160deg 81% 43%));
		text-shadow: none;
		background-color: var(--panda-secondary-color-40opc, hsl(160deg 81% 43% / 40%));
	}

	/* TERTIARY */

	.badge.tertiary {
		color: var(--panda-tertiary-text-color, hsl(0deg 0% 100%));
		background-color: var(--panda-tertiary-color, hsl(210deg 15% 30%));
	}

	.badge.tertiary.outline {
		text-shadow: 0px 0px 2px var(--panda-tertiary-color, hsl(210deg 15% 30%));
		border: 1px solid var(--panda-tertiary-color, hsl(210deg 15% 30%));
		background-color: var(--panda-tertiary-color-40opc, hsl(210deg 15% 30% / 40%));
	}

	.badge.tertiary.flat {
		color: var(--panda-tertiary-color, hsl(210deg 15% 30%));
		text-shadow: none;
		background-color: var(--panda-tertiary-color-40opc, hsl(210deg 15% 30% / 40%));
	}

	/* INFO */

	.badge.info {
		color: var(--panda-info-text-color, hsl(0deg 0% 100%));
		background-color: var(--panda-info-color, hsl(261deg 66% 58%));
	}

	.badge.info.outline {
		text-shadow: 0px 0px 2px var(--panda-info-color, hsl(261deg 66% 58%));
		border: 1px solid var(--panda-info-color, hsl(261deg 66% 58%));
		background-color: var(--panda-info-color-40opc, hsl(261deg 66% 58% / 40%));
	}

	.badge.info.flat {
		color: var(--panda-info-color, hsl(261deg 66% 58%));
		text-shadow: none;
		background-color: var(--panda-info-color-40opc, hsl(261deg 66% 58% / 40%));
	}

	/* DONE */

	.badge.done {
		color: var(--panda-done-text-color, hsl(0deg 0% 100%));
		background-color: var(--panda-done-color, hsl(160deg 81% 43%));
	}

	.badge.done.outline {
		text-shadow: 0px 0px 2px var(--panda-done-color, hsl(160deg 81% 43%));
		border: 1px solid var(--panda-done-color, hsl(160deg 81% 43%));
		background-color: var(--panda-done-color-40opc, hsl(160deg 81% 43% / 40%));
	}

	.badge.done.flat {
		color: var(--panda-done-color, hsl(160deg 81% 43%));
		text-shadow: none;
		background-color: var(--panda-done-color-40opc, hsl(160deg 81% 43% / 40%));
	}

	/* WARNING */

	.badge.warning {
		color: var(--panda-warning-text-color, hsl(0deg 0% 100%));
		background-color: var(--panda-warning-color, hsl(35deg 91% 62%));
	}

	.badge.warning.outline {
		text-shadow: 0px 0px 2px var(--panda-warning-color, hsl(35deg 91% 62%));
		border: 1px solid var(--panda-warning-color, hsl(35deg 91% 62%));
		background-color: var(--panda-warning-color-40opc, hsl(35deg 91% 62% / 40%));
	}

	.badge.warning.flat {
		color: var(--panda-warning-color, hsl(35deg 91% 62%));
		text-shadow: none;
		background-color: var(--panda-warning-color-40opc, hsl(35deg 91% 62% / 40%));
	}
	
	/* ALERT */

	.badge.alert {
		color: var(--panda-alert-text-color, hsl(0deg 0% 100%));
		background-color: var(--panda-alert-color, hsl(14deg 77% 62%));
	}

	.badge.alert.outline {
		text-shadow: 0px 0px 2px var(--panda-alert-color, hsl(14deg 77% 62%));
		border: 1px solid var(--panda-alert-color, hsl(14deg 77% 62%));
		background-color: var(--panda-alert-color-40opc, hsl(14deg 77% 62% / 40%));
	}

	.badge.alert.flat {
		color: var(--panda-alert-color, hsl(14deg 77% 62%));
		text-shadow: none;
		background-color: var(--panda-alert-color-40opc, hsl(14deg 77% 62% / 40%));
	}

	/* SIZE-S */

	.badge.size-s {
		padding: 0px var(--panda-padding-s, 5px);
		height: var(--panda-component-size-s, 24px);
		line-height: var(--panda-component-size-s, 24px);
		font-size: var(--panda-font-size-s, 12px);
	}

	.badge.size-s.fluid {
		padding: var(--panda-padding-s, 5px) var(--panda-padding-s, 5px);
		min-height: var(--panda-component-size-s, 24px);
		line-height: unset;
	}

	/* SIZE-L */

	.badge.size-l {
		padding: 0px var(--panda-padding-l, 15px);
		height: var(--panda-component-size-l, 40px);
		line-height: var(--panda-component-size-l, 40px);
		font-size: var(--panda-font-size-l, 16px);
	}

	.badge.size-l.fluid {
		padding: var(--panda-padding-m, 10px) var(--panda-padding-l, 15px);
		min-height: var(--panda-component-size-l, 40px);
		line-height: unset;
	}
`;