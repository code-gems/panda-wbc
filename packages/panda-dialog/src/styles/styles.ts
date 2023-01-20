import { css } from "lit";

export const styles = css`
	:host {
		--panda-flag-width: 30px;
		--panda-flag-height: 22.5px;

		display: inline-block;
		width: var(--panda-flag-width);
		height: var(--panda-flag-height);
	}

	:host([square]) {
		width: var(--panda-flag-height);
		height: var(--panda-flag-height);
	}

	.flag {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border-radius: 4px;

		box-shadow: 0px 1px 2px var(--panda-shadw-50opc);
	}
`;
