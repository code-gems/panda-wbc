export const styles = /*css*/`
	:host {
		display: inline-block;
		width: var(--panda-flag-width, 30px);
		height: var(--panda-flag-height, 24px);
	}

	:host([square]) {
		width: var(--panda-flag-width, 30px);
		height: var(--panda-flag-width, 30px);
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
`;
