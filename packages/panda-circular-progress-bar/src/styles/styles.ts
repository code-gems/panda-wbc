import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		--panda-gradient-color-1: var(--panda-primary-color, lightblue);
		--panda-gradient-color-2: var(--panda-secondary-color, limegreen);
	}

	.progress-cont {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.progress {
		transform: rotate(-90deg);
	}

	.content {
		position: absolute;
	}

	svg circle {
		fill: none;
		stroke: url(#gradient);
		stroke-width: 10px;
		stroke-dasharray: 251;
		stroke-dashoffset: 105.5;
		stroke-linecap: round;
	}
`;