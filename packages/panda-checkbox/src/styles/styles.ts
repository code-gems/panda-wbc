export const styles = /*css*/`
	:host {
		display: inline;
		width: fit-content;
	}

	.checkbox {
		display: flex;
		flex-flow: row nowrap;
		align-items: flex-start;
		justify-content: flex-start;
		gap: var(--panda-checkbox-gap, 10px);
		width: fit-content;
	}

	.checkbox .icon {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: var(--panda-checkbox-icon-size, 20px);
		height: 100%;
		margin: var(--panda-checkbox-icon-margin, 1px);
		outline: none;

		transition: all .3s ease-in-out;
		cursor: pointer;
		border-radius: var(--panda-checkbox-icon-border-radius, 4px);
	}

	.checkbox .label-cont {
		display: flex;
		flex-direction: column;
		gap: var(--panda-checkbox-label-gap, var(--panda-gap-s, 5px));
	}

	.checkbox .label {
		width: fit-content;
		padding-top: var(--panda-checkbox-label-padding-top, 2px);

		user-select: none;
		color: var(--panda-checkbox-label-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-checkbox-label-font-size, var(--panda-font-size-m, 14px));
		font-family: var(--panda-checkbox-label-font-family, var(--panda-font-family, "Poppins"));
		cursor: pointer;
	}

	.checkbox .help-text {
		user-select: none;
		color: var(--panda-checkbox-help-text-color, var(--panda-label-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-checkbox-help-text-font-size, var(--panda-label-font-size, 12px));
		font-family: var(--panda-checkbox-help-text-font-family, var(--panda-font-family, "Poppins"));
	}

	/* SVG ELEMENTS */
	svg {
		margin: var(--panda-checkbox-svg-margin, 1px);
	}

	svg .box-outline {
		fill: var(--panda-checkbox-icon-color, var(--panda-icon-color, hsl(210deg 5% 30%)));
	}

	svg .box {
		opacity: 0;
		transition: opacity .2s ease;
		fill: var(--panda-checkbox-icon-color, var(--panda-icon-color, hsl(210deg 5% 30%)));
	}

	svg .check { 
		fill: none;
		stroke: var(--panda-checkbox-check-color, var(--panda-primary-text-color, hsl(0deg 0% 100%)));
		stroke-dasharray: 17;
		stroke-width: 2;
		stroke-dashoffset: 17;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: all .4s ease .1s;
	}

	svg .dash { 
		fill: none;
		stroke: var(--panda-checkbox-check-color, var(--panda-primary-text-color, hsl(0deg 0% 100%)));
		stroke-dasharray: 10;
		stroke-width: 2;
		stroke-dashoffset: -10;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: all .3s ease;
	}

	/* ============================================================================================================= */
	/* COMPONENT STATE ============================================================================================= */
	/* ============================================================================================================= */
	
	/* HOVER */
	.checkbox:not(.disabled):hover .icon {
		box-shadow: var(--panda-checkbox-outline-hover, 0px 0px 0px 2px hsl(209deg 78% 46% / 20%));
	}

	/* FOCUSED */
	.icon:not(.disabled):focus,
	.icon:not(.disabled):focus-visible,
	.checkbox:not(.disabled):focus .icon,
	.checkbox:not(.disabled):focus-visible .icon {
		box-shadow: var(--panda-checkbox-outline, var(--panda-component-outline, 0px 0px 0px 2px hsl(209deg 78% 46% / 40%)));
	}

	/* CHECKED */
	.checkbox.checked .box {
		opacity: 1;
		fill: var(--panda-checkbox-icon-color-checked, var(--panda-primary-color, hsl(209deg 78% 46%)));
	}

	.checkbox:not(.indeterminate).checked .check {
		stroke-dashoffset: 0;
	}

	.checkbox.checked .label {
		color: var(--panda-checkbox-label-color-checked, var(--panda-text-color, hsl(210deg 5% 25%)));
	}

	/* INDETERMINATE */
	.checkbox.indeterminate .box {
		opacity: 1;
		fill: var(--panda-checkbox-icon-color-indeterminate, var(--panda-primary-color, hsl(209deg 78% 46%)));
	}

	.checkbox.indeterminate .dash {
		stroke-dashoffset: 0;
	}

	/* STRIKETHROUGH */
	.checkbox.strikethrough .label {
		text-decoration: line-through;
	}

	/* ALIGN RIGHT */
	.checkbox.align-right {
		flex-direction: row-reverse;
		justify-content: flex-end;
	}

	/* DISABLED */
	.checkbox.disabled {
		pointer-events: none;
	}

	.checkbox.disabled .label {
		color: var(--panda-checkbox-label-color-disabled, hsl(210deg 5% 80%));
		cursor: not-allowed;
	}

	.checkbox.disabled .box,
	.checkbox.disabled .box-outline {
		fill: var(--panda-checkbox-icon-color-disabled, hsl(189deg 3% 96%));
	}

	.checkbox.disabled .check,
	.checkbox.disabled .dash {
		stroke: var(--panda-checkbox-check-color-disabled, hsl(210deg 5% 80%));
	}

	/* ============================================================================================================= */
	/* THEMES ====================================================================================================== */
	/* ============================================================================================================= */

	/* INFO */
	:host([theme="info"]) svg .box-outline,
	:host([theme="info"]) svg .box {
		fill: var(--panda-checkbox-icon-color-info, var(--panda-action-color-info, hsl(261deg 66% 58%)));
	}

	:host([theme="info"]) svg .check,
	:host([theme="info"]) svg .dash {
		stroke: var(--panda-checkbox-check-color-info, var(--panda-action-text-color-info, hsl(0deg 0% 100%)));
	}

	/* DONE */
	:host([theme="done"]) svg .box-outline,
	:host([theme="done"]) svg .box {
		fill: var(--panda-checkbox-icon-color-done, var(--panda-action-color-done, hsl(160deg 81% 43%)));
	}

	:host([theme="done"]) svg .check,
	:host([theme="done"]) svg .dash {
		stroke: var(--panda-checkbox-check-color-done, var(--panda-action-text-color-done, hsl(0deg 0% 100%)));
	}

	/* WARN */
	:host([theme="warn"]) svg .box-outline,
	:host([theme="warn"]) svg .box {
		fill: var(--panda-checkbox-icon-color-warn, var(--panda-action-color-warn, hsl(35deg 91% 62%)));
	}

	:host([theme="warn"]) svg .check,
	:host([theme="warn"]) svg .dash {
		stroke: var(--panda-checkbox-check-color-warn, var(--panda-action-text-color-warn, hsl(0deg 0% 100%)));
	}

	/* ALERT */
	:host([theme="alert"]) svg .box-outline,
	:host([theme="alert"]) svg .box {
		fill: var(--panda-checkbox-icon-color-alert, var(--panda-action-color-alert, hsl(14deg 77% 62%)));
	}

	:host([theme="alert"]) svg .check,
	:host([theme="alert"]) svg .dash {
		stroke: var(--panda-checkbox-check-color-alert, var(--panda-action-text-color-alert, hsl(0deg 0% 100%)));
	}

	/* LIGHT */
	:host([theme="light"]) .checkbox .label {
		color: var(--panda-checkbox-label-color-light, var(--panda-white-color, hsl(0deg 0% 100%)));
	}

	:host([theme="light"]) svg .box-outline,
	:host([theme="light"]) svg .box {
		fill: var(--panda-checkbox-icon-color-light, var(--panda-white-color, hsl(0deg 0% 100%)));
	}

	:host([theme="light"]) svg .check,
	:host([theme="light"]) svg .dash {
		stroke: var(--panda-checkbox-check-color-light, var(--panda-black-color, hsl(0deg 0% 0%)));
	}

	/* DARK */
	:host([theme="dark"]) .checkbox .label {
		color: var(--panda-checkbox-label-color-dark, var(--panda-black-color, hsl(0deg 0% 0%)));
	}

	:host([theme="dark"]) svg .box-outline,
	:host([theme="dark"]) svg .box {
		fill: var(--panda-checkbox-icon-color-dark, var(--panda-black-color, hsl(0deg 0% 0%)));
	}

	:host([theme="dark"]) svg .check,
	:host([theme="dark"]) svg .dash {
		stroke: var(--panda-checkbox-check-color-dark, var(--panda-white-color, hsl(0deg 0% 100%)));
	}
`;
