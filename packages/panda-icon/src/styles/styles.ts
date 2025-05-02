export const styles = `
	:host {
		display: inline-block;
		width: var(--panda-icon-width, 20px);
		height: var(--panda-icon-height, 20px);
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	svg {
		fill: var(--panda-icon-color, hsl(210deg 5% 30%));
	}

	.color-secondary {
		fill: var(--panda-icon-color-secondary, hsl(210deg 5% 30%));
	}

	.color-tertiary {
		fill: var(--panda-icon-color-tertiary, hsl(210deg 5% 30%));
	}

	/* ===================================================================== */
	/* THEMES ============================================================== */
	/* ===================================================================== */

	/* SIZE THEMES */

	:host([theme~="size-xxs"]) {
		width: var(--panda-icon-size-xxs, 12px);
		height: var(--panda-icon-size-xxs, 12px);
	}

	:host([theme~="size-xs"]) {
		width: var(--panda-icon-size-xs, 16px);
		height: var(--panda-icon-size-xs, 16px);
	}

	:host([theme~="size-s"]) {
		width: var(--panda-icon-size-s, 18px);
		height: var(--panda-icon-size-s, 18px);
	}

	:host([theme~="size-l"]) {
		width: var(--panda-icon-size-l, 24px);
		height: var(--panda-icon-size-l, 24px);
	}

	:host([theme~="size-xl"]) {
		width: var(--panda-icon-size-xl, 30px);
		height: var(--panda-icon-size-xl, 30px);
	}

	:host([theme~="size-hero"]) {
		width: var(--panda-icon-size-hero, 46px);
		height: var(--panda-icon-size-hero, 46px);
	}
`;