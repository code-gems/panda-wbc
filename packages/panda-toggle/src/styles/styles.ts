import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		position: relative;
		width: 60px;
		height: 34px;
	}

	input {
		display: none;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		transition: .4s;
		border-radius: 34px;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		transition: .4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: #2196F3;
	}

	input:checked + .slider:before {
		transform: translateX(26px);
	}

	input:indeterminate + .slider:before {
		transform: translateX(10px);
	}

	input:disabled + .slider {
		cursor: default;
		background-color: #e6e6e6;
	}

	input:disabled + .slider:before {
		cursor: default;
		background-color: #999999;
	}
`; 