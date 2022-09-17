import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		min-width: 100px;
		height: var(--panda-element-default-hight, 40px);
	}

	.panda-select {
		display: flex;
		width: 100%;
		height: 100%;
		flex-flow: row nowrap;
		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-input-bg-color, hsl(0deg 0% 95%));
	}

	.value-cont {
		flex-grow: 1;
	}

	.value {
		flex-grow: 1;
	}

	.toggle-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-element-default-hight, 40px);
		height: var(--panda-element-default-hight, 40px);
		padding: 5px;
		flex-shrink: 0;
		box-sizing: border-box;

		--panda-icon-fill-color: var(--panda-txt-color, hsl(0deg 0% 29%));
		--panda-icon-width: var(--panda-icon-size-m, 24px);
		--panda-icon-height: var(--panda-icon-size-m, 24px);
	}
	
`;