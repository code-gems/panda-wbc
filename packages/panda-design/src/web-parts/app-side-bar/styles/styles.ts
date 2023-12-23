import { css } from "lit";

export const styles = css`
	:host {
		position: relative;
		display: block;
		width: 120px;
		height: 100%;
	}

	.side-bar {
		display: flex;
		flex-flow: column;
		width: 100%;
		height: 100%;
		gap: 10px;
		overflow: hidden;

		background-color: var(--panda-background-color-900);
	}

	.side-bar .header {
		flex-shrink: 0;
	}

	.side-bar .body {
		display: flex;
		flex-flow: column;
		flex-grow: 1;
		padding: 10px;
		gap: 10px;
		overflow: overlay;
	}

	.side-bar .footer {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
	}

	.side-bar .btn {
		display: flex;
		flex-flow: column;
		width: 100%;
		height: 80px;

		transition: all 400ms ease-in-out;
		cursor: pointer;

		border-radius: 10px;
		background-color: var(--panda-background-color-700);
		box-shadow: 0px 1px 2px var(--panda-black-color-10opc);
		box-sizing: border-box;
	}

	.side-bar .btn:hover {
		background-color: var(--panda-background-color-500);
		box-shadow: 0px 1px 2px var(--panda-black-color-20opc);
	}

	.side-bar .btn .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	
		--panda-icon-fill-color: var(--panda-text-color);
		--panda-icon-width: 30px;
		--panda-icon-height: 30px;
	}

	.side-bar .btn label {
		display: block;
		padding: 5px 10px;
		flex-shrink: 0;

		color: var(--panda-text-color);
		font-size: var(--panda-font-size-s);
		font-family: var(--panda-font-family-bold);
		text-transform: uppercase;
		text-align: center;
		cursor: pointer;
		user-select: none;
	}

	.side-bar .btn.active {
		background-color: var(--panda-primary-color-500);
	}

	.side-bar .btn.active .icon {
		--panda-icon-color: var(--panda-primary-text-color);
	}

	.side-bar .btn.active label {
		color: var(--panda-primary-text-color);
	}

	.side-bar .btn.active:hover {
		background-color: var(--panda-primary-color-300);
	}
`;