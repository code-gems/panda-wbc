import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
		background-color: white;
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}

	.banner {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;

		background-color: var(--panda-particle-banner-background-color, transparent);
	}

	.content {
		position: absolute;
		display: flex;	
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;	
		inset: 0px;
	}
`;