import { css } from "lit";

export const styles = css`
	:host {
		--panda-spinner-width: var(--panda-icon-size-m, 20px);
		--panda-spinner-height: var(--panda-icon-size-m, 20px);
		--panda-spinner-color: var(--panda-text-color, hsl(0deg 0% 29%));
		--panda-spinner-primary-color: var(--panda-primary-color, 196deg 100% 47%);
		--panda-spinner-secondary-color: var(--panda-secondary-color, hsl(196deg 30% 85%));

		display: inline-block;
		width: var(--panda-spinner-width);
		height: var(--panda-spinner-height);
	}

	.panda-spinner {
		display: block;
		width: 100%;
		height: 100%;
	}

	svg circle { fill: var(--panda-spinner-color); }
	svg circle.stroke-only { fill: none; stroke: var(--panda-spinner-color); }
	svg path { fill: var(--panda-spinner-color); }
	svg line { stroke: var(--panda-spinner-color); }
`;