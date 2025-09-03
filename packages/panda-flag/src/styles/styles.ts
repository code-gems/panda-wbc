export const styles = /*css*/`
	:host {
		display: inline-block;
		width: var(--panda-flag-size, var(--panda-component-size-m), 30px);
	}

	:host([square]) {
		width: var(--panda-flag-size, var(--panda-component-size-m), 30px);
		height: var(--panda-flag-size, var(--panda-component-size-m), 30px);
	}

	.flag {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.flag.round {
		border-radius: 50%;
	}

	/* ============================================================================================================= */
	/* THEMES ====================================================================================================== */
	/* ============================================================================================================= */

	/* SIZE-S */
	:host([theme~="size-s"]) {
		--panda-flag-size: var(--panda-component-size-s, 32px);
	}

	/* SIZE-L */
	:host([theme~="size-l"]) {
		--panda-flag-size: var(--panda-component-size-l, 48px);
	}

	/* SIZE-XL */
	:host([theme~="size-xl"]) {
		--panda-flag-size: var(--panda-component-size-xl, 56px);
	}
`;
