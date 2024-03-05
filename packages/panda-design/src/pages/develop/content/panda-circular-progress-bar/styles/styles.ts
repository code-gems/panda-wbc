import { css } from "lit";

export const styles = css`
	:host {

	}

	.details {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}

	.details label {
		color: var(--panda-text-color);
		font-size: var(--panda-font-size-s);
		font-family: var(--panda-font-family);
	}

	.details .progress {
		color: var(--panda-header-color);
		font-size: var(--panda-font-size-xl);
		font-family: var(--panda-font-family-bold);
	}

	.custom {
		--panda-gradient-color-1: lime;
		--panda-gradient-color-2: red;
	}
`;