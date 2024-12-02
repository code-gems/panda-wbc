import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
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

	svg {
		position: absolute;
		z-index: -1;
	}

	.fps {
		position: absolute;
		top: 10px;
		left: 10px;
		padding: 5px 10px;

		color: lime;
		font-size: 12px;
		font-family: monospace;
		text-shadow: 0px 1px 2px #000;
		user-select: none;
		
		border-radius: 5px;
		background-color: hsl(0deg 0% 0% / 30%);
		box-shadow: 0px 1px 2px hsl(0deg 0% 0% / 50%);
		z-index: 1;
	}
`;