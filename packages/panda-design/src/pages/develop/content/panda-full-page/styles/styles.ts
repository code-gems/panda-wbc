import { css } from "lit";

export const styles = css`
	:host {
		--panda-full-page-width: 400px;
		--panda-full-page-height: 300px;
	}

	.page-1 {
		color: var(--panda-primary-text-color);
		background-color: var(--panda-primary-color);
	}

	.page-2 {
		color: var(--panda-secondary-text-color);
		background-color: var(--panda-secondary-color);
	}

	.page-3 {
		color: var(--panda-tertiary-text-color);
		background-color: var(--panda-tertiary-color);
	}
`;