import { css } from "lit"

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}

	.icon-list {
		display: flex;
		flex-flow: row wrap;
		gap: 10px;
		box-sizing: border-box;
	}

	.icon-list .list-header {
		display: flex;
		flex-basis: 100%;
		height: var(--panda-component-size-m);
		line-height: var(--panda-component-size-m);
		transition: all 400ms ease-in-out;
		cursor: pointer;
		
		border-radius: var(--panda-border-radius-m);
		background-color: var(--panda-background-color-700);
		box-shadow: 0px 1px 2px var(--panda-black-color-20opc);
	}
	
	.icon-list .list-header:hover {
		background-color: var(--panda-background-color-900);
	}
	
	.icon-list .list-header label {
		flex-grow: 1;
		
		color: var(--panda-header-text-color);
		font-size: var(--panda-font-size-l);
		font-family: var(--panda-font-family-bold);
		cursor: pointer;
	}
	
	.icon-list .list-header .btn {
		display: flex;
		flex-shrink: 0;
		width: var(--panda-component-size-m);
		height: var(--panda-component-size-m);
		justify-content: center;
		align-items: center;

		--panda-icon-color: var(--panda-text-color);
		--panda-icon-width: var(--panda-icon-size-m);
		--panda-icon-height: var(--panda-icon-size-m);
	}

	.icon-list .list-item {
		display: flex;
		flex-flow: column;
		width: 100px;
		min-height: 100px;
		flex-shrink: 0;
		justify-content: space-between;
		align-items: center;
		padding: var(--panda-padding-m);

		transition: all 300ms ease-in-out;
		cursor: pointer;

		border-radius: var(--panda-border-radius-m);
		background-color: var(--panda-background-color-100);
		box-shadow: 0px 1px 2px var(--panda-black-color-10opc);
		box-sizing: border-box;
	}
	
	.icon-list .list-item:hover {
		box-shadow: 0px 2px 4px var(--panda-black-color-20opc);
		transform: scale(1.2);
	}

	.icon-list .list-item .icon {
		display: flex;
		width: 40px;
		height: 40px;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;

		--panda-icon-width: var(--panda-icon-size-l);
		--panda-icon-height: var(--panda-icon-size-l);
	}

	.icon-list .list-item .name {
		line-height: 1.1em;
		color: var(--panda-txt-color);	
		font-size: var(--panda-font-size-s);
		font-family: var(--panda-font-family);
		text-align: center;
	}

	.icon-list .list-item:hover .name {
		color: var(--panda-primary-txt-color);
	}
`;