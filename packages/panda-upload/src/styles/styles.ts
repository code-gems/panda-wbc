import { css } from "lit";

export const commonStyles = css`
	:host {
		--panda-button-height-m: var(--panda-button-height-m, 32px);
		--panda-button-color: var(--panda-button-color, white);
		--panda-button-color-disabled: var(--panda-button-color-disabled, black);
		--panda-button-bg-color: var(--panda-button-bg-color, hsl(198deg 67% 51%));
		--panda-button-bg-color-disabled: var(--panda-button-bg-color-disabled, grey);
		--panda-button-bg-color-hover: var(--panda-button-bg-color-hover, red);
		--panda-button-border-radius: var(--panda-button-border-radius, 4px);
		--panda-button-border-size: var(--panda-button-border-size, 2px);
		--panda-button-border-color: var(--panda-button-border-color, );

	}
`;

export const uploadButtonStyles = css`
	:host {
		display: inline-block;
		height: var(--panda-button-height-m);
	}

	.button {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		gap: 5px;

		border-radius: var(--panda-button-border-radius);
		border-width: var(--panda-button-border-size);
		border-color: var(--panda-button-border-color);
		background-color: var(--panda-button-bg-color);
	}
	
	slot {
		line-height: var(--panda-button-height-m);
		
		color: var(--panda-primary-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family-bold);
	}

	.button .content {
		padding: 0px 15px;
	}

	.button .content > input[type="file"] {
		width: 1px;
		height: 1px;
		opacity: 0;
		visibility: hidden;
	}

	slot[name="prefix"],
	slot[name="suffix"] {
		padding: 0px;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;

		border-radius: var(--panda-button-border-radius);
		background-color: var(--panda-primary-color);
	}
`;