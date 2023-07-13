import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		width: var(--panda-icon-width, 24px);
		height: var(--panda-icon-height, 24px);
	}

	.icon {
		display: block;
		width: 100%;
		height: 100%;
	}

	svg {
		fill: var(--panda-icon-color, hsl(0deg 0% 29%));
	}
`;