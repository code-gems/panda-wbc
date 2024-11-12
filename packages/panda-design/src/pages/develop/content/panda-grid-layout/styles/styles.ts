import { css } from "lit";

export const styles = css`
	:host {

	}

	.drag-handle {
		position: absolute;
		height: 30px;
		top: 10px;
		left: 10px;
		right: 10px;
	}

	.panel-cont {
		display: block;
		width: 100%;
		height: 100%;
		padding: var(--panda-padding-s, 5px);
		box-sizing: border-box;
	}

	.panel {
		display: flex;
		flex-flow: column;
		width: 100%;
		height: 100%;

		border-radius: var(--panda-border-radius-m);
		background-color: var(--panda-background-color-100);
		box-shadow: var(--panda-elevation-s);
	}
	
	.panel .header {
		flex-shrink: 0;
		height: 30px;
		border-bottom: 1px solid var(--panda-border-color);
	}
	
	.panel .body {
		flex-grow: 1;
		padding: var(--panda-padding-m, 10px);
		box-sizing: border-box;
	}
	
	panda-grid-panel[dragging] .panel {
		box-shadow: var(--panda-elevation-l);
	}
`;