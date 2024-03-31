import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		width: var(--panda-spinner-width, 20px);
		height: var(--panda-spinner-height, 20px);
	}

	.panda-spinner {
		display: block;
		width: 100%;
		height: 100%;
	}

	svg circle { fill: var(--panda-spinner-color, hsl(0deg 0% 29%)); }
	svg circle.stroke-only { fill: none; stroke: var(--panda-spinner-color, hsl(0deg 0% 29%)); }
	svg path { fill: var(--panda-spinner-color, hsl(0deg 0% 29%)); }
	svg line { stroke: var(--panda-spinner-color, hsl(0deg 0% 29%)); }
`;