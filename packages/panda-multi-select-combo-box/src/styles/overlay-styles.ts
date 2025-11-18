export const styles = /*css*/`
	:host {
		pointer-events: auto;
	}

	.overlay {
		position: fixed;
		display: block;
		width: 100%;
		height: 100%;
		inset: 0px;
		z-index: 9998;
	}

	.dropdown {
		position: absolute;
		display: flex;
		flex-flow: column;
		max-height: 60vh;
		padding: var(--panda-select-dropdown-padding, var(--panda-padding-s, 5px));

		border-width: var(--panda-select-dropdown-border-width, var(--panda-dropdown-border-width, 1px));
		border-style: var(--panda-select-dropdown-border-style, var(--panda-dropdown-border-style, solid));
		border-color: var(--panda-select-dropdown-border-color, var(--panda-dropdown-border-color, hsl(0deg 0% 80%)));

		border-radius: var(--panda-select-dropdown-border-radius, var(--panda-dropdown-border-radius, 5px));
		background-color: var(--panda-select-dropdown-background-color, var(--panda-dropdown-background-color, hsl(0deg 0% 100%)));
		box-shadow: var(--panda-select-dropdown-elevation, var(--panda-elevation-m, 0px 2px 4px hsl(0deg 0% 0% / 20%)));
		box-sizing: border-box;
		z-index: 9999;
	}

	.header {
		display: flex;
		flex-flow: column;
		gap: var(--panda-select-dropdown-header-gap, var(--panda-gap-m, 10px));
		padding: var(--panda-select-dropdown-header-padding, var(--panda-gap-m, 10px));
	}

	.filter {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panda-select-dropdown-filter-padding, 0px);
	}

	.buttons {
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		padding: var(--panda-select-dropdown-buttons-padding, 0px);
	}

	.list {
		display: flex;
		flex-flow: column;
		overflow: auto;
		gap: var(--panda-select-dropdown-list-gap, var(--panda-gap-s, 5px));
		padding: var(--panda-select-dropdown-list-padding, 0px);
		outline: none;
	}

	.list .list-item {
		display: flex;
		flex-flow: row;
		align-items: center;
		padding: var(--panda-select-dropdown-list-item-padding, var(--panda-padding-s, 5px));
		
		transition: var(--panda-select-transition, all 0.3s ease-in-out);
		cursor: pointer;

		border-width: var(--panda-select-dropdown-list-item-border-width, 1px);
		border-style: var(--panda-select-dropdown-list-item-border-style, solid);
		border-color: var(--panda-select-dropdown-list-item-border-color, transparent);
		border-radius: var(--panda-select-dropdown-list-item-border-radius, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-select-dropdown-list-item-background-color, transparent);
		box-sizing: border-box;
	}

	.list .list-item .label {
		display: flex;
		flex-grow: 1;
		align-items: center;
		padding: 0px 10px;
		min-height: var(--panda-select-dropdown-list-item-height-size-m, 40px);
		
		color: var(--panda-select-dropdown-list-item-text-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-select-dropdown-list-item-font-size, var(--panda-font-size-m, 14px));
		font-family: var(--panda-select-dropdown-list-item-font-family, var(--panda-font-family, "Poppins"));
		text-shadow: var(--panda-select-dropdown-list-item-text-shadow, var(--panda-text-shadow, none));
		user-select: none;
		transition: var(--panda-select-transition, all 0.3s ease-in-out);

		box-sizing: border-box;
	}
	
	/* ===================================================================== */
	/* HOVER =============================================================== */
	/* ===================================================================== */

	.list .list-item:hover {
		border-color: var(--panda-select-dropdown-list-item-border-color-hover, var(--panda-primary-color, hsl(209deg 78% 46%)));
		background-color: var(--panda-select-dropdown-list-item-background-color-hover, var(--panda-primary-color-10opc, hsl(209deg 78% 46% / 10%)));
	}

	.list .list-item:hover .label {
		color: var(--panda-select-dropdown-list-item-text-color-hover, var(--panda-primary-color, hsl(209deg 78% 46%)));
	}

	/* ===================================================================== */
	/* ACTIVE ============================================================== */
	/* ===================================================================== */

	.list .list-item.active {
		border-color: var(--panda-select-dropdown-list-item-border-color-active, var(--panda-primary-color, hsl(209deg 78% 46%)));
		background-color: var(--panda-select-dropdown-list-item-background-color-active, var(--panda-primary-color-10opc, hsl(209deg 78% 46% / 10%)));
	}

	.list .list-item.active .label {
		color: var(--panda-select-dropdown-list-item-text-color-active, var(--panda-primary-color, hsl(209deg 78% 46%)));
	}

	/* ===================================================================== */
	/* SELECTED ============================================================ */
	/* ===================================================================== */

	.list .list-item.selected {
		border-color: var(--panda-select-dropdown-list-item-border-color-selected, var(--panda-primary-color, hsl(209deg 78% 46%)));
		background-color: var(--panda-select-dropdown-list-item-background-color-selected, var(--panda-primary-color, hsl(209deg 78% 46%)));
	}
	
	.list .list-item.selected .label {
		color: var(--panda-select-dropdown-list-item-text-color-selected, var(--panda-primary-text-color, hsl(0deg 0% 100%)));
	}
`;