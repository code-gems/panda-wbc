import { css } from "lit";

export const styles = css`
	:host {
		--panda-spinner-width: 30px;
		--panda-spinner-height: 30px;
		--panda-spinner-color: #000000;

		display: inline-block;
		width: var(--panda-spinner-width);
		height: var(--panda-spinner-height);
	}

	.panda-spinner {
		display: block;
		width: 100%;
		height: 100%;
	}
`;