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
	}

`;

export const panelStyles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}

	:host([dragging]) {
		position: absolute;
	}

	.panel {
		display: block;
		width: 100%;
		height: 100%;
		padding: 10px;

		border: 2px solid;
		background-color: hsl(151deg 74% 43%);
		box-sizing: border-box;
	}

`;