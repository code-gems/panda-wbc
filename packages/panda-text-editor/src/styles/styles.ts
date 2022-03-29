import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}

	.text-editor {
		position: relative;
		display: flex;
		flex-flow: column;
		width: 100%;
		height: 100%;
		gap: 5px;

		border: 1px solid #000;
		border-color: #f1f1f1;
	}

	.editor-cont {
		height: var(--panda-text-editor-height, 10em);
		overflow: auto;
		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-text-editor-bg-color, #ffffff);
	}

	.editor {
		display: block;
		width: 100%;
		height: 100%;
		padding: 10px;

		color: var(--panda-txt-color, hsl(0deg 0% 29%));
		outline: none;
		box-sizing: border-box;
	}

	.toolbar {
		display: flex;
		flex-flow: row;
		padding: 5px;
		gap: 10px;
		border-bottom: 1px solid #f1f1f1;
		box-sizing: border-box;
	}

	.toolbar .btn-group {
		display: flex;
		flex-flow: row nowrap;
		gap: 2px;
		flex-shrink: 0;
	}
	
	.toolbar .btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-button-height-m, 40px);
		height: var(--panda-button-height-m, 40px);

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
		background-color: var(--panda-shadow-color-10opc, hsl(0deg 0% 0% / 10%));
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