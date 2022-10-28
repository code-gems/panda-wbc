import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}

	.page {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
	}

	.page-cont {
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		max-width: 1430px;
	}

	.column {
		border: 1px solid;
		flex-grow: 1;

	}
	
	.column-left {
		width: 300px;
		flex-grow: 0;
		flex-shrink: 0;
	}
`;