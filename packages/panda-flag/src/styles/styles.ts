import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		width: var(--panda-flag-width, 30px);
		height: var(--panda-flag-height, 24px);
	}

	:host([square]) {
		width: var(--panda-flag-height, 24px);
		height: var(--panda-flag-height, 24px);
	}

	.flag {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border-radius: 4px;
	}
`;
