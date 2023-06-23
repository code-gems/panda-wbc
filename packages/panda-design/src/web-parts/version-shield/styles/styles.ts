import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
	}

	.shield {
		display: flex;
		flex-flow: row nowrap;
		height: 30px;
		user-select: none;
	
		box-shadow: 0px 1px 2px var(--panda-black-color-20opc);
	}

	.shield .prefix,
	.shield .version {
		padding: 0px 10px;
		line-height: 30px;
		color: var(--panda-white-color);
		font-size: var(--panda-font-size-m);
		font-family: monospace;

		box-sizing: border-box;
	}

	.shield .prefix {
		border-radius: 2px 0px 0px 2px;
		background-color: var(--panda-black-color);
	}

	.shield .version {
		text-shadow: 0px 1px 1px var(--panda-black-color);
		border-radius: 0px 2px 2px 0px;
		background-color: limegreen;
	}
`;