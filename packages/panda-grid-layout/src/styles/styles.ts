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
		padding: var(--panda-padding-m, 10px);
		box-sizing: border-box;
		overflow-x: hidden;
		overflow-y: overlay;
	}

	.grid-layout {
		position: relative;
		display: grid;
		width: 100%;
		height: 100%;
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
		border-radius: var(--panda-border-radius-m, 5px);
		will-change: transform; /* used to enhance performance */
	}

	:host([dragging]) {
		z-index: 1;
	}

	:host([temporary-position]) {
		/* bounce animation */
		transition: transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.panel {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
	}

	slot.drag-handle {
		user-select: none;
		cursor: move;
		z-index: 1;
	}
`;

export const placeholderStyles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	:host([show]) {
		opacity: 1;
	}

	.placeholder {
		display: block;
		width: 100%;
		height: 100%;

		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-primary-color-10opc, hsl(209deg 78% 46% / 10%));
		box-sizing: border-box;
	}
`;