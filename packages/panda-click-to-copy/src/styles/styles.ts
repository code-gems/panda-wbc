import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
	}

	.content {
	    position: relative;
		display: block;
		cursor: pointer;
	}

	.btn-copy {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-component-size-m);
		height: var(--panda-component-size-m);
		top: 0px;
		right: 0px;
		opacity: 0;
		
		transition: all 400ms ease-in-out;

		border-radius: var(--panda-border-radius-m);
		border-width: var(--panda-button-border-width, 1px);
		background-color: var(--panda-button-background-color);
		box-shadow: var(--panda-button-box-shadow, 0px 5px 10px rgba(0 0 0 / 10%));

		--panda-icon-color: var(--panda-button-text-color);
		--panda-icon-width: var(--panda-icon-size-m);
		--panda-icon-height: var(--panda-icon-size-m);
	}
	
	.btn-copy.done {
		opacity: 1;
		color: var(--panda-action-text-color-done, hsl(0deg 0% 100%));
		background-color: var(--panda-action-color-done, hsl(160deg 81% 43%));
		--panda-icon-color: var(--panda-action-text-color-done, hsl(0deg 0% 100%));
	}

	.content:hover .btn-copy { opacity: 1; }
`;
