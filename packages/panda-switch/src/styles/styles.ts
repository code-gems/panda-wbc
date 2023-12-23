import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
	}

	.label {
		display: block;
		line-height: 1.6em;
		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-font-size-s, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		user-select: none;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		justify-content: center;
		align-items: center;

		border-radius: var(--panda-input-border-radius, 4px);
		background-color: var(--panda-input-background-color-disabled, hsl(0deg 0% 92%));
	}

	input {
		visibility: hidden;
		position: absolute;
	}

	.switch-cont {
		display: block;
		width: 80px;
		height: var(--panda-input-height, 40px);

		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-background-color-900, hsl(0deg 0% 86%));
	}

	.switch {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.slider {
		position: absolute;
		width: 26px;
		height: 26px;
		left: 4px;
		bottom: 4px;
		transition: 0.4s;

		user-select: none;

		background-color: #fff;
	}

	input:checked + .slider {
		transform: translateX(26px);
	}

	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}

	:host([focused]) {
		border: 1px solid var(--panda-input-outline-color, hsl(216deg 88% 60%));
		box-shadow: 0px 0px 1px 1px var(--panda-input-outline-color, hsl(216deg 88% 60%));
	}
`;