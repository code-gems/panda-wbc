import { css } from "lit";

export const styles = css`
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
		background-color: var(--panda-primary-color);
	}
	
	slot {
		line-height: var(--panda-button-height-m);
		
		color: var(--panda-primary-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family-bold);
	}

	.content {
		padding: 0px 15px;
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