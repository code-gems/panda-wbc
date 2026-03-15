import { css } from "lit";

export const styles = css`
	:host {
		display: inline;
	}

	.shield {
		display: flex;
		flex-flow: row nowrap;
		user-select: none;
	}

	.shield .native,
	.shield .version {
		padding: 5px 10px;
		color: var(--panda-action-text-color-info);
		font-size: var(--panda-font-size-s);
		font-family: monospace;
		text-shadow: 0px 1px 4px var(--panda-black-color);

		border-radius: var(--panda-border-radius-m);
		background-color: var(--panda-action-color-info);
		box-sizing: border-box;
	}

	.shield .version.no-border-radius {
		border-radius: var(--panda-border-radius-m) 0px 0px var(--panda-border-radius-m);
	}
	
	.shield .native {
		border-radius: 0px var(--panda-border-radius-m) var(--panda-border-radius-m) 0px;
		color: var(--panda-action-text-color-done);
		background-color: var(--panda-action-color-done);
	}
`;