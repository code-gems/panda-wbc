import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		font-family: Arial, sans-serif;
	}

	.chip-container {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 8px;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		background-color: #e0e0e0;
		padding: 4px 8px;
		border-radius: 16px;
		font-size: 14px;
	}

	.chip button {
		background: none;
		border: none;
		margin-left: var(--panda-padding-m, 10px);
		font-size: var(--panda-font-size-m, 14px);
		cursor: pointer;
	}

	input {
		width: 100%;
		padding: 8px;
		font-size: 14px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
`;