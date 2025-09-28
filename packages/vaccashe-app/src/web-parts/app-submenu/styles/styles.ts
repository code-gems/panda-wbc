import { css } from "lit";

export const styles = css`
	:host {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
	}

	.submenu {
		display: flex;
		flex-flow: column;
		flex-shrink: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;

		background-color: var(--panda-background-color-700);
	}

	.submenu .header {
		flex-shrink: 0;
	}

	.submenu .header .search {
		padding: var(--panda-padding-m);
		box-sizing: border-box;
	}

	.submenu .body {
		flex-grow: 1;
		overflow: overlay;
	}

	.submenu .footer {
		flex-shrink: 0;
	}

	.menu-list {
		display: flex;
		flex-flow: column;
		padding: var(--panda-padding-m);
		gap: var(--panda-padding-m);

		box-sizing: border-box;
	}
	
	.menu-list .list-item {
		display: flex;
		flex-flow: row nowrap;
		min-height: var(--panda-component-size-m);
		padding: var(--panda-padding-m);
		
		cursor: pointer;
		transition: all 400ms ease-in-out;

		border-radius: var(--panda-border-radius-m);
		background-color: var(--panda-background-color);
		box-shadow: var(--panda-elevation-m);
		box-sizing: border-box;
	}

	.menu-list .list-item:hover {
		background-color: var(--panda-background-color-300);
		box-shadow: var(--panda-elevation-l);
	}

	.menu-list .list-item .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		width: var(--panda-component-size-m);
		height: var(--panda-component-size-m);
	}

	.menu-list .list-item label {
		line-height: var(--panda-component-size-m);
		padding: 0px var(--panda-padding-m);
		flex-grow: 1;

		color: var(--panda-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family);
		user-select: none;
		cursor: pointer;		
	}

	/* ACTIVE STATE */

	.menu-list .list-item.active {
		background-color: var(--panda-primary-color);
		box-shadow: var(--panda-elevation-l);
		--panda-icon-color: var(--panda-primary-text-color);
	}

	.menu-list .list-item.active label {
		color: var(--panda-primary-text-color);
	}
`;