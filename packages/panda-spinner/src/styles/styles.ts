export const styles = /*css*/`
	:host {
		display: inline-block;
		width: var(--panda-spinner-size, var(--panda-spinner-size-m, 20px));
		height: var(--panda-spinner-size, var(--panda-spinner-size-m, 20px));
	}

	.panda-spinner {
		display: block;
		width: 100%;
		height: 100%;
	}

	svg circle { fill: var(--panda-spinner-color, hsl(0deg 0% 29%)); }
	svg circle.stroke-only { fill: none; stroke: var(--panda-spinner-color, hsl(0deg 0% 29%)); }
	svg path { fill: var(--panda-spinner-color, hsl(0deg 0% 29%)); }
	svg line { stroke: var(--panda-spinner-color, hsl(0deg 0% 29%)); }

	/* ============================================================================================================= */
	/* THEMES ====================================================================================================== */
	/* ============================================================================================================= */

	/* COLOR THEMES ================================================================================================ */
	
	/* PRIMARY */
	:host([theme~="primary"]) {
		--panda-spinner-color: var(--panda-primary-text-color, hsl(0deg 0% 100%));
	}
	
	/* SECONDARY */
	:host([theme~="secondary"]) {
		--panda-spinner-color: var(--panda-secondary-text-color, hsl(0deg 0% 100%));
	}
	
	/* TERTIARY */
	:host([theme~="tertiary"]) {
		--panda-spinner-color: var(--panda-tertiary-text-color, hsl(0deg 0% 100%));
	}
	
	/* ACTION - INFO */
	:host([theme~="info"]) {
		--panda-spinner-color: var(--panda-action-text-color-info, hsl(0deg 0% 100%));
	}
	
	/* ACTION - DONE */
	:host([theme~="done"]) {
		--panda-spinner-color: var(--panda-action-text-color-done, hsl(0deg 0% 100%));
	}
	
	/* ACTION - WARN */
	:host([theme~="warn"]) {
		--panda-spinner-color: var(--panda-action-text-color-warn, hsl(0deg 0% 100%));
	}
	
	/* ACTION - ALERT */
	:host([theme~="alert"]) {
		--panda-spinner-color: var(--panda-action-text-color-alert, hsl(0deg 0% 100%));
	}

	/* SIZE THEMES ================================================================================================= */

	/* SIZE-XS */
	:host([theme~="size-xs"]) {
		width: var(--panda-spinner-size-xs, 16px);
		height: var(--panda-spinner-size-xs, 16px);
	}

	/* SIZE-S */
	:host([theme~="size-s"]) {
		width: var(--panda-spinner-size-s, 18px);
		height: var(--panda-spinner-size-s, 18px);
	}

	/* SIZE-L */
	:host([theme~="size-l"]) {
		width: var(--panda-spinner-size-l, 24px);
		height: var(--panda-spinner-size-l, 24px);
	}

	/* SIZE-XL */
	:host([theme~="size-xl"]) {
		width: var(--panda-spinner-size-xl, 30px);
		height: var(--panda-spinner-size-xl, 30px);
	}
`;