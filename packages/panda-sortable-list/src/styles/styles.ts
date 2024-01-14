import { css } from "lit";

export const styles = css`
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		padding: 10px;
		border: 1px solid #ddd;
		margin-bottom: 5px;
		cursor: grab;
	}

	li.dragging {
		opacity: 0.5;
	}
`;
