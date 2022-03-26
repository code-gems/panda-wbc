import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}

	.editor-cont {
		position: relative;
		display: flex;
		flex-flow: column;
		width: 100%;
		height: 100%;
		gap: 5px;

		border: 1px solid #000;
		border-color: #f1f1f1;
	}

	.editor {
		display: block;
		width: 100%;
		height: 100%;
		min-height: var(--panda-text-editor-height, 10em);
		padding: 10px;

		color: var(--panda-txt-color, hsl(0deg 0% 29%));
		outline: none;
		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-text-editor-bg-color, #ffffff);
		box-sizing: border-box;
	}

	.toolbar {
		display: flex;
		flex-flow: row;
	}

	.toolbar .separator {
		display: block;
		width: 5px;
		flex-shrink: 0;
	}
	
	.toolbar .btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-button-height-s, 32px);
		height: var(--panda-button-height-s, 32px);

		transition: all 200ms ease-in-out;
		user-select: none;
		cursor: pointer;

		border-radius: 5px;
	}

	.toolbar .btn:hover {
		background-color: var(--panda-shadow-color-10opc, hsl(0deg 0% 0% / 10%));
	}
	
	.toolbar .btn.active {
		--panda-icon-fill-color: var(--panda-primary-color);
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
		background-color: var(--panda-input-bg-color-disabled, hsl(0deg 0% 90%));
	}

	.spinner-cont panda-spinner {
		--panda-spinner-color: var(--panda-input-txt-color-disabled, hsl(0deg 0% 70%));
	}

`;