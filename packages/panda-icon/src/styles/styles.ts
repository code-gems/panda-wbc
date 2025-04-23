import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		width: var(--panda-icon-width, 24px);
		height: var(--panda-icon-height, 24px);
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
`;