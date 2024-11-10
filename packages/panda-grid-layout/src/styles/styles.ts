import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}

	.grid-layout-cont {
		display: block;
		width: 100%;
		height: 100%;
		padding: 10px;

		background-color: green;
		box-sizing: border-box;
	}

	.grid-layout {
		position: relative;
		display: grid;
		width: 100%;
		height: 100%;

		background-color: #ccc;
		box-sizing: border-box;
	}

	.placeholder {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		opacity: 0;

		transition: opacity 200ms ease;

		animation: animate-border 500ms infinite linear;
		border-radius: var(--panda-border-radius-m, 5px);
		background: var(--panda-primary-color-20opc, hsl(209deg 78% 46% / 20%));
		background-image: linear-gradient(90deg, var(--panda-primary-color, hsl(209deg 78% 46%)) 50%, transparent 50%), 
						linear-gradient(90deg, var(--panda-primary-color, hsl(209deg 78% 46%)) 50%, transparent 50%), 
						linear-gradient(0deg, var(--panda-primary-color, hsl(209deg 78% 46%)) 50%, transparent 50%), 
						linear-gradient(0deg, var(--panda-primary-color, hsl(209deg 78% 46%)) 50%, transparent 50%);
		background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
		background-size: 10px 2px, 10px 2px, 2px 10px, 2px 10px;
		background-position: left top, right bottom, left bottom, right top;
		z-index: 0;
	}

	.placeholder.show {
		position: relative;
		opacity: 1;
	}

	@keyframes animate-border {
		0% { background-position: left top, right bottom, left bottom, right top; }
		100% { background-position: left 10px top, right 10px bottom, left bottom 10px, right top 10px; }
	}
`;

export const panelStyles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}

	:host([dragging]) {
		z-index: 1;
		box-shadow: var(--panda-elevation-m);
	}

	:host([temporary-position]) {
		transition: transform 200ms ease;
	}

	.panel {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		padding: 5px;

		border: 2px solid;
		background-color: hsl(151deg 74% 43%);
		box-sizing: border-box;
	}

	slot.drag-handle {
		user-select: none;
		cursor: move;
		background: red;
	}
`;