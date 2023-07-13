import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
	}

	.code-sample {
		padding: 10px;
		line-height: 1.5em;

		border-radius: 10px;
		background-color: var(--panda-background-color-100);
		box-shadow: 0px 1px 2px var(--panda-black-color-10opc);
	}

	.code-sample .header {
		display: flex;
		flex-flow: row nowrap;
		gap: 5px;

	}

	.code-sample .header .icon,
	.code-sample .header .btn-copy {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		width: 30px;
		height: 30px;

		transition: all 200ms ease-in-out;

		border: 1px solid transparent;
		border-radius: 5px;
		background-color: var(--panda-background-color-500);

		--panda-icon-width: var(--panda-icon-size-s);
		--panda-icon-height: var(--panda-icon-size-s);
		--panda-icon-color: var(--panda-text-color);
	}

	.code-sample .header .btn-copy {
		cursor: pointer;
	}
	
	.code-sample .header .btn-copy:hover {
		border-color: var(--panda-background-color-900);
		background-color: var(--panda-background-color-700);
	}

	.code-sample .header label {
		padding: 0px 10px;
		line-height: 32px;
		color: var(--panda-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family);
		flex-grow: 1;
		user-select: none;
		border-bottom: 1px dashed var(--panda-background-color-500);
	}
	
	.code-sample .body {
		position: relative;
		display: block;
		height: 5rem;
		overflow: hidden;
	}

	.code-sample .body.expanded {
		height: auto;
	}

	.code-sample .body::after {
		position: absolute;
		display: block;
		content: " ";
		width: 100%;
		height: 5rem;
		bottom: 0%;
		left: 0%;

		background-color: var(--panda-background-color-100);
		background: linear-gradient(
			0deg,
			var(--panda-background-color-100) 0%,
			var(--panda-background-color-0opc) 100%
		);
	}
	
	.code-sample .body .btn {
		position: absolute;
		display: block;
		padding: 5px 15px;
		left: 50%;
		bottom: 3px;
		transform: translateX(-50%);

		color: var(--panda-text-color);
		font-size: var(--panda-font-size-s);
		font-family: var(--panda-font-family-bold);

		background-color: var(--panda-background-color-500);
		box-shadow: 0px 1px 2px var(--panda-black-color-10opc);
		z-index: 1;
	}

	.code-sample .body .btn:hover {
		background-color: var(--panda-background-color-700);
	}

	.code-sample .body pre {
		display: flex;
		flex-flow: row;
		margin: 0px;
		padding: 20px;
		color: blueviolet;
	}
`;