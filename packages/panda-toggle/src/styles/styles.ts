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

		transition: all 400ms ease-in-out;
		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-bg-color-500);
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		transition: all 400ms ease-in-out;

		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-bg-color);
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

	.spinner-cont {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		left: 0px;
		top: 0px;

		border-radius: var(--panda-border-radius-m, 5px);
		background: var(--panda-primary, hsl(196deg 100% 47%));
	}

	.spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-primary-color, hsl(0deg 0% 100%));
	}

`; 